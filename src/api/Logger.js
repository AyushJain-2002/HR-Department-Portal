
import { API_CONFIG, LOG_LEVELS } from "./Api_Config";
import { isDebugEnabled } from "../Utils/Debug"; // From RN logger

class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000;
    this.enableFileLogging = API_CONFIG.LOG_TO_FILE;
    this.enableConsoleLogging = API_CONFIG.ENABLE_LOGGING;
    
    // NEW: log level based on environment (added from RN version)
    this.logLevel = this.getInitialLogLevel();
  }

  // Get initial log level
  getInitialLogLevel() {
    if (typeof isDebugEnabled === "function" && isDebugEnabled()) {
      return LOG_LEVELS.DEBUG;
    }
    return LOG_LEVELS.ERROR;
  }

  // FIXED: Helper to get level name
  getLevelName(level) {
    for (const [name, value] of Object.entries(LOG_LEVELS)) {
      if (value === level) return name;
    }
    return 'UNKNOWN';
  }
   // FIXED: Added missing setLogLevel method
  setLogLevel(level) {
    this.logLevel = level;
    console.log(`🔧 Log level set to: ${this.getLevelName(level)} (${level})`);
  }

  // FIXED: Correct level comparison logic
  shouldLog(level) {
    const incomingLevel = LOG_LEVELS[level] || 0;
    // If incoming level is HIGHER or equal to current logLevel, log it
    // (DEBUG=4, INFO=3, WARN=2, ERROR=1)
    return incomingLevel <= this.logLevel;  // CHANGED: <= instead of >=
  }

  // Format console output
  formatConsole(level, message, data, context) {
    const timestamp = new Date().toISOString();
    const ctx = context ? `[${context}] ` : "";
    const extra = data ? data : "";
    return `[${timestamp}] ${level}: ${ctx}${message}${extra} `;
  }

  // MAIN LOG FUNCTION
  log(level, message, data = {}, context) {
    if (!this.shouldLog(level)) return;

     // FIXED: Force console output if debug mode is enabled
    const isDebugMode = typeof isDebugEnabled === "function" && isDebugEnabled();
    const forceConsole = isDebugMode || this.enableConsoleLogging;
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      context,
      source: "api",
    };

    // Store in memory
    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) this.logs.shift();

    // Console output with colors
    if (forceConsole) {
      const colors = {
        [LOG_LEVELS.ERROR]: "\x1b[31m",
        [LOG_LEVELS.WARN]: "\x1b[33m",
        [LOG_LEVELS.INFO]: "\x1b[32m",
        [LOG_LEVELS.DEBUG]: "\x1b[36m",
        [LOG_LEVELS.TRACE]: "\x1b[90m",
      };
      const reset = "\x1b[0m";
      const levelName = this.getLevelName(level);

      console.log(
        // `${colors[level] || ""}${this.formatConsole(
        //   level,
        `${colors[level] || ""}[${levelName}] ${this.formatConsole(
          levelName,
          message,
          data,
          context
        )}${reset}`,
        data
      );
    }

    // Store in window for debugging
    if (typeof window !== "undefined") {
      window.__API_LOGS = window.__API_LOGS || [];
      window.__API_LOGS.push(logEntry);
      if (window.__API_LOGS.length > 100) window.__API_LOGS.shift();
    }

    return logEntry;
  }

  // Log methods
  error(message, data, ctx) {
    return this.log(LOG_LEVELS.ERROR, message, data, ctx);
  }
  
  warn(message, data, ctx) {
    return this.log(LOG_LEVELS.WARN, message, data, ctx);
  }
  
  info(message, data, ctx) {
    return this.log(LOG_LEVELS.INFO, message, data, ctx);
  }
  
  debug(message, data, ctx) {
    return this.log(LOG_LEVELS.DEBUG, message, data, ctx);
  }
  
  trace(message, data, ctx) {
    return this.log(LOG_LEVELS.TRACE, message, data, ctx);
  }

  // API logging methods
  logRequest(request) {
    return this.info(
      "API Request",
      {
        id: request.id,
        method: request.method,
        url: request.url,
        headers: request.headers,
        data: request.data,
        params: request.params,
      },
      "API"
    );
  }

  logResponse(response) {
    return this.info(
      "API Response",
      {
        id: response.id,
        status: response.status,
        duration: response.duration,
        data: response.data,
        headers: response.headers,
      },
      "API"
    );
  }

  logError(error) {
    return this.error(
      "API Error",
      {
        id: error.id,
        status: error.status,
        duration: error.duration,
        url: error.url,
        method: error.method,
        error: error.error,
        headers: error.headers,
      },
      "API"
    );
  }

  // Performance logging
  performance(metrics) {
    return this.debug("Performance", metrics, "PERF");
  }

  // Get logs with optional level filter
  getLogs(level) {
    if (!level) return [...this.logs];
    return this.logs.filter((l) => LOG_LEVELS[l.level] >= LOG_LEVELS[level]);
  }

  // Export logs in different formats
  exportLogs(format = "json") {
    const logs = this.getLogs();

    if (format === "json") {
      const logData = {
        metadata: {
          exported: new Date().toISOString(),
          logCount: logs.length,
          environment: import.meta.env.NODE_ENV,
          source: 'web_app'
        },
        logs: logs
      };
      return JSON.stringify(logData, null, 2);
    }
    
    if (format === "csv") {
      const headers = ["timestamp", "level", "message", "data", "context"];
      const rows = logs.map((log) => [
        log.timestamp,
        log.level,
        `"${log.message.replace(/"/g, '""')}"`,
        `"${JSON.stringify(log.data).replace(/"/g, '""')}"`,
        log.context || ""
      ]);
      return [headers, ...rows].map((r) => r.join(",")).join("\n");
    }
    
    return '';
  }

  // Download logs
  downloadLogs(filename = "api_logs.json") {
    try {
      const data = this.exportLogs("json");
      const blob = new Blob([data], { 
        type: "application/json;charset=utf-8" 
      });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log(`📥 Downloaded logs: ${filename}`);
      return true;
    } catch (error) {
      console.error('Failed to download logs:', error);
      return false;
    }
  }

  // Download logs in specific format
  downloadLogsInFormat(format = "json", filename = null) {
    if (!filename) {
      const dateStr = new Date().toISOString().split('T')[0];
      filename = `logs_${dateStr}.${format}`;
    }
    
    try {
      const data = this.exportLogs(format);
      let blobType = "text/plain;charset=utf-8";
      
      if (format === "json") {
        blobType = "application/json;charset=utf-8";
      } else if (format === "csv") {
        blobType = "text/csv;charset=utf-8";
      }
      
      const blob = new Blob([data], { type: blobType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error(`Failed to download logs as ${format}:`, error);
      return false;
    }
  }

  // Clear logs from memory
  clearLogs() {
    this.logs = [];
    
    // Clear window debugging logs
    if (window.__API_LOGS) window.__API_LOGS = [];
    
    console.log('🧹 Logs cleared from memory');
    return true;
  }

  // Get log statistics
  getLogStats() {
    try {
      const levelCounts = {
        ERROR: 0,
        WARN: 0,
        INFO: 0,
        DEBUG: 0,
        TRACE: 0
      };
      
      this.logs.forEach(log => {
        if (levelCounts[log.level]) {
          levelCounts[log.level]++;
        }
      });
      
      const totalSize = JSON.stringify(this.logs).length;
      
      return {
        logCount: this.logs.length,
        totalSizeKB: (totalSize / 1024).toFixed(2),
        totalSizeMB: (totalSize / (1024 * 1024)).toFixed(3),
        levelCounts,
        memoryLogs: this.logs.length
      };
    } catch {
      return {};
    }
  }

  // Search logs by keyword
  searchLogs(keyword) {
    try {
      const logs = this.getLogs();
      return logs.filter(log => 
        JSON.stringify(log).toLowerCase().includes(keyword.toLowerCase())
      );
    } catch (error) {
      console.error('Failed to search logs:', error);
      return [];
    }
  }

  // Get all logs (alias for getLogs)
  getAllLogs() {
    return this.getLogs();
  }
}

export default new Logger();