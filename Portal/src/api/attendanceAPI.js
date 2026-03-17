/**
 * File: attendanceAPI.js
 * Description: API client functions for all attendance-related operations, covering both employee self-service and admin management endpoints.
 * Why: To centralize all attendance HTTP calls, ensure consistent credential handling, and decouple UI components from raw fetch logic.
 */

const BASE = 'http://localhost:3000/api';

/**
 * Function: apiFetch
 * Description: A helper function to perform fetch requests with credentials and common headers.
 * Why: To centralize API request logic, handle credentials (cookies), and provide consistent error handling.
 */
async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (res.status === 401) {
    window.dispatchEvent(new CustomEvent('unauthorized-access'));
  }

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.response = { data };
    throw err;
  }

  return data;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  EMPLOYEE API CALLS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Function: apiCheckIn
 * Description: Sends a POST request to clock in an employee.
 * Why: To record the start of a work session for an employee.
 */
export async function apiCheckIn(body = {}) {
  return apiFetch(`${BASE}/attendance/checkin`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiCheckOut
 * Description: Sends a POST request to clock out an employee.
 * Why: To record the end of a work session for an employee.
 */
export async function apiCheckOut() {
  return apiFetch(`${BASE}/attendance/checkout`, { method: 'POST' });
}

/**
 * Function: apiGetTodayStatus
 * Description: Retrieves the current attendance status for the logged-in employee today.
 * Why: To display real-time clock-in/out status and session info on the dashboard.
 */
export async function apiGetTodayStatus() {
  return apiFetch(`${BASE}/attendance/today-status`);
}

/**
 * Function: apiGetMyAttendance
 * Description: Fetches attendance records for the logged-in employee based on filters.
 * Why: To allow employees to view their own attendance history.
 * @param {Object} filters - optional: { date: 'YYYY-MM-DD' } or { month: 'YYYY-MM' }
 */
export async function apiGetMyAttendance(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/attendance/my${params ? '?' + params : ''}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ADMIN API CALLS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Function: apiGetEmployees
 * Description: Retrieves a list of all employees for administrative use.
 * Why: To populate employee selection dropdowns and management lists.
 */
export async function apiGetEmployees() {
  return apiFetch(`${BASE}/admin/employees`);
}

/**
 * Function: apiGetTodaySummary
 * Description: Fetches a summary of today's attendance stats (present, absent, etc.).
 * Why: To provide admins with a quick overview of today's workforce status.
 */
export async function apiGetTodaySummary() {
  return apiFetch(`${BASE}/admin/attendance/today-summary`);
}

/**
 * Function: apiGetAllAttendance
 * Description: Retrieves all attendance records based on filters (date, month, employeeId).
 * Why: For admins to monitor and manage attendance across the organization.
 */
export async function apiGetAllAttendance(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/admin/attendance${params ? '?' + params : ''}`);
}

/**
 * Function: apiGetEmployeeAttendance
 * Description: Fetches attendance records for a specific employee.
 * Why: To view detailed attendance history for a single employee.
 */
export async function apiGetEmployeeAttendance(id, filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/admin/attendance/employee/${id}${params ? '?' + params : ''}`);
}

/**
 * Function: apiMarkAttendance
 * Description: Manually marks attendance for an employee (Admin only).
 * Why: To allow admins to correct or manually enter attendance data.
 */
export async function apiMarkAttendance(body) {
  return apiFetch(`${BASE}/admin/attendance/mark`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiUpdateAttendance
 * Description: Updates an existing attendance record.
 * Why: To modify attendance details if errors were made.
 */
export async function apiUpdateAttendance(id, body) {
  return apiFetch(`${BASE}/admin/attendance/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiDeleteAttendance
 * Description: Deletes an attendance record.
 * Why: To remove incorrect or duplicate attendance data.
 */
export async function apiDeleteAttendance(id) {
  return apiFetch(`${BASE}/admin/attendance/${id}`, { method: 'DELETE' });
}