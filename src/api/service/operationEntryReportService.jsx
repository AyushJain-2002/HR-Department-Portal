// services/OperationEntryReportsService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../utils/error-handler';
import logger from '../Logger';

export class OperationEntryReportsService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!OperationEntryReportsService.instance) {
      OperationEntryReportsService.instance = new OperationEntryReportsService();
    }
    return OperationEntryReportsService.instance;
  }

  // 🔹 Fetch operation entry reports with filters
  async fetchOperationEntryReports(filters) {
    try {
      const { type, from, to, branch } = filters || {};
      
      if (!type || !from || !to) {
        throw new Error("Type, from date, and to date are required");
      }

      // Construct endpoint based on filters
      let endpoint = ENDPOINTS.OPERATION_ENTRY_REPORTS.FETCH_WITH_FILTERS(type, from, to);
      
      if (branch) {
        endpoint = ENDPOINTS.OPERATION_ENTRY_REPORTS.FETCH_WITH_BRANCH(type, from, to, branch);
      }

      return await withRetry(() =>
        this.httpClient.get(endpoint)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationEntryReportsService.fetchOperationEntryReports");
    }
  }

  // 🔹 Fetch default operation entry reports (current month)
  async fetchDefaultOperationEntryReports() {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const from = `${year}-${month}-01`; // First day of the month
      const to = `${year}-${month}-${day}`; // Current date
      const type = "entry_date"; // Default type

      const endpoint = ENDPOINTS.OPERATION_ENTRY_REPORTS.FETCH_WITH_FILTERS(type, from, to);

      return await withRetry(() =>
        this.httpClient.get(endpoint)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OperationEntryReportsService.fetchDefaultOperationEntryReports");
    }
  }
}