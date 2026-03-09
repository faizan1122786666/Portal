// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import { apiGetMyTasks, apiUpdateTaskStatus } from '../../api/taskAPI';
// import { toast } from 'react-toastify';
// import { AiOutlineClockCircle } from 'react-icons/ai';
// import { FaPlus, FaRegCheckCircle } from 'react-icons/fa';
// import { RxCrossCircled } from 'react-icons/rx';
// import { CgProfile } from 'react-icons/cg';
// import { AiOutlineEye } from 'react-icons/ai';
// import TaskDetailsModal from '../../components/Admin/TaskDetailsModal';
// import Loader from '../../components/common/Loader';

// export default function EmployeeTasks({ setTitle }) {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState(null);
//   const [selectedTask, setSelectedTask] = useState(null);

//   const statusOptions = [
//     { value: 'Pending', label: 'Pending' },
//     { value: 'In Progress', label: 'In Progress' },
//     { value: 'Completed', label: 'Completed' },
//   ];

//   useEffect(() => {
//     setTitle('My Tasks');
//     fetchTasks();
//   }, [setTitle]);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await apiGetMyTasks();
//       setTasks(res.tasks || []);
//     } catch (err) {
//       toast.error(err.message || 'Failed to fetch your tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await apiUpdateTaskStatus(id, newStatus);
//       toast.success('Task status updated');
//       setTasks((prev) =>
//         prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
//       );
//     } catch (err) {
//       toast.error(err.message || 'Error updating status');
//     }
//   };

//   const filteredTasks = tasks.filter(task => {
//     const matchesSearch =
//       task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     const matchesStatus = !statusFilter || task.status === statusFilter.value;
    
//     return matchesSearch && matchesStatus;
//   });

//   const statusColors = {
//     'Pending': 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/20',
//     'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 border-blue-200 dark:border-blue-500/20',
//     'Completed': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20',
//   };

//   const priorityColors = {
//     'Low': 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
//     'Medium': 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
//     'High': 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300',
//     'Urgent': 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300',
//   };

//   return (
//     <div className="p-4 bg-gray-50/30 dark:bg-transparent min-h-screen">
//       <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300 tracking-tight">My Tasks</h2>
//           <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Your Assigned Workload</p>
//         </div>
//       </div>

//       {/* Task Summary Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//         {[
//           { label: 'Total', value: tasks.length, sub: 'Assigned', icon: <CgProfile size={24} className="text-white" /> },
//           { label: 'Working', value: tasks.filter(t => t.status === 'In Progress').length, sub: 'In Progress', icon: <AiOutlineClockCircle size={24} className="text-white" /> },
//           { label: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, sub: 'Finished', icon: <FaRegCheckCircle size={24} className="text-white" /> },
//         ].map((s, i) => (
//           <div key={i} className="bg-white dark:bg-white/5 p-5 flex items-center justify-between shadow hover:shadow-xl transition-all duration-300 min-h-[110px] sm:min-h-28 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D]">
//             <div>
//               <p className="text-xs sm:text-sm text-[#2C5284] dark:text-gray-300">{s.sub}</p>
//               <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D] dark:text-gray-100">{s.value}</h1>
//               <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1">{s.label}</p>
//             </div>
//             <div className="bg-[#365F8D] dark:bg-[#2C5282] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
//               {s.icon}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
//               Search My Tasks
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search title, description..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-xs"
//               />
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5284]">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
//               Filter by Status
//             </label>
//             <div className="flex items-center gap-2">
//               <div className="flex-1">
//                 <Select
//                   value={statusFilter}
//                   onChange={setStatusFilter}
//                   options={statusOptions}
//                   isClearable
//                   placeholder="All Statuses"
//                   className="react-select-container text-xs"
//                   classNamePrefix="react-select"
//                   styles={{
//                     control: (base, state) => ({
//                       ...base,
//                       backgroundColor: 'transparent',
//                       borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
//                       borderRadius: '0.5rem',
//                       minHeight: '38px',
//                       boxShadow: state.isFocused ? '0 0 0 1px #2C5284' : 'none',
//                       '&:hover': { borderColor: '#2C5284' },
//                     }),
//                     option: (base, state) => ({
//                       ...base,
//                       backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.1)' : 'transparent',
//                       color: state.isSelected ? 'white' : 'inherit',
//                       '&:active': { backgroundColor: '#2C5284' }
//                     })
//                   }}
//                 />
//               </div>
//               {(searchTerm || statusFilter) && (
//                 <button
//                   onClick={() => { setSearchTerm(''); setStatusFilter(null); }}
//                   className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-1 transition-colors"
//                   title="Clear Filters"
//                 >
//                   <FaPlus className="rotate-45" size={12} />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex flex-col items-center justify-center py-20 text-zinc-500 dark:text-zinc-400">
//           <Loader size="medium" />
//           <span className="text-xs font-bold uppercase tracking-widest mt-2">Loading tasks...</span>
//         </div>
//       ) : filteredTasks.length === 0 ? (
//         <div className="bg-white dark:bg-zinc-800/30 border-2 border-dashed border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-12 text-center text-zinc-500 dark:text-zinc-400">
//           <div className="mb-4 flex justify-center opacity-20">
//             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
//           </div>
//           <p className="text-sm font-bold uppercase tracking-wider">No tasks match your filter</p>
//           <p className="text-[10px] text-gray-400 mt-1">Try changing your filters or search term.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//           {filteredTasks.map((task) => (
//             <div key={task._id} className="bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full hover:translate-y-[-2px]">
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex-grow pr-2">
//                   <div className="flex justify-between items-center mb-1">
//                     <h3 className="font-bold text-sm text-zinc-800 dark:text-gray-100 group-hover:text-[#2C5284] dark:group-hover:text-blue-400 transition-colors leading-tight">
//                       {task.title}
//                     </h3>
//                     <button
//                       onClick={() => setSelectedTask(task)}
//                       className="text-[#2C5284] dark:text-blue-400 hover:bg-[#2C5284]/10 p-1.5 rounded-lg transition-all"
//                       title="View Details"
//                     >
//                       <AiOutlineEye size={16} />
//                     </button>
//                   </div>
//                   <div className="flex items-center gap-2 mt-2">
//                     <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${priorityColors[task.priority] || priorityColors['Medium']}`}>
//                       {task.priority || 'Medium'}
//                     </span>
//                     <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${statusColors[task.status] || statusColors['Pending']}`}>
//                       {task.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-[11px] text-zinc-500 dark:text-gray-400 mb-5 flex-grow italic leading-relaxed line-clamp-3">
//                 {task.description || 'No description provided.'}
//               </p>

//               <div className="pt-4 border-t border-zinc-50 dark:border-white/5 mt-auto flex flex-col gap-3">
//                 <div className="flex justify-between items-center text-[10px] font-bold">
//                   <span className="text-gray-400 dark:text-gray-500 uppercase tracking-wider">Deadline</span>
//                   <span className={`${new Date(task.deadline) < new Date() && task.status !== 'Completed' ? 'text-red-500' : 'text-zinc-700 dark:text-gray-300'} bg-zinc-50 dark:bg-white/5 px-2 py-1 rounded-lg`}>
//                     {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <select
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                     className="w-full bg-[#2C5284] hover:bg-[#1e3a5f] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl py-2.5 px-3 transition-all cursor-pointer outline-none shadow-md shadow-[#2C5284]/10"
//                   >
//                     <option value="Pending">Mark as Pending</option>
//                     <option value="In Progress">Move to In Progress</option>
//                     <option value="Completed">Set as Completed</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedTask && (
//         <TaskDetailsModal
//           task={selectedTask}
//           onClose={() => setSelectedTask(null)}
//         />
//       )}
//     </div>
//   );
// }












import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { apiGetMyTasks, apiUpdateTaskStatus } from '../../api/taskAPI';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineDelete, AiOutlineClockCircle } from 'react-icons/ai';
import { FaPlus, FaRegCheckCircle, FaTimes, FaCalendarAlt, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineClockCircle as AiClock } from 'react-icons/ai';
import Loader from '../../components/common/Loader';

// ── Task Details Modal ────────────────────────────────────────────────────────
function TaskDetailsModal({ task, onClose, onStatusChange }) {
  const [status, setStatus] = useState(task?.status || 'Pending');
  const [saving, setSaving] = useState(false);

  const statusOptions = [
    { value: 'Pending',     label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed',   label: 'Completed' },
  ];

  const statusConfig = {
    'Pending':     { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-500/20', icon: <FaRegClock size={10} /> },
    'In Progress': { color: 'text-blue-600 dark:text-blue-400',     bg: 'bg-blue-100 dark:bg-blue-500/20',     icon: <AiClock size={10} /> },
    'Completed':   { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/20', icon: <FaCheckCircle size={10} /> },
  };

  const priorityConfig = {
    'Low':    'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
    'Medium': 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
    'High':   'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
    'Urgent': 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30',
  };

  if (!task) return null;

  const cfg = statusConfig[status] || statusConfig['Pending'];
  const isOverdue = new Date(task.deadline) < new Date() && status !== 'Completed';

  const handleSave = async () => {
    if (status === task.status) { onClose(); return; }
    setSaving(true);
    try {
      await onStatusChange(task._id, status);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-transparent dark:border-zinc-800">

        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-[#2C5284] dark:bg-[#365f8d]/80 rounded-t-2xl">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h2 className="text-sm font-bold text-white">{task.title}</h2>
            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${cfg.bg} ${cfg.color}`}>
              {cfg.icon} {status}
            </span>
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap ${priorityConfig[task.priority] || priorityConfig['Medium']}`}>
              {task.priority || 'Medium'} Priority
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-500 mb-2">
              Description
            </label>
            <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-4 max-h-[200px] overflow-y-auto">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed break-words">
                {task.description
                  ? task.description
                  : <span className="text-gray-400 dark:text-gray-500 text-xs">No description provided.</span>
                }
              </p>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-500 mb-2">
              Deadline
            </label>
            <div className="inline-flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-2.5">
              <FaCalendarAlt size={12} className={isOverdue ? 'text-red-500' : 'text-[#2C5284] dark:text-blue-400'} />
              <span className={`text-sm font-semibold ${isOverdue ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
                {new Date(task.deadline).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {isOverdue && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">
                  Overdue
                </span>
              )}
            </div>
          </div>

          {/* Assigned Team */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-500">
                Assigned Team
              </label>
              <span className="text-[10px] font-bold text-[#2C5284] dark:text-blue-300 bg-[#2C5284]/10 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                {task.assignedEmployees?.length || 0} Member(s)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {task.assignedEmployees && task.assignedEmployees.length > 0 ? (
                task.assignedEmployees.map((emp) => (
                  <div
                    key={emp._id}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#2C5284] dark:text-blue-300 flex flex-shrink-0 items-center justify-center font-bold text-xs overflow-hidden border border-blue-100 dark:border-blue-800">
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
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight" title={emp.name || emp.email}>
                        {emp.name || emp.email}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5" title={emp.designation || 'Employee'}>
                        {emp.designation || 'Employee'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-xs italic text-gray-400 dark:text-gray-500 py-2">
                  No employees assigned.
                </p>
              )}
            </div>
          </div>

          {/* ── Update Status ── */}
          <div>
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-500 mb-2">
              Update Status
            </label>
            <Select
              value={statusOptions.find(o => o.value === status)}
              onChange={(opt) => opt && setStatus(opt.value)}
              options={statusOptions}
              className="react-select-container text-sm"
              classNamePrefix="react-select"
              menuPortalTarget={document.body}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: state.isFocused ? '#2C5284' : 'var(--select-border, #d1d5db)',
                  borderRadius: '0.5rem',
                  padding: '2px',
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(44,82,132,0.2)' : 'none',
                  '&:hover': { borderColor: '#2C5284' },
                }),
                singleValue: (base) => ({ ...base, color: 'inherit' }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.08)' : 'transparent',
                  color: state.isSelected ? 'white' : 'inherit',
                  cursor: 'pointer',
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: 'var(--select-bg, white)',
                  border: '1px solid var(--select-border, #e5e7eb)',
                  zIndex: 9999,
                }),
              }}
            />
          </div>

        </div>

        {/* ── Footer Buttons ── */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-3 bg-[#2C5284] hover:bg-[#1e3a5f] disabled:bg-[#2C5284]/50 text-white rounded-lg font-medium transition-colors text-sm shadow cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function EmployeeTasks({ setTitle }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const statusOptions = [
    { value: 'Pending',     label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed',   label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'Low',    label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High',   label: 'High' },
    { value: 'Urgent', label: 'Urgent' },
  ];

  const selectStyles = {
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
      '&:active': { backgroundColor: '#2C5284' },
    }),
  };

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
      setTasks(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));
      // also update selectedTask if open
      setSelectedTask(prev => prev && prev._id === id ? { ...prev, status: newStatus } : prev);
    } catch (err) {
      toast.error(err.message || 'Error updating status');
    }
  };

  const statusColors = {
    'Pending':     'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/30',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
    'Completed':   'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  };

  const priorityColors = {
    'Low':    'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
    'Medium': 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
    'High':   'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
    'Urgent': 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30',
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus   = !statusFilter   || task.status   === statusFilter.value;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter.value;
    const matchesDate     = !selectedDate   || (task.deadline && task.deadline.startsWith(selectedDate));
    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });

  const stats = {
    total:      tasks.length,
    pending:    tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed:  tasks.filter(t => t.status === 'Completed').length,
  };

  // identical stat card spec to AdminTasks
  const statCards = [
    { sub: 'Total Tasks',  value: stats.total,      icon: <CgProfile size={20} className="text-white" /> },
    { sub: 'Pending',      value: stats.pending,    icon: <AiOutlineClockCircle size={20} className="text-white" /> },
    { sub: 'In Progress',  value: stats.inProgress, icon: <FaRegCheckCircle size={20} className="text-white" /> },
    { sub: 'Completed',    value: stats.completed,  icon: <RxCrossCircled size={20} className="text-white" /> },
  ];

  const hasFilter = searchTerm || statusFilter || priorityFilter || selectedDate;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300 tracking-tight">
          My Tasks
        </h2>
      </div>

      {/* ── Stat Cards — p-4 / text-xl sm:text-2xl / w-9 h-9 sm:w-10 sm:h-10 / size=20 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition duration-300"
          >
            <div>
              <p className="text-xs text-[#2C5284] dark:text-gray-300">{card.sub}</p>
              <h1 className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-blue-300">{card.value}</h1>
            </div>
            <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Search & Filters ── */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Search Task</label>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Status</label>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              isClearable
              placeholder="All Statuses"
              className="react-select-container text-xs"
              classNamePrefix="react-select"
              styles={selectStyles}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Priority</label>
            <Select
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={priorityOptions}
              isClearable
              placeholder="All Priorities"
              className="react-select-container text-xs"
              classNamePrefix="react-select"
              styles={selectStyles}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Deadline</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
              />
              {hasFilter && (
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

      {/* ── Table / Loader / Empty ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500 dark:text-zinc-400">
          <Loader size="medium" />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800/30 border-2 border-dashed border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-12 text-center text-zinc-500 dark:text-zinc-400">
          <p className="text-sm font-bold uppercase tracking-wider">No tasks match your selection</p>
          <p className="text-[10px] text-gray-500 mt-1">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden overflow-x-auto">
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
                  <tr
                    key={task._id}
                    className="group hover:bg-zinc-50/80 dark:hover:bg-white/5 transition-all duration-200 border-b border-zinc-100 dark:border-white/5 last:border-0"
                  >
                    {/* Task Details */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#2C5284] dark:group-hover:text-blue-400 transition-colors">
                          {task.title}
                        </span>
                        {task.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1 max-w-[200px]">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Assignees */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center -space-x-1.5">
                        {task.assignedEmployees && task.assignedEmployees.map((emp, index) => {
                          if (index >= 3) return null;
                          return (
                            <div
                              key={emp._id}
                              title={emp.name || emp.email}
                              className="w-7 h-7 rounded-full border border-white dark:border-zinc-800 bg-blue-50 dark:bg-blue-900/40 text-[#2C5284] dark:text-blue-400 flex flex-shrink-0 items-center justify-center font-bold text-[9px] overflow-hidden relative z-10 hover:z-20 transition-transform hover:scale-110 shadow-sm"
                            >
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

                    {/* Deadline */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                      <span className={new Date(task.deadline) < new Date() && task.status !== 'Completed' ? 'text-red-500 font-semibold' : ''}>
                        {new Date(task.deadline).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${priorityColors[task.priority] || priorityColors['Medium']}`}>
                        {task.priority || 'Medium'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[task.status] || statusColors['Pending']}`}>
                        {task.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2C5284]/10 dark:bg-white/5 hover:bg-[#2C5284] text-[#2C5284] dark:text-blue-300 hover:text-white rounded-lg text-xs font-semibold transition-all"
                          title="View & Update"
                        >
                          <AiOutlineEye size={12} />
                          <span>Details</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredTasks.map((task) => {
              const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';
              return (
                <div
                  key={task._id}
                  className="bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5"
                >
                  {/* Card Header */}
                  <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">{task.title}</p>
                      {task.description && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-1">{task.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[task.status] || statusColors['Pending']}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Priority</p>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${priorityColors[task.priority] || priorityColors['Medium']}`}>
                          {task.priority || 'Medium'}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Deadline</p>
                        <p className={`text-sm font-medium ${isOverdue ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                          {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          {isOverdue && <span className="ml-1 text-[9px]">(Overdue)</span>}
                        </p>
                      </div>
                    </div>

                    {/* Assignees */}
                    {task.assignedEmployees && task.assignedEmployees.length > 0 && (
                      <div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Team</p>
                        <div className="flex items-center -space-x-1.5">
                          {task.assignedEmployees.slice(0, 4).map((emp) => (
                            <div
                              key={emp._id}
                              title={emp.name || emp.email}
                              className="w-6 h-6 rounded-full border border-white dark:border-zinc-800 bg-blue-50 dark:bg-blue-900/40 text-[#2C5284] dark:text-blue-400 flex flex-shrink-0 items-center justify-center font-bold text-[8px] overflow-hidden shadow-sm"
                            >
                              {emp.profileImage ? (
                                <img src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`} alt={emp.name} className="w-full h-full object-cover" />
                              ) : (
                                emp.name ? emp.name.charAt(0).toUpperCase() : '?'
                              )}
                            </div>
                          ))}
                          {task.assignedEmployees.length > 4 && (
                            <div className="w-6 h-6 rounded-full border border-white bg-zinc-100 dark:bg-zinc-700 text-zinc-500 flex items-center justify-center font-bold text-[8px] shadow-sm">
                              +{task.assignedEmployees.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action */}
                    <div className="pt-3 border-t border-gray-50 dark:border-white/5">
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2C5284]/10 dark:bg-white/5 hover:bg-[#2C5284] text-[#2C5284] dark:text-blue-300 hover:text-white rounded-lg text-xs font-semibold transition-all"
                      >
                        <AiOutlineEye size={14} />
                        View Details & Update Status
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── Task Details Modal ── */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}