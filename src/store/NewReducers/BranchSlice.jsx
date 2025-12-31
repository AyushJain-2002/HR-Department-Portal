import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  branch: null,
  branches: [],
  branchManager: null,
  branchManagers: [],
  loading: false,
  error: null,
  createBranchManagerError: null,
  editBranchManagerError: null,
  createError: null,
  editError: null,
  success: false,
  managerSuccess: false,
  editSuccess: false,
  fetchBranchSuccess:false,
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
  }, "BRANCH_API_ERROR");
  
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
  Logger.info(`Branch Action: ${action}`, logDetails, "BRANCH_ACTION");
};

// 🔹 Fetch All Branches
export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_branches_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.branches.fetchBranches();
      // console.log(response)
      Logger.info("Branches fetched successfully", {
        userId: userInfo.userId,
        branchCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "BRANCHES");
      
      logUserAction("branches_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch branches");
      
      logUserAction("fetch_branches_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Branch By ID
export const fetchBranchById = createAsyncThunk(
  "branches/fetchBranchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.branches.fetchBranchById(id);
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch branch by ID");
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Branch
export const createBranch = createAsyncThunk(
  "branches/createBranch",
  async (branchData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_branch_attempt", { 
        userId: userInfo.userId,
        branchName: branchData.name,
        branchCode: branchData.code
      });
      const formData = Object.entries(branchData).reduce((acc, [key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
      const response = await apiClient.branches.createBranch(formData);
      
      Logger.info("Branch created successfully", {
        userId: userInfo.userId,
        branchId: response.data?.id,
        branchName: branchData.name,
        timestamp: new Date().toISOString()
      }, "BRANCHES");
      
      logUserAction("branch_created", {
        userId: userInfo.userId,
        branchId: response.data?.id,
        branchName: branchData.name
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create branch");
      
      logUserAction("create_branch_failed", {
        userId: getUserInfoForLogging().userId,
        branchName: branchData.name,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Branch
export const updateBranch = createAsyncThunk(
  "branches/updateBranch",
  async ({ id, branchData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_branch_attempt", { 
        userId: userInfo.userId,
        branchId: id 
      });
      
      const response = await apiClient.branches.updateBranch(id, branchData);
      
      Logger.info("Branch updated successfully", {
        userId: userInfo.userId,
        branchId: id,
        timestamp: new Date().toISOString()
      }, "BRANCHES");
      
      logUserAction("branch_updated", {
        userId: userInfo.userId,
        branchId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update branch");
      
      logUserAction("update_branch_failed", {
        userId: getUserInfoForLogging().userId,
        branchId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Branch
export const deleteBranch = createAsyncThunk(
  "branches/deleteBranch",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_branch_attempt", { 
        userId: userInfo.userId,
        branchId: id 
      });
      
      await apiClient.branches.deleteBranch(id);
      
      Logger.info("Branch deleted successfully", {
        userId: userInfo.userId,
        branchId: id,
        timestamp: new Date().toISOString()
      }, "BRANCHES");
      
      logUserAction("branch_deleted", {
        userId: userInfo.userId,
        branchId: id
      });
      
      return id;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete branch");
      
      logUserAction("delete_branch_failed", {
        userId: getUserInfoForLogging().userId,
        branchId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch All Branch Managers
export const fetchBranchManagers = createAsyncThunk(
  "branches/fetchBranchManagers",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_branch_managers_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.branches.fetchBranchManagers();
      
      Logger.info("Branch managers fetched successfully", {
        userId: userInfo.userId,
        managerCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "BRANCHES");
      
      logUserAction("branch_managers_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch branch managers");
      
      logUserAction("fetch_branch_managers_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Branch Manager By ID
export const fetchBranchManagerById = createAsyncThunk(
  "branches/fetchBranchManagerById",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_branch_manager_by_id_attempt", { 
        userId: userInfo.userId,
        branchManagerId: id 
      });
      
      const response = await apiClient.branches.fetchBranchManagerById(id);
      
      Logger.info("Branch manager fetched successfully", {
        userId: userInfo.userId,
        branchManagerId: id,
        timestamp: new Date().toISOString()
      }, "BRANCHES");
      
      logUserAction("branch_manager_fetched_by_id", { 
        userId: userInfo.userId,
        branchManagerId: id 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch branch manager by ID");
      
      logUserAction("fetch_branch_manager_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        branchManagerId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Branch Manager
export const createBranchManager = createAsyncThunk(
  "branches/createBranchManager",
  async (branchManagerData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_branch_manager_attempt", { 
        userId: userInfo.userId,
        managerName: branchManagerData.name,
        branchId: branchManagerData.branch_id
      });
      
      const response = await apiClient.branches.createBranchManager(branchManagerData);
      
      Logger.info("Branch manager created successfully", {
        userId: userInfo.userId,
        managerId: response.data?.id,
        managerName: branchManagerData.name,
        timestamp: new Date().toISOString()
      }, "BRANCHES");
      
      logUserAction("branch_manager_created", {
        userId: userInfo.userId,
        managerId: response.data?.id,
        managerName: branchManagerData.name
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create branch manager");
      
      logUserAction("create_branch_manager_failed", {
        userId: getUserInfoForLogging().userId,
        managerName: branchManagerData.name,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Branch Manager
export const updateBranchManager = createAsyncThunk(
  "branches/updateBranchManager",
  async ({ id, branchManagerData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_branch_manager_attempt", { 
        userId: userInfo.userId,
        branchManagerId: id 
      });
      
      const response = await apiClient.branches.updateBranchManager(id, branchManagerData);
      
      Logger.info("Branch manager updated successfully", {
        userId: userInfo.userId,
        branchManagerId: id,
        timestamp: new Date().toISOString()
      }, "BRANCHES");
      
      logUserAction("branch_manager_updated", {
        userId: userInfo.userId,
        branchManagerId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update branch manager");
      
      logUserAction("update_branch_manager_failed", {
        userId: getUserInfoForLogging().userId,
        branchManagerId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Branch Manager
export const deleteBranchManager = createAsyncThunk(
  "branches/deleteBranchManager",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_branch_manager_attempt", { 
        userId: userInfo.userId,
        branchManagerId: id 
      });
      
      await apiClient.branches.deleteBranchManager(id);
      
      Logger.info("Branch manager deleted successfully", {
        userId: userInfo.userId,
        branchManagerId: id,
        timestamp: new Date().toISOString()
      }, "BRANCHES");
      
      logUserAction("branch_manager_deleted", {
        userId: userInfo.userId,
        branchManagerId: id
      });
      
      return id;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete branch manager");
      
      logUserAction("delete_branch_manager_failed", {
        userId: getUserInfoForLogging().userId,
        branchManagerId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createError = null;
      state.editError = null;
      state.createBranchManagerError = null;
      state.editBranchManagerError = null;
    },
    resetBranchState: (state) => {
      state.branch = null;
      state.branches = [];
      state.branchManager = null;
      state.branchManagers = [];
      state.loading = false;
      state.error = null;
      state.createBranchManagerError = null;
      state.editBranchManagerError = null;
      state.createError = null;
      state.editError = null;
      state.success = false;
      state.managerSuccess = false;
      state.editSuccess = false;
      state.fetchBranchSuccess =false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch All Branches
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.editError = null;
        state.editSuccess = false;
        state.success = false;
        state.branch = null;
        state.fetchBranchSuccess= false;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
        state.editError = null;
        state.error = null;
        state.fetchBranchSuccess= true;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fetchBranchSuccess= false;
      })
      
      // 🔹 Create Branch
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.editError = null;
        state.createError = null;
        state.editSuccess = false;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.editSuccess = false;
        state.branches.push(action.payload);
        state.error = null;
        state.createError = null;
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload;
      })
      
      // 🔹 Fetch Branch By ID
      .addCase(fetchBranchById.pending, (state) => {
        state.fetchSuccess = false;
        state.success = false;
        state.error = null;
        state.editError = null;
        state.createError = null;
        state.branch = null;
      })
      .addCase(fetchBranchById.fulfilled, (state, action) => {
        state.fetchSuccess = true;
        state.loading = false;
        state.branch = action.payload;
        state.editError = null;
        state.error = null;
      })
      .addCase(fetchBranchById.rejected, (state, action) => {
        state.fetchSuccess = false;
        state.loading = false;
        state.error = action.payload;
        state.branch = null;
      })
      
      // 🔹 Update Branch
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.editSuccess = false;
        state.success = false;
        state.editError = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.editSuccess = true;
        state.branches = state.branches.map((branch) =>
          branch.id === action.payload.id ? action.payload : branch
        );
        state.error = null;
        state.editError = null;
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loading = false;
        state.editError = action.payload;
      })
      
      // 🔹 Delete Branch
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createError = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = state.branches.filter(
          (branch) => branch.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // 🔹 Fetch Branch Managers
      .addCase(fetchBranchManagers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.managerSuccess = false;
      })
      .addCase(fetchBranchManagers.fulfilled, (state, action) => {
        state.loading = false;
        state.branchManagers = action.payload;
        state.error = null;
      })
      .addCase(fetchBranchManagers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // 🔹 Create Branch Manager
      .addCase(createBranchManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.managerSuccess = false;
        state.createBranchManagerError = null;
        state.editBranchManagerError = null;
        state.editSuccess = false;
        state.success = false;
      })
      .addCase(createBranchManager.fulfilled, (state, action) => {
        state.loading = false;
        state.editSuccess = false;
        state.success = true;
        state.branchManagers.push(action.payload);
        state.error = null;
        state.createBranchManagerError = null;
      })
      .addCase(createBranchManager.rejected, (state, action) => {
        state.loading = false;
        state.createBranchManagerError = action.payload;
      })
      
      // 🔹 Fetch Branch Manager By ID
      .addCase(fetchBranchManagerById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.managerSuccess = false;
        state.success = false;
        state.createBranchManagerError = null;
        state.branchManager = null;
      })
      .addCase(fetchBranchManagerById.fulfilled, (state, action) => {
        state.loading = false;
        state.branchManager = action.payload;
        state.editBranchManagerError = null;
        state.managerSuccess = true;
        state.error = null;
      })
      .addCase(fetchBranchManagerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.branchManager = null;
      })
      
      // 🔹 Update Branch Manager
      .addCase(updateBranchManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.editSuccess = false;
        state.managerSuccess = false;
        state.success = false;
        state.createBranchManagerError = null;
        state.editBranchManagerError = null;
      })
      .addCase(updateBranchManager.fulfilled, (state, action) => {
        state.loading = false;
        state.editSuccess = true;
        state.branchManagers = state.branchManagers.map((branchManager) =>
          branchManager.id === action.payload.id ? action.payload : branchManager
        );
        state.error = null;
        state.editBranchManagerError = null;
      })
      .addCase(updateBranchManager.rejected, (state, action) => {
        state.loading = false;
        state.editBranchManagerError = action.payload;
      })
      
      // 🔹 Delete Branch Manager
      .addCase(deleteBranchManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBranchManager.fulfilled, (state, action) => {
        state.loading = false;
        if (state.branch && state.branch.branch_managers) {
          state.branch.branch_managers = state.branch.branch_managers.filter(
            (branchManager) => branchManager.id !== action.payload
          );
        }
        state.error = null;
      })
      .addCase(deleteBranchManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetBranchState } = branchSlice.actions;
export default branchSlice.reducer;