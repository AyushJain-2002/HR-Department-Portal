import Cookies from 'js-cookie';
import { TOKEN_CONFIG } from '../Api_Config';

const TOKEN_KEY = TOKEN_CONFIG.ACCESS_TOKEN_KEY;
const USER_KEY = 'user';
// const MAC_KEY = 'macAddress';

class AuthManager {
  static instance = null;
  authToken = null;
  user = null;
  // macAddress = null;

  static getInstance() {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

 getToken() {
    if (!this.authToken) {
      this.authToken =Cookies.get(TOKEN_KEY);
    }
    return this.authToken;
  }

 getUser() {
    if (!this.user) {
      this.user =Cookies.get("user");
    }
    return this.user;
  }

  // getMacAddress() {
  //   if (!this.macAddress) {
  //     this.macAddress = Cookies.get(MAC_KEY);
  //   }
  //   return this.macAddress;
  // }

   setAuthData(authToken, user) {
    this.authToken = authToken;
     Cookies.set(TOKEN_KEY, authToken);

    // this.macAddress = macAddress;
    // await AsyncStorage.setItem(MAC_KEY, macAddress ? macAddress : 'Dummy');

    this.user = user;
     Cookies.set(USER_KEY, user);
  }

  clearAuth() {
    this.authToken = null;
    this.user = null;
    // this.macAddress = null;

     Cookies.remove(TOKEN_KEY);
     Cookies.remove(USER_KEY);
    //  Cookies.remove(MAC_KEY);
  }

  isAuthenticated() {
    const token =this.getToken();
    return !!token;
  }
}

export default AuthManager;
