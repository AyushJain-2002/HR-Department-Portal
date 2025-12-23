// import apiService from './ApiService';
import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry';
import ENDPOINTS from '../Endpoints';
import { ErrorHandler } from '../../utils/error-handler';
import logger from '../Logger';

export class AuthService {
  static instance = null;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data) {
    try {
      logger.info("Logging in user", { email: data.email });
      // console.log("after logging auth service",withRetry(() =>
      //   this.httpClient.post(ENDPOINTS.AUTH.LOGIN, data)
      // ))
      // return await withRetry(() =>
      //   this.httpClient.post(ENDPOINTS.AUTH.LOGIN, data)
      // );
      return await this.httpClient.post(ENDPOINTS.AUTH.LOGIN, data);
    } catch (err) {
      throw ErrorHandler.handle(err, "AuthService.login");
    }
  }

    async register(userData) {
      try{
        return await this.httpClient.post(ENDPOINTS.AUTH.REGISTER, userData);
      }catch(error){
        throw ErrorHandler.handle(error,"AuthService.register");
      }
}

  // Verify email
  async verifyEmail(token) {
    try{
      return this.httpClient.post(ENDPOINTS.AUTH.VERIFY_EMAIL, token);
    }catch(error){
      throw ErrorHandler.handle(error,"AuthService.verifyEmail");
    }
  }
  async verifyToken(data) {
    try {
      logger.info("Verifying Token");

      return await withRetry(() =>
        this.httpClient.post(ENDPOINTS.VERIFY_TOKEN, data)
      );
    } catch (err) {
      throw ErrorHandler.handle(err, "AuthService.verifyToken");
    }
  }

}


// async sendOtp(data) {
//   try {
  //     logger.info(
    //       'Sending OTP', 
    //       { mobileNumber: data.mobileNumber },
    //       'AuthService'
//     );
//     return await withRetry(() =>
//       this.httpClient.post(endpoints.SEND_OTP, data)
//     );
//   } catch (error) {
//     throw ErrorHandler.handle(error, 'AuthService.sendOtp');
//   }
// }

// async verifyOtp(data) {
//   try {
//     logger.info(
//       'Verifying OTP',
//       { mobileNumber: data.mobileNumber },
//       'AuthService'
//     );
//     return await withRetry(() =>
//       this.httpClient.post(endpoints.VERIFY_OTP, data)
//     );
//   } catch (error) {
//     throw ErrorHandler.handle(error, 'AuthService.verifyOtp');
//   }
// }

// async verifyToken(data) {
//   try {
//     logger.info(
//       'Verifying token',
//       { email: data.email },
//       'AuthService'
//     );
//     return await withRetry(() =>
//       this.httpClient.post(endpoints.VERIFY_TOKEN, data)
//     );
//   } catch (error) {
//     throw ErrorHandler.handle(error, 'AuthService.verifyToken');
//   }
// }

// async doctorSendOtp(data) {
//   try {
//     logger.info(
//       'Sending doctor OTP',
//       { mobileNumber: data.mobileNumber },
//       'AuthService'
//     );
//     return await withRetry(() =>
//       this.httpClient.post(endpoints.DOCTOR_SEND_OTP, data)
//     );
//   } catch (error) {
//     throw ErrorHandler.handle(error, 'AuthService.doctorSendOtp');
//   }
// }

// async doctorVerifyOtp(data) {
//   try {
//     logger.info(
//       'Verifying doctor OTP',
//       { mobileNumber: data.mobileNumber },
//       'AuthService'
//     );
//     return await withRetry(() =>
//       this.httpClient.post(endpoints.DOCTOR_VERIFY_OTP, data)
//     );
//   } catch (error) {
  //     throw ErrorHandler.handle(error, 'AuthService.doctorVerifyOtp');
  //   }
  // }
    





// import apiService from './ApiService';
// import endpoints from '../Endpoints';
// import tokenManager from '../TokenManager';

// class AuthService {
//   // Login
//   async login(credentials) {
//     const response = await apiService.post(endpoints.AUTH.LOGIN, credentials);
    
//     if (response.tokens) {
//       tokenManager.setTokens(
//         response.tokens.accessToken,
//         response.tokens.refreshToken
//       );
      
//       if (response.user) {
//         tokenManager.saveUserData(response.user);
//       }
//     }
    
//     return response;
//   }

//   // Register
//   async register(userData) {
//     return apiService.post(endpoints.AUTH.REGISTER, userData);
//   }

//   // Logout
//   async logout() {
//     try {
//       await apiService.post(endpoints.AUTH.LOGOUT);
//     } finally {
//       tokenManager.clearTokens();
//       tokenManager.clearUserData();
//     }
//   }

//   // Get current user
//   async getCurrentUser() {
//     const cachedUser = tokenManager.getUserData();
//     if (cachedUser) {
//       return cachedUser;
//     }
    
//     const response = await apiService.get(endpoints.AUTH.ME);
//     tokenManager.saveUserData(response.user);
//     return response.user;
//   }

//   // Forgot password
//   async forgotPassword(email) {
//     return apiService.post(endpoints.AUTH.FORGOT_PASSWORD, { email });
//   }

//   // Reset password
//   async resetPassword(token, newPassword) {
//     return apiService.post(endpoints.AUTH.RESET_PASSWORD, {
//       token,
//       password: newPassword,
//     });
//   }

//   // Change password
//   async changePassword(currentPassword, newPassword) {
//     return apiService.post(endpoints.AUTH.CHANGE_PASSWORD, {
//       currentPassword,
//       newPassword,
//     });
//   }

//   // Verify email
//   async verifyEmail(token) {
//     return apiService.post(endpoints.AUTH.VERIFY_EMAIL, { token });
//   }

//   // Check if user is authenticated
//   isAuthenticated() {
//     const token = tokenManager.getAccessToken();
//     return token && !tokenManager.isTokenExpired(token);
//   }

//   // Get user from token
//   getUserFromToken() {
//     return tokenManager.getUserFromToken();
//   }
// }

// export default new AuthService();


