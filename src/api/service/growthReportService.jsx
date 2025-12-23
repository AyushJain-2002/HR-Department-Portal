// services/GrowthReportService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../utils/error-handler';
import logger from '../Logger';

export class GrowthReportService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!GrowthReportService.instance) {
      GrowthReportService.instance = new GrowthReportService();
    }
    return GrowthReportService.instance;
  }

  // 🔹 Fetch growth reports with filters
  async fetchGrowthReports(filters) {
    try {
      if (!filters) {
        throw new Error("Filters are required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.GROWTH_REPORTS.GET_GROWTH_REPORTS, filters)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GrowthReportService.fetchGrowthReports");
    }
  }

  // 🔹 Fetch default growth reports (current month)
  async fetchDefaultGrowthReports() {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      
      const filters = {
        datetype: "entry_date",
        policy_date_type: "between_date",
        from: `${year}-${month}-01`,
        to: `${year}-${month}-${day}`,
      };
      
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.GROWTH_REPORTS.GET_DEFAULT_GROWTH_REPORTS, filters)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "GrowthReportService.fetchDefaultGrowthReports");
    }
  }
}