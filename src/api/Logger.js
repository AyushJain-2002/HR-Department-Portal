// No React library can bypass browser security to auto-save to disk without user permission. The best approach is user-initiated download + server backup.


import { API_CONFIG, LOG_LEVELS } from "./Api_Config";
import { isDebugEnabled } from "../Utils/Debug"; // From RN logger
// import {saveAs} from "file-saver";
class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000;
    this.enableFileLogging = API_CONFIG.LOG_TO_FILE;
    this.enableConsoleLogging = API_CONFIG.ENABLE_LOGGING;

    //  // NEW: Initialize file logging system
    // // ============================================================
    // this.logDirectory = 'app_logs'; // Directory for log files
    // // this.maxLogFiles = 30; // Keep 30 days of logs
    // this.maxFileSize = 250 * 1024 * 1024; // 250MB per file
    // this.currentFileLogs=[]; //current day's logs in memory
    // this.currentFileName='';
    // this.autoSaveThreshold=100; //Auto-save every 100 logs
    // this.autoSaveTimer= null;
    // this.autoSaveInterval=60*60*1000; //Auto-save every 5 minutes
    // // Initialize file logging if enabled
    // if (this.enableFileLogging) {
    //   this.initializeFileLogging();
    // }
    // ============================================================
    
    // NEW: log level based on environment (added from RN version)
    this.logLevel = this.getInitialLogLevel();
  }

   // 🔹 NEW: Initialize file logging system
  // ============================================================
  initializeFileLogging() {
    try {
      // Set up today's log file
      this.setupTodayLogFile();
      
        // 🔹 REMOVED: Don't load from localStorage (we're using secondary storage)
      // this.loadFromLocalStorage();

       // 🔹 ADDED: Start auto-save timer
      this.setupAutoSave();
      // Create today's log file if it doesn't exist
      // if (!this.logFileExists()) {
      //   this.createLogFile();
      // }
      
      // console.log('✅ File logging initialized (using file-saver)');
    } catch (error) {
      console.error('❌ Failed to initialize file logging:', error);
    }
  }

  // Get today's log file name (YYYY-MM-DD.log)
  getLogFileName(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}.json`;
  }

  // Setup today's log file
  setupTodayLogFile() {
    const today = new Date();
    this.currentFileName = this.getLogFileName(today);
    this.currentFileLogs = [];
        // console.log(`📁 Log file: ${this.currentFileName}`);
    // Check if we need to rotate files
    // this.checkAndRotateFiles();
  }

  // Get log file path (for localStorage key)
  getLogFilePath(date = new Date()) {
    const fileName = this.getLogFileName(date);
    return `${this.logDirectory}/${fileName}`;
  }

  // Setup auto-save timer
  setupAutoSave() {
    // Clear any existing timer
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }
    
    // Set up new auto-save interval
    this.autoSaveTimer = setInterval(() => {
      if (this.currentFileLogs.length > 0) {
        console.log('🔄 Auto-saving logs...');
        this.saveCurrentFileToDisk();
      }
    }, this.autoSaveInterval);
  }

   // 🔹 UPDATED: saveToFile - Saves to SECONDARY STORAGE (not localStorage)
  // ============================================================
  saveToFile(logEntry) {
    try {
      // Add to current day's logs in memory
      this.currentFileLogs.push(logEntry);
      
      // Check file size (in memory)
      const fileSize = JSON.stringify(this.currentFileLogs).length;
      
      // If file size exceeds limit, save current file and start new one
      if (fileSize > this.maxFileSize) {
        console.log('📦 File size limit reached, saving to new file...');
        this.saveCurrentFileToDisk();
        this.setupTodayLogFile();
        // Re-add the current log entry to new file
        this.currentFileLogs.push(logEntry);
      }
      
      // Auto-save every X logs
      if (this.currentFileLogs.length % this.autoSaveThreshold === 0) {
        console.log(`📊 Reached ${this.autoSaveThreshold} logs, auto-saving...`);
        this.saveCurrentFileToDisk();
      }
      
      return true;
    } catch (error) {
      console.error('Failed to save log to file:', error);
      return false;
    }
  }

   // Save current day's logs to disk using file-saver
  saveCurrentFileToDisk() {
    try {
      if (this.currentFileLogs.length === 0){
        console.log('⚠️ No logs to save');
        return false;
      }
      
      const logData = {
        metadata: {
          fileName: this.currentFileName,
          created: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          lineCount: this.currentFileLogs.length,
          size: JSON.stringify(this.currentFileLogs).length,
          environment: import.meta.env.NODE_ENV,
          userAgent: navigator.userAgent?.substring(0, 100)
        },
        logs: this.currentFileLogs
      };
      
      // Convert to JSON string
      const jsonData = JSON.stringify(logData, null, 2);
      
      // Create blob
      const blob = new Blob([jsonData], { 
        type: 'application/json;charset=utf-8' 
      });
      
      // 🔹 USE FILE-SAVER TO SAVE TO SECONDARY STORAGE
      saveAs(blob, this.currentFileName);
      
      console.log(`💾 Saved ${this.currentFileLogs.length} logs to: ${this.currentFileName}`);
      
      return true;
    } catch (error) {
      console.error('Failed to save file to disk:', error);
      return false;
    }
  }

  // 🔹 UPDATED: Save logs to disk manually (call this periodically)
  flushLogsToDisk() {
    const saved = this.saveCurrentFileToDisk();
    if (saved) {
      // Start new file after flush
      this.setupTodayLogFile();
    }
    return saved;
  }
  

  // 🔹 NEW: Save logs to disk with custom filename
  saveLogsToDisk(filename = null) {
    if (!filename) {
      filename = this.currentFileName;
    }
    return this.saveCurrentFileToDiskWithName(filename);
  }
  saveCurrentFileToDiskWithName(filename) {
    try {
      if (this.currentFileLogs.length === 0) return false;
      const logData = {
        metadata: {
          fileName: filename,
          created: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          lineCount: this.currentFileLogs.length,
          size: JSON.stringify(this.currentFileLogs).length
        },
        logs: this.currentFileLogs
      };
      
      const jsonData = JSON.stringify(logData, null, 2);
      const blob = new Blob([jsonData], { 
        type: 'application/json;charset=utf-8' 
      });
      
      saveAs(blob, filename);
      console.log(`💾 Saved logs to: ${filename}`);
      return true;
    } catch (error) {
      console.error('Failed to save logs to disk:', error);
      return false;
    }
  }

   getAllLogs() {
    return [...this.currentFileLogs];
  }

  // 🔹 NEW: Load logs from a file (user selects file)
  loadLogsFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const content = JSON.parse(event.target.result);
          resolve(content);
        } catch (error) {
          reject(new Error('Failed to parse log file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }

  // 🔹 NEW: Search logs across date range
  // ============================================================
  searchLogs(keyword) {
    try {
      const logs = this.getAllLogs();
      return logs.filter(log => 
        JSON.stringify(log).toLowerCase().includes(keyword.toLowerCase())
      );
    } catch (error) {
      console.error('Failed to search logs:', error);
      return [];
    }
  }

  // 🔹 UPDATED: Clear logs from memory
  // ============================================================
  clearLogs() {
    // Save current logs to disk before clearing
    if (this.currentFileLogs.length > 0) {
      console.log('💾 Saving logs before clearing...');
      this.saveCurrentFileToDisk();
    }
    
    // Clear from memory
    this.logs = [];
    this.currentFileLogs = [];
    
    // Clear window debugging logs
    if (window.__API_LOGS) window.__API_LOGS = [];
    
    // Start new log file
    this.setupTodayLogFile();
    
    console.log('🧹 Logs cleared from memory');
    return true;
  }

  // 🔹 NEW: Get log statistics
  // ============================================================
  getLogStats() {
    try {
      const levelCounts = {
        ERROR: 0,
        WARN: 0,
        INFO: 0,
        DEBUG: 0,
        TRACE: 0
      };
      
      this.currentFileLogs.forEach(log => {
        if (levelCounts[log.level]) {
          levelCounts[log.level]++;
        }
      });
      
      const totalSize = JSON.stringify(this.currentFileLogs).length;
      
      // const files = this.getAllLogFiles();
      // let totalEntries = 0;
      // let totalSize = 0;
      
      // files.forEach(fileName => {
      //   const filePath = `${this.logDirectory}/${fileName}`;
      //   const logFileStr = localStorage.getItem(filePath);
        
      //   if (logFileStr) {
      //     totalSize += logFileStr.length;
      //     const logFile = JSON.parse(logFileStr);
      //     totalEntries += (logFile.logs || []).length;
      //   }
      // });
      
      return {
        currentFile: this.currentFileName,
        logCount: this.currentFileLogs.length,
        totalSizeKB: (totalSize / 1024).toFixed(2),
        totalSizeMB: (totalSize / (1024 * 1024)).toFixed(3),
        levelCounts,
        memoryLogs: this.logs.length,
        autoSaveEnabled: !!this.autoSaveTimer,
        nextAutoSave: this.autoSaveTimer ? 'Active' : 'Disabled'
        // totalFiles: files?.length,
        // totalEntries,
        // oldestLog: files[0] || 'None',
        // newestLog: files[files?.length - 1] || 'None',
        // storageUsed: `${((totalSize / (250 * 1024 * 1024)) * 100).toFixed(1)}% of localStorage limit`
      };
    } catch {
      return {};
    }
  }

   // 🔹 Save on page unload (optional)
  // ============================================================
  setupUnloadSave() {
    window.addEventListener('beforeunload', () => {
      if (this.currentFileLogs.length > 0) {
        // Use synchronous save or store in localStorage temporarily
        this.saveCurrentFileToDisk();
      }
    });
  }

  // 🔹 UPDATED: exportLogs - Enhanced with file-based logs
  // ============================================================
  exportLogs(format = "json") {
    const logs = this.getAllLogs();

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
      const headers = ["timestamp", "level", "message", "data", "file", "context"];
      const rows = logs.map((log) => [
        log.timestamp,
        log.level,
        `"${log.message.replace(/"/g, '""')}"`,
        `"${JSON.stringify(log.data).replace(/"/g, '""')}"`,
        log.context || ""
        // log.message,
        // JSON.stringify(log.data),
        // log.file || 'memory'
      ]);
      return [headers, ...rows].map((r) => r.join(",")).join("\n");
    }
    return '';
  }

// 🔹 UPDATED: Download logs using file-saver
  // ============================================================
  downloadLogs(filename = "api_logs.json") {
    try {
      const data = this.exportLogs("json");
      const blob = new Blob([data], { 
        type: "application/json;charset=utf-8" 
      });
      
      // Use file-saver
      saveAs(blob, filename);
      
      console.log(`📥 Downloaded logs: ${filename}`);
      return true;
    } catch (error) {
      console.error('Failed to download logs:', error);
      return false;
    }
  }

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
      saveAs(blob, filename);
      
      return true;
    } catch (error) {
      console.error(`Failed to download logs as ${format}:`, error);
      return false;
    }
  }
  // ============================================================

  // 🔹 EXISTING CODE BELOW (UNCHANGED)
  // ============================================================

  // Added from RN logger
  getInitialLogLevel() {
    if (typeof isDebugEnabled === "function" && isDebugEnabled()) {
      return LOG_LEVELS.DEBUG;
    }
    return LOG_LEVELS.ERROR;
  }

  // Added from RN logger
  shouldLog(level) {
    return LOG_LEVELS[level] >= this.logLevel;
  }

  // Added optional context + formatting from RN logger
  formatConsole(level, message, data, context) {
    const timestamp = new Date().toISOString();
    const ctx = context ? `[${context}] ` : "";
    const extra = data ? data : "";
    // console.log(level,"level")
    // console.log(message,"mess")
    // console.log(data,"data")
    // console.log(context,"context")

    return `[${timestamp}] ${level}: ${ctx}${message}${extra} `;
  }

  // MAIN LOG FUNCTION (unchanged logic)
  log(level, message, data = {}, context) {
    if (!this.shouldLog(level)) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      context,
      source: "api",
    };

    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) this.logs.shift();

    // Console colors (original logic)
    if (this.enableConsoleLogging) {
      const colors = {
        [LOG_LEVELS.ERROR]: "\x1b[31m",
        [LOG_LEVELS.WARN]: "\x1b[33m",
        [LOG_LEVELS.INFO]: "\x1b[32m",
        [LOG_LEVELS.DEBUG]: "\x1b[36m",
        [LOG_LEVELS.TRACE]: "\x1b[90m",
      };
      const reset = "\x1b[0m";

      console.log(
        `${colors[level] || ""}${this.formatConsole(
          level,
          message,
          data,
          context
        )}${reset}`,
        data
      );
    }

    // // Save logs in "file" (localStorage) — unchanged logic
    // if (this.enableFileLogging) {
    //   this.saveToFile(logEntry);
    // }

    // Save in window for debugging — unchanged logic
    if (typeof window !== "undefined") {
      window.__API_LOGS = window.__API_LOGS || [];
      window.__API_LOGS.push(logEntry);
      if (window.__API_LOGS.length > 100) window.__API_LOGS.shift();
    }

    return logEntry;
  }

  // KEEP FIRST FILE API EXACTLY SAME
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

  // API LOGS (first file)
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

  // Performance (unchanged)
  performance(metrics) {
    return this.debug("Performance", metrics, "PERF");
  }

  getLogs(level) {
    if (!level) return [...this.logs];
    return this.logs.filter((l) => LOG_LEVELS[l.level] >= LOG_LEVELS[level]);
  }

}

export default new Logger();







// import { API_CONFIG, LOG_LEVELS } from './Api_Config';

// class Logger {
//   constructor() {
//     this.logs = [];
//     this.maxLogs = 1000;
//     this.enableFileLogging = API_CONFIG.LOG_TO_FILE;
//     this.enableConsoleLogging = API_CONFIG.ENABLE_LOGGING;
//   }

//   // Log with level
//   log(level, message, data = {}) {
//     const logEntry = {
//       timestamp: new Date().toISOString(),
//       level,
//       message,
//       data,
//       source: 'api',
//     };

//     // Add to memory
//     this.logs.push(logEntry);
    
//     // Keep only max logs
//     if (this.logs.length > this.maxLogs) {
//       this.logs.shift();
//     }

//     // Console output in development
//     if (this.enableConsoleLogging) {
//       const colors = {
//         [LOG_LEVELS.ERROR]: '\x1b[31m', // Red
//         [LOG_LEVELS.WARN]: '\x1b[33m',  // Yellow
//         [LOG_LEVELS.INFO]: '\x1b[32m',  // Green
//         [LOG_LEVELS.DEBUG]: '\x1b[36m', // Cyan
//         [LOG_LEVELS.TRACE]: '\x1b[90m', // Gray
//       };
//       const reset = '\x1b[0m';
      
//       console.log(
//         `${colors[level] || ''}[${logEntry.timestamp}] ${level}: ${message}${reset}`,
//         data
//       );
//     }

//     // Save to file if enabled
//     if (this.enableFileLogging) {
//       this.saveToFile(logEntry);
//     }

//     // Store in window for debugging
//     if (typeof window !== 'undefined') {
//       window.__API_LOGS = window.__API_LOGS || [];
//       window.__API_LOGS.push(logEntry);
      
//       if (window.__API_LOGS.length > 100) {
//         window.__API_LOGS.shift();
//       }
//     }

//     return logEntry;
//   }

//   // Log levels
//   error(message, data) {
//     return this.log(LOG_LEVELS.ERROR, message, data);
//   }

//   warn(message, data) {
//     return this.log(LOG_LEVELS.WARN, message, data);
//   }

//   info(message, data) {
//     return this.log(LOG_LEVELS.INFO, message, data);
//   }

//   debug(message, data) {
//     return this.log(LOG_LEVELS.DEBUG, message, data);
//   }

//   trace(message, data) {
//     return this.log(LOG_LEVELS.TRACE, message, data);
//   }

//   // Request logging
//   logRequest(request) {
//     return this.info('API Request', {
//       id: request.id,
//       method: request.method,
//       url: request.url,
//       headers: request.headers,
//       data: request.data,
//       params: request.params,
//     });
//   }

//   // Response logging
//   logResponse(response) {
//     return this.info('API Response', {
//       id: response.id,
//       status: response.status,
//       duration: response.duration,
//       data: response.data,
//       headers: response.headers,
//     });
//   }

//   // Error logging
//   logError(error) {
//     return this.error('API Error', {
//       id: error.id,
//       status: error.status,
//       duration: error.duration,
//       url: error.url,
//       method: error.method,
//       error: error.error,
//       headers: error.headers,
//     });
//   }

//   // Performance logging
//   performance(metrics) {
//     return this.debug('Performance', metrics);
//   }

//   // Save to file (client-side)
//   saveToFile(logEntry) {
//     try {
//       // For client-side, we can use localStorage
//       const logs = JSON.parse(localStorage.getItem(API_CONFIG.LOG_FILE_NAME) || '[]');
//       logs.push(logEntry);
      
//       // Keep only last 500 entries in localStorage
//       if (logs.length > 500) {
//         logs.shift();
//       }
      
//       localStorage.setItem(API_CONFIG.LOG_FILE_NAME, JSON.stringify(logs));
//     } catch (error) {
//       console.error('Failed to save log to file:', error);
//     }
//   }

//   // Get logs from file
//   getLogsFromFile() {
//     try {
//       return JSON.parse(localStorage.getItem(API_CONFIG.LOG_FILE_NAME) || '[]');
//     } catch {
//       return [];
//     }
//   }

//   // Get all logs (memory + file)
//   getAllLogs() {
//     const fileLogs = this.getLogsFromFile();
//     return [...fileLogs, ...this.logs];
//   }

//   // Clear logs
//   clearLogs() {
//     this.logs = [];
//     localStorage.removeItem(API_CONFIG.LOG_FILE_NAME);
//     if (window.__API_LOGS) {
//       window.__API_LOGS = [];
//     }
//   }

//   // Export logs
//   exportLogs(format = 'json') {
//     const logs = this.getAllLogs();
    
//     if (format === 'json') {
//       return JSON.stringify(logs, null, 2);
//     } else if (format === 'csv') {
//       const headers = ['timestamp', 'level', 'message', 'data'];
//       const rows = logs.map(log => [
//         log.timestamp,
//         log.level,
//         log.message,
//         JSON.stringify(log.data)
//       ]);
//       return [headers, ...rows].map(row => row.join(',')).join('\n');
//     }
    
//     return logs;
//   }

//   // Download logs
//   downloadLogs(filename = 'api_logs.json') {
//     const data = this.exportLogs('json');
//     const blob = new Blob([data], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     a.click();
//     URL.revokeObjectURL(url);
//   }
// }

// export default new Logger();