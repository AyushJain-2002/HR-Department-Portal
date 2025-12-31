// services/mispService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class MispService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!MispService.instance) {
      MispService.instance = new MispService();
    }
    return MispService.instance;
  }

  // 🔹 Fetch all MISP
  async fetchMisps() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.MISP.GET_MISPS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "MispService.fetchMisps");
    }
  }

  // 🔹 Fetch MISP by ID
  async fetchMispById(id) {
    try {
      if (!id) {
        throw new Error("MISP ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.MISP.GET_MISP_BY_ID(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "MispService.fetchMispById");
    }
  }

  // 🔹 Create a new MISP
  async createMisp(mispData) {
    try {
      if (!mispData) {
        throw new Error("MISP data is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.MISP.CREATE_MISP, mispData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "MispService.createMisp");
    }
  }

  // 🔹 Update MISP
  async updateMisp(id, mispData) {
    try {
      if (!id) {
        throw new Error("MISP ID is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.MISP.UPDATE_MISP(id), mispData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "MispService.updateMisp");
    }
  }

  // 🔹 Delete MISP
  async deleteMisp(id) {
    try {
      if (!id) {
        throw new Error("MISP ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.MISP.DELETE_MISP(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "MispService.deleteMisp");
    }
  }

  // 🔹 Fetch MISP by branch
  async fetchMispByBranch(branchId) {
    try {
      if (!branchId) {
        throw new Error("Branch ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.MISP.GET_MISP_BY_BRANCH(branchId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "MispService.fetchMispByBranch");
    }
  }

  // 🔹 Change MISP password
  async changeMispPassword(id, passwordData) {
    try {
      if (!id || !passwordData) {
        throw new Error("MISP ID and password data are required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.MISP.CHANGE_MISP_PASSWORD(id), passwordData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "MispService.changeMispPassword");
    }
  }

  // 🔹 Toggle MISP active status
  async toggleMispActiveStatus(id) {
    try {
      if (!id) {
        throw new Error("MISP ID is required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.MISP.TOGGLE_MISP_ACTIVE_STATUS(id), {})
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "MispService.toggleMispActiveStatus");
    }
  }
}