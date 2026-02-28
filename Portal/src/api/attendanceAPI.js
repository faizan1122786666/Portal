// // Base URL - change this if your backend runs on a different port
// const BASE_URL = 'http://localhost:3000/api';

// // ── Employee Attendance API ───────────────────────────────────────────────────

// export async function apiCheckIn() {
//   const res = await fetch(`${BASE_URL}/attendance/checkin`, {
//     method: 'POST',
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiCheckOut() {
//   const res = await fetch(`${BASE_URL}/attendance/checkout`, {
//     method: 'POST',
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetTodayStatus() {
//   const res = await fetch(`${BASE_URL}/attendance/today-status`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetMyAttendance(filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   const res = await fetch(`${BASE_URL}/attendance/my${params ? `?${params}` : ''}`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// // ── Admin Attendance API ──────────────────────────────────────────────────────

// export async function apiGetTodaySummary() {
//   const res = await fetch(`${BASE_URL}/admin/attendance/today-summary`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetAllAttendance(filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   const res = await fetch(`${BASE_URL}/admin/attendance${params ? `?${params}` : ''}`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetEmployeeAttendance(id, filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   const res = await fetch(`${BASE_URL}/admin/attendance/employee/${id}${params ? `?${params}` : ''}`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetEmployees() {
//   const res = await fetch(`${BASE_URL}/admin/employees`, {
//     credentials: 'include',
//   });
//   return res.json();
// }













// // Base URL - change this if your backend runs on a different port
// const BASE_URL = 'http://localhost:3000/api';

// // ── Employee Attendance API ───────────────────────────────────────────────────

// export async function apiCheckIn() {
//   const res = await fetch(`${BASE_URL}/attendance/checkin`, {
//     method: 'POST',
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiCheckOut() {
//   const res = await fetch(`${BASE_URL}/attendance/checkout`, {
//     method: 'POST',
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetTodayStatus() {
//   const res = await fetch(`${BASE_URL}/attendance/today-status`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetMyAttendance(filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   const res = await fetch(`${BASE_URL}/attendance/my${params ? `?${params}` : ''}`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// // ── Admin Attendance API ──────────────────────────────────────────────────────

// export async function apiGetTodaySummary() {
//   const res = await fetch(`${BASE_URL}/admin/attendance/today-summary`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetAllAttendance(filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   const res = await fetch(`${BASE_URL}/admin/attendance${params ? `?${params}` : ''}`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetEmployeeAttendance(id, filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   const res = await fetch(`${BASE_URL}/admin/attendance/employee/${id}${params ? `?${params}` : ''}`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// export async function apiGetEmployees() {
//   const res = await fetch(`${BASE_URL}/admin/employees`, {
//     credentials: 'include',
//   });
//   return res.json();
// }

// // ── NEW: Admin manually mark attendance ──────────────────────────────────────
// // Body: { employeeId, date, status, checkIn?, checkOut? }
// export async function apiMarkAttendance(data) {
//   const res = await fetch(`${BASE_URL}/admin/attendance/mark`, {
//     method: 'POST',
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }









// // ── Base URL ──────────────────────────────────────────────────────────────────
// const BASE = 'http://localhost:5000/api';

// // ── Helper: fetch with credentials (sends the JWT cookie) ─────────────────────
// async function apiFetch(url, options = {}) {
//   const res = await fetch(url, {
//     credentials: 'include',
//     headers: { 'Content-Type': 'application/json', ...options.headers },
//     ...options,
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     const err = new Error(data.message || 'Request failed');
//     err.response = { data };
//     throw err;
//   }

//   return data;
// }


// // ═══════════════════════════════════════════════════════════════════════════════
// //  EMPLOYEE API CALLS
// // ═══════════════════════════════════════════════════════════════════════════════

// /**
//  * POST /api/attendance/checkin
//  * @param {Object} body  - e.g. { shift: 'AM' | 'PM' | 'Night' }
//  *                         shift is REQUIRED on the first check-in of the day.
//  *                         For subsequent sessions (same day), it can be omitted.
//  */
// export async function apiCheckIn(body = {}) {
//   return apiFetch(`${BASE}/attendance/checkin`, {
//     method: 'POST',
//     body: JSON.stringify(body),
//   });
// }

// /**
//  * POST /api/attendance/checkout
//  */
// export async function apiCheckOut() {
//   return apiFetch(`${BASE}/attendance/checkout`, { method: 'POST' });
// }

// /**
//  * GET /api/attendance/today-status
//  * Returns: { date, hasRecord, shift, sessions, totalWorkHours, status,
//  *            currentCheckIn, canCheckIn, canCheckOut }
//  */
// export async function apiGetTodayStatus() {
//   return apiFetch(`${BASE}/attendance/today-status`);
// }

// /**
//  * GET /api/attendance/my
//  * @param {Object} filters  - optional: { date: 'YYYY-MM-DD' } or { month: 'YYYY-MM' }
//  */
// export async function apiGetMyAttendance(filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   return apiFetch(`${BASE}/attendance/my${params ? '?' + params : ''}`);
// }


// // ═══════════════════════════════════════════════════════════════════════════════
// //  ADMIN API CALLS
// // ═══════════════════════════════════════════════════════════════════════════════

// /**
//  * GET /api/admin/attendance/today-summary
//  */
// export async function apiGetTodaySummary() {
//   return apiFetch(`${BASE}/admin/attendance/today-summary`);
// }

// /**
//  * GET /api/admin/attendance
//  * @param {Object} filters - optional: { date, month, employeeId }
//  */
// export async function apiGetAllAttendance(filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   return apiFetch(`${BASE}/admin/attendance${params ? '?' + params : ''}`);
// }

// /**
//  * GET /api/admin/attendance/employee/:id
//  */
// export async function apiGetEmployeeAttendance(id, filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   return apiFetch(`${BASE}/admin/attendance/employee/${id}${params ? '?' + params : ''}`);
// }

// /**
//  * POST /api/admin/attendance/mark
//  */
// export async function apiMarkAttendance(body) {
//   return apiFetch(`${BASE}/admin/attendance/mark`, {
//     method: 'POST',
//     body: JSON.stringify(body),
//   });
// }

// /**
//  * PUT /api/admin/attendance/:id
//  */
// export async function apiUpdateAttendance(id, body) {
//   return apiFetch(`${BASE}/admin/attendance/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(body),
//   });
// }

// /**
//  * DELETE /api/admin/attendance/:id
//  */
// export async function apiDeleteAttendance(id) {
//   return apiFetch(`${BASE}/admin/attendance/${id}`, { method: 'DELETE' });
// }


// ── Base URL ──────────────────────────────────────────────────────────────────
const BASE = 'http://localhost:3000/api';

// ── Helper: fetch with credentials (sends the JWT cookie) ─────────────────────
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
 * POST /api/attendance/checkin
 * @param {Object} body  - e.g. { shift: 'AM' | 'PM' | 'Night' }
 *                         shift is REQUIRED on the first check-in of the day.
 *                         For subsequent sessions (same day), it can be omitted.
 */
export async function apiCheckIn(body = {}) {
  return apiFetch(`${BASE}/attendance/checkin`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * POST /api/attendance/checkout
 */
export async function apiCheckOut() {
  return apiFetch(`${BASE}/attendance/checkout`, { method: 'POST' });
}

/**
 * GET /api/attendance/today-status
 * Returns: { date, hasRecord, shift, sessions, totalWorkHours, status,
 *            currentCheckIn, canCheckIn, canCheckOut }
 */
export async function apiGetTodayStatus() {
  return apiFetch(`${BASE}/attendance/today-status`);
}

/**
 * GET /api/attendance/my
 * @param {Object} filters  - optional: { date: 'YYYY-MM-DD' } or { month: 'YYYY-MM' }
 */
export async function apiGetMyAttendance(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/attendance/my${params ? '?' + params : ''}`);
}


// ═══════════════════════════════════════════════════════════════════════════════
//  ADMIN API CALLS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * GET /api/admin/employees
 */
export async function apiGetEmployees() {
  return apiFetch(`${BASE}/admin/employees`);
}

/**
 * GET /api/admin/attendance/today-summary
 */
export async function apiGetTodaySummary() {
  return apiFetch(`${BASE}/admin/attendance/today-summary`);
}

/**
 * GET /api/admin/attendance
 * @param {Object} filters - optional: { date, month, employeeId }
 */
export async function apiGetAllAttendance(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/admin/attendance${params ? '?' + params : ''}`);
}

/**
 * GET /api/admin/attendance/employee/:id
 */
export async function apiGetEmployeeAttendance(id, filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`${BASE}/admin/attendance/employee/${id}${params ? '?' + params : ''}`);
}

/**
 * POST /api/admin/attendance/mark
 */
export async function apiMarkAttendance(body) {
  return apiFetch(`${BASE}/admin/attendance/mark`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * PUT /api/admin/attendance/:id
 */
export async function apiUpdateAttendance(id, body) {
  return apiFetch(`${BASE}/admin/attendance/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE /api/admin/attendance/:id
 */
export async function apiDeleteAttendance(id) {
  return apiFetch(`${BASE}/admin/attendance/${id}`, { method: 'DELETE' });
}