// services/InventoryService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry.jsx';
import ENDPOINTS from '../Endpoints.js';
import { ErrorHandler } from '../../utils/error-handler.jsx';
import logger from '../Logger.js';

export class InventoryService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService();
    }
    return InventoryService.instance;
  }

  // 🔹 Fetch all inventories
  async fetchInventories() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INVENTORY.GET_INVENTORIES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InventoryService.fetchInventories");
    }
  }

  // 🔹 Fetch inventory by ID
  async fetchInventoryById(inventoryId) {
    try {
      if (!inventoryId) {
        throw new Error("Inventory ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INVENTORY.GET_INVENTORY_BY_ID(inventoryId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InventoryService.fetchInventoryById");
    }
  }

  // 🔹 Create a new inventory
  async createInventory(inventoryData) {
    try {
      if (!inventoryData) {
        throw new Error("Inventory data is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.INVENTORY.CREATE_INVENTORY, inventoryData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InventoryService.createInventory");
    }
  }

  // 🔹 Update an inventory
  async updateInventory(id, inventoryData) {
    try {
      if (!id) {
        throw new Error("Inventory ID is required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.INVENTORY.UPDATE_INVENTORY(id), inventoryData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InventoryService.updateInventory");
    }
  }

  // 🔹 Delete an inventory
  async deleteInventory(id) {
    try {
      if (!id) {
        throw new Error("Inventory ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.INVENTORY.DELETE_INVENTORY(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InventoryService.deleteInventory");
    }
  }
}