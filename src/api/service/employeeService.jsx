// import apiService from './ApiService';
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../utils/error-handler';
import logger from '../Logger';

export class EmployeeService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!EmployeeService.instance) {
      EmployeeService.instance = new EmployeeService();
    }
    return EmployeeService.instance;
  }

  async fetchEmployee(employeeId) {
    return withRetry(() =>
      this.httpClient.post(ENDPOINTS.EMPLOYEE.GET_EMPLOYEE(id), employeeId)
    );
  }

    async fetchAllEmployees(params) {
    return withRetry(() =>
      this.httpClient.post(ENDPOINTS.EMPLOYEE.GET_EMPLOYEES, params)
    );
  }

    async createEmployee(userData,contentType) {
      try{
        return await this.httpClient.post(ENDPOINTS.EMPLOYEE.CREATE_EMPLOYEE, userData,contentType);
      }catch(error){
        throw ErrorHandler.handle(error,"EmployeeService.register");
      }
}

 
  async updateEmployee(id,data) {
    return withRetry(() =>
      this.httpClient.put(ENDPOINTS.EMPLOYEE.UPDATE_EMPLOYEE(id), data)
    );
  }

  async toggleEmployeeStatus(employeeId) {
    return withRetry(() =>
      this.httpClient.get(ENDPOINTS.EMPLOYEE.TOGGLE_EMPLOYEE(employeeId), employeeId)
    );
  }

}
