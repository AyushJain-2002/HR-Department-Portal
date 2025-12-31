//src/api/axiosInstance.js
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

    return response;
  },
  (error) => {
    logger.error('Axios Response Error', error, 'API_ERROR');
    return Promise.reject(error);
  }
);

export default axiosInstance;





