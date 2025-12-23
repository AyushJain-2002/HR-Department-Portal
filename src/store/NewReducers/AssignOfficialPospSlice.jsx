// store/Reducers/AssignOfficialPospSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  branches: [],
  bqp: [],
  relationshipManagers: [],
  message: null,
  
  // Loading states
  loading: false,
  fetchBranchesLoading: false,
  fetchBqpLoading: false,
  fetchRelationshipManagerLoading: false,
  hrVerificationLoading: false,
  
  // Error states
  error: null,
  fetchError: null,
  bqpError: null,
  relationshipManagerError: null,
  hrVerificationError: null,
  
  // Success states
  fetchSuccess: false,
  bqpSuccess: false,
  relationshipManagerSuccess: false,
  hrVerificationSuccess: false,
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
  
  if (error.response?.data?.error) {
    errorMessage = error.response.data.error;
    if (error.response?.data?.details) {
      errorMessage += ` (${error.response.data.details})`;
    }
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
  }, "ASSIGN_OFFICIAL_POSP_API_ERROR");
  
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
  Logger.info(`Assign Official POSP Action: ${action}`, logDetails, "ASSIGN_OFFICIAL_POSP_ACTION");
};

// 🔹 Fetch branches
export const fetchBranches = createAsyncThunk(
  "assignOfficialPosp/fetchBranches",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_branches_attempt", { 
        userId: userInfo.userId
      });
      
      const response = await apiClient.assignOfficialPosp.fetchBranches();
      
      console.log("Branches response:", response.data);
      
      Logger.info("Branches fetched successfully", {
        userId: userInfo.userId,
        branchesCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "ASSIGN_OFFICIAL_POSP");
      
      logUserAction("branches_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return {
        data: response.data?.data || [],
        message: response.data?.message || "Branches fetched successfully"
      };
    } catch (error) {
      console.error("Error fetching branches:", error);
      const errorMessage = handleApiError(error, "Fetch branches");
      
      logUserAction("fetch_branches_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch BQP by branch ID
export const fetchBqpByBranch = createAsyncThunk(
  "assignOfficialPosp/fetchBqpByBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_bqp_by_branch_attempt", { 
        userId: userInfo.userId,
        branchId
      });
      
      const response = await apiClient.assignOfficialPosp.fetchBqpByBranch(branchId);
      
      Logger.info("BQP fetched by branch successfully", {
        userId: userInfo.userId,
        branchId,
        bqpCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "ASSIGN_OFFICIAL_POSP");
      
      logUserAction("bqp_fetched_by_branch", { 
        userId: userInfo.userId,
        branchId,
        count: response.data?.data?.length || 0
      });
      
      return {
        data: response.data?.data || [],
        message: response.data?.message || "BQP fetched successfully"
      };
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch BQP by branch");
      
      logUserAction("fetch_bqp_by_branch_failed", {
        userId: getUserInfoForLogging().userId,
        branchId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch relationship manager by BQP ID
export const fetchRelationshipManagerByBqp = createAsyncThunk(
  "assignOfficialPosp/fetchRelationshipManagerByBqp",
  async (bqpId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_relationship_manager_by_bqp_attempt", { 
        userId: userInfo.userId,
        bqpId
      });
      
      const response = await apiClient.assignOfficialPosp.fetchRelationshipManagerByBqp(bqpId);
      
      Logger.info("Relationship manager fetched by BQP successfully", {
        userId: userInfo.userId,
        bqpId,
        managerCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "ASSIGN_OFFICIAL_POSP");
      
      logUserAction("relationship_manager_fetched_by_bqp", { 
        userId: userInfo.userId,
        bqpId,
        count: response.data?.data?.length || 0
      });
      
      return {
        data: response.data?.data || [],
        message: response.data?.message || "Relationship manager fetched successfully"
      };
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch relationship manager by BQP");
      
      logUserAction("fetch_relationship_manager_by_bqp_failed", {
        userId: getUserInfoForLogging().userId,
        bqpId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Submit HR verification
export const submitHrVerification = createAsyncThunk(
  "assignOfficialPosp/submitHrVerification",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("submit_hr_verification_attempt", { 
        userId: userInfo.userId,
        pospId: id
      });
      
      const response = await apiClient.assignOfficialPosp.submitHrVerification(id, formData);
      
      Logger.info("HR verification submitted successfully", {
        userId: userInfo.userId,
        pospId: id,
        timestamp: new Date().toISOString()
      }, "ASSIGN_OFFICIAL_POSP");
      
      logUserAction("hr_verification_submitted", {
        userId: userInfo.userId,
        pospId: id,
        message: response.data?.message
      });
      
      return response.data;
    } catch (error) {
      let errorMessage = handleApiError(error, "Submit HR verification");
      
      logUserAction("submit_hr_verification_failed", {
        userId: getUserInfoForLogging().userId,
        pospId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const assignOfficialPospSlice = createSlice({
  name: "assignOfficialPosp",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fetchError = null;
      state.bqpError = null;
      state.relationshipManagerError = null;
      state.hrVerificationError = null;
    },
    resetHrVerification: (state) => {
      state.hrVerificationLoading = false;
      state.hrVerificationError = null;
      state.hrVerificationSuccess = false;
      state.message = null;
    },
    resetAssignOfficialPosp: (state) => {
      state.branches = [];
      state.bqp = [];
      state.relationshipManagers = [];
      state.message = null;
      state.loading = false;
      state.fetchBranchesLoading = false;
      state.fetchBqpLoading = false;
      state.fetchRelationshipManagerLoading = false;
      state.hrVerificationLoading = false;
      state.error = null;
      state.fetchError = null;
      state.bqpError = null;
      state.relationshipManagerError = null;
      state.hrVerificationError = null;
      state.fetchSuccess = false;
      state.bqpSuccess = false;
      state.relationshipManagerSuccess = false;
      state.hrVerificationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch branches
      .addCase(fetchBranches.pending, (state) => {
        state.fetchBranchesLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.fetchSuccess = false;
        state.message = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.fetchBranchesLoading = false;
        state.loading = false;
        state.branches = action.payload.data;
        state.message = action.payload.message;
        state.fetchSuccess = true;
        state.fetchError = null;
        state.error = null;
        console.log("Branches fetched successfully:", action.payload.data?.length, "branches");
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.fetchBranchesLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
        state.branches = [];
        console.error("Error fetching branches:", action.payload);
      })
      
      // 🔹 Fetch BQP by branch
      .addCase(fetchBqpByBranch.pending, (state) => {
        state.fetchBqpLoading = true;
        state.loading = true;
        state.error = null;
        state.bqpError = null;
        state.bqpSuccess = false;
        state.message = null;
        state.bqp = [];
      })
      .addCase(fetchBqpByBranch.fulfilled, (state, action) => {
        state.fetchBqpLoading = false;
        state.loading = false;
        state.bqp = action.payload.data;
        state.message = action.payload.message;
        state.bqpSuccess = true;
        state.bqpError = null;
        state.error = null;
        console.log("BQP fetched by branch successfully:", action.payload.data?.length, "BQP");
      })
      .addCase(fetchBqpByBranch.rejected, (state, action) => {
        state.fetchBqpLoading = false;
        state.loading = false;
        state.bqpError = action.payload;
        state.bqp = [];
        console.error("Error fetching BQP by branch:", action.payload);
      })
      
      // 🔹 Fetch relationship manager by BQP
      .addCase(fetchRelationshipManagerByBqp.pending, (state) => {
        state.fetchRelationshipManagerLoading = true;
        state.loading = true;
        state.error = null;
        state.relationshipManagerError = null;
        state.relationshipManagerSuccess = false;
        state.message = null;
        state.relationshipManagers = [];
      })
      .addCase(fetchRelationshipManagerByBqp.fulfilled, (state, action) => {
        state.fetchRelationshipManagerLoading = false;
        state.loading = false;
        state.relationshipManagers = action.payload.data;
        state.message = action.payload.message;
        state.relationshipManagerSuccess = true;
        state.relationshipManagerError = null;
        state.error = null;
        console.log("Relationship manager fetched successfully:", action.payload.data?.length, "managers");
      })
      .addCase(fetchRelationshipManagerByBqp.rejected, (state, action) => {
        state.fetchRelationshipManagerLoading = false;
        state.loading = false;
        state.relationshipManagerError = action.payload;
        state.relationshipManagers = [];
        console.error("Error fetching relationship manager:", action.payload);
      })
      
      // 🔹 Submit HR verification
      .addCase(submitHrVerification.pending, (state) => {
        state.hrVerificationLoading = true;
        state.loading = true;
        state.error = null;
        state.hrVerificationError = null;
        state.hrVerificationSuccess = false;
        state.message = null;
      })
      .addCase(submitHrVerification.fulfilled, (state, action) => {
        state.hrVerificationLoading = false;
        state.loading = false;
        state.message = action.payload?.message || "HR verification submitted successfully";
        state.hrVerificationSuccess = true;
        state.hrVerificationError = null;
        state.error = null;
        console.log("HR verification submitted successfully:", action.payload);
      })
      .addCase(submitHrVerification.rejected, (state, action) => {
        state.hrVerificationLoading = false;
        state.loading = false;
        state.hrVerificationError = action.payload;
        state.hrVerificationSuccess = false;
        console.error("Error submitting HR verification:", action.payload);
      });
  },
});

export const { clearError, resetHrVerification, resetAssignOfficialPosp } = assignOfficialPospSlice.actions;
export default assignOfficialPospSlice.reducer;