// services/RidersService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class RidersService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!RidersService.instance) {
      RidersService.instance = new RidersService();
    }
    return RidersService.instance;
  }

  // 🔹 Fetch all riders
  async fetchRiders() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.RIDERS.FETCH_ALL)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "RidersService.fetchRiders");
    }
  }

  // 🔹 Fetch rider by ID
  async fetchRiderById(id) {
    try {
      if (!id) {
        throw new Error("Rider ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.RIDERS.FETCH_BY_ID(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "RidersService.fetchRiderById");
    }
  }

  // 🔹 Create a new rider
  async createRider(riderData) {
    try {
      if (!riderData) {
        throw new Error("Rider data is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.RIDERS.CREATE, riderData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "RidersService.createRider");
    }
  }

  // 🔹 Update a rider
  async updateRider(id, riderData) {
    try {
      if (!id || !riderData) {
        throw new Error("Rider ID and data are required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.RIDERS.UPDATE(id), riderData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "RidersService.updateRider");
    }
  }

  // 🔹 Delete a rider
  async deleteRider(id) {
    try {
      if (!id) {
        throw new Error("Rider ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.RIDERS.DELETE(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "RidersService.deleteRider");
    }
  }
}