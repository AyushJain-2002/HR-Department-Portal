// services/stateService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class StateService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!StateService.instance) {
      StateService.instance = new StateService();
    }
    return StateService.instance;
  }

  // 🔹 Fetch all states
  async fetchStates() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.STATES.GET_STATES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "StateService.fetchStates");
    }
  }

  // 🔹 Fetch cities by state ID
  async fetchCitiesByState(stateId) {
    try {
      if (!stateId) {
        throw new Error("State ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.STATES.GET_CITIES_BY_STATE(stateId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "StateService.fetchCitiesByState");
    }
  }

  // 🔹 Fetch cities by state ID (another endpoint - similar to fetchCitiesByState)
  async fetchCitiesByStateAnother(stateId) {
    try {
      if (!stateId) {
        throw new Error("State ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.STATES.GET_CITIES_BY_STATE_ANOTHER(stateId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "StateService.fetchCitiesByStateAnother");
    }
  }

  // 🔹 Fetch all cities
  async fetchCities() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.STATES.GET_ALL_CITIES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "StateService.fetchCities");
    }
  }

  // 🔹 Create a new city
  async createCity(cityData) {
    try {
      const { state_id, city_name } = cityData;
      
      if (!state_id || !city_name) {
        throw new Error("State ID and City Name are required");
      }
      
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.STATES.CREATE_CITY, {
          state_id,
          city_name
        })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "StateService.createCity");
    }
  }

  // 🔹 Delete a city
  async deleteCity(cityId) {
    try {
      if (!cityId) {
        throw new Error("City ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.STATES.DELETE_CITY(cityId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "StateService.deleteCity");
    }
  }
}