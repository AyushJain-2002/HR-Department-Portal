// src/Components/DashboardSelector.jsx
// import { Navigate } from "react-router-dom";
import { getDecryptedCookie } from "../../Utils/secureCookie";
// import DashboardAdmin from "./DashboardAdmin";
// import EmployeeDashboard from "./EmployeeDashboard";
// import OperationDashboard from "./OperationDashboard";

// import POSPDashboard from "./POSPDashboard";
// import Cookies from "js-cookie";
// import Home from "./Home";
import { useAuth } from "../../hooks/useAuth";
import DashboardHR from "./DashboardHR";

const DashboardSelector = () => {
  const {authState} = useAuth();
  const userInfo = getDecryptedCookie("user");
  const userRole = userInfo?.role;
    const token = authState?.authToken;

  switch (userRole) {
    // case "SuperAdmin":
    //   return <Home />;
    // case "Admin":
    //   return <DashboardAdmin />;
    case "HR":
    case "HR-Head":
      return <DashboardHR />;
    // case "Operation":
    // case "Operation-Head":
    //   return <OperationDashboard />;
    // case "Posp":
    //   return <POSPDashboard />;
    // Add other role cases as needed
    default:
      return <DashboardHR />;
  }
};

export default DashboardSelector;