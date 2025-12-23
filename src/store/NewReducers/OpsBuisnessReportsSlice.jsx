// store/Reducers/OpsBusinessReportsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  opsReports: [],
  
  // Loading states
  loading: false,
  fetchLoading: false,
  
  // Error states
  error: null,
  fetchError: null,
  
  // Success states
  success: false,
  fetchSuccess: false,
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
  }, "OPS_BUSINESS_REPORTS_API_ERROR");
  
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
  Logger.info(`OPS Business Reports Action: ${action}`, logDetails, "OPS_BUSINESS_REPORTS_ACTION");
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

// 🔹 Fetch OPS business reports
export const fetchOpsBusinessReports = createAsyncThunk(
  "opsBusinessReports/fetchOpsBusinessReports",
  async ({ datetype, date }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_ops_business_reports_attempt", { 
        userId: userInfo.userId,
        datetype,
        date
      });
      
      const response = await apiClient.opsBusinessReports.fetchOpsBusinessReports(datetype, date);
      
      Logger.info("OPS business reports fetched successfully", {
        userId: userInfo.userId,
        datetype,
        date,
        reportCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "OPS_BUSINESS_REPORTS");
      
      logUserAction("ops_business_reports_fetched", { 
        userId: userInfo.userId,
        datetype,
        date,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      try {
        // Handle 404 specifically
        const emptyArray = handleNotFoundError(error, "fetch_ops_business_reports");
        if (emptyArray !== undefined) {
          return emptyArray;
        }
      } catch (notFoundError) {
        // Not a 404, proceed with normal error handling
        const errorMessage = handleApiError(error, "Fetch OPS business reports");
        
        logUserAction("fetch_ops_business_reports_failed", {
          userId: getUserInfoForLogging().userId,
          datetype,
          date,
          error: errorMessage
        });
        
        return rejectWithValue(errorMessage);
      }
    }
  }
);

const opsBusinessReportsSlice = createSlice({
  name: "opsBusinessReports",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fetchError = null;
    },
    resetOpsBusinessReports: (state) => {
      state.opsReports = [];
      state.loading = false;
      state.fetchLoading = false;
      state.error = null;
      state.fetchError = null;
      state.success = false;
      state.fetchSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch OPS business reports
      .addCase(fetchOpsBusinessReports.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.opsReports = [];
        state.success = false;
        state.fetchSuccess = false;
        console.log("Fetching OPS business reports...", {
          timestamp: new Date().toISOString()
        });
      })
      .addCase(fetchOpsBusinessReports.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.opsReports = action.payload;
        state.fetchSuccess = true;
        state.success = true;
        state.fetchError = null;
        state.error = null;
        console.log("OPS business reports fetched successfully:", {
          count: action.payload.length,
          timestamp: new Date().toISOString()
        });
      })
      .addCase(fetchOpsBusinessReports.rejected, (state, action) => {
        // If action.payload is an array (404 case), treat as success with empty data
        if (Array.isArray(action.payload)) {
          state.fetchLoading = false;
          state.loading = false;
          state.opsReports = action.payload; // Should be empty array []
          state.fetchSuccess = true;
          state.success = true;
          state.fetchError = null;
          state.error = null;
          console.log("No OPS business reports found (404), returning empty array");
        } else {
          state.fetchLoading = false;
          state.loading = false;
          state.fetchError = action.payload;
          console.error("Error fetching OPS business reports:", action.payload);
        }
      });
  },
});

export const { clearError, resetOpsBusinessReports } = opsBusinessReportsSlice.actions;
export default opsBusinessReportsSlice.reducer;