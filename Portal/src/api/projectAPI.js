import axios from 'axios';

/**
 * axios instance: api
 * Description: Configured axios instance for project-related API calls.
 * Why: To provide a consistent base URL and handle credentials for all project and project-task operations.
 */
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// ── Projects ──────────────────────────────────────────────────────────────────

/**
 * Function: apiGetAllProjects
 * Description: Fetches all projects available in the system.
 * Why: To display a list of all projects for admins or managers.
 */
export const apiGetAllProjects = async () => {
  const res = await api.get('/projects');
  return res.data;
};

/**
 * Function: apiGetMyProjects
 * Description: Retrieves projects assigned to or created by the logged-in employee.
 * Why: To show employees only the projects relevant to them.
 */
export const apiGetMyProjects = async () => {
  const res = await api.get('/projects/my');
  return res.data;
};

/**
 * Function: apiCreateProject
 * Description: Creates a new project in the system.
 * Why: To allow managers/admins to initiate new work initiatives.
 * @param {Object} data - Project details
 */
export const apiCreateProject = async (data) => {
  const res = await api.post('/projects', data);
  return res.data;
};

/**
 * Function: apiUpdateProject
 * Description: Updates an existing project's details.
 * Why: To reflect changes in project scope, timelines, or status.
 * @param {string} id - Project ID
 * @param {Object} data - Updated project data
 */
export const apiUpdateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

/**
 * Function: apiDeleteProject
 * Description: Permanently removes a project from the system.
 * Why: To clean up cancelled or erroneous project records.
 * @param {string} id - Project ID
 */
export const apiDeleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

/**
 * Function: apiGetProjectById
 * Description: Fetches detailed information for a single specific project.
 * Why: To view project specifics and its associated tasks.
 * @param {string} id - Project ID
 */
export const apiGetProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

// ── Tasks inside Projects ─────────────────────────────────────────────────────

/**
 * Function: apiGetProjectTasks
 * Description: Retrieves all tasks associated with a specific project.
 * Why: To manage and track work items within a project context.
 * @param {string} projectId - Project ID
 */
export const apiGetProjectTasks = async (projectId) => {
  const res = await api.get(`/projects/${projectId}/tasks`);
  return res.data;
};

/**
 * Function: apiCreateProjectTask
 * Description: Creates a new task within a project.
 * Why: To break down project work into manageable items.
 * @param {string} projectId - Project ID
 * @param {Object} data - Task details
 */
export const apiCreateProjectTask = async (projectId, data) => {
  const res = await api.post(`/projects/${projectId}/tasks`, data);
  return res.data;
};

/**
 * Function: apiUpdateProjectTask
 * Description: Updates a task's details within a project.
 * Why: To modify task parameters after creation.
 * @param {string} projectId - Project ID
 * @param {string} taskId - Task ID
 * @param {Object} data - Updated task data
 */
export const apiUpdateProjectTask = async (projectId, taskId, data) => {
  const res = await api.put(`/projects/${projectId}/tasks/${taskId}`, data);
  return res.data;
};

/**
 * Function: apiDeleteProjectTask
 * Description: Deletes a task from a project.
 * Why: To remove unnecessary or incorrect tasks.
 * @param {string} projectId - Project ID
 * @param {string} taskId - Task ID
 */
export const apiDeleteProjectTask = async (projectId, taskId) => {
  const res = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
  return res.data;
};

/**
 * Function: apiUpdateProjectTaskStatus
 * Description: Updates the completion status of a project task.
 * Why: The primary way for employees to report progress on project work.
 * @param {string} projectId - Project ID
 * @param {string} taskId - Task ID
 * @param {string} status - New status
 */
export const apiUpdateProjectTaskStatus = async (projectId, taskId, status) => {
  const res = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });
  return res.data;
};