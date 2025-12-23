// hooks/useOperationEntryReports.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchOperationEntryReports,
  fetchDefaultOperationEntryReports,
  clearError,
  resetOperationEntryReports
} from "../store/NewReducers/OperationEntryReportsSlice";
import { useLogger } from "./useLogger";

export const useOperationEntryReports = () => {
  const dispatch = useDispatch();
  const operationEntryReportsState = useSelector((state) => state.operationEntryReports);
  const logger = useLogger("useOperationEntryReports");

  const handleFetchOperationEntryReports = (filters) => {
    const { type, from, to, branch } = filters || {};
    logger.info("Fetch operation entry reports with filters attempt", { 
      type, 
      from, 
      to, 
      branch 
    });
    return dispatch(fetchOperationEntryReports(filters));
  };

  const handleFetchDefaultOperationEntryReports = () => {
    logger.info("Fetch default operation entry reports attempt");
    return dispatch(fetchDefaultOperationEntryReports());
  };

  const handleClearError = () => {
    logger.info("Clear operation entry reports errors");
    dispatch(clearError());
  };

  const handleResetOperationEntryReports = () => {
    logger.info("Reset operation entry reports state");
    dispatch(resetOperationEntryReports());
  };

  return {
    // State
    operationEntryReportsState,
    
    // Data
    operationEntryReports: operationEntryReportsState.operationEntryReports,
    
    // Loading states
    loading: operationEntryReportsState.loading,
    fetchLoading: operationEntryReportsState.fetchLoading,
    defaultFetchLoading: operationEntryReportsState.defaultFetchLoading,
    
    // Error states
    error: operationEntryReportsState.error,
    fetchError: operationEntryReportsState.fetchError,
    defaultFetchError: operationEntryReportsState.defaultFetchError,
    
    // Success states
    success: operationEntryReportsState.success,
    fetchSuccess: operationEntryReportsState.fetchSuccess,
    defaultFetchSuccess: operationEntryReportsState.defaultFetchSuccess,
    
    // Actions
    fetchOperationEntryReports: handleFetchOperationEntryReports,
    fetchDefaultOperationEntryReports: handleFetchDefaultOperationEntryReports,
    
    // Utility Actions
    clearError: handleClearError,
    resetOperationEntryReports: handleResetOperationEntryReports,
  };
};