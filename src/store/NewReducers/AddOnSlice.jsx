import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  addons: [],
  
  // Loading states
  loading: false,
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  
  // Error states
  error: null,
  fetchError: null,
  createError: null,
  deleteError: null,
  
  // Success states
  success: false,
  fetchSuccess: false,
  createSuccess: false,
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
  }, "ADDON_API_ERROR");
  
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
  Logger.info(`Addon Action: ${action}`, logDetails, "ADDON_ACTION");
};

// 🔹 Fetch Addons
export const fetchAddons = createAsyncThunk(
  "addons/fetchAddons",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_addons_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.addons.fetchAddons();
      
      Logger.info("Addons fetched successfully", {
        userId: userInfo.userId,
        addonCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "ADDONS");
      
      logUserAction("addons_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch addons");
      
      logUserAction("fetch_addons_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      // For 404 errors, return empty array instead of error
      if (error.response?.status === 404) {
        return [];
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Addon
export const createAddon = createAsyncThunk(
  "addons/createAddon",
  async (addonData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_addon_attempt", { 
        userId: userInfo.userId,
        addonName: addonData.addon_name,
        addonData
      });
      
      const response = await apiClient.addons.createAddon(addonData);
      
      Logger.info("Addon created successfully", {
        userId: userInfo.userId,
        addonId: response.data?.addon?.id || response.data?.id,
        addonName: addonData.addon_name,
        timestamp: new Date().toISOString()
      }, "ADDONS");
      
      logUserAction("addon_created", {
        userId: userInfo.userId,
        addonName: addonData.addon_name
      });
      
      return response.data?.addon || response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create addon");
      
      logUserAction("create_addon_failed", {
        userId: getUserInfoForLogging().userId,
        addonName: addonData.addon_name,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Addon
export const deleteAddon = createAsyncThunk(
  "addons/deleteAddon",
  async (addonId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_addon_attempt", { 
        userId: userInfo.userId,
        addonId 
      });
      
      await apiClient.addons.deleteAddon(addonId);
      
      Logger.info("Addon deleted successfully", {
        userId: userInfo.userId,
        addonId,
        timestamp: new Date().toISOString()
      }, "ADDONS");
      
      logUserAction("addon_deleted", {
        userId: userInfo.userId,
        addonId
      });
      
      return addonId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete addon");
      
      logUserAction("delete_addon_failed", {
        userId: getUserInfoForLogging().userId,
        addonId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const addonSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fetchError = null;
      state.createError = null;
      state.deleteError = null;
    },
    resetAddonState: (state) => {
      state.addons = [];
      state.loading = false;
      state.fetchLoading = false;
      state.createLoading = false;
      state.deleteLoading = false;
      state.error = null;
      state.fetchError = null;
      state.createError = null;
      state.deleteError = null;
      state.success = false;
      state.fetchSuccess = false;
      state.createSuccess = false;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Addons
      .addCase(fetchAddons.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.fetchSuccess = false;
      })
      .addCase(fetchAddons.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.addons = action.payload;
        state.fetchSuccess = true;
        state.fetchError = null;
        state.error = null;
      })
      .addCase(fetchAddons.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
      })
      
      // 🔹 Create Addon
      .addCase(createAddon.pending, (state) => {
        state.createLoading = true;
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.createSuccess = false;
        state.success = false;
      })
      .addCase(createAddon.fulfilled, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.createSuccess = true;
        state.success = true;
        state.addons.push(action.payload);
        state.createError = null;
        state.error = null;
      })
      .addCase(createAddon.rejected, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.createError = action.payload;
      })
      
      // 🔹 Delete Addon
      .addCase(deleteAddon.pending, (state) => {
        state.deleteLoading = true;
        state.loading = true;
        state.error = null;
        state.deleteError = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteAddon.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;
        state.deleteSuccess = true;
        state.addons = state.addons.filter((addon) => addon.id !== action.payload);
        state.deleteError = null;
        state.error = null;
      })
      .addCase(deleteAddon.rejected, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;
        state.deleteError = action.payload;
      });
  },
});

export const { clearError, resetAddonState } = addonSlice.actions;
export default addonSlice.reducer;