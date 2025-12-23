import { 
  DocumentTextIcon, 
  GiftIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  BanknotesIcon,
  CogIcon
} from "@heroicons/react/24/outline";
import React from "react";

const Entry = {
  title: "Entry",
  icon: React.createElement(DocumentTextIcon, {
    className: "text-lg font-extrabold text-gray-500",
  }),

  data: [
    // ------------------------ HR SECTION ------------------------
    {
      title: "HR Section",
      role: ["SuperAdmin", "HR", "HR-Head"],
      icon: React.createElement(UserGroupIcon, {
        className: "text-lg font-extrabold text-gray-500",
      }),

      data: [
        { title: "Requisition Form", link: "entry/hr/requisition-form" },
        { title: "Employee Joining Form", link: "entry/hr/employee-joining-form" },
        { title: "Employee Leave Status For HR", link: "entry/hr/employee-leave-status-for-hr" },
        { title: "Employee Leave Status For Head", link: "entry/hr/employee-leave-status-for-head" },
        { title: "POSP Joining Form", link: "entry/hr/posp-joining-form" },
        { title: "Job Description", link: "entry/hr/job-description" },
        { title: "Employee Attendance Form", link: "entry/hr/employee-attendance-form" },
        { title: "Advance Detail Form", link: "entry/hr/advance-detail-form" },
        { title: "HR Attendance Form", link: "entry/hr/hr-attendance-form" },
        { title: "Head Advance Form", link: "entry/hr/head-advance-form" },
        { title: "Target", link: "entry/hr/target" },
        { title: "Inventory", link: "entry/hr/create-inventory" },
        { title: "CTC Form", link: "entry/hr/ctc-form" },
        { title: "Profile Edit Requests", link: "entry/hr/profile-edit-requests" },
      ],
    },

    // ------------------------ ACCOUNTS SECTION ------------------------
    {
      title: "Accounts Section",
      role: ["SuperAdmin", "Account", "Account-Head","HR","HR-Head"],
      icon: React.createElement(BanknotesIcon, {
        className: "text-lg font-extrabold text-gray-500",
      }),

      data: [
        { title: "Insert Invoice Data", link: "entry/accounts/insert-invoice-data" },
        { title: "Invoice Amount Pending", link: "entry/accounts/invoice-amount-pending" },
        { title: "Advance Detail Form", link: "entry/accounts/advance-detail-form" },
        { title: "Premium Received Acknowledgment", link: "entry/accounts/premium-received-acknowledgment" },
        { title: "Invoice Purchase Bill Data", link: "entry/accounts/invoice-purchase-bill-data" },
        { title: "NIB Cash Flow", link: "entry/accounts/nib-cash-flow" },
        { title: "POSP Commission Given / Pending", link: "entry/accounts/posp-commission-given-pending" },
        { title: "Premium Disposition Acknowledgment", link: "entry/accounts/premium-disposition-acknowledgment" },
      ],
    },

    // // ------------------------ OPERATIONS SECTION ------------------------
    // {
    //   title: "Operations Section",
    //   role: ["SuperAdmin", "Operation", "Operation-Head"],
    //   icon: React.createElement(CogIcon, {
    //     className: "text-lg font-extrabold text-gray-500",
    //   }),

    //   data: [
    //     { title: "Requisition Form", link: "entry/operation/requisition-form" },
    //     { title: "Endorsement / Cancel / Edit Policy", link: "entry/operation/endorsement-cancel-edit-policy" },
    //     { title: "Requested For Advance", link: "entry/operation/requested-for-advance" },
    //   ],
    // },
  ],
};

export default Entry;


// import { DocumentTextIcon, GiftIcon } from "@heroicons/react/24/outline";
// import React from "react";

// const Entry = {
//   title: "Entry",
//   icon: React.createElement(DocumentTextIcon, {
//     className: "text-lg font-extrabold text-gray-500",
//   }),

//   data: [
//     // ------------------------ GET QUOTATION ------------------------
//     {
//       title: "GET Quotation",
//       role: [
//         "SuperAdmin",
//         "Operation",
//         "Operation-Head",
//         "Sales-Support",
//         "Account",
//         "Account-Head",
//       ],
//       icon: React.createElement(DocumentTextIcon, {
//         className: "text-lg font-extrabold text-gray-500",
//       }),

//       data: [
//         { title: "Motor", link: "entry/get-quotation/motor" },
//         { title: "Non-Life-Health", link: "entry/get-quotation/non-life-health" },
//         { title: "Life-Health", link: "entry/get-quotation/life-health" },
//         { title: "Life", link: "entry/get-quotation/life" },
//         { title: "Nonmotor", link: "entry/get-quotation/non-motor" },
//       ],
//     },

//     // ------------------------ REWARD / INWARD ------------------------
//     {
//       title: "Reward/Inward",
//       role: ["SuperAdmin", "Sales-Support"],
//       icon: React.createElement(GiftIcon, {
//         className: "text-sm font-extrabold text-gray-500",
//       }),

//       data: [
//         { title: "Motor", link: "entry/reward-inward/motor" },
//         { title: "Health", link: "entry/reward-inward/health" },
//         { title: "Non Motor", link: "entry/reward-inward/non-motor" },
//         { title: "Life", link: "entry/reward-inward/life" },
//       ],
//     },

//     // ------------------------ SALES SECTION ------------------------
//     {
//       title: "Sales Section",
//       role: ["SuperAdmin", "Sales-Support"],
//       icon: React.createElement(GiftIcon, {
//         className: "text-lg font-extrabold text-gray-500",
//       }),

//       data: [
//         { title: "Daily Sales Report (DSR)", link: "entry/sales/daily-sales-report" },
//         { title: "Quotations Request", link: "entry/sales/quotations-request" },

//         // Fixed → subData → data (required for recursive menus)
//         {
//           title: "Claim Section",
//           data: [
//             { title: "Claim Entry", link: "entry/claim/claim-entry" }
//           ],
//         },
//       ],
//     },

//     // ------------------------ HR SECTION ------------------------
//     {
//       title: "HR Section",
//       role: ["SuperAdmin", "HR", "HR-Head"],
//       icon: React.createElement(GiftIcon, {
//         className: "text-lg font-extrabold text-gray-500",
//       }),

//       data: [
//         { title: "Requisition Form", link: "entry/hr/requisition-form" },
//         { title: "Employee Joining Form", link: "entry/hr/employee-joining-form" },
//         { title: "Employee Leave Status For HR", link: "entry/hr/employee-leave-status-for-hr" },
//         { title: "Employee Leave Status For Head", link: "entry/hr/employee-leave-status-for-head" },
//         { title: "POSP Joining Form", link: "entry/hr/posp-joining-form" },
//         { title: "Job Description", link: "entry/hr/job-description" },
//         { title: "Employee Attendance Form", link: "entry/hr/employee-attendance-form" },
//         { title: "Advance Detail Form", link: "entry/hr/advance-detail-form" },
//         { title: "HR Attendance Form", link: "entry/hr/hr-attendance-form" },
//         { title: "Head Advance Form", link: "entry/hr/head-advance-form" },
//         { title: "Target", link: "entry/hr/target" },
//         { title: "Inventory", link: "entry/hr/create-inventory" },
//         { title: "CTC Form", link: "entry/hr/ctc-form" },
//         { title: "Profile Edit Requests", link: "entry/hr/profile-edit-requests" },
//       ],
//     },

//     // ------------------------ ACCOUNTS SECTION ------------------------
//     {
//       title: "Accounts Section",
//       role: ["SuperAdmin", "Account", "Account-Head","HR","HR-Head"],
//       icon: React.createElement(GiftIcon, {
//         className: "text-lg font-extrabold text-gray-500",
//       }),

//       data: [
//         { title: "Insert Invoice Data", link: "entry/accounts/insert-invoice-data" },
//         { title: "Invoice Amount Pending", link: "entry/accounts/invoice-amount-pending" },
//         { title: "Advance Detail Form", link: "entry/accounts/advance-detail-form" },
//         { title: "Premium Received Acknowledgment", link: "entry/accounts/premium-received-acknowledgment" },
//         { title: "Invoice Purchase Bill Data", link: "entry/accounts/invoice-purchase-bill-data" },
//         { title: "NIB Cash Flow", link: "entry/accounts/nib-cash-flow" },
//         { title: "POSP Commission Given / Pending", link: "entry/accounts/posp-commission-given-pending" },
//         { title: "Premium Disposition Acknowledgment", link: "entry/accounts/premium-disposition-acknowledgment" },
//       ],
//     },

//     // ------------------------ OPERATIONS SECTION ------------------------
//     {
//       title: "Operations Section",
//       role: ["SuperAdmin", "Operation", "Operation-Head"],
//       icon: React.createElement(GiftIcon, {
//         className: "text-lg font-extrabold text-gray-500",
//       }),

//       data: [
//         { title: "Requisition Form", link: "entry/operation/requisition-form" },
//         { title: "Endorsement / Cancel / Edit Policy", link: "entry/operation/endorsement-cancel-edit-policy" },
//         { title: "Requested For Advance", link: "entry/operation/requested-for-advance" },
//       ],
//     },
//   ],
// };

// export default Entry;
