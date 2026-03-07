import React from 'react';
import { FaTimes, FaCalendarAlt, FaCheckCircle, FaSpinner, FaRegClock } from 'react-icons/fa';

export default function TaskDetailsModal({ task, onClose }) {
  if (!task) return null;

  const statusConfig = {
    'Pending': { icon: <FaRegClock />, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-500/20' },
    'In Progress': { icon: <FaSpinner className="animate-spin" />, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/20' },
    'Completed': { icon: <FaCheckCircle />, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
  };

  const status = statusConfig[task.status] || statusConfig['Pending'];
  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-transparent dark:border-zinc-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{task.title}</h2>
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
              {status.icon}
              {task.status}
            </span>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full p-2 transition-colors cursor-pointer"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          
          <div className="space-y-6">
            {/* Description Section */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 uppercase tracking-wide">Description</h3>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                <p className="text-zinc-600 dark:text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {task.description || <span className="italic text-zinc-400">No description provided for this task.</span>}
                </p>
              </div>
            </div>

            {/* Meta info (Deadline) */}
            <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-700/50 w-fit">
              <FaCalendarAlt className={isOverdue ? 'text-red-500' : 'text-zinc-400'} />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 leading-none mb-1">Deadline</span>
                <span className={`text-sm font-semibold leading-none ${isOverdue ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-200'}`}>
                  {new Date(task.deadline).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  {isOverdue && ' (Overdue)'}
                </span>
              </div>
            </div>

            {/* Assigned Employees */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 uppercase tracking-wide flex items-center justify-between">
                Assigned Team
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-md text-xs">
                  {task.assignedEmployees?.length || 0} Member(s)
                </span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {task.assignedEmployees && task.assignedEmployees.length > 0 ? (
                  task.assignedEmployees.map((emp) => (
                    <div key={emp._id} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 rounded-xl hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex flex-shrink-0 items-center justify-center font-bold text-sm overflow-hidden border border-emerald-200 dark:border-emerald-800">
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
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate" title={emp.name || emp.email}>{emp.name || emp.email}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate" title={emp.designation || 'Employee'}>{emp.designation || 'Employee'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-zinc-500 text-sm italic py-2">No employees assigned.</div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/20 rounded-b-2xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium shadow-sm text-sm"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}
