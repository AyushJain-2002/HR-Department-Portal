import { API_CONFIG } from './Api_Config';

// Base URL with version
// const BASE_URL = API_CONFIG.BASE_URL + API_CONFIG.API_VERSION;
const BASE_URL = API_CONFIG.BASE_URL ;

// Endpoint Builder
const createEndpoint = (path) => `${BASE_URL}${path}`;

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: createEndpoint('/login'),
  REGISTER: createEndpoint('posp/register'),
  LOGOUT: createEndpoint('/logout'),
  // REFRESH_TOKEN: createEndpoint('/auth/refresh'),
  // FORGOT_PASSWORD: createEndpoint('/auth/forgot-password'),
  // RESET_PASSWORD: createEndpoint('/auth/reset-password'),
  VERIFY_EMAIL: createEndpoint("/posp/resend-verification-email"),
  // VERIFY_OTP: createEndpoint('/auth/verify-otp'),
  // CHANGE_PASSWORD: createEndpoint('/auth/change-password'),
  // ME: createEndpoint('/auth/me'),
};

// User Endpoints
export const EMPLOYEE_ENDPOINTS = {
  GET_EMPLOYEES: createEndpoint('/employees/getAllEmployees/all'),
  GET_EMPLOYEE: (id) => createEndpoint(`/employees/${id}`),
  CREATE_EMPLOYEE: createEndpoint(`/employees/register`),
  UPDATE_EMPLOYEE: (id) => createEndpoint(`/employees/${id}`),
  // DELETE_EMPLOYEE: (id) => createEndpoint(`/users/${id}`),
  TOGGLE_EMPLOYEE: (id) => createEndpoint(`/employees/toggle/${id}`)
  // UPDATE_PROFILE: createEndpoint('/users/profile'),
  // UPLOAD_AVATAR: createEndpoint('/users/avatar'),
  // GET_PREFERENCES: createEndpoint('/users/preferences'),
  // UPDATE_PREFERENCES: createEndpoint('/users/preferences'),
  // SEARCH_EMPLOYEES: createEndpoint('/users/search'),
};

export const STATES_ENDPOINTS= {
    GET_STATES: createEndpoint('/states'),
    GET_CITIES_BY_STATE: (stateId) => createEndpoint(`/states/${stateId}`),
    GET_CITIES_BY_STATE_ANOTHER: (stateId) => createEndpoint(`/states/${stateId}`), // If different endpoint, update accordingly
    GET_ALL_CITIES: createEndpoint('/getAllCity'),
    CREATE_CITY: createEndpoint('/states/cities'),
    DELETE_CITY: (cityId) => createEndpoint(`/cityDelete/${cityId}`),
  };

export const  BRANCHES= {
    GET_BRANCHES: createEndpoint('/branches'),
    GET_BRANCH_BY_ID: (id) => createEndpoint(`/branches/${id}`),
    CREATE_BRANCH: createEndpoint('/branches'),
    UPDATE_BRANCH: (id) => createEndpoint(`/branches/${id}`),
    DELETE_BRANCH: (id) => createEndpoint(`/branches/${id}`),
    GET_BRANCH_MANAGERS: createEndpoint('/branch-managers'),
    GET_BRANCH_MANAGER_BY_ID: (id) => createEndpoint(`/branch-managers/${id}`),
    CREATE_BRANCH_MANAGER: createEndpoint('/branch-managers'),
    DELETE_BRANCH_MANAGER: (id) => createEndpoint(`/branch-managers/${id}`),
    UPDATE_BRANCH_MANAGER: (id) => createEndpoint(`/branch-managers/${id}`),
  };
  export const FUELS= {
    GET_FUELS: createEndpoint('/fuels'),
    CREATE_FUEL: createEndpoint('/fuels'),
    DELETE_FUEL: (id) => createEndpoint(`/fuels/${id}`),
    GET_ADDONS: createEndpoint('/addons'),
    CREATE_ADDON: createEndpoint('/addons'),
    DELETE_ADDON: (id) => createEndpoint(`/addons/${id}`),
    GET_TYPE_ADDONS: (type) => createEndpoint(`/addons/type/${type}`),
    GET_BANKS: createEndpoint('/banks'),
    CREATE_BANK: createEndpoint('/banks'),
    DELETE_BANK: (id) => createEndpoint(`/banks/${id}`),
  };
   export const OPERATIONS= {
    GET_BQP_TYPES: (verticalType) => createEndpoint(`/policyentryfilter/getbqptype/${verticalType}`),
    GET_RELATIONSHIP_MANAGERS_WITH_VERTICAL: (verticalType, bqpId) => createEndpoint(`/policyentryfilter/getrelationshipmanagertype/${verticalType}/${bqpId}`),
    GET_RELATIONSHIP_MANAGER: (id) => `/createfilter/relationship_manager/${id}`,
    GET_POSP_TYPES: (verticalType, rmid) => createEndpoint(`/policyentryfilter/getposptype/${verticalType}/${rmid}`),
    GET_POSP: (id) => `/createfilter/getposp/${id}`,
    GET_REFER_TYPES: (verticalType, pospId) => createEndpoint(`/policyentryfilter/getrefertype/${verticalType}/${pospId}`),
    GET_MOTOR_EMPLOYEES: createEndpoint('/policyentryfilter/getemployee'),
    GET_CHEQUE_DATA: (chequeNo) => createEndpoint(`/policyentryfilter/getcheque/${chequeNo}`),
    GET_ALL_BQP: createEndpoint('/createfilter/getbqp'),
    GET_REPORTING_MANAGER: (id) =>createEndpoint( `/createfilter/reporting_manager/${id}`),
    GET_REPORTING_MANAGER_WITH_POSP: (id) => createEndpoint(`/createfilter/getreportingmanagerwithposp/${id}`),
  };
   export const DEPARTMENTS= {
    GET_DEPARTMENTS: createEndpoint('/departments'),
    CREATE_DEPARTMENT: createEndpoint('/departments'),
    DELETE_DEPARTMENT: (id) => createEndpoint(`/departments/${id}`),
    GET_DESIGNATIONS: createEndpoint('/designations'),
    CREATE_DESIGNATION: createEndpoint('/designations'),
    DELETE_DESIGNATION: (id) => createEndpoint(`/designations/${id}`),
  };

   export const ADDONS= {
    GET_ADDONS: createEndpoint('/addons'),
    CREATE_ADDON: createEndpoint('/addons'),
    DELETE_ADDON: (id) => createEndpoint(`/addons/${id}`),
  };
  export const CUSTOMERS= {
    GET_ALL_CUSTOMERS: createEndpoint('/Customer/getAllCustomer'),
    GET_CUSTOMER_BY_ID: (id) => createEndpoint(`/customer/${id}`),
    CREATE_CUSTOMER: createEndpoint('/customers'),
    UPDATE_CUSTOMER: (id) => createEndpoint(`/customer/${id}`),
    TOGGLE_CUSTOMER_STATUS: (id) => createEndpoint(`/customer/toggle/${id}`),
  };

   export const GROUPS= {
    GET_GROUPS: createEndpoint('/groups'),
    GET_GROUP_BY_ID: (id) => createEndpoint(`/groups/${id}`),
    CREATE_GROUP: createEndpoint('/groups'),
    UPDATE_GROUP: (id) => createEndpoint(`/groups/${id}`),
    DELETE_GROUP: (id) => createEndpoint(`/groups/${id}`),
    GET_SUBGROUPS: createEndpoint('/subgroups'),
    GET_SUBGROUP_BY_ID: (id) => createEndpoint(`/subgroups/${id}`),
    CREATE_SUBGROUP: createEndpoint('/subgroups'),
    UPDATE_SUBGROUP: (id) => createEndpoint(`/subgroups/${id}`),
    DELETE_SUBGROUP: (id) => createEndpoint(`/subgroups/${id}`,)
  };
   export const GROWTH_REPORTS= {
    GET_GROWTH_REPORTS: createEndpoint('/perfomancereport/growthreport'),
    GET_DEFAULT_GROWTH_REPORTS: createEndpoint('/perfomancereport/growthreport/'),
  };

  export const INSURERS= {
    // Insurer Branches
    GET_INSURER_BRANCHES: createEndpoint('/insurer-branches'),
    GET_INSURER_BRANCH_BY_ID: (id) => createEndpoint(`/insurer-branches/${id}`),
    GET_INSURER_BRANCHES_BY_TYPE: (type) => createEndpoint(`/insurer-branches/type/${type}`),
    GET_INSURER_BRANCHES_BY_COMPANY: (companyId) => createEndpoint(`/insurer-branches/company/${companyId}`),
    CREATE_INSURER_BRANCH: createEndpoint('/insurer-branches'),
    UPDATE_INSURER_BRANCH: (id) => createEndpoint(`/insurer-branches/${id}`),
    DELETE_INSURER_BRANCH: (id) => createEndpoint(`/insurer-branches/${id}`),
    
    // Insurer Branch Managers
    GET_INSURER_BRANCH_MANAGERS: createEndpoint('/insurer-branch-managers'),
    GET_INSURER_BRANCH_MANAGER_BY_ID: (branchId, index) => createEndpoint(`/insurer-branch-managers/${branchId}/${index}`),
    GET_INSURER_BRANCH_MANAGERS_BY_BRANCH: (branchId) => `/insurer-branch-managers/${branchId}`,
    CREATE_INSURER_BRANCH_MANAGER: (id) => createEndpoint(`/insurer-branch-managers/${id}`),
    UPDATE_INSURER_BRANCH_MANAGER: (id) => createEndpoint(`/insurer-branch-managers/${id}`),
    DELETE_INSURER_BRANCH_MANAGER: (id) => createEndpoint(`/insurer-branch-managers/${id}`),
    
    // Insurance Companies
    GET_INSURANCE_COMPANIES: createEndpoint('/insurance-companies'),
    GET_INSURANCE_COMPANY_BY_ID: (id) => createEndpoint(`/insurance-companies/${id}`),
    GET_INSURANCE_COMPANIES_BY_TYPE: (type) => createEndpoint(`/insurance-companies/type/${type}`),
    CREATE_INSURANCE_COMPANY: createEndpoint('/insurance-companies'),
    UPDATE_INSURANCE_COMPANY: (id) => createEndpoint(`/insurance-companies/${id}`),
    DELETE_INSURANCE_COMPANY: (id) => createEndpoint(`/insurance-companies/${id}`),
  };
  export const INVENTORY= {
    GET_INVENTORIES: createEndpoint('/inventory'),
    GET_INVENTORY_BY_ID: (id) => createEndpoint(`/inventory/${id}`),
    CREATE_INVENTORY: createEndpoint('/inventory'),
    UPDATE_INVENTORY: (id) => createEndpoint(`/inventory/${id}`),
    DELETE_INVENTORY: (id) => createEndpoint(`/inventory/${id}`),
  };

  export const  MISP= {
    GET_MISPS: createEndpoint('/misp/index'),
    GET_MISP_BY_ID: (id) => createEndpoint(`/misp/${id}`),
    CREATE_MISP: createEndpoint('/misp/register'),
    UPDATE_MISP: (id) => createEndpoint(`/misp/${id}`),
    DELETE_MISP: (id) => createEndpoint(`/misp/${id}`),
    GET_MISP_BY_BRANCH: (branchId) => createEndpoint(`/misp/branch/${branchId}`),
    CHANGE_MISP_PASSWORD: (id) => createEndpoint(`/misp/change-password/${id}`),
    TOGGLE_MISP_ACTIVE_STATUS: (id) => createEndpoint(`/misp/toggle-active/${id}`),
  };
  export const MOTOR= {
    FETCH_PREVIOUS_POLICY: (policyNo) => createEndpoint(`/motor-policies/previous_policy_no/${policyNo}`),
    CREATE_MOTOR_POLICY: createEndpoint('/motor-policies'),
  };

  export const OPERATION_ENTRY_REPORTS= {
    FETCH_WITH_FILTERS: (type, from, to) => createEndpoint(`/perfomancereport/opsreport/${type}/${from}/${to}`),
    FETCH_WITH_BRANCH: (type, from, to, branch) => createEndpoint(`/perfomancereport/opsreport/${type}/${from}/${to}/${branch}`),
  };

  export const  OPS_BUSINESS_REPORTS= {
    FETCH_OPS_BUSINESS_REPORTS: createEndpoint('/operationsreports/getopsbusinessreport'),
  };
  export const POLICY_REFER_BY= {
    FETCH_ALL: createEndpoint('/policy-ref-by'),
    REGISTER: createEndpoint('/policy-ref-by/register'),
    GET_BY_ID: (id) => createEndpoint(`/policy-ref-by/${id}`),
    UPDATE: (id) => createEndpoint(`/policy-ref-by/${id}`),
    TOGGLE_STATUS: (id) => createEndpoint(`/policy-ref-by/toggle/${id}`),
  };

  export const RIDERS= {
    FETCH_ALL: createEndpoint('/riders'),
    FETCH_BY_ID: (id) => createEndpoint(`/riders/${id}`),
    CREATE: createEndpoint('/riders'),
    UPDATE: (id) => createEndpoint(`/riders/${id}`),
    DELETE: (id) => createEndpoint(`/riders/${id}`),
  };
  export const SALES_PERSON= {
    FETCH_SUMMARY: createEndpoint('/perfomancereport/salespersonsummary'),
    FETCH_EMPLOYEES: createEndpoint('/createfilter/getsalesperson'),
  };
  export const SALES_SUMMARY= {
    FETCH_SUMMARY: createEndpoint('/perfomancereport/salessummary'),
  };

   export const ZONES= {
    FETCH_ZONES: createEndpoint('/zones'),
    ADD_ZONE: createEndpoint('/zones'),
    DELETE_ZONE: (id) => createEndpoint(`/zones/${id}`),
    
    FETCH_REGIONS: createEndpoint('/regions'),
    ADD_REGION: createEndpoint('/regions'),
    DELETE_REGION: (id) => createEndpoint(`/regions/${id}`),
  };
  export const ASSIGN_OFFICIAL_POSP= {
    FETCH_BRANCHES: createEndpoint('/employees/get/branch'),
    FETCH_BQP_BY_BRANCH: (branchId) => createEndpoint(`/employees/get/bqp/${branchId}`),
    FETCH_RELATIONSHIP_MANAGER_BY_BQP: (bqpId) => createEndpoint(`/employees/get/fetch_Relational_Manager/${bqpId}`),
    SUBMIT_HR_VERIFICATION: (id) => createEndpoint(`/posp/hr/hrverification/${id}`),
  }
// // Product Endpoints
// export const PRODUCT_ENDPOINTS = {
//   GET_PRODUCTS: createEndpoint('/products'),
//   GET_PRODUCT: (id) => createEndpoint(`/products/${id}`),
//   CREATE_PRODUCT: createEndpoint('/products'),
//   UPDATE_PRODUCT: (id) => createEndpoint(`/products/${id}`),
//   DELETE_PRODUCT: (id) => createEndpoint(`/products/${id}`),
//   SEARCH_PRODUCTS: createEndpoint('/products/search'),
//   GET_CATEGORIES: createEndpoint('/products/categories'),
//   GET_BRANDS: createEndpoint('/products/brands'),
//   UPLOAD_IMAGE: createEndpoint('/products/upload'),
//   GET_REVIEWS: (id) => createEndpoint(`/products/${id}/reviews`),
//   ADD_REVIEW: (id) => createEndpoint(`/products/${id}/reviews`),
// };

// // Order Endpoints
// export const ORDER_ENDPOINTS = {
//   GET_ORDERS: createEndpoint('/orders'),
//   GET_ORDER: (id) => createEndpoint(`/orders/${id}`),
//   CREATE_ORDER: createEndpoint('/orders'),
//   UPDATE_ORDER: (id) => createEndpoint(`/orders/${id}`),
//   CANCEL_ORDER: (id) => createEndpoint(`/orders/${id}/cancel`),
//   GET_ORDER_HISTORY: createEndpoint('/orders/history'),
//   GET_INVOICE: (id) => createEndpoint(`/orders/${id}/invoice`),
// };

// // Payment Endpoints
// export const PAYMENT_ENDPOINTS = {
//   CREATE_PAYMENT: createEndpoint('/payments/create'),
//   CONFIRM_PAYMENT: createEndpoint('/payments/confirm'),
//   GET_PAYMENT_METHODS: createEndpoint('/payments/methods'),
//   ADD_PAYMENT_METHOD: createEndpoint('/payments/methods'),
//   DELETE_PAYMENT_METHOD: (id) => createEndpoint(`/payments/methods/${id}`),
//   GET_TRANSACTIONS: createEndpoint('/payments/transactions'),
// };

// // File Endpoints
// export const FILE_ENDPOINTS = {
//   UPLOAD: createEndpoint('/files/upload'),
//   DELETE: (id) => createEndpoint(`/files/${id}`),
//   DOWNLOAD: (id) => createEndpoint(`/files/${id}/download`),
//   GET_FILES: createEndpoint('/files'),
// };

// // Notification Endpoints
// export const NOTIFICATION_ENDPOINTS = {
//   GET_NOTIFICATIONS: createEndpoint('/notifications'),
//   MARK_AS_READ: (id) => createEndpoint(`/notifications/${id}/read`),
//   MARK_ALL_READ: createEndpoint('/notifications/read-all'),
//   DELETE_NOTIFICATION: (id) => createEndpoint(`/notifications/${id}`),
//   GET_UNREAD_COUNT: createEndpoint('/notifications/unread-count'),
// };

// // Analytics Endpoints
// export const ANALYTICS_ENDPOINTS = {
//   GET_DASHBOARD: createEndpoint('/analytics/dashboard'),
//   GET_REPORTS: createEndpoint('/analytics/reports'),
//   GET_METRICS: createEndpoint('/analytics/metrics'),
//   EXPORT_DATA: createEndpoint('/analytics/export'),
// };

// // Settings Endpoints
// export const SETTINGS_ENDPOINTS = {
//   GET_SETTINGS: createEndpoint('/settings'),
//   UPDATE_SETTINGS: createEndpoint('/settings'),
//   GET_LOGS: createEndpoint('/settings/logs'),
//   CLEAR_LOGS: createEndpoint('/settings/logs/clear'),
// };

// Export all endpoints
export default {
  AUTH: AUTH_ENDPOINTS,
  EMPLOYEE: EMPLOYEE_ENDPOINTS,
  STATES: STATES_ENDPOINTS,
  OPERATIONS: OPERATIONS,
  DEPARTMENTS:DEPARTMENTS,
  ADDONS:ADDONS,
  CUSTOMERS:CUSTOMERS,
  GROUPS:GROUPS,
  GROWTH_REPORTS:GROWTH_REPORTS,
  INSURERS: INSURERS,
  INVENTORY:INVENTORY,
  MISP:MISP,
  MOTOR:MOTOR,
  OPERATION_ENTRY_REPORTS:OPERATION_ENTRY_REPORTS,
  OPS_BUSINESS_REPORTS:OPS_BUSINESS_REPORTS,
  POLICY_REFER_BY:POLICY_REFER_BY,
  RIDERS:RIDERS,
  SALES_PERSON:SALES_PERSON,
  SALES_SUMMARY:SALES_SUMMARY,
  ZONES:ZONES,
  ASSIGN_OFFICIAL_POSP:ASSIGN_OFFICIAL_POSP,
  FUELS:FUELS,
  BRANCHES:BRANCHES,
  // PRODUCT: PRODUCT_ENDPOINTS,
  // ORDER: ORDER_ENDPOINTS,
  // PAYMENT: PAYMENT_ENDPOINTS,
  // FILE: FILE_ENDPOINTS,
  // NOTIFICATION: NOTIFICATION_ENDPOINTS,
  // ANALYTICS: ANALYTICS_ENDPOINTS,
  // SETTINGS: SETTINGS_ENDPOINTS,
};




// export const API_CONFIG = {
//   BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
//   REQUEST_TIMEOUT: 30000,
//   ENABLE_LOGGING: process.env.NODE_ENV === 'development',
// };

// export const ENDPOINTS = {
//   AUTH: {
//     LOGIN: '/login',
//     LOGOUT: '/logout',
//     FORGOT_PASSWORD: '/forgotPassword',
//     RESET_PASSWORD: '/resetPassword',
//   },
//   POSP: {
//     REGISTER: '/posp/register',
//     RESEND_VERIFICATION: '/posp/resend-verification-email',
//     UPDATE_DOCUMENTS: '/posp/update/documents',
//     GET_POSP_BY_ID: '/posp/getPospDataByID',
//     GET_TRAINING: '/posp/get_training',
//     UPDATE_TRAINING: '/posp/updateTrainingHours',
//     GET_EXAM_QUESTIONS: '/posp/getExamQuestion',
//     SUBMIT_EXAM: '/posp/exam-responses',
//     GET_ALL_POSP: '/posp/getAllPospData',
//     HR_UPDATE_DOCUMENTS: '/posp/hr/update/documentsPosp',
//     TOGGLE_ACTIVE: '/posp/hr/toggle-active',
//     SEND_EMAIL: '/posp/hr/send_email_to_posp',
//     TOGGLE_DOCS_VERIFICATION: '/posp/hr/toggle-Documents-verification',
//     TOGGLE_UPDATE_DOCS: '/posp/hr/posp/toggle_can_update_documents',
//   },
// };