// services/groupService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class GroupService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!GroupService.instance) {
      GroupService.instance = new GroupService();
    }
    return GroupService.instance;
  }

  // 🔹 Fetch all groups
  async fetchGroups() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.GROUPS.GET_GROUPS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.fetchGroups");
    }
  }

  // 🔹 Fetch group by ID
  async fetchGroupById(id) {
    try {
      if (!id) {
        throw new Error("Group ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.GROUPS.GET_GROUP_BY_ID(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.fetchGroupById");
    }
  }

  // 🔹 Create a new group
  async createGroup(groupData) {
    try {
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.GROUPS.CREATE_GROUP, groupData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.createGroup");
    }
  }

  // 🔹 Update a group
  async updateGroup(id, groupData) {
    try {
      if (!id) {
        throw new Error("Group ID is required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.GROUPS.UPDATE_GROUP(id), groupData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.updateGroup");
    }
  }

  // 🔹 Delete a group
  async deleteGroup(id) {
    try {
      if (!id) {
        throw new Error("Group ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.GROUPS.DELETE_GROUP(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.deleteGroup");
    }
  }

  // 🔹 Fetch all subgroups
  async fetchSubgroups() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.GROUPS.GET_SUBGROUPS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.fetchSubgroups");
    }
  }

  // 🔹 Fetch subgroup by ID
  async fetchSubgroupById(id) {
    try {
      if (!id) {
        throw new Error("Subgroup ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.GROUPS.GET_SUBGROUP_BY_ID(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.fetchSubgroupById");
    }
  }

  // 🔹 Create a new subgroup
  async createSubgroup(subgroupData) {
    try {
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.GROUPS.CREATE_SUBGROUP, subgroupData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.createSubgroup");
    }
  }

  // 🔹 Update a subgroup
  async updateSubgroup(id, subgroupData) {
    try {
      if (!id) {
        throw new Error("Subgroup ID is required");
      }
      return await withRetry(() =>
        this.httpClient.put(ENDPOINTS.GROUPS.UPDATE_SUBGROUP(id), subgroupData)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.updateSubgroup");
    }
  }

  // 🔹 Delete a subgroup
  async deleteSubgroup(id) {
    try {
      if (!id) {
        throw new Error("Subgroup ID is required");
      }
      return await withRetry(() =>
        this.httpClient.delete(ENDPOINTS.GROUPS.DELETE_SUBGROUP(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GroupService.deleteSubgroup");
    }
  }
}