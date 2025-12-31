// slices/EmployeeSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../api/apiClient';
import Logger from '../../api/Logger';
import { getDecryptedCookie } from "../../Utils/secureCookie";

const initialState = {
  loading: false,
  toggleLoading: false,
  error: null,
  success: false,
  createSuccess: false,
  employee: null,
  allEmployee: [],
  createError: null,
  message: null,
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
  errorMessage=error
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
  Logger.info(`Employee Action: ${action}`, logDetails, "EMPLOYEE_ACTION");
};

// 🔹 Fetch All Employees
export const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAllEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_all_employees", { userId: userInfo.userId });
      
      const response = await apiClient.employee.fetchAllEmployees();
      
      // Merge employee data with images
      const mergedData = response.data.employees.map((item) => ({
        ...item.id, // Spread all user properties
        ...item.images, // Spread all image properties
      }));
      
      Logger.info("Employees fetched successfully", {
        userId: userInfo.userId,
        employeeCount: mergedData.length,
        timestamp: new Date().toISOString()
      }, "EMPLOYEE");
      
      logUserAction("all_employees_fetched", { 
        userId: userInfo.userId,
        count: mergedData.length 
      });
      
      return mergedData;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch all employees");
      
      logUserAction("fetch_all_employees_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Employee By ID
export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_employee_by_id", { 
        userId: userInfo.userId,
        employeeId: id 
      });
      
      const response = await apiClient.employee.fetchEmployee(id);
      console.log("Response fetchempbyid",response);
      const employeeData = response.data.employee;

      // Merge the images into the employee object
      const updatedEmployee = {
        ...employeeData,
        ...employeeData.images,
      };
      delete updatedEmployee.images;
      
      Logger.info("Employee data fetched successfully", {
        userId: userInfo.userId,
        employeeId: id,
        employeeEmail: updatedEmployee.email,
        timestamp: new Date().toISOString()
      }, "EMPLOYEE");
      
      logUserAction("employee_fetched_by_id", { 
        userId: userInfo.userId,
        employeeId: id 
      });
      
      return updatedEmployee;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch employee by ID");
      
      logUserAction("fetch_employee_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        employeeId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Employee
export const createEmployee = createAsyncThunk(
  "employees/CreateEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const formData = Object.entries(employeeData).reduce((acc, [key, value]) => {
        if(value instanceof File)
          acc[key]=value;
        else
          acc[key] = String(value);
      
      return acc;
    }, {});
    delete formData.same_as_permanent
      const response = await apiClient.employee.createEmployee(formData);
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error.data, "Create employee");
      console.log(errorMessage)
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_employee_attempt", { 
        userId: userInfo.userId,
        employeeId: id 
      });
      
      const formData = new FormData();
      
      // Append all employee data to formData
      Object.keys(employeeData).forEach(key => {
        if (employeeData[key] !== null && employeeData[key] !== undefined) {
          formData.append(key, employeeData[key]);
        }
      });
      
      formData.append("_method", "PUT");
      
      const response = await apiClient.employee.updateEmployee(id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      Logger.info("Employee updated successfully", {
        userId: userInfo.userId,
        employeeId: id,
        timestamp: new Date().toISOString(),
        responseStatus: response.status
      }, "EMPLOYEE");
      
      logUserAction("employee_updated", {
        userId: userInfo.userId,
        employeeId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update employee");
      
      logUserAction("update_employee_failed", {
        userId: getUserInfoForLogging().userId,
        employeeId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Toggle Employee Status
export const toggleEmployeeStatus = createAsyncThunk(
  "employees/toggleEmployeeStatus",
  async (employeeId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("toggle_employee_status_attempt", { 
        userId: userInfo.userId,
        employeeId 
      });
      
      const response = await apiClient.employee.toggleEmployeeStatus(employeeId);
      
      Logger.info("Employee status toggled successfully", {
        userId: userInfo.userId,
        employeeId,
        newStatus: response.data.active,
        timestamp: new Date().toISOString()
      }, "EMPLOYEE");
      
      logUserAction("employee_status_toggled", {
        userId: userInfo.userId,
        employeeId,
        status: response.data.active
      });
      
      return {
        employeeId,
        active: response.data.active,
        message: response.data.message
      };
    } catch (error) {
      const errorMessage = handleApiError(error, "Toggle employee status");
      
      logUserAction("toggle_employee_status_failed", {
        userId: getUserInfoForLogging().userId,
        employeeId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createError = null;
      // state.updateError = null;
    },
    resetEmployee: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.employee = null;
      state.createSuccess = false;
      state.createError = null;
      // state.updateSuccess = false;
      // state.updateError = null;
      state.message = null;
    },
    resetCreateSuccess: (state) => {
      state.createSuccess = false;
      state.message = null;
    },
    resetUpdateSuccess: (state) => {
      // state.updateSuccess = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch All Employees
      .addCase(fetchAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.createError = null;
        state.createSuccess = false;
        state.allEmployee = [];
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.allEmployee = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.allEmployee = [];
      })
      
      // 🔹 Fetch Employee By ID
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.employee = null;
        state.createSuccess = false;
        state.success = false;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.employee = null;
      })
      
      // 🔹 Create Employee
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.createError = null;
        state.error = null;
        state.createSuccess = false;
        state.message = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.message = action.payload.message;
        state.allEmployee.push(action.payload.employee || action.payload);
        state.createError = null;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload;
        state.createSuccess = false;
      })
      
      // 🔹 Update Employee
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        // state.updateError = null;
        // state.updateSuccess = false;
        state.message = null;
        state.error = null;
        state.createError = null;
        state.success = false;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        // state.updateSuccess = true;
        state.success = true;
        state.message = action.payload.message;
        state.allEmployee = state.allEmployee.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        );
        // state.updateError = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        // state.updateError = action.payload;
        state.error = action.payload;
        state.updateSuccess = false;
      })
      
      // 🔹 Toggle Employee Status
      .addCase(toggleEmployeeStatus.pending, (state) => {
        state.toggleLoading = true;
        state.error = null;
      })
      .addCase(toggleEmployeeStatus.fulfilled, (state, action) => {
        // const { employeeId, active } = action.payload;
        // state.toggleLoading = false;
        
        // // Update in allEmployee array
        // state.allEmployee = state.allEmployee.map((employee) =>
        //   employee.id === employeeId
        //     ? { ...employee, active }
        //     : employee
        // );
        // // Update single employee if it's the current one
        // if (state.employee && state.employee.id === employeeId) {
          //   state.employee.active = active;
          // }
        const toggledEmployeeId = action.payload.employeeId; // ✅ Extract employee ID from payload
        state.toggleLoading = false;
        if (toggledEmployeeId) {
          state.allEmployee = state.allEmployee.map((employee) =>
            employee.id === toggledEmployeeId
              ? { ...employee, active: !employee.active } // Toggle active status manually
              : employee
            );
          }
          
        
        state.error = null;
      })
      .addCase(toggleEmployeeStatus.rejected, (state, action) => {
        state.toggleLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  resetEmployee, 
  resetCreateSuccess, 
  resetUpdateSuccess 
} = employeeSlice.actions;

export default employeeSlice.reducer;