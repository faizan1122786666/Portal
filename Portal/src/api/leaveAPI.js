// ── Base URL ──────────────────────────────────────────────────────────────────
const BASE = 'http://localhost:3000/api';

// ── Helper: fetch with credentials ────────────────────────────────────────────
async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

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
 * POST /api/leave/apply
 * Submit a new leave request.
 * @param {Object} body - { leaveType, startDate, endDate, reason }
 *   leaveType: 'Sick Leave' | 'Annual Leave' | 'Personal Leave' |
 *              'Emergency Leave' | 'Maternity Leave' | 'Paternity Leave' | 'Unpaid Leave'
 *   startDate / endDate: 'YYYY-MM-DD'
 */
export async function apiApplyLeave(body) {
  return apiFetch(`${BASE}/leave/apply`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * GET /api/leave/my
 * Get the logged-in employee's own leave history.
 * @param {Object} filters - optional: { status: 'Pending'|'Approved'|'Rejected', month: 'YYYY-MM' }
 */
export async function apiGetMyLeaves(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/leave/my${params ? '?' + params : ''}`);
}

/**
 * PUT /api/leave/:id
 * Edit a PENDING leave request (employee only).
 * @param {string} id   - leave record _id
 * @param {Object} body - { leaveType?, startDate?, endDate?, reason? }
 */
export async function apiUpdateMyLeave(id, body) {
  return apiFetch(`${BASE}/leave/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE /api/leave/:id
 * Cancel a PENDING leave request (employee only).
 * @param {string} id - leave record _id
 */
export async function apiDeleteMyLeave(id) {
  return apiFetch(`${BASE}/leave/${id}`, { method: 'DELETE' });
}


// ═══════════════════════════════════════════════════════════════════════════════
//  ADMIN API CALLS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * GET /api/admin/leave/summary
 * Dashboard stats: { total, pending, approved, rejected }
 */
export async function apiGetLeaveSummary() {
  return apiFetch(`${BASE}/admin/leave/summary`);
}

/**
 * GET /api/admin/leave
 * All leave requests across all employees.
 * @param {Object} filters - optional: { status, employeeId, month: 'YYYY-MM' }
 * Returns: { leaves: [...], summary: { total, pending, approved, rejected } }
 * Each leave has employeeId populated with { name, email, department, ... }
 */
export async function apiGetAllLeaves(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/admin/leave${params ? '?' + params : ''}`);
}

/**
 * GET /api/admin/leave/employee/:id
 * Full leave history for one specific employee.
 * @param {string} id       - employee user _id
 * @param {Object} filters  - optional: { month: 'YYYY-MM' }
 */
export async function apiGetEmployeeLeaves(id, filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/admin/leave/employee/${id}${params ? '?' + params : ''}`);
}

/**
 * PUT /api/admin/leave/:id/review
 * Approve or reject a leave request.
 * @param {string} id   - leave record _id
 * @param {Object} body - { status: 'Approved'|'Rejected', adminComment?: string }
 */
export async function apiReviewLeave(id, body) {
  return apiFetch(`${BASE}/admin/leave/${id}/review`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * PUT /api/admin/leave/:id
 * Full admin edit of any leave record.
 * @param {string} id   - leave record _id
 * @param {Object} body - { status?, adminComment?, leaveType?, startDate?, endDate?, reason? }
 */
export async function apiAdminUpdateLeave(id, body) {
  return apiFetch(`${BASE}/admin/leave/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE /api/admin/leave/:id
 * Admin permanently deletes a leave record.
 * @param {string} id - leave record _id
 */
export async function apiAdminDeleteLeave(id) {
  return apiFetch(`${BASE}/admin/leave/${id}`, { method: 'DELETE' });
}