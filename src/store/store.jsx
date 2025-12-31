import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./NewReducers/StateSlice";
import branchReducer from "./NewReducers/BranchSlice";
import zoneReducer from "./NewReducers/ZonesSlice";
import groupReducer from "./NewReducers/GroupSlice";
import departmentsReducer from "./NewReducers/DepartmentSlice";
import insuranceCompany from "./NewReducers/InsurerBranchSlice";
import fuels from "./NewReducers/FuelSlice";
import riders from "./NewReducers/RidersSlice";
import employeeReducer from "./NewReducers/EmployeeSlice";
import inventory from "./NewReducers/InventorySlice";
import addons from "./NewReducers/AddOnSlice";
import operationSlice from "./NewReducers/OperationSlice";
import mispSlice from "./NewReducers/MispSlice";
import growthreportsReducer from "./NewReducers/GrowthReportSlice";
import policyReferBySlice from "./NewReducers/PolicyReferBySlice";
import customer from './NewReducers/CustomerSlice';
import  assignOfficialPospSlice from "./NewReducers/AssignOfficialPospSlice";
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
    inventory: inventory,
    employee: employeeReducer,
    customer: customer,
    addons:addons,
    growthreports: growthreportsReducer,
    operation: operationSlice,
    misp: mispSlice,
    policyReferBy: policyReferBySlice,
    assignOfficialPosp:assignOfficialPospSlice,
    auth: authReducer,
  },
});
