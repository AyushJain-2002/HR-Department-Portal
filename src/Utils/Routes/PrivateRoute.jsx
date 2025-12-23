import Cookies from "js-cookie";
import { getDecryptedCookie } from "../secureCookie.js";
import { useEffect, useState } from "react";
import Loading from "../../pages/Loading.jsx";
import { Navigate, useLocation } from "react-router-dom";
import ROLES from "./RolesConfig.jsx";

export const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const [authState, setAuthState] = useState({
    token: null,
    userInfo: null,
    isLoading: true
  });

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userInfo = getDecryptedCookie("user");
    setAuthState({
      token,
      userInfo,
      isLoading: false
    });
  }, []);

  if (authState.isLoading) {
    return <Loading />;
  }

  // Redirect authenticated users away from auth pages
  if (location.pathname === "/signin" && authState.token && authState.userInfo?.id) {
    return <Navigate to="/" replace />;
  }

  if (!authState.token || !authState.userInfo?.id) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // SuperAdmin bypasses all checks
  if (authState.userInfo.role === ROLES.SUPER_ADMIN) {
    return children;
  }

  // No role restrictions
  if (allowedRoles.length === 0) {
    return children;
  }


  // Check role access
  const userRoles = Array.isArray(authState.userInfo.role) 
    ? authState.userInfo.role 
    : [authState.userInfo.role];
  const hasAccess = allowedRoles.some(role => userRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};