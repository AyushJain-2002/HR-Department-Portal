// services/SalesPersonService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../utils/error-handler';
import logger from '../Logger';

export class SalesPersonService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!SalesPersonService.instance) {
      SalesPersonService.instance = new SalesPersonService();
    }
    return SalesPersonService.instance;
  }

  // 🔹 Fetch sales person summary with filters
  async fetchSalesPersonSummary(filters) {
    try {
      const payload = {
        datetype: filters.datetype,
        from: filters.from,
        to: filters.to,
        branch: filters.branch,
        sales: filters.sales,
      };

      return await withRetry(() =>
        this.httpClient.post(
          ENDPOINTS.SALES_PERSON.FETCH_SUMMARY, 
          payload
        )
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "SalesPersonService.fetchSalesPersonSummary");
    }
  }

  // 🔹 Fetch default sales person summary (current month)
  async fetchDefaultSalesPersonSummary() {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      
      const payload = {
        datetype: "entry_date",
        from: `${year}-${month}-01`,
        to: `${year}-${month}-${day}`,
      };

      return await withRetry(() =>
        this.httpClient.post(
          ENDPOINTS.SALES_PERSON.FETCH_SUMMARY, 
          payload
        )
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "SalesPersonService.fetchDefaultSalesPersonSummary");
    }
  }

  // 🔹 Fetch sales employees list for dropdown
  async fetchSalesEmployees() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.SALES_PERSON.FETCH_EMPLOYEES)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "SalesPersonService.fetchSalesEmployees");
    }
  }
}