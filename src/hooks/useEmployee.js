import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAllEmployees, 
  fetchEmployeeById, 
  createEmployee, 
  updateEmployee, 
  toggleEmployeeStatus,
  clearError,
  resetEmployee,
  resetCreateSuccess,
  resetUpdateSuccess
} from "../store/NewReducers/EmployeeSlice";
import { useLogger } from "./useLogger";

export const useEmployee = () => {
  const dispatch = useDispatch();
  const employeeState = useSelector((state) => state.employee);
  const logger = useLogger("useEmployee");
  // console.log(employeeState)
  const handleFetchAllEmployees = () => {
    logger.info("Fetch all employees attempt");
    return dispatch(fetchAllEmployees());
  };

  const handleFetchEmployeeById = (id) => {
    logger.info("Fetch employee by ID attempt", { employeeId: id });
    return dispatch(fetchEmployeeById(id));
  };

  const handleCreateEmployee = (employeeData) => {
    logger.info("Create employee attempt", { 
      email: employeeData.email,
      name: employeeData.name 
    });
    return dispatch(createEmployee(employeeData));
  };

  const handleUpdateEmployee = (id, employeeData) => {
    logger.info("Update employee attempt", { employeeId: id });
    return dispatch(updateEmployee({ id, employeeData }));
  };

  const handleToggleEmployeeStatus = (employeeId) => {
    logger.info("Toggle employee status attempt", { employeeId });
    return dispatch(toggleEmployeeStatus(employeeId));
  };

  const handleClearError = () => {
    logger.info("Clear employee errors");
    dispatch(clearError());
  };

  const handleResetEmployee = () => {
    logger.info("Reset employee state");
    dispatch(resetEmployee());
  };

  const handleResetCreateSuccess = () => {
    logger.info("Reset create success state");
    dispatch(resetCreateSuccess());
  };

  const handleResetUpdateSuccess = () => {
    logger.info("Reset update success state");
    dispatch(resetUpdateSuccess());
  };

  return {
    // State
    employeeState,
    
    // Data
    allEmployees: employeeState.allEmployee,
    currentEmployee: employeeState.employee,
    loading: employeeState.loading,
    toggleLoading: employeeState.toggleLoading,
    error: employeeState.error,
    createError: employeeState.createError,
    updateError: employeeState.updateError,
    success: employeeState.success,
    createSuccess: employeeState.createSuccess,
    updateSuccess: employeeState.updateSuccess,
    message: employeeState.message,
    
    // Actions
    fetchAllEmployees: handleFetchAllEmployees,
    fetchEmployeeById: handleFetchEmployeeById,
    createEmployee: handleCreateEmployee,
    updateEmployee: handleUpdateEmployee,
    toggleEmployeeStatus: handleToggleEmployeeStatus,
    
    // Utility Actions
    clearError: handleClearError,
    resetEmployee: handleResetEmployee,
    resetCreateSuccess: handleResetCreateSuccess,
    resetUpdateSuccess: handleResetUpdateSuccess,
  };
};