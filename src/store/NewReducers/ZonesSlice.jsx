// store/Reducers/ZonesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data
  zones: [],
  regions: [],
  
  // Loading states
  loading: false,
  fetchZonesLoading: false,
  fetchRegionsLoading: false,
  addZoneLoading: false,
  addRegionLoading: false,
  deleteZoneLoading: false,
  deleteRegionLoading: false,
  
  // Error states
  error: null,
  fetchError: null,
  addZoneError: null,
  addRegionError: null,
  deleteZoneError: null,
  deleteRegionError: null,
  
  // Success states
  success: false,
  fetchSuccess: false,
  addZoneSuccess: false,
  addRegionSuccess: false,
  deleteZoneSuccess: false,
  deleteRegionSuccess: false,
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
  }, "ZONES_API_ERROR");
  
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
  Logger.info(`Zones Action: ${action}`, logDetails, "ZONES_ACTION");
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

// 🔹 Fetch all zones
export const fetchZones = createAsyncThunk(
  "zones/fetchZones",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_zones_attempt", { 
        userId: userInfo.userId
      });
      
      const response = await apiClient.zones.fetchZones();
      
      Logger.info("Zones fetched successfully", {
        userId: userInfo.userId,
        zonesCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "ZONES");
      
      logUserAction("zones_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data || [];
    } catch (error) {
      try {
        // Handle 404 specifically
        const emptyArray = handleNotFoundError(error, "fetch_zones");
        if (emptyArray !== undefined) {
          return emptyArray;
        }
      } catch (notFoundError) {
        // Not a 404, proceed with normal error handling
        const errorMessage = handleApiError(error, "Fetch zones");
        
        logUserAction("fetch_zones_failed", {
          userId: getUserInfoForLogging().userId,
          error: errorMessage
        });
        
        return rejectWithValue(errorMessage);
      }
    }
  }
);

// 🔹 Add a new zone
export const addZone = createAsyncThunk(
  "zones/addZone",
  async (zoneName, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("add_zone_attempt", { 
        userId: userInfo.userId,
        zoneName
      });
      
      const response = await apiClient.zones.addZone(zoneName);
      
      Logger.info("Zone added successfully", {
        userId: userInfo.userId,
        zoneId: response.data?.id,
        zoneName,
        timestamp: new Date().toISOString()
      }, "ZONES");
      
      logUserAction("zone_added", {
        userId: userInfo.userId,
        zoneName,
        zoneId: response.data?.id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Add zone");
      
      logUserAction("add_zone_failed", {
        userId: getUserInfoForLogging().userId,
        zoneName,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete a zone
export const deleteZone = createAsyncThunk(
  "zones/deleteZone",
  async (zoneId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_zone_attempt", { 
        userId: userInfo.userId,
        zoneId
      });
      
      await apiClient.zones.deleteZone(zoneId);
      
      Logger.info("Zone deleted successfully", {
        userId: userInfo.userId,
        zoneId,
        timestamp: new Date().toISOString()
      }, "ZONES");
      
      logUserAction("zone_deleted", {
        userId: userInfo.userId,
        zoneId
      });
      
      return zoneId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete zone");
      
      logUserAction("delete_zone_failed", {
        userId: getUserInfoForLogging().userId,
        zoneId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch all regions
export const fetchRegions = createAsyncThunk(
  "zones/fetchRegions",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_regions_attempt", { 
        userId: userInfo.userId
      });
      
      const response = await apiClient.zones.fetchRegions();
      
      Logger.info("Regions fetched successfully", {
        userId: userInfo.userId,
        regionsCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "ZONES");
      
      logUserAction("regions_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data || [];
    } catch (error) {
      try {
        // Handle 404 specifically
        const emptyArray = handleNotFoundError(error, "fetch_regions");
        if (emptyArray !== undefined) {
          return emptyArray;
        }
      } catch (notFoundError) {
        // Not a 404, proceed with normal error handling
        const errorMessage = handleApiError(error, "Fetch regions");
        
        logUserAction("fetch_regions_failed", {
          userId: getUserInfoForLogging().userId,
          error: errorMessage
        });
        
        return rejectWithValue(errorMessage);
      }
    }
  }
);

// 🔹 Add a new region
export const addRegion = createAsyncThunk(
  "zones/addRegion",
  async (regionName, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("add_region_attempt", { 
        userId: userInfo.userId,
        regionName
      });
      
      const response = await apiClient.zones.addRegion(regionName);
      
      Logger.info("Region added successfully", {
        userId: userInfo.userId,
        regionId: response.data?.id,
        regionName,
        timestamp: new Date().toISOString()
      }, "ZONES");
      
      logUserAction("region_added", {
        userId: userInfo.userId,
        regionName,
        regionId: response.data?.id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Add region");
      
      logUserAction("add_region_failed", {
        userId: getUserInfoForLogging().userId,
        regionName,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete a region
export const deleteRegion = createAsyncThunk(
  "zones/deleteRegion",
  async (regionId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_region_attempt", { 
        userId: userInfo.userId,
        regionId
      });
      
      await apiClient.zones.deleteRegion(regionId);
      
      Logger.info("Region deleted successfully", {
        userId: userInfo.userId,
        regionId,
        timestamp: new Date().toISOString()
      }, "ZONES");
      
      logUserAction("region_deleted", {
        userId: userInfo.userId,
        regionId
      });
      
      return regionId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete region");
      
      logUserAction("delete_region_failed", {
        userId: getUserInfoForLogging().userId,
        regionId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const zonesSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fetchError = null;
      state.addZoneError = null;
      state.addRegionError = null;
      state.deleteZoneError = null;
      state.deleteRegionError = null;
    },
    resetZones: (state) => {
      state.zones = [];
      state.regions = [];
      state.loading = false;
      state.fetchZonesLoading = false;
      state.fetchRegionsLoading = false;
      state.addZoneLoading = false;
      state.addRegionLoading = false;
      state.deleteZoneLoading = false;
      state.deleteRegionLoading = false;
      state.error = null;
      state.fetchError = null;
      state.addZoneError = null;
      state.addRegionError = null;
      state.deleteZoneError = null;
      state.deleteRegionError = null;
      state.success = false;
      state.fetchSuccess = false;
      state.addZoneSuccess = false;
      state.addRegionSuccess = false;
      state.deleteZoneSuccess = false;
      state.deleteRegionSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch zones
      .addCase(fetchZones.pending, (state) => {
        state.fetchZonesLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.success = false;
        state.fetchSuccess = false;
      })
      .addCase(fetchZones.fulfilled, (state, action) => {
        state.fetchZonesLoading = false;
        state.loading = false;
        state.zones = action.payload;
        state.fetchSuccess = true;
        state.success = true;
        state.fetchError = null;
        state.error = null;
        // console.log("Zones fetched:", action.payload.length, "zones");
      })
      .addCase(fetchZones.rejected, (state, action) => {
        // If action.payload is an array (404 case), treat as success with empty data
        if (Array.isArray(action.payload)) {
          state.fetchZonesLoading = false;
          state.loading = false;
          state.zones = action.payload; // Should be empty array []
          state.fetchSuccess = true;
          state.success = true;
          state.fetchError = null;
          state.error = null;
          console.log("No zones found (404), returning empty array");
        } else {
          state.fetchZonesLoading = false;
          state.loading = false;
          state.fetchError = action.payload;
          console.error("Error fetching zones:", action.payload);
        }
      })
      
      // 🔹 Add zone
      .addCase(addZone.pending, (state) => {
        state.addZoneLoading = true;
        state.loading = true;
        state.error = null;
        state.addZoneError = null;
        state.success = false;
        state.addZoneSuccess = false;
      })
      .addCase(addZone.fulfilled, (state, action) => {
        state.addZoneLoading = false;
        state.loading = false;
        state.addZoneSuccess = true;
        state.success = true;
        state.zones.push(action.payload);
        state.addZoneError = null;
        state.error = null;
        console.log("Zone added successfully:", action.payload);
      })
      .addCase(addZone.rejected, (state, action) => {
        state.addZoneLoading = false;
        state.loading = false;
        state.addZoneError = action.payload;
        console.error("Error adding zone:", action.payload);
      })
      
      // 🔹 Delete zone
      .addCase(deleteZone.pending, (state) => {
        state.deleteZoneLoading = true;
        state.loading = true;
        state.error = null;
        state.deleteZoneError = null;
        state.deleteZoneSuccess = false;
      })
      .addCase(deleteZone.fulfilled, (state, action) => {
        state.deleteZoneLoading = false;
        state.loading = false;
        state.deleteZoneSuccess = true;
        state.zones = state.zones.filter((zone) => zone.id !== action.payload);
        state.deleteZoneError = null;
        state.error = null;
        console.log("Zone deleted successfully, ID:", action.payload);
      })
      .addCase(deleteZone.rejected, (state, action) => {
        state.deleteZoneLoading = false;
        state.loading = false;
        state.deleteZoneError = action.payload;
        console.error("Error deleting zone:", action.payload);
      })
      
      // 🔹 Fetch regions
      .addCase(fetchRegions.pending, (state) => {
        state.fetchRegionsLoading = true;
        state.loading = true;
        state.error = null;
        state.fetchError = null;
        state.success = false;
        state.fetchSuccess = false;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.fetchRegionsLoading = false;
        state.loading = false;
        state.regions = action.payload;
        state.fetchSuccess = true;
        state.success = true;
        state.fetchError = null;
        state.error = null;
        // console.log("Regions fetched:", action.payload.length, "regions");
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        // If action.payload is an array (404 case), treat as success with empty data
        if (Array.isArray(action.payload)) {
          state.fetchRegionsLoading = false;
          state.loading = false;
          state.regions = action.payload; // Should be empty array []
          state.fetchSuccess = true;
          state.success = true;
          state.fetchError = null;
          state.error = null;
          console.log("No regions found (404), returning empty array");
        } else {
          state.fetchRegionsLoading = false;
          state.loading = false;
          state.fetchError = action.payload;
          console.error("Error fetching regions:", action.payload);
        }
      })
      
      // 🔹 Add region
      .addCase(addRegion.pending, (state) => {
        state.addRegionLoading = true;
        state.loading = true;
        state.error = null;
        state.addRegionError = null;
        state.success = false;
        state.addRegionSuccess = false;
      })
      .addCase(addRegion.fulfilled, (state, action) => {
        state.addRegionLoading = false;
        state.loading = false;
        state.addRegionSuccess = true;
        state.success = true;
        state.regions.push(action.payload);
        state.addRegionError = null;
        state.error = null;
        console.log("Region added successfully:", action.payload);
      })
      .addCase(addRegion.rejected, (state, action) => {
        state.addRegionLoading = false;
        state.loading = false;
        state.addRegionError = action.payload;
        console.error("Error adding region:", action.payload);
      })
      
      // 🔹 Delete region
      .addCase(deleteRegion.pending, (state) => {
        state.deleteRegionLoading = true;
        state.loading = true;
        state.error = null;
        state.deleteRegionError = null;
        state.deleteRegionSuccess = false;
      })
      .addCase(deleteRegion.fulfilled, (state, action) => {
        state.deleteRegionLoading = false;
        state.loading = false;
        state.deleteRegionSuccess = true;
        state.regions = state.regions.filter((region) => region.id !== action.payload);
        state.deleteRegionError = null;
        state.error = null;
        console.log("Region deleted successfully, ID:", action.payload);
      })
      .addCase(deleteRegion.rejected, (state, action) => {
        state.deleteRegionLoading = false;
        state.loading = false;
        state.deleteRegionError = action.payload;
        console.error("Error deleting region:", action.payload);
      });
  },
});

export const { clearError, resetZones } = zonesSlice.actions;
export default zonesSlice.reducer;