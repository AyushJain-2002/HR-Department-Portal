// hooks/useSalesPerson.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchSalesPersonSummary,
  fetchDefaultSalesPersonSummary,
  fetchSalesEmployees,
  clearError,
  resetSalesPerson
} from "../store/NewReducers/SalesPersonSlice";
import { useLogger } from "./useLogger";

export const useSalesPerson = () => {
  const dispatch = useDispatch();
  const salesPersonState = useSelector((state) => state.salesPerson);
  const logger = useLogger("useSalesPerson");

  const handleFetchSalesPersonSummary = (filters) => {
    const { datetype, from, to, branch, sales } = filters || {};
    logger.info("Fetch sales person summary with filters attempt", { 
      datetype, 
      from, 
      to, 
      branch: branch || 'all',
      sales: sales || 'all'
    });
    return dispatch(fetchSalesPersonSummary(filters));
  };

  const handleFetchDefaultSalesPersonSummary = () => {
    logger.info("Fetch default sales person summary attempt");
    return dispatch(fetchDefaultSalesPersonSummary());
  };

  const handleFetchSalesEmployees = () => {
    logger.info("Fetch sales employees list attempt");
    return dispatch(fetchSalesEmployees());
  };

  const handleClearError = () => {
    logger.info("Clear sales person errors");
    dispatch(clearError());
  };

  const handleResetSalesPerson = () => {
    logger.info("Reset sales person state");
    dispatch(resetSalesPerson());
  };

  return {
    // State
    salesPersonState,
    
    // Data
    salesPerson: salesPersonState.salesPerson,
    salesPersonList: salesPersonState.salesPersonList,
    
    // Loading states
    loading: salesPersonState.loading,
    fetchSummaryLoading: salesPersonState.fetchSummaryLoading,
    defaultFetchLoading: salesPersonState.defaultFetchLoading,
    fetchEmployeesLoading: salesPersonState.fetchEmployeesLoading,
    
    // Error states
    error: salesPersonState.error,
    fetchError: salesPersonState.fetchError,
    defaultFetchError: salesPersonState.defaultFetchError,
    employeesError: salesPersonState.employeesError,
    
    // Success states
    success: salesPersonState.success,
    fetchSuccess: salesPersonState.fetchSuccess,
    defaultFetchSuccess: salesPersonState.defaultFetchSuccess,
    employeesSuccess: salesPersonState.employeesSuccess,
    
    // Actions
    fetchSalesPersonSummary: handleFetchSalesPersonSummary,
    fetchDefaultSalesPersonSummary: handleFetchDefaultSalesPersonSummary,
    fetchSalesEmployees: handleFetchSalesEmployees,
    
    // Utility Actions
    clearError: handleClearError,
    resetSalesPerson: handleResetSalesPerson,
  };
};