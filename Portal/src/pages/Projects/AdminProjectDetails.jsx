/**
 * Component: AdminProjectDetails
 * Description: Detailed administrative view of a specific project, including task management, team overview, and project-specific actions.
 * Why: To allow administrators to drill down into project details, manage individual tasks, and track specific project progress and deadlines.
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTimes, FaPlus, FaTrashAlt, FaChevronDown, FaPaperclip, FaPaperPlane, FaArrowLeft, FaRegEdit, FaCalendarAlt, FaUsers, FaLayerGroup } from 'react-icons/fa';
import Select from 'react-select';
import { AiOutlineClockCircle, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import {
  apiGetProjectById,
  apiGetProjectTasks,
  apiDeleteProjectTask,
  apiUpdateProjectTask,
  apiDeleteProject,
} from '../../api/projectAPI';
import AddTaskToProjectModal from '../../components/Admin/AddTaskToProjectModal';
import EditProjectModal from '../../components/Admin/EditProjectModal';
import Loader from '../../components/common/Loader';

// Helpers
const statusColors = {
  Pending: 'bg-[#2C5284]/10 text-[#2C5284] border-[#2C5284]/20',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
  Completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
};
const priorityColors = {
  Low: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  Medium: 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
  High: 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
  Urgent: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30',
};
const projectStatusColors = {
  Planning: 'bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300',
  Active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300',
  'On Hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300',
  Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300',
};

// Task Detail Modal 
function TaskDetailModal({ task, members, onClose, onUpdated, onDeleted }) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || '',
    assignedTo: task.assignedTo?.map(a => typeof a === 'object' ? a._id : a) || [],
    deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '',
    priority: task.priority || 'Medium',
    status: task.status || 'Pending',
  });
  const [saving, setSaving] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const toggleAssignee = id => {
    setForm(f => ({
      ...f,
      assignedTo: f.assignedTo.includes(id)
        ? f.assignedTo.filter(a => a !== id)
        : [...f.assignedTo, id],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await apiUpdateProjectTask(task.projectId, task._id, form);
      toast.success('Task updated!');
      onUpdated();
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to update task');
    } finally {
      setSaving(false);
    }
  };

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col dark:border dark:border-zinc-800">

        <div className="flex items-center justify-between px-6 py-4 bg-[#2C5284] dark:bg-[#365f8d]/80 rounded-t-2xl">
          <div>
            <h2 className="text-base font-bold text-white">Edit Task</h2>
            <p className="text-blue-200 text-[11px] mt-0.5 truncate max-w-[260px]">{task.title}</p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer">
            <FaTimes size={14} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Title</label>
            <input type="text" name="title" value={form.title} onChange={handle} maxLength={60}
              className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284]/40 outline-none text-sm" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Description</label>
            <textarea name="description" value={form.description} onChange={handle} rows="3"
              className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284]/40 outline-none text-sm resize-none" />
          </div>

          {/* Assignees */}
          <div className="relative">
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Assigned To
            </label>
            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full px-4 py-2.5 border ${isDropdownOpen ? 'border-[#2C5284] ring-2 ring-[#2C5284]/30' : 'border-zinc-200 dark:border-zinc-700'} bg-white dark:bg-zinc-800 rounded-xl text-sm cursor-pointer flex justify-between items-center`}>
              <span className={form.assignedTo.length > 0 ? 'text-zinc-800 dark:text-zinc-200 font-medium' : 'text-zinc-400'}>
                {form.assignedTo.length > 0 ? `${form.assignedTo.length} member(s)` : '— Select —'}
              </span>
              <FaCalendarAlt className="text-zinc-400 text-xs" />
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden">
                <div className="max-h-40 overflow-y-auto p-1.5 space-y-0.5">
                  {members.map(emp => (
                    <label key={emp._id} className="flex items-center gap-3 p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 rounded-lg cursor-pointer transition-colors">
                      <input type="checkbox" checked={form.assignedTo.includes(emp._id)} onChange={() => toggleAssignee(emp._id)}
                        className="w-4 h-4 text-[#2C5284] rounded border-zinc-300 cursor-pointer" />
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2C5284] flex-shrink-0 flex items-center justify-center font-bold text-xs overflow-hidden">
                        {emp.profileImage ? (
                          <img src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`} alt={emp.name} className="w-full h-full object-cover" />
                        ) : emp.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{emp.name || emp.email}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Deadline + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Deadline</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handle}
                className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Priority</label>
              <Select
                value={{ value: form.priority, label: form.priority }}
                onChange={(opt) => setForm({ ...form, priority: opt.value })}
                options={['Low', 'Medium', 'High', 'Urgent'].map(p => ({ value: p, label: p }))}
                isSearchable={false}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(0,0,0,0.1)',
                    borderRadius: '0.75rem',
                    padding: '2px',
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

          {/* Status */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Status</label>
            <Select
              value={{ value: form.status, label: form.status }}
              onChange={(opt) => setForm({ ...form, status: opt.value })}
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
          <button onClick={() => { onDeleted(task._id); onClose(); }}
            className="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-200 dark:border-red-800 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors cursor-pointer">
            <FaTrashAlt size={13} />
          </button>
          <button onClick={onClose} className="flex-1 px-4 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-xl font-semibold text-sm cursor-pointer">
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

// Main Page 
export default function AdminProjectDetails({ setTitle }) {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);

  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    console.log('projectId:', projectId);
    fetchProject();
    fetchTasks();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await apiGetProjectById(projectId);
      console.log('API response:', res);
      setProject(res.project);
      setTitle?.(res.project?.name || 'Project');
    } catch {
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setTasksLoading(true);
      const res = await apiGetProjectTasks(projectId);
      setTasks(res.tasks || []);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setTasksLoading(false);
    }
  };

  const handleDeleteTask = async id => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await apiDeleteProjectTask(projectId, id);
      toast.success('Task deleted');
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleDeleteProject = async () => {
    if (!window.confirm('Delete this entire project and all its tasks?')) return;
    try {
      await apiDeleteProject(projectId);
      toast.success('Project deleted');
      navigate('/projects');
    } catch {
      toast.error('Failed to delete project');
    }
  };

  // Members from project (normalized)
  const projectMembers = project?.members || [];

  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  };

  const completionPct = tasks.length > 0 ? Math.round((taskStats.completed / tasks.length) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50/50 dark:bg-[#292c35]">
        <Loader size="medium" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-zinc-500">Project not found.</p>
        <button onClick={() => navigate('/admin/projects')} className="text-[#2C5284] font-semibold text-sm">
          ← Back to Projects
        </button>
      </div>
    );
  }

  const isProjectOverdue = new Date(project.deadline) < new Date() && project.status !== 'Completed';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">

      {/* ── Back + Actions ── */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-[#2C5284] dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <FaArrowLeft size={12} />
          All Projects
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEditProject(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-white/5 text-zinc-600 dark:text-zinc-300 rounded-xl text-sm font-semibold hover:border-[#2C5284]/50 transition-all cursor-pointer"
          >
            <FaRegEdit size={13} />
            Edit Project
          </button>
          <button
            onClick={handleDeleteProject}
            className="flex items-center gap-2 px-4 py-2.5 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all cursor-pointer"
          >
            <FaTrashAlt size={12} />
            Delete
          </button>
        </div>
      </div>

      {/* ── Project Header Card ── */}
      <div className="bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-2xl shadow-sm mb-5 overflow-hidden">
        <div className="bg-gradient-to-r from-[#2C5284] to-[#365f8d] px-6 py-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-xl font-bold text-white truncate">{project.name}</h1>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${projectStatusColors[project.status] || 'bg-zinc-100 text-zinc-700'}`}>
                  {project.status}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${priorityColors[project.priority] || priorityColors.Medium}`}>
                  {project.priority} Priority
                </span>
              </div>
              {project.description && (
                <p className="text-blue-100 text-sm mt-1 max-w-2xl leading-relaxed">{project.description}</p>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-blue-200 text-xs font-semibold">Overall Progress</span>
              <span className="text-white text-xs font-bold">{completionPct}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Meta Row */}
        <div className="px-6 py-4 flex flex-wrap gap-6 border-t border-zinc-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <FaCalendarAlt size={13} className={isProjectOverdue ? 'text-red-500' : 'text-[#2C5284] dark:text-blue-400'} />
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase">Deadline</p>
              <p className={`text-sm font-semibold ${isProjectOverdue ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-200'}`}>
                {new Date(project.deadline).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                {isProjectOverdue && <span className="ml-1.5 text-[10px] text-red-500">(Overdue)</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaUsers size={13} className="text-[#2C5284] dark:text-blue-400" />
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase">Team</p>
              <div className="flex items-center -space-x-1.5 mt-0.5">
                {projectMembers.slice(0, 5).map(m => (
                  <div key={m._id || m}
                    className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2C5284] flex-shrink-0 flex items-center justify-center font-bold text-[9px] overflow-hidden border-2 border-white dark:border-zinc-900"
                    title={m.name}>
                    {m.profileImage ? (
                      <img src={m.profileImage.startsWith('http') ? m.profileImage : `http://localhost:3000/uploads/profile/${m.profileImage}`} alt={m.name} className="w-full h-full object-cover" />
                    ) : m.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                ))}
                {projectMembers.length > 5 && (
                  <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 flex items-center justify-center text-[9px] font-bold border-2 border-white dark:border-zinc-900">
                    +{projectMembers.length - 5}
                  </div>
                )}
                {projectMembers.length === 0 && <span className="text-xs text-zinc-400">No members</span>}
              </div>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="flex items-center gap-4 ml-auto flex-wrap">
            {[
              { label: 'Total', value: taskStats.total, color: 'text-[#2C5284] dark:text-blue-300' },
              { label: 'Pending', value: taskStats.pending, color: 'text-[#2C5284] dark:text-blue-300', bg: 'bg-[#2C5284]/10 dark:bg-[#2C5284]/10' },
              { label: 'In Progress', value: taskStats.inProgress, color: 'text-[#2C5284] dark:text-blue-300' },
              { label: 'Done', value: taskStats.completed, color: 'text-[#2C5284] dark:text-blue-300' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tasks Section Header ── */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-200">Project Tasks</h2>
          {/* Status Filter Tabs */}
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
                  borderRadius: '0.75rem',
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

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5284] transition-all w-64"
            />
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2C5284] hover:bg-[#1e3a5f] text-white text-xs font-bold rounded-xl shadow transition-all cursor-pointer"
          >
            <FaPlus size={10} />
            Add Task
          </button>
        </div>
      </div>

      {/* ── Tasks Table ── */}
      {tasksLoading ? (
        <div className="flex items-center justify-center py-16"><Loader size="medium" /></div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800/30 border-2 border-dashed border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-12 text-center">
          <FaLayerGroup size={28} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
            {searchTerm || statusFilter !== 'All' ? 'No tasks match your filter' : 'No tasks yet'}
          </p>
          {!searchTerm && statusFilter === 'All' && (
            <button onClick={() => setShowAddTask(true)}
              className="mt-3 text-xs text-[#2C5284] dark:text-blue-400 font-semibold hover:underline cursor-pointer">
              + Add the first task
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2C5284] dark:bg-white/10 text-white">
                <th className="px-5 py-3.5 text-xs font-semibold whitespace-nowrap">Task</th>
                <th className="px-5 py-3.5 text-xs font-semibold whitespace-nowrap">Assignees</th>
                <th className="px-5 py-3.5 text-xs font-semibold whitespace-nowrap text-center">Deadline</th>
                <th className="px-5 py-3.5 text-xs font-semibold whitespace-nowrap text-center">Priority</th>
                <th className="px-5 py-3.5 text-xs font-semibold whitespace-nowrap text-center">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
              {filteredTasks.map(task => {
                const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';
                return (
                  <tr key={task._id} className="group hover:bg-zinc-50/80 dark:hover:bg-white/5 transition-all">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-[#2C5284] dark:group-hover:text-blue-400 transition-colors">
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1 max-w-[200px]">{task.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center -space-x-1.5">
                        {(task.assignedTo || []).slice(0, 3).map(emp => (
                          <div key={emp._id || emp}
                            title={emp.name || emp.email}
                            className="w-7 h-7 rounded-full border-2 border-white dark:border-zinc-800 bg-blue-50 dark:bg-blue-900/40 text-[#2C5284] flex-shrink-0 flex items-center justify-center font-bold text-[9px] overflow-hidden shadow-sm">
                            {emp.profileImage ? (
                              <img src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`} alt={emp.name} className="w-full h-full object-cover" />
                            ) : emp.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                        ))}
                        {(task.assignedTo || []).length > 3 && (
                          <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 flex items-center justify-center text-[9px] font-bold border-2 border-white dark:border-zinc-800">
                            +{task.assignedTo.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-xs font-semibold ${isOverdue ? 'text-red-500' : 'text-zinc-600 dark:text-zinc-300'}`}>
                        {new Date(task.deadline).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                        {isOverdue && <span className="block text-[10px]">(Overdue)</span>}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${priorityColors[task.priority] || priorityColors.Medium}`}>
                        {task.priority || 'Medium'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${statusColors[task.status] || statusColors.Pending}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelectedTask({ ...task, projectId })}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2C5284]/10 dark:bg-white/5 hover:bg-[#2C5284] text-[#2C5284] dark:text-blue-300 hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer">
                          <AiOutlineEye size={12} /> Edit
                        </button>
                        <button onClick={() => handleDeleteTask(task._id)}
                          className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer">
                          <AiOutlineDelete size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modals ── */}
      {showAddTask && (
        <AddTaskToProjectModal
          projectId={projectId}
          members={projectMembers}
          onClose={() => setShowAddTask(false)}
          onAdded={() => { setShowAddTask(false); fetchTasks(); }}
        />
      )}

      {showEditProject && (
        <EditProjectModal
          project={project}
          onClose={() => setShowEditProject(false)}
          onUpdated={() => { setShowEditProject(false); fetchProject(); }}
        />
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          members={projectMembers}
          onClose={() => setSelectedTask(null)}
          onUpdated={fetchTasks}
          onDeleted={id => { handleDeleteTask(id); }}
        />
      )}
    </div>
  );
}