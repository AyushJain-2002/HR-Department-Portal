import logger from './Logger';
import { LOG_LEVELS } from './Api_Config';
import { isDebugEnabled, isDebugFeatureEnabled } from "../Utils/Debug"
export const LOGGING_CONFIG = {
  // Log levels by environment
  DEVELOPMENT: LOG_LEVELS.DEBUG,
  PRODUCTION: LOG_LEVELS.ERROR,
  STAGING: LOG_LEVELS.INFO,

  // API logging settings
  LOG_REQUEST_BODY: isDebugEnabled(),
  LOG_RESPONSE_BODY: isDebugEnabled(),
  LOG_HEADERS: isDebugEnabled(),

  // Performance logging
  LOG_SLOW_REQUESTS: true,
  SLOW_REQUEST_THRESHOLD: 3000, // 3 seconds

  // Error logging
  LOG_ALL_ERRORS: true,
  LOG_NETWORK_ERRORS: true,

  // Storage settings
  MAX_LOG_ENTRIES: 1000,
  PERSIST_LOGS: isDebugEnabled(),
};

let isLoggingInitialized = false;

// Initialize logger with environment-specific settings
export const initializeLogging = () => {
  if (isLoggingInitialized) return;

  const LOG_LEVELS = isDebugEnabled()
    ? LOGGING_CONFIG.DEVELOPMENT
    : LOGGING_CONFIG.PRODUCTION;

  logger.setLOG_LEVELS(LOG_LEVELS);

  logger.info(
    'Logging initialized',
    {
      environment: isDebugEnabled() ? 'development' : 'production',
      LOG_LEVELS: Object.keys(LOG_LEVELS).find(key => LOG_LEVELS[key] === LOG_LEVELS),
      config: LOGGING_CONFIG,
    },
    'LoggingConfig'
  );

  isLoggingInitialized = true;
};

// Helper to check if request should be logged
export const shouldLogRequest = (url, method) => {
  // Skip logging for health checks or frequent polling endpoints
  if (!isDebugFeatureEnabled("loggingDashboard")) {
    return false;
  }
  const skipEndpoints = ['/login'];
  return !skipEndpoints.some(endpoint => url.includes(endpoint));
};

// Helper to sanitize sensitive data from logs
export const sanitizeLogData = (data) => {
  if (!data || typeof data !== 'object') return data;

  const sensitiveFields = [
    'password', 'token', 'authToken', 'authorization',
    'otp', 'pin', 'secret', 'key', 'credential'
  ];

  const sanitized = { ...data };

  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '***REDACTED***';
    }
  }

  return sanitized;
};

// 🔹 NEW: Check if logging is enabled for a specific category
export const shouldLogCategory = (category) => {
  return LOGGING_CONFIG.LOG_CATEGORIES[category] !== false;
};












// import logger from './Logger';
// import { LOG_LEVELS } from './Api_Config';
// import { isDebugEnabled, isDebugFeatureEnabled } from "../Utils/Debug"

// export const LOGGING_CONFIG = {
//   // Log levels by environment
//   DEVELOPMENT: LOG_LEVELS.DEBUG,
//   PRODUCTION: LOG_LEVELS.ERROR,
//   STAGING: LOG_LEVELS.INFO,

//   // API logging settings
//   LOG_REQUEST_BODY: isDebugEnabled(),
//   LOG_RESPONSE_BODY: isDebugEnabled(),
//   LOG_HEADERS: isDebugEnabled(),

//   // Performance logging
//   LOG_SLOW_REQUESTS: true,
//   SLOW_REQUEST_THRESHOLD: 3000, // 3 seconds

//   // Error logging
//   LOG_ALL_ERRORS: true,
//   LOG_NETWORK_ERRORS: true,

//   // Storage settings
//   MAX_LOG_ENTRIES: 1000,
//   PERSIST_LOGS: isDebugEnabled(),
  
//   // 🔹 ADDED: File logging settings
//   ENABLE_FILE_LOGGING: true,
//   MAX_FILE_SIZE: 250 * 1024 * 1024, // 250MB
//   AUTO_SAVE_INTERVAL: 5 * 60 * 1000, // 5 minutes
//   AUTO_SAVE_THRESHOLD: 100, // Auto-save every 100 logs
  
//   // 🔹 ADDED: Log categories settings
//   LOG_CATEGORIES: {
//     API_REQUEST: true,
//     API_RESPONSE: true,
//     API_ERROR: true,
//     AUTH: true,
//     AUTH_ERROR: true,
//     ERROR_HANDLING: true,
//     APP_LIFECYCLE: true,
//     GLOBAL_ERROR: true,
//     PROMISE_ERROR: true,
//     REDUX_ACTION: true,
//     ASYNC_ACTION: true,
//     ROUTING: true,
//     USER_DATA: true,
//     NETWORK_ERROR: true,
//     TIMEOUT_ERROR: true,
//     USER_NOTIFICATION: true,
//     VALIDATION_ERROR: true
//   }
// };

// let isLoggingInitialized = false;

// // Initialize logger with environment-specific settings
// export const initializeLogging = () => {
//   if (isLoggingInitialized) return;

//   const LOG_LEVELS = isDebugEnabled()
//     ? LOGGING_CONFIG.DEVELOPMENT
//     : LOGGING_CONFIG.PRODUCTION;

//   // 🔹 UPDATED: Use the correct logger method (assuming logger has setLogLevel method)
//   // If logger doesn't have setLogLevel, we'll handle it differently
//   if (logger.setLogLevel) {
//     logger.setLogLevel(LOG_LEVELS);
//   } else {
//     // Store log level in logger instance
//     logger.logLevel = LOG_LEVELS;
//   }

//   logger.info(
//     'Logging initialized',
//     {
//       environment: isDebugEnabled() ? 'development' : 'production',
//       logLevel: Object.keys(LOG_LEVELS).find(key => LOG_LEVELS[key] === LOG_LEVELS) || LOG_LEVELS,
//       enableFileLogging: LOGGING_CONFIG.ENABLE_FILE_LOGGING,
//       autoSaveInterval: `${LOGGING_CONFIG.AUTO_SAVE_INTERVAL / 60000} minutes`,
//       timestamp: new Date().toISOString()
//     },
//     'APP_LIFECYCLE'
//   );

//   isLoggingInitialized = true;
// };

// // Helper to check if request should be logged
// export const shouldLogRequest = (url, method) => {
//   // Check if logging dashboard feature is enabled
//   if (!isDebugFeatureEnabled("loggingDashboard")) {
//     return false;
//   }
  
//   // 🔹 UPDATED: Skip sensitive endpoints
//   const skipEndpoints = [
//     '/login',
//     '/auth/refresh', // Token refresh endpoints
//     '/password/reset', // Password reset
//     '/verify/otp' // OTP verification
//   ];
  
//   return !skipEndpoints.some(endpoint => url.includes(endpoint));
// };

// // Helper to sanitize sensitive data from logs
// export const sanitizeLogData = (data) => {
//   if (!data || typeof data !== 'object') return data;

//   const sensitiveFields = [
//     'password', 'token', 'authToken', 'authorization', 'access_token', 'refresh_token',
//     'otp', 'pin', 'secret', 'key', 'credential', 'cvv', 'ssn', 'credit_card',
//     'private_key', 'api_key', 'client_secret', 'session_id'
//   ];

//   const sanitized = { ...data };

//   // Sanitize top-level fields
//   Object.keys(sanitized).forEach(key => {
//     sensitiveFields.forEach(field => {
//       if (key.toLowerCase().includes(field)) {
//         sanitized[key] = '***REDACTED***';
//       }
//     });

//     // Recursively sanitize nested objects
//     if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
//       sanitized[key] = sanitizeLogData(sanitized[key]);
//     }
//   });

//   return sanitized;
// };



// // 🔹 NEW: Format log entry with consistent structure
// export const formatLogEntry = (level, message, data = {}, category = 'GENERAL') => {
//   const sanitizedData = sanitizeLogData(data);
  
//   return {
//     level,
//     message,
//     data: sanitizedData,
//     category,
//     timestamp: new Date().toISOString(),
//     environment: isDebugEnabled() ? 'development' : 'production',
//     userAgent: navigator.userAgent?.substring(0, 100),
//     url: window.location.href
//   };
// };

// // 🔹 NEW: Get current logging configuration
// export const getLoggingConfig = () => {
//   return {
//     ...LOGGING_CONFIG,
//     isDebugEnabled: isDebugEnabled(),
//     isDebugFeatureEnabled: {
//       loggingDashboard: isDebugFeatureEnabled("loggingDashboard"),
//       // Add other features as needed
//     },
//     currentLogLevel: isDebugEnabled() ? 'DEBUG' : 'ERROR'
//   };
// };

// // 🔹 NEW: Log performance metrics
// export const logPerformance = (operation, duration, threshold = LOGGING_CONFIG.SLOW_REQUEST_THRESHOLD) => {
//   if (duration > threshold && LOGGING_CONFIG.LOG_SLOW_REQUESTS) {
//     logger.warn(`Slow operation detected: ${operation}`, {
//       operation,
//       duration: `${duration}ms`,
//       threshold: `${threshold}ms`,
//       timestamp: new Date().toISOString()
//     }, 'PERFORMANCE');
//   }
// };

// // 🔹 NEW: Initialize file logging if enabled
// export const initializeFileLogging = () => {
//   if (LOGGING_CONFIG.ENABLE_FILE_LOGGING && logger.initializeFileLogging) {
//     try {
//       logger.initializeFileLogging();
//       logger.info('File logging initialized', {
//         maxFileSize: `${LOGGING_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`,
//         autoSaveInterval: `${LOGGING_CONFIG.AUTO_SAVE_INTERVAL / 60000} minutes`,
//         timestamp: new Date().toISOString()
//       }, 'APP_LIFECYCLE');
//     } catch (error) {
//       logger.error('Failed to initialize file logging', {
//         error: error.message,
//         timestamp: new Date().toISOString()
//       }, 'APP_LIFECYCLE');
//     }
//   }
// };

// // 🔹 NEW: Auto-save logs if enabled
// export const setupAutoSave = () => {
//   if (LOGGING_CONFIG.ENABLE_FILE_LOGGING && LOGGING_CONFIG.AUTO_SAVE_INTERVAL > 0) {
//     const intervalId = setInterval(() => {
//       if (logger.saveCurrentFileToDisk) {
//         logger.saveCurrentFileToDisk();
//       }
//     }, LOGGING_CONFIG.AUTO_SAVE_INTERVAL);
    
//     return intervalId;
//   }
//   return null;
// };

// // 🔹 NEW: Export logs with proper formatting
// export const exportLogs = (format = 'json') => {
//   if (logger.exportLogs) {
//     return logger.exportLogs(format);
//   }
//   return null;
// };

// // 🔹 NEW: Get log statistics
// export const getLogStatistics = () => {
//   if (logger.getLogStats) {
//     return logger.getLogStats();
//   }
//   return {};
// };

