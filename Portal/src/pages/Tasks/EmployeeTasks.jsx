import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { apiGetMyTasks, apiUpdateTaskStatus } from '../../api/taskAPI';
import { toast } from 'react-toastify';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaPlus, FaRegCheckCircle } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineEye } from 'react-icons/ai';
import TaskDetailsModal from '../../components/Admin/TaskDetailsModal';
import Loader from '../../components/common/Loader';

export default function EmployeeTasks({ setTitle }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  useEffect(() => {
    setTitle('My Tasks');
    fetchTasks();
  }, [setTitle]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await apiGetMyTasks();
      setTasks(res.tasks || []);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch your tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiUpdateTaskStatus(id, newStatus);
      toast.success('Task status updated');
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      toast.error(err.message || 'Error updating status');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || task.status === statusFilter.value;
    
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    'Pending': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/20',
    'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 border-blue-200 dark:border-blue-500/20',
    'Completed': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20',
  };

  const priorityColors = {
    'Low': 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    'Medium': 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
    'High': 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300',
    'Urgent': 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300',
  };

  return (
    <div className="p-4 bg-gray-50/30 dark:bg-transparent min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300 tracking-tight">My Tasks</h2>
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Your Assigned Workload</p>
        </div>
      </div>

      {/* Task Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total', value: tasks.length, sub: 'Assigned', icon: <CgProfile size={24} className="text-white" /> },
          { label: 'Working', value: tasks.filter(t => t.status === 'In Progress').length, sub: 'In Progress', icon: <AiOutlineClockCircle size={24} className="text-white" /> },
          { label: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, sub: 'Finished', icon: <FaRegCheckCircle size={24} className="text-white" /> },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-white/5 p-5 flex items-center justify-between shadow hover:shadow-xl transition-all duration-300 min-h-[110px] sm:min-h-28 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D]">
            <div>
              <p className="text-xs sm:text-sm text-[#2C5284] dark:text-gray-300">{s.sub}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D] dark:text-gray-100">{s.value}</h1>
              <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1">{s.label}</p>
            </div>
            <div className="bg-[#365F8D] dark:bg-[#2C5282] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Search My Tasks
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search title, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-xs"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5284]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Filter by Status
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={statusOptions}
                  isClearable
                  placeholder="All Statuses"
                  className="react-select-container text-xs"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: 'transparent',
                      borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
                      borderRadius: '0.5rem',
                      minHeight: '38px',
                      boxShadow: state.isFocused ? '0 0 0 1px #2C5284' : 'none',
                      '&:hover': { borderColor: '#2C5284' },
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.1)' : 'transparent',
                      color: state.isSelected ? 'white' : 'inherit',
                      '&:active': { backgroundColor: '#2C5284' }
                    })
                  }}
                />
              </div>
              {(searchTerm || statusFilter) && (
                <button
                  onClick={() => { setSearchTerm(''); setStatusFilter(null); }}
                  className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-1 transition-colors"
                  title="Clear Filters"
                >
                  <FaPlus className="rotate-45" size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500 dark:text-zinc-400">
          <Loader size="medium" />
          <span className="text-xs font-bold uppercase tracking-widest mt-2">Loading tasks...</span>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800/30 border-2 border-dashed border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-12 text-center text-zinc-500 dark:text-zinc-400">
          <div className="mb-4 flex justify-center opacity-20">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          </div>
          <p className="text-sm font-bold uppercase tracking-wider">No tasks match your filter</p>
          <p className="text-[10px] text-gray-400 mt-1">Try changing your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div key={task._id} className="bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full hover:translate-y-[-2px]">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-grow pr-2">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm text-zinc-800 dark:text-gray-100 group-hover:text-[#2C5284] dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {task.title}
                    </h3>
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="text-[#2C5284] dark:text-blue-400 hover:bg-[#2C5284]/10 p-1.5 rounded-lg transition-all"
                      title="View Details"
                    >
                      <AiOutlineEye size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${priorityColors[task.priority] || priorityColors['Medium']}`}>
                      {task.priority || 'Medium'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${statusColors[task.status] || statusColors['Pending']}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 dark:text-gray-400 mb-5 flex-grow italic leading-relaxed line-clamp-3">
                {task.description || 'No description provided.'}
              </p>

              <div className="pt-4 border-t border-zinc-50 dark:border-white/5 mt-auto flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-gray-400 dark:text-gray-500 uppercase tracking-wider">Deadline</span>
                  <span className={`${new Date(task.deadline) < new Date() && task.status !== 'Completed' ? 'text-red-500' : 'text-zinc-700 dark:text-gray-300'} bg-zinc-50 dark:bg-white/5 px-2 py-1 rounded-lg`}>
                    {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="w-full bg-[#2C5284] hover:bg-[#1e3a5f] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl py-2.5 px-3 transition-all cursor-pointer outline-none shadow-md shadow-[#2C5284]/10"
                  >
                    <option value="Pending">Mark as Pending</option>
                    <option value="In Progress">Move to In Progress</option>
                    <option value="Completed">Set as Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
