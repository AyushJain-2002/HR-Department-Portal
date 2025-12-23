// services/AddonService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../utils/error-handler';
import logger from '../Logger';

export class AddonService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!AddonService.instance) {
      AddonService.instance = new AddonService();
    }
    return AddonService.instance;
  }

  // 🔹 Fetch all addons
  async fetchAddons() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.ADDONS.GET_ADDONS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "AddonService.fetchAddons");
    }
  }

  // 🔹 Create a new addon
  async createAddon(addonData) {
    try {
      if (!addonData || !addonData.addon_name) {
        throw new Error("Addon name is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.ADDONS.CREATE_ADDON, addonData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "AddonService.createAddon");
    }
  }

  // 🔹 Delete an addon
  async deleteAddon(addonId) {
    try {
      if (!addonId) {
        throw new Error("Addon ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.ADDONS.DELETE_ADDON(addonId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "AddonService.deleteAddon");
    }
  }
}