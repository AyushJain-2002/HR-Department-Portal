import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data arrays
  bqpTypes: [],
  bqpList: [],
  relationshipManagers: [],
  reportingManager: [],
  reportingManagerForPospMisp: [],
  pospTypes: [],
  referTypes: [],
  motorEmployee: [],
  chequeData: null,

   // success states
  success: false,
  bqpTypesSuccess: false,
  relationshipManagersSuccess: false,
  pospTypesSuccess: false,
  referTypesSuccess: false,
  motorEmployeeSuccess: false,
  chequeDataSuccess: false,
  bqpSuccess: false,
  reportingManagerSuccess: false,
  
  // Loading states
  loading: false,
  bqpTypesLoading: false,
  relationshipManagersLoading: false,
  pospTypesLoading: false,
  referTypesLoading: false,
  motorEmployeeLoading: false,
  chequeDataLoading: false,
  bqpLoading: false,
  reportingManagerLoading: false,
  
  // Error states
  error: null,
  bqpTypesError: null,
  relationshipManagersError: null,
  pospTypesError: null,
  referTypesError: null,
  motorEmployeeError: null,
  chequeDataError: null,
  bqpError: null,
  reportingManagerError: null,
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
  }, "OPERATION_API_ERROR");
  
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
  Logger.info(`Operation Action: ${action}`, logDetails, "OPERATION_ACTION");
};

// 🔹 Fetch BQP Types
export const fetchBqpTypes = createAsyncThunk(
  "operation/fetchBqpTypes",
  async (verticalType, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_bqp_types_attempt", { 
        userId: userInfo.userId,
        verticalType 
      });
      
      const response = await apiClient.operations.fetchBqpTypes(verticalType);
      
      Logger.info("BQP types fetched successfully", {
        userId: userInfo.userId,
        verticalType,
        bqpCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("bqp_types_fetched", { 
        userId: userInfo.userId,
        verticalType 
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch BQP types");
      
      logUserAction("fetch_bqp_types_failed", {
        userId: getUserInfoForLogging().userId,
        verticalType,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Relationship Managers with Vertical
export const fetchRelationshipManagersWithVertical = createAsyncThunk(
  "operation/fetchRelationshipManagersWithVertical",
  async ({ verticalType, bqpId }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_relationship_managers_with_vertical_attempt", { 
        userId: userInfo.userId,
        verticalType,
        bqpId 
      });
      
      const response = await apiClient.operations.fetchRelationshipManagersWithVertical(verticalType, bqpId);
      
      Logger.info("Relationship managers fetched successfully", {
        userId: userInfo.userId,
        verticalType,
        bqpId,
        managerCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("relationship_managers_fetched", { 
        userId: userInfo.userId,
        verticalType,
        bqpId 
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch relationship managers");
      
      logUserAction("fetch_relationship_managers_failed", {
        userId: getUserInfoForLogging().userId,
        verticalType,
        bqpId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Relationship Manager by ID
export const fetchRelationshipManager = createAsyncThunk(
  "operation/fetchRelationshipManager",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_relationship_manager_attempt", { 
        userId: userInfo.userId,
        relationshipManagerId: id 
      });
      
      const response = await apiClient.operations.fetchRelationshipManager(id);
      console.log("response in fetchbqp",response)
      Logger.info("Relationship manager fetched successfully", {
        userId: userInfo.userId,
        relationshipManagerId: id,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("relationship_manager_fetched", { 
        userId: userInfo.userId,
        relationshipManagerId: id 
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch relationship manager");
      
      logUserAction("fetch_relationship_manager_failed", {
        userId: getUserInfoForLogging().userId,
        relationshipManagerId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch POSP Types
export const fetchPospTypes = createAsyncThunk(
  "operation/fetchPospTypes",
  async ({ verticalType, rmid }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_posp_types_attempt", { 
        userId: userInfo.userId,
        verticalType,
        rmid 
      });
      
      const response = await apiClient.operations.fetchPospTypes(verticalType, rmid);
      
      Logger.info("POSP types fetched successfully", {
        userId: userInfo.userId,
        verticalType,
        rmid,
        pospCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("posp_types_fetched", { 
        userId: userInfo.userId,
        verticalType,
        rmid 
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch POSP types");
      
      logUserAction("fetch_posp_types_failed", {
        userId: getUserInfoForLogging().userId,
        verticalType,
        rmid,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch POSP by ID
export const fetchPosp = createAsyncThunk(
  "operation/fetchPosp",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_posp_attempt", { 
        userId: userInfo.userId,
        pospId: id 
      });
      
      const response = await apiClient.operations.fetchPosp(id);
      
      Logger.info("POSP fetched successfully", {
        userId: userInfo.userId,
        pospId: id,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("posp_fetched", { 
        userId: userInfo.userId,
        pospId: id 
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch POSP");
      
      logUserAction("fetch_posp_failed", {
        userId: getUserInfoForLogging().userId,
        pospId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Refer Types
export const fetchReferTypes = createAsyncThunk(
  "operation/fetchReferTypes",
  async ({ verticalType, pospId }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_refer_types_attempt", { 
        userId: userInfo.userId,
        verticalType,
        pospId 
      });
      
      const response = await apiClient.operations.fetchReferTypes(verticalType, pospId);
      
      Logger.info("Refer types fetched successfully", {
        userId: userInfo.userId,
        verticalType,
        pospId,
        referCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("refer_types_fetched", { 
        userId: userInfo.userId,
        verticalType,
        pospId 
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch refer types");
      
      logUserAction("fetch_refer_types_failed", {
        userId: getUserInfoForLogging().userId,
        verticalType,
        pospId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Motor Employee
export const fetchMotorEmployee = createAsyncThunk(
  "operation/fetchMotorEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_motor_employee_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.operations.fetchMotorEmployee();
      
      Logger.info("Motor employees fetched successfully", {
        userId: userInfo.userId,
        employeeCount: response.data?.employees?.length || 0,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("motor_employees_fetched", { 
        userId: userInfo.userId,
        count: response.data?.employees?.length || 0
      });
      
      return response.data?.employees || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch motor employees");
      
      logUserAction("fetch_motor_employees_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Cheque Data
export const fetchChequeData = createAsyncThunk(
  "operation/fetchChequeData",
  async (chequeNo, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_cheque_data_attempt", { 
        userId: userInfo.userId,
        chequeNo 
      });
      
      const response = await apiClient.operations.fetchChequeData(chequeNo);
      
      Logger.info("Cheque data fetched successfully", {
        userId: userInfo.userId,
        chequeNo,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("cheque_data_fetched", { 
        userId: userInfo.userId,
        chequeNo 
      });
      
      return response.data || null;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch cheque data");
      
      logUserAction("fetch_cheque_data_failed", {
        userId: getUserInfoForLogging().userId,
        chequeNo,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch BQP
export const fetchBqp = createAsyncThunk(
  "operation/fetchBqp",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_bqp_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.operations.fetchBqp();
      Logger.info("BQP fetched successfully", {
        userId: userInfo.userId,
        bqpCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("bqp_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch BQP");
      
      logUserAction("fetch_bqp_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Reporting Manager
export const fetchReportingManager = createAsyncThunk(
  "operation/fetchReportingManager",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_reporting_manager_attempt", { 
        userId: userInfo.userId,
        reportingManagerId: id 
      });
      
      const response = await apiClient.operations.fetchReportingManager(id);
      
      Logger.info("Reporting manager fetched successfully", {
        userId: userInfo.userId,
        reportingManagerId: id,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("reporting_manager_fetched", { 
        userId: userInfo.userId,
        reportingManagerId: id 
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch reporting manager");
      
      logUserAction("fetch_reporting_manager_failed", {
        userId: getUserInfoForLogging().userId,
        reportingManagerId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Reporting Manager with POSP
export const fetchReportingManagerWithPosp = createAsyncThunk(
  "operation/fetchReportingManagerWithPosp",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_reporting_manager_with_posp_attempt", { 
        userId: userInfo.userId,
        id 
      });
      
      const response = await apiClient.operations.fetchReportingManagerWithPosp(id);
      
      Logger.info("Reporting manager with POSP fetched successfully", {
        userId: userInfo.userId,
        id,
        timestamp: new Date().toISOString()
      }, "OPERATIONS");
      
      logUserAction("reporting_manager_with_posp_fetched", { 
        userId: userInfo.userId,
        id 
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch reporting manager with POSP");
      
      logUserAction("fetch_reporting_manager_with_posp_failed", {
        userId: getUserInfoForLogging().userId,
        id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const operationSlice = createSlice({
  name: "operation",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.bqpTypesError = null;
      state.relationshipManagersError = null;
      state.pospTypesError = null;
      state.referTypesError = null;
      state.motorEmployeeError = null;
      state.chequeDataError = null;
      state.bqpError = null;
      state.reportingManagerError = null;
    },
    resetOperationState: (state) => {
      state.bqpTypes = [];
      state.bqpList = [];
      state.relationshipManagers = [];
      state.reportingManager = [];
      state.reportingManagerForPospMisp = [];
      state.pospTypes = [];
      state.referTypes = [];
      state.motorEmployee = [];
      state.chequeData = null;
      state.loading = false;
      state.bqpTypesLoading = false;
      state.relationshipManagersLoading = false;
      state.pospTypesLoading = false;
      state.referTypesLoading = false;
      state.motorEmployeeLoading = false;
      state.chequeDataLoading = false;
      state.bqpLoading = false;
      state.reportingManagerLoading = false;
      state.error = null;
      state.bqpTypesError = null;
      state.relationshipManagersError = null;
      state.pospTypesError = null;
      state.referTypesError = null;
      state.motorEmployeeError = null;
      state.chequeDataError = null;
      state.bqpError = null;
      state.reportingManagerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch BQP Types
      .addCase(fetchBqpTypes.pending, (state) => {
        state.bqpTypesLoading = true;
        state.error = null;
        state.bqpTypesError = null;
        state.bqpTypes = [];
        state.relationshipManagers = [];
        state.pospTypes = [];
        state.referTypes = [];
        state.success=false;
        state.bqpTypesSuccess=false;
      })
      .addCase(fetchBqpTypes.fulfilled, (state, action) => {
        state.bqpTypesLoading = false;
        state.bqpTypes = action.payload;
        state.bqpTypesSuccess=true;
        state.bqpTypesError = null;
      })
      .addCase(fetchBqpTypes.rejected, (state, action) => {
        state.bqpTypesLoading = false;
        state.bqpTypesSuccess=false;
        state.bqpTypesError = action.payload;
      })
      
      // 🔹 Fetch Relationship Managers with Vertical
      .addCase(fetchRelationshipManagersWithVertical.pending, (state) => {
        state.relationshipManagersSuccess = false;
        state.relationshipManagersLoading = true;
        state.error = null;
        state.relationshipManagersError = null;
        state.relationshipManagers = [];
        state.pospTypes = [];
        state.referTypes = [];
      })
      .addCase(fetchRelationshipManagersWithVertical.fulfilled, (state, action) => {
        state.relationshipManagersSuccess = true;
        state.relationshipManagersLoading = false;
        state.relationshipManagers = action.payload;
        state.relationshipManagersError = null;
      })
      .addCase(fetchRelationshipManagersWithVertical.rejected, (state, action) => {
        state.relationshipManagersSuccess = false;
        state.relationshipManagersLoading = false;
        state.relationshipManagersError = action.payload;
      })
      
      // 🔹 Fetch Relationship Manager by ID
      .addCase(fetchRelationshipManager.pending, (state) => {
        state.relationshipManagersSuccess = false;
        state.relationshipManagersLoading = true;
        state.error = null;
        state.relationshipManagersError = null;
        state.relationshipManagers = [];
      })
      .addCase(fetchRelationshipManager.fulfilled, (state, action) => {
        state.relationshipManagersLoading = false;
        state.relationshipManagersSuccess = true;
        state.relationshipManagers = action.payload;
        state.relationshipManagersError = null;
      })
      .addCase(fetchRelationshipManager.rejected, (state, action) => {
        state.relationshipManagersLoading = false;
        state.relationshipManagersSuccess = false;
        state.relationshipManagersError = action.payload;
      })
      
      // 🔹 Fetch POSP Types
      .addCase(fetchPospTypes.pending, (state) => {
        state.pospTypesLoading = true;
        state.pospTypesSuccess = false;
        state.error = null;
        state.pospTypesError = null;
        state.pospTypes = [];
        state.referTypes = [];
      })
      .addCase(fetchPospTypes.fulfilled, (state, action) => {
        state.pospTypesSuccess = true;
        state.pospTypesLoading = false;
        state.pospTypes = action.payload;
        state.pospTypesError = null;
      })
      .addCase(fetchPospTypes.rejected, (state, action) => {
        state.pospTypesSuccess = false;
        state.pospTypesLoading = false;
        state.pospTypesError = action.payload;
      })
      
      // 🔹 Fetch POSP by ID
      .addCase(fetchPosp.pending, (state) => {
        state.pospTypesLoading = true;
        state.pospTypesSuccess = false;
        state.error = null;
        state.pospTypesError = null;
        state.pospTypes = [];
      })
      .addCase(fetchPosp.fulfilled, (state, action) => {
        state.pospTypesSuccess = true;
        state.pospTypesLoading = false;
        state.pospTypes = action.payload;
        state.pospTypesError = null;
      })
      .addCase(fetchPosp.rejected, (state, action) => {
        state.pospTypesSuccess = false;
        state.pospTypesLoading = false;
        state.pospTypesError = action.payload;
      })
      
      // 🔹 Fetch Refer Types
      .addCase(fetchReferTypes.pending, (state) => {
        state.referTypesLoading = true;
        state.referTypesSuccess = false;
        state.error = null;
        state.referTypesError = null;
        state.referTypes = [];
      })
      .addCase(fetchReferTypes.fulfilled, (state, action) => {
        state.referTypesLoading = false;
        state.referTypesSuccess = true;
        state.referTypes = action.payload;
        state.referTypesError = null;
      })
      .addCase(fetchReferTypes.rejected, (state, action) => {
        state.referTypesSuccess = false;
        state.referTypesLoading = false;
        state.referTypesError = action.payload;
      })
      
      // 🔹 Fetch Motor Employee
      .addCase(fetchMotorEmployee.pending, (state) => {
        state.motorEmployeeLoading = true;
        state.motorEmployeeSuccess = false;
        state.error = null;
        state.motorEmployeeError = null;
        state.motorEmployee = [];
      })
      .addCase(fetchMotorEmployee.fulfilled, (state, action) => {
        state.motorEmployeeSuccess = true;
        state.motorEmployeeLoading = false;
        state.motorEmployee = action.payload;
        state.motorEmployeeError = null;
      })
      .addCase(fetchMotorEmployee.rejected, (state, action) => {
        state.motorEmployeeSuccess = false;
        state.motorEmployeeLoading = false;
        state.motorEmployeeError = action.payload;
      })
      
      // 🔹 Fetch Cheque Data
      .addCase(fetchChequeData.pending, (state) => {
        state.chequeDataLoading = true;
        state.chequeDataSuccess = false;
        state.error = null;
        state.chequeDataError = null;
        state.chequeData = null;
      })
      .addCase(fetchChequeData.fulfilled, (state, action) => {
        state.chequeDataSuccess = true;
        state.chequeDataLoading = false;
        state.chequeData = action.payload;
        state.chequeDataError = null;
      })
      .addCase(fetchChequeData.rejected, (state, action) => {
        state.chequeDataSuccess = false;
        state.chequeDataLoading = false;
        state.chequeDataError = action.payload;
      })
      
      // 🔹 Fetch BQP
      .addCase(fetchBqp.pending, (state) => {
        state.bqpLoading = true;
        state.bqpSuccess = false;
        state.error = null;
        state.bqpError = null;
        state.bqpList = [];
      })
      .addCase(fetchBqp.fulfilled, (state, action) => {
        state.bqpSuccess = true;
        state.bqpLoading = false;
        state.bqpList = action.payload;
        state.bqpError = null;
      })
      .addCase(fetchBqp.rejected, (state, action) => {
        state.bqpSuccess = false;
        state.bqpLoading = false;
        state.bqpError = action.payload;
      })
      
      // 🔹 Fetch Reporting Manager
      .addCase(fetchReportingManager.pending, (state) => {
        state.reportingManagerLoading = true;
        state.reportingManagerSuccess = false;
        state.error = null;
        state.reportingManagerError = null;
        state.reportingManager = [];
      })
      .addCase(fetchReportingManager.fulfilled, (state, action) => {
        state.reportingManagerSuccess = true;
        state.reportingManagerLoading = false;
        state.reportingManager = action.payload;
        state.reportingManagerError = null;
      })
      .addCase(fetchReportingManager.rejected, (state, action) => {
        state.reportingManagerSuccess = false;
        state.reportingManagerLoading = false;
        state.reportingManagerError = action.payload;
      })
      
      // 🔹 Fetch Reporting Manager with POSP
      .addCase(fetchReportingManagerWithPosp.pending, (state) => {
        state.reportingManagerLoading = true;
        state.reportingManagerSuccess = false;
        state.error = null;
        state.reportingManagerError = null;
        state.reportingManagerForPospMisp = [];
      })
      .addCase(fetchReportingManagerWithPosp.fulfilled, (state, action) => {
        state.reportingManagerSuccess = true;
        state.reportingManagerLoading = false;
        state.reportingManagerForPospMisp = action.payload;
        state.reportingManagerError = null;
      })
      .addCase(fetchReportingManagerWithPosp.rejected, (state, action) => {
        state.reportingManagerSuccess = false;
        state.reportingManagerLoading = false;
        state.reportingManagerError = action.payload;
      });
  },
});

export const { clearError, resetOperationState } = operationSlice.actions;
export default operationSlice.reducer;