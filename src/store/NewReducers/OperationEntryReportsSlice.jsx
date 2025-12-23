// store/Reducers/OperationEntryReportsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  operationEntryReports: [],
  
  // Loading states
  loading: false,
  fetchLoading: false,
  defaultFetchLoading: false,
  
  // Error states
  error: null,
  fetchError: null,
  defaultFetchError: null,
  
  // Success states
  success: false,
  fetchSuccess: false,
  defaultFetchSuccess: false,
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
  }, "OPERATION_ENTRY_REPORTS_API_ERROR");
  
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
  Logger.info(`Operation Entry Reports Action: ${action}`, logDetails, "OPERATION_ENTRY_REPORTS_ACTION");
};

// Helper function to handle 404 errors (return empty array)
const handleNotFoundError = (error, action, dispatch) => {
  if (error.response?.status === 404) {
    logUserAction(`${action}_not_found`, {
      userId: getUserInfoForLogging().userId,
      status: 404
    });
    return [];
  }
  throw error;
};

// 🔹 Fetch operation entry reports with filters
export const fetchOperationEntryReports = createAsyncThunk(
  "operationEntryReports/fetchOperationEntryReports",
  async (filters, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      const { type, from, to, branch } = filters || {};
      
      logUserAction("fetch_operation_entry_reports_attempt", { 
        userId: userInfo.userId,
        type,
        from,
        to,
        branch
      });
      
      const response = await apiClient.operationEntryReports.fetchOperationEntryReports(filters);
      
      Logger.info("Operation entry reports fetched successfully", {
        userId: userInfo.userId,
        type,
        from,
        to,
        branch: branch || "all",
        reportCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "OPERATION_ENTRY_REPORTS");
      
      logUserAction("operation_entry_reports_fetched", { 
        userId: userInfo.userId,
        type,
        from,
        to,
        branch: branch || "all",
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      try {
        // Handle 404 specifically
        const emptyArray = handleNotFoundError(error, "fetch_operation_entry_reports", rejectWithValue);
        if (emptyArray !== undefined) {
          return emptyArray;
        }
      } catch (notFoundError) {
        // Not a 404, proceed with normal error handling
        const errorMessage = handleApiError(error, "Fetch operation entry reports");
        
        logUserAction("fetch_operation_entry_reports_failed", {
          userId: getUserInfoForLogging().userId,
          error: errorMessage
        });
        
        return rejectWithValue(errorMessage);
      }
    }
  }
);

// 🔹 Fetch default operation entry reports (current month)
export const fetchDefaultOperationEntryReports = createAsyncThunk(
  "operationEntryReports/fetchDefaultOperationEntryReports",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_default_operation_entry_reports_attempt", { 
        userId: userInfo.userId
      });
      
      const response = await apiClient.operationEntryReports.fetchDefaultOperationEntryReports();
      
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const from = `${year}-${month}-01`;
      const to = `${year}-${month}-${day}`;
      
      Logger.info("Default operation entry reports fetched successfully", {
        userId: userInfo.userId,
        period: `${from} to ${to}`,
        reportCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "OPERATION_ENTRY_REPORTS");
      
      logUserAction("default_operation_entry_reports_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      try {
        // Handle 404 specifically
        const emptyArray = handleNotFoundError(error, "fetch_default_operation_entry_reports", rejectWithValue);
        if (emptyArray !== undefined) {
          return emptyArray;
        }
      } catch (notFoundError) {
        // Not a 404, proceed with normal error handling
        const errorMessage = handleApiError(error, "Fetch default operation entry reports");
        
        logUserAction("fetch_default_operation_entry_reports_failed", {
          userId: getUserInfoForLogging().userId,
          error: errorMessage
        });
        
        return rejectWithValue(errorMessage);
      }
    }
  }
);

const operationEntryReportsSlice = createSlice({
  name: "operationEntryReports",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fetchError = null;
      state.defaultFetchError = null;
    },
    resetOperationEntryReports: (state) => {
      state.operationEntryReports = [];
      state.loading = false;
      state.fetchLoading = false;
      state.defaultFetchLoading = false;
      state.error = null;
      state.fetchError = null;
      state.defaultFetchError = null;
      state.success = false;
      state.fetchSuccess = false;
      state.defaultFetchSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch operation entry reports with filters
      .addCase(fetchOperationEntryReports.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.operationEntryReports = [];
        state.success = false;
        state.fetchSuccess = false;
        console.log("Fetching operation entry reports with filters...");
      })
      .addCase(fetchOperationEntryReports.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.operationEntryReports = action.payload;
        state.fetchSuccess = true;
        state.success = true;
        state.fetchError = null;
        state.error = null;
        console.log("Operation entry reports fetched successfully:", action.payload.length, "records");
      })
      .addCase(fetchOperationEntryReports.rejected, (state, action) => {
        // If action.payload is an array (404 case), treat as success with empty data
        if (Array.isArray(action.payload)) {
          state.fetchLoading = false;
          state.loading = false;
          state.operationEntryReports = action.payload; // Should be empty array []
          state.fetchSuccess = true;
          state.success = true;
          state.fetchError = null;
          state.error = null;
          console.log("No reports found (404), returning empty array");
        } else {
          state.fetchLoading = false;
          state.loading = false;
          state.fetchError = action.payload;
          console.error("Error fetching operation entry reports:", action.payload);
        }
      })
      
      // 🔹 Fetch default operation entry reports
      .addCase(fetchDefaultOperationEntryReports.pending, (state) => {
        state.defaultFetchLoading = true;
        state.loading = true;
        state.error = null;
        state.defaultFetchError = null;
        state.operationEntryReports = [];
        state.success = false;
        state.defaultFetchSuccess = false;
        console.log("Fetching default operation entry reports...");
      })
      .addCase(fetchDefaultOperationEntryReports.fulfilled, (state, action) => {
        state.defaultFetchLoading = false;
        state.loading = false;
        state.operationEntryReports = action.payload;
        state.defaultFetchSuccess = true;
        state.success = true;
        state.defaultFetchError = null;
        state.error = null;
        console.log("Default operation entry reports fetched successfully:", action.payload.length, "records");
      })
      .addCase(fetchDefaultOperationEntryReports.rejected, (state, action) => {
        // If action.payload is an array (404 case), treat as success with empty data
        if (Array.isArray(action.payload)) {
          state.defaultFetchLoading = false;
          state.loading = false;
          state.operationEntryReports = action.payload; // Should be empty array []
          state.defaultFetchSuccess = true;
          state.success = true;
          state.defaultFetchError = null;
          state.error = null;
          console.log("No default reports found (404), returning empty array");
        } else {
          state.defaultFetchLoading = false;
          state.loading = false;
          state.defaultFetchError = action.payload;
          console.error("Error fetching default operation entry reports:", action.payload);
        }
      });
  },
});

export const { clearError, resetOperationEntryReports } = operationEntryReportsSlice.actions;
export default operationEntryReportsSlice.reducer;