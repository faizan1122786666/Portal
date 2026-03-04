import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineCalendar,
    AiOutlineFileText, AiOutlineExclamationCircle
} from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';

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

// ── Task Card ─────────────────────────────────────────────────────────────────
function TaskCard({ task, onMarkComplete }) {
    const today = new Date().toISOString().slice(0, 10);
    const overdue = task.status !== 'Completed' && task.dueDate < today;
    const [marking, setMarking] = useState(false);

    const handleMark = async () => {
        setMarking(true);
        try {
            await onMarkComplete(task._id);
        } finally {
            setMarking(false);
        }
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl border shadow-sm transition-all hover:shadow-md
      ${overdue ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'}`}>
            {/* Card Header */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                            <PriorityBadge priority={task.priority} />
                            <StatusBadge status={task.status} />
                            {overdue && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 px-2 py-0.5 rounded-full">
                                    <AiOutlineExclamationCircle size={10} /> OVERDUE
                                </span>
                            )}
                        </div>
                        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mt-1 leading-tight">
                            {task.title}
                        </h3>
                    </div>

                    {/* Completion status icon */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
            ${task.status === 'Completed'
                            ? 'bg-emerald-100 dark:bg-emerald-900/40'
                            : 'bg-gray-100 dark:bg-gray-700'}`}>
                        {task.status === 'Completed'
                            ? <BsCheckLg size={18} className="text-emerald-600 dark:text-emerald-400" />
                            : <AiOutlineClockCircle size={18} className="text-gray-400" />
                        }
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="px-5 py-4 space-y-3">
                {/* Description */}
                {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {task.description}
                    </p>
                )}

                {/* Admin Note */}
                {task.adminNote && (
                    <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-3 py-2">
                        <AiOutlineFileText className="text-blue-500 mt-0.5 flex-shrink-0" size={14} />
                        <p className="text-xs text-blue-700 dark:text-blue-300">{task.adminNote}</p>
                    </div>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                        <AiOutlineCalendar size={13} />
                        <span>Due: <span className={`font-semibold ${overdue ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>{task.dueDate}</span></span>
                    </span>
                    <span className="flex items-center gap-1">
                        <AiOutlineFileText size={13} />
                        <span>Assigned by: <span className="font-semibold text-gray-700 dark:text-gray-300">{task.assignedBy?.name || task.assignedBy?.email || 'Admin'}</span></span>
                    </span>
                    {task.completedAt && (
                        <span className="flex items-center gap-1">
                            <AiOutlineCheckCircle size={13} className="text-emerald-500" />
                            <span>Completed: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{new Date(task.completedAt).toLocaleDateString()}</span></span>
                        </span>
                    )}
                </div>
            </div>

            {/* Card Footer — Mark Complete button */}
            {task.status !== 'Completed' && (
                <div className="px-5 pb-5">
                    <button
                        onClick={handleMark}
                        disabled={marking}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 shadow-md shadow-emerald-200 dark:shadow-none"
                    >
                        <BsCheckLg size={15} />
                        {marking ? 'Marking…' : 'Mark as Complete'}
                    </button>
                </div>
            )}
        </div>
    );
}

// ── Main UserTasks page ────────────────────────────────────────────────────────
export default function UserTasks({ setTitle }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('All');

    const TABS = ['All', 'Pending', 'In Progress', 'Completed'];

    useEffect(() => { setTitle('Tasks'); }, [setTitle]);

    const fetchMyTasks = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API}/tasks/my`, { withCredentials: true });
            setTasks(res.data.tasks || []);
        } catch {
            toast.error('Failed to load your tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMyTasks(); }, []);

    const handleMarkComplete = async (taskId) => {
        try {
            await axios.put(`${API}/tasks/${taskId}/complete`, {}, { withCredentials: true });
            toast.success('Task marked as completed! 🎉');
            fetchMyTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update task');
        }
    };

    const today = new Date().toISOString().slice(0, 10);
    const overdue = tasks.filter(t => t.status !== 'Completed' && t.dueDate < today).length;

    const filtered = tab === 'All' ? tasks : tasks.filter(t => t.status === tab);

    const tabCounts = {
        All: tasks.length,
        Pending: tasks.filter(t => t.status === 'Pending').length,
        'In Progress': tasks.filter(t => t.status === 'In Progress').length,
        Completed: tasks.filter(t => t.status === 'Completed').length,
    };

    return (
        <div className="py-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <FaTasks className="text-blue-600" /> My Tasks
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    View and complete tasks assigned to you by your manager
                </p>
            </div>

            {/* Overdue alert */}
            {overdue > 0 && (
                <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl px-4 py-3">
                    <AiOutlineExclamationCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">
                        You have <span className="font-bold">{overdue}</span> overdue {overdue === 1 ? 'task' : 'tasks'}. Please complete them as soon as possible.
                    </p>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl w-fit">
                {TABS.map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
              ${tab === t
                                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                        {t} <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full
              ${tab === t ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'}`}>
                            {tabCounts[t]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Loading */}
            {loading ? (
                <div className="py-20 flex flex-col items-center gap-3 text-gray-400">
                    <AiOutlineClockCircle size={40} className="animate-spin" />
                    <p className="text-sm">Loading your tasks…</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="py-20 flex flex-col items-center gap-3 text-gray-400">
                    <FaTasks size={48} />
                    <p className="text-base font-semibold text-gray-500 dark:text-gray-400">
                        {tab === 'All' ? 'No tasks assigned to you yet' : `No ${tab} tasks`}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        {tab === 'All' ? 'Your manager will assign tasks here.' : 'Switch to another tab to view tasks.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map(task => (
                        <TaskCard key={task._id} task={task} onMarkComplete={handleMarkComplete} />
                    ))}
                </div>
            )}
        </div>
    );
}
