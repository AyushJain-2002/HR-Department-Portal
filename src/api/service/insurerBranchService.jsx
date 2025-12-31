// services/InsurerService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class InsurerService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!InsurerService.instance) {
      InsurerService.instance = new InsurerService();
    }
    return InsurerService.instance;
  }

  // 🔹 Insurer Branches
  async fetchInsurerBranches() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURER_BRANCHES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsurerBranches");
    }
  }

  async fetchInsurerBranchById(insurerBranchId) {
    try {
      if (!insurerBranchId) {
        throw new Error("Insurer Branch ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURER_BRANCH_BY_ID(insurerBranchId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsurerBranchById");
    }
  }

  async fetchInsurerBranchesByType(type) {
    try {
      if (!type) {
        throw new Error("Type is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURER_BRANCHES_BY_TYPE(type))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsurerBranchesByType");
    }
  }

  async createInsurerBranch(branchData) {
    try {
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.INSURERS.CREATE_INSURER_BRANCH, branchData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.createInsurerBranch");
    }
  }

  async updateInsurerBranch(id, branchData) {
    try {
      if (!id) {
        throw new Error("Insurer Branch ID is required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.INSURERS.UPDATE_INSURER_BRANCH(id), branchData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.updateInsurerBranch");
    }
  }

  async deleteInsurerBranch(id) {
    try {
      if (!id) {
        throw new Error("Insurer Branch ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.INSURERS.DELETE_INSURER_BRANCH(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.deleteInsurerBranch");
    }
  }

  async fetchInsurerBranchByCompanyId(companyId) {
    try {
      if (!companyId) {
        throw new Error("Company ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURER_BRANCHES_BY_COMPANY(companyId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsurerBranchByCompanyId");
    }
  }

  // 🔹 Insurer Branch Managers
  async fetchInsurerBranchManagers() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURER_BRANCH_MANAGERS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsurerBranchManagers");
    }
  }

  async fetchInsurerBranchManagerById(branchId, index) {
    try {
      if (!branchId || index === undefined) {
        throw new Error("Branch ID and index are required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURER_BRANCH_MANAGER_BY_ID(branchId, index))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsurerBranchManagerById");
    }
  }

  async fetchInsurerBranchManagerByBranchId(branchId) {
    try {
      if (!branchId) {
        throw new Error("Branch ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURER_BRANCH_MANAGERS_BY_BRANCH(branchId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsurerBranchManagerByBranchId");
    }
  }

  async createInsurerBranchManager(managerData, id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.INSURERS.CREATE_INSURER_BRANCH_MANAGER(id), managerData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.createInsurerBranchManager");
    }
  }

  async updateInsurerBranchManager(id, branchData) {
    try {
      if (!id) {
        throw new Error("Insurer Branch Manager ID is required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.INSURERS.UPDATE_INSURER_BRANCH_MANAGER(id), branchData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.updateInsurerBranchManager");
    }
  }

  async deleteInsurerBranchManager(managerId) {
    try {
      if (!managerId) {
        throw new Error("Manager ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.INSURERS.DELETE_INSURER_BRANCH_MANAGER(managerId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.deleteInsurerBranchManager");
    }
  }

  // 🔹 Insurance Companies
  async fetchInsuranceCompanies() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURANCE_COMPANIES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsuranceCompanies");
    }
  }

  async fetchInsuranceCompanyById(companyId) {
    try {
      if (!companyId) {
        throw new Error("Company ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURANCE_COMPANY_BY_ID(companyId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsuranceCompanyById");
    }
  }

  async fetchInsuranceCompaniesByType(type) {
    try {
      if (!type) {
        throw new Error("Type is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.INSURERS.GET_INSURANCE_COMPANIES_BY_TYPE(type))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.fetchInsuranceCompaniesByType");
    }
  }

  async createInsuranceCompany(companyData) {
    try {
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.INSURERS.CREATE_INSURANCE_COMPANY, companyData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.createInsuranceCompany");
    }
  }

  async updateInsuranceCompany(id, companyData) {
    try {
      if (!id) {
        throw new Error("Insurance Company ID is required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.INSURERS.UPDATE_INSURANCE_COMPANY(id), companyData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.updateInsuranceCompany");
    }
  }

  async deleteInsuranceCompany(id) {
    try {
      if (!id) {
        throw new Error("Insurance Company ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.INSURERS.DELETE_INSURANCE_COMPANY(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "InsurerService.deleteInsuranceCompany");
    }
  }
}