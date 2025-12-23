// hooks/useAddon.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAddons,
  createAddon,
  deleteAddon,
  clearError,
  resetAddonState
} from "../store/NewReducers/AddonSlice";
import { useLogger } from "./useLogger";

export const useAddon = () => {
  const dispatch = useDispatch();
  const addonState = useSelector((state) => state.addons);
  const logger = useLogger("useAddon");

  const handleFetchAddons = () => {
    logger.info("Fetch addons attempt");
    return dispatch(fetchAddons());
  };

  const handleCreateAddon = (addonData) => {
    logger.info("Create addon attempt", { 
      addonName: addonData.addon_name,
      addonData 
    });
    return dispatch(createAddon(addonData));
  };

  const handleDeleteAddon = (addonId) => {
    logger.info("Delete addon attempt", { addonId });
    return dispatch(deleteAddon(addonId));
  };

  const handleClearError = () => {
    logger.info("Clear addon errors");
    dispatch(clearError());
  };

  const handleResetAddonState = () => {
    logger.info("Reset addon state");
    dispatch(resetAddonState());
  };

  return {
    // State
    addonState,
    
    // Data
    addons: addonState.addons,
    loading: addonState.loading,
    error: addonState.error,
    success: addonState.success,
    fetchError: addonState.fetchError,
    createError: addonState.createError,
    deleteError: addonState.deleteError,
    
    // Actions
    fetchAddons: handleFetchAddons,
    createAddon: handleCreateAddon,
    deleteAddon: handleDeleteAddon,
    
    // Utility Actions
    clearError: handleClearError,
    resetAddonState: handleResetAddonState,
  };
};