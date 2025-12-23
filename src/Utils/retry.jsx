import { API_CONFIG } from '../api/Api_Config';
import { ApiError } from '../api/types';

export async function withRetry(operation, maxAttempts = API_CONFIG.MAX_RETRIES, delay = API_CONFIG.RETRY_DELAY) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Try the API call
      return await operation();
    } catch (error) {
      lastError = error || new Error('Operation failed, Please retry!');

      // Do NOT retry for client errors (400–499)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Reached last attempt → break loop
      if (attempt === maxAttempts) {
        break;
      }

      // Wait before retrying (exponential delay)
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  //   // 🔹 FIX: Always throw a proper Error object
  // if (!lastError || !(lastError instanceof Error)) {
  //   lastError = new Error(lastError?.message || 'Operation failed after retries');
  // }
  return lastError;
}
