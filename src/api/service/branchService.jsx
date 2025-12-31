// services/branchService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class BranchService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!BranchService.instance) {
      BranchService.instance = new BranchService();
    }
    return BranchService.instance;
  }

  // 🔹 Fetch all branches
  async fetchBranches() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.BRANCHES.GET_BRANCHES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.fetchBranches");
    }
  }

  // 🔹 Fetch branch by ID
  async fetchBranchById(id) {
    try {
      if (!id) {
        throw new Error("Branch ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.BRANCHES.GET_BRANCH_BY_ID(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.fetchBranchById");
    }
  }

  // 🔹 Create a new branch
  async createBranch(branchData) {
    try {
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.BRANCHES.CREATE_BRANCH, branchData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.createBranch");
    }
  }

  // 🔹 Update a branch
  async updateBranch(id, branchData) {
    try {
      if (!id) {
        throw new Error("Branch ID is required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.BRANCHES.UPDATE_BRANCH(id), branchData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.updateBranch");
    }
  }

  // 🔹 Delete a branch
  async deleteBranch(id) {
    try {
      if (!id) {
        throw new Error("Branch ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.BRANCHES.DELETE_BRANCH(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.deleteBranch");
    }
  }

  // 🔹 Fetch all branch managers
  async fetchBranchManagers() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.BRANCHES.GET_BRANCH_MANAGERS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.fetchBranchManagers");
    }
  }

  // 🔹 Fetch branch manager by ID
  async fetchBranchManagerById(id) {
    try {
      if (!id) {
        throw new Error("Branch Manager ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.BRANCHES.GET_BRANCH_MANAGER_BY_ID(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.fetchBranchManagerById");
    }
  }

  // 🔹 Create a new branch manager
  async createBranchManager(branchManagerData) {
    try {
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.BRANCHES.CREATE_BRANCH_MANAGER, branchManagerData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.createBranchManager");
    }
  }

  // 🔹 Update a branch manager
  async updateBranchManager(id, branchManagerData) {
    try {
      if (!id) {
        throw new Error("Branch Manager ID is required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.BRANCHES.UPDATE_BRANCH_MANAGER(id), branchManagerData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.updateBranchManager");
    }
  }

  // 🔹 Delete a branch manager
  async deleteBranchManager(id) {
    try {
      if (!id) {
        throw new Error("Branch Manager ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.BRANCHES.DELETE_BRANCH_MANAGER(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "BranchService.deleteBranchManager");
    }
  }
}