import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data arrays
  fuels: [],
  addons: [],
  banks: [],
  typeAddons: [],
  
  // Loading states
  loading: false,
  fuelsLoading: false,
  addonsLoading: false,
  banksLoading: false,
  typeAddonsLoading: false,
  
  // Error states
  error: null,
  fuelsError: null,
  addonsError: null,
  banksError: null,
  typeAddonsError: null,
  
  // Success states
  success: false,
  fuelsSuccess: false,
  addonsSuccess: false,
  banksSuccess: false,
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
  }, "FUEL_API_ERROR");
  
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
  Logger.info(`Fuel Action: ${action}`, logDetails, "FUEL_ACTION");
};

// 🔹 Fetch Fuels
export const fetchFuels = createAsyncThunk(
  "fuels/fetchFuels",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_fuels_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.fuels.fetchFuels();
      
      Logger.info("Fuels fetched successfully", {
        userId: userInfo.userId,
        fuelCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("fuels_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch fuels");
      
      logUserAction("fetch_fuels_failed", {
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

// 🔹 Create Fuel
export const createFuel = createAsyncThunk(
  "fuels/createFuel",
  async (fuelName, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_fuel_attempt", { 
        userId: userInfo.userId,
        fuelName
      });
      
      const response = await apiClient.fuels.createFuel(fuelName);
      
      Logger.info("Fuel created successfully", {
        userId: userInfo.userId,
        fuelId: response.data?.id,
        fuelName,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("fuel_created", {
        userId: userInfo.userId,
        fuelName
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create fuel");
      
      logUserAction("create_fuel_failed", {
        userId: getUserInfoForLogging().userId,
        fuelName,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Fuel
export const deleteFuel = createAsyncThunk(
  "fuels/deleteFuel",
  async (fuelId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_fuel_attempt", { 
        userId: userInfo.userId,
        fuelId 
      });
      
      await apiClient.fuels.deleteFuel(fuelId);
      
      Logger.info("Fuel deleted successfully", {
        userId: userInfo.userId,
        fuelId,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("fuel_deleted", {
        userId: userInfo.userId,
        fuelId
      });
      
      return fuelId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete fuel");
      
      logUserAction("delete_fuel_failed", {
        userId: getUserInfoForLogging().userId,
        fuelId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Addons
export const fetchAddons = createAsyncThunk(
  "fuels/fetchAddons",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_addons_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.fuels.fetchAddons();
      
      Logger.info("Addons fetched successfully", {
        userId: userInfo.userId,
        addonCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("addons_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch addons");
      
      logUserAction("fetch_addons_failed", {
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

// 🔹 Create Addon
export const createAddon = createAsyncThunk(
  "fuels/createAddon",
  async (addonName, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_addon_attempt", { 
        userId: userInfo.userId,
        addonName
      });
      
      const response = await apiClient.fuels.createAddon(addonName);
      
      Logger.info("Addon created successfully", {
        userId: userInfo.userId,
        addonId: response.data?.id,
        addonName,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("addon_created", {
        userId: userInfo.userId,
        addonName
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create addon");
      
      logUserAction("create_addon_failed", {
        userId: getUserInfoForLogging().userId,
        addonName,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Addon
export const deleteAddon = createAsyncThunk(
  "fuels/deleteAddon",
  async (addonId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_addon_attempt", { 
        userId: userInfo.userId,
        addonId 
      });
      
      await apiClient.fuels.deleteAddon(addonId);
      
      Logger.info("Addon deleted successfully", {
        userId: userInfo.userId,
        addonId,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("addon_deleted", {
        userId: userInfo.userId,
        addonId
      });
      
      return addonId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete addon");
      
      logUserAction("delete_addon_failed", {
        userId: getUserInfoForLogging().userId,
        addonId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Type Addons
export const fetchTypeAddons = createAsyncThunk(
  "fuels/fetchTypeAddons",
  async (type, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_type_addons_attempt", { 
        userId: userInfo.userId,
        type 
      });
      
      const response = await apiClient.fuels.fetchTypeAddons(type);
      
      Logger.info("Type addons fetched successfully", {
        userId: userInfo.userId,
        type,
        addonCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("type_addons_fetched", { 
        userId: userInfo.userId,
        type 
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch type addons");
      
      logUserAction("fetch_type_addons_failed", {
        userId: getUserInfoForLogging().userId,
        type,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Banks
export const fetchBanks = createAsyncThunk(
  "fuels/fetchBanks",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_banks_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.fuels.fetchBanks();
      // console.log("banks resp",response)
      Logger.info("Banks fetched successfully", {
        userId: userInfo.userId,
        bankCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("banks_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch banks");
      
      logUserAction("fetch_banks_failed", {
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

// 🔹 Create Bank
export const createBank = createAsyncThunk(
  "fuels/createBank",
  async (bankName, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_bank_attempt", { 
        userId: userInfo.userId,
        bankName
      });
      
      const response = await apiClient.fuels.createBank(bankName);
      
      Logger.info("Bank created successfully", {
        userId: userInfo.userId,
        bankId: response.data?.id,
        bankName,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("bank_created", {
        userId: userInfo.userId,
        bankName
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create bank");
      
      logUserAction("create_bank_failed", {
        userId: getUserInfoForLogging().userId,
        bankName,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Bank
export const deleteBank = createAsyncThunk(
  "fuels/deleteBank",
  async (bankId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_bank_attempt", { 
        userId: userInfo.userId,
        bankId 
      });
      
      await apiClient.fuels.deleteBank(bankId);
      
      Logger.info("Bank deleted successfully", {
        userId: userInfo.userId,
        bankId,
        timestamp: new Date().toISOString()
      }, "FUELS");
      
      logUserAction("bank_deleted", {
        userId: userInfo.userId,
        bankId
      });
      
      return bankId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete bank");
      
      logUserAction("delete_bank_failed", {
        userId: getUserInfoForLogging().userId,
        bankId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const fuelsSlice = createSlice({
  name: "fuels",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.fuelsError = null;
      state.addonsError = null;
      state.banksError = null;
      state.typeAddonsError = null;
    },
    resetFuelState: (state) => {
      state.fuels = [];
      state.addons = [];
      state.banks = [];
      state.typeAddons = [];
      state.loading = false;
      state.fuelsLoading = false;
      state.addonsLoading = false;
      state.banksLoading = false;
      state.typeAddonsLoading = false;
      state.error = null;
      state.fuelsError = null;
      state.addonsError = null;
      state.banksError = null;
      state.typeAddonsError = null;
      state.success = false;
      state.fuelsSuccess = false;
      state.addonsSuccess = false;
      state.banksSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Fuels
      .addCase(fetchFuels.pending, (state) => {
        state.fuelsLoading = true;
        state.fuelsError = null;
        state.fuelsSuccess = false;
      })
      .addCase(fetchFuels.fulfilled, (state, action) => {
        state.fuelsLoading = false;
        state.fuels = action.payload;
        state.fuelsSuccess = true;
        state.fuelsError = null;
      })
      .addCase(fetchFuels.rejected, (state, action) => {
        state.fuelsLoading = false;
        state.fuelsError = action.payload;
      })
      
      // 🔹 Create Fuel
      .addCase(createFuel.pending, (state) => {
        state.loading = true;
        state.fuelsError = null;
        state.fuelsSuccess = false;
        state.success = false;
      })
      .addCase(createFuel.fulfilled, (state, action) => {
        state.loading = false;
        state.fuelsSuccess = true;
        state.success = true;
        state.fuels.push(action.payload);
        state.fuelsError = null;
      })
      .addCase(createFuel.rejected, (state, action) => {
        state.loading = false;
        state.fuelsError = action.payload;
      })
      
      // 🔹 Delete Fuel
      .addCase(deleteFuel.pending, (state) => {
        state.loading = true;
        state.fuelsError = null;
      })
      .addCase(deleteFuel.fulfilled, (state, action) => {
        state.loading = false;
        state.fuels = state.fuels.filter((fuel) => fuel.id !== action.payload);
        state.fuelsError = null;
      })
      .addCase(deleteFuel.rejected, (state, action) => {
        state.loading = false;
        state.fuelsError = action.payload;
      })
      
      // 🔹 Fetch Addons
      .addCase(fetchAddons.pending, (state) => {
        state.addonsLoading = true;
        state.addonsError = null;
        state.addonsSuccess = false;
      })
      .addCase(fetchAddons.fulfilled, (state, action) => {
        state.addonsLoading = false;
        state.addons = action.payload;
        state.addonsSuccess = true;
        state.addonsError = null;
      })
      .addCase(fetchAddons.rejected, (state, action) => {
        state.addonsLoading = false;
        state.addonsError = action.payload;
      })
      
      // 🔹 Create Addon
      .addCase(createAddon.pending, (state) => {
        state.loading = true;
        state.addonsError = null;
        state.addonsSuccess = false;
        state.success = false;
      })
      .addCase(createAddon.fulfilled, (state, action) => {
        state.loading = false;
        state.addonsSuccess = true;
        state.success = true;
        state.addons.push(action.payload);
        state.addonsError = null;
      })
      .addCase(createAddon.rejected, (state, action) => {
        state.loading = false;
        state.addonsError = action.payload;
      })
      
      // 🔹 Delete Addon
      .addCase(deleteAddon.pending, (state) => {
        state.loading = true;
        state.addonsError = null;
      })
      .addCase(deleteAddon.fulfilled, (state, action) => {
        state.loading = false;
        state.addons = state.addons.filter((addon) => addon.id !== action.payload);
        state.addonsError = null;
      })
      .addCase(deleteAddon.rejected, (state, action) => {
        state.loading = false;
        state.addonsError = action.payload;
      })
      
      // 🔹 Fetch Type Addons
      .addCase(fetchTypeAddons.pending, (state) => {
        state.typeAddonsLoading = true;
        state.typeAddonsError = null;
        state.typeAddons = [];
      })
      .addCase(fetchTypeAddons.fulfilled, (state, action) => {
        state.typeAddonsLoading = false;
        state.typeAddons = action.payload;
        state.typeAddonsError = null;
      })
      .addCase(fetchTypeAddons.rejected, (state, action) => {
        state.typeAddonsLoading = false;
        state.typeAddonsError = action.payload;
      })
      
      // 🔹 Fetch Banks
      .addCase(fetchBanks.pending, (state) => {
        state.banksLoading = true;
        state.banksError = null;
        state.banksSuccess = false;
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.banksLoading = false;
        state.banks = action.payload;
        state.banksSuccess = true;
        state.banksError = null;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.banksLoading = false;
        state.banksError = action.payload;
      })
      
      // 🔹 Create Bank
      .addCase(createBank.pending, (state) => {
        state.loading = true;
        state.banksError = null;
        state.banksSuccess = false;
        state.success = false;
      })
      .addCase(createBank.fulfilled, (state, action) => {
        state.loading = false;
        state.banksSuccess = true;
        state.success = true;
        state.banks.push(action.payload);
        state.banksError = null;
      })
      .addCase(createBank.rejected, (state, action) => {
        state.loading = false;
        state.banksError = action.payload;
      })
      
      // 🔹 Delete Bank
      .addCase(deleteBank.pending, (state) => {
        state.loading = true;
        state.banksError = null;
      })
      .addCase(deleteBank.fulfilled, (state, action) => {
        state.loading = false;
        state.banks = state.banks.filter((bank) => bank.id !== action.payload);
        state.banksError = null;
      })
      .addCase(deleteBank.rejected, (state, action) => {
        state.loading = false;
        state.banksError = action.payload;
      });
  },
});

export const { clearError, resetFuelState } = fuelsSlice.actions;
export default fuelsSlice.reducer;