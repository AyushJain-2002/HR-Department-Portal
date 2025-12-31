//src/Utilis/http-client.jsx
import axiosInstance from "../api/axiosInstance";
import { API_CONFIG } from "../api/Api_Config";
import { ApiError } from "../Utils/error-handler";
import logger from "../api/Logger";
import {
  shouldLogRequest,
  sanitizeLogData,
  LOGGING_CONFIG,
} from "../api/loggingconfig";

export class HttpClient {
  static instance = null;

  constructor() {
    this.client = axiosInstance;
    this.authToken = null;
    this.user = null;
    this.retryCount = 2;
  }

  static getInstance() {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  setAuthData(authToken, user) {
    this.authToken = authToken;
    this.user = user;
  }

  clearAuthData() {
    this.authToken = null;
    this.user = null;
  }

  async request(endpoint, options = {}) {
    const url = endpoint;
    const method = options.method || "GET";
    const startTime = Date.now();

    const body = options.body || options.data || null;
    const isFormData = body instanceof FormData;
    // console.log("options",options)
    const config = {
      url,
      method,
      data: body,
      params: options?.params || null,
      headers: {
        // ✅ IMPORTANT: Let browser set multipart boundary
        // "Content-Type":`multipart/formdata`,

        ...(this.authToken && !url.includes("/login") && {
          Authorization: `Bearer ${this.authToken}`,
        }),
         // ✅ DON'T set Content-Type for FormData
      // Only set for JSON data
      ...(!isFormData && {
        'Content-Type': 'application/json'
      }),
        ...options?.headers,
      },
      timeout: API_CONFIG.REQUEST_TIMEOUT,
    };
    // console.log("config",config)
    try {
      // console.log("🚀 ~ HttpClient ~ request ~ config:", config)
      const response = await this.client(config);
      const duration = Date.now() - startTime;
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const duration = Date.now() - startTime;

      if (LOGGING_CONFIG.LOG_ALL_ERRORS) {
        logger.logError(method, endpoint, error, duration);
      }

      console.log("Server Error:", {
        status: error?.response?.status,
        data: error?.response?.data,
      });

      throw new ApiError(
        error?.response?.data|| "Something went wrong, Please try again after some time",
        error?.response?.data?.message || error.message || "Network Error",
        error?.response?.status || 0
      );
    }
  }

  get(endpoint, params) {
    return this.request(endpoint, { method: "GET", params });
  }

  post(endpoint, data) {
    return this.request(endpoint, { method: "POST", body: data});
  }

  put(endpoint, data) {
    return this.request(endpoint, { method: "PUT", body: data });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

export default HttpClient;
