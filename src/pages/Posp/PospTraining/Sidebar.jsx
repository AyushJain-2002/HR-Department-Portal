import React from "react";
// import { List, ListItem, Typography } from '@material-ui/core';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Card, List, ListItem, Typography } from "@material-tailwind/react";

const Sidebar = ({ activeSection, onSectionChange }) => {
  const chapters = [
    { title: "Chapter 01 Principles Of Insurance", section: "CHAPTER-01" },
    { title: "Chapter 02 Documentation", section: "CHAPTER-02" },
    {
      title: "Chapter 03 Theory And Practice Of Premium Rating",
      section: "CHAPTER-03",
    },
    {
      title: "Chapter 04 Personal And Retail Insurance",
      section: "CHAPTER-04",
    },
    { title: "Chapter 05 Commercial Insurance", section: "CHAPTER-05" },
    { title: "Chapter 06 Claims Procedure", section: "CHAPTER-06" },
    {
      title: "Chapter 07 Introduction To Health Insurance",
      section: "CHAPTER-07",
    },
    { title: "Chapter 08 Insurance Documentation", section: "CHAPTER-08" },
    { title: "Chapter 09 Health Insurance Products", section: "CHAPTER-09" },
    {
      title: "Chapter 10 Health Insurance Underwriting",
      section: "CHAPTER-10",
    },
    { title: "Chapter 11 Health Insurance Claims", section: "CHAPTER-11" },
  ];
  return (
    <Card className="h-screen hidden lg:block overflow-y-auto  fixed w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-1 p-4">
        <Typography variant="h4" className="text-blue-800">
          POSP Training
        </Typography>
      </div>
      <List>
        {chapters.map((chapter, index) => (
          <ListItem
            className="flex gap-3"
            key={index}
            onClick={() => onSectionChange(chapter.section)}
          >
            <InboxIcon className="h-8 w-8" />
            <h4 className="text-base  font-pt_serif font-bold text-black">
              {chapter.title}
            </h4>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Sidebar;
