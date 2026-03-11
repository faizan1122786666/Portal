import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import Select from 'react-select';
import { apiUpdateProject } from '../../api/projectAPI';

const adminApi = axios.create({
  baseURL: 'http://localhost:3000/api/admin',
  withCredentials: true,
});

const STATUS_OPTIONS = ['Planning', 'Active', 'On Hold', 'Completed'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];

export default function EditProjectModal({ project, onClose, onUpdated }) {
  const [employees, setEmployees] = useState([]);
  const [fetchingEmp, setFetchingEmp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: project?.name || '',
    description: project?.description || '',
    members: project?.members?.map(m => typeof m === 'object' ? m._id : m) || [],
    deadline: project?.deadline ? new Date(project.deadline).toISOString().split('T')[0] : '',
    priority: project?.priority || 'Medium',
    status: project?.status || 'Planning',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await adminApi.get('/employees');
      setEmployees((res.data.employees || []).filter(e => e.role === 'employee'));
    } catch {
      toast.error('Failed to load employees.');
    } finally {
      setFetchingEmp(false);
    }
  };

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // Generate options for react-select
  const employeeOptions = employees.map(emp => ({
    value: emp._id,
    label: emp.name || emp.email,
    profileImage: emp.profileImage,
    designation: emp.designation,
  }));

  const handleSelectChange = (selectedOptions) => {
    setForm(f => ({
      ...f,
      members: selectedOptions ? selectedOptions.map(opt => opt.value) : []
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Project name is required');
    if (!form.deadline) return toast.error('Deadline is required');

    try {
      setLoading(true);
      await apiUpdateProject(project._id, form);
      toast.success('Project updated!');
      onUpdated();
    } catch (err) {
      toast.error(err.message || 'Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto dark:border dark:border-zinc-800">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#2C5284] dark:bg-[#365f8d]/80 rounded-t-2xl">
          <div>
            <h2 className="text-base font-bold text-white">Edit Project</h2>
            <p className="text-blue-200 text-[11px] mt-0.5 truncate max-w-[260px]">{project?.name}</p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer">
            <FaTimes size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Project Name */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handle}
              required
              maxLength={50}
              className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284]/40 focus:border-[#2C5284] outline-none text-sm transition-all"
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
              className="w-full px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284]/40 focus:border-[#2C5284] outline-none text-sm transition-all resize-none"
            />
          </div>

          {/* Team Members */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Team Members
            </label>
            {fetchingEmp ? (
              <div className="text-xs text-zinc-400 py-3">Loading employees...</div>
            ) : (
              <Select
                isMulti
                options={employeeOptions}
                value={employeeOptions.filter(opt => form.members.includes(opt.value))}
                onChange={handleSelectChange}
                placeholder="Select team members..."
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    borderColor: 'inherit',
                    borderRadius: '0.75rem',
                    padding: '0.15rem',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: 'inherit'
                    }
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    zIndex: 9999
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(44, 82, 132, 0.1)',
                    borderRadius: '0.5rem',
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: '#2C5284',
                    fontWeight: 600,
                  })
                }}
                className="w-full border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm transition-all rounded-xl dark:text-black"
              />
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
                className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284]/40 outline-none text-sm"
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
              className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl focus:ring-2 focus:ring-[#2C5284]/40 focus:border-[#2C5284] outline-none text-sm transition-all cursor-pointer"
            >
              {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
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
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}