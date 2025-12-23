import logger from './Logger';

// Helper: Sanitize payload for logging (remove sensitive data)
const sanitizeLogData = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return payload;
  }

  const sanitized = { ...payload };
  const sensitiveFields = [
    'password', 'token', 'secret', 'access_token', 'refresh_token',
    'credit_card', 'ssn', 'pin', 'cvv', 'otp', 'authToken', 'authorization'
  ];

  Object.keys(sanitized).forEach(key => {
    // Check if key contains any sensitive field
    const isSensitive = sensitiveFields.some(field => 
      key.toLowerCase().includes(field.toLowerCase())
    );
    
    if (isSensitive) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeLogData(sanitized[key]);
    }
  });

  return sanitized;
};

/**
 * Simple Redux middleware for logging all actions
 */
export const logMiddleware = (store) => (next) => (action) => {
  const startTime = Date.now();
  
  // Get current state
  const state = store.getState();
  
  // Extract user info from various possible state paths
  let userInfo = {};
  
  // Try different state paths to find user info
  if (state?.auth?.user) {
    userInfo = state.auth.user;
  } else if (state?.auth?.data) {
    userInfo = state.auth.data;
  } else if (state?.user?.data) {
    userInfo = state.user.data;
  } else if (state?.pospSignUpIn?.user) {
    userInfo = state.pospSignUpIn.user;
  } else if (state?.auth) {
    // If auth is directly the user object
    userInfo = state.auth;
  }
  
  const userId = userInfo.id || userInfo.userId || 'unknown';
  const userEmail = userInfo.email || 'unknown';
  const userRole = userInfo.role || 'unknown';

  // Log the action before processing
  try {
    logger.info(`Redux Action: ${action.type}`, {
      userId,
      userEmail,
      userRole,
      timestamp: new Date().toISOString(),
      hasPayload: !!action.payload,
      payloadType: typeof action.payload,
      source: 'redux_middleware'
    }, "REDUX_ACTION");
  } catch (error) {
    // If logging fails, don't break the app
    console.warn('Failed to log Redux action:', error.message);
  }

  // Process the action
  const result = next(action);

  const duration = Date.now() - startTime;
  
  // Log completion
  try {
    if (duration > 100) { // Log only if action took >100ms
      logger.debug(`Redux Action Complete: ${action.type}`, {
        userId,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
        source: 'redux_middleware'
      }, "REDUX_ACTION");
    }
  } catch (error) {
    // Silent fail for debug logging
  }

  return result;
};

/**
 * Middleware for async actions (RTK thunks)
 */
export const asyncActionMiddleware = (store) => (next) => (action) => {
  // Check if it's an async action from RTK
  if (typeof action === 'function') {
    // This is a thunk, we can't log it directly
    return next(action);
  }

  const actionType = action?.type || '';
  
  // Log async action stages
  if (actionType.includes('/pending')) {
    try {
      logger.info(`Async Action Started: ${actionType}`, {
        timestamp: new Date().toISOString(),
        source: 'redux_middleware'
      }, "ASYNC_ACTION");
    } catch (error) {
      console.warn('Failed to log async action start:', error.message);
    }
  }
  
  if (actionType.includes('/fulfilled')) {
    try {
      logger.info(`Async Action Success: ${actionType}`, {
        timestamp: new Date().toISOString(),
        hasResult: !!action.payload,
        source: 'redux_middleware'
      }, "ASYNC_ACTION");
    } catch (error) {
      console.warn('Failed to log async action success:', error.message);
    }
  }
  
  if (actionType.includes('/rejected')) {
    try {
      logger.error(`Async Action Failed: ${actionType}`, {
        timestamp: new Date().toISOString(),
        error: action.error?.message || 'Unknown error',
        source: 'redux_middleware'
      }, "ASYNC_ACTION");
    } catch (error) {
      console.warn('Failed to log async action failure:', error.message);
    }
  }

  return next(action);
};

// Export both middlewares
export default logMiddleware;





// import logger from './Logger';

// /**
//  * Ultra-simple Redux middleware - just logs action types
//  * No complex logic, no errors
//  */
// export const simpleLogMiddleware = (store) => (next) => (action) => {
//   // Just log the action type and timestamp
//   try {
//     const timestamp = new Date().toISOString();
    
//     // Get basic user info if available
//     const state = store.getState();
//     const userId = state?.auth?.user?.id || 
//                   state?.auth?.data?.id || 
//                   state?.user?.data?.id || 
//                   'unknown';
    
//     // Create a safe log entry
//     const logData = {
//       actionType: action?.type || 'UNKNOWN_ACTION',
//       userId,
//       timestamp,
//       hasPayload: !!action.payload
//     };
    
//     // Remove any circular references from payload
//     if (action.payload && typeof action.payload === 'object') {
//       try {
//         // Try to stringify to check for circular references
//         JSON.stringify(action.payload);
//         logData.payloadSummary = `Object with ${Object.keys(action.payload).length} keys`;
//       } catch {
//         logData.payloadSummary = '[Circular or unserializable]';
//       }
//     }
    
//     // Log the action
//     logger.info(`Redux: ${logData.actionType}`, logData, "REDUX_ACTION");
    
//   } catch (error) {
//     // If ANYTHING fails, just log a basic message
//     console.log(`Redux Action: ${action?.type || 'UNKNOWN'} at ${new Date().toISOString()}`);
//   }
  
//   // Always process the action
//   return next(action);
// };

// // Use this in your store.js
// export default simpleLogMiddleware;










// // src/components/LogManager.jsx (Optional - for UI controls)
// import React from 'react';
// import logger from '../api/Logger';

// const LogManager = () => {
//   const handleSaveLogs = () => {
//     const saved = logger.saveCurrentFileToDisk();
//     if (saved) {
//       alert('Logs saved to file!');
//     }
//   };

//   const handleDownloadLogs = () => {
//     logger.downloadLogs();
//   };

//   const handleDownloadCSV = () => {
//     logger.downloadLogsInFormat('csv');
//   };

//   const handleFlushLogs = () => {
//     logger.flushLogsToDisk();
//     alert('Logs flushed to disk!');
//   };

//   const handleClearLogs = () => {
//     if (window.confirm('Clear all logs from memory?')) {
//       logger.clearLogs();
//       alert('Logs cleared!');
//     }
//   };

//   const handleLoadLogs = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       logger.loadLogsFromFile(file)
//         .then(data => {
//           console.log('Loaded logs:', data);
//           alert(`Loaded ${data.logs?.length || 0} logs from file`);
//         })
//         .catch(error => {
//           alert('Failed to load file: ' + error.message);
//         });
//     }
//   };

//   const stats = logger.getLogStats();

//   return (
//     <div style={{
//       position: 'fixed',
//       bottom: '20px',
//       right: '20px',
//       background: 'white',
//       border: '1px solid #ccc',
//       padding: '15px',
//       borderRadius: '8px',
//       boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//       zIndex: 1000,
//       maxWidth: '300px'
//     }}>
//       <h4>📊 Log Manager</h4>
      
//       {stats.logCount && (
//         <div style={{ marginBottom: '10px' }}>
//           <p><strong>Current Session:</strong></p>
//           <p>• Logs: {stats.logCount}</p>
//           <p>• Size: {stats.totalSizeKB} KB</p>
//           <p>• File: {stats.currentFile}</p>
//         </div>
//       )}
      
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//         <button onClick={handleSaveLogs} style={buttonStyle}>
//           💾 Save Current Logs
//         </button>
        
//         <button onClick={handleDownloadLogs} style={buttonStyle}>
//           📥 Download JSON
//         </button>
        
//         <button onClick={handleDownloadCSV} style={buttonStyle}>
//           📊 Download CSV
//         </button>
        
//         <button onClick={handleFlushLogs} style={buttonStyle}>
//           🔄 Flush to Disk
//         </button>
        
//         <button onClick={handleClearLogs} style={{...buttonStyle, background: '#ff4444'}}>
//           🗑️ Clear Logs
//         </button>
        
//         <label style={{...buttonStyle, textAlign: 'center', cursor: 'pointer'}}>
//           📂 Load Logs File
//           <input 
//             type="file" 
//             accept=".json,.txt,.csv"
//             onChange={handleLoadLogs}
//             style={{ display: 'none' }}
//           />
//         </label>
//       </div>
//     </div>
//   );
// };

// const buttonStyle = {
//   padding: '8px 12px',
//   background: '#007bff',
//   color: 'white',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
//   fontSize: '14px'
// };

// export default LogManager;