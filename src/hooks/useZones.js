// hooks/useZones.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchZones,
  addZone,
  deleteZone,
  fetchRegions,
  addRegion,
  deleteRegion,
  clearError,
  resetZones
} from "../store/NewReducers/ZonesSlice";
import { useLogger } from "./useLogger";

export const useZones = () => {
  const dispatch = useDispatch();
  const zonesState = useSelector((state) => state.zones);
  const logger = useLogger("useZones");

  const handleFetchZones = () => {
    logger.info("Fetch zones attempt");
    return dispatch(fetchZones());
  };

  const handleAddZone = (zoneName) => {
    logger.info("Add zone attempt", { zoneName });
    return dispatch(addZone(zoneName));
  };

  const handleDeleteZone = (zoneId) => {
    logger.info("Delete zone attempt", { zoneId });
    return dispatch(deleteZone(zoneId));
  };

  const handleFetchRegions = () => {
    logger.info("Fetch regions attempt");
    return dispatch(fetchRegions());
  };

  const handleAddRegion = (regionName) => {
    logger.info("Add region attempt", { regionName });
    return dispatch(addRegion(regionName));
  };

  const handleDeleteRegion = (regionId) => {
    logger.info("Delete region attempt", { regionId });
    return dispatch(deleteRegion(regionId));
  };

  const handleClearError = () => {
    logger.info("Clear zones and regions errors");
    dispatch(clearError());
  };

  const handleResetZones = () => {
    logger.info("Reset zones and regions state");
    dispatch(resetZones());
  };

  return {
    // State
    zonesState,
    
    // Data
    zones: zonesState.zones,
    region: zonesState.regions,
    
    // Loading states
    loading: zonesState.loading,
    fetchZonesLoading: zonesState.fetchZonesLoading,
    fetchRegionsLoading: zonesState.fetchRegionsLoading,
    addZoneLoading: zonesState.addZoneLoading,
    addRegionLoading: zonesState.addRegionLoading,
    deleteZoneLoading: zonesState.deleteZoneLoading,
    deleteRegionLoading: zonesState.deleteRegionLoading,
    
    // Error states
    error: zonesState.error,
    fetchError: zonesState.fetchError,
    addZoneError: zonesState.addZoneError,
    addRegionError: zonesState.addRegionError,
    deleteZoneError: zonesState.deleteZoneError,
    deleteRegionError: zonesState.deleteRegionError,
    
    // Success states
    success: zonesState.success,
    fetchSuccess: zonesState.fetchSuccess,
    addZoneSuccess: zonesState.addZoneSuccess,
    addRegionSuccess: zonesState.addRegionSuccess,
    deleteZoneSuccess: zonesState.deleteZoneSuccess,
    deleteRegionSuccess: zonesState.deleteRegionSuccess,
    
    // Actions
    fetchZones: handleFetchZones,
    addZone: handleAddZone,
    deleteZone: handleDeleteZone,
    fetchRegions: handleFetchRegions,
    addRegion: handleAddRegion,
    deleteRegion: handleDeleteRegion,
    
    // Utility Actions
    clearError: handleClearError,
    resetZones: handleResetZones,
  };
};