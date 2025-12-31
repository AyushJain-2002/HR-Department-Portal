
//src/api/Api_Config.js
export const API_CONFIG = {
  // Base URLs
//   BASE_URL: process.env.REACT_APP_API_URL || 'https://api.yourdomain.com',
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com',
  API_VERSION: '/api/v1',
  
  // Timeouts
  REQUEST_TIMEOUT: 30000,
  UPLOAD_TIMEOUT: 60000,
  
  // Retry Config
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  
  // Security
  ENABLE_CSRF: true,
  CSRF_TOKEN_NAME: 'X-CSRF-TOKEN',
  
  // Features
  ENABLE_LOGGING: import.meta.env.NODE_ENV === 'development',
  LOG_TO_FILE: false,
  LOG_FILE_NAME: 'api_logs.json',
  
  // Cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  ENABLE_CACHE: true,
  
  // Analytics
  TRACK_PERFORMANCE: true,
  SAMPLE_RATE: 0.1, // 10% of requests
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

// Error Types
export const ERROR_TYPES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  CLIENT_ERROR: 'CLIENT_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
};

// Token Configuration
export const TOKEN_CONFIG = {
  ACCESS_TOKEN_KEY: 'authToken',
  REFRESH_TOKEN_KEY: 'refresh_token',
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes before expiry
  STORAGE_TYPE: 'Cookies', // localStorage or sessionStorage
};

// Log Levels
export const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  TRACE: 'TRACE',
};

// Cache Keys
export const CACHE_KEYS = {
  API_RESPONSE: 'api_response_',
  USER_DATA: 'user_data',
  SETTINGS: 'app_settings',
};

export default API_CONFIG;