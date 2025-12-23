// hooks/useOpsBusinessReports.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchOpsBusinessReports,
  clearError,
  resetOpsBusinessReports
} from "../store/NewReducers/OpsBuisnessReportsSlice";
import { useLogger } from "./useLogger";

export const useOpsBuisnessReports = () => {
  const dispatch = useDispatch();
  const opsBusinessReportsState = useSelector((state) => state.opsBusinessReports);
  const logger = useLogger("useOpsBusinessReports");

  const handleFetchOpsBusinessReports = (datetype, date) => {
    logger.info("Fetch OPS business reports attempt", { 
      datetype, 
      date 
    });
    return dispatch(fetchOpsBusinessReports({ datetype, date }));
  };

  const handleClearError = () => {
    logger.info("Clear OPS business reports errors");
    dispatch(clearError());
  };

  const handleResetOpsBusinessReports = () => {
    logger.info("Reset OPS business reports state");
    dispatch(resetOpsBusinessReports());
  };

  return {
    // State
    opsBusinessReportsState,
    
    // Data
    opsReports: opsBusinessReportsState.opsReports,
    
    // Loading states
    loading: opsBusinessReportsState.loading,
    fetchLoading: opsBusinessReportsState.fetchLoading,
    
    // Error states
    error: opsBusinessReportsState.error,
    fetchError: opsBusinessReportsState.fetchError,
    
    // Success states
    success: opsBusinessReportsState.success,
    fetchSuccess: opsBusinessReportsState.fetchSuccess,
    
    // Actions
    fetchOpsBusinessReports: handleFetchOpsBusinessReports,
    
    // Utility Actions
    clearError: handleClearError,
    resetOpsBusinessReports: handleResetOpsBusinessReports,
  };
};