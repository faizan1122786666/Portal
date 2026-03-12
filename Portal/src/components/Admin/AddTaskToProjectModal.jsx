import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import { apiCreateProjectTask } from '../../api/projectAPI';

/**
 * Component: AddTaskToProjectModal
 * Description: A modal designed for adding tasks specifically within the context of a project.
 * Why: To enable precise task allocation among project members, maintaining project-centric organization.
 */
export default function AddTaskToProjectModal({ projectId, members, onClose, onAdded }) {
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: [],
    deadline: '',
    priority: 'Medium',
    status: 'Pending',
  });

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const toggleAssignee = id => {
    setForm(f => ({
      ...f,
      assignedTo: f.assignedTo.includes(id)
        ? f.assignedTo.filter(a => a !== id)
        : [...f.assignedTo, id],
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Task title is required');
    if (form.assignedTo.length === 0) return toast.error('Assign to at least one member');
    if (!form.deadline) return toast.error('Deadline is required');

    try {
      setLoading(true);
      await apiCreateProjectTask(projectId, form);
      toast.success('Task added to project!');
      onAdded();
    } catch (err) {
      toast.error(err.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto dark:border dark:border-zinc-800">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#2C5284] dark:bg-[#365f8d]/80 rounded-t-2xl">
          <div>
            <h2 className="text-base font-bold text-white">Add Task</h2>
            <p className="text-blue-200 text-[11px] mt-0.5">Assign a task to project members</p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer">
            <FaTimes size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handle}
              required
              maxLength={60}
              placeholder="e.g. Design homepage wireframe"
              className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284] outline-none text-sm transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handle}
              rows="3"
              placeholder="Describe what needs to be done..."
              className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284] outline-none text-sm transition-all resize-none"
            />
          </div>

          {/* Assign To (from project members) */}
          <div className="relative">
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Assign To <span className="text-red-500">*</span>
              <span className="ml-1 normal-case font-normal text-zinc-400">(project members only)</span>
            </label>

            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full px-4 py-2.5 border ${isDropdownOpen ? 'border-[#2C5284] ring-2 ring-[#2C5284]/30' : 'border-zinc-200 dark:border-zinc-700'} bg-white dark:bg-zinc-800 rounded-xl outline-none text-sm transition-all cursor-pointer flex justify-between items-center`}
            >
              <span className={form.assignedTo.length > 0 ? 'text-zinc-800 dark:text-zinc-200 font-medium' : 'text-zinc-400'}>
                {form.assignedTo.length > 0 ? `${form.assignedTo.length} member(s) selected` : '— Select Members —'}
              </span>
              <FaChevronDown className={`text-zinc-400 transition-transform text-xs ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden">
                <div className="max-h-48 overflow-y-auto p-1.5 space-y-0.5">
                  {members.length === 0 ? (
                    <div className="text-xs text-zinc-400 p-3 text-center">No members in this project.</div>
                  ) : (
                    members.map(emp => (
                      <label key={emp._id} className="flex items-center gap-3 p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={form.assignedTo.includes(emp._id)}
                          onChange={() => toggleAssignee(emp._id)}
                          className="w-4 h-4 text-[#2C5284] rounded border-zinc-300 focus:ring-[#2C5284] cursor-pointer"
                        />
                        <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2C5284] flex-shrink-0 flex items-center justify-center font-bold text-xs overflow-hidden">
                          {emp.profileImage ? (
                            <img
                              src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`}
                              alt={emp.name}
                              className="w-full h-full object-cover"
                            />
                          ) : emp.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{emp.name || emp.email}</p>
                          {emp.designation && <p className="text-[11px] text-zinc-400">{emp.designation}</p>}
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Deadline + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handle}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handle}
                className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284]/40 outline-none text-sm cursor-pointer"
              >
                {PRIORITY_OPTIONS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handle}
              className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284]/40 outline-none text-sm cursor-pointer"
            >
              {['Pending', 'In Progress', 'Completed'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-xl font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 px-4 py-3 bg-[#2C5284] hover:bg-[#1e3a5f] disabled:opacity-60 text-white rounded-xl font-semibold transition-colors text-sm shadow cursor-pointer">
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}