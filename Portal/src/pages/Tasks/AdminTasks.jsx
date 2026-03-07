import React, { useState, useEffect } from 'react';
import { apiGetAllTasks, apiDeleteTask } from '../../api/taskAPI';
import AddTaskModal from '../../components/Admin/AddTaskModal';
import TaskDetailsModal from '../../components/Admin/TaskDetailsModal';
import EditTaskModal from '../../components/Admin/EditTaskModal';
import { toast } from 'react-toastify';
import { AiOutlinePlus, AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

export default function AdminTasks({ setTitle }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    setTitle('Manage Tasks');
    fetchTasks();
  }, [setTitle]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await apiGetAllTasks();
      setTasks(res.tasks || []);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await apiDeleteTask(id);
      toast.success('Task deleted successfully');
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      toast.error(err.message || 'Failed to delete task');
    }
  };

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300',
    'Completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300',
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">All Tasks</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium shadow-sm"
        >
          <AiOutlinePlus size={20} />
          Assign Task
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-zinc-500 dark:text-zinc-400">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-8 text-center text-zinc-500 dark:text-zinc-400">
          No tasks found. Click "Assign Task" to create one.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
                <th className="px-6 py-4 font-medium text-sm">Task Title</th>
                <th className="px-6 py-4 font-medium text-sm">Assigned To</th>
                <th className="px-6 py-4 font-medium text-sm">Deadline</th>
                <th className="px-6 py-4 font-medium text-sm">Status</th>
                <th className="px-6 py-4 font-medium text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">{task.title}</p>
                    {task.description && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 break-all whitespace-break-spaces overflow-hidden max-w-[250px] md:max-w-xs">{task.description}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center -space-x-2 overflow-hidden">
                      {task.assignedEmployees && task.assignedEmployees.map((emp, index) => {
                        if (index >= 3) return null; // Show max 3 avatars
                        return (
                          <div key={emp._id} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-800 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex flex-shrink-0 items-center justify-center font-bold text-xs overflow-hidden relative z-10 hover:z-20 transition-transform hover:scale-110" title={emp.name || emp.email}>
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
                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold text-xs relative z-10 truncate px-1">
                          +{task.assignedEmployees.length - 3}
                        </div>
                      )}

                      {(!task.assignedEmployees || task.assignedEmployees.length === 0) && (
                        <span className="text-zinc-500 text-sm italic">Unassigned</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[task.status] || statusColors['Pending']}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="p-2 text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
                        title="View Details"
                      >
                        <AiOutlineEye size={20} />
                      </button>
                      <button
                        onClick={() => setEditingTask(task)}
                        className="p-2 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
                        title="Edit Task"
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="p-2 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
                        title="Delete Task"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onAdded={() => {
            setIsModalOpen(false);
            fetchTasks();
          }}
        />
      )}

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={() => {
            setEditingTask(null);
            fetchTasks();
          }}
        />
      )}
    </div>
  );
}
