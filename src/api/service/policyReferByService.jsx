// services/policyReferByService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class PolicyReferByService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!PolicyReferByService.instance) {
      PolicyReferByService.instance = new PolicyReferByService();
    }
    return PolicyReferByService.instance;
  }

  // 🔹 Fetch all policy refer by entries
  async fetchPolicyReferBy() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.POLICY_REFER_BY.FETCH_ALL)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "PolicyReferByService.fetchPolicyReferBy");
    }
  }

  // 🔹 Register new policy refer by
  async registerPolicyReferBy(data) {
    try {
      if (!data) {
        throw new Error("Policy refer by data is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.POLICY_REFER_BY.REGISTER, data)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "PolicyReferByService.registerPolicyReferBy");
    }
  }

  // 🔹 Get policy refer by by ID
  async getPolicyReferById(id) {
    try {
      if (!id) {
        throw new Error("Policy refer by ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.POLICY_REFER_BY.GET_BY_ID(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "PolicyReferByService.getPolicyReferById");
    }
  }

  // 🔹 Update policy refer by
  async updatePolicyReferBy(id, data) {
    try {
      if (!id || !data) {
        throw new Error("Policy refer by ID and data are required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.POLICY_REFER_BY.UPDATE(id), data)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "PolicyReferByService.updatePolicyReferBy");
    }
  }

  // 🔹 Toggle policy refer by status
  async togglePolicyReferByStatus(refById) {
    try {
      if (!refById) {
        throw new Error("Policy refer by ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.POLICY_REFER_BY.TOGGLE_STATUS(refById))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "PolicyReferByService.togglePolicyReferByStatus");
    }
  }
}