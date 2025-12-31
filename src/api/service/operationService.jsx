// services/operationService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class OperationService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!OperationService.instance) {
      OperationService.instance = new OperationService();
    }
    return OperationService.instance;
  }

  // 🔹 Fetch BQP Types by Vertical
  async fetchBqpTypes(verticalType) {
    try {
      if (!verticalType) {
        throw new Error("Vertical type is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_BQP_TYPES(verticalType))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchBqpTypes");
    }
  }

  // 🔹 Fetch Relationship Managers with Vertical and BQP
  async fetchRelationshipManagersWithVertical(verticalType, bqpId) {
    try {
      if (!verticalType || !bqpId) {
        throw new Error("Vertical type and BQP ID are required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_RELATIONSHIP_MANAGERS_WITH_VERTICAL(verticalType, bqpId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchRelationshipManagersWithVertical");
    }
  }

  // 🔹 Fetch Relationship Manager by ID
  async fetchRelationshipManager(id) {
    try {
      if (!id) {
        throw new Error("Relationship Manager ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_RELATIONSHIP_MANAGER(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchRelationshipManager");
    }
  }

  // 🔹 Fetch POSP Types by Vertical and RM
  async fetchPospTypes(verticalType, rmid) {
    try {
      if (!verticalType || !rmid) {
        throw new Error("Vertical type and Relationship Manager ID are required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_POSP_TYPES(verticalType, rmid))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchPospTypes");
    }
  }

  // 🔹 Fetch POSP by ID
  async fetchPosp(id) {
    try {
      if (!id) {
        throw new Error("POSP ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_POSP(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchPosp");
    }
  }

  // 🔹 Fetch Refer Types by Vertical and POSP
  async fetchReferTypes(verticalType, pospId) {
    try {
      if (!verticalType || !pospId) {
        throw new Error("Vertical type and POSP ID are required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_REFER_TYPES(verticalType, pospId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchReferTypes");
    }
  }

  // 🔹 Fetch Motor Employees
  async fetchMotorEmployee() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_MOTOR_EMPLOYEES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchMotorEmployee");
    }
  }

  // 🔹 Fetch Cheque Data
  async fetchChequeData(chequeNo) {
    try {
      if (!chequeNo) {
        throw new Error("Cheque number is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_CHEQUE_DATA(chequeNo))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchChequeData");
    }
  }

  // 🔹 Fetch All BQP
  async fetchBqp() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_ALL_BQP)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchBqp");
    }
  }

  // 🔹 Fetch Reporting Manager by ID
  async fetchReportingManager(id) {
    try {
      if (!id) {
        throw new Error("Reporting Manager ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_REPORTING_MANAGER(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchReportingManager");
    }
  }

  // 🔹 Fetch Reporting Manager with POSP
  async fetchReportingManagerWithPosp(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.OPERATIONS.GET_REPORTING_MANAGER_WITH_POSP(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationService.fetchReportingManagerWithPosp");
    }
  }
}