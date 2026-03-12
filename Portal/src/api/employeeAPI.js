/**
 * File: employeeAPI.js
 * Description: API client functions for administrative employee management operations.
 * Why: To encapsulate all employee CRUD logic, handle credentials, and provide a clean interface for the management UI.
 */

const BASE = 'http://localhost:3000/api/admin';

/**
 * Function: apiFetch
 * Description: A helper function to perform fetch requests with credentials and common headers.
 */
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

/**
 * Function: apiGetEmployees
 * Description: Retrieves list of all users from the backend.
 */
export async function apiGetEmployees() {
  return apiFetch(`${BASE}/employees`);
}

/**
 * Function: apiAddEmployee
 * Description: Creates a new employee or admin account.
 */
export async function apiAddEmployee(body) {
  return apiFetch(`${BASE}/employees`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiUpdateEmployee
 * Description: Updates an existing employee's details.
 */
export async function apiUpdateEmployee(id, body) {
  return apiFetch(`${BASE}/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiDeleteEmployee
 * Description: Permanently removes an employee account.
 */
export async function apiDeleteEmployee(id) {
  return apiFetch(`${BASE}/employees/${id}`, { method: 'DELETE' });
}
