// services/DepartmentService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry.jsx';
import ENDPOINTS from '../Endpoints.js';
import { ErrorHandler } from '../../utils/error-handler.jsx';
import logger from '../Logger.js';

export class DepartmentService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!DepartmentService.instance) {
      DepartmentService.instance = new DepartmentService();
    }
    return DepartmentService.instance;
  }

  // 🔹 Fetch all departments
  async fetchDepartments() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.DEPARTMENTS.GET_DEPARTMENTS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "DepartmentService.fetchDepartments");
    }
  }

  // 🔹 Create a new department
  async createDepartment(departmentName) {
    try {
      if (!departmentName) {
        throw new Error("Department name is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.DEPARTMENTS.CREATE_DEPARTMENT, {
          department_name: departmentName
        })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "DepartmentService.createDepartment");
    }
  }

  // 🔹 Delete a department
  async deleteDepartment(departmentId) {
    try {
      if (!departmentId) {
        throw new Error("Department ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.DEPARTMENTS.DELETE_DEPARTMENT(departmentId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "DepartmentService.deleteDepartment");
    }
  }

  // 🔹 Fetch all designations
  async fetchDesignations() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.DEPARTMENTS.GET_DESIGNATIONS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "DepartmentService.fetchDesignations");
    }
  }

  // 🔹 Create a new designation
  async createDesignation(designationName) {
    try {
      if (!designationName) {
        throw new Error("Designation name is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.DEPARTMENTS.CREATE_DESIGNATION, {
          designation_name: designationName
        })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "DepartmentService.createDesignation");
    }
  }

  // 🔹 Delete a designation
  async deleteDesignation(designationId) {
    try {
      if (!designationId) {
        throw new Error("Designation ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.DEPARTMENTS.DELETE_DESIGNATION(designationId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "DepartmentService.deleteDesignation");
    }
  }
}