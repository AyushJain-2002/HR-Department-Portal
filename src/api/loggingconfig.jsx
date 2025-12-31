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
