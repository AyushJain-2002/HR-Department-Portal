import { 
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
        { title: "Offer Letter", link: "hr/Employee/offer-letter" },
        { title: "Relieving Letter", link: "hr/Employee/relieving-letter" },
        { title: "Experience Letter", link: "hr/Employee/experience-letter" },
        { title: "Termination Letter", link: "hr/Employee/termination-letter" },
        { title: "Full N Final", link: "hr/Employee/full-n-final" },
      ],
    },
    {
      title: "POSP",
      role: ["SuperAdmin", "HR", "HR-Head"],
      icon: React.createElement(IdentificationIcon, {
        className: "text-lg font-extrabold text-gray-500",
      }),
      data: [
        { title: "POSP Relieving Letter", link: "hr/Posp/relieving-letter" },
        { title: "POSP Certificate", link: "hr/Posp/certificate" },
      ],
    },
  ],
};

export default Generate;
