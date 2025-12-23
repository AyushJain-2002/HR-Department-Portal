// store/Reducers/SalesPersonSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  salesPerson: [], // For sales summary data
  salesPersonList: [], // For sales person dropdown options
  
  // Loading states
  loading: false,
  fetchSummaryLoading: false,
  defaultFetchLoading: false,
  fetchEmployeesLoading: false,
  
  // Error states
  error: null,
  fetchError: null,
  defaultFetchError: null,
  employeesError: null,
  
  // Success states
  success: false,
  fetchSuccess: false,
  defaultFetchSuccess: false,
  employeesSuccess: false,
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
  
  if (error.response?.data?.message) {
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
    status: error.response?.status
  }, "SALES_PERSON_API_ERROR");
  
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
  Logger.info(`Sales Person Action: ${action}`, logDetails, "SALES_PERSON_ACTION");
};

// Helper function to handle 404 errors (return empty array)
const handleNotFoundError = (error, action) => {
  if (error.response?.status === 404) {
    logUserAction(`${action}_not_found`, {
      userId: getUserInfoForLogging().userId,
      status: 404
    });
    return [];
  }
  throw error;
};

// 🔹 Fetch sales person summary with filters
export const fetchSalesPersonSummary = createAsyncThunk(
  "salesPerson/fetchSalesPersonSummary",
  async (filters, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      const { datetype, from, to, branch, sales } = filters || {};
      
      logUserAction("fetch_sales_person_summary_attempt", { 
        userId: userInfo.userId,
        datetype,
        from,
        to,
        branch: branch || 'all',
        sales: sales || 'all'
      });
      
      const response = await apiClient.salesPerson.fetchSalesPersonSummary(filters);
      
      Logger.info("Sales person summary fetched successfully", {
        userId: userInfo.userId,
        datetype,
        period: `${from} to ${to}`,
        branch: branch || 'all',
        sales: sales || 'all',
        recordCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "SALES_PERSON");
      
      logUserAction("sales_person_summary_fetched", { 
        userId: userInfo.userId,
        datetype,
        from,
        to,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      try {
        // Handle 404 specifically
        const emptyArray = handleNotFoundError(error, "fetch_sales_person_summary");
        if (emptyArray !== undefined) {
          return emptyArray;
        }
      } catch (notFoundError) {
        // Not a 404, proceed with normal error handling
        const errorMessage = handleApiError(error, "Fetch sales person summary");
        
        logUserAction("fetch_sales_person_summary_failed", {
          userId: getUserInfoForLogging().userId,
          error: errorMessage
        });
        
        return rejectWithValue(errorMessage);
      }
    }
  }
);

// 🔹 Fetch default sales person summary (current month)
export const fetchDefaultSalesPersonSummary = createAsyncThunk(
  "salesPerson/fetchDefaultSalesPersonSummary",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_default_sales_person_summary_attempt", { 
        userId: userInfo.userId
      });
      
      const response = await apiClient.salesPerson.fetchDefaultSalesPersonSummary();
      
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const from = `${year}-${month}-01`;
      const to = `${year}-${month}-${day}`;
      
      Logger.info("Default sales person summary fetched successfully", {
        userId: userInfo.userId,
        period: `${from} to ${to}`,
        recordCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "SALES_PERSON");
      
      logUserAction("default_sales_person_summary_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      try {
        // Handle 404 specifically
        const emptyArray = handleNotFoundError(error, "fetch_default_sales_person_summary");
        if (emptyArray !== undefined) {
          return emptyArray;
        }
      } catch (notFoundError) {
        // Not a 404, proceed with normal error handling
        const errorMessage = handleApiError(error, "Fetch default sales person summary");
        
        logUserAction("fetch_default_sales_person_summary_failed", {
          userId: getUserInfoForLogging().userId,
          error: errorMessage
        });
        
        return rejectWithValue(errorMessage);
      }
    }
  }
);

// 🔹 Fetch sales employees list for dropdown
export const fetchSalesEmployees = createAsyncThunk(
  "salesPerson/fetchSalesEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_sales_employees_attempt", { 
        userId: userInfo.userId
      });
      
      const response = await apiClient.salesPerson.fetchSalesEmployees();
      
      Logger.info("Sales employees fetched successfully", {
        userId: userInfo.userId,
        employeeCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "SALES_PERSON");
      
      logUserAction("sales_employees_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch sales employees");
      
      logUserAction("fetch_sales_employees_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const salesPersonSlice = createSlice({
  name: "salesPerson",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fetchError = null;
      state.defaultFetchError = null;
      state.employeesError = null;
    },
    resetSalesPerson: (state) => {
      state.salesPerson = [];
      state.salesPersonList = [];
      state.loading = false;
      state.fetchSummaryLoading = false;
      state.defaultFetchLoading = false;
      state.fetchEmployeesLoading = false;
      state.error = null;
      state.fetchError = null;
      state.defaultFetchError = null;
      state.employeesError = null;
      state.success = false;
      state.fetchSuccess = false;
      state.defaultFetchSuccess = false;
      state.employeesSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch sales person summary with filters
      .addCase(fetchSalesPersonSummary.pending, (state) => {
        state.fetchSummaryLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.salesPerson = [];
        state.success = false;
        state.fetchSuccess = false;
        console.log("Fetching sales person summary with filters...");
      })
      .addCase(fetchSalesPersonSummary.fulfilled, (state, action) => {
        state.fetchSummaryLoading = false;
        state.loading = false;
        state.salesPerson = action.payload;
        state.fetchSuccess = true;
        state.success = true;
        state.fetchError = null;
        state.error = null;
        console.log("Sales person summary fetched successfully:", action.payload.length, "records");
      })
      .addCase(fetchSalesPersonSummary.rejected, (state, action) => {
        // If action.payload is an array (404 case), treat as success with empty data
        if (Array.isArray(action.payload)) {
          state.fetchSummaryLoading = false;
          state.loading = false;
          state.salesPerson = action.payload; // Should be empty array []
          state.fetchSuccess = true;
          state.success = true;
          state.fetchError = null;
          state.error = null;
          console.log("No sales person data found (404), returning empty array");
        } else {
          state.fetchSummaryLoading = false;
          state.loading = false;
          state.fetchError = action.payload;
          console.error("Error fetching sales person summary:", action.payload);
        }
      })
      
      // 🔹 Fetch default sales person summary
      .addCase(fetchDefaultSalesPersonSummary.pending, (state) => {
        state.defaultFetchLoading = true;
        state.loading = true;
        state.error = null;
        state.defaultFetchError = null;
        state.salesPerson = [];
        state.success = false;
        state.defaultFetchSuccess = false;
        console.log("Fetching default sales person summary...");
      })
      .addCase(fetchDefaultSalesPersonSummary.fulfilled, (state, action) => {
        state.defaultFetchLoading = false;
        state.loading = false;
        state.salesPerson = action.payload;
        state.defaultFetchSuccess = true;
        state.success = true;
        state.defaultFetchError = null;
        state.error = null;
        console.log("Default sales person summary fetched successfully:", action.payload.length, "records");
      })
      .addCase(fetchDefaultSalesPersonSummary.rejected, (state, action) => {
        // If action.payload is an array (404 case), treat as success with empty data
        if (Array.isArray(action.payload)) {
          state.defaultFetchLoading = false;
          state.loading = false;
          state.salesPerson = action.payload; // Should be empty array []
          state.defaultFetchSuccess = true;
          state.success = true;
          state.defaultFetchError = null;
          state.error = null;
          console.log("No default sales person data found (404), returning empty array");
        } else {
          state.defaultFetchLoading = false;
          state.loading = false;
          state.defaultFetchError = action.payload;
          console.error("Error fetching default sales person summary:", action.payload);
        }
      })
      
      // 🔹 Fetch sales employees list
      .addCase(fetchSalesEmployees.pending, (state) => {
        state.fetchEmployeesLoading = true;
        state.loading = true;
        state.error = null;
        state.employeesError = null;
        state.salesPersonList = [];
        state.employeesSuccess = false;
      })
      .addCase(fetchSalesEmployees.fulfilled, (state, action) => {
        state.fetchEmployeesLoading = false;
        state.loading = false;
        state.salesPersonList = action.payload;
        state.employeesSuccess = true;
        state.employeesError = null;
        state.error = null;
        console.log("Sales employees fetched successfully:", action.payload.length, "employees");
      })
      .addCase(fetchSalesEmployees.rejected, (state, action) => {
        state.fetchEmployeesLoading = false;
        state.loading = false;
        state.employeesError = action.payload;
        console.error("Error fetching sales employees:", action.payload);
      });
  },
});

export const { clearError, resetSalesPerson } = salesPersonSlice.actions;
export default salesPersonSlice.reducer;