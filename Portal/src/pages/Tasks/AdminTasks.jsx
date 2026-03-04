import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineSearch,
    AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineExclamationCircle
} from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';

const API = 'http://localhost:5000/api';

// ── Priority badge ─────────────────────────────────────────────────────────────
function PriorityBadge({ priority }) {
    const map = {
        High: 'bg-red-100   text-red-700   dark:bg-red-900/40   dark:text-red-300   border border-red-200   dark:border-red-700',
        Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700',
        Low: 'bg-green-100  text-green-700  dark:bg-green-900/40  dark:text-green-300  border border-green-200  dark:border-green-700',
    };
    return (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[priority] || ''}`}>
            {priority}
        </span>
    );
}

// ── Status badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const map = {
        Pending: 'bg-orange-100  text-orange-700  dark:bg-orange-900/40  dark:text-orange-300  border border-orange-200  dark:border-orange-700',
        'In Progress': 'bg-blue-100    text-blue-700    dark:bg-blue-900/40    dark:text-blue-300    border border-blue-200    dark:border-blue-700',
        Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700',
    };
    return (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] || ''}`}>
            {status}
        </span>
    );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function TaskModal({ task, employees, onClose, onSave }) {
    const [form, setForm] = useState({
        assignedTo: task?.assignedTo?._id || '',
        title: task?.title || '',
        description: task?.description || '',
        priority: task?.priority || 'Medium',
        dueDate: task?.dueDate || '',
        status: task?.status || 'Pending',
        adminNote: task?.adminNote || '',
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave(form);
        } finally {
            setSaving(false);
        }
    };

    const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
    const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                        <FaTasks className="text-blue-600 dark:text-blue-400" size={18} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        {task ? 'Edit Task' : 'Assign New Task'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Employee */}
                    <div>
                        <label className={labelCls}>Assign To <span className="text-red-500">*</span></label>
                        <select name="assignedTo" value={form.assignedTo} onChange={handleChange} required className={inputCls}>
                            <option value="">Select employee…</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>
                                    {emp.name || emp.email} {emp.department ? `(${emp.department})` : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className={labelCls}>Title <span className="text-red-500">*</span></label>
                        <input name="title" value={form.title} onChange={handleChange} required maxLength={100}
                            placeholder="e.g. Prepare monthly report" className={inputCls} />
                    </div>

                    {/* Description */}
                    <div>
                        <label className={labelCls}>Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                            placeholder="Task details…" className={`${inputCls} resize-none`} />
                    </div>

                    {/* Priority + Due Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Priority</label>
                            <select name="priority" value={form.priority} onChange={handleChange} className={inputCls}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Due Date <span className="text-red-500">*</span></label>
                            <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required className={inputCls} />
                        </div>
                    </div>

                    {/* Status (only when editing) */}
                    {task && (
                        <div>
                            <label className={labelCls}>Status</label>
                            <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    )}

                    {/* Admin Note */}
                    <div>
                        <label className={labelCls}>Admin Note <span className="text-gray-400 font-normal">(optional)</span></label>
                        <textarea name="adminNote" value={form.adminNote} onChange={handleChange} rows={2}
                            placeholder="Any additional notes for the employee…" className={`${inputCls} resize-none`} />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving}
                            className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-50">
                            {saving ? 'Saving…' : (task ? 'Save Changes' : 'Assign Task')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── Confirm Delete Modal ──────────────────────────────────────────────────────
function ConfirmDeleteModal({ task, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                        <AiOutlineExclamationCircle className="text-red-600 dark:text-red-400" size={22} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Delete Task</h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Are you sure you want to delete <span className="font-semibold text-gray-800 dark:text-gray-200">"{task.title}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm}
                        className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main AdminTasks page ──────────────────────────────────────────────────────
export default function AdminTasks({ setTitle }) {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null); // null | { mode: 'create'|'edit', task? }
    const [delTarget, setDelTarget] = useState(null);

    // Filters
    const [searchQ, setSearchQ] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterEmp, setFilterEmp] = useState('');

    useEffect(() => { setTitle('Tasks'); }, [setTitle]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const params = {};
            if (filterStatus) params.status = filterStatus;
            if (filterPriority) params.priority = filterPriority;
            if (filterEmp) params.employeeId = filterEmp;
            const res = await axios.get(`${API}/admin/tasks`, { params, withCredentials: true });
            setTasks(res.data.tasks || []);
        } catch {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${API}/admin/employees`, { withCredentials: true });
            setEmployees((res.data.employees || []).filter(e => e.role === 'employee'));
        } catch {
            toast.error('Failed to load employees');
        }
    };

    useEffect(() => { fetchTasks(); }, [filterStatus, filterPriority, filterEmp]);
    useEffect(() => { fetchEmployees(); }, []);

    const handleSave = async (form) => {
        try {
            if (modal.mode === 'create') {
                await axios.post(`${API}/admin/tasks`, form, { withCredentials: true });
                toast.success('Task assigned successfully!');
            } else {
                await axios.put(`${API}/admin/tasks/${modal.task._id}`, form, { withCredentials: true });
                toast.success('Task updated!');
            }
            setModal(null);
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API}/admin/tasks/${delTarget._id}`, { withCredentials: true });
            toast.success('Task deleted');
            setDelTarget(null);
            fetchTasks();
        } catch {
            toast.error('Failed to delete task');
        }
    };

    // Client-side search filter
    const displayed = tasks.filter(t => {
        if (!searchQ) return true;
        const q = searchQ.toLowerCase();
        return (
            t.title?.toLowerCase().includes(q) ||
            t.assignedTo?.name?.toLowerCase().includes(q) ||
            t.assignedTo?.email?.toLowerCase().includes(q)
        );
    });

    // Stats
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === 'Pending').length;
    const inProg = tasks.filter(t => t.status === 'In Progress').length;
    const completed = tasks.filter(t => t.status === 'Completed').length;

    const statCards = [
        { label: 'Total Tasks', value: total, color: 'bg-blue-50  dark:bg-blue-900/20  border-blue-200  dark:border-blue-700', textColor: 'text-blue-600  dark:text-blue-400' },
        { label: 'Pending', value: pending, color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700', textColor: 'text-orange-600 dark:text-orange-400' },
        { label: 'In Progress', value: inProg, color: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700', textColor: 'text-indigo-600 dark:text-indigo-400' },
        { label: 'Completed', value: completed, color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700', textColor: 'text-emerald-600 dark:text-emerald-400' },
    ];

    return (
        <div className="py-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <FaTasks className="text-blue-600" /> Task Management
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Assign and track tasks for your team</p>
                </div>
                <button
                    onClick={() => setModal({ mode: 'create' })}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-md shadow-blue-200 dark:shadow-none">
                    <AiOutlinePlus size={18} /> Assign Task
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map(s => (
                    <div key={s.label} className={`rounded-xl border p-4 ${s.color}`}>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{s.label}</p>
                        <p className={`text-3xl font-bold mt-1 ${s.textColor}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                        <input
                            value={searchQ} onChange={e => setSearchQ(e.target.value)}
                            placeholder="Search by title or employee…"
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Employee filter */}
                    <select value={filterEmp} onChange={e => setFilterEmp(e.target.value)}
                        className="py-2 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">All Employees</option>
                        {employees.map(e => (
                            <option key={e._id} value={e._id}>{e.name || e.email}</option>
                        ))}
                    </select>

                    {/* Status filter */}
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                        className="py-2 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">All Statuses</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>

                    {/* Priority filter */}
                    <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}
                        className="py-2 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">All Priorities</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center gap-3 text-gray-400">
                        <AiOutlineClockCircle size={40} className="animate-spin" />
                        <p className="text-sm">Loading tasks…</p>
                    </div>
                ) : displayed.length === 0 ? (
                    <div className="py-20 flex flex-col items-center gap-3 text-gray-400">
                        <FaTasks size={40} />
                        <p className="text-sm font-medium">No tasks found</p>
                        <button onClick={() => setModal({ mode: 'create' })}
                            className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:underline">
                            <AiOutlinePlus /> Assign your first task
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                                    {['Employee', 'Task', 'Priority', 'Due Date', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {displayed.map(task => {
                                    const overdue = task.status !== 'Completed' && task.dueDate < new Date().toISOString().slice(0, 10);
                                    return (
                                        <tr key={task._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                                            {/* Employee */}
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-gray-800 dark:text-gray-100">
                                                    {task.assignedTo?.name || '—'}
                                                </p>
                                                <p className="text-xs text-gray-400">{task.assignedTo?.email}</p>
                                            </td>

                                            {/* Task */}
                                            <td className="px-4 py-3 max-w-xs">
                                                <p className="font-medium text-gray-800 dark:text-gray-100 truncate">{task.title}</p>
                                                {task.description && (
                                                    <p className="text-xs text-gray-400 truncate">{task.description}</p>
                                                )}
                                            </td>

                                            {/* Priority */}
                                            <td className="px-4 py-3">
                                                <PriorityBadge priority={task.priority} />
                                            </td>

                                            {/* Due Date */}
                                            <td className="px-4 py-3">
                                                <span className={`text-sm font-medium ${overdue ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                    {task.dueDate}
                                                </span>
                                                {overdue && (
                                                    <p className="text-[10px] text-red-500 font-semibold mt-0.5">OVERDUE</p>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3">
                                                <StatusBadge status={task.status} />
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => setModal({ mode: 'edit', task })}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                                                        title="Edit task">
                                                        <AiOutlineEdit size={17} />
                                                    </button>
                                                    <button onClick={() => setDelTarget(task)}
                                                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                                        title="Delete task">
                                                        <AiOutlineDelete size={17} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modals */}
            {modal && (
                <TaskModal
                    task={modal.task || null}
                    employees={employees}
                    onClose={() => setModal(null)}
                    onSave={handleSave}
                />
            )}
            {delTarget && (
                <ConfirmDeleteModal
                    task={delTarget}
                    onClose={() => setDelTarget(null)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
}
