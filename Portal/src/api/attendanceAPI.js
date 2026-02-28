// Base URL - change this if your backend runs on a different port
const BASE_URL = 'http://localhost:3000/api';

// ── Employee Attendance API ───────────────────────────────────────────────────

export async function apiCheckIn() {
  const res = await fetch(`${BASE_URL}/attendance/checkin`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.json();
}

export async function apiCheckOut() {
  const res = await fetch(`${BASE_URL}/attendance/checkout`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.json();
}

export async function apiGetTodayStatus() {
  const res = await fetch(`${BASE_URL}/attendance/today-status`, {
    credentials: 'include',
  });
  return res.json();
}

export async function apiGetMyAttendance(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/attendance/my${params ? `?${params}` : ''}`, {
    credentials: 'include',
  });
  return res.json();
}

// ── Admin Attendance API ──────────────────────────────────────────────────────

export async function apiGetTodaySummary() {
  const res = await fetch(`${BASE_URL}/admin/attendance/today-summary`, {
    credentials: 'include',
  });
  return res.json();
}

export async function apiGetAllAttendance(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/admin/attendance${params ? `?${params}` : ''}`, {
    credentials: 'include',
  });
  return res.json();
}

export async function apiGetEmployeeAttendance(id, filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/admin/attendance/employee/${id}${params ? `?${params}` : ''}`, {
    credentials: 'include',
  });
  return res.json();
}

export async function apiGetEmployees() {
  const res = await fetch(`${BASE_URL}/admin/employees`, {
    credentials: 'include',
  });
  return res.json();
}