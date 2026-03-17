// ── Base URL ──────────────────────────────────────────────────────────────────
const BASE = 'http://localhost:3000/api';

/**
 * Function: apiFetch
 * Description: A helper function to perform fetch requests with credentials and common headers.
 * Why: To centralize API request logic, handle credentials (cookies), and provide consistent error handling for leave-related operations.
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
 * Function: apiApplyLeave
 * Description: Submits a new leave request for the logged-in employee.
 * Why: To allow employees to request time off from work.
 * @param {Object} body - { leaveType, startDate, endDate, reason }
 */
export async function apiApplyLeave(body) {
  return apiFetch(`${BASE}/leave/apply`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiGetMyLeaves
 * Description: Retrieves the leave history for the logged-in employee.
 * Why: To allow employees to track the status of their leave requests.
 * @param {Object} filters - optional: { status, month }
 */
export async function apiGetMyLeaves(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/leave/my${params ? '?' + params : ''}`);
}

/**
 * Function: apiUpdateMyLeave
 * Description: Updates a pending leave request for the logged-in employee.
 * Why: To allow employees to modify their leave requests if needed before they are reviewed.
 * @param {string} id - leave record _id
 * @param {Object} body - Updated leave details
 */
export async function apiUpdateMyLeave(id, body) {
  return apiFetch(`${BASE}/leave/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiDeleteMyLeave
 * Description: Cancels a pending leave request for the logged-in employee.
 * Why: To allow employees to withdraw their leave requests.
 * @param {string} id - leave record _id
 */
export async function apiDeleteMyLeave(id) {
  return apiFetch(`${BASE}/leave/${id}`, { method: 'DELETE' });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ADMIN API CALLS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Function: apiGetLeaveSummary
 * Description: Fetches a summary of leave requests (total, pending, etc.) for admins.
 * Why: To provide admins with an overview of leave management status.
 */
export async function apiGetLeaveSummary() {
  return apiFetch(`${BASE}/admin/leave/summary`);
}

/**
 * Function: apiGetAllLeaves
 * Description: Retrieves all leave requests across the entire organization.
 * Why: For admins to review and manage all employee leave requests.
 * @param {Object} filters - optional: { status, employeeId, month }
 */
export async function apiGetAllLeaves(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/admin/leave${params ? '?' + params : ''}`);
}

/**
 * Function: apiGetEmployeeLeaves
 * Description: Fetches the full leave history for a specific employee.
 * Why: To allow admins to view the leave record of a particular individual.
 * @param {string} id - employee user _id
 * @param {Object} filters - optional filters
 */
export async function apiGetEmployeeLeaves(id, filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/admin/leave/employee/${id}${params ? '?' + params : ''}`);
}

/**
 * Function: apiReviewLeave
 * Description: Approves or rejects a leave request.
 * Why: The primary mechanism for admins to process leave applications.
 * @param {string} id - leave record _id
 * @param {Object} body - { status, adminComment }
 */
export async function apiReviewLeave(id, body) {
  return apiFetch(`${BASE}/admin/leave/${id}/review`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiAdminUpdateLeave
 * Description: Allows admins to force-update any leave record.
 * Why: To provide full administrative control over leave data.
 * @param {string} id - leave record _id
 * @param {Object} body - fields to update
 */
export async function apiAdminUpdateLeave(id, body) {
  return apiFetch(`${BASE}/admin/leave/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiAdminDeleteLeave
 * Description: Permanently deletes a leave record (Admin only).
 * Why: To remove incorrect or erroneous leave data from the system.
 * @param {string} id - leave record _id
 */
export async function apiAdminDeleteLeave(id) {
  return apiFetch(`${BASE}/admin/leave/${id}`, { method: 'DELETE' });
}