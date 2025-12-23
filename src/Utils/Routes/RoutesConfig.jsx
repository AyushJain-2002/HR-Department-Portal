import SignIn from "../../pages/AuthPages/SignIn.jsx";
import Reset_Password from "../../pages/AuthPages/Reset_Password.jsx";
import PospSignup1 from "../../pages/AuthPages/PospSignup1.jsx";
import Unauthorized from "../../pages/OtherPage/Unauthorized.jsx";
import Signup from "../../components/auth/SignUpForm.jsx";
// // // Import all your components
import POSPInstructions from "../../pages/Posp/PospTraining/POSPInstructions.jsx";
import TrainingInstruction from "../../pages/Posp/PospTraining/TrainingInstruction.jsx";
import PospMailReExam from "../../pages/Posp/PospTraining/PospMailReExam.jsx";
import EmailVerification from "../../pages/Posp/EmailVerification.jsx";
import DashboardSelector from "../../pages/Dashboard/DashboardSelector.jsx";
import DashboardAdmin from "../../pages/Dashboard/DashboardAdmin.jsx";
import MyProfile from "../../pages/MyProfile.jsx";
import HrPospReport from "../../pages/HrReports/POSP/HrPospReport.jsx";
import HrEmployee from "../../pages/employee/HrEmployee.jsx";
import Group from "../../pages/Group/Group.jsx";
import Zone from "../../pages/Zones/Zone.jsx";
import Region from "../../pages/Zones/Region.jsx";
import Department from "../../pages/Department-Designations/Department.jsx";
import Designation from "../../pages/Department-Designations/Designation.jsx";
import Branch from "../../pages/Branch_BranchManager/Branch.jsx";
import Banks from "../../pages/Fuel/Banks.jsx";
import PolicyReferBy from "../../pages/Policy/PolicyReferBy";
import HrEmployeeReport from "../../pages/HrReports/Employee/HrEmployeeReport.jsx";
import EmployeeAccountReport from "../../pages/HrReports/Employee/EmployeeAccountReport.jsx";
import MispReport from "../../pages/HrReports/Employee/MispReport.jsx";
import MispCreate from "../../pages/MISP/MispCreate.jsx";
import PospAccountReport from "../../pages/HrReports/POSP/PospAccountReport.jsx";
import HrPospUpdate from "../../pages/HrPosp/HrPospUpdate.jsx";
// import PolicyAnotherEntry from "../../pages/Policy/MotorPolicyEntry.jsx";
// import PolicyNonmotorEntry from "../../pages/Policy/NonMotorPolicyEntry.jsx";
import City from "../../pages/Cities/City.jsx";
import BranchManager from "../../pages/Branch_BranchManager/BranchManager.jsx";
import RenewalReport from "../../pages/NibReports/RenewalReport.jsx";
import ROLES from "../Routes/RolesConfig.jsx";

import UserProfiles from "../../pages/UserProfiles.jsx";
import Videos from "../../pages/UiElements/Videos.jsx";
import Images from "../../pages/UiElements/Images.jsx";
import Alerts from "../../pages/UiElements/Alerts.jsx";
import Badges from "../../pages/UiElements/Badges.jsx";
import Avatars from "../../pages/UiElements/Avatars.jsx";
import Buttons from "../../pages/UiElements/Buttons.jsx";
import LineChart from "../../pages/Charts/LineChart.jsx";
import BarChart from "../../pages/Charts/BarChart.jsx";
// import Calendar from "../pages/Calendar";
import BasicTables from "../../pages/Tables/BasicTables.jsx";
import DynamicForm from "../../pages/Tables/DynamicForm.jsx";
import FormElements from "../../pages/Forms/FormElements.jsx";
import Blank from "../../pages/Blank.jsx";



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
    path: "/unauthorized",
    component: <Unauthorized/>
  },
      {path:"/blank", component:<Blank />},
    {path:"/form-elements", component:<FormElements />},
    {path:"/basic-tables", component:<BasicTables />},
    {path:"/dynamic-form", component:<DynamicForm />},
    {path:"/alerts", component:<Alerts />},
    {path:"/avatars" ,component:<Avatars />},
    {path:"/badge", component:<Badges />},
    {path:"/buttons", component:<Buttons />},
    {path:"/images", component:<Images />},
    {path:"/videos", component:<Videos />},
    {path:"/line-chart", component:<LineChart />},
    {path:"/bar-chart", component:<BarChart />},
];

// ==================== PRIVATE ROUTES ====================
 export const privateRoutes = [
  // Common routes accessible to all authenticated users
  //   {
  //   name: "Exam Instructions",
  //   path: "/exam-instruction",
  //   component: <POSPInstructions/>,
  //   roles: [ROLES.POSP, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "POSP Training Instructions",
  //   path: "/posp-training-instructions",
  //   component: <TrainingInstruction/>,
  //   roles: [ROLES.POSP, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "POSP Reattempt Mail",
  //   path: "/posp-reattampt-mail",
  //   component: <PospMailReExam/>,
  //   roles: [ROLES.POSP, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Email Verification",
  //   path: "/email-verification",
  //   component: <EmailVerification/>,
  //   roles: [ROLES.POSP, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Operation Dashboard",
  //   path: "/operation-dashboard",
  //   component: <DashboardAdmin/>,
  //   roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN] // Accessible to all authenticated users
  // },
  // // Dashboard routes
  {
    name: "Dashboard Selector",
    path: "/",
    component: <DashboardSelector/>,
    roles: [ROLES.SUPER_ADMIN] // Accessible to all authenticated users
  },
  {
    name: "Employee Dashboard",
    path: "/employee-dashboard",
    component: <DashboardAdmin/>,
    roles: [ROLES.SUPER_ADMIN] // Accessible to all authenticated users
  },

  {
    name: "My Profile",
    path: "/profile",
    component: <MyProfile/>,
    roles: [ROLES.HR, ROLES.SUPER_ADMIN] // Accessible to all authenticated users
  },

  // HR routes
  {
    name: "HR POSP",
    path: "/hr-posp",
    component: <HrPospReport/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Employee",
    path: "/master/hr/create-employee",
    component: <HrEmployee/>,
    roles: [ROLES.HR, ROLES.ADMIN,ROLES.HR_HEAD, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Group",
    path: "/master/hr/create-group",
    component: <Group/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Zone",
    path: "/master/hr/create-zone",
    component: <Zone/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Region",
    path: "/master/hr/create-region",
    component: <Region/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Department",
    path: "/create-department",
    component: <Department/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Designation",
    path: "/master/hr/create-designation",
    component: <Designation/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Branch",
    path: "/master/hr/create-Branch",
    component: <Branch/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Bank",
    path: "/master/hr/create-bank",
    component: <Banks/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Policy Refer By",
    path: "/master/hr/policy-refer-by",
    component: <PolicyReferBy/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Employee Report",
    path: "/reports/hr/employee-report",
    component: <Employee-Report/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Employee Account Details",
    path: "/reports/hr/employee-ac-details",
    component: <EmployeeAccountReport/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  // {
  //   name: "POSP Report",
  //   path: "/reports/hr/posp-report",
  //   component: <HrPosp/>,
  //   roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  {
    name: "MISP Report",
    path: "/reports/hr/misp-report",
    component: <MispReport/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Add MISP",
    path: "/master/hr/add-misp",
    component: <MispCreate/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  // {
  //   name: "Edit MISP",
  //   path: "/master/hr/edit-misp/:id",
  //   component: <MispCreate/>,
  //   roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  {
    name: "POSP Account Details",
    path: "/reports/hr/posp-ac-details",
    component: <PospAccountReport/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "HR POSP Update",
    path: "/hr-posp/:id",
    component: <HrPospUpdate/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Edit Employee",
    path: "/master/hr/edit-employee/:id",
    component: <HrEmployee/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Department HR",
    path: "/master/hr/create-department",
    component: <Department/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create Group Master",
    path: "/create-group",
    component: <Group/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Create City",
    path: "/master/create-city",
    component: <City/>,
    roles: [ROLES.HR, ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  {
    name: "Branch Manager",
    path: "/branch-Manager/:id",
    component: <BranchManager/>,
    roles: [ROLES.HR, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  },
  


 ];




  // // // Operation routes
  // {
  //   name: "Motor Policy Entry",
  //   path: "/operation/policy-entry/non-life/motor",
  //   component: <PolicyAnotherEntry/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Non-Motor Policy Entry",
  //   path: "/operation/policy-entry/non-life/nonmotor",
  //   component: <PolicyNonmotorEntry/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Create Inventory",
  //   path: "/entry/hr/create-inventory",
  //   component: <Inventory/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Create Fuel",
  //   path: "/master/operation/create-fuel",
  //   component: <Fuel/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Create Addon",
  //   path: "/master/operation/create-addon",
  //   component: <Addons/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Create Customer",
  //   path: "/master/operation/life-create-customer",
  //   component: <Customer/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Create Rider",
  //   path: "/master/operation/create-rider",
  //   component: <Rider/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
    
  // // Operation reports
  // {
  //   name: "OPS Business Report",
  //   path: "/reports/operations/ops-business-report",
  //   component: <OPS_Business_Reports/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "OPS Entry Summary",
  //   path: "/reports/performance/ops-entry-summary",
  //   component: <OPS_Entry_Summary/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Growth Report",
  //   path: "/reports/performance/growth-report",
  //   component: <Growth_Reports/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Sales Summary Report",
  //   path: "/reports/performance/sales-summary",
  //   component: <Sales_Summary_Reports/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Sales Person Report",
  //   path: "/reports/performance/sales-person-reports",
  //   component: <Sales_Person_Reports/>,
  //   roles: [ROLES.OPERATION, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },

  // // // Accounts routes
  // {
  //   name: "Create Insurance Company",
  //   path: "/master/accounts/create-insurance-company",
  //   component: <InsuranceCompany/>,
  //   roles: [ROLES.ACCOUNTS, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Create Insurer Branch",
  //   path: "/master/accounts/create-insurer-branch",
  //   component: <InsurerBranch/>,
  //   roles: [ROLES.ACCOUNTS, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "Insurer Branch Manager",
  //   path: "/master/accounts/insurer-branch-Manager/:id",
  //   component: <InsurerBranchManager/>,
  //   roles: [ROLES.ACCOUNTS, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // },

  // // // POSP routes
  // {
  //   name: "Create POSP",
  //   path: "/master/hr/create-posp",
  //   component: <CreatePosp/>,
  //   roles: [ROLES.POSP, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "POSP Document",
  //   path: "/posp-document",
  //   component: <PospDocument/>,
  //   roles: [ROLES.POSP, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "POSP Dashboard",
  //   path: "/posp-dashboard",
  //   component: <Dashboard/>,
  //   roles: [ROLES.POSP, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "POSP Training",
  //   path: "/posp-training",
  //   component: <Training/>,
  //   roles: [ROLES.POSP, ROLES.SUPER_ADMIN]
  // },
  // {
  //   name: "POSP Exam",
  //   path: "/posp-exam",
  //   component: <PospExam/>,
  //   roles: [ROLES.POSP, ROLES.SUPER_ADMIN]
  // },

  // Master data routes accessible to multiple roles
    // // // Renewal Reports
  // {
  //   name: "Renewal Report",
  //   path: "/reports/renewal-report",
  //   component: <RenewalReport/>,
  //   roles: [ROLES.RENEWAL, ROLES.ADMIN, ROLES.SUPER_ADMIN]
  // }