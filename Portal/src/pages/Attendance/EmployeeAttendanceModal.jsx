







import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getEmployeeRecords } from '../../data/mockAttendanceData'; // ← yeh use kar rahe

// For leave – abhi mock, real mein separate array bana sakte ho
const mockLeaves = []; // Placeholder – future mein add kar dena

function EmployeeAttendanceModal({ employee, onClose, isAdmin = false }) {
  const [records, setRecords] = useState([]);
  const [leaves, setLeaves] = useState(mockLeaves);
  const [newLeave, setNewLeave] = useState({ date: '', reason: '' });

  useEffect(() => {
    const empRecords = getEmployeeRecords(employee.employeeId);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecords(empRecords.sort((a, b) => new Date(b.date) - new Date(a.date))); // Latest first
  }, [employee.employeeId]);

  const handleApplyLeave = () => {
    if (!newLeave.date || !newLeave.reason.trim()) return;
    // Mock save
    const newEntry = {
      id: Date.now(),
      date: newLeave.date,
      reason: newLeave.reason,
      status: 'Pending',
    };
    setLeaves([...leaves, newEntry]);
    setNewLeave({ date: '', reason: '' });
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Accepted', label: 'Accept' },
    { value: 'Denied', label: 'Deny' },
  ];

  const getRowBg = (status) => {
    if (status === 'Present') return 'bg-green-50';
    if (status === 'Absent') return 'bg-red-50';
    if (status === 'Leave') return 'bg-yellow-50';
    return '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[#2C5284] mb-6">
            {isAdmin ? `${employee.name}'s` : 'My'} Attendance Details
          </h2>

          {/* Attendance Records Table */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Records</h3>
            {records.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#365F8D]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Check In</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Check Out</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {records.map((record) => (
                      <tr key={record.id} className={`${getRowBg(record.status)} hover:bg-gray-50 transition-colors`}>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{record.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{record.checkIn}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{record.checkOut}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                              record.status === 'Present' ? 'bg-green-100 text-green-800' :
                              record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{record.workHours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No records found.</p>
            )}
          </div>

          {/* Leave Section */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Leaves</h3>
            {leaves.length > 0 ? (
              <div className="space-y-4">
                {leaves.map((leave) => (
                  <div key={leave.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{leave.date}</p>
                        <p className="text-gray-700 mt-1">{leave.reason}</p>
                      </div>
                      {isAdmin ? (
                        <Select
                          options={statusOptions}
                          defaultValue={statusOptions.find(o => o.value === leave.status)}
                          className="w-36 text-sm"
                        />
                      ) : (
                        <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                          {leave.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No leave requests yet.</p>
            )}

            {!isAdmin && (
              <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg font-semibold text-[#2C5284] mb-4">Apply New Leave</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newLeave.date}
                      onChange={(e) => setNewLeave({ ...newLeave, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#365F8D] focus:border-[#365F8D]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <textarea
                      value={newLeave.reason}
                      onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#365F8D] focus:border-[#365F8D]"
                      placeholder="Enter reason for leave..."
                    />
                  </div>
                  <button
                    onClick={handleApplyLeave}
                    className="w-full bg-[#365F8D] text-white py-3 rounded-lg hover:bg-[#2C5284] transition font-medium"
                  >
                    Submit Leave Request
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeAttendanceModal;