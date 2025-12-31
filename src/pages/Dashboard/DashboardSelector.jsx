
import { getDecryptedCookie } from "../../Utils/secureCookie";
import { useAuth } from "../../hooks/useAuth";
import DashboardHR from "./DashboardHR";

const DashboardSelector = () => {
  const {authState} = useAuth();
  const userInfo = getDecryptedCookie("user");
  const userRole = userInfo?.role;
    const token = authState?.authToken;

  switch (userRole) {
    case "HR":
    case "HR-Head":
      return <DashboardHR />;
    default:
      return <DashboardHR />;
  }
};

export default DashboardSelector;