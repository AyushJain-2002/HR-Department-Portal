import { 
  GiftIcon, 
  DocumentTextIcon, 
  UserIcon, 
  IdentificationIcon,
  ClipboardDocumentIcon
} from "@heroicons/react/24/outline";
import React from "react";

const Generate = {
  title: "Generate",
  icon: React.createElement(ClipboardDocumentIcon, {
    className: "text-lg font-extrabold text-gray-500",
  }),
  data: [
    {
      title: "Employee",
      role: ["SuperAdmin", "HR", "HR-Head"],
      icon: React.createElement(UserIcon, {
        className: "text-lg font-extrabold text-gray-500",
      }),
      data: [
        { title: "Offer Letter", link: "hr/employee/offer-letter" },
        { title: "Relieving Letter", link: "hr/employee/relieving-letter" },
        { title: "Experience Letter", link: "hr/employee/experience-letter" },
        { title: "Termination Letter", link: "hr/employee/termination-letter" },
        { title: "Full N Final", link: "hr/employee/full-n-final" },
      ],
    },
    {
      title: "POSP",
      role: ["SuperAdmin", "HR", "HR-Head"],
      icon: React.createElement(IdentificationIcon, {
        className: "text-lg font-extrabold text-gray-500",
      }),
      data: [
        { title: "POSP Relieving Letter", link: "hr/posp/relieving-letter" },
        { title: "POSP Certificate", link: "hr/posp/certificate" },
      ],
    },
  ],
};

export default Generate;




// import { GiftIcon } from "@heroicons/react/24/outline";
// import React from "react";

// const Generate = 
//   {
//     title: "Generate",
//     icon: React.createElement(GiftIcon, {
//       className: "text-lg font-extrabold text-gray-500",
//     }),
//     data: [
//       {
//         title: "Employee",
//         role: ["SuperAdmin", "HR", "HR-Head"],
//         icon: React.createElement(GiftIcon, {
//           className: "text-lg font-extrabold text-gray-500",
//         }),
//         data: [
//           { title: "Offer Letter", link: "hr/employee/offer-letter" },
//           { title: "Relieving Letter", link: "hr/employee/relieving-letter" },
//           { title: "Experience Letter", link: "hr/employee/experience-letter" },
//           { title: "Termination Letter", link: "hr/employee/termination-letter" },
//           { title: "Full N Final", link: "hr/employee/full-n-final" },
//         ],
//       },
//       {
//         title: "POSP",
//         role: ["SuperAdmin", "HR", "HR-Head"],
//         icon: React.createElement(GiftIcon, {
//           className: "text-lg font-extrabold text-gray-500",
//         }),
//         data: [
//           { title: "POSP Relieving Letter", link: "hr/posp/relieving-letter" },
//           { title: "POSP Certificate", link: "hr/posp/certificate" },
//         ],
//       },
//     ],
//   };


// export default Generate;
