// API Configuration
const API_CONFIG = {
  // Django Backend URL
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8000",

  // API Endpoints
  ENDPOINTS: {
    // Authentication
    LOGIN: "/api/auth/login/",
    VERIFY: "/api/auth/verify/",
    LOGOUT: "/api/auth/logout/",
    CURRENT_USER: "/api/auth/me/",

    // Students
    STUDENTS: "/api/students/",
    STUDENT_STATS: "/api/students/stats/",
    STUDENT_REMARKS: "/api/students/remarks/",

    // Universities
    UNIVERSITIES: "/api/universities/",

    // Applications
    APPLICATIONS: "/api/applications/",

    // Employees
    EMPLOYEES: "/api/employees/",
  },
};

// Helper function to build full URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export individual endpoints
export const API_ENDPOINTS = {
  LOGIN: buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN),
  VERIFY: buildApiUrl(API_CONFIG.ENDPOINTS.VERIFY),
  LOGOUT: buildApiUrl(API_CONFIG.ENDPOINTS.LOGOUT),
  CURRENT_USER: buildApiUrl(API_CONFIG.ENDPOINTS.CURRENT_USER),
  STUDENTS: buildApiUrl(API_CONFIG.ENDPOINTS.STUDENTS),
  STUDENT_STATS: buildApiUrl(API_CONFIG.ENDPOINTS.STUDENT_STATS),
  STUDENT_REMARKS: buildApiUrl(API_CONFIG.ENDPOINTS.STUDENT_REMARKS),
  UNIVERSITIES: buildApiUrl(API_CONFIG.ENDPOINTS.UNIVERSITIES),
  APPLICATIONS: buildApiUrl(API_CONFIG.ENDPOINTS.APPLICATIONS),
  EMPLOYEES: buildApiUrl(API_CONFIG.ENDPOINTS.EMPLOYEES),
};

export default API_CONFIG;
