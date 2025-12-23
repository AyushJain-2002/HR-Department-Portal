// store/Reducers/SalesSummarySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  salesSummary: [],
  
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
  }, "SALES_SUMMARY_API_ERROR");
  
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
  Logger.info(`Sales Summary Action: ${action}`, logDetails, "SALES_SUMMARY_ACTION");
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

// 🔹 Fetch sales summary with filters
export const fetchSalesSummary = createAsyncThunk(
  "salesSummary/fetchSalesSummary",
  async (filters, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      const { datetype, from, to, branch, bqp, relationship_manager, posp } = filters || {};
      
      logUserAction("fetch_sales_summary_attempt", { 
        userId: userInfo.userId,
        datetype,
        from,
        to,
        branch: branch || 'all',
        bqp: bqp || 'all',
        relationship_manager: relationship_manager || 'all',
        posp: posp || 'all'
      });
      
      const response = await apiClient.salesSummary.fetchSalesSummary(filters);
      
      console.log("Sales summary response:", response.data?.data);
      
      Logger.info("Sales summary fetched successfully", {
        userId: userInfo.userId,
        datetype,
        period: `${from} to ${to}`,
        branch: branch || 'all',
        bqp: bqp || 'all',
        relationship_manager: relationship_manager || 'all',
        posp: posp || 'all',
        recordCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "SALES_SUMMARY");
      
      logUserAction("sales_summary_fetched", { 
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
        const emptyArray = handleNotFoundError(error, "fetch_sales_summary");
        if (emptyArray !== undefined) {
          return emptyArray;
        }
      } catch (notFoundError) {
        // Not a 404, proceed with normal error handling
        const errorMessage = handleApiError(error, "Fetch sales summary");
        
        logUserAction("fetch_sales_summary_failed", {
          userId: getUserInfoForLogging().userId,
          error: errorMessage
        });
        
        return rejectWithValue(errorMessage);
      }
    }
  }
);

// 🔹 Fetch default sales summary (current month)
export const fetchDefaultSalesSummary = createAsyncThunk(
  "salesSummary/fetchDefaultSalesSummary",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_default_sales_summary_attempt", { 
        userId: userInfo.userId
      });
      
      const response = await apiClient.salesSummary.fetchDefaultSalesSummary();
      
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const from = `${year}-${month}-01`;
      const to = `${year}-${month}-${day}`;
      
      console.log("Default sales summary response:", response.data?.data);
      
      Logger.info("Default sales summary fetched successfully", {
        userId: userInfo.userId,
        period: `${from} to ${to}`,
        recordCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "SALES_SUMMARY");
      
      logUserAction("default_sales_summary_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      try {
        // Handle 404 specifically
        const emptyArray = handleNotFoundError(error, "fetch_default_sales_summary");
        if (emptyArray !== undefined) {
          return emptyArray;
        }
      } catch (notFoundError) {
        // Not a 404, proceed with normal error handling
        const errorMessage = handleApiError(error, "Fetch default sales summary");
        
        logUserAction("fetch_default_sales_summary_failed", {
          userId: getUserInfoForLogging().userId,
          error: errorMessage
        });
        
        return rejectWithValue(errorMessage);
      }
    }
  }
);

const salesSummarySlice = createSlice({
  name: "salesSummary",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fetchError = null;
      state.defaultFetchError = null;
    },
    resetSalesSummary: (state) => {
      state.salesSummary = [];
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
      // 🔹 Fetch sales summary with filters
      .addCase(fetchSalesSummary.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.salesSummary = [];
        state.success = false;
        state.fetchSuccess = false;
        console.log("Fetching sales summary with filters...");
      })
      .addCase(fetchSalesSummary.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.salesSummary = action.payload;
        state.fetchSuccess = true;
        state.success = true;
        state.fetchError = null;
        state.error = null;
        console.log("Sales summary fetched successfully:", action.payload.length, "records");
      })
      .addCase(fetchSalesSummary.rejected, (state, action) => {
        // If action.payload is an array (404 case), treat as success with empty data
        if (Array.isArray(action.payload)) {
          state.fetchLoading = false;
          state.loading = false;
          state.salesSummary = action.payload; // Should be empty array []
          state.fetchSuccess = true;
          state.success = true;
          state.fetchError = null;
          state.error = null;
          console.log("No sales summary data found (404), returning empty array");
        } else {
          state.fetchLoading = false;
          state.loading = false;
          state.fetchError = action.payload;
          console.error("Error fetching sales summary:", action.payload);
        }
      })
      
      // 🔹 Fetch default sales summary
      .addCase(fetchDefaultSalesSummary.pending, (state) => {
        state.defaultFetchLoading = true;
        state.loading = true;
        state.error = null;
        state.defaultFetchError = null;
        state.salesSummary = [];
        state.success = false;
        state.defaultFetchSuccess = false;
        console.log("Fetching default sales summary...");
      })
      .addCase(fetchDefaultSalesSummary.fulfilled, (state, action) => {
        state.defaultFetchLoading = false;
        state.loading = false;
        state.salesSummary = action.payload;
        state.defaultFetchSuccess = true;
        state.success = true;
        state.defaultFetchError = null;
        state.error = null;
        console.log("Default sales summary fetched successfully:", action.payload.length, "records");
      })
      .addCase(fetchDefaultSalesSummary.rejected, (state, action) => {
        // If action.payload is an array (404 case), treat as success with empty data
        if (Array.isArray(action.payload)) {
          state.defaultFetchLoading = false;
          state.loading = false;
          state.salesSummary = action.payload; // Should be empty array []
          state.defaultFetchSuccess = true;
          state.success = true;
          state.defaultFetchError = null;
          state.error = null;
          console.log("No default sales summary data found (404), returning empty array");
        } else {
          state.defaultFetchLoading = false;
          state.loading = false;
          state.defaultFetchError = action.payload;
          console.error("Error fetching default sales summary:", action.payload);
        }
      });
  },
});

export const { clearError, resetSalesSummary } = salesSummarySlice.actions;
export default salesSummarySlice.reducer;