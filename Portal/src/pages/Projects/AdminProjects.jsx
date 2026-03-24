/**
 * Component: AdminProjects
 * Description: Administrative overview page for project management, displaying all company projects with filtering and key statistics.
 * Why: To provide administrators with a high-level view of project statuses, priorities, and deadlines, and to serve as a hub for project creation.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaPlus, FaRegEdit, FaLayerGroup, FaCalendarAlt,
   FaTrashAlt,
} from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import Select from 'react-select';
import { apiGetAllProjects, apiDeleteProject } from '../../api/projectAPI';
import AddProjectModal from '../../components/Admin/AddProjectModal';
import EditProjectModal from '../../components/Admin/EditProjectModal';
import Loader from '../../components/common/Loader';
import { AiOutlineEye } from 'react-icons/ai';
import TableSkeleton from '../../components/common/TableSkeleton';
import Skeleton from '../../components/common/Skeleton';

// Colour maps 
const priorityColors = {
  Low:    'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
  Medium: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
  High:   'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
  Urgent: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30',
};
const projectStatusConfig = {
  Planning:  { color: 'text-purple-700 dark:text-purple-300',  bg: 'bg-purple-100 dark:bg-purple-500/20',  dot: 'bg-purple-500' },
  Active:    { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-500/20', dot: 'bg-emerald-500' },
  'On Hold': { color: 'text-yellow-700 dark:text-yellow-300',  bg: 'bg-yellow-100 dark:bg-yellow-500/20',  dot: 'bg-yellow-500' },
  Completed: { color: 'text-blue-700 dark:text-blue-300',      bg: 'bg-blue-100 dark:bg-blue-500/20',      dot: 'bg-blue-500' },
};

import Pagination from '../../components/common/Pagination';

export default function AdminProjects({ setTitle }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    setTitle?.('Projects');
  }, [setTitle]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = { 
        page: currentPage, 
        limit: 5, 
        searchTerm, 
        status: statusFilter === 'All' ? '' : statusFilter 
      };
      const res = await apiGetAllProjects(params);
      setProjects(res.projects || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setTotalProjects(res.pagination?.totalProjects || 0);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchProjects();
    }, 300); // Debounce to avoid rapid API calls while typing
    return () => clearTimeout(debounceFetch);
  }, [currentPage, searchTerm, statusFilter]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this project and all its tasks?')) return;
    try {
      await apiDeleteProject(id);
      toast.success('Project deleted');
      fetchProjects();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const stats = {
    total: totalProjects,
    active: projects.filter(p => p.status === 'Active').length, // Note: This is only for the current page
    onHold: projects.filter(p => p.status === 'On Hold').length,
    completed: projects.filter(p => p.status === 'Completed').length,
  };

  const statCards = [
    { sub: 'Total Projects', value: stats.total,     icon: <CgProfile size={20} className="text-white" /> },
    { sub: 'Active',         value: stats.active,    icon: <AiOutlineClockCircle size={20} className="text-white" /> },
    { sub: 'On Hold',        value: stats.onHold,    icon: <FaLayerGroup size={18} className="text-white" /> },
    { sub: 'Completed',      value: stats.completed, icon: <RxCrossCircled size={20} className="text-white" /> },
  ];



  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300 tracking-tight">
          Projects
        </h2>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#2C5284] hover:bg-[#1e3a5f] text-white text-sm font-semibold rounded-xl shadow hover:shadow-md transition-all active:scale-[0.97] cursor-pointer"
        >
          <FaPlus size={11} />
          New Project
        </button>
      </div>

      {/* ── Stat Cards ── */}
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
            <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow-sm hover:shadow-xl transition-all duration-300 group">
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

      {/* ── Filters ── */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5284]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-44">
            <Select
              value={{ value: statusFilter, label: statusFilter }}
              onChange={(opt) => { setStatusFilter(opt.value); setCurrentPage(1); }}
              options={['All', 'Planning', 'Active', 'On Hold', 'Completed'].map(s => ({ value: s, label: s }))}
              placeholder="Filter Status"
              isSearchable={false}
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(0,0,0,0.1)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  minHeight: '40px',
                  boxShadow: 'none',
                  '&:hover': { borderColor: '#2C5284' }
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  zIndex: 50
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.08)' : 'transparent',
                  color: state.isSelected ? 'white' : 'inherit',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  '&:active': { backgroundColor: '#2C5284' }
                }),
              }}
              className="dark:text-zinc-800"
            />
          </div>
        </div>
      </div>

      {/* ── Project Cards Grid ── */}
      {loading ? (
        <TableSkeleton rows={6} cols={7} />
      ) : projects.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800/30 border-2 border-dashed border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-14 text-center">
          <FaLayerGroup size={32} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
            {searchTerm || statusFilter !== 'All' ? 'No projects match your filter' : 'No projects yet'}
          </p>
          {!searchTerm && statusFilter === 'All' && (
            <button onClick={() => setShowAdd(true)}
              className="mt-3 text-sm text-[#2C5284] dark:text-blue-400 font-semibold hover:underline cursor-pointer">
              + Create your first project
            </button>
          )}
        </div>
      ) : (
        <>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-white/5">
                  {projects.map(project => {
                    const cfg = projectStatusConfig[project.status] || projectStatusConfig.Planning;
                    const isOverdue = new Date(project.deadline) < new Date() && project.status !== 'Completed';
                    const completedTasks = project.taskCount?.completed || 0;
                    const totalTasks = project.taskCount?.total || 0;
                    const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

                    return (
                      <tr key={project._id} className="hover:bg-blue-50/50 dark:hover:bg-white/5 transition-all duration-200 border-transparent hover:border-blue-200 dark:hover:border-blue-500/30">
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
                                    {m.name?.split(' ').map(n=>n[0]).join('') || '?'}
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
                              <span>{completedTasks}/{totalTasks}</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#2C5284] to-[#365f8d] rounded-full transition-all duration-700"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-1">
                            <button onClick={() => navigate(`/projects/${project._id}`)}
                              className="p-2 bg-blue-50 dark:bg-white/5 hover:bg-[#2C5284] text-[#2C5284] dark:text-blue-300 hover:text-white rounded-lg transition-all" title="View Details">
                              <AiOutlineEye size={16} />
                            </button>
                            <button onClick={e => { e.stopPropagation(); setEditProject(project); }}
                              className="p-2 text-zinc-400 hover:text-blue-600 bg-transparent hover:bg-blue-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer" title="Edit Project">
                              <FaRegEdit size={16} />
                            </button>
                            <button onClick={e => handleDelete(e, project._id)}
                              className="p-2 text-zinc-400 hover:text-red-500 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer" title="Delete Project">
                              <FaTrashAlt size={14} />
                            </button>
                          </div>
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

          {/* Mobile Cards View */}
          <div className="lg:hidden space-y-4">
            {projects.map(project => {
              const cfg = projectStatusConfig[project.status] || projectStatusConfig.Planning;
              const isOverdue = new Date(project.deadline) < new Date() && project.status !== 'Completed';
              const completedTasks = project.taskCount?.completed || 0;
              const totalTasks = project.taskCount?.total || 0;
              const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

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
                        <span className="uppercase text-gray-400 dark:text-gray-500 font-bold">Progress</span>
                        <span>{pct}% ({completedTasks}/{totalTasks})</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2C5284] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="pt-3 flex items-center justify-between border-t border-gray-50 dark:border-white/5">
                      <button onClick={() => navigate(`/projects/${project._id}`)}
                        className="flex items-center gap-1.5 text-xs font-bold text-[#2C5284] dark:text-blue-300 uppercase tracking-wider">
                        <AiOutlineEye size={14} /> View Details
                      </button>
                      <div className="flex items-center gap-2">
                        <button onClick={e => { e.stopPropagation(); setEditProject(project); }}
                          className="p-1.5 text-zinc-400 hover:text-[#2C5284] bg-transparent hover:bg-[#2C5284]/10 rounded-lg cursor-pointer">
                          <FaRegEdit size={14} />
                        </button>
                        <button onClick={e => handleDelete(e, project._id)}
                          className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg cursor-pointer">
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
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

      {/* ── Modals ── */}
      {showAdd && (
        <AddProjectModal
          onClose={() => setShowAdd(false)}
          onAdded={() => { setShowAdd(false); fetchProjects(); }}
        />
      )}

      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={() => setEditProject(null)}
          onUpdated={() => { setEditProject(null); fetchProjects(); }}
        />
      )}
    </div>
  );
}