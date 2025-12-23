// hooks/useInsurer.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchInsurerBranches,
  fetchInsurerBranchById,
  fetchInsurerBranchesByType,
  createInsurerBranch,
  updateInsurerBranch,
  deleteInsurerBranch,
  fetchInsurerBranchByCompanyId,
  
  fetchInsurerBranchManagers,
  fetchInsurerBranchManagerById,
  fetchInsurerBranchManagerByBranchId,
  createInsurerBranchManager,
  updateInsurerBranchManager,
  deleteInsurerBranchManager,
  
  fetchInsuranceCompanies,
  fetchInsuranceCompanyById,
  fetchInsuranceCompaniesByType,
  createInsuranceCompany,
  updateInsuranceCompany,
  deleteInsuranceCompany,
  
  clearError,
  resetInsurerState
} from "../store/NewReducers/InsurerBranchSlice";
import { useLogger } from "./useLogger";

export const useInsurer = () => {
  const dispatch = useDispatch();
  const insurerState = useSelector((state) => state.insurers);
  const logger = useLogger("useInsurer");

  // Insurer Branches Actions
  const handleFetchInsurerBranches = () => {
    logger.info("Fetch insurer branches attempt");
    return dispatch(fetchInsurerBranches());
  };

  const handleFetchInsurerBranchById = (insurerBranchId) => {
    logger.info("Fetch insurer branch by ID attempt", { insurerBranchId });
    return dispatch(fetchInsurerBranchById(insurerBranchId));
  };

  const handleFetchInsurerBranchesByType = (type) => {
    logger.info("Fetch insurer branches by type attempt", { type });
    return dispatch(fetchInsurerBranchesByType(type));
  };

  const handleCreateInsurerBranch = (branchData) => {
    logger.info("Create insurer branch attempt", { 
      branchName: branchData.name,
      branchCode: branchData.code 
    });
    return dispatch(createInsurerBranch(branchData));
  };

  const handleUpdateInsurerBranch = (id, branchData) => {
    logger.info("Update insurer branch attempt", { insurerBranchId: id });
    return dispatch(updateInsurerBranch({ id, branchData }));
  };

  const handleDeleteInsurerBranch = (id) => {
    logger.info("Delete insurer branch attempt", { insurerBranchId: id });
    return dispatch(deleteInsurerBranch(id));
  };

  const handleFetchInsurerBranchByCompanyId = (companyId) => {
    logger.info("Fetch insurer branches by company ID attempt", { companyId });
    return dispatch(fetchInsurerBranchByCompanyId(companyId));
  };

  // Insurer Branch Managers Actions
  const handleFetchInsurerBranchManagers = () => {
    logger.info("Fetch insurer branch managers attempt");
    return dispatch(fetchInsurerBranchManagers());
  };

  const handleFetchInsurerBranchManagerById = (branchId, index) => {
    logger.info("Fetch insurer branch manager by ID attempt", { branchId, index });
    return dispatch(fetchInsurerBranchManagerById({ branchId, index }));
  };

  const handleFetchInsurerBranchManagerByBranchId = (branchId) => {
    logger.info("Fetch insurer branch managers by branch ID attempt", { branchId });
    return dispatch(fetchInsurerBranchManagerByBranchId(branchId));
  };

  const handleCreateInsurerBranchManager = (managerData, id) => {
    logger.info("Create insurer branch manager attempt", { 
      managerName: managerData.name,
      branchId: id 
    });
    return dispatch(createInsurerBranchManager({ managerData, id }));
  };

  const handleUpdateInsurerBranchManager = (id, branchData) => {
    logger.info("Update insurer branch manager attempt", { branchManagerId: id });
    return dispatch(updateInsurerBranchManager({ id, branchData }));
  };

  const handleDeleteInsurerBranchManager = (managerId) => {
    logger.info("Delete insurer branch manager attempt", { managerId });
    return dispatch(deleteInsurerBranchManager(managerId));
  };

  // Insurance Companies Actions
  const handleFetchInsuranceCompanies = () => {
    logger.info("Fetch insurance companies attempt");
    return dispatch(fetchInsuranceCompanies());
  };

  const handleFetchInsuranceCompanyById = (companyId) => {
    logger.info("Fetch insurance company by ID attempt", { companyId });
    return dispatch(fetchInsuranceCompanyById(companyId));
  };

  const handleFetchInsuranceCompaniesByType = (type) => {
    logger.info("Fetch insurance companies by type attempt", { type });
    return dispatch(fetchInsuranceCompaniesByType(type));
  };

  const handleCreateInsuranceCompany = (companyData) => {
    logger.info("Create insurance company attempt", { 
      companyName: companyData.name,
      companyType: companyData.type 
    });
    return dispatch(createInsuranceCompany(companyData));
  };

  const handleUpdateInsuranceCompany = (id, companyData) => {
    logger.info("Update insurance company attempt", { companyId: id });
    return dispatch(updateInsuranceCompany({ id, companyData }));
  };

  const handleDeleteInsuranceCompany = (id) => {
    logger.info("Delete insurance company attempt", { companyId: id });
    return dispatch(deleteInsuranceCompany(id));
  };

  const handleClearError = () => {
    logger.info("Clear insurer errors");
    dispatch(clearError());
  };

  const handleResetInsurerState = () => {
    logger.info("Reset insurer state");
    dispatch(resetInsurerState());
  };

  return {
    // State
    insurerState,
    
    // Insurer Branches Data
    insurerBranches: insurerState.insurerBranches,
    insurerBranch: insurerState.insurerBranch,
    insurerCompanyBranches: insurerState.insurerCompanyBranches,
    insurerBranchesLoading: insurerState.insurerBranchesLoading,
    insurerBranchesError: insurerState.insurerBranchesError,
    insurerBranchSuccess: insurerState.insurerBranchSuccess,
    insurerBranchEditSuccess: insurerState.insurerBranchEditSuccess,
    
    // Insurer Branch Managers Data
    insurerBranchManagers: insurerState.insurerBranchManagers,
    insurerBranchManager: insurerState.insurerBranchManager,
    insurerBranchManagersLoading: insurerState.insurerBranchManagersLoading,
    insurerBranchManagersError: insurerState.insurerBranchManagersError,
    insurerBranchManagerSuccess: insurerState.insurerBranchManagerSuccess,
    insurerBranchManagerEditSuccess: insurerState.insurerBranchManagerEditSuccess,
    
    // Insurance Companies Data
    insuranceCompanies: insurerState.insuranceCompanies,
    insuranceCompany: insurerState.insuranceCompany,
    insuranceByTypeCompanies: insurerState.insuranceByTypeCompanies,
    insuranceCompaniesLoading: insurerState.insuranceCompaniesLoading,
    insuranceCompaniesError: insurerState.insuranceCompaniesError,
    insuranceCompanySuccess: insurerState.insuranceCompanySuccess,
    insuranceCompanyEditSuccess: insurerState.insuranceCompanyEditSuccess,
    
    // Common Loading States
    loading: insurerState.loading,
    insurerLoading: insurerState.insurerLoading,
    
    // Common Error States
    error: insurerState.error,
    createError: insurerState.createError,
    editError: insurerState.editError,
    
    // Common Success States
    success: insurerState.success,
    editSuccess: insurerState.editSuccess,
    
    // Insurer Branches Actions
    fetchInsurerBranches: handleFetchInsurerBranches,
    fetchInsurerBranchById: handleFetchInsurerBranchById,
    fetchInsurerBranchesByType: handleFetchInsurerBranchesByType,
    createInsurerBranch: handleCreateInsurerBranch,
    updateInsurerBranch: handleUpdateInsurerBranch,
    deleteInsurerBranch: handleDeleteInsurerBranch,
    fetchInsurerBranchByCompanyId: handleFetchInsurerBranchByCompanyId,
    
    // Insurer Branch Managers Actions
    fetchInsurerBranchManagers: handleFetchInsurerBranchManagers,
    fetchInsurerBranchManagerById: handleFetchInsurerBranchManagerById,
    fetchInsurerBranchManagerByBranchId: handleFetchInsurerBranchManagerByBranchId,
    createInsurerBranchManager: handleCreateInsurerBranchManager,
    updateInsurerBranchManager: handleUpdateInsurerBranchManager,
    deleteInsurerBranchManager: handleDeleteInsurerBranchManager,
    
    // Insurance Companies Actions
    fetchInsuranceCompanies: handleFetchInsuranceCompanies,
    fetchInsuranceCompanyById: handleFetchInsuranceCompanyById,
    fetchInsuranceCompaniesByType: handleFetchInsuranceCompaniesByType,
    createInsuranceCompany: handleCreateInsuranceCompany,
    updateInsuranceCompany: handleUpdateInsuranceCompany,
    deleteInsuranceCompany: handleDeleteInsuranceCompany,
    
    // Utility Actions
    clearError: handleClearError,
    resetInsurerState: handleResetInsurerState,
  };
};