import { HttpClient } from '../Utils/http-client.jsx';
import AuthManager from './interceptors/auth.jsx';

// Services (Singletons)
import { AuthService} from './service/auth.service.jsx';
import {EmployeeService} from "./service/employeeService.jsx";
import { ErrorHandler } from '../utils/error-handler.jsx';
import * as Types from './types/index.jsx';
import { StateService } from './service/stateService.jsx';
import { OperationService } from './service/operationService.jsx';
import { DepartmentService } from './service/DepartmentService.jsx';
import { AddonService } from './service/addOnService.jsx';
import { CustomerService } from './service/customerService.jsx';
import { BranchService } from './service/branchService.jsx';
import {FuelService} from "./service/fuelService.jsx"
import { GroupService } from './service/groupService.jsx';
import { InsurerService } from './service/insurerBranchService.jsx';
import { InventoryService } from './service/inventoryService.jsx';
import { MispService } from './service/mispService.jsx';
// import { MotorService } from './service/motor.jsx';
import { OperationEntryReportsService } from './service/operationEntryReportService.jsx';
import { OpsBusinessReportsService } from './service/opsBuisnessReportService.jsx';
import { PolicyReferByService } from './service/policyReferByService.jsx';
import { RidersService } from './service/riderService.jsx';
import { SalesPersonService } from './service/salesPersonService.jsx';
import { SalesSummaryService } from './service/salesSummaryService.jsx';
import { ZonesService } from './service/zonesService.jsx';
import { AssignOfficialPospService } from './service/assignOfficialPospService.jsx';
class ApiClient {
  static instance = null;

  httpClient = null;
  authManager = null;

  // services
  auth = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
    this.authManager = AuthManager.getInstance();

    // Initialize service singletons
    this.auth = AuthService.getInstance();
    this.employee = EmployeeService.getInstance();
    this.states = StateService.getInstance();
    this.branches = BranchService.getInstance();
    this.fuels = FuelService.getInstance();
    this.operations = OperationService.getInstance();
    this.departments = DepartmentService.getInstance();
    this.addons = AddonService.getInstance();
    this.customers = CustomerService.getInstance();
    this.groups=GroupService.getInstance();
    this.insurers = InsurerService.getInstance();
    this.inventory= InventoryService.getInstance();
    this.misp = MispService.getInstance();
    // this.motor = MotorService.getInstance();
    this.operationEntryReports= OperationEntryReportsService.getInstance();
    this.opsBusinessReports = OpsBusinessReportsService.getInstance();
    this.policyReferBy= PolicyReferByService.getInstance();
    this.riders=RidersService.getInstance();
    this.salesPerson=SalesPersonService.getInstance();
    this.salesSummary=SalesSummaryService.getInstance();
    this.zones=ZonesService.getInstance();
    this.assignOfficialPosp = AssignOfficialPospService.getInstance();

    this.initializeAuth();
  }

  // Required for singleton
  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Initialize Authentication on App Load
   * Loads stored token & user and applies it to HttpClient
   */
  initializeAuth() {
    const token = this.authManager.getToken();
    const user = this.authManager.getUser();
    // console.log("initialize token",this.authManager)
    if (token && user) {
      this.httpClient.setAuthData(token, user);
    }
  }

  /**
   * Sync token & user between AuthManager and HttpClient
   */
setAuthData(token, user) {
    this.authManager.setAuthData(token, user);
    this.httpClient.setAuthData(token, user);
  }

  /**
   * Clears browser storage + HttpClient header auth
   */
  async clearAuth() {
    await this.authManager.clearAuth();
    this.httpClient.clearAuthData();
  }

  /**
   * Returns boolean
   */
  async isAuthenticated() {
    return this.authManager.isAuthenticated();
  }
}

// Export instance for web
export const apiClient = ApiClient.getInstance();

export { ErrorHandler, Types };
