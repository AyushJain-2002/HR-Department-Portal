// services/OpsBusinessReportsService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../utils/error-handler';
import logger from '../Logger';

export class OpsBusinessReportsService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!OpsBusinessReportsService.instance) {
      OpsBusinessReportsService.instance = new OpsBusinessReportsService();
    }
    return OpsBusinessReportsService.instance;
  }

  // 🔹 Fetch OPS business reports with datetype and date
  async fetchOpsBusinessReports(datetype, date) {
    try {
      if (!datetype || !date) {
        throw new Error("Datetype and date are required");
      }

      const postData = {
        datetype,
        date,
      };

      return await withRetry(() =>
        this.httpClient.post(
          ENDPOINTS.OPS_BUSINESS_REPORTS.FETCH_OPS_BUSINESS_REPORTS, 
          postData
        )
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "OpsBusinessReportsService.fetchOpsBusinessReports");
    }
  }
}