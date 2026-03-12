const BASE = 'http://localhost:3000/api';

/**
 * Function: apiFetch
 * Description: A helper function to perform fetch requests with credentials and common headers.
 * Why: To centralize API request logic and ensure consistent communication with the backend.
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

// ═══════════════════════════════════════════════════════════════════════════════
//  ADMIN TASK API CALLS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Function: apiCreateTask
 * Description: Creates a new standalone task.
 * Why: To allow admins to assign one-off tasks to employees outside of specific projects.
 * @param {Object} body - Task details
 */
export async function apiCreateTask(body) {
  return apiFetch(`${BASE}/tasks`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Function: apiGetAllTasks
 * Description: Retrieves all standalone tasks in the system.
 * Why: For admins to monitor all general tasks across the portal.
 */
export async function apiGetAllTasks() {
  return apiFetch(`${BASE}/tasks/all`);
}

/**
 * Function: apiDeleteTask
 * Description: Deletes a standalone task.
 * Why: To remove obsolete or incorrect tasks.
 * @param {string} id - Task ID
 */
export async function apiDeleteTask(id) {
  return apiFetch(`${BASE}/tasks/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Function: apiUpdateTaskInfo
 * Description: Updates the core information of a standalone task.
 * Why: To modify task details like title, description, or deadline.
 * @param {string} id - Task ID
 * @param {Object} body - Updated task data
 */
export async function apiUpdateTaskInfo(id, body) {
  return apiFetch(`${BASE}/tasks/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  EMPLOYEE / COMMON TASK API CALLS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Function: apiGetMyTasks
 * Description: Retrieves standalone tasks assigned to the logged-in employee.
 * Why: For employees to see their personal task list.
 */
export async function apiGetMyTasks() {
  return apiFetch(`${BASE}/tasks/my`);
}

/**
 * Function: apiUpdateTaskStatus
 * Description: Updates the status of a standalone task (e.g., Pending to Completed).
 * Why: The primary way for employees to update their task progress.
 * @param {string} id - Task ID
 * @param {string} status - New status
 */
export async function apiUpdateTaskStatus(id, status) {
  return apiFetch(`${BASE}/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}
