import { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { getEmployeeLeaves, leaveTypes } from '../../data/mockLeaveData';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import UserLeaveDetailModal from './UserLeaveDetailModal';
import 'react-datepicker/dist/react-datepicker.css';

function UserLeave({ setTitle }) {
  // In a real app, get this from auth context
  const currentUserId = 1;

  const [leaves, setLeaves] = useState([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);

  // Form state
  const [leaveType, setLeaveType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    setTitle('My Leave Requests');
    const userLeaves = getEmployeeLeaves(currentUserId);
    setLeaves(userLeaves);
  }, [setTitle, currentUserId]);

  // Calculate days between dates
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const days = calculateDays(startDate, endDate);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeave = {
      id: editingLeave ? editingLeave.id : Date.now(),
      employeeId: currentUserId,
      employeeName: 'Ali Hamza', // In real app, get from auth
      email: 'alihamza@gmail.com', // In real app, get from auth
      leaveType: leaveType.value,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      days,
      reason,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      adminComment: '',
    };

    if (editingLeave) {
      // Update existing leave
      setLeaves(leaves.map((l) => (l.id === editingLeave.id ? newLeave : l)));
    } else {
      // Add new leave
      setLeaves([newLeave, ...leaves]);
    }

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setLeaveType(null);
    setStartDate(null);
    setEndDate(null);
    setReason('');
    setShowApplyForm(false);
    setEditingLeave(null);
  };

  // Handle edit
  const handleEdit = (leave) => {
    if (leave.status !== 'Pending') {
      alert('You can only edit pending leave requests');
      return;
    }

    setEditingLeave(leave);
    setLeaveType(leaveTypes.find((t) => t.value === leave.leaveType));
    setStartDate(new Date(leave.startDate));
    setEndDate(new Date(leave.endDate));
    setReason(leave.reason);
    setShowApplyForm(true);
  };

  // Handle delete
  const handleDelete = (leaveId) => {
    const leave = leaves.find((l) => l.id === leaveId);
    if (leave.status !== 'Pending') {
      alert('You can only delete pending leave requests');
      return;
    }

    if (window.confirm('Are you sure you want to delete this leave request?')) {
      setLeaves(leaves.filter((l) => l.id !== leaveId));
    }
  };

  // View details
  const viewDetails = (leave) => {
    setSelectedLeave(leave);
    setShowDetailModal(true);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-h-screen p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">
          My Leave Requests
        </h1>
        <button
          onClick={() => setShowApplyForm(true)}
          className="px-4 py-2 bg-[#2C5284] text-white rounded-lg font-medium 
            hover:bg-[#365F8D] transition-colors flex items-center gap-2"
        >
          <FaPlus size={16} />
          Apply Leave
        </button>
      </div>

      {/* Apply/Edit Leave Form */}
      {showApplyForm && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2C5284] mb-4">
            {editingLeave ? 'Edit Leave Request' : 'Apply for Leave'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Leave Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type <span className="text-red-500">*</span>
              </label>
              <Select
                value={leaveType}
                onChange={setLeaveType}
                options={leaveTypes}
                required
                placeholder="Select leave type"
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#d1d5db',
                    '&:hover': { borderColor: '#365F8D' },
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? '#365F8D'
                      : state.isFocused
                      ? '#f3f4f6'
                      : 'white',
                    color: state.isSelected ? 'white' : '#1f2937',
                  }),
                }}
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-[#365F8D] focus:border-transparent 
                    outline-none transition-all"
                  placeholderText="Select start date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={startDate || new Date()}
                  dateFormat="yyyy-MM-dd"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-[#365F8D] focus:border-transparent 
                    outline-none transition-all"
                  placeholderText="Select end date"
                />
              </div>
            </div>

            {/* Days Display */}
            {days > 0 && (
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-sm text-blue-900">
                  Total Days: <span className="font-bold text-lg">{days}</span>
                </p>
              </div>
            )}

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-[#365F8D] focus:border-transparent 
                  outline-none transition-all resize-none"
                placeholder="Enter the reason for your leave..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#2C5284] text-white rounded-lg 
                  font-medium hover:bg-[#365F8D] transition-colors"
              >
                {editingLeave ? 'Update Leave' : 'Submit Application'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg 
                  font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leave History */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-[#2C5284]">
          <h2 className="text-lg font-semibold text-white">Leave History</h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium 
                  text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium 
                  text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium 
                  text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium 
                  text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium 
                  text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaves.length > 0 ? (
                leaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm 
                      text-gray-900">
                      {leave.leaveType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {leave.startDate} to {leave.endDate}
                      </div>
                      <div className="text-sm text-gray-500">
                        {leave.days} day(s)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm 
                      text-gray-900">
                      {leave.appliedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 
                          font-semibold rounded-full ${getStatusColor(
                            leave.status
                          )}`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewDetails(leave)}
                          className="p-2 text-blue-600 hover:bg-blue-50 
                            rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        {leave.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleEdit(leave)}
                              className="p-2 text-green-600 hover:bg-green-50 
                                rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(leave.id)}
                              className="p-2 text-red-600 hover:bg-red-50 
                                rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FaTrash size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-gray-500">No leave requests yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden p-4 space-y-4">
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <div
                key={leave.id}
                className="bg-gray-50 rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {leave.leaveType}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {leave.startDate} to {leave.endDate}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full 
                      ${getStatusColor(leave.status)}`}
                  >
                    {leave.status}
                  </span>
                </div>

                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days:</span>
                    <span className="font-medium">{leave.days}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applied:</span>
                    <span className="font-medium">{leave.appliedDate}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <button
                    onClick={() => viewDetails(leave)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 
                      rounded-lg text-sm font-medium hover:bg-blue-100 
                      transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEye size={14} />
                    View
                  </button>
                  {leave.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleEdit(leave)}
                        className="px-3 py-2 bg-green-50 text-green-600 
                          rounded-lg text-sm hover:bg-green-100"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(leave.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 
                          rounded-lg text-sm hover:bg-red-100"
                      >
                        <FaTrash size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No leave requests yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLeave && (
        <UserLeaveDetailModal
          leave={selectedLeave}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
}

export default UserLeave;