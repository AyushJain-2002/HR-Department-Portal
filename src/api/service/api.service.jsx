// import axios from '../axiosInstance';
// import logger from '../Logger';
// import {ApiError} from '../ErrorHandler';
// import { API_CONFIG } from '../Api_Config';
// import {
//   shouldLogRequest,
//   sanitizeLogData,
//   LOGGING_CONFIG,
// } from '../loggingconfig';

// class ApiService {
//   constructor() {
//     this.client = axios.create({
//       baseURL: API_CONFIG.BASE_URL,
//       timeout: 15000,
//     });
//     this.authToken = null;
//     this.email = null;
//     this.cache = new Map();
//     this.retryCount = 2;

//     // this.attachInterceptors();
//   }

//   // // ----------------------------
//   // // TOKEN MANAGER
//   // // ----------------------------
//   // getToken() {
//   //   return localStorage.getItem("token");
//   // }

//   // setToken(token) {
//   //   localStorage.setItem("token", token);
//   // }

//   // removeToken() {
//   //   localStorage.removeItem("token");
//   // }


//   setAuthData(authToken, email, macAddress) {
//     this.authToken = authToken;
//     this.email = email;
//     // this.macAddress = macAddress;
//   }

//   clearAuthData() {
//     this.authToken = null;
//     this.email = null;
//     // this.macAddress = null;
//   }
  
//     // ----------------------------
//     // MAIN REQUEST FUNCTION
//     // ----------------------------
//     async request(config = {}) {
//       const cacheKey = config.cacheKey || this.generateCacheKey(config);
//       const method = config.method.toUpperCase() || "GET";
//       const endpoint = config.url;
//       // const url = `${this.baseURL}${endpoint}`;
//       const startTime = Date.now();
  
//       const config = {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json;charset=UTF-8',
//           Accept: 'application/json;charset=UTF-8',
//           ...(this.authToken && { Authorization: this.authToken }),
//           ...(this.email && { email: this.email }),
//           // ...(this.macAddress && { macAddress: this.macAddress }),
//           ...options.headers,
//         },
//       };
//       if (shouldLogRequest(endpoint, method)) {
//       let bodyData = null;
//       try {
//         if (options.body) bodyData = JSON.parse(options.body);
//       } catch {}

//       logger.apiRequest(
//         method,
//         endpoint,
//         LOGGING_CONFIG.LOG_REQUEST_BODY ? sanitizeLogData(bodyData) : undefined,
//         LOGGING_CONFIG.LOG_HEADERS ? sanitizeLogData(config.headers) : undefined
//       );
//     }
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), this.timeout);

//     try {
//       // const response = await fetch(url, {
//       //   ...config,
//       //   signal: controller.signal,
//       // });

//       const response=await this.client({...config,
//         signal: controller.signal,
//       });
//       clearTimeout(timeoutId);
//       const duration = Date.now() - startTime;

//       if (!response.ok) {
//         const errorText = await response.text();

//         if (shouldLogRequest(endpoint, method)) {
//           logger.apiResponse(method, endpoint, response.status, errorText, duration);
//         }
//         throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status);
//       }

//       const data = await response.json();

//       if (shouldLogRequest(endpoint, method)) {
//         logger.apiResponse(
//           method,
//           endpoint,
//           response.status,
//           LOGGING_CONFIG.LOG_RESPONSE_BODY ? sanitizeLogData(data) : undefined,
//           Date.now() - startTime
//         );
//       }

//       return {
//         data,
//         status: response.status,
//       };
//     } catch (error) {
//       clearTimeout(timeoutId);
//       const duration = Date.now() - startTime;

//       if (shouldLogRequest(endpoint, method) && LOGGING_CONFIG.LOG_ALL_ERRORS) {
//         logger.apiError(method, endpoint, error, duration);
//       }

//       if (error instanceof ApiError) {
//         throw error;
//       }

//       throw new ApiError(error.message || 'Network error', 0);
//     }
//   }

//    async get(endpoint) {
//     return this.request(endpoint, { method: 'GET' });
//   }

//   async post(endpoint, data) {
//     return this.request(endpoint, {
//       method: 'POST',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async put(endpoint, data) {
//     return this.request(endpoint, {
//       method: 'PUT',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }

//   async delete(endpoint) {
//     return this.request(endpoint, { method: 'DELETE' });
//   }
//       // if (config.useCache) {
//       //   const cached = this.getFromCache(cacheKey);
//       //   if (cached) return cached;
//       // }
  
//       // try {
//       //   const response = await this.client(config);
  
//       //   if (config.useCache) {
//       //     this.setCache(cacheKey, response.data, config.ttl || 10000);
//       //   }
  
//     //     return response.data;
//     //   } catch (error) {
//     //     throw error;
//     //   }
//     // }
//   // ----------------------------
//   // INTERCEPTORS
//   // ----------------------------
//   // attachInterceptors() {
//   //   this.client.interceptors.request.use(
//   //     (config) => {
//   //       const token = this.getToken();
//   //       if (token) config.headers.Authorization = `Bearer ${token}`;

//   //       if (shouldLogRequest(config.url)) {
//   //         logger.info("[Request]", sanitizePayload(config));
//   //       }

//   //       return config;
//   //     },
//   //     (error) => {
//   //       logger.error("[Request Error]", error);
//   //       return Promise.reject(error);
//   //     }
//   //   );

//   //   this.client.interceptors.response.use(
//   //     (response) => {
//   //       if (shouldLogRequest(response.config.url)) {
//   //         logger.info("[Response]", sanitizeLogData(response));
//   //       }

//   //       return response;
//   //     },
//   //     async (error) => {
//   //       const original = error.config;

//   //       // Retry Logic
//   //       if (!original._retry && this.retryCount > 0) {
//   //         original._retry = true;
//   //         this.retryCount--;
//   //         return this.client(original);
//   //       }

//   //       // Handle Unauthorized
//   //       if (error?.response?.status === 401) {
//   //         this.removeToken();
//   //         window.location.href = "/login";
//   //       }
        
//   //       logger.error("[Response Error]", error);
//   //       errorHandler(error);

//   //       return Promise.reject(error);
//   //     }
//   //   );
//   // }

//   // // ----------------------------
//   // // CACHE HELPER
//   // // ----------------------------
//   // generateCacheKey(config) {
//   //   return `${config.method}-${config.url}-${JSON.stringify(config.params)}-${JSON.stringify(config.data)}`;
//   // }

//   // getFromCache(key) {
//   //   const data = this.cache.get(key);

//   //   if (!data) return null;

//   //   const isExpired = Date.now() > data.expiry;
//   //   if (isExpired) {
//   //     this.cache.delete(key);
//   //     return null;
//   //   }

//   //   return data.value;
//   // }

//   // setCache(key, value, ttl = 10000) {
//   //   this.cache.set(key, {
//   //     value,
//   //     expiry: Date.now() + ttl,
//   //   });
//   // }

//   // // ----------------------------
//   // // METHOD HELPERS
//   // // ----------------------------
//   // get(url, params = {}, config = {}) {
//   //   return this.request({ method: "GET", url, params, ...config });
//   // }

//   // post(url, data = {}, config = {}) {
//   //   return this.request({ method: "POST", url, data, ...config });
//   // }

//   // put(url, data = {}, config = {}) {
//   //   return this.request({ method: "PUT", url, data, ...config });
//   // }

//   // patch(url, data = {}, config = {}) {
//   //   return this.request({ method: "PATCH", url, data, ...config });
//   // }

//   // delete(url, data = {}, config = {}) {
//   //   return this.request({ method: "DELETE", url, data, ...config });
//   // }
// }

// const apiService = new ApiService();
// export default apiService;



// // class ApiService {
// //   constructor() {
// //     this.cache = new Map();
// //     this.timeout = API_CONFIG.TIMEOUT || 15000;
// //   }

//   // Generic request method
// //   async request(config) {
// //     const method = config.method.toUpperCase();
// //     const endpoint = config.url;
// //     const cacheKey = config.cacheKey || this.generateCacheKey(config);
    
// //     // Check cache
// //     if (config.cache && this.cache.has(cacheKey)) {
// //       const cached = this.cache.get(cacheKey);
// //       if (Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
// //         logger.debug('Cache hit', { key: cacheKey });
// //         return cached.data;
// //       }
// //       this.cache.delete(cacheKey);
// //     }
       
// //     if (shouldLogRequest(endpoint, method)) {
// //       // let bodyData = null;
// //       // try {
// //       //   if (options.body) bodyData = JSON.parse(options.body);
// //       // } catch {}

// //       logger.logRequest(
// //         method,
// //         endpoint,
// //         LOGGING_CONFIG.LOG_REQUEST_BODY ? sanitizeLogData(bodyData) : undefined,
// //         LOGGING_CONFIG.LOG_HEADERS ? sanitizeLogData(config.headers) : undefined
// //       );
// //     }

// //     const controller = new AbortController();
// //     const timeoutId = setTimeout(() => controller.abort(), this.timeout);

// //     const startTime = performance.now();
// //     try {
// //       const response = await axiosInstance({
// //         ...config,
// //         signal: controller.signal
// //       });
      
// //       const duration = performance.now() - startTime;

// //       // Performance logging
// //       if (
// //         LOGGING_CONFIG.LOG_SLOW_REQUESTS &&
// //         duration > LOGGING_CONFIG.SLOW_REQUEST_THRESHOLD
// //       ) {
// //         logger.warn(
// //           'Slow API Request',
// //           {
// //             url: endpoint,
// //             duration: `${duration.toFixed(0)}ms`,
// //             threshold: LOGGING_CONFIG.SLOW_REQUEST_THRESHOLD,
// //           },
// //           'Performance'
// //         );
// //       }

// //       // ---------------------------
// //       // 4. RESPONSE LOGGING
// //       // ---------------------------
// //       logger.logResponse(
// //         method,
// //         endpoint,
// //         response.status,
// //         LOGGING_CONFIG.LOG_RESPONSE_BODY ? sanitizeLogData(response.data) : undefined,
// //         duration
// //       );

// //       // Cache response if enabled
// //       if (config.cache) {
// //         this.cache.set(cacheKey, {
// //           data: response.data,
// //           timestamp: Date.now(),
// //         });
// //       }
      
// //       return response.data;
// //     } catch (error) {
// //       const duration = performance.now() - startTime;
// //       // ---------------------------
// //       // 6. ERROR LOGGING
// //       // ---------------------------
// //       logger.logError(
// //         method,
// //         endpoint,
// //         error,
// //         duration
// //       );

// //       throw errorHandler.handleApiError(error, { config });
// //     }
// //     finally {
// //       clearTimeout(timeoutId);
// //     }
// //   }
  

// //   // HTTP methods
// //   get(url, config = {}) {
// //     return this.request({
// //       method: 'GET',
// //       url,
// //       ...config,
// //     });
// //   }

// //   post(url, data, config = {}) {
// //     return this.request({
// //       method: 'POST',
// //       url,
// //       data,
// //       ...config,
// //     });
// //   }

// //   put(url, data, config = {}) {
// //     return this.request({
// //       method: 'PUT',
// //       url,
// //       data,
// //       ...config,
// //     });
// //   }

// //   patch(url, data, config = {}) {
// //     return this.request({
// //       method: 'PATCH',
// //       url,
// //       data,
// //       ...config,
// //     });
// //   }

// //   delete(url, config = {}) {
// //     return this.request({
// //       method: 'DELETE',
// //       url,
// //       ...config,
// //     });
// //   }

// //   // Upload file
// //   upload(url, file, onProgress, config = {}) {
// //     const formData = new FormData();
// //     formData.append('file', file);
    
// //     return this.request({
// //       method: 'POST',
// //       url,
// //       data: formData,
// //       headers: {
// //         'Content-Type': 'multipart/form-data',
// //       },
// //       onUploadProgress: onProgress,
// //       timeout: API_CONFIG.UPLOAD_TIMEOUT,
// //       ...config,
// //     });
// //   }

// //   // Batch requests
// //   async batch(requests, config = {}) {
// //     return Promise.allSettled(
// //       requests.map(req => this.request({ ...req, ...config }))
// //     );
// //   }

// //   // Clear cache
// //   clearCache(key) {
// //     if (key) {
// //       this.cache.delete(key);
// //     } else {
// //       this.cache.clear();
// //     }
// //   }

// //   // Generate cache key
// //   generateCacheKey(config) {
// //     return `${config.method}_${config.url}_${JSON.stringify(config.params || {})}_${JSON.stringify(config.data || {})}`;
// //   }

// //   // Cancel token
// //   createCancelToken() {
// //     return axios.CancelToken.source();
// //   }
// // }

// // export default new ApiService();

