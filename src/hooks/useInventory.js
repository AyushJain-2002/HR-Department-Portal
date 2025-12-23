// hooks/useInventory.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchInventories,
  fetchInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  clearError,
  resetInventoryState
} from "../store/NewReducers/InventorySlice";
import { useLogger } from "./useLogger";

export const useInventory = () => {
  const dispatch = useDispatch();
  const inventoryState = useSelector((state) => state.inventory);
  const logger = useLogger("useInventory");

  const handleFetchInventories = () => {
    logger.info("Fetch inventories attempt");
    return dispatch(fetchInventories());
  };

  const handleFetchInventoryById = (inventoryId) => {
    logger.info("Fetch inventory by ID attempt", { inventoryId });
    return dispatch(fetchInventoryById(inventoryId));
  };

  const handleCreateInventory = (inventoryData) => {
    logger.info("Create inventory attempt", { 
      inventoryName: inventoryData.name || inventoryData.item_name,
      inventoryCode: inventoryData.code || inventoryData.item_code
    });
    return dispatch(createInventory(inventoryData));
  };

  const handleUpdateInventory = (id, inventoryData) => {
    logger.info("Update inventory attempt", { inventoryId: id });
    return dispatch(updateInventory({ id, inventoryData }));
  };

  const handleDeleteInventory = (id) => {
    logger.info("Delete inventory attempt", { inventoryId: id });
    return dispatch(deleteInventory(id));
  };

  const handleClearError = () => {
    logger.info("Clear inventory errors");
    dispatch(clearError());
  };

  const handleResetInventoryState = () => {
    logger.info("Reset inventory state");
    dispatch(resetInventoryState());
  };

  return {
    // State
    inventoryState,
    
    // Data
    inventories: inventoryState.inventories,
    currentInventory: inventoryState.inventory,
    loading: inventoryState.loading,
    error: inventoryState.error,
    createError: inventoryState.createError,
    editError: inventoryState.editError,
    success: inventoryState.success,
    editSuccess: inventoryState.editSuccess,
    
    // Actions
    fetchInventories: handleFetchInventories,
    fetchInventoryById: handleFetchInventoryById,
    createInventory: handleCreateInventory,
    updateInventory: handleUpdateInventory,
    deleteInventory: handleDeleteInventory,
    
    // Utility Actions
    clearError: handleClearError,
    resetInventoryState: handleResetInventoryState,
  };
};