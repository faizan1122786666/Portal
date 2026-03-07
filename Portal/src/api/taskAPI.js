const BASE = 'http://localhost:3000/api';

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
//  ADMIN TASK API CALLS
// ═══════════════════════════════════════════════════════════════════════════════

export async function apiCreateTask(body) {
  return apiFetch(`${BASE}/tasks`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function apiGetAllTasks() {
  return apiFetch(`${BASE}/tasks/all`);
}

export async function apiDeleteTask(id) {
  return apiFetch(`${BASE}/tasks/${id}`, {
    method: 'DELETE',
  });
}

export async function apiUpdateTaskInfo(id, body) {
  return apiFetch(`${BASE}/tasks/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  EMPLOYEE / COMMON TASK API CALLS
// ═══════════════════════════════════════════════════════════════════════════════

export async function apiGetMyTasks() {
  return apiFetch(`${BASE}/tasks/my`);
}

export async function apiUpdateTaskStatus(id, status) {
  return apiFetch(`${BASE}/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}
