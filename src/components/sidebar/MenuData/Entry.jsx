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

    
  ],
};

export default Entry;
