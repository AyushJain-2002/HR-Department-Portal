// services/salesSummaryService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class SalesSummaryService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!SalesSummaryService.instance) {
      SalesSummaryService.instance = new SalesSummaryService();
    }
    return SalesSummaryService.instance;
  }

  // 🔹 Fetch sales summary with filters
  async fetchSalesSummary(filters) {
    try {
      const payload = {
        datetype: filters.datetype,
        from: filters.from,
        to: filters.to,
        branch: filters.branch,
        bqp: filters.bqp,
        relationship_manager: filters.relationship_manager,
        posp: filters.posp,
      };

      return await withRetry(() =>
        this.httpClient.post(
          ENDPOINTS.SALES_SUMMARY.FETCH_SUMMARY, 
          payload
        )
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "SalesSummaryService.fetchSalesSummary");
    }
  }

  // 🔹 Fetch default sales summary (current month)
  async fetchDefaultSalesSummary() {
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
          ENDPOINTS.SALES_SUMMARY.FETCH_SUMMARY, 
          payload
        )
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "SalesSummaryService.fetchDefaultSalesSummary");
    }
  }
}