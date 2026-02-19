// Central API configuration and helpers
// Use VITE_API_BASE_URL in .env (e.g. http://localhost:5008/api/v1) if backend runs on a different port
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

// Section base URLs (kept for convenience / backward compat)
export const BASE_URL_AUTH = `${BASE_URL}/auth`;
export const BASE_URL_STUDENTS = `${BASE_URL}/students`;
export const BASE_URL_ADMINS = `${BASE_URL}/admin`;
export const BASE_URL_EVALUATORS = `${BASE_URL}/evaluators`;
export const BASE_URL_PAYMENTS = `${BASE_URL}/payments`;

// ---- Auth endpoints ----
export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
  CHANGE_PASSWORD: "/auth/change-password",
};

// ---- Student endpoints ----
export const STUDENT_ENDPOINTS = {
  PACKAGES: "/students/packages",
  PROFILE: "/students/profile",
  STATS: "/students/stats",
  PURCHASES: "/students/purchases",
  EXAMS: "/students/exams",
  EXAM_DETAILS: (examId) => `/students/exams/${examId}`,
  LEADERBOARD: (examId) => `/students/exams/${examId}/leaderboard`,
  START_EXAM: (examId) => `/students/exams/${examId}/start`,
  EXAM_ATTEMPT: (attemptId) => `/students/exams/attempts/${attemptId}`,
  SUBMIT_ANSWER: (attemptId) => `/students/exams/attempts/${attemptId}/answer`,
  SUBMIT_MCQ: (attemptId) => `/students/exams/attempts/${attemptId}/submit-mcq`,
  UPLOAD_PDF: (attemptId) => `/students/exams/attempts/${attemptId}/upload-pdf`,
  EXTEND_TIME: (attemptId) => `/students/exams/attempts/${attemptId}/extend`,
  FORFEIT_EXAM: (attemptId) => `/students/exams/attempts/${attemptId}/forfeit`,
};

// ---- Admin endpoints ----
export const ADMIN_ENDPOINTS = {
  USERS: "/admin/users",
  USER: (userId) => `/admin/users/${userId}`,
  EVALUATORS: "/admin/evaluators",

  PACKAGES: "/admin/packages",
  PACKAGE: (packageId) => `/admin/packages/${packageId}`,
  PACKAGE_ARCHIVE: (packageId) => `/admin/packages/${packageId}/archive`,

  TOPICS: "/admin/topics",
  TOPIC: (topicId) => `/admin/topics/${topicId}`,

  EXAMS_MCQ: "/admin/exams/mcq",
  EXAMS_PDF: "/admin/exams/pdf",
  EXAM: (examId) => `/admin/exams/${examId}`,

  ASSIGNMENTS_PENDING: "/admin/assignments/pending",
  ASSIGNMENTS: "/admin/assignments",
  ASSIGNMENT_REASSIGN: (assignmentId) =>
    `/admin/assignments/${assignmentId}/reassign`,

  ANALYTICS_DASHBOARD: "/admin/analytics/dashboard",
};

// ---- Evaluator endpoints ----
export const EVALUATOR_ENDPOINTS = {
  ASSIGNMENTS: "/evaluators/assignments",
  ACCEPT_ASSIGNMENT: (assignmentId) =>
    `/evaluators/assignments/${assignmentId}/accept`,
  REJECT_ASSIGNMENT: (assignmentId) =>
    `/evaluators/assignments/${assignmentId}/reject`,
  SUBMIT_EVALUATION: (assignmentId) =>
    `/evaluators/assignments/${assignmentId}/submit`,
};

// ---- Payment endpoints ----
export const PAYMENT_ENDPOINTS = {
  CREATE_ORDER: "/payments/create-order",
  VERIFY: "/payments/verify",
  RETRY_PAYMENT: "/payments/retry",
  WEBHOOK: "/payments/webhook",
};

/**
 * Generic JSON fetch helper for authenticated requests
 * - `pathOrUrl` can be full URL or relative path (starting with '/')
 * - Adds Content-Type and Authorization headers
 * - Parses JSON and throws on !success
 */
export const authedJsonFetch = async (pathOrUrl, accessToken, options = {}) => {
  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${BASE_URL}${pathOrUrl}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data?.message || data?.error || "Request failed");
  }

  return data.data;
};


