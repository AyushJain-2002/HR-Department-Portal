import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  inventory: null,
  inventories: [],
  
  // Loading states
  loading: false,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  
  // Error states
  error: null,
  fetchError: null,
  createError: null,
  updateError: null,
  deleteError: null,
  
  // Success states
  success: false,
  editSuccess: false,
  fetchSuccess: false,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
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
  }, "INVENTORY_API_ERROR");
  
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
  Logger.info(`Inventory Action: ${action}`, logDetails, "INVENTORY_ACTION");
};

// 🔹 Fetch Inventories
export const fetchInventories = createAsyncThunk(
  "inventory/fetchInventories",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_inventories_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.inventory.fetchInventories();
      
      Logger.info("Inventories fetched successfully", {
        userId: userInfo.userId,
        inventoryCount: response.data?.data?.length || response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "INVENTORY");
      
      logUserAction("inventories_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || response.data?.length || 0
      });
      
      return response.data?.data || response.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch inventories");
      
      logUserAction("fetch_inventories_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Inventory By ID
export const fetchInventoryById = createAsyncThunk(
  "inventory/fetchInventoryById",
  async (inventoryId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_inventory_by_id_attempt", { 
        userId: userInfo.userId,
        inventoryId 
      });
      
      const response = await apiClient.inventory.fetchInventoryById(inventoryId);
      
      Logger.info("Inventory fetched successfully", {
        userId: userInfo.userId,
        inventoryId,
        timestamp: new Date().toISOString()
      }, "INVENTORY");
      
      logUserAction("inventory_fetched_by_id", { 
        userId: userInfo.userId,
        inventoryId 
      });
      
      return response.data?.data || response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch inventory by ID");
      
      logUserAction("fetch_inventory_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        inventoryId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Inventory
export const createInventory = createAsyncThunk(
  "inventory/createInventory",
  async (inventoryData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_inventory_attempt", { 
        userId: userInfo.userId,
        inventoryName: inventoryData.name || inventoryData.item_name,
        inventoryCode: inventoryData.code || inventoryData.item_code
      });
      
      const response = await apiClient.inventory.createInventory(inventoryData);
      
      Logger.info("Inventory created successfully", {
        userId: userInfo.userId,
        inventoryId: response.data?.id,
        inventoryName: inventoryData.name || inventoryData.item_name,
        timestamp: new Date().toISOString()
      }, "INVENTORY");
      
      logUserAction("inventory_created", {
        userId: userInfo.userId,
        inventoryName: inventoryData.name || inventoryData.item_name
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create inventory");
      
      logUserAction("create_inventory_failed", {
        userId: getUserInfoForLogging().userId,
        inventoryName: inventoryData.name || inventoryData.item_name,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Inventory
export const updateInventory = createAsyncThunk(
  "inventory/updateInventory",
  async ({ id, inventoryData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_inventory_attempt", { 
        userId: userInfo.userId,
        inventoryId: id 
      });
      
      const response = await apiClient.inventory.updateInventory(id, inventoryData);
      
      Logger.info("Inventory updated successfully", {
        userId: userInfo.userId,
        inventoryId: id,
        timestamp: new Date().toISOString()
      }, "INVENTORY");
      
      logUserAction("inventory_updated", {
        userId: userInfo.userId,
        inventoryId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update inventory");
      
      logUserAction("update_inventory_failed", {
        userId: getUserInfoForLogging().userId,
        inventoryId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Inventory
export const deleteInventory = createAsyncThunk(
  "inventory/deleteInventory",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_inventory_attempt", { 
        userId: userInfo.userId,
        inventoryId: id 
      });
      
      await apiClient.inventory.deleteInventory(id);
      
      Logger.info("Inventory deleted successfully", {
        userId: userInfo.userId,
        inventoryId: id,
        timestamp: new Date().toISOString()
      }, "INVENTORY");
      
      logUserAction("inventory_deleted", {
        userId: userInfo.userId,
        inventoryId: id
      });
      
      return id;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete inventory");
      
      logUserAction("delete_inventory_failed", {
        userId: getUserInfoForLogging().userId,
        inventoryId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fetchError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
    resetInventoryState: (state) => {
      state.inventory = null;
      state.inventories = [];
      state.loading = false;
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.error = null;
      state.fetchError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
      state.success = false;
      state.editSuccess = false;
      state.fetchSuccess = false;
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Inventories
      .addCase(fetchInventories.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.success = false;
        state.editSuccess = false;
      })
      .addCase(fetchInventories.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.inventories = action.payload;
        state.fetchSuccess = true;
        state.fetchError = null;
        state.error = null;
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
      })
      
      // 🔹 Create Inventory
      .addCase(createInventory.pending, (state) => {
        state.createLoading = true;
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.createSuccess = false;
        state.success = false;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.createSuccess = true;
        state.success = true;
        state.inventories.push(action.payload);
        state.createError = null;
        state.error = null;
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.createError = action.payload;
      })
      
      // 🔹 Fetch Inventory By ID
      .addCase(fetchInventoryById.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.inventory = null;
      })
      .addCase(fetchInventoryById.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.inventory = action.payload;
        state.fetchError = null;
        state.error = null;
      })
      .addCase(fetchInventoryById.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
        state.inventory = null;
      })
      
      // 🔹 Update Inventory
      .addCase(updateInventory.pending, (state) => {
        state.updateLoading = true;
        state.loading = true;
        state.error = null;
        state.updateError = null;
        state.updateSuccess = false;
        state.editSuccess = false;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.loading = false;
        state.updateSuccess = true;
        state.editSuccess = true;
        state.inventories = state.inventories.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.updateError = null;
        state.error = null;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.updateLoading = false;
        state.loading = false;
        state.updateError = action.payload;
      })
      
      // 🔹 Delete Inventory
      .addCase(deleteInventory.pending, (state) => {
        state.deleteLoading = true;
        state.loading = true;
        state.error = null;
        state.deleteError = null;
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;
        state.inventories = state.inventories.filter(
          (item) => item.id !== action.payload
        );
        state.deleteSuccess = true;
        state.deleteError = null;
        state.error = null;
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;
        state.deleteError = action.payload;
      });
  },
});

export const { clearError, resetInventoryState } = inventorySlice.actions;
export default inventorySlice.reducer;