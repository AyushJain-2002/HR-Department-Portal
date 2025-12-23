import logger from './Logger';

/**
 * Redux middleware for logging all Redux actions
 * Logs actions with user context and timing information
 */
export const logMiddleware = (store) => (next) => (action) => {
  const startTime = Date.now();
  const state = store.getState();
  
  // Extract user info from auth state (adjust based on your state structure)
  const userInfo = state?.auth?.user || 
                   state?.user?.data || 
                   state?.pospSignUpIn?.user || 
                   {};
  
  // Log action before processing
  logger.info(`Redux Action Dispatch: ${action.type}`, {
    actionType: action.type,
    userId: userInfo.id || 'unknown',
    userEmail: userInfo.email || 'unknown',
    userRole: userInfo.role || 'unknown',
    timestamp: new Date().toISOString(),
    payload: sanitizeLogData(action.payload),
    source: 'redux_middleware',
    actionStage: 'dispatch'
  }, "REDUX_ACTION");

  // Process the action
  const result = next(action);

  const duration = Date.now() - startTime;
  const newState = store.getState();

  // Log action after processing
  logger.info(`Redux Action Complete: ${action.type}`, {
    actionType: action.type,
    userId: userInfo.id || 'unknown',
    duration: `${duration}ms`,
    timestamp: new Date().toISOString(),
    source: 'redux_middleware',
    actionStage: 'complete',
    stateChanged: checkStateChange(state, newState, action.type)
  }, "REDUX_ACTION");

  return result;
};

// Helper: Sanitize payload for logging (remove sensitive data)
const sanitizeLogData = function(payload) {
  if (!payload || typeof payload !== 'object') {
    return payload;
  }

  const sanitized = { ...payload };
  const sensitiveFields = [
    'password', 'token', 'secret', 'access_token', 'refresh_token',
    'credit_card', 'ssn', 'pin', 'cvv', 'otp'
  ];

  Object.keys(sanitized).forEach(key => {
    sensitiveFields.forEach(field => {
      if (key.toLowerCase().includes(field)) {
        sanitized[key] = '[REDACTED]';
      }
    });

    // Recursively sanitize nested objects
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = logMiddleware.sanitizeLogData(sanitized[key]);
    }
  });

  return sanitized;
};

// Helper: Check if state changed significantly
const checkStateChange = function(oldState, newState, actionType) {
  try {
    // Simple check: compare stringified versions (excluding certain keys)
    const oldStr = JSON.stringify(oldState, replacer);
    const newStr = JSON.stringify(newState, replacer);
    
    return oldStr !== newStr;
  } catch {
    return 'unknown';
  }
};

// Helper: JSON.stringify replacer to exclude certain state parts
const replacer = function(key, value) {
  // Exclude large or sensitive state parts
  const excludeKeys = ['loading', 'error', 'timestamp', 'lastUpdated'];
  if (excludeKeys.includes(key)) {
    return undefined;
  }
  
  // Limit array sizes
  if (Array.isArray(value) && value.length > 10) {
    return `[Array(${value.length}) - truncated]`;
  }
  
  return value;
};

// Additional middleware for async action tracking
export const asyncActionMiddleware = (store) => (next) => (action) => {
  if (action.type && action.type.includes('/pending')) {
    logger.info(`Async Action Started: ${action.type}`, {
      actionType: action.type,
      timestamp: new Date().toISOString(),
      source: 'redux_middleware',
      asyncStage: 'pending'
    }, "ASYNC_ACTION");
  }
  
  if (action.type && action.type.includes('/fulfilled')) {
    logger.info(`Async Action Success: ${action.type}`, {
      actionType: action.type,
      timestamp: new Date().toISOString(),
      source: 'redux_middleware',
      asyncStage: 'fulfilled'
    }, "ASYNC_ACTION");
  }
  
  if (action.type && action.type.includes('/rejected')) {
    logger.error(`Async Action Failed: ${action.type}`, {
      actionType: action.type,
      error: action.error?.message || 'Unknown error',
      timestamp: new Date().toISOString(),
      source: 'redux_middleware',
      asyncStage: 'rejected'
    }, "ASYNC_ACTION");
  }

  return next(action);
};

export default logMiddleware;