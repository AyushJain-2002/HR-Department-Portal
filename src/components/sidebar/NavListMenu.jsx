import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { getDecryptedCookie } from "../../Utils/secureCookie";


const NavListMenu = ({ menudata, menuTitle, closeMenu, sidebarVariant = false }) => {
  const location = useLocation();
  const userInfo = getDecryptedCookie("userInfo");
  const role = userInfo?.role?.toLowerCase().trim();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hasAccess = (role, allowedRoles) => {
    return allowedRoles.includes(role);
  };

  const menuData = menudata.filter((menu) =>
    hasAccess(role, menu.role.map(r => r.toLowerCase().trim()))
  );

  if (!hasAccess(role, menuData.map(item => item.role.map(r => r.toLowerCase().trim())).flat())) {
    return null;
  }

  const isAnyLinkActive = menuData.some(({ data }) =>
    data.some(({ link }) => location.pathname === link)
  );

  const handleItemClick = (e) => {
    closeMenu?.();
    setIsMobileMenuOpen(false);
  };

  const [isMdOrSmaller, setIsMdOrSmaller] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMdOrSmaller(window.innerWidth <= 768);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Sidebar variant rendering
  if (sidebarVariant) {
    return (
      <div className="navlist-menu-sidebar">
        {menuData.map(({ title, icons, data }, columnIndex) => (
          <div key={columnIndex} className="navlist-menu-sidebar-section">
            {/* Section Header */}
            {title && (
              <div className="navlist-menu-sidebar-header">
                {icons && React.createElement(icons, {
                  className: "navlist-menu-sidebar-icon",
                })}
                <span className="navlist-menu-sidebar-title">{title}</span>
              </div>
            )}

            {/* Menu Items */}
            <div className="navlist-menu-sidebar-items">
              {data.map(({ title, description, link, subData }, key) => {
                const isActive = location.pathname === link;

                return (
                  <div key={key} className="navlist-menu-sidebar-item-group">
                    {subData ? (
                      // Subsection Header
                      <div className="navlist-menu-sidebar-subheader">
                        {title}
                      </div>
                    ) : (
                      // Normal Menu Item
                      <Link
                        to={link}
                        onClick={isMdOrSmaller ? handleItemClick : undefined}
                        className={`navlist-menu-sidebar-link ${isActive ? 'navlist-menu-sidebar-link-active' : ''}`}
                      >
                        <div className="navlist-menu-sidebar-link-content">
                          <IoMdStar className="navlist-menu-sidebar-star" />
                          <div className="navlist-menu-sidebar-text">
                            <span className="navlist-menu-sidebar-item-title">
                              {title}
                            </span>
                            {description && (
                              <span className="navlist-menu-sidebar-item-desc">
                                {description}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Submenu Items */}
                    {subData && subData.map((subItem, subIndex) => {
                      const isSubActive = location.pathname === subItem.link;

                      return (
                        <Link 
                          to={subItem.link} 
                          key={subIndex}
                          className={`navlist-menu-sidebar-link navlist-menu-sidebar-sublink ${isSubActive ? 'navlist-menu-sidebar-link-active' : ''}`}
                        >
                          <div className="navlist-menu-sidebar-link-content">
                            <IoMdStar className="navlist-menu-sidebar-star" />
                            <span className="navlist-menu-sidebar-item-title">
                              {subItem.title}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Original header variant rendering (for backward compatibility)
  const renderItems = menuData.map(({ title, icons, data }, columnIndex) => {
    return (
      <div
        key={columnIndex}
        className={`px-1.5 py-5 flex flex-col border-gray-300 ${columnIndex !== menuData.length - 1 ? "border-r-2" : ""}`}
      >
        {/* Section Header */}
        <div className="flex items-center mb-4 pl-2 gap-2">
          {icons && React.createElement(icons, {
            className: "text-lg font-extrabold text-black",
          })}
          {title && (
            <span className="font-roboto items-center flex font-bold text-gray-900">
              {title}
            </span>
          )}
        </div>

        {/* Grid for Items */}
        <div className="flex flex-col gap-1 pl-4 border-l-2 border-gray-200 ml-2">
          {data.map(({ title, description, link, subData }, key) => {
            const isActive = location.pathname === link;

            return (
              <div key={key} className="flex flex-col">
                {subData ? (
                  <div className="text-sm font-bold text-gray-800 my-5">
                    {title}
                  </div>
                ) : (
                  <Link
                    to={link}
                    onClick={isMdOrSmaller ? handleItemClick : undefined}
                  >
                    <div className={`flex items-center bg-none px-0.5 gap-2 group text-[11px] rounded-lg leading-none ${isActive
                        ? "text-blue-600 hover:bg-transparent"
                        : "text-gray-900 hover:bg-transparent hover:text-blue-600"
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <IoMdStar />
                      </div>
                      <div>
                        {title && (
                          <span className={`flex items-center font-roboto group-hover:text-blue-600 text-[13px] font-normal ${isActive ? "text-blue-600" : ""}`}>
                            {title}
                          </span>
                        )}
                        {description && (
                          <span className={`text-xs !font-medium group-hover:text-blue-600 font-arial ${isActive
                              ? "text-blue-600"
                              : "text-blue-gray-500"
                            }`}
                          >
                            {description}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )}

                {/* Render Submenu Items */}
                {subData && subData.map((subItem, subIndex) => {
                  const isSubActive = location.pathname === subItem.link;

                  return (
                    <Link to={subItem.link} key={subIndex}>
                      <div className={`flex items-center bg-none px-0.5 gap-2 group text-[11px] rounded-lg leading-none ${isSubActive
                          ? "text-blue-600 hover:bg-transparent"
                          : "text-gray-900 hover:bg-transparent hover:text-blue-600"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <IoMdStar />
                        </div>
                        <span className={`flex items-center font-roboto group-hover:text-blue-600 text-[13px] font-normal ${isSubActive ? "text-blue-600" : ""}`}>
                          {subItem.title}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="w-full"
        onClick={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <div className={`font-medium font-roboto text-[14px] ${isAnyLinkActive ? "bg-blue-gray-50 rounded-lg" : ""}`}>
          <div>
            <div
              className="flex text-gray-900 font-roboto items-center gap-2 py-2 pr-4"
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {menuTitle}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""}`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="ml-4 mt-2">{renderItems}</div>
        )}
      </div>
      <div className="block lg:hidden">
        {isMobileMenuOpen && renderItems}
      </div>
    </React.Fragment>
  );
};

export default NavListMenu;




// import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import {  Collapse,  ListItem,  Menu,  MenuHandler,  MenuItem,  MenuList,  Typography,} from "@material-tailwind/react";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { IoMdStar } from "react-icons/io";
// import { navListMenuItems2 } from "./MenuData";
// import { getDecryptedCookie } from "../../../Utils/secureCookie";
// const NavListMenu = ({menudata, menuTitle, closeMenu }) => {
//   const userInfo =getDecryptedCookie("userInfo");
//   const role=userInfo?.role.toLowerCase().trim();
//   const hasAccess = (role, allowedRoles) => {
//     return allowedRoles.includes(role);
//   };
//   const menuData = menudata.filter((menu) =>
//     hasAccess(role, menu.role.map(r => r.toLowerCase().trim()))
//   );
//   if(!hasAccess(role, menuData.map(item=>item.role.map(r => r.toLowerCase().trim())).flat()))
//     return null;
//   // console.log(menuData)
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const isAnyLinkActive = menuData.some(({ data }) =>
//     data.some(({ link }) => location.pathname === link)
//   );
//   const handleItemClick = (e) => {
//     // e.preventDefault();
//     closeMenu(); // Close the menu when an item is clicked
//     setIsMobileMenuOpen(false);
//   };
//   const [isMdOrSmaller, setIsMdOrSmaller] = useState(false);

//   useEffect(() => {
//     const updateSize = () => {
//       setIsMdOrSmaller(window.innerWidth <= 768);
//     };
//     updateSize(); // Initial check
//     window.addEventListener("resize", updateSize);
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   const renderItems = menuData.map(({ title, icons, data }, columnIndex) => {
//     return (
//       <div
//         key={columnIndex}
//         className={`px-1.5 py-5  flex flex-col border-gray-300 ${columnIndex !== menuData.length - 1 ? "border-r-2" : ""
//           }`}
//       >
//         {/* Section Header */}
//         <div className="flex items-center mb-4 pl-2 gap-2">
//           {icons &&
//             React.createElement(icons, {
//               className: "text-lg font-extrabold text-black",
//             })}
//           {title && (
//             <Typography
//               variant="h6"
//               className="font-roboto items-center flex font-bold text-gray-900"
//             >
//               {title}
//             </Typography>
//           )}
//         </div>

//         {/* Grid for Items */}
//         <div className="flex flex-col gap-1 pl-4 border-l-2 border-gray-200 ml-2">
//               {data.map(({ title, description, link, subData }, key) => {
//                 const isActive = location.pathname === link; // Check if active link

//                 return (
//                   <div key={key} className="flex flex-col">
//                     {subData ? (
//                       // Subsection Header (e.g., "Claim Section")
//                       <div className="text-sm  font-bold text-gray-800 my-5">
//                         {title}
//                       </div>
//                     ) : (
//                       // Normal Menu Item
//                       <Link
//                         to={link}
//                         onClick={isMdOrSmaller ? handleItemClick : undefined}
//                       >
//                         <MenuItem
//                           className={`flex items-center bg-none px-0.5 gap-2 group text-[11px] rounded-lg leading-none ${isActive
//                               ? "text-blue-600 hover:bg-transparent"
//                               : "text-gray-900 hover:bg-transparent hover:text-blue-600"
//                             }`}
//                         >
//                           <div className="flex items-center justify-center">
//                             <IoMdStar />
//                           </div>
//                           <div>
//                             {title && (
//                               <Typography
//                                 variant="h6"
//                                 color="blue-gray"
//                                 className={`flex items-center font-roboto group-hover:text-blue-600 text-[13px] font-normal ${isActive ? "text-blue-600" : ""
//                                   }`}
//                               >
//                                 {title}
//                               </Typography>
//                             )}
//                             {description && (
//                               <Typography
//                                 variant="paragraph"
//                                 className={`text-xs !font-medium group-hover:text-blue-600 font-arial ${isActive
//                                     ? "text-blue-600"
//                                     : "text-blue-gray-500"
//                                   }`}
//                               >
//                                 {description}
//                               </Typography>
//                             )}
//                           </div>
//                         </MenuItem>
//                       </Link>
//                     )}

//                     {/* Render Submenu Items if subData exists */}
//                     {subData &&
//                       subData.map((subItem, subIndex) => {
//                         const isSubActive = location.pathname === subItem.link;

//                         return (
//                           <Link to={subItem.link} key={subIndex}>
//                             <MenuItem
//                               className={` flex items-center bg-none px-0.5 gap-2 group text-[11px] rounded-lg leading-none ${isSubActive
//                                   ? "text-blue-600 hover:bg-transparent"
//                                   : "text-gray-900 hover:bg-transparent hover:text-blue-600"
//                                 }`}
//                             >
//                               <div className="flex items-center justify-center">
//                                 <IoMdStar />
//                               </div>
//                               <Typography
//                                 variant="h6"
//                                 color="blue-gray"
//                                 className={`flex items-center font-roboto group-hover:text-blue-600 text-[13px] font-normal ${isSubActive ? "text-blue-600" : ""
//                                   }`}
//                               >
//                                 {subItem.title}
//                               </Typography>
//                             </MenuItem>
//                           </Link>
//                         );
//                       })}
//                   </div>
//                 );
//               })}
//             {/* </div> */}
//           {/* ))} */}
//         </div>
//       </div>
//     );
//   });

//   const gridClass = `grid-cols-${Math.min(menuData.length, 7)}`;

//   return (
//     <React.Fragment>
//       <div className="w-full"
//         onClick={() => setIsMenuOpen(true)} // 🛠 FIXED
//         onMouseLeave={() => setIsMenuOpen(false)} // 🛠 FIXED
//         >
        
//           <Typography
//             as="div" // Force rendering as div instead of p
//             className={`font-medium font-roboto text-[14px] ${isAnyLinkActive ? "bg-blue-gray-50 rounded-lg" : ""
//               }`}
//           >
//             <Link>
//               <ListItem
//                 className="flex text-gray-900 font-roboto items-center gap-2 py-2 pr-4"
//                 selected={isMenuOpen || isMobileMenuOpen}
//                 onClick={() => setIsMobileMenuOpen((cur) => !cur)}
//               >
//                 {menuTitle}
//                 <ChevronDownIcon
//                   strokeWidth={2.5}
//                   className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
//                     }`}
//                 />
//                 <ChevronDownIcon
//                   strokeWidth={2.5}
//                   className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
//                     }`}
//                 />
//               </ListItem>
//             </Link>
//           </Typography>
        
//         <Collapse open={isMenuOpen} >
//           {/* <ul
//             className={`grid ${gridClass} gap-y-2  gap-x-0 outline-none outline-0`}
//           > */}
//             <div className="ml-4 mt-2">{renderItems}</div>
//           {/* </ul> */}
//         </Collapse>
//       </div>
//       <div className="block lg:hidden">
//         <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
//       </div>
//     </React.Fragment>
//   );
// };

// export default NavListMenu;
