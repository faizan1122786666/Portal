





import { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { FaPlus, FaRegEdit, FaTrash, FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaRegCheckCircle } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { CalendarDays } from 'lucide-react';
import { CgProfile } from 'react-icons/cg';
import Loader from '../../components/common/Loader';
import UserLeaveDetailModal from './UserLeaveDetailModal';
import { apiApplyLeave, apiGetMyLeaves, apiUpdateMyLeave, apiDeleteMyLeave } from '../../api/leaveAPI';
import 'react-datepicker/dist/react-datepicker.css';

const LEAVE_TYPES = [
  'Sick Leave', 'Annual Leave', 'Personal Leave',
  'Emergency Leave', 'Maternity Leave', 'Paternity Leave', 'Unpaid Leave',
];

const leaveTypeOptions = LEAVE_TYPES.map(t => ({ value: t, label: t }));

// ── Apply / Edit Leave Modal ──────────────────────────────────────────────────
function ApplyLeaveModal({ onClose, onSubmit, editingLeave, submitting }) {
  const [leaveType, setLeaveType] = useState(
    editingLeave ? leaveTypeOptions.find(t => t.value === editingLeave.leaveType) : null
  );
  const [startDate, setStartDate] = useState(
    editingLeave ? new Date(editingLeave.startDate + 'T00:00:00') : null
  );
  const [endDate, setEndDate] = useState(
    editingLeave ? new Date(editingLeave.endDate + 'T00:00:00') : null
  );
  const [reason, setReason] = useState(editingLeave ? editingLeave.reason : '');
  const [formError, setFormError] = useState('');

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const days = calculateDays(startDate, endDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!leaveType || !startDate || !endDate || !reason.trim()) {
      setFormError('All fields are required.');
      return;
    }
    try {
      await onSubmit({
        leaveType: leaveType.value,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        reason,
      });
    } catch (err) {
      setFormError(err.message || 'Submission failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#292c35] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border dark:border-white/5">
        <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
          <h2 className="text-lg font-bold text-white">
            {editingLeave ? 'Edit Leave Request' : 'Apply for Leave'}
          </h2>
          <button type="button" onClick={onClose}
            className="text-white hover:bg-white/10 rounded-full p-2 transition-colors">
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {formError && (
            <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {formError}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Leave Type <span className="text-red-500">*</span>
            </label>
            <Select
              value={leaveType}
              onChange={setLeaveType}
              options={leaveTypeOptions}
              placeholder="Select leave type..."
              className="react-select-container"
              classNamePrefix="react-select"
              menuPortalTarget={document.body}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: state.isFocused ? '#2C5284' : 'var(--select-border)',
                  borderRadius: '0.5rem',
                  padding: '2px',
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(44,82,132,0.2)' : 'none',
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => { setStartDate(date); if (endDate && date > endDate) setEndDate(null); }}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
                placeholderText="Select start date"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate || new Date()}
                dateFormat="yyyy-MM-dd"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
                placeholderText="Select end date"
              />
            </div>
          </div>

          {days > 0 && (
            <div className="bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total Duration</span>
              <span className="bg-[#2C5284] text-white text-sm font-bold px-3 py-1 rounded-full">
                {days} day{days > 1 ? 's' : ''}
              </span>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none resize-none text-sm"
              placeholder="Enter the reason for your leave..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              className="flex-1 px-4 py-3 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm disabled:opacity-60">
              {submitting ? 'Submitting...' : (editingLeave ? 'Update Request' : 'Submit Application')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
function UserLeave({ setTitle }) {
  const ITEMS_PER_PAGE = 5;

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Fetch from backend
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await apiGetMyLeaves();
      setLeaves(res.leaves || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch leave requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTitle('My Leave Requests');
    fetchLeaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTitle]);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filteredLeaves = leaves.filter(leave => {
    const matchesStatus = filterStatus === 'All' || leave.status === filterStatus;
    const matchesDate = !filterDate ||
      leave.startDate === filterDate ||
      leave.endDate === filterDate ||
      leave.appliedDate === filterDate ||
      (leave.startDate <= filterDate && leave.endDate >= filterDate);
    return matchesStatus && matchesDate;
  });

  const hasActiveFilter = filterDate || filterStatus !== 'All';

  const clearFilters = () => {
    setFilterDate('');
    setFilterStatus('All');
    setCurrentPage(1);
  };

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE);
  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => { setCurrentPage(1); }, [filterDate, filterStatus]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSubmit = async ({ leaveType, startDate, endDate, reason }) => {
    setSubmitting(true);
    try {
      if (editingLeave) {
        await apiUpdateMyLeave(editingLeave._id, { leaveType, startDate, endDate, reason });
      } else {
        await apiApplyLeave({ leaveType, startDate, endDate, reason });
      }
      await fetchLeaves();
      setShowApplyModal(false);
      setEditingLeave(null);
      setCurrentPage(1);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (leave) => {
    if (leave.status !== 'Pending') { alert('You can only edit pending leave requests'); return; }
    setEditingLeave(leave);
    setShowApplyModal(true);
  };

  const handleDelete = async (leave) => {
    if (leave.status !== 'Pending') { alert('You can only delete pending leave requests'); return; }
    if (!window.confirm('Are you sure you want to delete this leave request?')) return;
    try {
      await apiDeleteMyLeave(leave._id);
      await fetchLeaves();
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'bg-green-100 text-green-800';
    if (status === 'Rejected') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const stats = {
    total: leaves.length,
    pending: leaves.filter(l => l.status === 'Pending').length,
    approved: leaves.filter(l => l.status === 'Approved').length,
    rejected: leaves.filter(l => l.status === 'Rejected').length,
  };

  const statusOptions = ['All', 'Pending', 'Approved', 'Rejected'];

  // ── Pagination Bar ─────────────────────────────────────────────────────────
  const PaginationBar = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100">{Math.min(currentPage * ITEMS_PER_PAGE, filteredLeaves.length)}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredLeaves.length}</span> entries
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <FaChevronLeft size={14} className="text-gray-600 dark:text-gray-400" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors border
                ${page === currentPage ? 'bg-[#2C5284] text-white border-[#2C5284]' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
              {page}
            </button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <FaChevronRight size={14} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300">My Leave Requests</h1>
        <button
          onClick={() => { setEditingLeave(null); setShowApplyModal(true); }}
          className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-xl font-semibold hover:bg-[#365F8D] transition-colors text-sm shadow"
        >
          <FaPlus size={12} />
          <span className="hidden sm:inline">Apply Leave</span>
          <span className="sm:hidden">Apply</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
          <button onClick={fetchLeaves} className="ml-3 underline font-medium">Retry</button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { label: 'Total', value: stats.total, icon: <CgProfile size={22} className="text-white" /> },
          { label: 'Pending', value: stats.pending, icon: <CalendarDays size={22} className="text-white" /> },
          { label: 'Approved', value: stats.approved, icon: <FaRegCheckCircle size={22} className="text-white" /> },
          { label: 'Rejected', value: stats.rejected, icon: <RxCrossCircled size={22} className="text-white" /> },
        ].map(({ label, value, sub, icon }) => (
          <div key={label}
            className="bg-white dark:bg-white/5 p-5 flex items-center justify-between shadow hover:shadow-xl transition-all duration-300 min-h-[110px] sm:min-h-28 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D]">
            <div>
              <p className="text-xs sm:text-sm text-[#2C5284] dark:text-gray-300">{label}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D] dark:text-gray-100">{value}</h1>
             
            </div>
            <div className="bg-[#365F8D] dark:bg-[#2C5282] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
              {icon}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1">
            <CalendarDays size={18} className="text-[#2C5284] dark:text-blue-300 flex-shrink-0" />
            <input
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="sm:w-48">
            <Select
              value={filterStatus === 'All' ? { value: 'All', label: 'All Statuses' } : { value: filterStatus, label: filterStatus }}
              onChange={opt => setFilterStatus(opt ? opt.value : 'All')}
              options={statusOptions.map(s => ({ value: s, label: s === 'All' ? 'All Statuses' : s }))}
              placeholder="Filter by status..."
              className="react-select-container"
              classNamePrefix="react-select"
              menuPortalTarget={document.body}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: state.isFocused ? '#2C5284' : 'var(--select-border)',
                  borderRadius: '0.5rem',
                  minHeight: '42px',
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(44,82,132,0.2)' : 'none',
                  '&:hover': { borderColor: '#2C5284' },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'var(--select-hover)' : 'transparent',
                  color: state.isSelected ? 'white' : 'inherit',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: 'var(--select-bg)',
                  border: '1px solid var(--select-border)',
                  zIndex: 50,
                }),
                singleValue: (base) => ({
                  ...base,
                  fontSize: '0.875rem',
                  color: 'inherit'
                }),
                placeholder: (base) => ({
                  ...base,
                  color: 'var(--select-text)',
                  opacity: 0.6
                })
              }}
            />
          </div>
          {hasActiveFilter && (
            <button onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              <FaTimes size={11} /> Clear
            </button>
          )}
        </div>
        {filterDate && (
          <p className="text-xs text-[#365F8D] font-medium mt-2">
            Filtering by date: {new Date(filterDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        )}
        {filteredLeaves.length === 0 && hasActiveFilter && (
          <p className="text-xs text-red-500 font-medium mt-1">No leave requests match the selected filters.</p>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-12 text-center text-gray-500 flex flex-col items-center justify-center">
          <Loader size="medium" />
          {/* <p className="mt-4 text-xs font-bold uppercase tracking-widest">Loading your leave requests...</p> */}
        </div>
      )}

      {/* Desktop Table */}
      {!loading && (
        <div className="hidden lg:block bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
            <thead className="bg-[#2C5294] dark:bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Leave Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Applied Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-white/5">
              {paginatedLeaves.length > 0 ? paginatedLeaves.map(leave => (
                <tr key={leave._id} className="hover:bg-blue-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{leave.leaveType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{leave.startDate} → {leave.endDate}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{leave.days} day(s)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{leave.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSelectedLeave(leave); setShowDetailModal(true); }}
                        className="p-2 text-[#2C5284] dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-white/10 rounded-lg transition-colors" title="View Details">
                        <FaEye size={16} />
                      </button>
                      {leave.status === 'Pending' && (
                        <>
                          <button onClick={() => handleEdit(leave)}
                            className="p-2 text-[#2C5284] hover:bg-[#2C5284]/10 rounded-lg transition-colors" title="Edit">
                            <FaRegEdit size={16} />
                          </button>
                          <button onClick={() => handleDelete(leave)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <FaTrash size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {hasActiveFilter ? 'No records match the selected filters.' : 'No leave requests yet. Click "Apply Leave" to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30">
              <PaginationBar />
            </div>
          )}
        </div>
      )}

      {/* Mobile Cards */}
      {!loading && (
        <div className="lg:hidden space-y-4">
          {paginatedLeaves.length > 0 ? paginatedLeaves.map(leave => (
            <div key={leave._id} className="bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
              <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{leave.leaveType}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusColor(leave.status)}`}>
                  {leave.status}
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Duration</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{leave.days} day(s)</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Applied Date</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{leave.appliedDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Period</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{leave.startDate} to {leave.endDate}</p>
                </div>
                <div className="pt-3 flex items-center justify-between border-t border-gray-50 dark:border-white/5">
                  <button onClick={() => { setSelectedLeave(leave); setShowDetailModal(true); }}
                    className="flex items-center gap-2 text-xs font-bold text-[#2C5284] dark:text-blue-300 uppercase tracking-wider">
                    <FaEye size={14} /> View Details
                  </button>
                  {leave.status === 'Pending' && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(leave)} className="p-2 text-[#2C5284] bg-[#2C5284]/10 rounded-lg">
                        <FaRegEdit size={14} />
                      </button>
                      <button onClick={() => handleDelete(leave)} className="p-2 text-red-600 bg-red-50 rounded-lg">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-white dark:bg-white/5 p-10 rounded-xl text-center text-gray-500 dark:text-gray-400 italic border border-gray-100 dark:border-white/5">
              {hasActiveFilter ? 'No records match the selected filters.' : 'No leave requests yet. Tap "Apply" to get started.'}
            </div>
          )}
          {totalPages > 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3">
              <PaginationBar />
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {showApplyModal && (
        <ApplyLeaveModal
          editingLeave={editingLeave}
          submitting={submitting}
          onClose={() => { setShowApplyModal(false); setEditingLeave(null); }}
          onSubmit={handleSubmit}
        />
      )}
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