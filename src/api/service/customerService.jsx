// services/customerService.js
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../Utils/error-handler';
import logger from '../Logger';

export class CustomerService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
  }

  // 🔹 Fetch all customers
  async fetchAllCustomers() {
    try {
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.CUSTOMERS.GET_ALL_CUSTOMERS)
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "CustomerService.fetchAllCustomers");
    }
  }

  // 🔹 Fetch customer by ID
  async fetchCustomerById(id) {
    try {
      if (!id) {
        throw new Error("Customer ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.CUSTOMERS.GET_CUSTOMER_BY_ID(id))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "CustomerService.fetchCustomerById");
    }
  }

  // 🔹 Create a new customer
  async createCustomer(customerData) {
    try {
      if (!customerData) {
        throw new Error("Customer data is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.CUSTOMERS.CREATE_CUSTOMER, customerData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "CustomerService.createCustomer");
    }
  }

  // 🔹 Update a customer
  async updateCustomer(id, customerData) {
    try {
      if (!id) {
        throw new Error("Customer ID is required");
      }
      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.CUSTOMERS.UPDATE_CUSTOMER(id), customerData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "CustomerService.updateCustomer");
    }
  }

  // 🔹 Toggle customer status
  async toggleCustomerStatus(customerId) {
    try {
      if (!customerId) {
        throw new Error("Customer ID is required");
      }
      return await withRetry(() =>
        this.httpClient.get(ENDPOINTS.CUSTOMERS.TOGGLE_CUSTOMER_STATUS(customerId))
      );
    } catch (error) {
      throw ErrorHandler.handle(error, "CustomerService.toggleCustomerStatus");
    }
  }
}