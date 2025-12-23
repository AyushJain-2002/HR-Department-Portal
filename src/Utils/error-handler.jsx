import logger from '../api/Logger';

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
