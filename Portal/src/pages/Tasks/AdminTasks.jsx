import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { apiGetAllTasks, apiDeleteTask } from '../../api/taskAPI';
import AddTaskModal from '../../components/Admin/AddTaskModal';
import TaskDetailsModal from '../../components/Admin/TaskDetailsModal';
import EditTaskModal from '../../components/Admin/EditTaskModal';
import { toast } from 'react-toastify';
import { AiOutlinePlus, AiOutlineEye, AiOutlineDelete, AiOutlineClockCircle } from 'react-icons/ai';
import { FaPlus, FaRegCheckCircle, FaRegEdit } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import Loader from '../../components/common/Loader';

export default function AdminTasks({ setTitle }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    setTitle('Manage Tasks');
    fetchTasks();
  }, [setTitle]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await apiGetAllTasks();
      setTasks(res.tasks || []);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await apiDeleteTask(id);
      toast.success('Task deleted successfully');
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      toast.error(err.message || 'Failed to delete task');
    }
  };

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/30',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
    'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  };

  const priorityColors = {
    'Low': 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
    'Medium': 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
    'High': 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
    'Urgent': 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30',
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Urgent', label: 'Urgent' },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.assignedEmployees && task.assignedEmployees.some(emp =>
        (emp.name && emp.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()))
      ));

    const matchesStatus = !statusFilter || task.status === statusFilter.value;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter.value;
    const matchesDate = !selectedDate || (task.deadline && task.deadline.startsWith(selectedDate));

    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300 tracking-tight">Task Management</h2>
          
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white text-sm font-semibold rounded-xl shadow hover:bg-[#1e3a5f] transition-all hover:shadow-md active:scale-[0.97] cursor-pointer"
        >
           <FaPlus size={12} />
          Assign New Task
        </button>
      </div>

      {/* Task Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'All Tasks', value: stats.total, sub: 'Total Tasks', icon: <CgProfile size={24} className="text-white" /> },
          { label: 'Awaiting', value: stats.pending, sub: 'Pending', icon: <AiOutlineClockCircle size={24} className="text-white" /> },
          { label: 'Working', value: stats.inProgress, sub: 'In Progress', icon: <FaRegCheckCircle size={24} className="text-white" /> },
          { label: 'Finished', value: stats.completed, sub: 'Completed', icon: <RxCrossCircled size={24} className="text-white" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-white/5 p-5 flex items-center justify-between shadow hover:shadow-xl transition-all duration-300 min-h-[110px] sm:min-h-28 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D]">
            <div>
              <p className="text-xs sm:text-sm text-[#2C5284] dark:text-gray-300">{stat.sub}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D] dark:text-gray-100">{stat.value}</h1>
              <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.label}</p>
            </div>
            <div className="bg-[#365F8D] dark:bg-[#2C5282] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Search Task
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search title, desc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-xs"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5284]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Status
            </label>
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

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Priority
            </label>
            <Select
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={priorityOptions}
              isClearable
              placeholder="All Priorities"
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

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Deadline
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
              />
              {(selectedDate || searchTerm || statusFilter || priorityFilter) && (
                <button
                  onClick={() => { setSelectedDate(''); setSearchTerm(''); setStatusFilter(null); setPriorityFilter(null); }}
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
          
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800/30 border-2 border-dashed border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-12 text-center text-zinc-500 dark:text-zinc-400">
          <div className="mb-4 flex justify-center opacity-20">
           
          </div>
          <p className="text-sm font-bold uppercase tracking-wider">No tasks match your selection</p>
          <p className="text-[10px] text-gray-500 mt-1">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2C5294] dark:bg-white/10 text-white">
                <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Task Details</th>
                <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">Assignees</th>
                <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-center">Deadline</th>
                <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-center">Priority</th>
                <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
              {filteredTasks.map((task) => (
                <tr key={task._id} className="group hover:bg-zinc-50/80 dark:hover:bg-white/5 transition-all duration-200 border-b border-zinc-100 dark:border-white/5 last:border-0">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#2C5284] dark:group-hover:text-blue-400 transition-colors">{task.title}</span>
                      {task.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1 max-w-[200px]">{task.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center -space-x-1.5">
                      {task.assignedEmployees && task.assignedEmployees.map((emp, index) => {
                        if (index >= 3) return null;
                        return (
                          <div key={emp._id} className="w-7 h-7 rounded-full border border-white dark:border-zinc-800 bg-blue-50 dark:bg-blue-900/40 text-[#2C5284] dark:text-blue-400 flex flex-shrink-0 items-center justify-center font-bold text-[9px] overflow-hidden relative z-10 hover:z-20 transition-transform hover:scale-110 shadow-sm" title={emp.name || emp.email}>
                            {emp.profileImage ? (
                              <img
                                src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`}
                                alt={emp.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              emp.name ? emp.name.charAt(0).toUpperCase() : '?'
                            )}
                          </div>
                        );
                      })}
                      {task.assignedEmployees && task.assignedEmployees.length > 3 && (
                        <div className="w-7 h-7 rounded-full border border-white dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-300 flex items-center justify-center font-bold text-[9px] relative z-10 px-1 shadow-sm">
                          +{task.assignedEmployees.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                    {new Date(task.deadline).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${priorityColors[task.priority] || priorityColors['Medium']}`}>
                      {task.priority || 'Medium'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[task.status] || statusColors['Pending']}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => { setSelectedTask(task); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2C5284]/10 dark:bg-white/5 hover:bg-[#2C5284] text-[#2C5284] dark:text-blue-300 hover:text-white rounded-lg text-xs font-semibold transition-all group"
                        title="View Details"
                      >
                        <AiOutlineEye size={12} />
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() => { setEditingTask(task); setIsEditModalOpen(true); }}
                        className="p-1.5 text-[#2C5284] dark:text-blue-400 hover:bg-[#2C5284]/10 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                        title="Edit Task"
                      >
                        <FaRegEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                        title="Delete Task"
                      >
                        <AiOutlineDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onAdded={() => {
            setIsModalOpen(false);
            fetchTasks();
          }}
        />
      )}

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={() => {
            setEditingTask(null);
            fetchTasks();
          }}
        />
      )}
    </div>
  );
}
