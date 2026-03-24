/**
 * Component: EmployeeProjects
 * Description: Personal project dashboard for employees, showing projects they are assigned to and providing task status update capabilities.
 * Why: To give employees a focused view of their responsibilities across various projects and a streamlined way to report task progress.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaCalendarAlt, FaChevronRight, FaChevronLeft, FaLayerGroup,
  FaArrowLeft, FaTimes, FaCheckCircle, FaRegClock, FaUsers,
} from 'react-icons/fa';
import { AiOutlineClockCircle, AiOutlineEye } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { RxCrossCircled } from 'react-icons/rx';
import Select from 'react-select';
import {
  apiGetMyProjects,
  apiGetProjectTasks,
  apiUpdateProjectTaskStatus,
} from '../../api/projectAPI';
import Loader from '../../components/common/Loader';
import TableSkeleton from '../../components/common/TableSkeleton';
import Skeleton from '../../components/common/Skeleton';
import Pagination from '../../components/common/Pagination';

const priorityColors = {
  Low: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  Medium: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 border-sky-100 dark:border-sky-500/20',
  High: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 border-orange-100 dark:border-orange-500/20',
  Urgent: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border-red-100 dark:border-red-500/20',
};
const statusColors = {
  Pending: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 border-blue-100 dark:border-blue-500/20',
  Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20',
};
const projectStatusConfig = {
  Planning: { bg: 'bg-purple-100', color: 'text-purple-700', dot: 'bg-purple-500' },
  Active: { bg: 'bg-emerald-100', color: 'text-emerald-700', dot: 'bg-emerald-500' },
  'On Hold': { bg: 'bg-yellow-100', color: 'text-yellow-700', dot: 'bg-yellow-500' },
  Completed: { bg: 'bg-blue-100', color: 'text-blue-700', dot: 'bg-blue-500' },
};

// Task Status Update Modal
function TaskUpdateModal({ task, projectId, onClose, onUpdated }) {
  const [status, setStatus] = useState(task.status);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (status === task.status) { onClose(); return; }
    setSaving(true);
    try {
      await apiUpdateProjectTaskStatus(projectId, task._id, status);
      toast.success('Status updated!');
      onUpdated(task._id, status);
      onClose();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md dark:border dark:border-zinc-800">

        <div className="flex items-center justify-between px-6 py-4 bg-[#2C5284] dark:bg-[#365f8d]/80 rounded-t-2xl">
          <div>
            <h2 className="text-sm font-bold text-white">{task.title}</h2>
            <p className="text-blue-200 text-[11px] mt-0.5">Update task status</p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer">
            <FaTimes size={14} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Description */}
          {task.description && (
            <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-xl p-4">
              <p className="text-xs font-bold text-zinc-400 uppercase mb-1.5">Description</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{task.description}</p>
            </div>
          )}

          {/* Deadline */}
          <div className="flex items-center gap-2">
            <FaCalendarAlt size={12} className={isOverdue ? 'text-red-500' : 'text-[#2C5284] dark:text-blue-400'} />
            <span className={`text-sm font-semibold ${isOverdue ? 'text-red-500' : 'text-zinc-700 dark:text-zinc-300'}`}>
              {new Date(task.deadline).toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            {isOverdue && <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">Overdue</span>}
          </div>

          {/* Priority */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase">Priority</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${priorityColors[task.priority] || priorityColors.Medium}`}>
              {task.priority || 'Medium'}
            </span>
          </div>

          {/* Status Picker */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Update Status</label>
            <Select
              value={{ value: status, label: status }}
              onChange={(opt) => setStatus(opt.value)}
              options={['Pending', 'In Progress', 'Completed'].map(s => ({ value: s, label: s }))}
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(0,0,0,0.1)',
                  borderRadius: '0.75rem',
                  padding: '4px',
                  boxShadow: 'none',
                  '&:hover': { borderColor: '#2C5284' }
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.08)' : 'transparent',
                  color: state.isSelected ? 'white' : 'inherit',
                  cursor: 'pointer'
                }),
              }}
              className="text-sm dark:text-zinc-800"
            />
          </div>
        </div>

        <div className="px-5 pb-5 flex gap-3">
          <button onClick={onClose}
            className="flex-1 px-4 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-xl font-semibold text-sm cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 px-4 py-3 bg-[#2C5284] hover:bg-[#1e3a5f] disabled:opacity-60 text-white rounded-xl font-semibold text-sm shadow cursor-pointer">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Project Detail View (inline) 
function ProjectDetailView({ project, onBack }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, [project._id]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await apiGetProjectTasks(project._id);
      // Only show tasks assigned to me — filtering is done server-side ideally,
      // but we can also filter client-side using assignedTo field
      setTasks(res.tasks || []);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskStatusUpdate = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
  };

  const filteredTasks = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  };
  const pct = tasks.length > 0 ? Math.round((taskStats.completed / tasks.length) * 100) : 0;
  const cfg = projectStatusConfig[project.status] || projectStatusConfig.Planning;
  const isProjectOverdue = new Date(project.deadline) < new Date() && project.status !== 'Completed';

  return (
    <div>
      {/* ── Back ── */}
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-[#2C5284] dark:hover:text-blue-400 transition-colors mb-5 cursor-pointer">
        <FaArrowLeft size={12} />
        My Projects
      </button>

      {/* ── Project Header Card ── */}
      <div className="bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-[2rem] shadow-lg mb-8 overflow-hidden">
        <div className="bg-[#2C5284] px-8 py-8">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">{project.name}</h1>
                <span className={`px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
                  {project.status}
                </span>
                <span className={`px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${priorityColors[project.priority] || priorityColors.Medium}`}>
                  {project.priority} Priority
                </span>
              </div>
              {project.description && (
                <p className="text-blue-100 text-base mt-2 max-w-3xl leading-relaxed opacity-90">{project.description}</p>
              )}
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white text-sm font-bold tracking-wide">Overall Progress</span>
              <span className="text-white text-sm font-black tracking-tighter">{pct}%</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Meta Row (White Bottom) */}
        <div className="px-8 py-6 flex flex-wrap items-center gap-10 bg-white dark:bg-zinc-900/50">
          {/* Deadline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
              <FaCalendarAlt size={16} className={isProjectOverdue ? 'text-red-500' : ''} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Deadline</p>
              <p className={`text-sm font-bold ${isProjectOverdue ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-200'}`}>
                {new Date(project.deadline).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
              <FaUsers size={18} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Team</p>
              <div className="flex items-center -space-x-2 mt-1">
                {(project.members || []).slice(0, 5).map(m => (
                  <div key={m._id || m}
                    className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2C5284] flex-shrink-0 flex items-center justify-center font-bold text-[10px] overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm"
                    title={m.name}>
                    {m.profileImage ? (
                      <img src={m.profileImage.startsWith('http') ? m.profileImage : `http://localhost:3000/uploads/profile/${m.profileImage}`} alt={m.name} className="w-full h-full object-cover" />
                    ) : m.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                ))}
                {(project.members || []).length > 5 && (
                  <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 flex items-center justify-center text-[10px] font-bold border-2 border-white dark:border-zinc-800">
                    +{(project.members || []).length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Task Stats (Right Aligned) */}
          <div className="flex items-center gap-8 ml-auto">
            {[
              { label: 'Total', value: taskStats.total },
              { label: 'Pending', value: taskStats.pending },
              { label: 'In Progress', value: taskStats.inProgress },
              { label: 'Done', value: taskStats.completed },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black text-[#2C5284] dark:text-[#365f8d] leading-none mb-1">{s.value}</p>
                <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tasks ── */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">My Tasks in this Project</h2>
          <div className="w-36">
            <Select
              value={{ value: statusFilter, label: statusFilter }}
              onChange={(opt) => setStatusFilter(opt.value)}
              options={['All', 'Pending', 'In Progress', 'Completed'].map(s => ({ value: s, label: s }))}
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(0,0,0,0.1)',
                  borderRadius: '0.5rem',
                  boxShadow: 'none',
                  '&:hover': { borderColor: '#2C5284' }
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.08)' : 'transparent',
                  color: state.isSelected ? 'white' : 'inherit',
                  cursor: 'pointer'
                }),
              }}
              className="text-xs dark:text-zinc-800"
            />
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder="Search tasks..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8 pr-4 py-2 border border-zinc-200 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2C5284] w-44" />
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader size="medium" /></div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800/30 border-2 border-dashed border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-12 text-center">
          <FaLayerGroup size={24} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-zinc-400">
            {searchTerm || statusFilter !== 'All' ? 'No tasks match your filter' : 'No tasks assigned to you in this project'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden lg:block bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2C5284] dark:bg-white/10 text-white">
                  <th className="px-5 py-3.5 text-xs font-semibold">Task</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-center">Deadline</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-center">Priority</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-center">Status</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                {filteredTasks.map(task => {
                  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';
                  return (
                    <tr key={task._id} className="group hover:bg-zinc-50 dark:hover:bg-white/5 transition-all duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${task.status === 'Completed' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-[#2C5284]/10 dark:bg-[#2C5284]/10 text-[#2C5284]'} shrink-0 group-hover:scale-110 transition-transform`}>
                            {task.status === 'Completed' ? <FaCheckCircle size={14} /> : <FaRegClock size={14} />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate group-hover:text-[#2C5284] dark:group-hover:text-blue-400 transition-colors">{task.title}</p>
                            {task.description && <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1 max-w-[280px]">{task.description}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${isOverdue ? 'bg-red-50 dark:bg-red-500/10 text-red-500' : 'text-zinc-600 dark:text-zinc-300'}`}>
                          <FaCalendarAlt size={10} className="opacity-70" />
                          {new Date(task.deadline).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                          {isOverdue && <span className="text-[9px] uppercase tracking-tighter ml-1 font-black">Overdue</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider ${priorityColors[task.priority] || priorityColors.Medium}`}>
                          {task.priority || 'Medium'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusColors[task.status] || statusColors.Pending}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setSelectedTask(task)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2C5284]/10 dark:bg-white/5 hover:bg-[#2C5284] text-[#2C5284] dark:text-blue-300 hover:text-white rounded-lg text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow active:scale-95">
                          Update Status
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-3">
            {filteredTasks.map(task => {
              const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';
              return (
                <div key={task._id} className="bg-white dark:bg-white/5 rounded-xl border border-zinc-100 dark:border-white/5 shadow-sm overflow-hidden">
                  <div className="p-4 flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 truncate">{task.title}</p>
                      {task.description && <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{task.description}</p>}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex-shrink-0 ${statusColors[task.status] || statusColors.Pending}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="px-4 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${priorityColors[task.priority] || priorityColors.Medium}`}>
                        {task.priority}
                      </span>
                      <span className={`text-xs ${isOverdue ? 'text-red-500 font-semibold' : 'text-zinc-400'}`}>
                        {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        {isOverdue && ' (Overdue)'}
                      </span>
                    </div>
                    <button onClick={() => setSelectedTask(task)}
                      className="px-3 py-1.5 bg-[#2C5284]/10 hover:bg-[#2C5284] text-[#2C5284] hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer">
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {selectedTask && (
        <TaskUpdateModal
          task={selectedTask}
          projectId={project._id}
          onClose={() => setSelectedTask(null)}
          onUpdated={handleTaskStatusUpdate}
        />
      )}
    </div>
  );
}

// Main Employee Projects Page
export default function EmployeeProjects({ setTitle }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    setTitle?.('My Projects');
    const debounceFetch = setTimeout(() => {
      fetchProjects();
    }, 300);
    return () => clearTimeout(debounceFetch);
  }, [currentPage, searchTerm, statusFilter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 5,
        searchTerm,
        status: statusFilter === 'All' ? '' : statusFilter
      };
      const res = await apiGetMyProjects(params);
      setProjects(res.projects || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotalProjects(res.pagination?.totalProjects || 0);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: totalProjects,
    active: projects.filter(p => p.status === 'Active').length,
    inProgress: projects.filter(p => p.status === 'On Hold').length,
    completed: projects.filter(p => p.status === 'Completed').length,
  };

  // If a project is selected, show its detail view
  if (selectedProject) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">
        <ProjectDetailView
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      </div>
    );
  }

  const statCards = [
    { sub: 'Total', value: stats.total, icon: <CgProfile size={20} className="text-white" /> },
    { sub: 'Active', value: stats.active, icon: <AiOutlineClockCircle size={20} className="text-white" /> },
    { sub: 'On Hold', value: stats.inProgress, icon: <FaLayerGroup size={18} className="text-white" /> },
    { sub: 'Completed', value: stats.completed, icon: <RxCrossCircled size={20} className="text-white" /> },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">

      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300 tracking-tight">
          My Projects
        </h2>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading
          ? [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-gray-100 dark:border-white/5 flex items-center justify-between shadow-sm transition duration-300">
              <div className="space-y-2 flex-1">
                <Skeleton height="0.6rem" width="40%" />
                <Skeleton height="1.5rem" width="20%" />
              </div>
              <Skeleton variant="circular" width="2.5rem" height="2.5rem" className="shrink-0" />
            </div>
          ))
          : statCards.map((card, i) => (
            <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 group">
              <div>
                <p className="text-xs text-[#2C5284] dark:text-gray-300 mb-0.5">{card.sub}</p>
                <h1 className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-blue-300 tracking-tight">{card.value}</h1>
              </div>
              <div className="bg-[#2C5284] dark:bg-[#365f8d] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <div className="text-white opacity-90 group-hover:opacity-100">
                  {React.cloneElement(card.icon, { size: 20, className: "" })}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1">
            <input type="text" placeholder="Search projects..." value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5284]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="w-44">
            <Select
              value={{ value: statusFilter, label: statusFilter }}
              onChange={(opt) => { setStatusFilter(opt.value); setCurrentPage(1); }}
              options={['All', 'Planning', 'Active', 'On Hold', 'Completed'].map(s => ({ value: s, label: s }))}
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(0,0,0,0.1)',
                  borderRadius: '0.5rem',
                  boxShadow: 'none',
                  '&:hover': { borderColor: '#2C5284' }
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.08)' : 'transparent',
                  color: state.isSelected ? 'white' : 'inherit',
                  cursor: 'pointer'
                }),
              }}
              className="text-sm dark:text-zinc-800"
            />
          </div>
        </div>
      </div>

      {/* Project Cards */}
      {loading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : projects.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800/30 border-2 border-dashed border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-14 text-center">
          <FaLayerGroup size={32} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-zinc-400">
            {searchTerm || statusFilter !== 'All' ? 'No projects match your filter' : 'You have no projects assigned yet'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
                <thead className="bg-[#2C5284] dark:bg-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Team</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Deadline</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Progress</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-white/5">
                  {projects.map(project => {
                    const cfg = projectStatusConfig[project.status] || projectStatusConfig.Planning;
                    const isOverdue = new Date(project.deadline) < new Date() && project.status !== 'Completed';
                    const completedTasks = project.myTaskCount?.completed || 0;
                    const totalTasks = project.myTaskCount?.total || 0;
                    const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

                    return (
                      <tr key={project._id} className="hover:bg-blue-50/50 dark:hover:bg-white/5 transition-all duration-200 group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2C5284] to-[#365f8d] flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0 uppercase">
                              {project.name.substring(0, 2)}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate max-w-[180px]" title={project.name}>
                                {project.name}
                              </div>
                              {project.description && (
                                <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-[180px]">
                                  {project.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex -space-x-2 overflow-hidden">
                            {project.members?.slice(0, 3).map((m, idx) => (
                              <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-900 overflow-hidden bg-gray-100">
                                {m.profileImage ? (
                                  <img
                                    src={m.profileImage.startsWith('http') ? m.profileImage : `http://localhost:3000/uploads/profile/${m.profileImage}`}
                                    alt={m.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center bg-[#2C5284] text-[10px] text-white font-bold">
                                    {m.name?.split(' ').map(n => n[0]).join('') || '?'}
                                  </div>
                                )}
                              </div>
                            ))}
                            {project.members?.length > 3 && (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-[10px] font-bold text-gray-500 ring-2 ring-white dark:ring-zinc-900">
                                +{project.members.length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1 w-fit ${priorityColors[project.priority] || priorityColors.Medium}`}>
                            <span className="w-1 h-1 rounded-full bg-current opacity-70" />
                            {project.priority || 'Medium'}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-sm">
                          <div className={`flex items-center gap-1.5 font-medium ${isOverdue ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            <FaCalendarAlt size={10} className="opacity-70" />
                            {new Date(project.deadline).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                          </div>
                          {isOverdue && <div className="text-[10px] text-red-500 font-bold ml-4">Overdue</div>}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-[10px] leading-5 font-bold uppercase tracking-wider rounded-full ${cfg.bg} ${cfg.color}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex flex-col gap-1.5 w-24">
                            <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400">
                              <span>{pct}%</span>
                              <span>{completedTasks}/{totalTasks} tasks</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#2C5284] to-[#365f8d] rounded-full transition-all duration-700"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          <button onClick={() => setSelectedProject(project)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2C5284] text-white hover:bg-[#1e3a5f] rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer">
                            <AiOutlineEye size={14} />
                            Open Dashboard
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {totalProjects > 5 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {projects.map(project => {
              const cfg = projectStatusConfig[project.status] || projectStatusConfig.Planning;
              const isOverdue = new Date(project.deadline) < new Date() && project.status !== 'Completed';
              const completedTasks = project.myTaskCount?.completed || 0;
              const totalMyTasks = project.myTaskCount?.total || 0;
              const pct = totalMyTasks > 0 ? Math.round((completedTasks / totalMyTasks) * 100) : 0;

              return (
                <div key={project._id} className="bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
                  <div className="p-4 flex items-start justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                    <div className="flex flex-col flex-1 min-w-0 pr-4">
                      <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">{project.name}</span>
                      <span className="text-xs text-gray-500 mt-0.5 line-clamp-1">{project.description}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Priority</p>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border inline-block ${priorityColors[project.priority] || priorityColors.Medium}`}>
                          {project.priority || 'Medium'}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Deadline</p>
                        <p className={`text-sm font-medium ${isOverdue ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                          {new Date(project.deadline).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-gray-500 font-semibold mb-1">
                        <span className="uppercase text-gray-400 dark:text-gray-500 font-bold">My Progress</span>
                        <span>{pct}% ({completedTasks}/{totalMyTasks})</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2C5284] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="pt-3 flex items-center justify-between border-t border-gray-50 dark:border-white/5">
                      <button onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-1.5 text-xs font-bold text-[#2C5284] dark:text-blue-300 uppercase tracking-wider w-full justify-center">
                        <AiOutlineEye size={14} /> View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {totalProjects > 5 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}