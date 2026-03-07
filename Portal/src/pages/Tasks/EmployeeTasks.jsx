import React, { useState, useEffect } from 'react';
import { apiGetMyTasks, apiUpdateTaskStatus } from '../../api/taskAPI';
import { toast } from 'react-toastify';

export default function EmployeeTasks({ setTitle }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      toast.error(err.message || 'Error updating status');
    }
  };

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300 ring-yellow-400',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 ring-blue-400',
    'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 ring-emerald-400',
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">Assigned Tasks</h2>

      {loading ? (
        <div className="text-center py-10 text-zinc-500 dark:text-zinc-400">Loading your tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-8 text-center text-zinc-500 dark:text-zinc-400">
          You have no assigned tasks right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">{task.title}</h3>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[task.status] || statusColors['Pending']}`}>
                  {task.status}
                </span>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-grow whitespace-pre-wrap">
                {task.description || 'No description provided.'}
              </p>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-700/50 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Deadline</span>
                  <span className={`text-sm font-medium ${new Date(task.deadline) < new Date() && task.status !== 'Completed' ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-300'}`}>
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mr-2">Update Status:</span>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2 transition-colors cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
