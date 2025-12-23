// hooks/useCustomer.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAllCustomers,
  fetchCustomerById,
  createCustomer,
  updateCustomer,
  toggleCustomerStatus,
  clearError,
  resetCustomer
} from "../store/NewReducers/CustomerSlice";
import { useLogger } from "./useLogger";

export const useCustomer = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const logger = useLogger("useCustomer");

  const handleFetchAllCustomers = () => {
    logger.info("Fetch all customers attempt");
    return dispatch(fetchAllCustomers());
  };

  const handleFetchCustomerById = (id) => {
    logger.info("Fetch customer by ID attempt", { customerId: id });
    return dispatch(fetchCustomerById(id));
  };

  const handleCreateCustomer = (customerData) => {
    logger.info("Create customer attempt", { 
      customerName: customerData.name || customerData.email
    });
    return dispatch(createCustomer(customerData));
  };

  const handleUpdateCustomer = (id, customerData) => {
    logger.info("Update customer attempt", { customerId: id });
    return dispatch(updateCustomer({ id, customerData }));
  };

  const handleToggleCustomerStatus = (customerId) => {
    logger.info("Toggle customer status attempt", { customerId });
    return dispatch(toggleCustomerStatus(customerId));
  };

  const handleClearError = () => {
    logger.info("Clear customer errors");
    dispatch(clearError());
  };

  const handleResetCustomer = () => {
    logger.info("Reset customer state");
    dispatch(resetCustomer());
  };

  return {
    // State
    customerState,
    
    // Data
    allCustomers: customerState.allCustomer,
    currentCustomer: customerState.customer,
    loading: customerState.loading,
    toggleLoading: customerState.toggleLoading,
    error: customerState.error,
    createError: customerState.createError,
    success: customerState.success,
    createSuccess: customerState.createSuccess,
    message: customerState.message,
    
    // Actions
    fetchAllCustomers: handleFetchAllCustomers,
    fetchCustomerById: handleFetchCustomerById,
    createCustomer: handleCreateCustomer,
    updateCustomer: handleUpdateCustomer,
    toggleCustomerStatus: handleToggleCustomerStatus,
    
    // Utility Actions
    clearError: handleClearError,
    resetCustomer: handleResetCustomer,
  };
};