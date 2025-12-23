// hooks/useGroup.js
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchGroups,
  fetchGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  fetchSubgroups,
  fetchSubgroupById,
  createSubgroup,
  updateSubgroup,
  deleteSubgroup,
  clearError,
  resetGroupState
} from "../store/NewReducers/GroupSlice";
import { useLogger } from "./useLogger";

export const useGroup = () => {
  const dispatch = useDispatch();
  const groupState = useSelector((state) => state.groups);
  const logger = useLogger("useGroup");

  const handleFetchGroups = () => {
    logger.info("Fetch groups attempt");
    return dispatch(fetchGroups());
  };

  const handleFetchGroupById = (id) => {
    logger.info("Fetch group by ID attempt", { groupId: id });
    return dispatch(fetchGroupById(id));
  };

  const handleCreateGroup = (groupData) => {
    logger.info("Create group attempt", { 
      groupName: groupData.name,
      groupCode: groupData.code 
    });
    return dispatch(createGroup(groupData));
  };

  const handleUpdateGroup = (id, groupData) => {
    logger.info("Update group attempt", { groupId: id });
    return dispatch(updateGroup({ id, groupData }));
  };

  const handleDeleteGroup = (id) => {
    logger.info("Delete group attempt", { groupId: id });
    return dispatch(deleteGroup(id));
  };

  const handleFetchSubgroups = () => {
    logger.info("Fetch subgroups attempt");
    return dispatch(fetchSubgroups());
  };

  const handleFetchSubgroupById = (id) => {
    logger.info("Fetch subgroup by ID attempt", { subgroupId: id });
    return dispatch(fetchSubgroupById(id));
  };

  const handleCreateSubgroup = (subgroupData) => {
    logger.info("Create subgroup attempt", { 
      subgroupName: subgroupData.name,
      groupId: subgroupData.group_id 
    });
    return dispatch(createSubgroup(subgroupData));
  };

  const handleUpdateSubgroup = (id, subgroupData) => {
    logger.info("Update subgroup attempt", { subgroupId: id });
    return dispatch(updateSubgroup({ id, subgroupData }));
  };

  const handleDeleteSubgroup = (id) => {
    logger.info("Delete subgroup attempt", { subgroupId: id });
    return dispatch(deleteSubgroup(id));
  };

  const handleClearError = () => {
    logger.info("Clear group errors");
    dispatch(clearError());
  };

  const handleResetGroupState = () => {
    logger.info("Reset group state");
    dispatch(resetGroupState());
  };

  return {
    // State
    groupState,
    
    // Group Data
    groups: groupState.groups,
    currentGroup: groupState.group,
    groupsLoading: groupState.groupsLoading,
    groupsError: groupState.groupsError,
    groupsSuccess: groupState.groupsSuccess,
    groupsEditSuccess: groupState.groupsEditSuccess,
    
    // Subgroup Data
    subgroups: groupState.subgroups,
    currentSubgroup: groupState.subgroup,
    subgroupsLoading: groupState.subgroupsLoading,
    subgroupsError: groupState.subgroupsError,
    subgroupsSuccess: groupState.subgroupsSuccess,
    subgroupsEditSuccess: groupState.subgroupsEditSuccess,
    
    // Common Loading States
    loading: groupState.loading,
    
    // Common States
    error: groupState.error,
    success: groupState.success,
    editSuccess: groupState.editSuccess,
    
    // Group Actions
    fetchGroups: handleFetchGroups,
    fetchGroupById: handleFetchGroupById,
    createGroup: handleCreateGroup,
    updateGroup: handleUpdateGroup,
    deleteGroup: handleDeleteGroup,
    
    // Subgroup Actions
    fetchSubgroups: handleFetchSubgroups,
    fetchSubgroupById: handleFetchSubgroupById,
    createSubgroup: handleCreateSubgroup,
    updateSubgroup: handleUpdateSubgroup,
    deleteSubgroup: handleDeleteSubgroup,
    
    // Utility Actions
    clearError: handleClearError,
    resetGroupState: handleResetGroupState,
  };
};