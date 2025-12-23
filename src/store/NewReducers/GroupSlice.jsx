import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Group Data
  group: null,
  groups: [],
  
  // Subgroup Data
  subgroup: null,
  subgroups: [],
  
  // Loading states
  loading: false,
  groupsLoading: false,
  subgroupsLoading: false,
  
  // Error states
  error: null,
  groupsError: null,
  subgroupsError: null,
  
  // Success states
  success: false,
  editSuccess: false,
  groupsSuccess: false,
  groupsEditSuccess: false,
  subgroupsSuccess: false,
  subgroupsEditSuccess: false,
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
  }, "GROUP_API_ERROR");
  
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
  Logger.info(`Group Action: ${action}`, logDetails, "GROUP_ACTION");
};

// 🔹 Fetch Groups
export const fetchGroups = createAsyncThunk(
  "groups/fetchGroups",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_groups_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.groups.fetchGroups();
      
      Logger.info("Groups fetched successfully", {
        userId: userInfo.userId,
        groupCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("groups_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch groups");
      
      logUserAction("fetch_groups_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Group By ID
export const fetchGroupById = createAsyncThunk(
  "groups/fetchGroupById",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_group_by_id_attempt", { 
        userId: userInfo.userId,
        groupId: id 
      });
      
      const response = await apiClient.groups.fetchGroupById(id);
      
      Logger.info("Group fetched successfully", {
        userId: userInfo.userId,
        groupId: id,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("group_fetched_by_id", { 
        userId: userInfo.userId,
        groupId: id 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch group by ID");
      
      logUserAction("fetch_group_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        groupId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Group
export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (groupData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_group_attempt", { 
        userId: userInfo.userId,
        groupName: groupData.name,
        groupCode: groupData.code
      });
      
      const response = await apiClient.groups.createGroup(groupData);
      
      Logger.info("Group created successfully", {
        userId: userInfo.userId,
        groupId: response.data?.id,
        groupName: groupData.name,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("group_created", {
        userId: userInfo.userId,
        groupId: response.data?.id,
        groupName: groupData.name
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create group");
      
      logUserAction("create_group_failed", {
        userId: getUserInfoForLogging().userId,
        groupName: groupData.name,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Group
export const updateGroup = createAsyncThunk(
  "groups/updateGroup",
  async ({ id, groupData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_group_attempt", { 
        userId: userInfo.userId,
        groupId: id 
      });
      
      const response = await apiClient.groups.updateGroup(id, groupData);
      
      Logger.info("Group updated successfully", {
        userId: userInfo.userId,
        groupId: id,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("group_updated", {
        userId: userInfo.userId,
        groupId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update group");
      
      logUserAction("update_group_failed", {
        userId: getUserInfoForLogging().userId,
        groupId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Group
export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_group_attempt", { 
        userId: userInfo.userId,
        groupId: id 
      });
      
      await apiClient.groups.deleteGroup(id);
      
      Logger.info("Group deleted successfully", {
        userId: userInfo.userId,
        groupId: id,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("group_deleted", {
        userId: userInfo.userId,
        groupId: id
      });
      
      return id;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete group");
      
      logUserAction("delete_group_failed", {
        userId: getUserInfoForLogging().userId,
        groupId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Subgroups
export const fetchSubgroups = createAsyncThunk(
  "groups/fetchSubgroups",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_subgroups_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.groups.fetchSubgroups();
      
      Logger.info("Subgroups fetched successfully", {
        userId: userInfo.userId,
        subgroupCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("subgroups_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch subgroups");
      
      logUserAction("fetch_subgroups_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Subgroup By ID
export const fetchSubgroupById = createAsyncThunk(
  "groups/fetchSubgroupById",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_subgroup_by_id_attempt", { 
        userId: userInfo.userId,
        subgroupId: id 
      });
      
      const response = await apiClient.groups.fetchSubgroupById(id);
      
      Logger.info("Subgroup fetched successfully", {
        userId: userInfo.userId,
        subgroupId: id,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("subgroup_fetched_by_id", { 
        userId: userInfo.userId,
        subgroupId: id 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch subgroup by ID");
      
      logUserAction("fetch_subgroup_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        subgroupId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Subgroup
export const createSubgroup = createAsyncThunk(
  "groups/createSubgroup",
  async (subgroupData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_subgroup_attempt", { 
        userId: userInfo.userId,
        subgroupName: subgroupData.name,
        groupId: subgroupData.group_id
      });
      
      const response = await apiClient.groups.createSubgroup(subgroupData);
      
      Logger.info("Subgroup created successfully", {
        userId: userInfo.userId,
        subgroupId: response.data?.id,
        subgroupName: subgroupData.name,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("subgroup_created", {
        userId: userInfo.userId,
        subgroupId: response.data?.id,
        subgroupName: subgroupData.name
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create subgroup");
      
      logUserAction("create_subgroup_failed", {
        userId: getUserInfoForLogging().userId,
        subgroupName: subgroupData.name,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Subgroup
export const updateSubgroup = createAsyncThunk(
  "groups/updateSubgroup",
  async ({ id, subgroupData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_subgroup_attempt", { 
        userId: userInfo.userId,
        subgroupId: id 
      });
      
      const response = await apiClient.groups.updateSubgroup(id, subgroupData);
      
      Logger.info("Subgroup updated successfully", {
        userId: userInfo.userId,
        subgroupId: id,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("subgroup_updated", {
        userId: userInfo.userId,
        subgroupId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update subgroup");
      
      logUserAction("update_subgroup_failed", {
        userId: getUserInfoForLogging().userId,
        subgroupId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Subgroup
export const deleteSubgroup = createAsyncThunk(
  "groups/deleteSubgroup",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_subgroup_attempt", { 
        userId: userInfo.userId,
        subgroupId: id 
      });
      
      await apiClient.groups.deleteSubgroup(id);
      
      Logger.info("Subgroup deleted successfully", {
        userId: userInfo.userId,
        subgroupId: id,
        timestamp: new Date().toISOString()
      }, "GROUPS");
      
      logUserAction("subgroup_deleted", {
        userId: userInfo.userId,
        subgroupId: id
      });
      
      return id;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete subgroup");
      
      logUserAction("delete_subgroup_failed", {
        userId: getUserInfoForLogging().userId,
        subgroupId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.groupsError = null;
      state.subgroupsError = null;
    },
    resetGroupState: (state) => {
      state.group = null;
      state.groups = [];
      state.subgroup = null;
      state.subgroups = [];
      state.loading = false;
      state.groupsLoading = false;
      state.subgroupsLoading = false;
      state.error = null;
      state.groupsError = null;
      state.subgroupsError = null;
      state.success = false;
      state.editSuccess = false;
      state.groupsSuccess = false;
      state.groupsEditSuccess = false;
      state.subgroupsSuccess = false;
      state.subgroupsEditSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Groups
      .addCase(fetchGroups.pending, (state) => {
        state.groupsLoading = true;
        state.loading = true;
        state.error = null;
        state.groupsError = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groupsLoading = false;
        state.loading = false;
        state.groups = action.payload;
        state.groupsError = null;
        state.error = null;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.groupsLoading = false;
        state.loading = false;
        state.groupsError = action.payload;
      })
      
      // 🔹 Create Group
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.groupsError = null;
        state.groupsSuccess = false;
        state.success = false;
        state.groupsEditSuccess = false;
        state.editSuccess = false;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groupsSuccess = true;
        state.success = true;
        state.groupsEditSuccess = false;
        state.editSuccess = false;
        state.groups.push(action.payload);
        state.groupsError = null;
        state.error = null;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.groupsError = action.payload;
      })
      
      // 🔹 Fetch Group By ID
      .addCase(fetchGroupById.pending, (state) => {
        state.groupsLoading = true;
        state.loading = true;
        state.error = null;
        state.groupsError = null;
        state.group = null;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.groupsLoading = false;
        state.loading = false;
        state.group = action.payload;
        state.groupsError = null;
        state.error = null;
      })
      .addCase(fetchGroupById.rejected, (state, action) => {
        state.groupsLoading = false;
        state.loading = false;
        state.groupsError = action.payload;
        state.group = null;
      })
      
      // 🔹 Update Group
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.groupsError = null;
        state.groupsEditSuccess = false;
        state.editSuccess = false;
        state.groupsSuccess = false;
        state.success = false;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groupsEditSuccess = true;
        state.editSuccess = true;
        state.groups = state.groups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        );
        state.groupsError = null;
        state.error = null;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        state.groupsError = action.payload;
      })
      
      // 🔹 Delete Group
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.groupsError = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter(
          (group) => group.id !== action.payload
        );
        state.groupsError = null;
        state.error = null;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.groupsError = action.payload;
      })
      
      // 🔹 Fetch Subgroups
      .addCase(fetchSubgroups.pending, (state) => {
        state.subgroupsLoading = true;
        state.loading = true;
        state.error = null;
        state.subgroupsError = null;
      })
      .addCase(fetchSubgroups.fulfilled, (state, action) => {
        state.subgroupsLoading = false;
        state.loading = false;
        state.subgroups = action.payload;
        state.subgroupsError = null;
        state.error = null;
      })
      .addCase(fetchSubgroups.rejected, (state, action) => {
        state.subgroupsLoading = false;
        state.loading = false;
        state.subgroupsError = action.payload;
      })
      
      // 🔹 Create Subgroup
      .addCase(createSubgroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.subgroupsError = null;
        state.subgroupsSuccess = false;
        state.success = false;
        state.subgroupsEditSuccess = false;
        state.editSuccess = false;
      })
      .addCase(createSubgroup.fulfilled, (state, action) => {
        state.loading = false;
        state.subgroupsSuccess = true;
        state.success = true;
        state.subgroupsEditSuccess = false;
        state.editSuccess = false;
        state.subgroups.push(action.payload);
        state.subgroupsError = null;
        state.error = null;
      })
      .addCase(createSubgroup.rejected, (state, action) => {
        state.loading = false;
        state.subgroupsError = action.payload;
      })
      
      // 🔹 Fetch Subgroup By ID
      .addCase(fetchSubgroupById.pending, (state) => {
        state.subgroupsLoading = true;
        state.loading = true;
        state.error = null;
        state.subgroupsError = null;
        state.subgroup = null;
      })
      .addCase(fetchSubgroupById.fulfilled, (state, action) => {
        state.subgroupsLoading = false;
        state.loading = false;
        state.subgroup = action.payload;
        state.subgroupsError = null;
        state.error = null;
      })
      .addCase(fetchSubgroupById.rejected, (state, action) => {
        state.subgroupsLoading = false;
        state.loading = false;
        state.subgroupsError = action.payload;
        state.subgroup = null;
      })
      
      // 🔹 Update Subgroup
      .addCase(updateSubgroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.subgroupsError = null;
        state.subgroupsEditSuccess = false;
        state.editSuccess = false;
        state.subgroupsSuccess = false;
        state.success = false;
      })
      .addCase(updateSubgroup.fulfilled, (state, action) => {
        state.loading = false;
        state.subgroupsEditSuccess = true;
        state.editSuccess = true;
        state.subgroups = state.subgroups.map((subgroup) =>
          subgroup.id === action.payload.id ? action.payload : subgroup
        );
        state.subgroupsError = null;
        state.error = null;
      })
      .addCase(updateSubgroup.rejected, (state, action) => {
        state.loading = false;
        state.subgroupsError = action.payload;
      })
      
      // 🔹 Delete Subgroup
      .addCase(deleteSubgroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.subgroupsError = null;
      })
      .addCase(deleteSubgroup.fulfilled, (state, action) => {
        state.loading = false;
        state.subgroups = state.subgroups.filter(
          (subgroup) => subgroup.id !== action.payload
        );
        state.subgroupsError = null;
        state.error = null;
      })
      .addCase(deleteSubgroup.rejected, (state, action) => {
        state.loading = false;
        state.subgroupsError = action.payload;
      });
  },
});

export const { clearError, resetGroupState } = groupSlice.actions;
export default groupSlice.reducer;