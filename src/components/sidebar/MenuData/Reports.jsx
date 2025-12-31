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
