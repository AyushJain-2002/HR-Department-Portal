//src/api/service/authService.jsx 

import {HttpClient} from '../../Utils/http-client.jsx';
import { withRetry } from '../../Utils/retry.jsx';
import ENDPOINTS from '../Endpoints.js';
import { ErrorHandler } from '../../Utils/error-handler.jsx';
import logger from '../Logger.js';

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



