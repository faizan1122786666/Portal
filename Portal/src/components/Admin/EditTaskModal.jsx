import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import { apiUpdateTaskInfo } from '../../api/taskAPI';

const adminApi = axios.create({
  baseURL: 'http://localhost:3000/api/admin',
  withCredentials: true,
});

export default function EditTaskModal({ task, onClose, onUpdated }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    assignedEmployees: task?.assignedEmployees?.map(e => typeof e === 'object' ? e._id : e) || [],
    deadline: task?.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '',
  });
  const [loading, setLoading] = useState(false);
  const [fetchingEmp, setFetchingEmp] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchEmployees();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await adminApi.get('/employees');
      // Only keep employees (not admins)
      const empsOnly = (res.data.employees || []).filter((e) => e.role === 'employee');
      setEmployees(empsOnly);
    } catch (err) {
      toast.error('Failed to load employees for assignment.');
    } finally {
      setFetchingEmp(false);
    }
  };

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || form.assignedEmployees.length === 0 || !form.deadline) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      await apiUpdateTaskInfo(task._id, form);
      toast.success('Task updated successfully');
      onUpdated();
    } catch (err) {
      toast.error(err.message || 'Error updating task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-transparent dark:border-zinc-800">

        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-emerald-600 dark:bg-emerald-700/80 rounded-t-2xl">
          <h2 className="text-lg font-bold text-white">Edit Task</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Task Title */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handle}
              required
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 outline-none text-sm transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handle}
              rows="3"
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 outline-none text-sm transition-colors resize-none"
            />
          </div>

          {/* Assign To (Employee Selection Dropdown) */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Assign To <span className="text-red-500">*</span>
            </label>
            
            <div 
              onClick={() => !fetchingEmp && setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full px-4 py-2.5 border ${isDropdownOpen ? 'border-emerald-500 ring-2 ring-emerald-500/50' : 'border-zinc-300 dark:border-zinc-700'} bg-white dark:bg-zinc-800 rounded-lg outline-none text-sm transition-colors cursor-pointer flex justify-between items-center`}
            >
              <span className={form.assignedEmployees.length > 0 ? "text-zinc-800 dark:text-zinc-200 font-medium" : "text-zinc-400"}>
                {fetchingEmp ? 'Loading employees...' : 
                 form.assignedEmployees.length > 0 ? `${form.assignedEmployees.length} employee(s) selected` : '— Select Employees —'}
              </span>
              <FaChevronDown className={`text-zinc-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl shadow-black/5 overflow-hidden">
                <div className="max-h-56 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {employees.length === 0 ? (
                    <div className="text-zinc-500 text-sm p-3 text-center">No employees found.</div>
                  ) : (
                    employees.map((emp) => (
                      <label key={emp._id} className="flex items-center gap-3 p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 rounded-md cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-emerald-600 bg-zinc-100 border-zinc-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600 cursor-pointer"
                          checked={form.assignedEmployees.includes(emp._id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setForm(prev => {
                              const ids = prev.assignedEmployees;
                              return {
                                ...prev,
                                assignedEmployees: checked ? [...ids, emp._id] : ids.filter(id => id !== emp._id)
                              };
                            });
                          }}
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex flex-shrink-0 items-center justify-center font-bold text-xs overflow-hidden">
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
                          <div>
                            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-tight">{emp.name || emp.email}</div>
                            {emp.designation && <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{emp.designation}</div>}
                          </div>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handle}
              required
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 outline-none text-sm transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white rounded-lg font-medium transition-colors text-sm shadow cursor-pointer"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
