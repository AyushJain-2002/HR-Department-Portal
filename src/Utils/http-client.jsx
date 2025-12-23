import axiosInstance from "../api/axiosInstance";
import { API_CONFIG } from "../api/Api_Config";
import { ApiError } from "../utils/error-handler";
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

    const config = {
      url,
      method,
      data: body,
      params: options?.params || null,
      headers: {
        // ✅ IMPORTANT: Let browser set multipart boundary
        ...(isFormData ? {} : { "Content-Type": "application/json" }),

        ...(this.authToken && !url.includes("/login") && {
          Authorization: `Bearer ${this.authToken}`,
        }),

        ...options?.headers,
      },
      timeout: API_CONFIG.REQUEST_TIMEOUT,
    };

    if (shouldLogRequest(endpoint, method)) {
      logger.logRequest(
        method,
        endpoint,
        sanitizeLogData(config.data)
      );
    }

    try {
      const response = await this.client(config);
      const duration = Date.now() - startTime;

      if (shouldLogRequest(endpoint, method)) {
        logger.logResponse(
          method,
          endpoint,
          response.status,
          sanitizeLogData(response.data),
          duration
        );
      }

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
        error?.response?.data?.message || error.message || "Network Error",
        error?.response?.status || 0
      );
    }
  }

  get(endpoint, params) {
    return this.request(endpoint, { method: "GET", params });
  }

  post(endpoint, data) {
    return this.request(endpoint, { method: "POST", body: data });
  }

  put(endpoint, data) {
    return this.request(endpoint, { method: "PUT", body: data });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

export default HttpClient;






// import axiosInstance from "../api/axiosInstance";
// import { API_CONFIG } from "../api/Api_Config";
// import { ApiError } from '../utils/error-handler';
// import  logger from '../api/Logger';
// import {
//   shouldLogRequest,
//   sanitizeLogData,
//   LOGGING_CONFIG,
// } from '../api/loggingconfig';
// export class HttpClient {
//   static instance = null;

//   constructor() {
//     this.client = axiosInstance
//     this.authToken = null;
//     this.user = null;
//     // this.cache = new Map();
//     this.retryCount = 2;
//   }

//   static getInstance() {
//     if (!HttpClient.instance) {
//       HttpClient.instance = new HttpClient();
//     }
//     return HttpClient.instance;
//   }

//   setAuthData(authToken, user) {
//     this.authToken = authToken;
//     this.user = user;
//     // this.macAddress = macAddress;
//   }

//   clearAuthData() {
//     // Cookies.remove("token");
//     // Cookies.remove("user");
//     this.authToken = null;
//     this.user = null;
//     // this.macAddress = null;
//   }

//   async request(endpoint, options = {}) {
//     const url = `${endpoint}`; 
//     const method = options.method || 'GET';
//     const startTime = Date.now();
//     const content= options?.content?.contentType ||'application/json';
//     // console.log(`in client options is ${options.content.contentType}`)
//     const config = {
//       url,
//       method,
//       data: options.body || options.data || null, // FIXED: axios uses 'data'
//       params: options?.params || null,
//       headers: {
//         // 'Content-Type': content,
//         // Accept: 'application/json',
//         // Only add auth if token exists AND it's not a login endpoint
//         ...(this.authToken && !url.includes('/login') && { 
//           Authorization: `Bearer ${this.authToken}` 
//         }),
//         // ...(this.user && { user: this.user }),
//         ...options?.headers,
//       },
//        timeout: API_CONFIG.REQUEST_TIMEOUT,
//     };
//     // console.log("httpclient config",config)
//     if (shouldLogRequest(endpoint, method)) {
//       logger.logRequest(
//         method,
//         endpoint,
//         // LOGGING_CONFIG.LOG_REQUEST_BODY ? sanitizeLogData(config.data) : undefined,
//         sanitizeLogData(config.data),
//         // LOGGING_CONFIG.LOG_HEADERS ? sanitizeLogData(config.headers) : undefined
//       );
//     }

//     // const controller = new AbortController();
//     // const timeoutId = setTimeout(() => controller.abort(), this.timeout);
//     console.log("Full Request Details:", {
//       url,
//       method,
//       data: config.data,
//       headers: config.headers,
//       fullConfig: config
//     });

//     try {
//       const response = await this.client(config);
//       console.log("in tryblock httpclient",response)
//       const duration = Date.now() - startTime;

//       if (shouldLogRequest(endpoint, method)) {
//         logger.logResponse(
//           method,
//           endpoint,
//           response.status,
//           sanitizeLogData(response.data),
//           duration
//         );
//       }
      
//       return {
//         data: response.data,
//         status: response.status,
//       };
//     } catch (error) {
//       const duration = Date.now() - startTime;
//       console.log("response in error clelnt",response)

//       if (LOGGING_CONFIG.LOG_ALL_ERRORS) {
//         logger.logError(method, endpoint, error, duration);
//       }
//        // 🔹 ADDED: Log response data for debugging
//       console.log("Server Error Details:", {
//         status: error?.response?.status,
//         data: error?.response?.data,
//         headers: error?.response?.headers
//       });

//       throw new ApiError(
//         error?.response?.data?.message || error.message || "Network Error", 
//         error?.response?.status || 0
//       );
//       // throw new ApiError(error.message || "Network Error", error?.response?.status || 0);
//     }
//   }

//   get(endpoint, params) {
//     return this.request(endpoint, { method: "GET", params });
//   }

//   post(endpoint, data,contentType) {
//     console.log("post called",data)
//     return this.request(endpoint, { method: "POST", body: data,content:contentType });
//   }

//   put(endpoint, data) {
//     return this.request(endpoint, { method: "PUT", body: data });
//   }

//   delete(endpoint) {
//     return this.request(endpoint, { method: "DELETE" });
//   }
// }
//       // clearTimeout(timeoutId);

//       // if (!response.ok) {
//       //   const errorText = await response.text();

//       //   if (shouldLogRequest(endpoint, method)) {
//       //     logger.logResponse(method, endpoint, response.status, errorText, duration);
//       //   }

//       //   throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status);
//       // }

//       // const data = await response.json();

//       // if (shouldLogRequest(endpoint, method)) {
//       //   logger.logResponse(
//       //     method,
//       //     endpoint,
//       //     response.status,
//       //     LOGGING_CONFIG.LOG_RESPONSE_BODY ? sanitizeLogData(data) : undefined,
//       //     Date.now() - startTime
//       //   );
//       // }

// //       return {
// //         data,
// //         status: response.status,
// //       };
// //     } catch (error) {
// //       clearTimeout(timeoutId);
// //       const duration = Date.now() - startTime;

// //       if (shouldLogRequest(endpoint, method) && LOGGING_CONFIG.LOG_ALL_ERRORS) {
// //         logger.logError(method, endpoint, error, duration);
// //       }

// //       if (error instanceof ApiError) {
// //         throw error;
// //       }

// //       throw new ApiError(error.message || 'Network error', 0);
// //     }
// //   }

// //   async get(endpoint) {
// //     return this.request(endpoint, { method: 'GET' });
// //   }

// //   async post(endpoint, data) {
// //     return this.request(endpoint, {
// //       method: 'POST',
// //       body: data ? JSON.stringify(data) : undefined,
// //     });
// //   }

// //   async put(endpoint, data) {
// //     return this.request(endpoint, {
// //       method: 'PUT',
// //       body: data ? JSON.stringify(data) : undefined,
// //     });
// //   }

// //   async delete(endpoint) {
// //     return this.request(endpoint, { method: 'DELETE' });
// //   }
// // }
