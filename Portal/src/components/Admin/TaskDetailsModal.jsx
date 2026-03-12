import React from 'react';
import { FaTimes, FaCalendarAlt, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';

/**
 * Component: TaskDetailsModal
 * Description: A detailed view modal for a specific task, showing members, deadlines, and status details.
 * Why: To provide a comprehensive overview of a single task's information in one focused view.
 */
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