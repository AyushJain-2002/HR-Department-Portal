import axios from 'axios';
import { API_CONFIG } from './Api_Config';
import tokenManager from './TokenManager';
import logger from './Logger';
import AuthManager from './interceptors/auth';

// ✅ DO NOT set Content-Type here
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.REQUEST_TIMEOUT,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: API_CONFIG.ENABLE_CSRF,
});

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
  async (config) => {
    // console.log("Axios Request Config:", config);

    const requestId = `req_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    config.metadata = {
      requestId,
      startTime: Date.now(),
      url: config.url,
      method: config.method,
    };

    // 🔹 Skip auth for auth endpoints
    const isAuthEndpoint =
      config.url?.includes('/login') ||
      config.url?.includes('/register') ||
      config.url?.includes('/verify-token');

    if (!isAuthEndpoint) {
      const token = AuthManager.getInstance().getToken();
      if (token && !tokenManager.isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    logger.logRequest({
      id: requestId,
      method: config.method,
      url: config.url,
      headers: config.headers,
      data: config.data,
      params: config.params,
    });
    // console.log(config)
    return config;
  },
  (error) => {
    logger.error('Axios Request Interceptor Error', error, 'API_ERROR');
    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================
axiosInstance.interceptors.response.use(
  (response) => {
    const { metadata } = response.config;
    const duration = Date.now() - metadata.startTime;

    response.metadata = {
      ...metadata,
      duration,
      status: response.status,
    };

    logger.logResponse({
      id: metadata.requestId,
      status: response.status,
      duration,
      data: response.data,
      headers: response.headers,
    });

    return response;
  },
  (error) => {
    logger.error('Axios Response Error', error, 'API_ERROR');
    return Promise.reject(error);
  }
);

export default axiosInstance;





// import axios from 'axios';
// import { API_CONFIG, HTTP_STATUS, ERROR_TYPES } from './Api_Config';
// import tokenManager from './TokenManager';
// import logger from './Logger';
// import AuthManager from './interceptors/auth';
// import { config } from '@fullcalendar/core/internal';
// // import errorHandler from './ErrorHandler';

// // Create axios instance
// const axiosInstance = axios.create({
//   baseURL: API_CONFIG.BASE_URL,
//   timeout: API_CONFIG.REQUEST_TIMEOUT,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     // 'X-Client-Version': import.meta.env.REACT_APP_VERSION || '1.0.0',
//     // 'X-Platform': 'web',
//   },
//   withCredentials: API_CONFIG.ENABLE_CSRF,
// });

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     console.log("axios request",config)
//     // Add request metadata
//     config.metadata = {
//       requestId,
//       startTime: Date.now(),
//       url: config.url,
//       method: config.method,
//     };
//     // console.log("config.meta",config.metadata)
//     // Add request ID header
//     // config.headers['X-Request-ID'] = requestId;
    
//     // Add CSRF token if enabled
//     // if (API_CONFIG.ENABLE_CSRF) {
//     //   const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
//     //   if (csrfToken) {
//     //     config.headers[API_CONFIG.CSRF_TOKEN_NAME] = csrfToken;
//     //   }
//     // }
    
//     // 🔹 FIXED: Skip auth token for login endpoint
//     const isAuthEndpoint = config.url?.includes('/login') || 
//                           config.url?.includes('/register') ||
//                           config.url?.includes('/verify-token');
//     // console.log(config,"axios")
//     // Add auth token
//     // const token = tokenManager.getAccessToken();
//     if(!isAuthEndpoint){
//       const token = AuthManager.getInstance().getToken();
//       // console.log("token ",token)
//       if (token && !tokenManager.isTokenExpired(token)) {
//         config.headers.Authorization = `Bearer ${token}`;
//         // 🔹 ADDED: Log token usage
//           logger.debug("Auth token added to request", {
//           requestId,
//           hasToken: true,
//           tokenValid: !tokenManager.isTokenExpired(token)
//         }, "AUTH");
//       } else {
//         // 🔹 ADDED: Log missing/invalid token
//         logger.debug("No valid auth token available", {
//           requestId,
//           hasToken: !!token,
//           tokenValid: token ? !tokenManager.isTokenExpired(token) : false
//         }, "AUTH");
//       }
//     } else {
//         logger.debug("Skipping auth token for auth endpoint", {
//           requestId,
//           endpoint: config.url
//         }, "AUTH");
//       }
    
//     // Log request (existing)
//     logger.logRequest({
//       id: requestId,
//       method: config.method,
//       url: config.url,
//       headers: config.headers,
//       data: config.data,
//       params: config.params,
//     });
    
//     return config;
//   },
//   (error) => {
//     // 🔹 UPDATED: Enhanced error logging
//     logger.error('Request Interceptor Error', {
//       error: error.message,
//       timestamp: new Date().toISOString(),
//       stack: error.stack
//     }, "API_ERROR");
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     const { metadata } = response.config;
//     const duration = Date.now() - metadata.startTime;
    
//     // Add response metadata
//     response.metadata = {
//       ...metadata,
//       duration,
//       status: response.status,
//       timestamp: new Date().toISOString(),
//     };

//     // 🔹 ADDED: Log successful API response
//     logger.info(`API Response Success: ${response.status} ${metadata.method} ${metadata.url}`, {
//       requestId: metadata.requestId,
//       status: response.status,
//       duration: `${duration}ms`,
//       timestamp: new Date().toISOString(),
//       source: 'axios_interceptor'
//     }, "API_RESPONSE");

//     // Log successful response
//     logger.logResponse({
//       id: metadata.requestId,
//       status: response.status,
//       duration,
//       data: response.data,
//       headers: response.headers,
//     });
    
//     // Track performance if enabled
//     if (API_CONFIG.TRACK_PERFORMANCE && Math.random() < API_CONFIG.SAMPLE_RATE) {
//       logger.performance({
//         url: metadata.url,
//         method: metadata.method,
//         duration,
//         status: response.status,
//       });
//     }
    
//     return response;
//   },
//   // async (error) => {
//   //   const originalRequest = error.config;
    
//   //   // Check if request was made
//   //   if (error.response) {
//   //     const { metadata } = originalRequest || {};
//   //     const duration = metadata ? Date.now() - metadata.startTime : 0;
      
//   //     // 🔹 ADDED: Log API error with details
//   //     logger.error(`API Error: ${error.response.status} ${metadata?.method} ${metadata?.url}`, {
//   //       requestId: metadata?.requestId,
//   //       status: error.response.status,
//   //       duration: `${duration}ms`,
//   //       errorData: error.response.data,
//   //       timestamp: new Date().toISOString(),
//   //       source: 'axios_interceptor'
//   //     }, "API_ERROR");
      
//   //     // Log error response
//   //     logger.logError({
//   //       id: metadata?.requestId,
//   //       status: error.response.status,
//   //       duration,
//   //       url: metadata?.url,
//   //       method: metadata?.method,
//   //       error: error.response.data,
//   //       headers: error.response.headers,
//   //     });
      
//   //     // Handle 401 - Token expired
//   //     if (error.response.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
//   //       originalRequest._retry = true;
        
//   //       // 🔹 ADDED: Log token expiry
//   //       logger.warn("Token expired, attempting refresh", {
//   //         requestId: metadata?.requestId,
//   //         url: metadata?.url
//   //       }, "AUTH");

//   //       try {
//   //         // Try to refresh token
//   //         const newToken = await tokenManager.refreshToken();
//   //         if (newToken) {
//   //            // 🔹 ADDED: Log token refresh success
//   //           logger.info("Token refreshed successfully, retrying request", {
//   //             requestId: metadata?.requestId,
//   //             url: metadata?.url
//   //           }, "AUTH");

//   //           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//   //           return axiosInstance(originalRequest);
//   //         }
//   //       } catch (refreshError) {
//   //          // 🔹 ADDED: Log token refresh failure
//   //         logger.error("Token refresh failed, logging out user", {
//   //           requestId: metadata?.requestId,
//   //           error: refreshError.message
//   //         }, "AUTH");
          
//   //         // Refresh failed - logout user
//   //         tokenManager.clearTokens();
//   //         window.location.href = '/login?session=expired';
//   //         return Promise.reject(refreshError);
//   //       }
//   //     }
      
//   //     // Handle 429 - Rate limiting
//   //     if (error.response.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
//   //       const retryAfter = error.response.headers['retry-after'] || 60;

//   //       // 🔹 ADDED: Log rate limiting
//   //       logger.warn("Rate limit exceeded, waiting to retry", {
//   //         requestId: metadata?.requestId,
//   //         retryAfter: `${retryAfter}s`,
//   //         url: metadata?.url
//   //       }, "API_LIMIT");

//   //       await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
//   //       return axiosInstance(originalRequest);
//   //     }
//   //   }
    
//   //   // Handle network errors
//   //   if (!error.response) {
//   //     // 🔹 UPDATED: Enhanced network error logging
//   //     logger.error('Network Error', {
//   //       message: error.message,
//   //       code: error.code,
//   //       url: originalRequest?.url,
//   //       timestamp: new Date().toISOString(),
//   //       requestId: originalRequest?.metadata?.requestId
//   //     }, "NETWORK_ERROR");
      
//   //     error.type = ERROR_TYPES.NETWORK_ERROR;
//   //     error.message = 'Network error. Please check your connection.';
//   //   }
    
//   //   // Handle timeout errors
//   //   if (error.code === 'ECONNABORTED') {
//   //     // 🔹 ADDED: Log timeout error
//   //     logger.error('Request Timeout', {
//   //       url: originalRequest?.url,
//   //       timeout: API_CONFIG.REQUEST_TIMEOUT,
//   //       requestId: originalRequest?.metadata?.requestId
//   //     }, "TIMEOUT_ERROR");
      
//   //     error.type = ERROR_TYPES.TIMEOUT_ERROR;
//   //     error.message = 'Request timeout. Please try again.';
//   //   }
    
//   //   // Enhanced error object
//   //   const enhancedError = errorHandler.enhanceError(error);
//   //   return Promise.reject(enhancedError);
//   // }
// );

// // Retry Interceptor
// axiosInstance.interceptors.response.use(undefined, async (error) => {
//   const config = error.config;
  
//   if (!config || !config.retry) {
//     return Promise.reject(error);
//   }
  
//   config.retryCount = config.retryCount || 0;
  
//   if (config.retryCount >= API_CONFIG.MAX_RETRIES) {
//     // 🔹 ADDED: Log max retries exceeded
//     logger.warn("Max retries exceeded", {
//       url: config.url,
//       retryCount: config.retryCount,
//       maxRetries: API_CONFIG.MAX_RETRIES
//     }, "API_RETRY");
//     return Promise.reject(error);
//   }
  
//   config.retryCount += 1;
  
//   // Exponential backoff
//   const delay = Math.pow(2, config.retryCount) * API_CONFIG.RETRY_DELAY;
  
//   // 🔹 UPDATED: Enhanced retry logging
//   logger.info(`Retrying request (${config.retryCount}/${API_CONFIG.MAX_RETRIES})`, {
//     url: config.url,
//     delay: `${delay}ms`,
//     requestId: config.metadata?.requestId,
//     timestamp: new Date().toISOString()
//   }, "API_RETRY");
  
//   await new Promise(resolve => setTimeout(resolve, delay));
  
//   return axiosInstance(config);
// });

// export default axiosInstance;








// //  import axios from 'axios';
// // import { API_CONFIG, HTTP_STATUS, ERROR_TYPES } from './Api_Config';
// // import tokenManager from './TokenManager';
// // import logger from './Logger';
// // import errorHandler from './ErrorHandler';

// // // Create axios instance
// // const axiosInstance = axios.create({
// //   baseURL: API_CONFIG.BASE_URL,
// //   timeout: API_CONFIG.REQUEST_TIMEOUT,
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Accept': 'application/json',
// //     // 'X-Client-Version': import.meta.env.REACT_APP_VERSION || '1.0.0',
// //     // 'X-Platform': 'web',
// //   },
// //   withCredentials: API_CONFIG.ENABLE_CSRF,
// // });

// // // Request Interceptor
// // axiosInstance.interceptors.request.use(
// //   async (config) => {
// //     const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
// //     // Add request metadata
// //     config.metadata = {
// //       requestId,
// //       startTime: Date.now(),
// //       url: config.url,
// //       method: config.method,
// //     };
    
// //     // Add request ID header
// //     // config.headers['X-Request-ID'] = requestId;
    
// //     // Add CSRF token if enabled
// //     // if (API_CONFIG.ENABLE_CSRF) {
// //     //   const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
// //     //   if (csrfToken) {
// //     //     config.headers[API_CONFIG.CSRF_TOKEN_NAME] = csrfToken;
// //     //   }
// //     // }
    
// //     // Add auth token
// //     const token = tokenManager.getAccessToken();
// //     if (token && !tokenManager.isTokenExpired(token)) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
    
// //     // Log request
// //     logger.logRequest({
// //       id: requestId,
// //       method: config.method,
// //       url: config.url,
// //       headers: config.headers,
// //       data: config.data,
// //       params: config.params,
// //     });
    
// //     return config;
// //   },
// //   (error) => {
// //     logger.error('Request Interceptor Error:', error);
// //     return Promise.reject(error);
// //   }
// // );

// // // Response Interceptor
// // axiosInstance.interceptors.response.use(
// //   (response) => {
// //     const { metadata } = response.config;
// //     const duration = Date.now() - metadata.startTime;
    
// //     // Add response metadata
// //     response.metadata = {
// //       ...metadata,
// //       duration,
// //       status: response.status,
// //       timestamp: new Date().toISOString(),
// //     };
    
// //     // Log successful response
// //     logger.logResponse({
// //       id: metadata.requestId,
// //       status: response.status,
// //       duration,
// //       data: response.data,
// //       headers: response.headers,
// //     });
    
// //     // Track performance if enabled
// //     if (API_CONFIG.TRACK_PERFORMANCE && Math.random() < API_CONFIG.SAMPLE_RATE) {
// //       logger.performance({
// //         url: metadata.url,
// //         method: metadata.method,
// //         duration,
// //         status: response.status,
// //       });
// //     }
    
// //     return response;
// //   },
// //   async (error) => {
// //     const originalRequest = error.config;
    
// //     // Check if request was made
// //     if (error.response) {
// //       const { metadata } = originalRequest || {};
// //       const duration = metadata ? Date.now() - metadata.startTime : 0;
      
// //       // Log error response
// //       logger.logError({
// //         id: metadata?.requestId,
// //         status: error.response.status,
// //         duration,
// //         url: metadata?.url,
// //         method: metadata?.method,
// //         error: error.response.data,
// //         headers: error.response.headers,
// //       });
      
// //       // Handle 401 - Token expired
// //       if (error.response.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
// //         originalRequest._retry = true;
        
// //         try {
// //           // Try to refresh token
// //           const newToken = await tokenManager.refreshToken();
// //           if (newToken) {
// //             originalRequest.headers.Authorization = `Bearer ${newToken}`;
// //             return axiosInstance(originalRequest);
// //           }
// //         } catch (refreshError) {
// //           // Refresh failed - logout user
// //           tokenManager.clearTokens();
// //           window.location.href = '/login?session=expired';
// //           return Promise.reject(refreshError);
// //         }
// //       }
      
// //       // Handle 429 - Rate limiting
// //       if (error.response.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
// //         const retryAfter = error.response.headers['retry-after'] || 60;
// //         await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
// //         return axiosInstance(originalRequest);
// //       }
// //     }
    
// //     // Handle network errors
// //     if (!error.response) {
// //       logger.error('Network Error:', {
// //         message: error.message,
// //         code: error.code,
// //         url: originalRequest?.url,
// //       });
      
// //       error.type = ERROR_TYPES.NETWORK_ERROR;
// //       error.message = 'Network error. Please check your connection.';
// //     }
    
// //     // Handle timeout errors
// //     if (error.code === 'ECONNABORTED') {
// //       error.type = ERROR_TYPES.TIMEOUT_ERROR;
// //       error.message = 'Request timeout. Please try again.';
// //     }
    
// //     // Enhanced error object
// //     const enhancedError = errorHandler.enhanceError(error);
// //     return Promise.reject(enhancedError);
// //   }
// // );

// // // Retry Interceptor
// // axiosInstance.interceptors.response.use(undefined, async (error) => {
// //   const config = error.config;
  
// //   if (!config || !config.retry) {
// //     return Promise.reject(error);
// //   }
  
// //   config.retryCount = config.retryCount || 0;
  
// //   if (config.retryCount >= API_CONFIG.MAX_RETRIES) {
// //     return Promise.reject(error);
// //   }
  
// //   config.retryCount += 1;
  
// //   // Exponential backoff
// //   const delay = Math.pow(2, config.retryCount) * API_CONFIG.RETRY_DELAY;
  
// //   logger.info(`Retrying request (${config.retryCount}/${API_CONFIG.MAX_RETRIES}):`, {
// //     url: config.url,
// //     delay,
// //   });
  
// //   await new Promise(resolve => setTimeout(resolve, delay));
  
// //   return axiosInstance(config);
// // });

// // export default axiosInstance;

