import axios from 'axios';
import { API_CONFIG, TOKEN_CONFIG } from './Api_Config';
import logger from './Logger';
import endpoints from './Endpoints';
import Cookies from "js-cookie"

class TokenManager {
  constructor() {
    this.storage = TOKEN_CONFIG.STORAGE_TYPE === 'Cookies' 
      ? Cookies 
      : sessionStorage;
  }

  // Get access token
  getAccessToken() {
    try {
      const token = this.storage.get(TOKEN_CONFIG.ACCESS_TOKEN_KEY);
      console.log("token")
      // 🔹 ADDED: Log token retrieval
      if (token) {
        logger.debug("Access token retrieved", {
          hasToken: true,
          tokenLength: token.length,
          timestamp: new Date().toISOString()
        }, "AUTH");
      }
      
      return token;
    } catch (error) {
      logger.error('Failed to get access token:', {
        error: error.message,
        timestamp: new Date().toISOString()
      }, "AUTH_ERROR");
      return null;
    }
  }

  // Get refresh token
  getRefreshToken() {
    try {
      const refreshToken = this.storage.get(TOKEN_CONFIG.REFRESH_TOKEN_KEY);
      
      // 🔹 ADDED: Log refresh token retrieval
      if (refreshToken) {
        logger.debug("Refresh token retrieved", {
          hasRefreshToken: true,
          timestamp: new Date().toISOString()
        }, "AUTH");
      }
      
      return refreshToken;
    } catch (error) {
      logger.error('Failed to get refresh token:', {
        error: error.message,
        timestamp: new Date().toISOString()
      }, "AUTH_ERROR");
      return null;
    }
  }

  // Set tokens
  setTokens(accessToken, refreshToken) {
    try {
      this.storage.set(TOKEN_CONFIG.ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) {
        this.storage.set(TOKEN_CONFIG.REFRESH_TOKEN_KEY, refreshToken);
      }
      
      // 🔹 UPDATED: Enhanced token storage logging
      logger.info('Tokens stored successfully', {
        action: "authToken",
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        accessTokenLength: accessToken?.length || 0,
        timestamp: new Date().toISOString(),
        storageType: TOKEN_CONFIG.STORAGE_TYPE
      }, "AUTH");
    } catch (error) {
      logger.error('Failed to store tokens:', {
        error: error.message,
        timestamp: new Date().toISOString()
      }, "AUTH_ERROR");
    }
  }

  // Clear all tokens
  clearTokens() {
    try {
      this.storage.remove(TOKEN_CONFIG.ACCESS_TOKEN_KEY);
      this.storage.remove(TOKEN_CONFIG.REFRESH_TOKEN_KEY);
      this.storage.remove('userInfo');
      
      // 🔹 UPDATED: Enhanced token clear logging
      logger.info('Tokens cleared', {
        action: "clear_tokens",
        timestamp: new Date().toISOString(),
        storageType: TOKEN_CONFIG.STORAGE_TYPE,
        clearedItems: ['authToken', 'refreshToken', 'userInfo']
      }, "AUTH");
    } catch (error) {
      logger.error('Failed to clear tokens:', {
        error: error.message,
        timestamp: new Date().toISOString()
      }, "AUTH_ERROR");
    }
  }

  // Check if token is expired
  isTokenExpired(token) {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();
      const buffer = TOKEN_CONFIG.TOKEN_EXPIRY_BUFFER;
      const isExpired = expiryTime - buffer < currentTime;
      
      // 🔹 ADDED: Log token expiration check
      if (isExpired) {
        logger.warn("Token is expired or about to expire", {
          expiryTime: new Date(expiryTime).toISOString(),
          currentTime: new Date(currentTime).toISOString(),
          buffer: `${buffer}ms`,
          timeRemaining: expiryTime - currentTime
        }, "AUTH");
      }
      
      return isExpired;
    } catch (error) {
      logger.error('Token parsing failed:', {
        error: error.message,
        timestamp: new Date().toISOString()
      }, "AUTH_ERROR");
      return true;
    }
  }

  // Decode token payload
  decodeToken(token) {
    if (!token) return null;
    
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      
      // 🔹 ADDED: Log token decoding
      logger.debug("Token decoded successfully", {
        userId: decoded.sub || decoded.userId,
        email: decoded.email,
        expiry: decoded.exp ? new Date(decoded.exp * 1000).toISOString() : null,
        timestamp: new Date().toISOString()
      }, "AUTH");
      
      return decoded;
    } catch (error) {
      logger.error('Failed to decode token:', {
        error: error.message,
        timestamp: new Date().toISOString()
      }, "AUTH_ERROR");
      return null;
    }
  }

  // Get user info from token
  getUserFromToken() {
    const token = this.getAccessToken();
    if (!token) return null;
    
    const decoded = this.decodeToken(token);
    if (!decoded) return null;
    
    const userInfo = {
      id: decoded.sub || decoded.userId,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
      permissions: decoded.permissions || [],
      exp: decoded.exp,
      iat: decoded.iat,
    };
    
    // 🔹 ADDED: Log user info extraction
    logger.debug("User info extracted from token", {
      userId: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
      timestamp: new Date().toISOString()
    }, "AUTH");
    
    return userInfo;
  }

  // Refresh token
  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      logger.warn('No refresh token available', {
        timestamp: new Date().toISOString(),
        action: "refresh_token_attempt"
      }, "AUTH");
      return null;
    }
    
    // 🔹 ADDED: Log refresh token attempt
    logger.info("Attempting token refresh", {
      hasRefreshToken: true,
      timestamp: new Date().toISOString()
    }, "AUTH");
    
    try {
      const response = await axios.post(endpoints.AUTH.REFRESH_TOKEN, {
        refreshToken,
      });
      
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      
      this.setTokens(accessToken, newRefreshToken);
      
      // 🔹 UPDATED: Enhanced refresh success logging
      logger.info('Token refreshed successfully', {
        action: "refresh_token_success",
        timestamp: new Date().toISOString(),
        newAccessTokenLength: accessToken?.length || 0
      }, "AUTH");
      
      return accessToken;
    } catch (error) {
      // 🔹 UPDATED: Enhanced refresh failure logging
      logger.error('Token refresh failed', {
        error: error.message,
        status: error.response?.status,
        timestamp: new Date().toISOString(),
        action: "refresh_token_failed"
      }, "AUTH_ERROR");
      
      this.clearTokens();
      throw error;
    }
  }

  // Save user data
  saveUserData(userData) {
    try {
      this.storage.set('userInfo', JSON.stringify(userData));
      
      // 🔹 ADDED: Log user data save
      logger.info("User data saved", {
        userId: userData?.id,
        email: userData?.email,
        timestamp: new Date().toISOString()
      }, "USER_DATA");
    } catch (error) {
      logger.error('Failed to save user data:', {
        error: error.message,
        timestamp: new Date().toISOString()
      }, "USER_DATA_ERROR");
    }
  }

  // Get user data
  getUserData() {
    try {
      const data = this.storage.get('userInfo');
      const userData = data ? JSON.parse(data) : null;
      
      // 🔹 ADDED: Log user data retrieval
      if (userData) {
        logger.debug("User data retrieved", {
          userId: userData?.id,
          email: userData?.email,
          timestamp: new Date().toISOString()
        }, "USER_DATA");
      }
      
      return userData;
    } catch (error) {
      logger.error('Failed to get user data:', {
        error: error.message,
        timestamp: new Date().toISOString()
      }, "USER_DATA_ERROR");
      return null;
    }
  }

  // Clear user data
  clearUserData() {
    try {
      this.storage.remove('userInfo');
      
      // 🔹 ADDED: Log user data clear
      logger.info("User data cleared", {
        timestamp: new Date().toISOString(),
        action: "clear_user_data"
      }, "USER_DATA");
    } catch (error) {
      logger.error('Failed to clear user data:', {
        error: error.message,
        timestamp: new Date().toISOString()
      }, "USER_DATA_ERROR");
    }
  }
}

export default new TokenManager();







// import axios from 'axios';
// import { API_CONFIG, TOKEN_CONFIG } from './Api_Config';
// import logger from './Logger';
// import endpoints from './Endpoints';
// import Cookies from "js-cookie"
// class TokenManager {
//   constructor() {
//     this.storage = TOKEN_CONFIG.STORAGE_TYPE === 'Cookies' 
//       ? Cookies 
//       : sessionStorage;
//   }

//   // Get access token
//   getAccessToken() {
//     try {
//       return this.storage.getItem("authToken");
//       // return this.storage.getItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY);
//     } catch (error) {
//       logger.error('Failed to get access token:', error);
//       return null;
//     }
//   }

//   // Get refresh token
//   getRefreshToken() {
//     try {
//       return this.storage.getItem(TOKEN_CONFIG.REFRESH_TOKEN_KEY);
//     } catch (error) {
//       logger.error('Failed to get refresh token:', error);
//       return null;
//     }
//   }

//   // Set tokens
//   setTokens(accessToken, refreshToken) {
//     try {
//       this.storage.setItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY, accessToken);
//       if (refreshToken) {
//         this.storage.setItem(TOKEN_CONFIG.REFRESH_TOKEN_KEY, refreshToken);
//       }
//       logger.info('Tokens stored successfully');
//     } catch (error) {
//       logger.error('Failed to store tokens:', error);
//     }
//   }

//   // Clear all tokens
//   clearTokens() {
//     try {
//       this.storage.removeItem(TOKEN_CONFIG.ACCESS_TOKEN_KEY);
//       this.storage.removeItem(TOKEN_CONFIG.REFRESH_TOKEN_KEY);
//       this.storage.removeItem('userInfo');
//       logger.info('Tokens cleared');
//     } catch (error) {
//       logger.error('Failed to clear tokens:', error);
//     }
//   }

//   // Check if token is expired
//   isTokenExpired(token) {
//     if (!token) return true;
    
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       const expiryTime = payload.exp * 1000;
//       const currentTime = Date.now();
//       const buffer = TOKEN_CONFIG.TOKEN_EXPIRY_BUFFER;
      
//       return expiryTime - buffer < currentTime;
//     } catch (error) {
//       logger.error('Token parsing failed:', error);
//       return true;
//     }
//   }

//   // Decode token payload
//   decodeToken(token) {
//     if (!token) return null;
    
//     try {
//       const payload = token.split('.')[1];
//       return JSON.parse(atob(payload));
//     } catch (error) {
//       logger.error('Failed to decode token:', error);
//       return null;
//     }
//   }

//   // Get user info from token
//   getUserFromToken() {
//     const token = this.getAccessToken();
//     if (!token) return null;
    
//     const decoded = this.decodeToken(token);
//     if (!decoded) return null;
    
//     return {
//       id: decoded.sub || decoded.userId,
//       email: decoded.email,
//       username: decoded.username,
//       role: decoded.role,
//       permissions: decoded.permissions || [],
//       exp: decoded.exp,
//       iat: decoded.iat,
//     };
//   }

//   // Refresh token
//   async refreshToken() {
//     const refreshToken = this.getRefreshToken();
    
//     if (!refreshToken) {
//       logger.warn('No refresh token available');
//       return null;
//     }
    
//     try {
//       const response = await axios.post(endpoints.AUTH.REFRESH_TOKEN, {
//         refreshToken,
//       });
      
//       const { accessToken, refreshToken: newRefreshToken } = response.data;
      
//       this.setTokens(accessToken, newRefreshToken);
//       logger.info('Token refreshed successfully');
      
//       return accessToken;
//     } catch (error) {
//       logger.error('Token refresh failed:', error);
//       this.clearTokens();
//       throw error;
//     }
//   }

//   // Save user data
//   saveUserData(userData) {
//     try {
//       this.storage.setItem('userInfo', JSON.stringify(userData));
//     } catch (error) {
//       logger.error('Failed to save user data:', error);
//     }
//   }

//   // Get user data
//   getUserData() {
//     try {
//       const data = this.storage.getItem('userInfo');
//       return data ? JSON.parse(data) : null;
//     } catch (error) {
//       logger.error('Failed to get user data:', error);
//       return null;
//     }
//   }

//   // Clear user data
//   clearUserData() {
//     try {
//       this.storage.removeItem('userInfo');
//     } catch (error) {
//       logger.error('Failed to clear user data:', error);
//     }
//   }
// }

// export default new TokenManager();