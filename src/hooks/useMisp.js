// hooks/useMisp.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchMisps,
  fetchMispById,
  createMisp,
  updateMisp,
  deleteMisp,
  fetchMispByBranch,
  changeMispPassword,
  toggleMispActiveStatus,
  clearError,
  resetMisp
} from "../store/NewReducers/MispSlice";
import { useLogger } from "./useLogger";

export const useMisp = () => {
  const dispatch = useDispatch();
  const mispState = useSelector((state) => state.misp);
  const logger = useLogger("useMisp");

  const handleFetchMisps = () => {
    logger.info("Fetch MISPs attempt");
    return dispatch(fetchMisps());
  };

  const handleFetchMispById = (id) => {
    logger.info("Fetch MISP by ID attempt", { mispId: id });
    return dispatch(fetchMispById(id));
  };

  const handleCreateMisp = (mispData) => {
    logger.info("Create MISP attempt", { 
      mispName: mispData.name || mispData.email,
      mispEmail: mispData.email
    });
    return dispatch(createMisp(mispData));
  };

  const handleUpdateMisp = (id, mispData) => {
    logger.info("Update MISP attempt", { mispId: id });
    return dispatch(updateMisp({ id, mispData }));
  };

  const handleDeleteMisp = (id) => {
    logger.info("Delete MISP attempt", { mispId: id });
    return dispatch(deleteMisp(id));
  };

  const handleFetchMispByBranch = (branchId) => {
    logger.info("Fetch MISP by branch attempt", { branchId });
    return dispatch(fetchMispByBranch(branchId));
  };

  const handleChangeMispPassword = (id, passwordData) => {
    logger.info("Change MISP password attempt", { mispId: id });
    return dispatch(changeMispPassword({ id, passwordData }));
  };

  const handleToggleMispActiveStatus = (id) => {
    logger.info("Toggle MISP active status attempt", { mispId: id });
    return dispatch(toggleMispActiveStatus(id));
  };

  const handleClearError = () => {
    logger.info("Clear MISP errors");
    dispatch(clearError());
  };

  const handleResetMisp = () => {
    logger.info("Reset MISP state");
    dispatch(resetMisp());
  };

  return {
    // State
    mispState,
    
    // Data
    misps: mispState.misps,
    currentMisp: mispState.misp,
    loading: mispState.loading,
    toggleLoading: mispState.toggleLoading,
    error: mispState.error,
    createError: mispState.createError,
    success: mispState.success,
    createSuccess: mispState.createSuccess,
    
    // Actions
    fetchMisps: handleFetchMisps,
    fetchMispById: handleFetchMispById,
    createMisp: handleCreateMisp,
    updateMisp: handleUpdateMisp,
    deleteMisp: handleDeleteMisp,
    fetchMispByBranch: handleFetchMispByBranch,
    changeMispPassword: handleChangeMispPassword,
    toggleMispActiveStatus: handleToggleMispActiveStatus,
    
    // Utility Actions
    clearError: handleClearError,
    resetMisp: handleResetMisp,
  };
};