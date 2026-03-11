import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

// ── Projects ──────────────────────────────────────────────────────────────────
export const apiGetAllProjects = async () => {
  const res = await api.get('/projects');
  return res.data;
};

export const apiGetMyProjects = async () => {
  const res = await api.get('/projects/my');
  return res.data;
};

export const apiCreateProject = async (data) => {
  const res = await api.post('/projects', data);
  return res.data;
};

export const apiUpdateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

export const apiDeleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

export const apiGetProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

// ── Tasks inside Projects ─────────────────────────────────────────────────────
export const apiGetProjectTasks = async (projectId) => {
  const res = await api.get(`/projects/${projectId}/tasks`);
  return res.data;
};

export const apiCreateProjectTask = async (projectId, data) => {
  const res = await api.post(`/projects/${projectId}/tasks`, data);
  return res.data;
};

export const apiUpdateProjectTask = async (projectId, taskId, data) => {
  const res = await api.put(`/projects/${projectId}/tasks/${taskId}`, data);
  return res.data;
};

export const apiDeleteProjectTask = async (projectId, taskId) => {
  const res = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
  return res.data;
};

export const apiUpdateProjectTaskStatus = async (projectId, taskId, status) => {
  const res = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });
  return res.data;
};