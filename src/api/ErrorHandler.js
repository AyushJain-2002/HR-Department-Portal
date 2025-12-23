import logger from './Logger';

export class ApiError {
  constructor(message, status) {
    this.message = message;
    this.status = status;
  }
}

export class ErrorHandler {
  static handle(error, context) {
    let apiError;

    if (error instanceof ApiError) {
      apiError = error;
    } else if (error instanceof Error) {
      apiError = new ApiError(error.message, 0);
    } else {
      apiError = new ApiError('Unknown error occurred', 0);
    }

    logger.error(
      'API Error handled',
      {
        message: apiError.message,
        status: apiError.status,
        originalError: error,
      },
      context || 'ErrorHandler'
    );

    return apiError;
  }

  static isNetworkError(error) {
    return error.status === 0;
  }

  static isAuthError(error) {
    return error.status === 401 || error.status === 403;
  }

  static isServerError(error) {
    return error.status >= 500;
  }

  static getErrorMessage(error) {
    switch (error.status) {
      case 0:
        return 'Network error. Please check your connection.';
      case 401:
        return 'Authentication required. Please login again.';
      case 403:
        return 'Access denied. You do not have permission.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.message || 'An error occurred.';
    }
  }
}










// import { HTTP_STATUS, ERROR_TYPES } from './Api_Config';
// import logger from './Logger';

// class ErrorHandler {
//   // Enhance error with additional information
//   enhanceError(error) {
//     const enhancedError = {
//       ...error,
//       isApiError: true,
//       timestamp: new Date().toISOString(),
//       type: this.getErrorType(error),
//     };

//     // Add user-friendly message
//     enhancedError.userMessage = this.getUserFriendlyMessage(error);

//     // Add error code
//     enhancedError.code = this.getErrorCode(error);

//     // Add stack trace if not present
//     if (!enhancedError.stack) {
//       enhancedError.stack = new Error().stack;
//     }

//     // 🔹 ADDED: Log enhanced error
//     logger.error("Error enhanced for handling", {
//       errorType: enhancedError.type,
//       errorCode: enhancedError.code,
//       userMessage: enhancedError.userMessage,
//       originalMessage: error.message,
//       timestamp: enhancedError.timestamp
//     }, "ERROR_HANDLING");

//     return enhancedError;
//   }

//   // Get error type
//   getErrorType(error) {
//     if (!error.response) {
//       return ERROR_TYPES.NETWORK_ERROR;
//     }

//     const status = error.response.status;
    
//     if (status >= 500) {
//       return ERROR_TYPES.SERVER_ERROR;
//     } else if (status === 401 || status === 403) {
//       return ERROR_TYPES.AUTH_ERROR;
//     } else if (status === 422) {
//       return ERROR_TYPES.VALIDATION_ERROR;
//     } else if (status >= 400) {
//       return ERROR_TYPES.CLIENT_ERROR;
//     }

//     return ERROR_TYPES.CLIENT_ERROR;
//   }

//   // Get user-friendly error message
//   getUserFriendlyMessage(error) {
//     if (error.userMessage) {
//       return error.userMessage;
//     }

//     if (!error.response) {
//       return 'Network error. Please check your internet connection and try again.';
//     }

//     const status = error.response.status;
//     const serverMessage = error.response.data?.message;

//     switch (status) {
//       case HTTP_STATUS.BAD_REQUEST:
//         return serverMessage || 'Invalid request. Please check your input.';
      
//       case HTTP_STATUS.UNAUTHORIZED:
//         return 'Incorrect Loginid or Password or session has expired. Please log in again.';
      
//       case HTTP_STATUS.FORBIDDEN:
//         return 'You do not have permission to perform this action.';
      
//       case HTTP_STATUS.NOT_FOUND:
//         return 'The requested resource was not found.';
      
//       case HTTP_STATUS.CONFLICT:
//         return serverMessage || 'A conflict occurred. Please try again.';
      
//       case HTTP_STATUS.UNPROCESSABLE_ENTITY:
//         return serverMessage || 'Validation failed. Please check your input.';
      
//       case HTTP_STATUS.TOO_MANY_REQUESTS:
//         return 'Too many requests. Please try again later.';
      
//       case HTTP_STATUS.SERVER_ERROR:
//         return 'Server error. Our team has been notified. Please try again later.';
      
//       default:
//         return serverMessage || 'An unexpected error occurred. Please try again.';
//     }
//   }

//   // Get error code
//   getErrorCode(error) {
//     if (error.code) {
//       return error.code;
//     }

//     if (error.response?.data?.code) {
//       return error.response.data.code;
//     }

//     if (error.response?.status) {
//       return `HTTP_${error.response.status}`;
//     }

//     return 'UNKNOWN_ERROR';
//   }

//   // Handle API error (for use in components)
//   handleApiError(error, context = {}) {
//     const enhancedError = this.enhanceError(error);
    
//     // 🔹 UPDATED: Enhanced error handling logging
//     logger.error('API Error Handler - Processing Error', {
//       errorType: enhancedError.type,
//       errorCode: enhancedError.code,
//       userMessage: enhancedError.userMessage,
//       context: context,
//       timestamp: new Date().toISOString(),
//       url: context.url || error.config?.url,
//       method: context.method || error.config?.method,
//       userId: context.userId || 'unknown',
//       source: 'error_handler'
//     }, "ERROR_HANDLING");
    
//     // Show toast notification (if available)
//     if (typeof window !== 'undefined' && window.toast) {
//       window.toast.error(enhancedError.userMessage);
      
//       // 🔹 ADDED: Log toast notification
//       logger.debug("Error toast shown to user", {
//         message: enhancedError.userMessage,
//         timestamp: new Date().toISOString()
//       }, "USER_NOTIFICATION");
//     }
    
//     // Return error for further handling
//     return enhancedError;
//   }

//   // Check if error is retryable
//   isRetryable(error) {
//     const isRetryable = !error.response || 
//       (error.response.status >= 500) || 
//       error.response.status === 408 || 
//       error.response.status === 429;
    
//     // 🔹 ADDED: Log retryability check
//     logger.debug("Error retryability check", {
//       isRetryable,
//       status: error.response?.status,
//       errorType: this.getErrorType(error),
//       timestamp: new Date().toISOString()
//     }, "ERROR_HANDLING");
    
//     return isRetryable;
//   }

//   // Get error severity
//   getErrorSeverity(error) {
//     const type = this.getErrorType(error);
//     let severity = 'low';
    
//     switch (type) {
//       case ERROR_TYPES.NETWORK_ERROR:
//       case ERROR_TYPES.SERVER_ERROR:
//         severity = 'high';
//         break;
      
//       case ERROR_TYPES.AUTH_ERROR:
//         severity = 'medium';
//         break;
      
//       default:
//         severity = 'low';
//     }
    
//     // 🔹 ADDED: Log severity determination
//     logger.debug("Error severity determined", {
//       errorType: type,
//       severity,
//       timestamp: new Date().toISOString()
//     }, "ERROR_HANDLING");
    
//     return severity;
//   }

//   // Format validation errors
//   formatValidationErrors(validationErrors) {
//     let formattedErrors = [];
    
//     if (Array.isArray(validationErrors)) {
//       formattedErrors = validationErrors.map(err => ({
//         field: err.field || err.param,
//         message: err.msg || err.message,
//         value: err.value,
//       }));
//     } else if (typeof validationErrors === 'object') {
//       formattedErrors = Object.entries(validationErrors).map(([field, messages]) => ({
//         field,
//         message: Array.isArray(messages) ? messages.join(', ') : messages,
//       }));
//     } else {
//       formattedErrors = [{ message: validationErrors }];
//     }
    
//     // 🔹 ADDED: Log validation errors formatting
//     logger.warn("Validation errors formatted", {
//       errorCount: formattedErrors.length,
//       fields: formattedErrors.map(err => err.field).filter(Boolean),
//       timestamp: new Date().toISOString()
//     }, "VALIDATION_ERROR");
    
//     return formattedErrors;
//   }
// }

// export default new ErrorHandler();





// import { HTTP_STATUS, ERROR_TYPES } from './Api_Config';
// import logger from './Logger';

// class ErrorHandler {
//   // Enhance error with additional information
//   enhanceError(error) {
//     const enhancedError = {
//       ...error,
//       isApiError: true,
//       timestamp: new Date().toISOString(),
//       type: this.getErrorType(error),
//     };

//     // Add user-friendly message
//     enhancedError.userMessage = this.getUserFriendlyMessage(error);

//     // Add error code
//     enhancedError.code = this.getErrorCode(error);

//     // Add stack trace if not present
//     if (!enhancedError.stack) {
//       enhancedError.stack = new Error().stack;
//     }

//     return enhancedError;
//   }

//   // Get error type
//   getErrorType(error) {
//     if (!error.response) {
//       return ERROR_TYPES.NETWORK_ERROR;
//     }

//     const status = error.response.status;
    
//     if (status >= 500) {
//       return ERROR_TYPES.SERVER_ERROR;
//     } else if (status === 401 || status === 403) {
//       return ERROR_TYPES.AUTH_ERROR;
//     } else if (status === 422) {
//       return ERROR_TYPES.VALIDATION_ERROR;
//     } else if (status >= 400) {
//       return ERROR_TYPES.CLIENT_ERROR;
//     }

//     return ERROR_TYPES.CLIENT_ERROR;
//   }

//   // Get user-friendly error message
//   getUserFriendlyMessage(error) {
//     if (error.userMessage) {
//       return error.userMessage;
//     }

//     if (!error.response) {
//       return 'Network error. Please check your internet connection and try again.';
//     }

//     const status = error.response.status;
//     const serverMessage = error.response.data?.message;

//     switch (status) {
//       case HTTP_STATUS.BAD_REQUEST:
//         return serverMessage || 'Invalid request. Please check your input.';
      
//       case HTTP_STATUS.UNAUTHORIZED:
//         return 'Incorrect Loginid or Password or session has expired. Please log in again.';
      
//       case HTTP_STATUS.FORBIDDEN:
//         return 'You do not have permission to perform this action.';
      
//       case HTTP_STATUS.NOT_FOUND:
//         return 'The requested resource was not found.';
      
//       case HTTP_STATUS.CONFLICT:
//         return serverMessage || 'A conflict occurred. Please try again.';
      
//       case HTTP_STATUS.UNPROCESSABLE_ENTITY:
//         return serverMessage || 'Validation failed. Please check your input.';
      
//       case HTTP_STATUS.TOO_MANY_REQUESTS:
//         return 'Too many requests. Please try again later.';
      
//       case HTTP_STATUS.SERVER_ERROR:
//         return 'Server error. Our team has been notified. Please try again later.';
      
//       default:
//         return serverMessage || 'An unexpected error occurred. Please try again.';
//     }
//   }

//   // Get error code
//   getErrorCode(error) {
//     if (error.code) {
//       return error.code;
//     }

//     if (error.response?.data?.code) {
//       return error.response.data.code;
//     }

//     if (error.response?.status) {
//       return `HTTP_${error.response.status}`;
//     }

//     return 'UNKNOWN_ERROR';
//   }

//   // Handle API error (for use in components)
//   handleApiError(error, context = {}) {
//     const enhancedError = this.enhanceError(error);
    
//     // Log the error
//     logger.error('API Error Handler', {
//       error: enhancedError,
//       context,
//       userMessage: enhancedError.userMessage,
//     });
    
//     // Show toast notification (if available)
//     if (typeof window !== 'undefined' && window.toast) {
//       window.toast.error(enhancedError.userMessage);
//     }
    
//     // Return error for further handling
//     return enhancedError;
//   }

//   // Check if error is retryable
//   isRetryable(error) {
//     if (!error.response) {
//       return true; // Network errors are retryable
//     }

//     const status = error.response.status;
    
//     // Don't retry client errors except 408, 429
//     if (status >= 400 && status < 500) {
//       return status === 408 || status === 429;
//     }
    
//     // Retry server errors
//     return status >= 500;
//   }

//   // Get error severity
//   getErrorSeverity(error) {
//     const type = this.getErrorType(error);
    
//     switch (type) {
//       case ERROR_TYPES.NETWORK_ERROR:
//       case ERROR_TYPES.SERVER_ERROR:
//         return 'high';
      
//       case ERROR_TYPES.AUTH_ERROR:
//         return 'medium';
      
//       default:
//         return 'low';
//     }
//   }

//   // Format validation errors
//   formatValidationErrors(validationErrors) {
//     if (Array.isArray(validationErrors)) {
//       return validationErrors.map(err => ({
//         field: err.field || err.param,
//         message: err.msg || err.message,
//         value: err.value,
//       }));
//     }
    
//     if (typeof validationErrors === 'object') {
//       return Object.entries(validationErrors).map(([field, messages]) => ({
//         field,
//         message: Array.isArray(messages) ? messages.join(', ') : messages,
//       }));
//     }
    
//     return [{ message: validationErrors }];
//   }
// }

// export default new ErrorHandler();