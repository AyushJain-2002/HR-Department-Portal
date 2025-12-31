// services/assignOfficialPospService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class AssignOfficialPospService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!AssignOfficialPospService.instance) {
      AssignOfficialPospService.instance = new AssignOfficialPospService();
    }
    return AssignOfficialPospService.instance;
  }

  // 🔹 Fetch branches
  async fetchBranches() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.ASSIGN_OFFICIAL_POSP.FETCH_BRANCHES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "AssignOfficialPospService.fetchBranches");
    }
  }

  // 🔹 Fetch BQP by branch ID
  async fetchBqpByBranch(branchId) {
    try {
      if (!branchId) {
        throw new Error("Branch ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.ASSIGN_OFFICIAL_POSP.FETCH_BQP_BY_BRANCH(branchId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "AssignOfficialPospService.fetchBqpByBranch");
    }
  }

  // 🔹 Fetch relationship manager by BQP ID
  async fetchRelationshipManagerByBqp(bqpId) {
    try {
      if (!bqpId) {
        throw new Error("BQP ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.ASSIGN_OFFICIAL_POSP.FETCH_RELATIONSHIP_MANAGER_BY_BQP(bqpId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "AssignOfficialPospService.fetchRelationshipManagerByBqp");
    }
  }

  // 🔹 Submit HR verification
  async submitHrVerification(id, formData) {
    try {
      if (!id || !formData) {
        throw new Error("POSP ID and form data are required");
      }
      return await withRetry(() =>
        this.httpClient.post(
          ENDPOINTS.ASSIGN_OFFICIAL_POSP.SUBMIT_HR_VERIFICATION(id), 
          formData
        )
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "AssignOfficialPospService.submitHrVerification");
    }
  }
}