// hooks/useFuel.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchFuels,
  createFuel,
  deleteFuel,
  fetchAddons,
  createAddon,
  deleteAddon,
  fetchTypeAddons,
  fetchBanks,
  createBank,
  deleteBank,
  clearError,
  resetFuelState
} from "../store/NewReducers/FuelSlice.jsx";
import { useLogger } from "./useLogger";

export const useFuel = () => {
  const dispatch = useDispatch();
  const fuelState = useSelector((state) => state.fuels);
  const logger = useLogger("useFuel");

  const handleFetchFuels = () => {
    logger.info("Fetch fuels attempt");
    return dispatch(fetchFuels());
  };

  const handleCreateFuel = (fuelName) => {
    logger.info("Create fuel attempt", { fuelName });
    return dispatch(createFuel(fuelName));
  };

  const handleDeleteFuel = (fuelId) => {
    logger.info("Delete fuel attempt", { fuelId });
    return dispatch(deleteFuel(fuelId));
  };

  const handleFetchAddons = () => {
    logger.info("Fetch addons attempt");
    return dispatch(fetchAddons());
  };

  const handleCreateAddon = (addonName) => {
    logger.info("Create addon attempt", { addonName });
    return dispatch(createAddon(addonName));
  };

  const handleDeleteAddon = (addonId) => {
    logger.info("Delete addon attempt", { addonId });
    return dispatch(deleteAddon(addonId));
  };

  const handleFetchTypeAddons = (type) => {
    logger.info("Fetch type addons attempt", { type });
    return dispatch(fetchTypeAddons(type));
  };

  const handleFetchBanks = () => {
    logger.info("Fetch banks attempt");
    return dispatch(fetchBanks());
  };

  const handleCreateBank = (bankName) => {
    logger.info("Create bank attempt", { bankName });
    return dispatch(createBank(bankName));
  };

  const handleDeleteBank = (bankId) => {
    logger.info("Delete bank attempt", { bankId });
    return dispatch(deleteBank(bankId));
  };

  const handleClearError = () => {
    logger.info("Clear fuel errors");
    dispatch(clearError());
  };

  const handleResetFuelState = () => {
    logger.info("Reset fuel state");
    dispatch(resetFuelState());
  };

  return {
    // State
    fuelState,
    
    // Fuel Data
    fuels: fuelState.fuels,
    fuelsLoading: fuelState.fuelsLoading,
    fuelsError: fuelState.fuelsError,
    fuelsSuccess: fuelState.fuelsSuccess,
    
    // Addon Data
    addons: fuelState.addons,
    addonsLoading: fuelState.addonsLoading,
    addonsError: fuelState.addonsError,
    addonsSuccess: fuelState.addonsSuccess,
    
    // Type Addon Data
    typeAddons: fuelState.typeAddons,
    typeAddonsLoading: fuelState.typeAddonsLoading,
    typeAddonsError: fuelState.typeAddonsError,
    
    // Bank Data
    banks: fuelState.banks,
    banksLoading: fuelState.banksLoading,
    banksError: fuelState.banksError,
    banksSuccess: fuelState.banksSuccess,
    
    // Loading States
    loading: fuelState.loading,
    
    // Common States
    error: fuelState.error,
    success: fuelState.success,
    
    // Fuel Actions
    fetchFuels: handleFetchFuels,
    createFuel: handleCreateFuel,
    deleteFuel: handleDeleteFuel,
    
    // Addon Actions
    fetchAddons: handleFetchAddons,
    createAddon: handleCreateAddon,
    deleteAddon: handleDeleteAddon,
    
    // Type Addon Actions
    fetchTypeAddons: handleFetchTypeAddons,
    
    // Bank Actions
    fetchBanks: handleFetchBanks,
    createBank: handleCreateBank,
    deleteBank: handleDeleteBank,
    
    // Utility Actions
    clearError: handleClearError,
    resetFuelState: handleResetFuelState,
  };
};