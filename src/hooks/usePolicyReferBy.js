// hooks/usePolicyReferBy.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchPolicyReferBy,
  registerPolicyReferBy,
  getPolicyReferById,
  updatePolicyReferBy,
  togglePolicyReferByStatus,
  resetPolicyReferById,
  clearError,
  resetPolicyReferBy
} from "../store/NewReducers/PolicyReferBySlice";
import { useLogger } from "./useLogger";

export const usePolicyReferBy = () => {
  const dispatch = useDispatch();
  const policyReferByState = useSelector((state) => state.policyReferBy);
  // console.log("policyReferbystate in hook",policyReferByState)
  const logger = useLogger("usePolicyReferBy");

  const handleFetchPolicyReferBy = () => {
    logger.info("Fetch all policy refer by entries attempt");
    return dispatch(fetchPolicyReferBy());
  };

  const handleRegisterPolicyReferBy = (data) => {
    logger.info("Register new policy refer by attempt", { 
      name: data.name || data.email,
      email: data.email
    });
    return dispatch(registerPolicyReferBy(data));
  };

  const handleGetPolicyReferById = (id) => {
    logger.info("Get policy refer by by ID attempt", { referById: id });
    return dispatch(getPolicyReferById(id));
  };

  const handleUpdatePolicyReferBy = (id, data) => {
    logger.info("Update policy refer by attempt", { referById: id });
    return dispatch(updatePolicyReferBy({ id, data }));
  };

  const handleTogglePolicyReferByStatus = (refById) => {
    logger.info("Toggle policy refer by status attempt", { referById: refById });
    return dispatch(togglePolicyReferByStatus(refById));
  };

  const handleResetPolicyReferById = () => {
    logger.info("Reset policy refer by by ID state");
    dispatch(resetPolicyReferById());
  };

  const handleClearError = () => {
    logger.info("Clear policy refer by errors");
    dispatch(clearError());
  };

  const handleResetPolicyReferBy = () => {
    logger.info("Reset policy refer by state");
    dispatch(resetPolicyReferBy());
  };

  return {
    // State
    policyReferByState,
    
    // Data
    policyRefList: policyReferByState?.policyRefList,
    policyRef: policyReferByState?.policyRef,
    toggledItem: policyReferByState?.toggledItem,
    
    // Loading states
    loading: policyReferByState?.loading,
    toggleLoading: policyReferByState?.toggleLoading,
    fetchLoading: policyReferByState?.fetchLoading,
    createLoading: policyReferByState?.createLoading,
    updateLoading: policyReferByState?.updateLoading,
    getByIdLoading: policyReferByState?.getByIdLoading,
    
    // Error states
    error: policyReferByState?.error,
    createError: policyReferByState?.createError,
    editError: policyReferByState?.editError,
    fetchError: policyReferByState?.fetchError,
    updateError: policyReferByState?.updateError,
    toggleError: policyReferByState?.toggleError,
    
    // Success states
    createSuccess: policyReferByState?.createSuccess,
    editSuccess: policyReferByState?.editSuccess,
    fetchSuccess: policyReferByState?.fetchSuccess,
    updateSuccess: policyReferByState?.updateSuccess,
    toggleSuccess: policyReferByState?.toggleSuccess,
    
    // Actions
    fetchPolicyReferBy: handleFetchPolicyReferBy,
    registerPolicyReferBy: handleRegisterPolicyReferBy,
    getPolicyReferById: handleGetPolicyReferById,
    updatePolicyReferBy: handleUpdatePolicyReferBy,
    togglePolicyReferByStatus: handleTogglePolicyReferByStatus,
    
    // Utility Actions
    resetPolicyReferById: handleResetPolicyReferById,
    clearError: handleClearError,
    resetPolicyReferBy: handleResetPolicyReferBy,
  };
};