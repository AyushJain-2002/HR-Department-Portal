import logger from '../api/Logger';


export const DEBUG_CONFIG = {
  enabled: true,                      // master switch
  showInProduction: false,            // allow showing debug in prod
  enabledFeatures: {
    floatingButton: true,
    loggingDashboard: true,
    debugPanel: true,
    bugReports: true,
    logCopying: true,
    performanceTracking: true,
  },
};
// Debug panel component
export const DebugPanel = () => {
  const toggleDebug = () => {
    const debugDiv = document.getElementById('api-debug-panel');
    if (debugDiv) {
      debugDiv.style.display = debugDiv.style.display === 'none' ? 'block' : 'none';
    }
  };
  
  const clearLogs = () => {
    logger.clearLogs();
    console.clear();
    alert('Logs cleared');
  };
  
  const exportLogs = () => {
    logger.downloadLogs();
  };
  
  const showLogs = () => {
    const logs = logger.getAllLogs();
    console.table(logs.map(log => ({
      timestamp: log.timestamp,
      level: log.level,
      message: log.message,
    })));
  };
  
  // Create debug panel
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      if (!document.getElementById('api-debug-panel')) {
        const panel = document.createElement('div');
        panel.id = 'api-debug-panel';
        panel.style.cssText = `
          position: fixed;
          bottom: 10px;
          right: 10px;
          background: #333;
          color: white;
          padding: 10px;
          border-radius: 5px;
          z-index: 9999;
          font-family: monospace;
          font-size: 12px;
        `;
        
        panel.innerHTML = `
          <h4 style="margin: 0 0 10px 0;">API Debug</h4>
          <button onclick="window.__DEBUG.toggle()" style="margin: 2px;">Toggle</button>
          <button onclick="window.__DEBUG.showLogs()" style="margin: 2px;">Show Logs</button>
          <button onclick="window.__DEBUG.clearLogs()" style="margin: 2px;">Clear</button>
          <button onclick="window.__DEBUG.exportLogs()" style="margin: 2px;">Export</button>
        `;
        
        document.body.appendChild(panel);
        
        // Add to window for global access
        window.__DEBUG = {
          toggle: toggleDebug,
          showLogs,
          clearLogs,
          exportLogs,
          logger,
        };
      }
    }, 1000);
  }
};

// Performance monitoring
export const monitorPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const performanceEntries = performance.getEntriesByType('navigation');
    if (performanceEntries.length > 0) {
      const navEntry = performanceEntries[0];
      logger.performance({
        type: 'page_load',
        dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
        tcp: navEntry.connectEnd - navEntry.connectStart,
        request: navEntry.responseStart - navEntry.requestStart,
        response: navEntry.responseEnd - navEntry.responseStart,
        domLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
        load: navEntry.loadEventEnd - navEntry.loadEventStart,
      });
    }
  }
};

// Error boundary catcher
export const catchErrors = (error, errorInfo) => {
  logger.error('React Error Boundary', {
    error: error.toString(),
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
  });
};

/**
 * Universal Debug Enabler
 * Works like React-Native's isDebugEnabled()
 */
export const isDebugEnabled = () => {
  if (!DEBUG_CONFIG.enabled) return false;

  const isDev =
    import.meta.env.NODE_ENV === "development" ||
    window?.location?.hostname === "localhost";

  if (isDev) return true;

  return DEBUG_CONFIG.showInProduction;
};

/**
 * Check specific feature
 */
export const isDebugFeatureEnabled = (feature) => {
  return (
    isDebugEnabled() &&
    DEBUG_CONFIG.enabledFeatures?.[feature] === true
  );
};

/**
 * Get current config (for UI display)
 */
export const getDebugConfig = () => {
  return { ...DEBUG_CONFIG };
};

/**
 * Environment-based override
 */
export const getEnvironmentDebugConfig = () => {
  const envEnabled = process.env.REACT_APP_DEBUG_ENABLED === "true";
  const envProd = process.env.REACT_APP_DEBUG_PRODUCTION === "true";

  return {
    enabled: envEnabled !== undefined ? envEnabled : DEBUG_CONFIG.enabled,
    showInProduction:
      envProd !== undefined ? envProd : DEBUG_CONFIG.showInProduction,
  };
};

export const logNavigation = (routeName, params) => {
    logger.info(`Navigation to ${routeName}`, params, 'Navigation');
  }

  // Performance timing utility
export const startTimer = (label) => {
    const startTime = Date.now();
    logger.debug(`Timer started: ${label}`, undefined, 'Performance');

    return () => {
      const duration = Date.now() - startTime;
      logger.info(
        `Timer ended: ${label}`,
        { duration: `${duration}ms` },
        'Performance'
      );
    };
  }

export default {
  DebugPanel,
  monitorPerformance,
  catchErrors,
  DEBUG_CONFIG,
  isDebugEnabled,
  isDebugFeatureEnabled,
  getDebugConfig,
  logNavigation,
  startTimer,
  getEnvironmentDebugConfig
  
};