// hooks/useOperation.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchBqpTypes,
  fetchRelationshipManagersWithVertical,
  fetchRelationshipManager,
  fetchPospTypes,
  fetchPosp,
  fetchReferTypes,
  fetchMotorEmployee,
  fetchChequeData,
  fetchBqp,
  fetchReportingManager,
  fetchReportingManagerWithPosp,
  clearError,
  resetOperationState
} from "../store/NewReducers/OperationSlice";
import { useLogger } from "./useLogger";

export const useOperation = () => {
  const dispatch = useDispatch();
  const operationState = useSelector((state) => state.operation);
  // console.log("op state",operationState)
  const logger = useLogger("useOperation");
// console.log(operationState)
  const handleFetchBqpTypes = (verticalType) => {
    logger.info("Fetch BQP types attempt", { verticalType });
    return dispatch(fetchBqpTypes(verticalType));
  };

  const handleFetchRelationshipManagersWithVertical = (verticalType, bqpId) => {
    logger.info("Fetch relationship managers with vertical attempt", { 
      verticalType, 
      bqpId 
    });
    return dispatch(fetchRelationshipManagersWithVertical({ verticalType, bqpId }));
  };

  const handleFetchRelationshipManager = (id) => {
    logger.info("Fetch relationship manager attempt", { relationshipManagerId: id });
    return dispatch(fetchRelationshipManager(id));
  };

  const handleFetchPospTypes = (verticalType, rmid) => {
    logger.info("Fetch POSP types attempt", { verticalType, rmid });
    return dispatch(fetchPospTypes({ verticalType, rmid }));
  };

  const handleFetchPosp = (id) => {
    logger.info("Fetch POSP attempt", { pospId: id });
    return dispatch(fetchPosp(id));
  };

  const handleFetchReferTypes = (verticalType, pospId) => {
    logger.info("Fetch refer types attempt", { verticalType, pospId });
    return dispatch(fetchReferTypes({ verticalType, pospId }));
  };

  const handleFetchMotorEmployee = () => {
    logger.info("Fetch motor employees attempt");
    return dispatch(fetchMotorEmployee());
  };

  const handleFetchChequeData = (chequeNo) => {
    logger.info("Fetch cheque data attempt", { chequeNo });
    return dispatch(fetchChequeData(chequeNo));
  };

  const handleFetchBqp = () => {
    logger.info("Fetch BQP attempt");
    return dispatch(fetchBqp());
  };

  const handleFetchReportingManager = (id) => {
    logger.info("Fetch reporting manager attempt", { reportingManagerId: id });
    return dispatch(fetchReportingManager(id));
  };

  const handleFetchReportingManagerWithPosp = (id) => {
    logger.info("Fetch reporting manager with POSP attempt", { id });
    return dispatch(fetchReportingManagerWithPosp(id));
  };

  const handleClearError = () => {
    logger.info("Clear operation errors");
    dispatch(clearError());
  };

  const handleResetOperationState = () => {
    logger.info("Reset operation state");
    dispatch(resetOperationState());
  };

  return {
    // State
    operationState,
    
    // Data
    bqpTypes: operationState.bqpTypes,
    bqpList: operationState.bqpList,
    relationshipManagers: operationState.relationshipManagers,
    reportingManager: operationState.reportingManager,
    reportingManagerForPospMisp: operationState.reportingManagerForPospMisp,
    pospTypes: operationState.pospTypes,
    referTypes: operationState.referTypes,
    motorEmployee: operationState.motorEmployee,
    chequeData: operationState.chequeData,

    // Success States
    success: operationState.success,
    bqpTypesSuccess: operationState.bqpTypesSuccess,
    relationshipManagersSuccess: operationState.relationshipManagersSuccess,
    pospTypesSuccess: operationState.pospTypesSuccess,
    referTypesSuccess: operationState.referTypesSuccess,
    motorEmployeeSuccess: operationState.motorEmployeeSuccess,
    chequeDataSuccess: operationState.chequeDataSuccess,
    bqpSuccess: operationState.bqpSuccess,
    reportingManagerSuccess: operationState.reportingManagerSuccess,
    
    // Loading States
    loading: operationState.loading,
    bqpTypesLoading: operationState.bqpTypesLoading,
    relationshipManagersLoading: operationState.relationshipManagersLoading,
    pospTypesLoading: operationState.pospTypesLoading,
    referTypesLoading: operationState.referTypesLoading,
    motorEmployeeLoading: operationState.motorEmployeeLoading,
    chequeDataLoading: operationState.chequeDataLoading,
    bqpLoading: operationState.bqpLoading,
    reportingManagerLoading: operationState.reportingManagerLoading,
    
    // Error States
    error: operationState.error,
    bqpTypesError: operationState.bqpTypesError,
    relationshipManagersError: operationState.relationshipManagersError,
    pospTypesError: operationState.pospTypesError,
    referTypesError: operationState.referTypesError,
    motorEmployeeError: operationState.motorEmployeeError,
    chequeDataError: operationState.chequeDataError,
    bqpError: operationState.bqpError,
    reportingManagerError: operationState.reportingManagerError,
    
    // Actions
    fetchBqpTypes: handleFetchBqpTypes,
    fetchRelationshipManagersWithVertical: handleFetchRelationshipManagersWithVertical,
    fetchRelationshipManager: handleFetchRelationshipManager,
    fetchPospTypes: handleFetchPospTypes,
    fetchPosp: handleFetchPosp,
    fetchReferTypes: handleFetchReferTypes,
    fetchMotorEmployee: handleFetchMotorEmployee,
    fetchChequeData: handleFetchChequeData,
    fetchBqp: handleFetchBqp,
    fetchReportingManager: handleFetchReportingManager,
    fetchReportingManagerWithPosp: handleFetchReportingManagerWithPosp,
    
    // Utility Actions
    clearError: handleClearError,
    resetOperationState: handleResetOperationState,
  };
};