import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logger from "../../api/Logger";
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { apiClient } from "../../api/apiClient";

const initialState = {
  // Insurer Branches Data
  insurerBranch: null,
  insurerBranches: [],
  insurerCompanyBranches: [],
  
  // Insurer Branch Managers Data
  insurerBranchManager: null,
  insurerBranchManagers: [],
  
  // Insurance Companies Data
  insuranceCompany: null,
  insuranceCompanies: [],
  insuranceByTypeCompanies: [],
  
  // Loading States
  loading: false,
  insurerLoading: false,
  insurerBranchesLoading: false,
  insurerBranchManagersLoading: false,
  insuranceCompaniesLoading: false,
  
  // Error States
  error: null,
  createError: null,
  editError: null,
  insurerBranchesError: null,
  insurerBranchManagersError: null,
  insuranceCompaniesError: null,
  
  // Success States
  success: false,
  editSuccess: false,
  insurerBranchSuccess: false,
  insurerBranchEditSuccess: false,
  insurerBranchManagerSuccess: false,
  insurerBranchManagerEditSuccess: false,
  insuranceCompanySuccess: false,
  insuranceCompanyEditSuccess: false,
};

// Helper function to get user info for logging
const getUserInfoForLogging = () => {
  try {
    const userInfo = getDecryptedCookie("user");
    return {
      userId: userInfo?.id,
      email: userInfo?.email,
      name: userInfo?.name,
      role: userInfo?.role
    };
  } catch {
    return { userId: null, email: null };
  }
};

// Helper function to handle API errors
const handleApiError = (error, action) => {
  let errorMessage = "Something went wrong";
  
  if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error.response?.data) {
    errorMessage = typeof error.response.data === 'string' 
      ? error.response.data 
      : JSON.stringify(error.response.data);
  } else if (error.message) {
    errorMessage = error.message;
  }
  
  const userInfo = getUserInfoForLogging();
  Logger.error(`${action} failed`, {
    error: errorMessage,
    userId: userInfo.userId,
    email: userInfo.email,
  }, "INSURER_API_ERROR");
  
  return errorMessage;
};

// Helper function to log user actions
const logUserAction = (action, details = {}) => {
  const userInfo = getUserInfoForLogging();
  const logDetails = {
    ...userInfo,
    ...details,
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  };
  Logger.info(`Insurer Action: ${action}`, logDetails, "INSURER_ACTION");
};

// 🔹 Fetch Insurer Branches
export const fetchInsurerBranches = createAsyncThunk(
  "insurers/fetchInsurerBranches",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurer_branches_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.insurers.fetchInsurerBranches();
      
      Logger.info("Insurer branches fetched successfully", {
        userId: userInfo.userId,
        branchCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branches_fetched", { 
        userId: userInfo.userId,
        count: response.data?.data?.length || 0
      });
      
      return response.data?.data || [];
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurer branches");
      
      logUserAction("fetch_insurer_branches_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Insurer Branch By ID
export const fetchInsurerBranchById = createAsyncThunk(
  "insurers/fetchInsurerBranchById",
  async (insurerBranchId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurer_branch_by_id_attempt", { 
        userId: userInfo.userId,
        insurerBranchId 
      });
      
      const response = await apiClient.insurers.fetchInsurerBranchById(insurerBranchId);
      
      Logger.info("Insurer branch fetched successfully", {
        userId: userInfo.userId,
        insurerBranchId,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_fetched_by_id", { 
        userId: userInfo.userId,
        insurerBranchId 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurer branch by ID");
      
      logUserAction("fetch_insurer_branch_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        insurerBranchId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Insurer Branches By Type
export const fetchInsurerBranchesByType = createAsyncThunk(
  "insurers/fetchInsurerBranchesByType",
  async (type, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurer_branches_by_type_attempt", { 
        userId: userInfo.userId,
        type 
      });
      
      const response = await apiClient.insurers.fetchInsurerBranchesByType(type);
      
      Logger.info("Insurer branches by type fetched successfully", {
        userId: userInfo.userId,
        type,
        branchCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branches_by_type_fetched", { 
        userId: userInfo.userId,
        type 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurer branches by type");
      
      logUserAction("fetch_insurer_branches_by_type_failed", {
        userId: getUserInfoForLogging().userId,
        type,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Insurer Branch
export const createInsurerBranch = createAsyncThunk(
  "insurers/createInsurerBranch",
  async (branchData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_insurer_branch_attempt", { 
        userId: userInfo.userId,
        branchName: branchData.name,
        branchCode: branchData.code
      });
      
      const response = await apiClient.insurers.createInsurerBranch(branchData);
      
      Logger.info("Insurer branch created successfully", {
        userId: userInfo.userId,
        branchId: response.data?.data?.branch?.id,
        branchName: branchData.name,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_created", {
        userId: userInfo.userId,
        branchName: branchData.name
      });
      
      return response.data?.data?.branch || response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create insurer branch");
      
      logUserAction("create_insurer_branch_failed", {
        userId: getUserInfoForLogging().userId,
        branchName: branchData.name,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Insurer Branch
export const updateInsurerBranch = createAsyncThunk(
  "insurers/updateInsurerBranch",
  async ({ id, branchData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_insurer_branch_attempt", { 
        userId: userInfo.userId,
        insurerBranchId: id 
      });
      
      const response = await apiClient.insurers.updateInsurerBranch(id, branchData);
      
      Logger.info("Insurer branch updated successfully", {
        userId: userInfo.userId,
        insurerBranchId: id,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_updated", {
        userId: userInfo.userId,
        insurerBranchId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update insurer branch");
      
      logUserAction("update_insurer_branch_failed", {
        userId: getUserInfoForLogging().userId,
        insurerBranchId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Insurer Branch
export const deleteInsurerBranch = createAsyncThunk(
  "insurers/deleteInsurerBranch",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_insurer_branch_attempt", { 
        userId: userInfo.userId,
        insurerBranchId: id 
      });
      
      await apiClient.insurers.deleteInsurerBranch(id);
      
      Logger.info("Insurer branch deleted successfully", {
        userId: userInfo.userId,
        insurerBranchId: id,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_deleted", {
        userId: userInfo.userId,
        insurerBranchId: id
      });
      
      return id;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete insurer branch");
      
      logUserAction("delete_insurer_branch_failed", {
        userId: getUserInfoForLogging().userId,
        insurerBranchId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Insurer Branch By Company ID
export const fetchInsurerBranchByCompanyId = createAsyncThunk(
  "insurers/fetchInsurerBranchByCompanyId",
  async (companyId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurer_branches_by_company_id_attempt", { 
        userId: userInfo.userId,
        companyId 
      });
      
      const response = await apiClient.insurers.fetchInsurerBranchByCompanyId(companyId);
      
      Logger.info("Insurer branches by company ID fetched successfully", {
        userId: userInfo.userId,
        companyId,
        branchCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branches_by_company_id_fetched", { 
        userId: userInfo.userId,
        companyId 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurer branches by company ID");
      
      logUserAction("fetch_insurer_branches_by_company_id_failed", {
        userId: getUserInfoForLogging().userId,
        companyId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Insurer Branch Managers
export const fetchInsurerBranchManagers = createAsyncThunk(
  "insurers/fetchInsurerBranchManagers",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurer_branch_managers_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.insurers.fetchInsurerBranchManagers();
      
      Logger.info("Insurer branch managers fetched successfully", {
        userId: userInfo.userId,
        managerCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_managers_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurer branch managers");
      
      logUserAction("fetch_insurer_branch_managers_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Insurer Branch Manager By ID
export const fetchInsurerBranchManagerById = createAsyncThunk(
  "insurers/fetchInsurerBranchManagerById",
  async ({ branchId, index }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurer_branch_manager_by_id_attempt", { 
        userId: userInfo.userId,
        branchId,
        index 
      });
      
      const response = await apiClient.insurers.fetchInsurerBranchManagerById(branchId, index);
      
      Logger.info("Insurer branch manager fetched successfully", {
        userId: userInfo.userId,
        branchId,
        index,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_manager_fetched_by_id", { 
        userId: userInfo.userId,
        branchId 
      });
      
      return response.data?.data || response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurer branch manager by ID");
      
      logUserAction("fetch_insurer_branch_manager_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        branchId,
        index,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Insurer Branch Manager By Branch ID
export const fetchInsurerBranchManagerByBranchId = createAsyncThunk(
  "insurers/fetchInsurerBranchManagerByBranchId",
  async (branchId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurer_branch_manager_by_branch_id_attempt", { 
        userId: userInfo.userId,
        branchId 
      });
      
      const response = await apiClient.insurers.fetchInsurerBranchManagerByBranchId(branchId);
      
      Logger.info("Insurer branch managers by branch ID fetched successfully", {
        userId: userInfo.userId,
        branchId,
        managerCount: response.data?.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_managers_by_branch_id_fetched", { 
        userId: userInfo.userId,
        branchId 
      });
      
      return response.data?.data || response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurer branch managers by branch ID");
      
      logUserAction("fetch_insurer_branch_managers_by_branch_id_failed", {
        userId: getUserInfoForLogging().userId,
        branchId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Insurer Branch Manager
export const createInsurerBranchManager = createAsyncThunk(
  "insurers/createInsurerBranchManager",
  async ({ managerData, id }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_insurer_branch_manager_attempt", { 
        userId: userInfo.userId,
        managerName: managerData.name,
        branchId: id 
      });
      
      const response = await apiClient.insurers.createInsurerBranchManager(managerData, id);
      
      Logger.info("Insurer branch manager created successfully", {
        userId: userInfo.userId,
        managerId: response.data?.id,
        managerName: managerData.name,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_manager_created", {
        userId: userInfo.userId,
        managerName: managerData.name
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create insurer branch manager");
      
      logUserAction("create_insurer_branch_manager_failed", {
        userId: getUserInfoForLogging().userId,
        managerName: managerData.name,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Insurer Branch Manager
export const updateInsurerBranchManager = createAsyncThunk(
  "insurers/updateInsurerBranchManager",
  async ({ id, branchData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_insurer_branch_manager_attempt", { 
        userId: userInfo.userId,
        branchManagerId: id 
      });
      
      const response = await apiClient.insurers.updateInsurerBranchManager(id, branchData);
      
      Logger.info("Insurer branch manager updated successfully", {
        userId: userInfo.userId,
        branchManagerId: id,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_manager_updated", {
        userId: userInfo.userId,
        branchManagerId: id
      });
      
      return response.data?.data || response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update insurer branch manager");
      
      logUserAction("update_insurer_branch_manager_failed", {
        userId: getUserInfoForLogging().userId,
        branchManagerId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Insurer Branch Manager
export const deleteInsurerBranchManager = createAsyncThunk(
  "insurers/deleteInsurerBranchManager",
  async (managerId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_insurer_branch_manager_attempt", { 
        userId: userInfo.userId,
        managerId 
      });
      
      await apiClient.insurers.deleteInsurerBranchManager(managerId);
      
      Logger.info("Insurer branch manager deleted successfully", {
        userId: userInfo.userId,
        managerId,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurer_branch_manager_deleted", {
        userId: userInfo.userId,
        managerId
      });
      
      return managerId;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete insurer branch manager");
      
      logUserAction("delete_insurer_branch_manager_failed", {
        userId: getUserInfoForLogging().userId,
        managerId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Insurance Companies
export const fetchInsuranceCompanies = createAsyncThunk(
  "insurers/fetchInsuranceCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurance_companies_attempt", { userId: userInfo.userId });
      
      const response = await apiClient.insurers.fetchInsuranceCompanies();
      
      Logger.info("Insurance companies fetched successfully", {
        userId: userInfo.userId,
        companyCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurance_companies_fetched", { 
        userId: userInfo.userId,
        count: response.data?.length || 0
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurance companies");
      
      logUserAction("fetch_insurance_companies_failed", {
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Insurance Company By ID
export const fetchInsuranceCompanyById = createAsyncThunk(
  "insurers/fetchInsuranceCompanyById",
  async (companyId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurance_company_by_id_attempt", { 
        userId: userInfo.userId,
        companyId 
      });
      
      const response = await apiClient.insurers.fetchInsuranceCompanyById(companyId);
      
      Logger.info("Insurance company fetched successfully", {
        userId: userInfo.userId,
        companyId,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurance_company_fetched_by_id", { 
        userId: userInfo.userId,
        companyId 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurance company by ID");
      
      logUserAction("fetch_insurance_company_by_id_failed", {
        userId: getUserInfoForLogging().userId,
        companyId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Fetch Insurance Companies By Type
export const fetchInsuranceCompaniesByType = createAsyncThunk(
  "insurers/fetchInsuranceCompaniesByType",
  async (type, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("fetch_insurance_companies_by_type_attempt", { 
        userId: userInfo.userId,
        type 
      });
      
      const response = await apiClient.insurers.fetchInsuranceCompaniesByType(type);
      
      Logger.info("Insurance companies by type fetched successfully", {
        userId: userInfo.userId,
        type,
        companyCount: response.data?.length || 0,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurance_companies_by_type_fetched", { 
        userId: userInfo.userId,
        type 
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch insurance companies by type");
      
      logUserAction("fetch_insurance_companies_by_type_failed", {
        userId: getUserInfoForLogging().userId,
        type,
        error: errorMessage
      });
      
      // For empty results, return empty array
      if (error.response?.status === 404) {
        return [];
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Create Insurance Company
export const createInsuranceCompany = createAsyncThunk(
  "insurers/createInsuranceCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("create_insurance_company_attempt", { 
        userId: userInfo.userId,
        companyName: companyData.name,
        companyType: companyData.type
      });
      
      const response = await apiClient.insurers.createInsuranceCompany(companyData);
      
      Logger.info("Insurance company created successfully", {
        userId: userInfo.userId,
        companyId: response.data?.id,
        companyName: companyData.name,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurance_company_created", {
        userId: userInfo.userId,
        companyName: companyData.name
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Create insurance company");
      
      logUserAction("create_insurance_company_failed", {
        userId: getUserInfoForLogging().userId,
        companyName: companyData.name,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Update Insurance Company
export const updateInsuranceCompany = createAsyncThunk(
  "insurers/updateInsuranceCompany",
  async ({ id, companyData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("update_insurance_company_attempt", { 
        userId: userInfo.userId,
        companyId: id 
      });
      
      const response = await apiClient.insurers.updateInsuranceCompany(id, companyData);
      
      Logger.info("Insurance company updated successfully", {
        userId: userInfo.userId,
        companyId: id,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurance_company_updated", {
        userId: userInfo.userId,
        companyId: id
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update insurance company");
      
      logUserAction("update_insurance_company_failed", {
        userId: getUserInfoForLogging().userId,
        companyId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Delete Insurance Company
export const deleteInsuranceCompany = createAsyncThunk(
  "insurers/deleteInsuranceCompany",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      logUserAction("delete_insurance_company_attempt", { 
        userId: userInfo.userId,
        companyId: id 
      });
      
      await apiClient.insurers.deleteInsuranceCompany(id);
      
      Logger.info("Insurance company deleted successfully", {
        userId: userInfo.userId,
        companyId: id,
        timestamp: new Date().toISOString()
      }, "INSURERS");
      
      logUserAction("insurance_company_deleted", {
        userId: userInfo.userId,
        companyId: id
      });
      
      return id;
    } catch (error) {
      const errorMessage = handleApiError(error, "Delete insurance company");
      
      logUserAction("delete_insurance_company_failed", {
        userId: getUserInfoForLogging().userId,
        companyId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

const insurerSlice = createSlice({
  name: "insurers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.createError = null;
      state.editError = null;
      state.insurerBranchesError = null;
      state.insurerBranchManagersError = null;
      state.insuranceCompaniesError = null;
    },
    resetInsurerState: (state) => {
      state.insurerBranch = null;
      state.insurerBranches = [];
      state.insurerCompanyBranches = [];
      state.insurerBranchManager = null;
      state.insurerBranchManagers = [];
      state.insuranceCompany = null;
      state.insuranceCompanies = [];
      state.insuranceByTypeCompanies = [];
      state.loading = false;
      state.insurerLoading = false;
      state.insurerBranchesLoading = false;
      state.insurerBranchManagersLoading = false;
      state.insuranceCompaniesLoading = false;
      state.error = null;
      state.createError = null;
      state.editError = null;
      state.insurerBranchesError = null;
      state.insurerBranchManagersError = null;
      state.insuranceCompaniesError = null;
      state.success = false;
      state.editSuccess = false;
      state.insurerBranchSuccess = false;
      state.insurerBranchEditSuccess = false;
      state.insurerBranchManagerSuccess = false;
      state.insurerBranchManagerEditSuccess = false;
      state.insuranceCompanySuccess = false;
      state.insuranceCompanyEditSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Insurer Branches
      .addCase(fetchInsurerBranches.pending, (state) => {
        state.insurerBranchesLoading = true;
        state.loading = true;
        state.insurerLoading = true;
        state.error = null;
        state.insurerBranchesError = null;
        state.success = false;
        state.editSuccess = false;
        state.createError = null;
        state.insuranceCompany = null;
        state.insurerBranchManager = null;
        state.insurerBranches = [];
        state.insurerCompanyBranches = [];
      })
      .addCase(fetchInsurerBranches.fulfilled, (state, action) => {
        state.insurerBranchesLoading = false;
        state.loading = false;
        state.insurerLoading = false;
        state.insurerBranches = action.payload;
        state.insurerBranchesError = null;
        state.error = null;
      })
      .addCase(fetchInsurerBranches.rejected, (state, action) => {
        state.insurerBranchesLoading = false;
        state.loading = false;
        state.insurerLoading = false;
        state.insurerBranchesError = action.payload;
      })
      
      // 🔹 Fetch Insurer Branch By ID
      .addCase(fetchInsurerBranchById.pending, (state) => {
        state.insurerBranchesLoading = true;
        state.loading = true;
        state.error = null;
        state.insurerBranchesError = null;
        state.insurerBranch = null;
      })
      .addCase(fetchInsurerBranchById.fulfilled, (state, action) => {
        state.insurerBranchesLoading = false;
        state.loading = false;
        state.insurerBranch = action.payload;
        state.insurerBranchesError = null;
        state.error = null;
      })
      .addCase(fetchInsurerBranchById.rejected, (state, action) => {
        state.insurerBranchesLoading = false;
        state.loading = false;
        state.insurerBranchesError = action.payload;
        state.insurerBranch = null;
      })
      
      // 🔹 Fetch Insurer Branches By Type
      .addCase(fetchInsurerBranchesByType.pending, (state) => {
        state.insurerBranchesLoading = true;
        state.loading = true;
        state.error = null;
        state.insurerBranchesError = null;
      })
      .addCase(fetchInsurerBranchesByType.fulfilled, (state, action) => {
        state.insurerBranchesLoading = false;
        state.loading = false;
        state.insurerBranches = action.payload;
        state.insurerBranchesError = null;
        state.error = null;
      })
      .addCase(fetchInsurerBranchesByType.rejected, (state, action) => {
        state.insurerBranchesLoading = false;
        state.loading = false;
        state.insurerBranchesError = action.payload;
      })
      
      // 🔹 Create Insurer Branch
      .addCase(createInsurerBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.insurerBranchesError = null;
        state.insurerBranchSuccess = false;
        state.success = false;
        state.createError = null;
      })
      .addCase(createInsurerBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.insurerBranchSuccess = true;
        state.success = true;
        state.insurerBranchEditSuccess = false;
        state.editSuccess = false;
        state.insurerBranches.push(action.payload);
        state.insurerBranchesError = null;
        state.error = null;
        state.createError = null;
      })
      .addCase(createInsurerBranch.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload;
      })
      
      // 🔹 Update Insurer Branch
      .addCase(updateInsurerBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.insurerBranchesError = null;
        state.insurerBranchEditSuccess = false;
        state.editSuccess = false;
        state.insurerBranchSuccess = false;
        state.success = false;
        state.editError = null;
      })
      .addCase(updateInsurerBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.insurerBranchEditSuccess = true;
        state.editSuccess = true;
        state.insurerBranches = state.insurerBranches.map((branch) =>
          branch.id === action.payload.id ? action.payload : branch
        );
        state.insurerBranchesError = null;
        state.error = null;
        state.editError = null;
      })
      .addCase(updateInsurerBranch.rejected, (state, action) => {
        state.loading = false;
        state.editError = action.payload;
      })
      
      // 🔹 Delete Insurer Branch
      .addCase(deleteInsurerBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.insurerBranchesError = null;
      })
      .addCase(deleteInsurerBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.insurerBranches = state.insurerBranches.filter(
          (branch) => branch.id !== action.payload
        );
        state.insurerBranchesError = null;
        state.error = null;
      })
      .addCase(deleteInsurerBranch.rejected, (state, action) => {
        state.loading = false;
        state.insurerBranchesError = action.payload;
      })
      
      // 🔹 Fetch Insurer Branch By Company ID
      .addCase(fetchInsurerBranchByCompanyId.pending, (state) => {
        state.insurerBranchesLoading = true;
        state.loading = true;
        state.error = null;
        state.insurerBranchesError = null;
      })
      .addCase(fetchInsurerBranchByCompanyId.fulfilled, (state, action) => {
        state.insurerBranchesLoading = false;
        state.loading = false;
        state.insurerCompanyBranches = action.payload;
        state.insurerBranchesError = null;
        state.error = null;
      })
      .addCase(fetchInsurerBranchByCompanyId.rejected, (state, action) => {
        state.insurerBranchesLoading = false;
        state.loading = false;
        state.insurerBranchesError = action.payload;
      })
      
      // 🔹 Fetch Insurer Branch Managers
      .addCase(fetchInsurerBranchManagers.pending, (state) => {
        state.insurerBranchManagersLoading = true;
        state.loading = true;
        state.error = null;
        state.insurerBranchManagersError = null;
      })
      .addCase(fetchInsurerBranchManagers.fulfilled, (state, action) => {
        state.insurerBranchManagersLoading = false;
        state.loading = false;
        state.insurerBranchManagers = action.payload;
        state.insurerBranchManagersError = null;
        state.error = null;
      })
      .addCase(fetchInsurerBranchManagers.rejected, (state, action) => {
        state.insurerBranchManagersLoading = false;
        state.loading = false;
        state.insurerBranchManagersError = action.payload;
      })
      
      // 🔹 Fetch Insurer Branch Manager By ID
      .addCase(fetchInsurerBranchManagerById.pending, (state) => {
        state.insurerBranchManagersLoading = true;
        state.error = null;
        state.insurerBranchManagersError = null;
        state.success = false;
        state.editSuccess = false;
        state.insurerBranchManager = null;
      })
      .addCase(fetchInsurerBranchManagerById.fulfilled, (state, action) => {
        state.insurerBranchManagersLoading = false;
        state.insurerBranchManager = action.payload;
        state.insurerBranchManagersError = null;
        state.error = null;
      })
      .addCase(fetchInsurerBranchManagerById.rejected, (state, action) => {
        state.insurerBranchManagersLoading = false;
        state.insurerBranchManagersError = action.payload;
        state.insurerBranchManager = null;
      })
      
      // 🔹 Fetch Insurer Branch Manager By Branch ID
      .addCase(fetchInsurerBranchManagerByBranchId.pending, (state) => {
        state.insurerBranchManagersLoading = true;
        state.loading = true;
        state.error = null;
        state.insurerBranchManagersError = null;
        state.success = false;
        state.editSuccess = false;
        state.insurerBranchManagers = [];
      })
      .addCase(fetchInsurerBranchManagerByBranchId.fulfilled, (state, action) => {
        state.insurerBranchManagersLoading = false;
        state.loading = false;
        state.insurerBranchManagers = action.payload;
        state.insurerBranchManagersError = null;
        state.error = null;
      })
      .addCase(fetchInsurerBranchManagerByBranchId.rejected, (state, action) => {
        state.insurerBranchManagersLoading = false;
        state.loading = false;
        state.insurerBranchManagersError = action.payload;
      })
      
      // 🔹 Create Insurer Branch Manager
      .addCase(createInsurerBranchManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.insurerBranchManagersError = null;
        state.insurerBranchManagerSuccess = false;
        state.success = false;
        state.editSuccess = false;
      })
      .addCase(createInsurerBranchManager.fulfilled, (state, action) => {
        state.loading = false;
        state.insurerBranchManagerSuccess = true;
        state.success = true;
        state.editSuccess = false;
        state.insurerBranchManagers.push(action.payload);
        state.insurerBranchManagersError = null;
        state.error = null;
      })
      .addCase(createInsurerBranchManager.rejected, (state, action) => {
        state.loading = false;
        state.insurerBranchManagersError = action.payload;
      })
      
      // 🔹 Update Insurer Branch Manager
      .addCase(updateInsurerBranchManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.insurerBranchManagersError = null;
        state.insurerBranchManagerEditSuccess = false;
        state.editSuccess = false;
        state.insurerBranchManagerSuccess = false;
        state.success = false;
      })
      .addCase(updateInsurerBranchManager.fulfilled, (state, action) => {
        state.loading = false;
        state.insurerBranchManagerEditSuccess = true;
        state.editSuccess = true;
        state.insurerBranchManagers = state.insurerBranchManagers.map((branchManager) =>
          branchManager.id === action.payload.id ? action.payload : branchManager
        );
        state.insurerBranchManagersError = null;
        state.error = null;
      })
      .addCase(updateInsurerBranchManager.rejected, (state, action) => {
        state.loading = false;
        state.insurerBranchManagersError = action.payload;
      })
      
      // 🔹 Delete Insurer Branch Manager
      .addCase(deleteInsurerBranchManager.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.insurerBranchManagersError = null;
      })
      .addCase(deleteInsurerBranchManager.fulfilled, (state, action) => {
        state.loading = false;
        state.insurerBranchManagers = state.insurerBranchManagers.filter(
          (branchManager) => branchManager.id !== action.payload
        );
        state.insurerBranchManagersError = null;
        state.error = null;
      })
      .addCase(deleteInsurerBranchManager.rejected, (state, action) => {
        state.loading = false;
        state.insurerBranchManagersError = action.payload;
      })
      
      // 🔹 Fetch Insurance Companies
      .addCase(fetchInsuranceCompanies.pending, (state) => {
        state.insuranceCompaniesLoading = true;
        state.loading = true;
        state.error = null;
        state.insuranceCompaniesError = null;
        state.success = false;
      })
      .addCase(fetchInsuranceCompanies.fulfilled, (state, action) => {
        state.insuranceCompaniesLoading = false;
        state.loading = false;
        state.insuranceCompanies = action.payload;
        state.insuranceCompaniesError = null;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchInsuranceCompanies.rejected, (state, action) => {
        state.insuranceCompaniesLoading = false;
        state.loading = false;
        state.insuranceCompaniesError = action.payload;
      })
      
      // 🔹 Fetch Insurance Company By ID
      .addCase(fetchInsuranceCompanyById.pending, (state) => {
        state.insuranceCompaniesLoading = true;
        state.loading = true;
        state.error = null;
        state.insuranceCompaniesError = null;
        state.insuranceCompany = null;
      })
      .addCase(fetchInsuranceCompanyById.fulfilled, (state, action) => {
        state.insuranceCompaniesLoading = false;
        state.loading = false;
        state.insuranceCompany = action.payload;
        state.insuranceCompaniesError = null;
        state.error = null;
        state.createError = null;
      })
      .addCase(fetchInsuranceCompanyById.rejected, (state, action) => {
        state.insuranceCompaniesLoading = false;
        state.loading = false;
        state.insuranceCompaniesError = action.payload;
        state.insuranceCompany = null;
      })
      
      // 🔹 Fetch Insurance Companies By Type
      .addCase(fetchInsuranceCompaniesByType.pending, (state) => {
        state.insuranceCompaniesLoading = true;
        state.loading = true;
        state.error = null;
        state.insuranceCompaniesError = null;
        state.insuranceByTypeCompanies = [];
      })
      .addCase(fetchInsuranceCompaniesByType.fulfilled, (state, action) => {
        state.insuranceCompaniesLoading = false;
        state.loading = false;
        state.insuranceByTypeCompanies = action.payload;
        state.insuranceCompaniesError = null;
        state.error = null;
      })
      .addCase(fetchInsuranceCompaniesByType.rejected, (state, action) => {
        state.insuranceCompaniesLoading = false;
        state.loading = false;
        state.insuranceCompaniesError = action.payload;
      })
      
      // 🔹 Create Insurance Company
      .addCase(createInsuranceCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.insuranceCompaniesError = null;
        state.insuranceCompanySuccess = false;
        state.success = false;
        state.editSuccess = false;
        state.createError = null;
        state.editError = null;
      })
      .addCase(createInsuranceCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.insuranceCompanySuccess = true;
        state.success = true;
        state.editSuccess = false;
        state.insuranceCompanies.push(action.payload);
        state.insuranceCompaniesError = null;
        state.error = null;
        state.createError = null;
      })
      .addCase(createInsuranceCompany.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload;
      })
      
      // 🔹 Update Insurance Company
      .addCase(updateInsuranceCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.insuranceCompaniesError = null;
        state.insuranceCompanySuccess = false;
        state.success = false;
        state.insuranceCompanyEditSuccess = false;
        state.editSuccess = false;
        state.createError = null;
        state.editError = null;
      })
      .addCase(updateInsuranceCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.insuranceCompanyEditSuccess = true;
        state.editSuccess = true;
        state.insuranceCompanies = state.insuranceCompanies.map((insuranceCompany) =>
          insuranceCompany.id === action.payload.id ? action.payload : insuranceCompany
        );
        state.insuranceCompaniesError = null;
        state.error = null;
        state.editError = null;
      })
      .addCase(updateInsuranceCompany.rejected, (state, action) => {
        state.loading = false;
        state.editError = action.payload;
      })
      
      // 🔹 Delete Insurance Company
      .addCase(deleteInsuranceCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.insuranceCompaniesError = null;
      })
      .addCase(deleteInsuranceCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.insuranceCompanies = state.insuranceCompanies.filter(
          (insuranceCom) => insuranceCom.id !== action.payload
        );
        state.insuranceCompaniesError = null;
        state.error = null;
      })
      .addCase(deleteInsuranceCompany.rejected, (state, action) => {
        state.loading = false;
        state.insuranceCompaniesError = action.payload;
      });
  },
});

export const { clearError, resetInsurerState } = insurerSlice.actions;
export default insurerSlice.reducer;