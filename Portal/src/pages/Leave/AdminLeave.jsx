/**
 * Component: AdminLeave
 * Description: Administrative interface for managing employee leave requests, featuring filtering, statistics, and approval workflows.
 * Why: To allow administrators to review, approve, or reject leave applications while maintaining an overview of company-wide leave trends.
 */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { FaEye, FaCheck, FaTimes, FaRegCheckCircle, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { RxCrossCircled } from 'react-icons/rx';
import { SlCalender } from 'react-icons/sl';
import LeaveDetailModal from './LeaveDetailModal';
import { apiGetAllLeaves, apiGetLeaveSummary, apiReviewLeave } from '../../api/leaveAPI';
import Loader from '../../components/common/Loader';
import TableSkeleton from '../../components/common/TableSkeleton';
import Skeleton from '../../components/common/Skeleton';

import Pagination from '../../components/common/Pagination';

function AdminLeave({ setTitle }) {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeaves, setTotalLeaves] = useState(0);

  // Fetch leaves from backend
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      setError('');
      const filters = { page: currentPage, limit: 10 };
      if (statusFilter) filters.status = statusFilter.value;
      if (searchTerm) filters.searchTerm = searchTerm; // Assuming backend handles search if added, but for now we filter locally if needed. 
      // Actually, let's just use what the backend supports.

      const [leavesRes, summaryRes] = await Promise.all([
        apiGetAllLeaves(filters),
        apiGetLeaveSummary(),
      ]);

      setLeaves(leavesRes.leaves || []);
      setTotalPages(leavesRes.pagination?.totalPages || 1);
      setTotalLeaves(leavesRes.pagination?.totalLeaves || 0);
      setStats(summaryRes);
    } catch (err) {
      setError(err.message || 'Failed to fetch leave requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTitle('Leave Management');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTitle]);

  useEffect(() => {
    fetchLeaves();
  }, [currentPage, statusFilter, searchTerm]);

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  // Quick approve/reject via API
  const quickAction = async (leaveId, action) => {
    try {
      const comment = action === 'Approved'
        ? 'Leave approved by admin'
        : 'Leave rejected by admin';
      await apiReviewLeave(leaveId, { status: action, adminComment: comment });
      // Refresh current page
      fetchLeaves();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  // Handle status change from modal
  const handleStatusChange = async (leaveId, newStatus, adminComment = '') => {
    try {
      await apiReviewLeave(leaveId, { status: newStatus, adminComment });
      fetchLeaves();
      setShowModal(false);
    } catch (err) {
      alert(err.message || 'Update failed');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'Pending': return 'bg-[#2C5284]/10 text-[#2C5284]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const viewDetails = (leave) => {
    setSelectedLeave(leave);
    setShowModal(true);
  };

  // Helper to get employee name/email from populated employeeId
  const getEmpName = (leave) => leave.employeeId?.name || leave.employeeId?.email || 'N/A';
  const getEmpEmail = (leave) => leave.employeeId?.email || '';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">

      <h1 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300 mb-4">
        Leave Management
      </h1>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
          <button onClick={fetchLeaves} className="ml-3 underline font-medium">Retry</button>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {loading
          ? [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-gray-100 dark:border-white/5 flex items-center justify-between shadow transition duration-300">
              <div className="space-y-2 flex-1">
                <Skeleton height="0.6rem" width="40%" />
                <Skeleton height="1.5rem" width="20%" />
              </div>
              <Skeleton variant="circular" width="2.5rem" height="2.5rem" className="shrink-0" />
            </div>
          ))
          : <>
            <div className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition duration-300">
              <div>
                <p className="text-xs text-[#2C5284] dark:text-gray-300">Total Requests</p>
                <p className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-blue-300">{stats.total}</p>
              </div>
              <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <CgProfile size={20} className="text-white" />
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition duration-300">
              <div>
                <p className="text-xs text-[#2C5284] dark:text-gray-300">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-[#2C5284]">{stats.pending}</p>
              </div>
              <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <SlCalender size={20} className="text-white" />
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition duration-300">
              <div>
                <p className="text-xs text-[#2C5284] dark:text-gray-300">Approved</p>
                <p className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-blue-300">{stats.approved}</p>
              </div>
              <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <FaRegCheckCircle size={20} className="text-white" />
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition duration-300">
              <div>
                <p className="text-xs text-[#2C5284] dark:text-gray-300">Rejected</p>
                <p className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-blue-300">{stats.rejected}</p>
              </div>
              <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <RxCrossCircled size={20} className="text-white" />
              </div>
            </div>
          </>
        }
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Search Employee
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5284]">
                <FaSearch size={14} />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg 
                  focus:ring-2 focus:ring-[#2C5284] outline-none text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Filter by Status
            </label>
            <Select
              value={statusFilter}
              onChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
              options={statusOptions}
              isClearable
              placeholder="All Statuses"
              className="react-select-container text-sm"
              classNamePrefix="react-select"
              menuPortalTarget={document.body}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: 'var(--select-border)',
                  backgroundColor: 'transparent',
                  borderRadius: '0.5rem',
                  padding: '2px',
                  '&:hover': { borderColor: '#2C5284' },
                }),
                singleValue: (base) => ({
                  ...base,
                  color: 'inherit',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'var(--select-hover)' : 'transparent',
                  color: state.isSelected ? 'white' : 'inherit',
                  cursor: 'pointer',
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: 'var(--select-bg)',
                  border: '1px solid var(--select-border)',
                  zIndex: 50,
                }),
              }}
            />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <TableSkeleton rows={8} cols={6} />
      )}

      {/* Desktop Table */}
      {!loading && (
        <div className="hidden lg:block bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
              <thead className="bg-[#2C5294] dark:bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Leave Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Applied Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-white/5">
                {leaves.length > 0 ? (
                  leaves.map((leave) => (
                    <tr key={leave._id} className="hover:bg-blue-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{getEmpName(leave)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{getEmpEmail(leave)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{leave.leaveType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{leave.startDate} to {leave.endDate}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{leave.days} day(s)</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{leave.appliedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-[10px] leading-5 font-bold uppercase tracking-wider rounded-full ${getStatusColor(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button onClick={() => viewDetails(leave)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2C5284]/10 dark:bg-white/5 hover:bg-[#2C5284] text-[#2C5284] dark:text-blue-300 hover:text-white rounded-lg text-xs font-semibold transition-all group" title="View Details">
                            <FaEye size={12} />
                            <span>Details</span>
                          </button>
                          {leave.status === 'Pending' && (
                            <>
                              <button onClick={() => quickAction(leave._id, 'Approved')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                                <FaCheck size={16} />
                              </button>
                              <button onClick={() => quickAction(leave._id, 'Rejected')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                                <FaTimes size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500 ">
                      No leave requests found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Cards */}
      {!loading && (
        <div className="lg:hidden space-y-4">
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <div key={leave._id} className="bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
                <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{getEmpName(leave)}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{getEmpEmail(leave)}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Leave Type</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{leave.leaveType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Duration</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{leave.days} day(s)</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Dates</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{leave.startDate} to {leave.endDate}</p>
                  </div>
                  <div className="pt-3 flex items-center justify-between border-t border-gray-50 dark:border-white/5">
                    <button onClick={() => viewDetails(leave)}
                      className="flex items-center gap-2 text-xs font-bold text-[#2C5284] dark:text-blue-300 uppercase tracking-wider">
                      <FaEye size={14} /> View Details
                    </button>
                    {leave.status === 'Pending' && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => quickAction(leave._id, 'Approved')}
                          className="p-2 text-green-600 bg-green-50 rounded-lg">
                          <FaCheck size={14} />
                        </button>
                        <button onClick={() => quickAction(leave._id, 'Rejected')}
                          className="p-2 text-red-600 bg-red-50 rounded-lg">
                          <FaTimes size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-white/5 p-10 rounded-xl text-center text-gray-500 dark:text-gray-400 italic border border-gray-100 dark:border-white/5">
              No leave requests found.
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {leaves.length > 5 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Leave Detail Modal */}
      {showModal && selectedLeave && (
        <LeaveDetailModal
          leave={{
            ...selectedLeave,
            // Normalize fields for the modal (it expects id, employeeName, email)
            id: selectedLeave._id,
            employeeName: getEmpName(selectedLeave),
            email: getEmpEmail(selectedLeave),
          }}
          onClose={() => setShowModal(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default AdminLeave;