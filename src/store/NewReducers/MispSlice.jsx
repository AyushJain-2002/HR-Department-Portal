import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  misps: [],
  misp: null,
  
  // Loading states
  loading: false,
  toggleLoading: false,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  passwordLoading: false,
  
  // Error states
  error: null,
  createError: null,
  fetchError: null,
  updateError: null,
  deleteError: null,
  passwordError: null,
  toggleError: null,
  
  // Success states
  success: false,
  createSuccess: false,
  fetchSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
  passwordSuccess: false,
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
  }, "MISP_API_ERROR");
  
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
  Logger.info(`MISP Action: ${action}`, logDetails, "MISP_ACTION");
};

// 🔹 Fetch MISPs
export const fetchMisps = createAsyncThunk(
  "misp/fetchMisps",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_misps_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.misp.fetchMisps();
      
      Logger.info("MISPs fetched successfully", {
        userId: userInfo.userId,
        mispCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "MISP");
      
      logUserAction("misps_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch MISPs");
      
      logUserAction("fetch_misps_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch MISP By ID
export const fetchMispById = createAsyncThunk(
  "misp/fetchMispById",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_misp_by_id_attempt", { 
        userId: userInfo.userId,
        mispId: id 
      });
      
      const response = await apiClient.misp.fetchMispById(id);
      
      const mispData = response.data.misp;

      // Flatten images object into the misp object
      const updatedMisp = {
        ...mispData,
        ...mispData.images, // merges other_document, pancard_image, bank_passbook_image
      };
      delete updatedMisp.images; // remove the original images object
      
      Logger.info("MISP fetched successfully", {
        userId: userInfo.userId,
        mispId: id,
        mispEmail: updatedMisp.email,
        timestamp: new Date().toISOString()
      }, "MISP");
      
      logUserAction("misp_fetched_by_id", { 
        userId: userInfo.userId,
        mispId: id 
      });
      
      return updatedMisp;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch MISP by ID");
      
      logUserAction("fetch_misp_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        mispId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create MISP
export const createMisp = createAsyncThunk(
  "misp/createMisp",
  async (mispData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_misp_attempt", { 
        userId: userInfo.userId,
        mispEmail: mispData.email,
        mispName: mispData.name 
      });
      
      const formData = new FormData();
      
      // Append all MISP data to formData
      Object.keys(mispData).forEach(key => {
        if (mispData[key] !== null && mispData[key] !== undefined) {
          formData.append(key, mispData[key]);
        }
      });
      
      const response = await apiClient.misp.createMisp(formData);
      
      Logger.info("MISP created successfully", {
        userId: userInfo.userId,
        mispId: response.data?.misp?.id,
        mispEmail: mispData.email,
        timestamp: new Date().toISOString()
      }, "MISP");
      
      logUserAction("misp_created", {
        userId: userInfo.userId,
        mispEmail: mispData.email
      });
      
      return response.data?.misp || response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create MISP");
      
      logUserAction("create_misp_failed", {
        userId: getUserInfoForLogging().userId,
        mispEmail: mispData.email,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update MISP
export const updateMisp = createAsyncThunk(
  "misp/updateMisp",
  async ({ id, mispData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_misp_attempt", { 
        userId: userInfo.userId,
        mispId: id 
      });
      
      const response = await apiClient.misp.updateMisp(id, mispData);
      
      Logger.info("MISP updated successfully", {
        userId: userInfo.userId,
        mispId: id,
        timestamp: new Date().toISOString()
      }, "MISP");
      
      logUserAction("misp_updated", {
        userId: userInfo.userId,
        mispId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update MISP");
      
      logUserAction("update_misp_failed", {
        userId: getUserInfoForLogging().userId,
        mispId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete MISP
export const deleteMisp = createAsyncThunk(
  "misp/deleteMisp",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_misp_attempt", { 
        userId: userInfo.userId,
        mispId: id 
      });
      
      await apiClient.misp.deleteMisp(id);
      
      Logger.info("MISP deleted successfully", {
        userId: userInfo.userId,
        mispId: id,
        timestamp: new Date().toISOString()
      }, "MISP");
      
      logUserAction("misp_deleted", {
        userId: userInfo.userId,
        mispId: id
      });
      
      return id;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete MISP");
      
      logUserAction("delete_misp_failed", {
        userId: getUserInfoForLogging().userId,
        mispId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch MISP By Branch
export const fetchMispByBranch = createAsyncThunk(
  "misp/fetchMispByBranch",
  async (branchId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_misp_by_branch_attempt", { 
        userId: userInfo.userId,
        branchId 
      });
      
      const response = await apiClient.misp.fetchMispByBranch(branchId);
      
      Logger.info("MISP by branch fetched successfully", {
        userId: userInfo.userId,
        branchId,
        mispCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "MISP");
      
      logUserAction("misp_by_branch_fetched", { 
        userId: userInfo.userId,
        branchId 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch MISP by branch");
      
      logUserAction("fetch_misp_by_branch_failed", {
        userId: getUserInfoForLogging().userId,
        branchId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Change MISP Password
export const changeMispPassword = createAsyncThunk(
  "misp/changeMispPassword",
  async ({ id, passwordData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("change_misp_password_attempt", { 
        userId: userInfo.userId,
        mispId: id 
      });
      
      await apiClient.misp.changeMispPassword(id, passwordData);
      
      Logger.info("MISP password changed successfully", {
        userId: userInfo.userId,
        mispId: id,
        timestamp: new Date().toISOString()
      }, "MISP");
      
      logUserAction("misp_password_changed", {
        userId: userInfo.userId,
        mispId: id
      });
      
      return { id };
    } catch (error) {
      const errorMessage = handleApiError(error, "Change MISP password");
      
      logUserAction("change_misp_password_failed", {
        userId: getUserInfoForLogging().userId,
        mispId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Toggle MISP Active Status
export const toggleMispActiveStatus = createAsyncThunk(
  "misp/toggleMispActiveStatus",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("toggle_misp_active_status_attempt", { 
        userId: userInfo.userId,
        mispId: id 
      });
      
      const response = await apiClient.misp.toggleMispActiveStatus(id);
      
      Logger.info("MISP active status toggled successfully", {
        userId: userInfo.userId,
        mispId: id,
        newStatus: response.data.active,
        timestamp: new Date().toISOString()
      }, "MISP");
      
      logUserAction("misp_active_status_toggled", {
        userId: userInfo.userId,
        mispId: id,
        status: response.data.active
      });
      
      return {
        id,
        is_active: response.data.active
      };
    } catch (error) {
      const errorMessage = handleApiError(error, "Toggle MISP active status");
      
      logUserAction("toggle_misp_active_status_failed", {
        userId: getUserInfoForLogging().userId,
        mispId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const mispSlice = createSlice({
  name: "misp",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createError = null;
      state.fetchError = null;
      state.updateError = null;
      state.deleteError = null;
      state.passwordError = null;
      state.toggleError = null;
    },
    resetMisp: (state) => {
      state.misps = [];
      state.misp = null;
      state.loading = false;
      state.toggleLoading = false;
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.passwordLoading = false;
      state.error = null;
      state.createError = null;
      state.fetchError = null;
      state.updateError = null;
      state.deleteError = null;
      state.passwordError = null;
      state.toggleError = null;
      state.success = false;
      state.createSuccess = false;
      state.fetchSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
      state.passwordSuccess = false;
      state.toggleSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch MISPs
      .addCase(fetchMisps.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.fetchError = null;
        state.success = false;
      })
      .addCase(fetchMisps.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.misps = action.payload;
        state.fetchSuccess = true;
        state.fetchError = null;
        state.error = null;
      })
      .addCase(fetchMisps.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
      })
      
      // 🔹 Create MISP
      .addCase(createMisp.pending, (state) => {
        state.createLoading = true;
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.createSuccess = false;
        state.misps = [];
      })
      .addCase(createMisp.fulfilled, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.createSuccess = true;
        state.misps.push(action.payload);
        state.createError = null;
        state.error = null;
      })
      .addCase(createMisp.rejected, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.createError = action.payload;
      })
      
      // 🔹 Fetch MISP By ID
      .addCase(fetchMispById.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.misp = null;
      })
      .addCase(fetchMispById.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.misp = action.payload;
        state.fetchError = null;
        state.error = null;
      })
      .addCase(fetchMispById.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
        state.misp = null;
      })
      
      // 🔹 Update MISP
      .addCase(updateMisp.pending, (state) => {
        state.updateLoading = true;
        state.loading = true;
        state.error = null;
        state.updateError = null;
        state.updateSuccess = false;
        state.success = false;
      })
      .addCase(updateMisp.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.loading = false;
        state.updateSuccess = true;
        state.success = true;
        state.misps = state.misps.map((misp) =>
          misp.id === action.payload.id ? action.payload : misp
        );
        state.updateError = null;
        state.error = null;
      })
      .addCase(updateMisp.rejected, (state, action) => {
        state.updateLoading = false;
        state.loading = false;
        state.updateError = action.payload;
      })
      
      // 🔹 Delete MISP
      .addCase(deleteMisp.pending, (state) => {
        state.deleteLoading = true;
        state.loading = true;
        state.error = null;
        state.deleteError = null;
      })
      .addCase(deleteMisp.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;
        state.misps = state.misps.filter((misp) => misp.id !== action.payload);
        state.deleteSuccess = true;
        state.deleteError = null;
        state.error = null;
      })
      .addCase(deleteMisp.rejected, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;
        state.deleteError = action.payload;
      })
      
      // 🔹 Fetch MISP By Branch
      .addCase(fetchMispByBranch.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
      })
      .addCase(fetchMispByBranch.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.misps = action.payload;
        state.fetchError = null;
        state.error = null;
      })
      .addCase(fetchMispByBranch.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
      })
      
      // 🔹 Change MISP Password
      .addCase(changeMispPassword.pending, (state) => {
        state.passwordLoading = true;
        state.loading = true;
        state.error = null;
        state.passwordError = null;
        state.passwordSuccess = false;
        state.success = false;
      })
      .addCase(changeMispPassword.fulfilled, (state) => {
        state.passwordLoading = false;
        state.loading = false;
        state.passwordSuccess = true;
        state.success = true;
        state.passwordError = null;
        state.error = null;
      })
      .addCase(changeMispPassword.rejected, (state, action) => {
        state.passwordLoading = false;
        state.loading = false;
        state.passwordError = action.payload;
      })
      
      // 🔹 Toggle MISP Active Status
      .addCase(toggleMispActiveStatus.pending, (state) => {
        state.toggleLoading = true;
        state.loading = true;
        state.error = null;
        state.toggleError = null;
        state.toggleSuccess = false;
      })
      .addCase(toggleMispActiveStatus.fulfilled, (state, action) => {
        const { id, is_active } = action.payload;
        state.toggleLoading = false;
        state.loading = false;
        state.toggleSuccess = true;
        state.misps = state.misps.map((misp) =>
          misp.id === id ? { ...misp, active: is_active ? 1 : 0 } : misp
        );
        state.toggleError = null;
        state.error = null;
      })
      .addCase(toggleMispActiveStatus.rejected, (state, action) => {
        state.toggleLoading = false;
        state.loading = false;
        state.toggleError = action.payload;
      });
  },
});

export const { clearError, resetMisp } = mispSlice.actions;
export default mispSlice.reducer;