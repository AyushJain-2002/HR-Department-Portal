import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axios";
import Cookies from "js-cookie";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  states: [],
  cities: [],
  citiesBy: [],
  loading: false,
  error: null,
  success: false,
  createSuccess:false,
  deleteSuccess:false,
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
  }, "STATE_CITY_API_ERROR");
  
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
  Logger.info(`State/City Action: ${action}`, logDetails, "STATE_CITY_ACTION");
};

// 🔹 Fetch States
export const fetchStates = createAsyncThunk(
  "states/fetchStates",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
    //   const token = Cookies.get("authToken");
      
      logUserAction("fetch_states_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.states.fetchStates();
      // console.log(response.data)
      if (response.status !== 200) {
        throw new Error("Failed to fetch states");
      }
      
      Logger.info("States fetched successfully", {
        userId: userInfo.userId,
        stateCount: response.data.length,
        timestamp: new Date().toISOString()
      }, "STATES");
      
      logUserAction("states_fetched", { 
        userId: userInfo.userId,
        count: response.data.length 
      });
      // console.log("States in slice",response)
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch states");
      // console.log("WHat is the error",error)
      logUserAction("fetch_states_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Cities by State
export const fetchCitiesByState = createAsyncThunk(
  "states/fetchCitiesByState",
  async (stateId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
    //   const token = Cookies.get("authToken");
      
      logUserAction("fetch_cities_by_state_attempt", { 
        userId: userInfo.userId,
        stateId 
      });
      
      const response = await apiClient.states.fetchCitiesByState(stateId);
      
      Logger.info("Cities by state fetched successfully", {
        userId: userInfo.userId,
        stateId,
        cityCount: response.data.length,
        timestamp: new Date().toISOString()
      }, "STATES");
      
      logUserAction("cities_by_state_fetched", { 
        userId: userInfo.userId,
        stateId 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch cities by state");
      
      logUserAction("fetch_cities_by_state_failed", {
        userId: getUserInfoForLogging().userId,
        stateId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Cities by State (Another)
export const fetchCitiesByStateAnother = createAsyncThunk(
  "states/fetchCitiesByStateAnother",
  async (stateId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      const token = Cookies.get("authToken");
      
      logUserAction("fetch_cities_by_state_another_attempt", { 
        userId: userInfo.userId,
        stateId 
      });
      
      const response = await apiClient.states.fetchCitiesByStateAnother(stateId);
      
      Logger.info("Cities by state (another) fetched successfully", {
        userId: userInfo.userId,
        stateId,
        cityCount: response.data.length,
        timestamp: new Date().toISOString()
      }, "STATES");
      
      logUserAction("cities_by_state_another_fetched", { 
        userId: userInfo.userId,
        stateId 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch cities by state (another)");
      
      logUserAction("fetch_cities_by_state_another_failed", {
        userId: getUserInfoForLogging().userId,
        stateId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch All Cities
export const fetchCities = createAsyncThunk(
  "states/fetchCities",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      const token = Cookies.get("authToken");
      
      logUserAction("fetch_all_cities_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.states.fetchCities();
      
      Logger.info("All cities fetched successfully", {
        userId: userInfo.userId,
        cityCount: response.data.length,
        timestamp: new Date().toISOString()
      }, "STATES");
      
      logUserAction("all_cities_fetched", { 
        userId: userInfo.userId,
        count: response.data.length 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch all cities");
      
      logUserAction("fetch_all_cities_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create City
export const createCity = createAsyncThunk(
  "states/createCity",
  async ({ stateId, cityName }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
    //   const token = Cookies.get("authToken");
      
      logUserAction("create_city_attempt", { 
        userId: userInfo.userId,
        stateId,
        cityName
      });
      
      const response = await apiClient.states.createCity({
        city_name: cityName,
        state_id: stateId,
      });
      
      if (response.status !== 201) {
        throw new Error('Failed to create city');
      }
      
      Logger.info("City created successfully", {
        userId: userInfo.userId,
        stateId,
        cityName,
        cityId: response.data?.city_id,
        timestamp: new Date().toISOString()
      }, "STATES");
      
      logUserAction("city_created", {
        userId: userInfo.userId,
        stateId,
        cityName
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create city");
      
      logUserAction("create_city_failed", {
        userId: getUserInfoForLogging().userId,
        stateId,
        cityName,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete City
export const deleteCity = createAsyncThunk(
  "states/deleteCity",
  async (cityId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      const token = Cookies.get("authToken");
      
      logUserAction("delete_city_attempt", { 
        userId: userInfo.userId,
        cityId 
      });
      
      await apiClient.states.deleteCity(cityId);
      
      Logger.info("City deleted successfully", {
        userId: userInfo.userId,
        cityId,
        timestamp: new Date().toISOString()
      }, "STATES");
      
      logUserAction("city_deleted", {
        userId: userInfo.userId,
        cityId
      });
      
      return cityId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete city");
      
      logUserAction("delete_city_failed", {
        userId: getUserInfoForLogging().userId,
        cityId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    clearStates: (state) => {
      state.states = [];
      state.cities = [];
      state.citiesBy = [];
      state.loading = false;
      state.error = null;
      state.success = false;
      state.deleteSuccess=false;
      state.createSuccess=false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch States
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.states = [];
      })
      
      // 🔹 Fetch Cities by State
      .addCase(fetchCitiesByState.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.cities = [];
      })
      .addCase(fetchCitiesByState.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
        state.error = null;
      })
      .addCase(fetchCitiesByState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cities = [];
      })
      
      // 🔹 Fetch Cities by State (Another)
      .addCase(fetchCitiesByStateAnother.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.citiesBy = [];
      })
      .addCase(fetchCitiesByStateAnother.fulfilled, (state, action) => {
        state.loading = false;
        state.citiesBy = action.payload;
        state.error = null;
      })
      .addCase(fetchCitiesByStateAnother.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.citiesBy = [];
      })
      
      // 🔹 Fetch All Cities
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.cities = [];
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
        state.error = null;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cities = [];
      })
      
      // 🔹 Create City
      .addCase(createCity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
        state.success=false
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createSuccess = true;
        state.cities.push(action.payload);
        state.error = null;
      })
      .addCase(createCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.createSuccess = false;
      })
      
      // 🔹 Delete City
      .addCase(deleteCity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleteSuccess=false
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = state.cities.filter((city) => city.city_id !== action.payload);
        state.error = null;
        state.deleteSuccess=true
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.deleteSuccess=false;
      });
  },
});

// Export actions
export const { clearStates, clearError } = statesSlice.actions;

export default statesSlice.reducer;