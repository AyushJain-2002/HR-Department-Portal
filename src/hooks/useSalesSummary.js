// hooks/useSalesSummary.js
import { useDispatch, useSelector } from "react-redux";
// import { 
//   fetchSalesSummary,
//   fetchDefaultSalesSummary,
//   clearError,
//   resetSalesSummary
// } from "../store/NewReducers/SalesSummarySlice";
import { useLogger } from "./useLogger";

export const useSalesSummary = () => {
  const dispatch = useDispatch();
  // const salesSummaryState = useSelector((state) => state.salesSummary);
  const logger = useLogger("useSalesSummary");

  const handleFetchSalesSummary = (filters) => {
    const { datetype, from, to, branch, bqp, relationship_manager, posp } = filters || {};
    logger.info("Fetch sales summary with filters attempt", { 
      datetype, 
      from, 
      to, 
      branch: branch || 'all',
      bqp: bqp || 'all',
      relationship_manager: relationship_manager || 'all',
      posp: posp || 'all'
    });
    return dispatch(fetchSalesSummary(filters));
  };

  const handleFetchDefaultSalesSummary = () => {
    logger.info("Fetch default sales summary attempt");
    return dispatch(fetchDefaultSalesSummary());
  };

  const handleClearError = () => {
    logger.info("Clear sales summary errors");
    dispatch(clearError());
  };

  const handleResetSalesSummary = () => {
    logger.info("Reset sales summary state");
    dispatch(resetSalesSummary());
  };

  return {
    // State
    salesSummaryState,
    
    // Data
    salesSummary: salesSummaryState.salesSummary,
    
    // Loading states
    loading: salesSummaryState.loading,
    fetchLoading: salesSummaryState.fetchLoading,
    defaultFetchLoading: salesSummaryState.defaultFetchLoading,
    
    // Error states
    error: salesSummaryState.error,
    fetchError: salesSummaryState.fetchError,
    defaultFetchError: salesSummaryState.defaultFetchError,
    
    // Success states
    success: salesSummaryState.success,
    fetchSuccess: salesSummaryState.fetchSuccess,
    defaultFetchSuccess: salesSummaryState.defaultFetchSuccess,
    
    // Actions
    fetchSalesSummary: handleFetchSalesSummary,
    fetchDefaultSalesSummary: handleFetchDefaultSalesSummary,
    
    // Utility Actions
    clearError: handleClearError,
    resetSalesSummary: handleResetSalesSummary,
  };
};