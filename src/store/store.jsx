import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./NewReducers/StateSlice";
import branchReducer from "./NewReducers/BranchSlice";
import zoneReducer from "./NewReducers/ZonesSlice";
import groupReducer from "./NewReducers/GroupSlice";
import departmentsReducer from "./NewReducers/DepartmentSlice";
import insuranceCompany from "./NewReducers/InsurerBranchSlice";
import fuels from "./NewReducers/FuelSlice";
import riders from "./NewReducers/RidersSlice";
// import posp from "./NewReducers/PospSignUpInSlice";
import employeeReducer from "./NewReducers/EmployeeSlice";
import inventory from "./NewReducers/InventorySlice";
// import motorReducer from "./NewReducers/MotorSlice";
// import customerReducer from "./NewReducers/CustomerSlice";
// import inventory from "./NewReducers/InventoryCopySlice"
import addons from "./NewReducers/AddOnSlice";
import operationSlice from "./NewReducers/OperationSlice";
import mispSlice from "./NewReducers/MispSlice";
// import opsreportsReducer from "./NewReducers/OpsBusinessReportsSlice";
// import operationentryreportsReducer from "./NewReducers/OperationEntryReportsSlice";
import growthreportsReducer from "./NewReducers/GrowthReportSlice";
// import salessummaryReducer from "./NewReducers/SalesSummarySlice";
// import salespersonSlice from "./NewReducers/SalesPersonSlice";
import policyReferBySlice from "./NewReducers/PolicyReferBySlice";
import customer from './NewReducers/CustomerSlice';
import  assignOfficialPospSlice from "./NewReducers/AssignOfficialPospSlice";
// import { logMiddleware, asyncActionMiddleware } from '../api/logMiddleware'; // 🔹 ADD THIS
import authReducer from "./NewReducers/authSlice"
export const store = configureStore({
  reducer: {
    states: stateReducer,
    zones: zoneReducer,
    departments: departmentsReducer,
    branches: branchReducer,
    groups: groupReducer,
    insuranceCompany: insuranceCompany,
    fuels: fuels,
    riders: riders,
    // posp: posp,
    inventory: inventory,
    employee: employeeReducer,
    // motor: motorReducer,
    customer: customer,
    addons:addons,
    // opsreports: opsreportsReducer,
    // operationentryreports: operationentryreportsReducer,
    growthreports: growthreportsReducer,
    // salessummary: salessummaryReducer,
    // salesperson: salespersonSlice,
    operation: operationSlice,
    misp: mispSlice,
    policyReferBy: policyReferBySlice,
    assignOfficialPosp:assignOfficialPospSlice,
    auth: authReducer,
  //   devTools: import.meta.env.NODE_ENV === 'development',
  //   middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, // Adjust based on your needs
  //   }).concat(logMiddleware, asyncActionMiddleware), // 🔹 ADD THESE
  },
});
