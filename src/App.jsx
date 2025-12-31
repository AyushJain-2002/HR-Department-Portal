// import { useLocation } from "react-router";
// import Routing from "./Utils/Routing";
// import { useEffect, useState } from "react";
// import Cookies from 'js-cookie';
// import { getDecryptedCookie } from './Utils/secureCookie';
// import Loading from './pages/Loading';
// import logger from "./api/Logger"; // 🔹 ADDED: Import logger

// const App = () => {
//   const location = useLocation();
//   const [isAuthChecked, setIsAuthChecked] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     // 🔹 ADDED: Log app initialization
//     logger.info("Application initialized", {
//       appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
//       environment: import.meta.env.MODE,
//       userAgent: navigator.userAgent,
//       screenResolution: `${window.screen.width}x${window.screen.height}`,
//       timestamp: new Date().toISOString(),
//       pathname: location.pathname
//     }, "APP_LIFECYCLE");

//     // 🔹 ADDED: Setup global error handlers
//     const handleGlobalError = (event) => {
//       logger.error("Global JavaScript Error", {
//         message: event.message,
//         error: event.error?.toString(),
//         stack: event.error?.stack,
//         filename: event.filename,
//         lineno: event.lineno,
//         colno: event.colno,
//         timestamp: new Date().toISOString(),
//         pathname: location.pathname
//       }, "GLOBAL_ERROR");
//     };

//     const handleUnhandledRejection = (event) => {
//       logger.error("Unhandled Promise Rejection", {
//         reason: event.reason?.toString(),
//         promise: event.promise,
//         timestamp: new Date().toISOString(),
//         pathname: location.pathname
//       }, "PROMISE_ERROR");
//     };

//     const handlePageUnload = () => {
//       logger.info("Page unloading, saving logs", {
//         timestamp: new Date().toISOString(),
//         pathname: location.pathname,
//         logCount: logger.currentFileLogs?.length || 0
//       }, "APP_LIFECYCLE");
//     };

//     const handlePageVisibility = () => {
//       if (document.visibilityState === 'visible') {
//         logger.info("Page became visible", {
//           timestamp: new Date().toISOString(),
//           pathname: location.pathname
//         }, "APP_LIFECYCLE");
//       } else {
//         logger.debug("Page became hidden", {
//           timestamp: new Date().toISOString(),
//           pathname: location.pathname
//         }, "APP_LIFECYCLE");
//       }
//     };

//     // Register global handlers
//     window.addEventListener('error', handleGlobalError);
//     window.addEventListener('unhandledrejection', handleUnhandledRejection);
//     window.addEventListener('beforeunload', handlePageUnload);
//     document.addEventListener('visibilitychange', handlePageVisibility);

//     // 🔹 ADDED: Auto-save logs every 5 minutes
//     const autoSaveInterval = setInterval(() => {
//       if (logger.currentFileLogs?.length > 0) {
//         logger.saveCurrentFileToDisk();
//         logger.debug("Auto-saved logs", {
//           timestamp: new Date().toISOString(),
//           logCount: logger.currentFileLogs.length
//         }, "APP_LIFECYCLE");
//       }
//     }, 5 * 60 * 1000); // 5 minutes

//     // Check authentication
//     const token = Cookies.get("authToken");
//     const userInfo = getDecryptedCookie("userInfo");
//     const authenticated = !!(token && userInfo?.id);
    
//     setIsAuthenticated(authenticated);
//     setUserRole(userInfo?.role);
//     setIsAuthChecked(true);

//     // 🔹 ADDED: Log authentication check
//     logger.info("Authentication check completed", {
//       isAuthenticated: authenticated,
//       hasToken: !!token,
//       hasUserInfo: !!userInfo,
//       userId: userInfo?.id,
//       userRole: userInfo?.role,
//       timestamp: new Date().toISOString(),
//       pathname: location.pathname
//     }, "AUTH");

//     // 🔹 ADDED: Log route change
//     logger.info("Route changed", {
//       from: location.pathname,
//       isAuthenticated: authenticated,
//       userRole: userInfo?.role,
//       timestamp: new Date().toISOString()
//     }, "ROUTING");

//     // Cleanup function
//     return () => {
//       window.removeEventListener('error', handleGlobalError);
//       window.removeEventListener('unhandledrejection', handleUnhandledRejection);
//       window.removeEventListener('beforeunload', handlePageUnload);
//       document.removeEventListener('visibilitychange', handlePageVisibility);
//       clearInterval(autoSaveInterval);
      
//       // 🔹 ADDED: Log component unmount
//       logger.debug("App component unmounting", {
//         timestamp: new Date().toISOString(),
//         pathname: location.pathname
//       }, "APP_LIFECYCLE");
//     };
//   }, [location.pathname]);

//   const excludedRoutes = [
//     '/login', 
//     '/signup',
//     '/posp-signup',
//     '/posp-training-instructions',
//     '/posp-document',
//     '/posp-training',
//     '/posp-exam',
//     '/exam-instruction',
//     '/reset-password',
//     '/email-verification',
//     '/posp-reattampt-mail'
//   ];

//   const isExcludedRoute = excludedRoutes.includes(location.pathname);
//   const isPospUser = userRole === 'Posp';

//   if (!isAuthChecked) {
//     // 🔹 ADDED: Log loading state
//     logger.debug("App in loading state", {
//       timestamp: new Date().toISOString(),
//       pathname: location.pathname
//     }, "APP_LIFECYCLE");
//     return <Loading />;
//   }

//   // 🔹 ADDED: Log render state
//   logger.debug("App rendering", {
//     isAuthenticated,
//     userRole,
//     isExcludedRoute,
//     isPospUser,
//     timestamp: new Date().toISOString(),
//     pathname: location.pathname
//   }, "APP_LIFECYCLE");

//   return (
//     <>
//       {!isExcludedRoute && isAuthenticated && !isPospUser}
//       <div>
//         <Routing />
//       </div> 
//     </>
//   );
// };

// export default App;



// // import { useLocation } from "react-router";
// // import Routing from "./Utils/Routing";
// // import { useState, useRef } from "react";
// // import Cookies from 'js-cookie';
// // import { getDecryptedCookie } from './Utils/secureCookie';
// // import Loading from './pages/Loading';
// // import { 
// //   initializeLogging, 
// //   // initializeFileLogging, 
// //   // setupAutoSave,
// //   // shouldLogRequest 
// // } from "./api/loggingconfig"; // 🔹 ADD THIS IMPORT
// // import logger from "./api/Logger";

// // const App = () => {
// //   const location = useLocation();
// //   const [isAuthChecked, setIsAuthChecked] = useState(false);
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [userRole, setUserRole] = useState(null);
// //   const autoSaveIntervalRef = useRef(null);

// //   // useEffect(() => {
// //   //   // 🔹 UPDATED: Initialize logging using config
// //   //   initializeLogging();
// //   //   initializeFileLogging();
    
// //   //   // Setup auto-save
// //   //   autoSaveIntervalRef.current = setupAutoSave();

// //   //   // 🔹 UPDATED: Log app initialization with config check
// //   //   if (shouldLogCategory('APP_LIFECYCLE')) {
// //   //     logger.info("Application initialized", {
// //   //       appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
// //   //       environment: import.meta.env.MODE,
// //   //       userAgent: navigator.userAgent,
// //   //       screenResolution: `${window.screen.width}x${window.screen.height}`,
// //   //       timestamp: new Date().toISOString(),
// //   //       pathname: location.pathname,
// //   //       loggingEnabled: true
// //   //     }, "APP_LIFECYCLE");
// //   //   }

// //   //   // 🔹 UPDATED: Setup global error handlers with config check
// //   //   const handleGlobalError = (event) => {
// //   //     if (shouldLogCategory('GLOBAL_ERROR')) {
// //   //       logger.error("Global JavaScript Error", {
// //   //         message: event.message,
// //   //         error: event.error?.toString(),
// //   //         stack: event.error?.stack,
// //   //         filename: event.filename,
// //   //         lineno: event.lineno,
// //   //         colno: event.colno,
// //   //         timestamp: new Date().toISOString(),
// //   //         pathname: location.pathname
// //   //       }, "GLOBAL_ERROR");
// //   //     }
// //   //   };

// //   //   const handleUnhandledRejection = (event) => {
// //   //     if (shouldLogCategory('PROMISE_ERROR')) {
// //   //       logger.error("Unhandled Promise Rejection", {
// //   //         reason: event.reason?.toString(),
// //   //         promise: event.promise,
// //   //         timestamp: new Date().toISOString(),
// //   //         pathname: location.pathname
// //   //       }, "PROMISE_ERROR");
// //   //     }
// //   //   };

// //   //   const handlePageUnload = () => {
// //   //     if (shouldLogCategory('APP_LIFECYCLE')) {
// //   //       logger.info("Page unloading, saving logs", {
// //   //         timestamp: new Date().toISOString(),
// //   //         pathname: location.pathname,
// //   //         logCount: logger.currentFileLogs?.length || 0
// //   //       }, "APP_LIFECYCLE");
// //   //     }
// //   //     if (logger.saveCurrentFileToDisk) {
// //   //       logger.saveCurrentFileToDisk();
// //   //     }
// //   //   };

// //   //   const handlePageVisibility = () => {
// //   //     if (shouldLogCategory('APP_LIFECYCLE')) {
// //   //       if (document.visibilityState === 'visible') {
// //   //         logger.info("Page became visible", {
// //   //           timestamp: new Date().toISOString(),
// //   //           pathname: location.pathname
// //   //         }, "APP_LIFECYCLE");
// //   //       } else {
// //   //         logger.debug("Page became hidden", {
// //   //           timestamp: new Date().toISOString(),
// //   //           pathname: location.pathname
// //   //         }, "APP_LIFECYCLE");
// //   //       }
// //   //     }
// //   //   };

// //   //   // Register global handlers
// //   //   window.addEventListener('error', handleGlobalError);
// //   //   window.addEventListener('unhandledrejection', handleUnhandledRejection);
// //   //   window.addEventListener('beforeunload', handlePageUnload);
// //   //   document.addEventListener('visibilitychange', handlePageVisibility);

// //   //   // Check authentication
// //   //   const token = Cookies.get("authToken");
// //   //   const userInfo = getDecryptedCookie("userInfo");
// //   //   const authenticated = !!(token && userInfo?.id);
    
// //   //   setIsAuthenticated(authenticated);
// //   //   setUserRole(userInfo?.role);
// //   //   setIsAuthChecked(true);

// //   //   // 🔹 UPDATED: Log authentication check with config
// //   //   if (shouldLogCategory('AUTH')) {
// //   //     logger.info("Authentication check completed", {
// //   //       isAuthenticated: authenticated,
// //   //       hasToken: !!token,
// //   //       hasUserInfo: !!userInfo,
// //   //       userId: userInfo?.id,
// //   //       userRole: userInfo?.role,
// //   //       timestamp: new Date().toISOString(),
// //   //       pathname: location.pathname
// //   //     }, "AUTH");
// //   //   }

// //   //   // 🔹 UPDATED: Log route change with config
// //   //   if (shouldLogCategory('ROUTING')) {
// //   //     logger.info("Route changed", {
// //   //       from: location.pathname,
// //   //       isAuthenticated: authenticated,
// //   //       userRole: userInfo?.role,
// //   //       timestamp: new Date().toISOString()
// //   //     }, "ROUTING");
// //   //   }

// //   //   // Cleanup function
// //   //   return () => {
// //   //     window.removeEventListener('error', handleGlobalError);
// //   //     window.removeEventListener('unhandledrejection', handleUnhandledRejection);
// //   //     window.removeEventListener('beforeunload', handlePageUnload);
// //   //     document.removeEventListener('visibilitychange', handlePageVisibility);
      
// //   //     if (autoSaveIntervalRef.current) {
// //   //       clearInterval(autoSaveIntervalRef.current);
// //   //     }
      
// //   //     // 🔹 UPDATED: Log component unmount with config
// //   //     if (shouldLogCategory('APP_LIFECYCLE')) {
// //   //       logger.debug("App component unmounting", {
// //   //         timestamp: new Date().toISOString(),
// //   //         pathname: location.pathname
// //   //       }, "APP_LIFECYCLE");
// //   //     }
// //   //   };
// //   // }, [location.pathname]);

// //   const excludedRoutes = [
// //     '/login', 
// //     '/signup',
// //     '/posp-signup',
// //     '/posp-training-instructions',
// //     '/posp-document',
// //     '/posp-training',
// //     '/posp-exam',
// //     '/exam-instruction',
// //     '/reset-password',
// //     '/email-verification',
// //     '/posp-reattampt-mail'
// //   ];

// //   const isExcludedRoute = excludedRoutes.includes(location.pathname);
// //   const isPospUser = userRole === 'Posp';

// //   // if (!isAuthChecked) {
// //   //   // 🔹 UPDATED: Log loading state with config
// //   //   if (shouldLogCategory('APP_LIFECYCLE')) {
// //   //     logger.debug("App in loading state", {
// //   //       timestamp: new Date().toISOString(),
// //   //       pathname: location.pathname
// //   //     }, "APP_LIFECYCLE");
// //   //   }
// //   //   return <Loading />;
// //   // }

// //   // // 🔹 UPDATED: Log render state with config
// //   // if (shouldLogCategory('APP_LIFECYCLE')) {
// //   //   logger.debug("App rendering", {
// //   //     isAuthenticated,
// //   //     userRole,
// //   //     isExcludedRoute,
// //   //     isPospUser,
// //   //     timestamp: new Date().toISOString(),
// //   //     pathname: location.pathname
// //   //   }, "APP_LIFECYCLE");
// //   // }

// //   return (
// //     <>
// //       {!isExcludedRoute && isAuthenticated && !isPospUser}
// //       <div>
// //         <Routing />
// //       </div> 
// //     </>
// //   );
// // };

// // export default App;











// // import { useLocation } from "react-router";
// // import Routing from "./Utils/Routing";
// // import { useEffect, useState } from "react";
// // import Cookies from 'js-cookie';
// // import { getDecryptedCookie } from './Utils/secureCookie';
// // import Loading from './pages/Loading'
// // const App = () => {
// // const location = useLocation();
// //   const [isAuthChecked, setIsAuthChecked] = useState(false);
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [userRole, setUserRole] = useState(null);

// //   useEffect(() => {
// //     const token = Cookies.get("authToken");
// //     const userInfo = getDecryptedCookie("userInfo");
// //     setIsAuthenticated(!!(token && userInfo?.id));
// //     setUserRole(userInfo?.role);
// //     setIsAuthChecked(true);
// //   }, [location.pathname]);

// //   const excludedRoutes = [
// //     '/login', 
// //     '/signup',
// //     '/posp-signup',
// //     '/posp-training-instructions',
// //     '/posp-document',
// //     '/posp-training',
// //     '/posp-exam',
// //     '/exam-instruction',
// //     '/reset-password',
// //     '/email-verification',
// //     '/posp-reattampt-mail'
// //   ];

// //   const isExcludedRoute = excludedRoutes.includes(location.pathname);
// //   const isPospUser = userRole === 'Posp';

// //   if (!isAuthChecked) {
// //     return <Loading />;
// //   }

// //   return (
// //     <>
// //       {!isExcludedRoute && isAuthenticated && !isPospUser}
// //       <div>
// //       {/* <div className={`font-pt_serif ${isExcludedRoute || isPospUser ? '' : 'px-2 lg:px-5 xl:px-16'}`}> */}
// //         <Routing />
// //       </div> 
// //     </>
// //   );
// // };

// // export default App;
// // // 6LcQgQErAAAAABYwUkVo6DKEc9JULtYqnQDyMB4Z  site ket 

// // // 6LcQgQErAAAAAFJrZgBtWDt4SEquXGD0ONVmdreY secret key


import React from 'react'

const App = () => {
  return (
    <div>
      hello
    </div>
  )
}

export default App
