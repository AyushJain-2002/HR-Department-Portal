// services/ZonesService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../utils/error-handler';
import logger from '../Logger';

export class ZonesService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!ZonesService.instance) {
      ZonesService.instance = new ZonesService();
    }
    return ZonesService.instance;
  }

  // 🔹 Fetch all zones
  async fetchZones() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.ZONES.FETCH_ZONES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "ZonesService.fetchZones");
    }
  }

  // 🔹 Add a new zone
  async addZone(zoneName) {
    try {
      if (!zoneName) {
        throw new Error("Zone name is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.ZONES.ADD_ZONE, { zone_name: zoneName })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "ZonesService.addZone");
    }
  }

  // 🔹 Delete a zone
  async deleteZone(zoneId) {
    try {
      if (!zoneId) {
        throw new Error("Zone ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.ZONES.DELETE_ZONE(zoneId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "ZonesService.deleteZone");
    }
  }

  // 🔹 Fetch all regions
  async fetchRegions() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.ZONES.FETCH_REGIONS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "ZonesService.fetchRegions");
    }
  }

  // 🔹 Add a new region
  async addRegion(regionName) {
    try {
      if (!regionName) {
        throw new Error("Region name is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.ZONES.ADD_REGION, { region_name: regionName })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "ZonesService.addRegion");
    }
  }

  // 🔹 Delete a region
  async deleteRegion(regionId) {
    try {
      if (!regionId) {
        throw new Error("Region ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.ZONES.DELETE_REGION(regionId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "ZonesService.deleteRegion");
    }
  }
}