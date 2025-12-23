import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  growthreports: [],
  
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
  }, "GROWTH_REPORT_API_ERROR");
  
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
  Logger.info(`Growth Report Action: ${action}`, logDetails, "GROWTH_REPORT_ACTION");
};

// 🔹 Fetch Growth Reports with Filters
export const fetchGrowthReports = createAsyncThunk(
  "growthreports/fetchGrowthReports",
  async (filters, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_growth_reports_attempt", { 
        userId: userInfo.userId,
        filters: {
          datetype: filters.datetype,
          policy_date_type: filters.policy_date_type,
          from: filters.from,
          to: filters.to,
          financial_year: filters.financial_year,
          month: filters.month,
          hasBranch: !!filters.branch,
          hasBqp: !!filters.bqp,
          hasRelationshipManager: !!filters.relationship_manager,
          hasPosp: !!filters.posp,
        }
      });
      
      const response = await apiClient.growthReports.fetchGrowthReports(filters);
      
      Logger.info("Growth reports fetched successfully", {
        userId: userInfo.userId,
        reportCount: response.data?.data?.length || 0,
        filters: {
          datetype: filters.datetype,
          from: filters.from,
          to: filters.to,
        },
        timestamp: new Date().toISOString()
      }, "GROWTH_REPORTS");
      
      logUserAction("growth_reports_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch growth reports");
      
      logUserAction("fetch_growth_reports_failed", {
        userId: getUserInfoForLogging().userId,
        filters: {
          datetype: filters.datetype,
          from: filters.from,
          to: filters.to,
        },
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

// 🔹 Fetch Default Growth Reports
export const fetchDefaultGrowthReports = createAsyncThunk(
  "growthreports/fetchDefaultGrowthReports",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_default_growth_reports_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.growthReports.fetchDefaultGrowthReports();
      
      Logger.info("Default growth reports fetched successfully", {
        userId: userInfo.userId,
        reportCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "GROWTH_REPORTS");
      
      logUserAction("default_growth_reports_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch default growth reports");
      
      logUserAction("fetch_default_growth_reports_failed", {
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

const growthreportsSlice = createSlice({
  name: "growthreports",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fetchError = null;
    },
    resetGrowthReportState: (state) => {
      state.growthreports = [];
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
      // 🔹 Fetch Growth Reports
      .addCase(fetchGrowthReports.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.fetchSuccess = false;
        state.success = false;
        state.growthreports = [];
      })
      .addCase(fetchGrowthReports.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.growthreports = action.payload;
        state.fetchSuccess = true;
        state.success = true;
        state.fetchError = null;
        state.error = null;
      })
      .addCase(fetchGrowthReports.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
      })
      
      // 🔹 Fetch Default Growth Reports
      .addCase(fetchDefaultGrowthReports.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.fetchSuccess = false;
        state.success = false;
        state.growthreports = [];
      })
      .addCase(fetchDefaultGrowthReports.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.growthreports = action.payload;
        state.fetchSuccess = true;
        state.success = true;
        state.fetchError = null;
        state.error = null;
      })
      .addCase(fetchDefaultGrowthReports.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
      });
  },
});

export const { clearError, resetGrowthReportState } = growthreportsSlice.actions;
export default growthreportsSlice.reducer;