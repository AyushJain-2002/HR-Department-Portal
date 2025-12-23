import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  loading: false,
  toggleLoading: false,
  error: null,
  success: false,
  createSuccess: false,
  customer: null,
  allCustomer: [],
  createError: null,
  message: null,
};

// Helper function to get user info for logging
const getUserInfoForLogging = () => {
  try {
    const userInfo = getDecryptedCookie("user");
    return {
      userId: userInfo?.id,
      email: userInfo?.email,
      name: userInfo?.name,
      role: userInfo?.role
    };
  } catch {
    return { userId: null, email: null };
  }
};

// Helper function to handle API errors
const handleApiError = (error, action) => {
  let errorMessage = "Something went wrong";
  
  if (error.response?.data?.errors) {
    // For validation errors
    errorMessage = error.response.data.errors;
  } else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error.response?.data) {
    errorMessage = typeof error.response.data === 'string' 
      ? error.response.data 
      : JSON.stringify(error.response.data);
  } else if (error.message) {
    errorMessage = error.message;
  }
  
  const userInfo = getUserInfoForLogging();
  Logger.error(`${action} failed`, {
    error: errorMessage,
    userId: userInfo.userId,
    email: userInfo.email,
  }, "CUSTOMER_API_ERROR");
  
  return errorMessage;
};

// Helper function to log user actions
const logUserAction = (action, details = {}) => {
  const userInfo = getUserInfoForLogging();
  const logDetails = {
    ...userInfo,
    ...details,
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  };
  Logger.info(`Customer Action: ${action}`, logDetails, "CUSTOMER_ACTION");
};

// 🔹 Fetch All Customers
export const fetchAllCustomers = createAsyncThunk(
  "customers/fetchAllCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_all_customers_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.customers.fetchAllCustomers();
      
      // Merge customer data with images
      const mergedData = response.data.customer.map((item) => ({
        ...item.id, // Spread all customer properties
        ...item.images, // Spread all image properties
      }));
      
      Logger.info("Customers fetched successfully", {
        userId: userInfo.userId,
        customerCount: mergedData.length,
        timestamp: new Date().toISOString()
      }, "CUSTOMER");
      
      logUserAction("all_customers_fetched", { 
        userId: userInfo.userId,
        count: mergedData.length 
      });
      
      return mergedData;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch all customers");
      
      logUserAction("fetch_all_customers_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Customer By ID
export const fetchCustomerById = createAsyncThunk(
  "customers/fetchCustomerById",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_customer_by_id_attempt", { 
        userId: userInfo.userId,
        customerId: id 
      });
      
      const response = await apiClient.customers.fetchCustomerById(id);
      
      const customerData = response.data.customer;

      // Merge the images into the customer object
      const updatedCustomer = {
        ...customerData,
        ...customerData.images,
      };
      delete updatedCustomer.images;
      
      Logger.info("Customer data fetched successfully", {
        userId: userInfo.userId,
        customerId: id,
        customerEmail: updatedCustomer.email,
        timestamp: new Date().toISOString()
      }, "CUSTOMER");
      
      logUserAction("customer_fetched_by_id", { 
        userId: userInfo.userId,
        customerId: id 
      });
      
      return updatedCustomer;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch customer by ID");
      
      logUserAction("fetch_customer_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        customerId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Customer
export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_customer_attempt", { 
        userId: userInfo.userId,
        customerEmail: customerData.email || customerData.mobile 
      });
      
      const formData = new FormData();
      
      // Append all customer data to formData
      Object.keys(customerData).forEach(key => {
        if (customerData[key] !== null && customerData[key] !== undefined) {
          formData.append(key, customerData[key]);
        }
      });
      
      const response = await apiClient.customers.createCustomer(formData);
      
      Logger.info("Customer created successfully", {
        userId: userInfo.userId,
        customerId: response.data.customer?.id,
        timestamp: new Date().toISOString()
      }, "CUSTOMER");
      
      logUserAction("customer_created", {
        userId: userInfo.userId,
        customerId: response.data.customer?.id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create customer");
      
      logUserAction("create_customer_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Customer
export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, customerData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_customer_attempt", { 
        userId: userInfo.userId,
        customerId: id 
      });
      
      const formData = new FormData();
      
      // Append all customer data to formData
      Object.keys(customerData).forEach(key => {
        if (customerData[key] !== null && customerData[key] !== undefined) {
          formData.append(key, customerData[key]);
        }
      });
      
      const response = await apiClient.customers.updateCustomer(id, formData);
      
      Logger.info("Customer updated successfully", {
        userId: userInfo.userId,
        customerId: id,
        timestamp: new Date().toISOString()
      }, "CUSTOMER");
      
      logUserAction("customer_updated", {
        userId: userInfo.userId,
        customerId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update customer");
      
      logUserAction("update_customer_failed", {
        userId: getUserInfoForLogging().userId,
        customerId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Toggle Customer Status
export const toggleCustomerStatus = createAsyncThunk(
  "customers/toggleCustomerStatus",
  async (customerId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("toggle_customer_status_attempt", { 
        userId: userInfo.userId,
        customerId 
      });
      
      const response = await apiClient.customers.toggleCustomerStatus(customerId);
      
      Logger.info("Customer status toggled successfully", {
        userId: userInfo.userId,
        customerId,
        newStatus: response.data.active,
        timestamp: new Date().toISOString()
      }, "CUSTOMER");
      
      logUserAction("customer_status_toggled", {
        userId: userInfo.userId,
        customerId,
        status: response.data.active
      });
      
      return {
        customerId,
        active: response.data.active,
        message: response.data.message
      };
    } catch (error) {
      const errorMessage = handleApiError(error, "Toggle customer status");
      
      logUserAction("toggle_customer_status_failed", {
        userId: getUserInfoForLogging().userId,
        customerId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createError = null;
    },
    resetCustomer: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.customer = null;
      state.createSuccess = false;
      state.createError = null;
      state.message = null;
    },
    resetCreateSuccess: (state) => {
      state.createSuccess = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch All Customers
      .addCase(fetchAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.createError = null;
        state.createSuccess = false;
        state.allCustomer = [];
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.allCustomer = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allCustomer = [];
      })
      
      // 🔹 Fetch Customer By ID
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.customer = null;
        state.createSuccess = false;
        state.success = false;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
        state.error = null;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.customer = null;
      })
      
      // 🔹 Create Customer
      .addCase(createCustomer.pending, (state) => {
        state.loading = true;
        state.createError = null;
        state.error = null;
        state.createSuccess = false;
        state.message = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.message = action.payload.message;
        state.allCustomer.push(action.payload.customer || action.payload);
        state.createError = null;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload;
        state.createSuccess = false;
      })
      
      // 🔹 Update Customer
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.success = false;
        state.message = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.allCustomer = state.allCustomer.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        );
        state.error = null;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // 🔹 Toggle Customer Status
      .addCase(toggleCustomerStatus.pending, (state) => {
        state.toggleLoading = true;
        state.error = null;
      })
      .addCase(toggleCustomerStatus.fulfilled, (state, action) => {
        const toggledCustomerId = action.payload.customerId;
        state.toggleLoading = false;
        if (toggledCustomerId) {
          state.allCustomer = state.allCustomer.map((customer) =>
            customer.id === toggledCustomerId
              ? { ...customer, active: !customer.active }
              : customer
          );
        }
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(toggleCustomerStatus.rejected, (state, action) => {
        state.toggleLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  resetCustomer, 
  resetCreateSuccess 
} = customerSlice.actions;

export default customerSlice.reducer;