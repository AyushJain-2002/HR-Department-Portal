import { Navigate } from "react-router";
import { getDecryptedCookie } from "../Utils/secureCookie";

const AuthorizedRoutes = ({ roles = [], children }) => {
  const userInfo = getDecryptedCookie("user");
  const userRole = userInfo?.role?.toLowerCase().trim();

  const allowedRoles = roles.map(r => r.toLowerCase().trim());

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AuthorizedRoutes;



// import { Navigate } from "react-router";
// import { getDecryptedCookie } from "../Utils/secureCookie";

// const AuthorizedRoutes = ({ roles = [], children }) => {
//   const userInfo = getDecryptedCookie("userInfo");
//   const userRole = userInfo?.role?.toLowerCase().trim();
//   const userEmail= userInfo?.email?.toLowerCase().trim();
//   // const allowedRoles = roles.map(r => r.toLowerCase().trim());
//   const allowedEmail = "amarth@gmail.com"


//   // if (!allowedRoles.includes(userRole)) {
//    if (userEmail==allowedEmail) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default AuthorizedRoutes;

