// import apiService from './ApiService';
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
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

    async createEmployee(userData) {
      try{
        // ✅ Convert to FormData if there are files
    const isFormData = Object.values(userData).some(value => value instanceof File);    
    let dataToSend = userData;    
    if (isFormData) {
      const formData = new FormData();
      // ✅ Add all fields to FormData
      Object.keys(userData).forEach(key => {
        const value = userData[key];
          if (value instanceof File) {
            formData.append(key, value);
            
          } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        // }
      });
  // ✅ DEBUG: Check FormData contents properly
      dataToSend = formData;
    }
    return await this.httpClient.post(ENDPOINTS.EMPLOYEE.CREATE_EMPLOYEE, dataToSend);
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
