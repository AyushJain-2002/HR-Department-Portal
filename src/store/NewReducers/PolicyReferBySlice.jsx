// store/Reducers/PolicyReferBySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  policyRefList: [],
  policyRef: null,
  toggledItem: null,
  
  // Loading states
  loading: false,
  toggleLoading: false,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  getByIdLoading: false,
  
  // Error states
  error: null,
  createError: null,
  editError: null,
  fetchError: null,
  updateError: null,
  toggleError: null,
  
  // Success states
  createSuccess: false,
  editSuccess: false,
  fetchSuccess: false,
  updateSuccess: false,
  toggleSuccess: false,
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
  }, "POLICY_REFER_BY_API_ERROR");
  
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
  Logger.info(`Policy Refer By Action: ${action}`, logDetails, "POLICY_REFER_BY_ACTION");
};

// 🔹 Fetch all policy refer by entries
export const fetchPolicyReferBy = createAsyncThunk(
  "policyReferBy/fetchPolicyReferBy",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_policy_refer_by_attempt", { 
        userId: userInfo.userId
      });
      
      const response = await apiClient.policyReferBy.fetchPolicyReferBy();
      // console.log(response.data.employees)
      Logger.info("Policy refer by entries fetched successfully", {
        userId: userInfo.userId,
        count: response.data?.employees?.length || 0,
        timestamp: new Date().toISOString()
      }, "POLICY_REFER_BY");
      
      logUserAction("policy_refer_by_fetched", { 
        userId: userInfo.userId,
        count: response.data?.employees?.length || 0
      });
      
      return response.data?.employees || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch policy refer by");
      
      logUserAction("fetch_policy_refer_by_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Register new policy refer by
export const registerPolicyReferBy = createAsyncThunk(
  "policyReferBy/registerPolicyReferBy",
  async (data, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("register_policy_refer_by_attempt", { 
        userId: userInfo.userId,
        name: data.name || data.email,
        email: data.email
      });
      
      const response = await apiClient.policyReferBy.registerPolicyReferBy(data);
      
      Logger.info("Policy refer by registered successfully", {
        userId: userInfo.userId,
        referById: response.data?.id,
        name: response.data?.name || response.data?.email,
        timestamp: new Date().toISOString()
      }, "POLICY_REFER_BY");
      
      logUserAction("policy_refer_by_registered", {
        userId: userInfo.userId,
        referById: response.data?.id
      });
      
      return response.data;
    } catch (error) {
      console.log("Error registering policy refer by:", error);
      const errorMessage = handleApiError(error, "Register policy refer by");
      
      logUserAction("register_policy_refer_by_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Get policy refer by by ID
export const getPolicyReferById = createAsyncThunk(
  "policyReferBy/getPolicyReferById",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("get_policy_refer_by_by_id_attempt", { 
        userId: userInfo.userId,
        referById: id
      });
      
      const response = await apiClient.policyReferBy.getPolicyReferById(id);
      
      Logger.info("Policy refer by fetched by ID successfully", {
        userId: userInfo.userId,
        referById: id,
        name: response.data?.data?.name || response.data?.data?.email,
        timestamp: new Date().toISOString()
      }, "POLICY_REFER_BY");
      
      logUserAction("policy_refer_by_fetched_by_id", { 
        userId: userInfo.userId,
        referById: id
      });
      
      return response.data?.data || null;
    } catch (error) {
      const errorMessage = handleApiError(error, "Get policy refer by by ID");
      
      logUserAction("get_policy_refer_by_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        referById: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update policy refer by
export const updatePolicyReferBy = createAsyncThunk(
  "policyReferBy/updatePolicyReferBy",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_policy_refer_by_attempt", { 
        userId: userInfo.userId,
        referById: id
      });
      
      const response = await apiClient.policyReferBy.updatePolicyReferBy(id, data);
      
      Logger.info("Policy refer by updated successfully", {
        userId: userInfo.userId,
        referById: id,
        timestamp: new Date().toISOString()
      }, "POLICY_REFER_BY");
      
      logUserAction("policy_refer_by_updated", {
        userId: userInfo.userId,
        referById: id
      });
      
      return response.data;
    } catch (error) {
      console.log("Error updating policy refer by:", error);
      const errorMessage = handleApiError(error, "Update policy refer by");
      
      logUserAction("update_policy_refer_by_failed", {
        userId: getUserInfoForLogging().userId,
        referById: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Toggle policy refer by status
export const togglePolicyReferByStatus = createAsyncThunk(
  "policyReferBy/togglePolicyReferByStatus",
  async (refById, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("toggle_policy_refer_by_status_attempt", { 
        userId: userInfo.userId,
        referById: refById
      });
      
      const response = await apiClient.policyReferBy.togglePolicyReferByStatus(refById);
      
      Logger.info("Policy refer by status toggled successfully", {
        userId: userInfo.userId,
        referById: refById,
        message: response.data?.message,
        timestamp: new Date().toISOString()
      }, "POLICY_REFER_BY");
      
      logUserAction("policy_refer_by_status_toggled", {
        userId: userInfo.userId,
        referById: refById,
        message: response.data?.message
      });
      
      return {
        message: response.data?.message,
        refById,
      };
    } catch (error) {
      const errorMessage = handleApiError(error, "Toggle policy refer by status");
      
      logUserAction("toggle_policy_refer_by_status_failed", {
        userId: getUserInfoForLogging().userId,
        referById: refById,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const policyReferBySlice = createSlice({
  name: "policyReferBy",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createError = null;
      state.editError = null;
      state.fetchError = null;
      state.updateError = null;
      state.toggleError = null;
    },
    resetPolicyReferById: (state) => {
      state.loading = false;
      state.createSuccess = false;
      state.createError = null;
      state.editError = null;
      state.editSuccess = false;
      state.error = null;
      state.policyRef = null;
      state.getByIdLoading = false;
    },
    resetPolicyReferBy: (state) => {
      state.policyRefList = [];
      state.policyRef = null;
      state.toggledItem = null;
      state.loading = false;
      state.toggleLoading = false;
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.getByIdLoading = false;
      state.error = null;
      state.createError = null;
      state.editError = null;
      state.fetchError = null;
      state.updateError = null;
      state.toggleError = null;
      state.createSuccess = false;
      state.editSuccess = false;
      state.fetchSuccess = false;
      state.updateSuccess = false;
      state.toggleSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all policy refer by entries
      .addCase(fetchPolicyReferBy.pending, (state) => {
        // console.log("hii hello by")
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.policyRefList = [];
        state.fetchSuccess = false;
      })
      .addCase(fetchPolicyReferBy.fulfilled, (state, action) => {
        // console.log("in slicer",action.payload)
        state.fetchLoading = false;
        state.loading = false;
        state.policyRefList = action.payload;
        state.fetchSuccess = true;
        state.fetchError = null;
        state.error = null;
        // console.log("Policy refer by entries fetched:", action.payload.length, "items");
      })
      .addCase(fetchPolicyReferBy.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
        // console.error("Error fetching policy refer by entries:", action.payload);
      })
      
      // 🔹 Register new policy refer by
      .addCase(registerPolicyReferBy.pending, (state) => {
        state.createLoading = true;
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.createSuccess = false;
        state.editSuccess = false;
      })
      .addCase(registerPolicyReferBy.fulfilled, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.createSuccess = true;
        state.editSuccess = false;
        state.createError = null;
        state.editError = null;
        state.policyRefList.push(action.payload);
        // console.log("Policy refer by registered successfully:", action.payload);
      })
      .addCase(registerPolicyReferBy.rejected, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.createError = action.payload;
        state.createSuccess = false;
        state.editSuccess = false;
        // console.error("Error registering policy refer by:", action.payload);
      })
      
      // 🔹 Get policy refer by by ID
      .addCase(getPolicyReferById.pending, (state) => {
        state.getByIdLoading = true;
        state.loading = true;
        state.error = null;
        state.policyRef = null;
      })
      .addCase(getPolicyReferById.fulfilled, (state, action) => {
        state.getByIdLoading = false;
        state.loading = false;
        state.policyRef = action.payload;
        state.error = null;
        // console.log("Policy refer by fetched by ID:", action.payload);
      })
      .addCase(getPolicyReferById.rejected, (state, action) => {
        state.getByIdLoading = false;
        state.loading = false;
        state.error = action.payload;
        // console.error("Error fetching policy refer by by ID:", action.payload);
      })
      
      // 🔹 Update policy refer by
      .addCase(updatePolicyReferBy.pending, (state) => {
        state.updateLoading = true;
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
        state.editSuccess = false;
        state.updateError = null;
        state.editError = null;
      })
      .addCase(updatePolicyReferBy.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.loading = false;
        state.createSuccess = false;
        state.editSuccess = true;
        state.updateSuccess = true;
        state.updateError = null;
        state.editError = null;
        state.error = null;
        
        // Update the item in the list
        const index = state.policyRefList.findIndex(
          (item) => item.id === action.payload.id
        );
        
        if (index !== -1) {
          state.policyRefList[index] = action.payload; // Directly replace the item
        }
        
        // console.log("Policy refer by updated successfully:", action.payload);
      })
      .addCase(updatePolicyReferBy.rejected, (state, action) => {
        state.updateLoading = false;
        state.loading = false;
        state.updateError = action.payload;
        state.editError = action.payload;
        state.createSuccess = false;
        state.editSuccess = false;
        // console.error("Error updating policy refer by:", action.payload);
      })
      
      // 🔹 Toggle policy refer by status
      .addCase(togglePolicyReferByStatus.pending, (state) => {
        state.toggleLoading = true;
        state.loading = true;
        state.error = null;
        state.toggleError = null;
        state.toggleSuccess = false;
      })
      .addCase(togglePolicyReferByStatus.fulfilled, (state, action) => {
        const toggledId = action.payload.refById;
        state.toggleLoading = false;
        state.loading = false;
        state.toggleSuccess = true;
        state.toggledItem = action.payload;
        state.toggleError = null;
        state.error = null;
        
        if (toggledId) {
          state.policyRefList = state.policyRefList.map((item) =>
            item.id === toggledId
              ? { ...item, active: !item.active } // Toggle manually
              : item
          );
        }
        
        // console.log("Policy refer by status toggled:", action.payload);
      })
      .addCase(togglePolicyReferByStatus.rejected, (state, action) => {
        state.toggleLoading = false;
        state.loading = false;
        state.toggleError = action.payload;
        // console.error("Error toggling policy refer by status:", action.payload);
      });
  }, 
});

export const { clearError, resetPolicyReferById, resetPolicyReferBy } = policyReferBySlice.actions;
export default policyReferBySlice.reducer;