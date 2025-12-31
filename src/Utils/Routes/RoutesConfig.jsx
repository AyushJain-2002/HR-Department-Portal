import Signup from "../../components/auth/SignUpForm.jsx";
import SignIn from "../../pages/AuthPages/SignIn.jsx";
import Reset_Password from "../../pages/AuthPages/Reset_Password.jsx";
import Unauthorized from "../../pages/OtherPage/Unauthorized.jsx";
import DashboardSelector from "../../pages/Dashboard/DashboardSelector.jsx";
import MyProfile from "../../pages/MyProfile.jsx";
import HrPospReport from "../../pages/HrReports/POSP/HrPospReport.jsx";
import HrEmployee from "../../pages/Employee/HrEmployee.jsx";
import Group from "../../pages/Group/Group.jsx";
import Zone from "../../pages/Zones/Zone.jsx";
import Region from "../../pages/Zones/Region.jsx";
import Department from "../../pages/Department-Designations/Department.jsx";
import Designation from "../../pages/Department-Designations/Designation.jsx";
import Branch from "../../pages/Branch_BranchManager/Branch.jsx";
import Banks from "../../pages/Fuel/Banks.jsx";
import PolicyReferBy from "../../pages/Policy/PolicyReferBy";
import EmployeeAccountReport from "../../pages/HrReports/Employee/EmployeeAccountReport.jsx";
import MispReport from "../../pages/HrReports/Employee/MispReport.jsx";
import MispCreate from "../../pages/MISP/MispCreate.jsx";
import PospAccountReport from "../../pages/HrReports/POSP/PospAccountReport.jsx";
import HrPospUpdate from "../../pages/HrPosp/HrPospUpdate.jsx";
import City from "../../pages/Cities/City.jsx";
import BranchManager from "../../pages/Branch_BranchManager/BranchManager.jsx";
import ROLES from "../Routes/RolesConfig.jsx";

// ==================== PUBLIC ROUTES ====================
 export const publicRoutes = [
  {
    name: "Sign In",
    path: "/signin",
    component: <SignIn/>
  },
  {
    name: "Reset Password",
    path: "/reset-password",
    component: <Reset_Password/>
  },
  {
    name: "Signup",
    path: "/signup",
    component: <Signup/>
  },
  {
    name: "Unauthorized",
    path: "/Unauthorized",
    component: <Unauthorized/>
  },
];

// ==================== PRIVATE ROUTES ====================
 export const privateRoutes = [
  // // Dashboard routes
  {
    name: "Dashboard Selector",
    path: "/",
    component: <DashboardSelector/>,
    roles: [ROLES.HR,ROLES.HR_HEAD] // Accessible to all authenticated users
  },
  {
    name:"MyProfile",
    path: "/MyProfile",
    component: <MyProfile/>,
    roles:[ROLES.HR,ROLES.HR_HEAD]
  },
  {
    name: "My Profile",
    path: "/profile",
    component: <MyProfile/>,
    roles: [ROLES.HR] // Accessible to all authenticated users
  },

  // HR routes
  {
    name: "HR POSP",
    path: "/hr-posp",
    component: <HrPospReport/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create Employee",
    path: "/master/hr/create-employee",
    component: <HrEmployee/>,
    roles: [ROLES.HR,ROLES.HR_HEAD]
  },
  {
    name: "Create Group",
    path: "/master/hr/create-group",
    component: <Group/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create Zone",
    path: "/master/hr/create-zone",
    component: <Zone/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create Region",
    path: "/master/hr/create-region",
    component: <Region/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create Department",
    path: "/create-department",
    component: <Department/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create Designation",
    path: "/master/hr/create-designation",
    component: <Designation/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create Branch",
    path: "/master/hr/create-Branch",
    component: <Branch/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create Bank",
    path: "/master/hr/create-bank",
    component: <Banks/>,
    roles: [ROLES.HR]
  },
  {
    name: "Policy Refer By",
    path: "/master/hr/policy-refer-by",
    component: <PolicyReferBy/>,
    roles: [ROLES.HR]
  },
  {
    name: "Employee Report",
    path: "/reports/hr/employee-report",
    component: <Employee-Report/>,
    roles: [ROLES.HR]
  },
  {
    name: "Employee Account Details",
    path: "/reports/hr/employee-ac-details",
    component: <EmployeeAccountReport/>,
    roles: [ROLES.HR]
  },
  // {
  //   name: "POSP Report",
  //   path: "/reports/hr/posp-report",
  //   component: <HrPosp/>,
  //   roles: [ROLES.HR]
  // },
  {
    name: "MISP Report",
    path: "/reports/hr/misp-report",
    component: <MispReport/>,
    roles: [ROLES.HR]
  },
  {
    name: "Add MISP",
    path: "/master/hr/add-misp",
    component: <MispCreate/>,
    roles: [ROLES.HR]
  },
  // {
  //   name: "Edit MISP",
  //   path: "/master/hr/edit-misp/:id",
  //   component: <MispCreate/>,
  //   roles: [ROLES.HR]
  // },
  {
    name: "POSP Account Details",
    path: "/reports/hr/posp-ac-details",
    component: <PospAccountReport/>,
    roles: [ROLES.HR]
  },
  {
    name: "HR POSP Update",
    path: "/hr-posp/:id",
    component: <HrPospUpdate/>,
    roles: [ROLES.HR]
  },
  {
    name: "Edit Employee",
    path: "/master/hr/edit-employee/:id",
    component: <HrEmployee/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create Department HR",
    path: "/master/hr/create-department",
    component: <Department/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create Group Master",
    path: "/create-group",
    component: <Group/>,
    roles: [ROLES.HR]
  },
  {
    name: "Create City",
    path: "/master/create-city",
    component: <City/>,
    roles: [ROLES.HR]
  },
  {
    name: "Branch Manager",
    path: "/Branch-Manager/:id",
    component: <BranchManager/>,
    roles: [ROLES.HR]
  },
 ];
