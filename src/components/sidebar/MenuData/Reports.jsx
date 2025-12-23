import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import React from "react";

const Reports = {
  title: "Reports",
  icon: (<ChartBarIcon />),
  data: [
     // ------------------- IRDA REPORTS -------------------
    {
      title: "IRDA Reports",
      role: ["SuperAdmin", "Account", "Account-Head", "Operation", "Operation-Head","HR","HR-Head"],
      icon: (<ClipboardDocumentListIcon />),
      data: [
        {
          title: "Insurer Wise Business",
          // icon: (<Bars4Icon />),
          link: "reports/irda/insurer-wise-business",
        },
        {
          title: "Line of Business",
          // icon: (<SunIcon />),
          link: "reports/irda/line-of-business",
        },
        {
          title: "Life Client Wise Business",
          // icon: (<GlobeAmericasIcon />),
          link: "reports/irda/life-client-wise-business",
        },
        {
          title: "Non-Life Client Wise Business",
          // icon: (<PhoneIcon />),
          link: "reports/irda/non-life-client-wise-business",
        },
        { title: "Broker Business", link: "reports/irda/broker-business" },
        { title: "POSP Portal Report", link: "reports/irda/posp-portal-report" },
        { title: "BQP Portal Report", link: "reports/irda/bqp-portal-report" },
      ],
    },

      {
      title: "Employee Reports",
      role: ["SuperAdmin", "HR", "HR-Head"],
      icon: <UserGroupIcon/>,
      data: [
        { title: "Emp. Report", link: "reports/hr/employee-report" },
        { title: "Emp. A/C Details",  link: "reports/hr/employee-ac-details" },
        { title: "Employee Login Report", link: "reports/hr/employee-login-report" },
        { title: "Emp. Relieving Letter", link: "reports/hr/employee-relieving-letter" },
        { title: "Employee Terminated Report", link: "reports/hr/employee-terminated-report" },
        { title: "Employee Attendance Sheet",  link: "reports/hr/employee-attendance-sheet" },
        { title: "Employee Salary Sheet",  link: "reports/hr/employee-salary-sheet" },
        { title: "Employee Leave Report",  link: "reports/hr/employee-leave-report" },
        { title: "Offered Employee",  link: "reports/hr/offered-employee" },
        { title: "Advance Report", link: "reports/hr/advance-report" },
        { title: "Requisition Report", link: "reports/hr/requisition-report" },
        { title: "Target Report",  link: "reports/hr/employee-target-report" },
        { title: "CTC Report",  link: "reports/hr/ctc-report" },
        { title: "Job Description Report", link: "reports/hr/job-description-report" },
        { title: "MISP Report", link: "reports/hr/misp-report" },
      ],
    },
    {
      title: "POSP Reports",
      role: ["SuperAdmin", "HR", "HR-Head"],
      icon: <UserGroupIcon/ >,
      data: [
        { title: "POSP Application Form", link: "reports/hr/posp-application-form" },
        { title: "POSP Report",  link: "reports/hr/posp-report" },
        { title: "POSP Certificates",link: "reports/hr/posp-certificates" },
        { title: "POSP A/C Details",  link: "reports/hr/posp-ac-details" },
        { title: "POSP Relieving Letter", link: "reports/hr/posp-relieving-letter" },
        { title: "POSP Terminate Letter", link: "reports/hr/posp-terminate-letter" },
        { title: "POSP Target Report", link: "reports/hr/posp-target-report" },
      ],
    },
  ],
};

export default Reports;





// import {
//   Bars4Icon,
//   GiftIcon,
//   GlobeAmericasIcon,
//   NewspaperIcon ,
//   PhoneIcon ,
//   RectangleGroupIcon,
//   SquaresPlusIcon,
//   SunIcon,
//   TagIcon,
// } from "@heroicons/react/24/outline";
// import React from "react";

// // Helper to create icon once
// // const  = (Icon) =>
// //   React.createElement(Icon, {
// //     className: "text-lg font-extrabold text-gray-500",
// //   });

// const Reports =
//   {
//     title: "Reports",
//     icon: (<GiftIcon />),
//     data: [
//       // ------------------- NIB REPORTS -------------------
//       {
//         title: "NIB Reports",
//         role: [
//           "SuperAdmin",
//           "Account",
//           "Account-Head",
//           "Operation",
//           "Operation-Head",
//           "Sales-Support",
//         ],
//         icon: (<GiftIcon />),
//         data: [
//           { title: "Renewal Report", link: "reports/renewal-report" },
//           { title: "Renewal Report for Calling", link: "reports/renewal-report-calling" },
//           { title: "POSP Half Yearly Data", link: "reports/posp-half-yearly-data" },

//           {
//             title: "Claim Report",
//             subData: [
//               {
//                 title: "Claim Report",
//                 icon: (<NewspaperIcon />),
//                 link: "reports/sales/commision-report",
//               },
//               {
//                 title: "Claim Status Report",
//                 icon: (<RectangleGroupIcon />),
//                 link: "reports/sales/renewal-report",
//               },
//             ],
//           },
//         ],
//       },

//       // ------------------- SALES REPORTS -------------------
//       {
//         title: "Sales Reports",
//         role: ["SuperAdmin", "Sales-Support"],
//         icon: (<GiftIcon />),
//         data: [
//           {
//             title: "Commision Report",
//             icon: (<NewspaperIcon />),
//             link: "reports/sales/commision-report",
//           },
//           {
//             title: "Renewal Report",
//             icon: (<RectangleGroupIcon />),
//             link: "reports/sales/renewal-report",
//           },
//           {
//             title: "Lost Cases/Quotes Report",
//             icon: (<TagIcon />),
//             link: "reports/sales/lost-cases-report",
//           },
//           {
//             title: "DSR Reports",
//             icon: (<SquaresPlusIcon />),
//             link: "reports/sales/dsr-reports",
//           },
//         ],
//       },

//       // ------------------- OPERATION REPORTS -------------------
//       {
//         title: "Operation Reports",
//         role: ["SuperAdmin", "Operation", "Operation-Head"],
//         icon: (<GiftIcon />),
//         data: [
//           {
//             title: "OPS Business Report",
//             icon: (<PhoneIcon />),
//             link: "reports/operations/ops-business-report",
//           },
//           {
//             title: "Quotations Converted",
//             icon: (<NewspaperIcon />),
//             link: "reports/operations/quotations-converted",
//           },
//           {
//             title: "Quotations Not Converted",
//             icon: (<RectangleGroupIcon />),
//             link: "reports/operations/quotations-not-converted",
//           },
//           {
//             title: "Voucher Report",
//             icon: (<TagIcon />),
//             link: "reports/operations/voucher-report",
//           },
//           {
//             title: "Refer/Inward Report",
//             icon: (<SquaresPlusIcon />),
//             link: "reports/operations/refer-inward-report",
//           },
//         ],
//       },

//       // ------------------- DAILY PERFORMANCE REPORTS -------------------
//       {
//         title: "Daily Performance Reports",
//         role: [
//           "SuperAdmin",
//           "Account",
//           "Account-Head",
//           "Operation",
//           "Operation-Head",
//           "Sales-Support",
//         ],
//         icon: (<GiftIcon />),
//         data: [
//           {
//             title: "Operation Entry Report",
//             icon: (<NewspaperIcon />),
//             link: "/reports/performance/ops-entry-summary",
//           },
//           {
//             title: "Growth Report",
//             icon: (<RectangleGroupIcon />),
//             link: "reports/performance/growth-report",
//           },
//           {
//             title: "Our Sales Summary",
//             icon: (<TagIcon />),
//             link: "reports/performance/sales-summary",
//           },
//           {
//             title: "Sales Person Reports",
//             icon: (<SquaresPlusIcon />),
//             link: "reports/performance/sales-person-reports",
//           },
//         ],
//       },

//       // ------------------- ACCOUNTS REPORTS -------------------
//       {
//         title: "Accounts Reports",
//         role: ["SuperAdmin", "Account", "Account-Head"],
//         icon: (<GiftIcon />),
//         data: [
//           {
//             title: "NIB Insurer Wise Report for Invoice",
//             icon: (<Bars4Icon />),
//             link: "reports/accounts/nib-insurer-wise-report",
//           },
//           {
//             title: "NIB Commision Statement",
//             icon: (<SunIcon />),
//             link: "reports/accounts/nib-commission-statement",
//           },
//           {
//             title: "GST Report",
//             icon: (<GlobeAmericasIcon />),
//             link: "reports/accounts/gst-report",
//           },
//           {
//             title: "Commision Comparision Report",
//             icon: (<PhoneIcon />),
//             link: "reports/accounts/commission-comparison-report",
//           },
//           { title: "Invoice Report", link: "reports/accounts/invoice-report" },
//           { title: "Advance Report", link: "reports/accounts/advance-report" },
//           { title: "Invoice Bill Report", link: "reports/accounts/invoice-bill-report" },
//           {
//             title: "POSP Commision given Pending Report",
//             link: "reports/accounts/posp-commission-pending-report",
//           },
//           {
//             title: "POSP Commision Statement",
//             link: "reports/accounts/posp-commission-statement",
//           },
//         ],
//       },

//       // ------------------- IRDA REPORTS -------------------
//       {
//         title: "IRDA Reports",
//         role: ["SuperAdmin", "Account", "Account-Head", "Operation", "Operation-Head","HR","HR-Head"],
//         icon: (<GiftIcon />),
//         data: [
//           {
//             title: "Insurer Wise Business",
//             icon: (<Bars4Icon />),
//             link: "reports/irda/insurer-wise-business",
//           },
//           {
//             title: "Line of Business",
//             icon: (<SunIcon />),
//             link: "reports/irda/line-of-business",
//           },
//           {
//             title: "Life Client Wise Business",
//             icon: (<GlobeAmericasIcon />),
//             link: "reports/irda/life-client-wise-business",
//           },
//           {
//             title: "Non-Life Client Wise Business",
//             icon: (<PhoneIcon />),
//             link: "reports/irda/non-life-client-wise-business",
//           },
//           { title: "Broker Business", link: "reports/irda/broker-business" },
//           { title: "POSP Portal Report", link: "reports/irda/posp-portal-report" },
//           { title: "BQP Portal Report", link: "reports/irda/bqp-portal-report" },
//         ],
//       },
//     ],
//   };

// export default Reports;
