// store/Reducers/RidersSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  riders: [],
  rider: null,
  
  // Loading states
  loading: false,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  getByIdLoading: false,
  
  // Error states
  error: null,
  createError: null,
  editError: null,
  fetchError: null,
  updateError: null,
  deleteError: null,
  
  // Success states
  success: false,
  createSuccess: false,
  editSuccess: false,
  fetchSuccess: false,
  updateSuccess: false,
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
  }, "RIDERS_API_ERROR");
  
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
  Logger.info(`Riders Action: ${action}`, logDetails, "RIDERS_ACTION");
};

// 🔹 Fetch all riders
export const fetchRiders = createAsyncThunk(
  "riders/fetchRiders",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_riders_attempt", { 
        userId: userInfo.userId
      });
      
      const response = await apiClient.riders.fetchRiders();
      
      Logger.info("Riders fetched successfully", {
        userId: userInfo.userId,
        riderCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "RIDERS");
      
      logUserAction("riders_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching riders:", error);
      const errorMessage = handleApiError(error, "Fetch riders");
      
      logUserAction("fetch_riders_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch rider by ID
export const fetchRiderById = createAsyncThunk(
  "riders/fetchRiderById",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_rider_by_id_attempt", { 
        userId: userInfo.userId,
        riderId: id
      });
      
      const response = await apiClient.riders.fetchRiderById(id);
      
      Logger.info("Rider fetched by ID successfully", {
        userId: userInfo.userId,
        riderId: id,
        riderName: response.data?.name || response.data?.code,
        timestamp: new Date().toISOString()
      }, "RIDERS");
      
      logUserAction("rider_fetched_by_id", { 
        userId: userInfo.userId,
        riderId: id
      });
      
      return response.data || null;
    } catch (error) {
      console.error("Error fetching rider by ID:", error);
      const errorMessage = handleApiError(error, "Fetch rider by ID");
      
      logUserAction("fetch_rider_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        riderId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create a new rider
export const createRider = createAsyncThunk(
  "riders/createRider",
  async (riderData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_rider_attempt", { 
        userId: userInfo.userId,
        riderName: riderData.name || riderData.code,
        riderType: riderData.type
      });
      
      const response = await apiClient.riders.createRider(riderData);
      
      // Note: Response format is an array with one item based on your code
      const rider = response.data?.[0] || response.data;
      
      Logger.info("Rider created successfully", {
        userId: userInfo.userId,
        riderId: rider?.id,
        riderName: rider?.name || rider?.code,
        timestamp: new Date().toISOString()
      }, "RIDERS");
      
      logUserAction("rider_created", {
        userId: userInfo.userId,
        riderId: rider?.id
      });
      
      return rider;
    } catch (error) {
      console.error("Error creating rider:", error);
      const errorMessage = handleApiError(error, "Create rider");
      
      logUserAction("create_rider_failed", {
        userId: getUserInfoForLogging().userId,
        riderName: riderData.name || riderData.code,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update a rider
export const updateRider = createAsyncThunk(
  "riders/updateRider",
  async ({ id, riderData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_rider_attempt", { 
        userId: userInfo.userId,
        riderId: id
      });
      
      const response = await apiClient.riders.updateRider(id, riderData);
      
      Logger.info("Rider updated successfully", {
        userId: userInfo.userId,
        riderId: id,
        timestamp: new Date().toISOString()
      }, "RIDERS");
      
      logUserAction("rider_updated", {
        userId: userInfo.userId,
        riderId: id
      });
      
      return response.data;
    } catch (error) {
      console.error("Error updating rider:", error);
      const errorMessage = handleApiError(error, "Update rider");
      
      logUserAction("update_rider_failed", {
        userId: getUserInfoForLogging().userId,
        riderId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete a rider
export const deleteRider = createAsyncThunk(
  "riders/deleteRider",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_rider_attempt", { 
        userId: userInfo.userId,
        riderId: id
      });
      
      await apiClient.riders.deleteRider(id);
      
      Logger.info("Rider deleted successfully", {
        userId: userInfo.userId,
        riderId: id,
        timestamp: new Date().toISOString()
      }, "RIDERS");
      
      logUserAction("rider_deleted", {
        userId: userInfo.userId,
        riderId: id
      });
      
      return id;
    } catch (error) {
      console.error("Error deleting rider:", error);
      const errorMessage = handleApiError(error, "Delete rider");
      
      logUserAction("delete_rider_failed", {
        userId: getUserInfoForLogging().userId,
        riderId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const ridersSlice = createSlice({
  name: "riders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createError = null;
      state.editError = null;
      state.fetchError = null;
      state.updateError = null;
      state.deleteError = null;
    },
    resetRiders: (state) => {
      state.riders = [];
      state.rider = null;
      state.loading = false;
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.getByIdLoading = false;
      state.error = null;
      state.createError = null;
      state.editError = null;
      state.fetchError = null;
      state.updateError = null;
      state.deleteError = null;
      state.success = false;
      state.createSuccess = false;
      state.editSuccess = false;
      state.fetchSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all riders
      .addCase(fetchRiders.pending, (state) => {
        state.fetchLoading = true;
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.editError = null;
        state.fetchError = null;
        state.success = false;
      })
      .addCase(fetchRiders.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.riders = action.payload;
        state.fetchSuccess = true;
        state.editError = null;
        state.fetchError = null;
        state.error = null;
        console.log("Riders fetched:", action.payload.length, "items");
      })
      .addCase(fetchRiders.rejected, (state, action) => {
        state.fetchLoading = false;
        state.loading = false;
        state.fetchError = action.payload;
        console.error("Error fetching riders:", action.payload);
      })
      
      // 🔹 Create a new rider
      .addCase(createRider.pending, (state) => {
        state.createLoading = true;
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.editError = null;
        state.success = false;
        state.editSuccess = false;
      })
      .addCase(createRider.fulfilled, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.success = true;
        state.createSuccess = true;
        state.editSuccess = false;
        state.riders.push(action.payload);
        state.createError = null;
        state.editError = null;
        state.error = null;
        console.log("Rider created successfully:", action.payload);
      })
      .addCase(createRider.rejected, (state, action) => {
        state.createLoading = false;
        state.loading = false;
        state.createError = action.payload;
        console.error("Error creating rider:", action.payload);
      })
      
      // 🔹 Fetch rider by ID
      .addCase(fetchRiderById.pending, (state) => {
        state.getByIdLoading = true;
        state.success = false;
        state.error = null;
        state.editError = null;
        state.createError = null;
      })
      .addCase(fetchRiderById.fulfilled, (state, action) => {
        state.getByIdLoading = false;
        state.loading = false;
        state.rider = action.payload;
        state.editError = null;
        console.log("Rider fetched by ID:", action.payload);
      })
      .addCase(fetchRiderById.rejected, (state, action) => {
        state.getByIdLoading = false;
        state.loading = false;
        state.error = action.payload;
        state.rider = null;
        console.error("Error fetching rider by ID:", action.payload);
      })
      
      // 🔹 Update a rider
      .addCase(updateRider.pending, (state) => {
        state.updateLoading = true;
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.editError = null;
        state.editSuccess = false;
        state.success = false;
      })
      .addCase(updateRider.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.loading = false;
        state.editSuccess = true;
        state.updateSuccess = true;
        state.riders = state.riders.map((rider) =>
          rider.id === action.payload.id ? action.payload : rider
        );
        state.editError = null;
        state.error = null;
        console.log("Rider updated successfully:", action.payload);
      })
      .addCase(updateRider.rejected, (state, action) => {
        state.updateLoading = false;
        state.loading = false;
        state.editError = action.payload;
        console.error("Error updating rider:", action.payload);
      })
      
      // 🔹 Delete a rider
      .addCase(deleteRider.pending, (state) => {
        state.deleteLoading = true;
        state.loading = true;
        state.error = null;
        state.createError = null;
      })
      .addCase(deleteRider.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;
        state.riders = state.riders.filter((rider) => rider.id !== action.payload);
        state.deleteSuccess = true;
        state.error = null;
        console.log("Rider deleted successfully, ID:", action.payload);
      })
      .addCase(deleteRider.rejected, (state, action) => {
        state.deleteLoading = false;
        state.loading = false;
        state.error = action.payload;
        console.error("Error deleting rider:", action.payload);
      });
  },
});

export const { clearError, resetRiders } = ridersSlice.actions;
export default ridersSlice.reducer;