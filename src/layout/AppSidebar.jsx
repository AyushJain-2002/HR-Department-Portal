import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  ChevronDownIcon,
  HorizontaLDots,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import {
  DashBoard,
  Entry,
  Reports,
  Master,
  Generate,
} from "../components/sidebar/MenuData/index";
import { getDecryptedCookie } from "../Utils/secureCookie";

const navData = [
  DashBoard,
  Entry,
  Reports,
  Master,
  Generate,
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const userInfo = getDecryptedCookie("user");
  const [openSubmenu, setOpenSubmenu] = useState({});
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});
  const role = userInfo?.role.toLowerCase().trim();

  const hasAccess = (role, allowedRoles) => {
    const normalized = allowedRoles.map((r) => r.toLowerCase().trim());
    return normalized.includes(role);
  };

  const filterMenuByRole = (menu) => {
    return menu
      .map((nav) => {
        const newNav = { ...nav };

        if (newNav.data) {
          newNav.data = newNav.data
            .map((sub) => {
              const subItem = { ...sub };

              if (subItem.data) {
                subItem.data = subItem.data.filter((leaf) =>
                  hasAccess(role, subItem.role || [])
                );
              }

              return hasAccess(role, subItem.role || []) ? subItem : null;
            })
            .filter(Boolean);
        }

        const allRoles =
          newNav.data?.flatMap((item) =>
            (item.role || []).map((r) => r.toLowerCase().trim())
          ) || [];

        const canSeeTop = hasAccess(role, allRoles);

        if (newNav.data?.length === 0) return null;

        return canSeeTop ? newNav : null;
      })
      .filter(Boolean);
  };

  const navItems = filterMenuByRole(navData);

  if (navItems.length === 0) return null;

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const setAutoHeight = (key) => {
    const el = subMenuRefs.current[key];
    if (!el) return;

    requestAnimationFrame(() => {
      const fullHeight = el.scrollHeight + "px";
      el.style.height = fullHeight;

      if (openSubmenu[key]) {
        el.style.height = "auto";
      }
    });
  };

  const collapseHeight = (key) => {
    const el = subMenuRefs.current[key];
    if (!el) return;

    const currentHeight = el.scrollHeight;
    el.style.height = currentHeight + "px";

    requestAnimationFrame(() => {
      el.style.height = "0px";
    });
  };

  useEffect(() => {
    Object.keys(openSubmenu).forEach((key) => {
      if (openSubmenu[key]) {
        setAutoHeight(key);
      }
    });
  }, [openSubmenu]);

  const autoExpandMenu = (items, parentKey = "") => {
    items.forEach((nav, index) => {
      const key = `${parentKey}${index}`;

      if (nav.data) {
        nav.data.forEach((sub) => {
          if (isActive(sub.link)) {
            setOpenSubmenu((prev) => ({ ...prev, [key]: true }));
          }
        });

        autoExpandMenu(nav.data, `${key}-`);
      }
    });
  };

  useEffect(() => {
    setOpenSubmenu({});
    autoExpandMenu(navItems);
  }, [location]);

  const updateHeight = () => {
    Object.keys(subMenuRefs.current).forEach((key) => {
      const el = subMenuRefs.current[key];
      if (el) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: el.scrollHeight,
        }));
      }
    });
  };

  useEffect(() => {
    updateHeight();
  }, [openSubmenu]);

  const handleSubmenuToggle = (key, parentKey = "") => {
    setOpenSubmenu((prev) => {
      const willOpen = !prev[key];

      const updated = Object.keys(prev).reduce((acc, k) => {
        const isSibling =
          k.startsWith(parentKey) &&
          k.split("-").length === key.split("-").length &&
          k !== key;

        if (isSibling) {
          acc[k] = false;
        } else {
          acc[k] = prev[k];
        }

        return acc;
      }, {});

      updated[key] = willOpen;

      requestAnimationFrame(() => {
        if (willOpen) {
          setAutoHeight(key);
        } else {
          collapseHeight(key);
        }
      });

      return updated;
    });
  };
const renderMenuItems = (items, parentKey = "", level = 0) => {
  // Calculate styles based on level (only for text elements)
  const getLevelStyles = () => {
    switch (level) {
      case 0: // Main menu level
        return {
          margin: "ml-0",
          padding: "px-3 py-3",
          textSize: "text-sm",
          fontWeight: "font-semi-bold",
          textColor: "text-gray-900",
          dark:"text-gray-400",
          iconSpacing: "mr-3", // More space for top level
        };
      case 1: // First submenu level
        return {
          margin: "ml-4",
          padding: "px-3 py-2.5",
          textSize: "text-sm",
          fontWeight: "font-semi-bold",
          textColor: "text-gray-700",
          dark:"text-gray-500",
          iconSpacing: "mr-3", // Consistent spacing
        };
      case 2: // Second submenu level
        return {
          margin: "ml-8",
          padding: "px-3 py-2",
          textSize: "text-sm",
          fontWeight: "font-semi-bold",
          textColor: "text-gray-600",
          dark:"text-gray-600",
          iconSpacing: "mr-2", // Slightly less space for deeper levels
        };
      case 3: // Third submenu level
        return {
          margin: "ml-12",
          padding: "px-3 py-1.5",
          textSize: "text-xs",
          fontWeight: "font-light",
          textColor: "text-gray-500",
          dark:"text-gray-600",
          iconSpacing: "mr-2",
        };
      default: // Any deeper levels
        return {
          margin: "ml-16",
          padding: "px-3 py-1",
          textSize: "text-xs",
          fontWeight: "font-light",
          textColor: "text-gray-500",
          dark:"text-gray-100",
          iconSpacing: "mr-2",
        };
    }
  };

  const levelStyles = getLevelStyles();

  return (
    <ul className={`flex flex-col gap-1.5 ${levelStyles.margin}`}>
      {items.map((nav, index) => {
        const key = `${parentKey}${index}`;
        const isOpen = openSubmenu[key] || false;
        const hasChildren = nav.data && nav.data.length > 0;
        const isLink = nav.link && !hasChildren;
        
        return (
          <li key={nav.title} className="w-full">
            {hasChildren ? (
              <>
                {/* Menu item with children */}
                <button
                  onClick={() => handleSubmenuToggle(key, parentKey)}
                  className={`flex items-center ${levelStyles.padding} rounded-lg transition-colors duration-200 group ${
                    isOpen 
                      ? "menu-item-active bg-brand-50 text-brand-700 border-r-2 border-brand-500" 
                      : "menu-item-inactive text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  } cursor-pointer w-full ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "lg:justify-start"
                  }`}
                >
                  {/* Icon with proper spacing */}
                  <span
                    className={`menu-item-icon-size ${levelStyles.iconSpacing} ${
                      isOpen
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon || (
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    )}
                  </span>

                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className={`menu-item-text flex-1 text-left ${levelStyles.textSize} ${levelStyles.fontWeight} ${levelStyles.textColor} dark:${levelStyles.dark}`}>
                      {nav.title}
                    </span>
                  )}

                  {(isExpanded || isHovered || isMobileOpen) && (
                    <ChevronDownIcon
                      className={`ml-auto w-4 h-4 transition-transform ${
                        isOpen ? "rotate-180 text-brand-500" : "text-gray-400"
                      }`}
                    />
                  )}
                </button>
                
                {/* Submenu container */}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <div
                    ref={(el) => (subMenuRefs.current[key] = el)}
                    className="overflow-hidden transition-all duration-100 ease-in-out"
                    style={{
                      height: openSubmenu[key] ? "auto" : "0px",
                    }}
                  >
                    <div className="mt-1">
                      {renderMenuItems(nav.data, `${key}-`, level + 1)}
                    </div>
                  </div>
                )}
              </>
            ) : isLink ? (
              // Link items
              <Link
                to={nav.link}
                className={`flex items-center ${levelStyles.padding} rounded-lg transition-colors duration-200 group ${
                  isActive(nav.link)
                    ? "menu-item-active bg-brand-50 text-brand-700 border-r-2 border-brand-500"
                    : "menu-item-inactive text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                } w-full`}
              >
                {/* Icon with proper spacing */}
                <span
                  className={`menu-item-icon-size ${levelStyles.iconSpacing} ${
                    isActive(nav.link)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon || (
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  )}
                </span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text flex-1 text-left ${levelStyles.textSize} ${levelStyles.fontWeight} ${levelStyles.textColor} dark:${levelStyles.dark}`}>
                    {nav.title}
                  </span>
                )}
              </Link>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};



  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-6 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <img src="/images/logo/logoNIBNAME.png" alt="Logo" width={110} />
          ) : (
            <img
              src="../../public/images/logo/icon-dark.png"
              alt="Logo"
              width={40}
              height={40}
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <h2
            className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
              !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
            }`}
          >
            {isExpanded || isHovered || isMobileOpen ? (
              "Menu"
            ) : (
              <HorizontaLDots className="size-6" />
            )}
          </h2>

          {renderMenuItems(navItems)}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
