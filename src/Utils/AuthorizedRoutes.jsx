import { Navigate } from "react-router";
import { getDecryptedCookie } from "../Utils/secureCookie";

const AuthorizedRoutes = ({ roles = [], children }) => {
  const userInfo = getDecryptedCookie("user");
  const userRole = userInfo?.role?.toLowerCase().trim();

  const allowedRoles = roles.map(r => r.toLowerCase().trim());

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/Unauthorized" replace />;
  }

  return children;
};

export default AuthorizedRoutes;
