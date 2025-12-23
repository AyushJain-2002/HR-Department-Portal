import { useDispatch, useSelector } from "react-redux";
import { loginUser,registerUser, logout,resendEmailVerification } from "../store/NewReducers/authSlice"; //verifyToken,,clearError
import { useLogger } from "./useLogger";

export const useAuth = () => {
  const dispatch = useDispatch();
//   const { isAuthenticated, authToken, user, loading, error } = useSelector(
//     (state) => state.auth
//   );
  //   const { isAuthenticated, authToken, user, loading, error } = useSelector(
  //   (state) => state.auth
  // );
  // 🔹 Get auth state from Redux store
  const authState = useSelector((state) => state.auth);
  const logger = useLogger("useAuth");
  const handleLogin =({ email, password }) => {
    logger.info("User Login Attempt", { email });
    return dispatch(loginUser({ email, password }));
  };

  const handleRegister = (userData)=>{
    logger.info("User Registeration Attempt",{userData});
    return dispatch(registerUser(userData));
  }
  const handleResendEmailVerification = (authToken) =>{
    logger.info("resend email verification attempt")
    return dispatch(resendEmailVerification({authToken}));
  }
  const handleVerifyToken = async (authToken) => {
    return await dispatch(verifyToken({ authToken }));
  };

  const handleLogout = async () => {
    logger.info("User Logout");
    dispatch(logout());
  };

  return {
    authState,
    
    // authToken,
    login: handleLogin,
    registerUser:handleRegister,
    resendEmailVerification:handleResendEmailVerification,
    verifyToken: handleVerifyToken,
    logout: handleLogout,
    // clearError: () => dispatch(clearError()),
  };
};
