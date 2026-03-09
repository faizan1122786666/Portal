// import React from 'react';
// import { FaTimes, FaCalendarAlt, FaCheckCircle, FaSpinner, FaRegClock } from 'react-icons/fa';

// export default function TaskDetailsModal({ task, onClose }) {
//   if (!task) return null;

//   const statusConfig = {
//     'Pending': { icon: <FaRegClock />, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
//     'In Progress': { icon: <Loader size="small" className="!p-0 border-blue-600 dark:border-blue-400" />, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/20' },
//     'Completed': { icon: <FaCheckCircle />, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
//   };

//   const priorityConfig = {
//     'Low': 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400',
//     'Medium': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
//     'High': 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300',
//     'Urgent': 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300',
//   };

//   const status = statusConfig[task.status] || statusConfig['Pending'];
//   const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
//       <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-transparent dark:border-zinc-800">
        
//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] dark:bg-[#365f8d]/80 sticky top-0 z-10 rounded-t-2xl">
//           <div className="flex items-center gap-3">
//             <h2 className="text-xl font-bold text-white">{task.title}</h2>
//             <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.color}`}>
//               {status.icon}
//               {task.status}
//             </span>
//             <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${priorityConfig[task.priority] || priorityConfig['Medium']}`}>
//               {task.priority || 'Medium'} Priority
//             </span>
//           </div>
//           <button 
//             type="button" 
//             onClick={onClose}
//             className="text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
//           >
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Scrollable Content */}
//         <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          
//           <div className="space-y-6">
//             {/* Description Section */}
//             <div>
//               <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 uppercase tracking-wide">Description</h3>
//               <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-700/50 max-h-[250px] overflow-y-auto custom-scrollbar shadow-inner">
//                 <p className="text-zinc-600 dark:text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed break-words overflow-hidden">
//                   {task.description || <span className="italic text-zinc-400">No description provided for this task.</span>}
//                 </p>
//               </div>
//             </div>

//             {/* Meta info (Deadline) */}
//             <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-700/50 w-fit">
//               <FaCalendarAlt className={isOverdue ? 'text-red-500' : 'text-zinc-400'} />
//               <div className="flex flex-col">
//                 <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 leading-none mb-1">Deadline</span>
//                 <span className={`text-sm font-semibold leading-none ${isOverdue ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-200'}`}>
//                   {new Date(task.deadline).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//                   {isOverdue && ' (Overdue)'}
//                 </span>
//               </div>
//             </div>

//             {/* Assigned Employees */}
//             <div>
//               <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 uppercase tracking-wide flex items-center justify-between">
//                 Assigned Team
//                 <span className="bg-blue-50 text-[#2C5284] dark:bg-blue-900/30 dark:text-blue-300 px-2.5 py-1 rounded-lg text-xs font-bold">
//                   {task.assignedEmployees?.length || 0} Member(s)
//                 </span>
//               </h3>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {task.assignedEmployees && task.assignedEmployees.length > 0 ? (
//                   task.assignedEmployees.map((emp) => (
//                     <div key={emp._id} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 rounded-xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors">
//                       <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#2C5284] dark:text-blue-300 flex flex-shrink-0 items-center justify-center font-bold text-sm overflow-hidden border border-blue-100 dark:border-blue-800">
//                         {emp.profileImage ? (
//                           <img
//                             src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`}
//                             alt={emp.name}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           emp.name ? emp.name.charAt(0).toUpperCase() : '?'
//                         )}
//                       </div>
//                       <div className="overflow-hidden">
//                         <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate" title={emp.name || emp.email}>{emp.name || emp.email}</p>
//                         <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate" title={emp.designation || 'Employee'}>{emp.designation || 'Employee'}</p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="col-span-full text-zinc-500 text-sm italic py-2">No employees assigned.</div>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>


//       </div>
//     </div>
//   );
// }













// import React from 'react';
// import { FaTimes, FaCalendarAlt, FaCheckCircle, FaRegClock } from 'react-icons/fa';
// import { AiOutlineClockCircle } from 'react-icons/ai';

// export default function TaskDetailsModal({ task, onClose }) {
//   if (!task) return null;

//   const statusConfig = {
//     'Pending':     { icon: <FaRegClock size={10} />,          color: 'text-yellow-600 dark:text-yellow-400',    bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
//     'In Progress': { icon: <AiOutlineClockCircle size={10} />, color: 'text-blue-600 dark:text-blue-400',        bg: 'bg-blue-100 dark:bg-blue-500/20' },
//     'Completed':   { icon: <FaCheckCircle size={10} />,        color: 'text-emerald-600 dark:text-emerald-400',  bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
//   };

//   const priorityConfig = {
//     'Low':    'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400',
//     'Medium': 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300',
//     'High':   'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300',
//     'Urgent': 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300',
//   };

//   const status = statusConfig[task.status] || statusConfig['Pending'];
//   const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
//       <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-transparent dark:border-zinc-800">

//         {/* ── Header ── */}
//         <div className="flex items-center justify-between px-6 py-4 bg-[#2C5284] dark:bg-[#365f8d]/80 rounded-t-2xl flex-wrap gap-2">
//           <div className="flex items-center gap-2 flex-wrap">
//             <h2 className="text-base font-bold text-white tracking-tight">{task.title}</h2>
//             <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.color}`}>
//               {status.icon}
//               {task.status}
//             </span>
//             <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${priorityConfig[task.priority] || priorityConfig['Medium']}`}>
//               {task.priority || 'Medium'} Priority
//             </span>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer flex-shrink-0"
//           >
//             <FaTimes size={12} />
//           </button>
//         </div>

//         {/* ── Scrollable Content ── */}
//         <div className="p-5 overflow-y-auto flex-1 space-y-5">

//           {/* Description */}
//           <div>
//             <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
//               Description
//             </h3>
//             <div className="bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl p-4 max-h-[200px] overflow-y-auto">
//               <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed break-words">
//                 {task.description
//                   ? task.description
//                   : <span className="italic text-gray-400 dark:text-gray-500 text-xs">No description provided for this task.</span>
//                 }
//               </p>
//             </div>
//           </div>

//           {/* Deadline */}
//           <div>
//             <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
//               Deadline
//             </h3>
//             <div className="flex items-center gap-2 bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-3 w-fit">
//               <FaCalendarAlt className={isOverdue ? 'text-red-500' : 'text-[#2C5284] dark:text-blue-400'} size={13} />
//               <span className={`text-sm font-semibold ${isOverdue ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
//                 {new Date(task.deadline).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//                 {isOverdue && <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500">(Overdue)</span>}
//               </span>
//             </div>
//           </div>

//           {/* Assigned Team */}
//           <div>
//             <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 flex items-center justify-between">
//               Assigned Team
//               <span className="bg-[#2C5284]/10 text-[#2C5284] dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-lg text-[10px] font-bold normal-case tracking-normal">
//                 {task.assignedEmployees?.length || 0} Member(s)
//               </span>
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {task.assignedEmployees && task.assignedEmployees.length > 0 ? (
//                 task.assignedEmployees.map((emp) => (
//                   <div
//                     key={emp._id}
//                     className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors"
//                   >
//                     {/* Avatar */}
//                     <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#2C5284] dark:text-blue-300 flex flex-shrink-0 items-center justify-center font-bold text-sm overflow-hidden border border-blue-100 dark:border-blue-800">
//                       {emp.profileImage ? (
//                         <img
//                           src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`}
//                           alt={emp.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         emp.name ? emp.name.charAt(0).toUpperCase() : '?'
//                       )}
//                     </div>
//                     {/* Info */}
//                     <div className="overflow-hidden">
//                       <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight" title={emp.name || emp.email}>
//                         {emp.name || emp.email}
//                       </p>
//                       <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5" title={emp.designation || 'Employee'}>
//                         {emp.designation || 'Employee'}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="col-span-full text-xs italic text-gray-400 dark:text-gray-500 py-2">
//                   No employees assigned.
//                 </p>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }














// import React from 'react';
// import { FaTimes, FaCalendarAlt, FaCheckCircle, FaRegClock } from 'react-icons/fa';
// import { AiOutlineClockCircle } from 'react-icons/ai';

// export default function TaskDetailsModal({ task, onClose }) {
//   if (!task) return null;

//   const statusConfig = {
//     'Pending':     { icon: <FaRegClock size={10} />,           color: 'text-yellow-600 dark:text-yellow-400',   bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
//     'In Progress': { icon: <AiOutlineClockCircle size={10} />, color: 'text-blue-600 dark:text-blue-400',       bg: 'bg-blue-100 dark:bg-blue-500/20' },
//     'Completed':   { icon: <FaCheckCircle size={10} />,        color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
//   };

//   const priorityConfig = {
//     'Low':    'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
//     'Medium': 'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300 border-sky-200 dark:border-sky-500/30',
//     'High':   'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
//     'Urgent': 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30',
//   };

//   const status = statusConfig[task.status] || statusConfig['Pending'];
//   const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60 p-4">
//       <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col dark:border-zinc-800">

//         {/* ── Header — close button NEVER wraps ── */}
//         <div className="flex items-center justify-between gap-3 px-6 py-4 bg-[#2C5284] dark:bg-[#365f8d]/80 rounded-t-2xl">
//           {/* Left: title + badges — min-w-0 so it shrinks, not the X button */}
//           <div className="flex items-center gap-2 flex-wrap min-w-0">
//             <h2 className="text-sm font-bold text-white">{task.title}</h2>
//             <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${status.bg} ${status.color}`}>
//               {status.icon}
//               {task.status}
//             </span>
//             <span className={`px-2 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap ${priorityConfig[task.priority] || priorityConfig['Medium']}`}>
//               {task.priority || 'Medium'} Priority
//             </span>
//           </div>
//           {/* Right: close — flex-shrink-0 keeps it always on the same row */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="shrink-0 text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
//           >
//             <FaTimes size={14} />
//           </button>
//         </div>

//         {/* ── Scrollable Body ── */}
//         <div className="p-5 overflow-y-auto flex-1 space-y-5">

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-bold text-gray-600 dark:text-gray-500 mb-2">
//               Description
//             </label>
//             <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-4 max-h-[200px] overflow-y-auto">
//               <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed break-words">
//                 {task.description
//                   ? task.description
//                   : <span className=" text-gray-400 dark:text-gray-500 text-xs">No description provided.</span>
//                 }
//               </p>
//             </div>
//           </div>

//           {/* Deadline */}
//           <div>
//             <label className="block text-sm font-bold text-gray-600 dark:text-gray-500 mb-2">
//               Deadline
//             </label>
//             <div className="inline-flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-2.5">
//               <FaCalendarAlt size={12} className={isOverdue ? 'text-red-500' : 'text-[#2C5284] dark:text-blue-400'} />
//               <span className={`text-sm font-semibold ${isOverdue ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
//                 {new Date(task.deadline).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//               </span>
//               {isOverdue && (
//                 <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">
//                   Overdue
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Assigned Team */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-sm font-bold text-gray-600 dark:text-gray-500">
//                 Assigned Team
//               </label>
//               <span className="text-[10px] font-bold text-[#2C5284] dark:text-blue-300 bg-[#2C5284]/10 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
//                 {task.assignedEmployees?.length || 0} Member(s)
//               </span>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {task.assignedEmployees && task.assignedEmployees.length > 0 ? (
//                 task.assignedEmployees.map((emp) => (
//                   <div
//                     key={emp._id}
//                     className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors"
//                   >
//                     <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#2C5284] dark:text-blue-300 flex flex-shrink-0 items-center justify-center font-bold text-xs overflow-hidden border border-blue-100 dark:border-blue-800">
//                       {emp.profileImage ? (
//                         <img
//                           src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`}
//                           alt={emp.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         emp.name ? emp.name.charAt(0).toUpperCase() : '?'
//                       )}
//                     </div>
//                     <div className="overflow-hidden">
//                       <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight" title={emp.name || emp.email}>
//                         {emp.name || emp.email}
//                       </p>
//                       <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5" title={emp.designation || 'Employee'}>
//                         {emp.designation || 'Employee'}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="col-span-full text-xs italic text-gray-400 dark:text-gray-500 py-2">
//                   No employees assigned.
//                 </p>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }














import React from 'react';
import { FaTimes, FaCalendarAlt, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';

export default function TaskDetailsModal({ task, onClose }) {
  if (!task) return null;

  const statusConfig = {
    'Pending':     { icon: <FaRegClock size={10} />,           color: 'text-yellow-200',   bg: 'bg-yellow-400/20' },
    'In Progress': { icon: <AiOutlineClockCircle size={10} />, color: 'text-blue-200',       bg: 'bg-blue-400/20' },
    'Completed':   { icon: <FaCheckCircle size={10} />,        color: 'text-emerald-200', bg: 'bg-emerald-400/20' },
  };

  const priorityConfig = {
    'Low':    'text-zinc-200 bg-zinc-400/20',
    'Medium': 'text-sky-200 bg-sky-400/20',
    'High':   'text-orange-200 bg-orange-400/20',
    'Urgent': 'text-red-200 bg-red-400/20',
  };

  const status = statusConfig[task.status] || statusConfig['Pending'];
  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col dark:border-zinc-800">

        {/* ── Header — matching EmployeeAttendanceModal style ── */}
        <div className="bg-[#2C5284] px-5 py-4 rounded-t-2xl flex items-start justify-between gap-2">
          <div>
            <h2 className="text-[17px] font-bold text-white leading-snug">
              {task.title}
            </h2>
            <p className="text-blue-200 text-[11px] mt-0.5">
              Task Details
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
            {/* Status Badge - transparent style */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${status.bg} ${status.color}`}>
              {status.icon}
              {task.status}
            </span>

            {/* Priority Badge - transparent style */}
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold ${priorityConfig[task.priority] || priorityConfig['Medium']}`}>
              {task.priority || 'Medium'} Priority
            </span>

            <button
              onClick={onClose}
              className="text-white hover:bg-white/15 rounded-full p-1.5 transition-colors"
            >
              <FaTimes size={15} />
            </button>
          </div>
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
                  : <span className=" text-gray-400 dark:text-gray-500 text-xs">No description provided.</span>
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

        </div>
      </div>
    </div>
  );
}