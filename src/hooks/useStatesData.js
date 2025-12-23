import { useDispatch, useSelector } from "react-redux";
import { 
  fetchStates, 
  fetchCitiesByState,
  fetchCitiesByStateAnother,
  fetchCities,
  createCity,
  deleteCity,
  clearStates,
  clearError
} from "../store/NewReducers/StateSlice";
import { useLogger } from "./useLogger";

export const useStateData = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.states);
  const logger = useLogger("useStateData");
// console.log("satate",stateData)
  const handleFetchStates = () => {
    logger.info("Fetch states attempt");
    return dispatch(fetchStates());
  };

  const handleFetchCitiesByState = (stateId) => {
    logger.info("Fetch cities by state attempt", { stateId });
    return dispatch(fetchCitiesByState(stateId));
  };

  const handleFetchCitiesByStateAnother = (stateId) => {
    logger.info("Fetch cities by state another attempt", { stateId });
    return dispatch(fetchCitiesByStateAnother(stateId));
  };

  const handleFetchCities = () => {
    logger.info("Fetch all cities attempt");
    return dispatch(fetchCities());
  };

  const handleCreateCity = (stateId, cityName) => {
    logger.info("Create city attempt", { stateId, cityName });
    return dispatch(createCity({ stateId, cityName }));
  };

  const handleDeleteCity = (cityId) => {
    logger.info("Delete city attempt", { cityId });
    return dispatch(deleteCity(cityId));
  };

  const handleClearStates = () => {
    logger.info("Clear states data");
    dispatch(clearStates());
  };

  const handleClearError = () => {
    logger.info("Clear state errors");
    dispatch(clearError());
  };

  return {
    // State
    stateData,
    
    // Data
    states: stateData.states,
    cities: stateData.cities,
    citiesBy: stateData.citiesBy,
    loading: stateData.loading,
    error: stateData.error,
    success: stateData.success,
    createSuccess: stateData.createSuccess,
    deleteSuccess: stateData.deleteSuccess,
    
    // Actions
    fetchStates: handleFetchStates,
    fetchCitiesByState: handleFetchCitiesByState,
    fetchCitiesByStateAnother: handleFetchCitiesByStateAnother,
    fetchCities: handleFetchCities,
    createCity: handleCreateCity,
    deleteCity: handleDeleteCity,
    
    // Utility Actions
    clearStates: handleClearStates,
    clearError: handleClearError,
  };
};