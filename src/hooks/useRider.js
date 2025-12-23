// hooks/useRiders.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchRiders,
  fetchRiderById,
  createRider,
  updateRider,
  deleteRider,
  clearError,
  resetRiders
} from "../store/NewReducers/RidersSlice";
import { useLogger } from "./useLogger";

export const useRider = () => {
  const dispatch = useDispatch();
  const ridersState = useSelector((state) => state.riders);
  const logger = useLogger("useRiders");

  const handleFetchRiders = () => {
    logger.info("Fetch all riders attempt");
    return dispatch(fetchRiders());
  };

  const handleFetchRiderById = (id) => {
    logger.info("Fetch rider by ID attempt", { riderId: id });
    return dispatch(fetchRiderById(id));
  };

  const handleCreateRider = (riderData) => {
    logger.info("Create new rider attempt", { 
      riderName: riderData.name || riderData.code,
      type: riderData.type
    });
    return dispatch(createRider(riderData));
  };

  const handleUpdateRider = (id, riderData) => {
    logger.info("Update rider attempt", { riderId: id });
    return dispatch(updateRider({ id, riderData }));
  };

  const handleDeleteRider = (id) => {
    logger.info("Delete rider attempt", { riderId: id });
    return dispatch(deleteRider(id));
  };

  const handleClearError = () => {
    logger.info("Clear riders errors");
    dispatch(clearError());
  };

  const handleResetRiders = () => {
    logger.info("Reset riders state");
    dispatch(resetRiders());
  };

  return {
    // State
    ridersState,
    
    // Data
    riders: ridersState.riders,
    rider: ridersState.rider,
    
    // Loading states
    loading: ridersState.loading,
    fetchLoading: ridersState.fetchLoading,
    createLoading: ridersState.createLoading,
    updateLoading: ridersState.updateLoading,
    deleteLoading: ridersState.deleteLoading,
    getByIdLoading: ridersState.getByIdLoading,
    
    // Error states
    error: ridersState.error,
    createError: ridersState.createError,
    editError: ridersState.editError,
    fetchError: ridersState.fetchError,
    updateError: ridersState.updateError,
    deleteError: ridersState.deleteError,
    
    // Success states
    success: ridersState.success,
    createSuccess: ridersState.createSuccess,
    editSuccess: ridersState.editSuccess,
    fetchSuccess: ridersState.fetchSuccess,
    updateSuccess: ridersState.updateSuccess,
    deleteSuccess: ridersState.deleteSuccess,
    
    // Actions
    fetchRiders: handleFetchRiders,
    fetchRiderById: handleFetchRiderById,
    createRider: handleCreateRider,
    updateRider: handleUpdateRider,
    deleteRider: handleDeleteRider,
    
    // Utility Actions
    clearError: handleClearError,
    resetRiders: handleResetRiders,
  };
};