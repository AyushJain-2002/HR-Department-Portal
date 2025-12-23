import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Data arrays
  departments: [],
  designations: [],
  
  // Loading states
  loading: false,
  departmentsLoading: false,
  designationsLoading: false,
  
  // Error states
  error: null,
  departmentsError: null,
  designationsError: null,
  
  // Success states
  success: false,
  departmentsSuccess: false,
  designationsSuccess: false,
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
  }, "DEPARTMENT_API_ERROR");
  
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
  Logger.info(`Department Action: ${action}`, logDetails, "DEPARTMENT_ACTION");
};

// 🔹 Fetch Departments
export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_departments_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.departments.fetchDepartments();
      Logger.info("Departments fetched successfully", {
        userId: userInfo.userId,
        departmentCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "DEPARTMENTS");
       if (response.status !== 200) {
        throw new Error("Failed to fetch states");
      }
      logUserAction("departments_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch departments");
      
      logUserAction("fetch_departments_failed", {
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

// 🔹 Create Department
export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async (departmentName, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_department_attempt", { 
        userId: userInfo.userId,
        departmentName
      });
      
      const response = await apiClient.departments.createDepartment(departmentName);
      
      Logger.info("Department created successfully", {
        userId: userInfo.userId,
        departmentId: response.data?.id,
        departmentName,
        timestamp: new Date().toISOString()
      }, "DEPARTMENTS");
      
      logUserAction("department_created", {
        userId: userInfo.userId,
        departmentName
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create department");
      
      logUserAction("create_department_failed", {
        userId: getUserInfoForLogging().userId,
        departmentName,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Department
export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (departmentId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_department_attempt", { 
        userId: userInfo.userId,
        departmentId 
      });
      
      await apiClient.departments.deleteDepartment(departmentId);
      
      Logger.info("Department deleted successfully", {
        userId: userInfo.userId,
        departmentId,
        timestamp: new Date().toISOString()
      }, "DEPARTMENTS");
      
      logUserAction("department_deleted", {
        userId: userInfo.userId,
        departmentId
      });
      
      return departmentId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete department");
      
      logUserAction("delete_department_failed", {
        userId: getUserInfoForLogging().userId,
        departmentId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Designations
export const fetchDesignations = createAsyncThunk(
  "departments/fetchDesignations",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_designations_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.departments.fetchDesignations();
      Logger.info("Designations fetched successfully", {
        userId: userInfo.userId,
        designationCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "DEPARTMENTS");
      
      logUserAction("designations_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch designations");
      
      logUserAction("fetch_designations_failed", {
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

// 🔹 Create Designation
export const createDesignation = createAsyncThunk(
  "departments/createDesignation",
  async (designationName, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_designation_attempt", { 
        userId: userInfo.userId,
        designationName
      });
      
      const response = await apiClient.departments.createDesignation(designationName);
      // console.log("deaprt")
      Logger.info("Designation created successfully", {
        userId: userInfo.userId,
        designationId: response.data?.id,
        designationName,
        timestamp: new Date().toISOString()
      }, "DEPARTMENTS");
      
      logUserAction("designation_created", {
        userId: userInfo.userId,
        designationName
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create designation");
      
      logUserAction("create_designation_failed", {
        userId: getUserInfoForLogging().userId,
        designationName,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Designation
export const deleteDesignation = createAsyncThunk(
  "departments/deleteDesignation",
  async (designationId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_designation_attempt", { 
        userId: userInfo.userId,
        designationId 
      });
      
      await apiClient.departments.deleteDesignation(designationId);
      
      Logger.info("Designation deleted successfully", {
        userId: userInfo.userId,
        designationId,
        timestamp: new Date().toISOString()
      }, "DEPARTMENTS");
      
      logUserAction("designation_deleted", {
        userId: userInfo.userId,
        designationId
      });
      
      return designationId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete designation");
      
      logUserAction("delete_designation_failed", {
        userId: getUserInfoForLogging().userId,
        designationId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.departmentsError = null;
      state.designationsError = null;
    },
    resetDepartmentState: (state) => {
      state.departments = [];
      state.designations = [];
      state.loading = false;
      state.departmentsLoading = false;
      state.designationsLoading = false;
      state.error = null;
      state.departmentsError = null;
      state.designationsError = null;
      state.success = false;
      state.departmentsSuccess = false;
      state.designationsSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Departments
      .addCase(fetchDepartments.pending, (state) => {
        state.departmentsLoading = true;
        state.error = null;
        state.departmentsError = null;
        state.departmentsSuccess = false;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departmentsLoading = false;
        state.departments = action.payload;
        state.departmentsSuccess = true;
        state.departmentsError = null;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.departmentsLoading = false;
        state.departmentsError = action.payload;
      })
      
      // 🔹 Create Department
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.departmentsError = null;
        state.departmentsSuccess = false;
        state.success = false;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        console.log("data seaflkjsd")
        state.loading = false;
        state.departmentsSuccess = true;
        state.success = true;
        state.departments.push(action.payload);
        state.departmentsError = null;
        state.error = null;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.departmentsError = action.payload;
      })
      
      // 🔹 Delete Department
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.departmentsError = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter(
          (department) => department.id !== action.payload
        );
        state.departmentsError = null;
        state.error = null;
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.departmentsError = action.payload;
      })
      
      // 🔹 Fetch Designations
      .addCase(fetchDesignations.pending, (state) => {
        state.designationsLoading = true;
        state.error = null;
        state.designationsError = null;
        state.designationsSuccess = false;
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.designationsLoading = false;
        state.designations = action.payload;
        state.designationsSuccess = true;
        state.designationsError = null;
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.designationsLoading = false;
        state.designationsError = action.payload;
      })
      
      // 🔹 Create Designation
      .addCase(createDesignation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.designationsError = null;
        state.designationsSuccess = false;
        state.success = false;
      })
      .addCase(createDesignation.fulfilled, (state, action) => {
        state.loading = false;
        state.designationsSuccess = true;
        state.success = true;
        state.designations.push(action.payload);
        state.designationsError = null;
        state.error = null;
      })
      .addCase(createDesignation.rejected, (state, action) => {
        state.loading = false;
        state.designationsError = action.payload;
      })
      
      // 🔹 Delete Designation
      .addCase(deleteDesignation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.designationsError = null;
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.loading = false;
        state.designations = state.designations.filter(
          (designation) => designation.id !== action.payload
        );
        state.designationsError = null;
        state.error = null;
      })
      .addCase(deleteDesignation.rejected, (state, action) => {
        state.loading = false;
        state.designationsError = action.payload;
      });
  },
});

export const { clearError, resetDepartmentState } = departmentsSlice.actions;
export default departmentsSlice.reducer;