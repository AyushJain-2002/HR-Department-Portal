// hooks/useBranch.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchBranches, 
  fetchBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
  fetchBranchManagers,
  fetchBranchManagerById,
  createBranchManager,
  updateBranchManager,
  deleteBranchManager,
  clearError,
  resetBranchState
} from "../store/NewReducers/BranchSlice";
import { useLogger } from "./useLogger";

export const useBranch = () => {
  const dispatch = useDispatch();
  const branchState = useSelector((state) => state.branches);
  const logger = useLogger("useBranch");

  const handleFetchBranches = () => {
    logger.info("Fetch branches attempt");
    return dispatch(fetchBranches());
  };

  const handleFetchBranchById = (id) => {
    logger.info("Fetch branch by ID attempt", { branchId: id });
    return dispatch(fetchBranchById(id));
  };

  const handleCreateBranch = (branchData) => {
    logger.info("Create branch attempt", { 
      branchName: branchData.name,
      branchCode: branchData.code 
    });
    return dispatch(createBranch(branchData));
  };

  const handleUpdateBranch = (id, branchData) => {
    logger.info("Update branch attempt", { branchId: id });
    return dispatch(updateBranch({ id, branchData }));
  };

  const handleDeleteBranch = (id) => {
    logger.info("Delete branch attempt", { branchId: id });
    return dispatch(deleteBranch(id));
  };

  const handleFetchBranchManagers = () => {
    logger.info("Fetch branch managers attempt");
    return dispatch(fetchBranchManagers());
  };

  const handleFetchBranchManagerById = (id) => {
    logger.info("Fetch branch manager by ID attempt", { branchManagerId: id });
    return dispatch(fetchBranchManagerById(id));
  };

  const handleCreateBranchManager = (branchManagerData) => {
    logger.info("Create branch manager attempt", { 
      name: branchManagerData.name,
      branchId: branchManagerData.branch_id 
    });
    return dispatch(createBranchManager(branchManagerData));
  };

  const handleUpdateBranchManager = (id, branchManagerData) => {
    logger.info("Update branch manager attempt", { branchManagerId: id });
    return dispatch(updateBranchManager({ id, branchManagerData }));
  };

  const handleDeleteBranchManager = (id) => {
    logger.info("Delete branch manager attempt", { branchManagerId: id });
    return dispatch(deleteBranchManager(id));
  };

  const handleClearError = () => {
    logger.info("Clear branch errors");
    dispatch(clearError());
  };

  const handleResetBranchState = () => {
    logger.info("Reset branch state");
    dispatch(resetBranchState());
  };

  return {
    // State
    branchState,
    
    // Branch Data
    branches: branchState.branches,
    currentBranch: branchState.branch,
    loading: branchState.loading,
    error: branchState.error,
    createError: branchState.createError,
    editError: branchState.editError,
    success: branchState.success,
    editSuccess: branchState.editSuccess,
    
    // Branch Manager Data
    branchManagers: branchState.branchManagers,
    currentBranchManager: branchState.branchManager,
    managerLoading: branchState.managerLoading,
    managerError: branchState.managerError,
    createBranchManagerError: branchState.createBranchManagerError,
    editBranchManagerError: branchState.editBranchManagerError,
    managerSuccess: branchState.managerSuccess,
    fetchBranchSuccess:branchState.fetchBranchSuccess,
    // Branch Actions
    fetchBranches: handleFetchBranches,
    fetchBranchById: handleFetchBranchById,
    createBranch: handleCreateBranch,
    updateBranch: handleUpdateBranch,
    deleteBranch: handleDeleteBranch,
    
    // Branch Manager Actions
    fetchBranchManagers: handleFetchBranchManagers,
    fetchBranchManagerById: handleFetchBranchManagerById,
    createBranchManager: handleCreateBranchManager,
    updateBranchManager: handleUpdateBranchManager,
    deleteBranchManager: handleDeleteBranchManager,
    
    // Utility Actions
    clearError: handleClearError,
    resetBranchState: handleResetBranchState,
  };
};