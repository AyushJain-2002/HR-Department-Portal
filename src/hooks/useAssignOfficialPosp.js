// hooks/useAssignOfficialPosp.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchBranches,
  fetchBqpByBranch,
  fetchRelationshipManagerByBqp,
  submitHrVerification,
  resetAssignOfficialPosp,
  resetHrVerification,
  clearError
} from "../store/NewReducers/AssignOfficialPospSlice";
import { useLogger } from "./useLogger";

export const useAssignOfficialPosp = () => {
  const dispatch = useDispatch();
  const assignOfficialPospState = useSelector((state) => state.assignOfficialPosp);
  const logger = useLogger("useAssignOfficialPosp");

  const handleFetchBranches = () => {
    logger.info("Fetch branches attempt");
    return dispatch(fetchBranches());
  };

  const handleFetchBqpByBranch = (branchId) => {
    logger.info("Fetch BQP by branch attempt", { branchId });
    return dispatch(fetchBqpByBranch(branchId));
  };

  const handleFetchRelationshipManagerByBqp = (bqpId) => {
    logger.info("Fetch relationship manager by BQP attempt", { bqpId });
    return dispatch(fetchRelationshipManagerByBqp(bqpId));
  };

  const handleSubmitHrVerification = (id, formData) => {
    logger.info("Submit HR verification attempt", { pospId: id });
    return dispatch(submitHrVerification({ id, formData }));
  };

  const handleResetHrVerification = () => {
    logger.info("Reset HR verification state");
    dispatch(resetHrVerification());
  };

  const handleClearError = () => {
    logger.info("Clear assign official POSP errors");
    dispatch(clearError());
  };

  const handleResetAssignOfficialPosp = () => {
    logger.info("Reset assign official POSP state");
    dispatch(resetAssignOfficialPosp());
  };

  return {
    // State
    assignOfficialPospState,
    
    // Data
    branches: assignOfficialPospState.branches,
    bqp: assignOfficialPospState.bqp,
    relationshipManagers: assignOfficialPospState.relationshipManagers,
    message: assignOfficialPospState.message,
    
    // Loading states
    loading: assignOfficialPospState.loading,
    fetchBranchesLoading: assignOfficialPospState.fetchBranchesLoading,
    fetchBqpLoading: assignOfficialPospState.fetchBqpLoading,
    fetchRelationshipManagerLoading: assignOfficialPospState.fetchRelationshipManagerLoading,
    hrVerificationLoading: assignOfficialPospState.hrVerificationLoading,
    
    // Error states
    error: assignOfficialPospState.error,
    fetchError: assignOfficialPospState.fetchError,
    bqpError: assignOfficialPospState.bqpError,
    relationshipManagerError: assignOfficialPospState.relationshipManagerError,
    hrVerificationError: assignOfficialPospState.hrVerificationError,
    
    // Success states
    fetchSuccess: assignOfficialPospState.fetchSuccess,
    bqpSuccess: assignOfficialPospState.bqpSuccess,
    relationshipManagerSuccess: assignOfficialPospState.relationshipManagerSuccess,
    hrVerificationSuccess: assignOfficialPospState.hrVerificationSuccess,
    
    // Actions
    fetchBranches: handleFetchBranches,
    fetchBqpByBranch: handleFetchBqpByBranch,
    fetchRelationshipManagerByBqp: handleFetchRelationshipManagerByBqp,
    submitHrVerification: handleSubmitHrVerification,
    
    // Utility Actions
    resetHrVerification: handleResetHrVerification,
    clearError: handleClearError,
    resetAssignOfficialPosp: handleResetAssignOfficialPosp,
  };
};