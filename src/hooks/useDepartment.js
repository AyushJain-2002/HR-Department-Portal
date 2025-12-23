// hooks/useDepartment.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchDepartments,
  createDepartment,
  deleteDepartment,
  fetchDesignations,
  createDesignation,
  deleteDesignation,
  clearError,
  resetDepartmentState
} from "../store/NewReducers/DepartmentSlice";
import { useLogger } from "./useLogger";

export const useDepartment = () => {
  const dispatch = useDispatch();
  const departmentState = useSelector((state) => state.departments);
  const logger = useLogger("useDepartment");

  const handleFetchDepartments = () => {
    logger.info("Fetch departments attempt");
    return dispatch(fetchDepartments());
  };

  const handleCreateDepartment = (departmentName) => {
    logger.info("Create department attempt", { departmentName });
    return dispatch(createDepartment(departmentName));
  };

  const handleDeleteDepartment = (departmentId) => {
    logger.info("Delete department attempt", { departmentId });
    return dispatch(deleteDepartment(departmentId));
  };

  const handleFetchDesignations = () => {
    logger.info("Fetch designations attempt");
    return dispatch(fetchDesignations());
  };

  const handleCreateDesignation = (designationName) => {
    logger.info("Create designation attempt", { designationName });
    return dispatch(createDesignation(designationName));
  };

  const handleDeleteDesignation = (designationId) => {
    logger.info("Delete designation attempt", { designationId });
    return dispatch(deleteDesignation(designationId));
  };

  const handleClearError = () => {
    logger.info("Clear department errors");
    dispatch(clearError());
  };

  const handleResetDepartmentState = () => {
    logger.info("Reset department state");
    dispatch(resetDepartmentState());
  };

  return {
    // State
    departmentState,
    
    // Department Data
    departments: departmentState.departments,
    departmentsLoading: departmentState.departmentsLoading,
    departmentsError: departmentState.departmentsError,
    departmentsSuccess: departmentState.departmentsSuccess,
    
    // Designation Data
    designations: departmentState.designations,
    designationsLoading: departmentState.designationsLoading,
    designationsError: departmentState.designationsError,
    designationsSuccess: departmentState.designationsSuccess,
    
    // Common Loading States
    loading: departmentState.loading,
    
    // Common States
    error: departmentState.error,
    success: departmentState.success,
    
    // Department Actions
    fetchDepartments: handleFetchDepartments,
    createDepartment: handleCreateDepartment,
    deleteDepartment: handleDeleteDepartment,
    
    // Designation Actions
    fetchDesignation: handleFetchDesignations,
    createDesignation: handleCreateDesignation,
    deleteDesignation: handleDeleteDesignation,
    
    // Utility Actions
    clearError: handleClearError,
    resetDepartmentState: handleResetDepartmentState,
  };
};