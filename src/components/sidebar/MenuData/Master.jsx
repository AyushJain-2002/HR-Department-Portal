import { 
  GiftIcon, 
  CogIcon, 
  BanknotesIcon, 
  UserGroupIcon,
  WrenchScrewdriverIcon,
  BuildingLibraryIcon
} from "@heroicons/react/24/outline";
import React from "react";

const Master = {
  title: "Master",
  icon: React.createElement(WrenchScrewdriverIcon, {
    className: "text-lg font-extrabold text-gray-500",
  }),
  data: [
    {
      title: "HR Department",
      role: ["SuperAdmin", "HR", "HR-Head"],
      icon: React.createElement(UserGroupIcon, {
        className: "text-lg font-extrabold text-gray-500",
      }),
      data: [
        { title: "Employee", link: "master/hr/create-employee" },
        { title: "Broker Branch", link: "master/hr/create-Branch" },
        { title: "Group", link: "master/hr/create-group" },
        { title: "Sub-Group", link: "master/hr/add-sub-group" },
        { title: "New Commission", link: "master/hr/new-commission" },
        { title: "Designation", link: "master/hr/create-designation" },
        { title: "Department", link: "master/hr/create-department" },
        { title: "Zone", link: "master/hr/create-zone" },
        { title: "Region", link: "master/hr/create-region" },
        { title: "City", link: "master/create-city" },
        { title: "Policy Refer By", link: "master/hr/policy-refer-by" },
        { title: "Bank Master", link: "master/hr/create-bank" },
        { title: "Create POSP", link: "/master/hr/create-posp" },
        { title: "Add MISP", link: "master/hr/add-misp" },
        { title: "Life Broker Commission", link: "master/hr/life-broker-commission" },
        { title: "Non-Life Broker Commission", link: "master/hr/non-life-broker-commission" },
        { title: "Non-Life POSP Commission", link: "master/hr/non-life-posp-commission" },
        { title: "Leave Master", link: "master/hr/leave-master" },
        { title: "Leave Given", link: "master/hr/leave-given" },
        { title: "Job Master", link: "master/hr/job-master" },
        { title: "Add PPT", link: "master/hr/add-ppt" },
      ],
    },
  ],
};

export default Master;




// import { GiftIcon } from "@heroicons/react/24/outline";
// import React from "react";

// const Master = 
//   {
//     title: "Master",
//     icon: React.createElement(GiftIcon, {
//       className: "text-lg font-extrabold text-gray-500",
//     }),
//     data: [
//       {
//         title: "Operation Department",
//         role: ["SuperAdmin", "Operation", "Operation-Head"],
//         icon: React.createElement(GiftIcon, {
//           className: "text-lg font-extrabold text-gray-500",
//         }),
//         data: [
//           { title: "Customer", link: "master/operation/life-create-customer" },
//           { title: "Fuel", link: "master/operation/create-fuel" },
//           { title: "Products Details", link: "master/operation/products-details" },
//           { title: "Rider", link: "master/operation/create-rider" },
//           { title: "Addon", link: "master/operation/create-addon" },
//           { title: "Leave Application", link: "master/operation/leave-application" },
//         ],
//       },

//       {
//         title: "Accounts Department",
//         role: ["SuperAdmin", "Account", "Account-Head"],
//         icon: React.createElement(GiftIcon, {
//           className: "text-lg font-extrabold text-gray-500",
//         }),
//         data: [
//           { title: "Insurance Company", link: "master/accounts/create-insurance-company" },
//           { title: "Insurer Branch", link: "master/accounts/create-insurer-branch" },
//         ],
//       },

//       {
//         title: "HR Department",
//         role: ["SuperAdmin", "HR", "HR-Head"],
//         icon: React.createElement(GiftIcon, {
//           className: "text-lg font-extrabold text-gray-500",
//         }),
//         data: [
//           { title: "Employee", link: "master/hr/create-employee" },
//           { title: "Broker Branch", link: "master/hr/create-Branch" },
//           { title: "Group", link: "master/hr/create-group" },
//           { title: "Sub-Group", link: "master/hr/add-sub-group" },
//           { title: "New Commission", link: "master/hr/new-commission" },
//           { title: "Designation", link: "master/hr/create-designation" },
//           { title: "Department", link: "master/hr/create-department" },
//           { title: "Zone", link: "master/hr/create-zone" },
//           { title: "Region", link: "master/hr/create-region" },
//           { title: "City", link: "master/create-city" },
//           { title: "Policy Refer By", link: "master/hr/policy-refer-by" },
//           { title: "Bank Master", link: "master/hr/create-bank" },
//           { title: "Create POSP", link: "/master/hr/create-posp" },
//           { title: "Add MISP", link: "master/hr/add-misp" },
//           { title: "Life Broker Commission", link: "master/hr/life-broker-commission" },
//           { title: "Non-Life Broker Commission", link: "master/hr/non-life-broker-commission" },
//           { title: "Non-Life POSP Commission", link: "master/hr/non-life-posp-commission" },
//           { title: "Leave Master", link: "master/hr/leave-master" },
//           { title: "Leave Given", link: "master/hr/leave-given" },
//           { title: "Job Master", link: "master/hr/job-master" },
//           { title: "Add PPT", link: "master/hr/add-ppt" },
//         ],
//       },
//     ],
//   };

// export default Master;
