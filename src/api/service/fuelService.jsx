// services/FuelService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../utils/error-handler';
import logger from '../Logger';

export class FuelService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!FuelService.instance) {
      FuelService.instance = new FuelService();
    }
    return FuelService.instance;
  }

  // 🔹 Fetch all fuels
  async fetchFuels() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.FUELS.GET_FUELS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.fetchFuels");
    }
  }

  // 🔹 Create a new fuel
  async createFuel(fuelName) {
    try {
      if (!fuelName) {
        throw new Error("Fuel name is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.FUELS.CREATE_FUEL, {
          fuel_name: fuelName
        })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.createFuel");
    }
  }

  // 🔹 Delete a fuel
  async deleteFuel(fuelId) {
    try {
      if (!fuelId) {
        throw new Error("Fuel ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.FUELS.DELETE_FUEL(fuelId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.deleteFuel");
    }
  }

  // 🔹 Fetch all addons
  async fetchAddons() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.FUELS.GET_ADDONS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.fetchAddons");
    }
  }

  // 🔹 Create a new addon
  async createAddon(addonName) {
    try {
      if (!addonName) {
        throw new Error("Addon name is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.FUELS.CREATE_ADDON, {
          addon_name: addonName
        })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.createAddon");
    }
  }

  // 🔹 Delete an addon
  async deleteAddon(addonId) {
    try {
      if (!addonId) {
        throw new Error("Addon ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.FUELS.DELETE_ADDON(addonId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.deleteAddon");
    }
  }

  // 🔹 Fetch type-based addons
  async fetchTypeAddons(type) {
    try {
      if (!type) {
        throw new Error("Type is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.FUELS.GET_TYPE_ADDONS(type))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.fetchTypeAddons");
    }
  }

  // 🔹 Fetch all banks
  async fetchBanks() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.FUELS.GET_BANKS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.fetchBanks");
    }
  }

  // 🔹 Create a new bank
  async createBank(bankName) {
    try {
      if (!bankName) {
        throw new Error("Bank name is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.FUELS.CREATE_BANK, {
          bank_name: bankName
        })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.createBank");
    }
  }

  // 🔹 Delete a bank
  async deleteBank(bankId) {
    try {
      if (!bankId) {
        throw new Error("Bank ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.FUELS.DELETE_BANK(bankId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "FuelService.deleteBank");
    }
  }
}