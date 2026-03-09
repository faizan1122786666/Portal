




import { useState } from 'react';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';

function LeaveDetailModal({ leave, onClose, onStatusChange }) {
  const [status, setStatus] = useState({
    value: leave.status,
    label: leave.status,
  });
  const [adminComment, setAdminComment] = useState(leave.adminComment || '');
  const [submitting, setSubmitting] = useState(false);

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  // Support both _id (real API) and id (legacy/normalized)
  const leaveId = leave._id || leave.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onStatusChange(leaveId, status.value, adminComment);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#292c35] rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto dark:border-white/5">

        {/* Header */}
        <div className="bg-[#2C5284] p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">Leave Request Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Employee Info */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-[#2C5284] dark:text-blue-300 mb-3">Employee Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {leave.employeeName || leave.employeeId?.name || leave.employeeId?.email || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {leave.email || leave.employeeId?.email || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Leave Details */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-[#2C5284] dark:text-blue-300 mb-3">Leave Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Leave Type:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{leave.leaveType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{leave.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">End Date:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{leave.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Days:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{leave.days} day(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Applied Date:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{leave.appliedDate}</span>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-[#2C5284] dark:text-blue-300 mb-3">Reason</h3>
            <p className="text-gray-900 dark:text-gray-200 leading-relaxed">{leave.reason}</p>
          </div>

          {/* Admin Action Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Update Status</label>
              <Select
                value={status}
                onChange={setStatus}
                options={statusOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    borderColor: '#d1d5db',
                    '&:hover': { borderColor: '#2C5284' },
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: 'inherit',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(255,255,255,0.05)' : 'transparent',
                    color: state.isSelected ? 'white' : 'inherit',
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: '#292c35',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }),
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Admin Comment</label>
              <textarea
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Add your comment here..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" disabled={submitting}
                className="flex-1 px-6 py-3 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors cursor-pointer disabled:opacity-60">
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
                Cancel
              </button>
            </div>
          </form>

          {/* Previous Admin Comment */}
          {leave.adminComment && (
            <div className="mt-6 bg-blue-50 dark:bg-blue-500/10 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Previous Admin Comment</h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">{leave.adminComment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaveDetailModal;