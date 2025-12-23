// hooks/useGrowthReport.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchGrowthReports,
  fetchDefaultGrowthReports,
  clearError,
  resetGrowthReportState
} from "../store/NewReducers/GrowthReportSlice";
import { useLogger } from "./useLogger";

export const useGrowthReport = () => {
  const dispatch = useDispatch();
  const growthReportState = useSelector((state) => state.growthreports);
  const logger = useLogger("useGrowthReport");

  const handleFetchGrowthReports = (filters) => {
    logger.info("Fetch growth reports attempt", { filters });
    return dispatch(fetchGrowthReports(filters));
  };

  const handleFetchDefaultGrowthReports = () => {
    logger.info("Fetch default growth reports attempt");
    return dispatch(fetchDefaultGrowthReports());
  };

  const handleClearError = () => {
    logger.info("Clear growth report errors");
    dispatch(clearError());
  };

  const handleResetGrowthReportState = () => {
    logger.info("Reset growth report state");
    dispatch(resetGrowthReportState());
  };

  return {
    // State
    growthReportState,
    
    // Data
    growthreports: growthReportState.growthreports,
    loading: growthReportState.loading,
    error: growthReportState.error,
    success: growthReportState.success,
    
    // Actions
    fetchGrowthReports: handleFetchGrowthReports,
    fetchDefaultGrowthReports: handleFetchDefaultGrowthReports,
    
    // Utility Actions
    clearError: handleClearError,
    resetGrowthReportState: handleResetGrowthReportState,
  };
};