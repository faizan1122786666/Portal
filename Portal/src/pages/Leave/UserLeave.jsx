// import { useEffect, useState } from 'react';
// import Select from 'react-select';
// import DatePicker from 'react-datepicker';
// import { getEmployeeLeaves, leaveTypes } from '../../data/mockLeaveData';
// import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
// import UserLeaveDetailModal from './UserLeaveDetailModal';
// import 'react-datepicker/dist/react-datepicker.css';

// function UserLeave({ setTitle }) {
//   // In a real app, get this from auth context
//   const currentUserId = 1;

//   const [leaves, setLeaves] = useState([]);
//   const [showApplyForm, setShowApplyForm] = useState(false);
//   const [selectedLeave, setSelectedLeave] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [editingLeave, setEditingLeave] = useState(null);

//   // Form state
//   const [leaveType, setLeaveType] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [reason, setReason] = useState('');

//   useEffect(() => {
//     setTitle('My Leave Requests');
//     const userLeaves = getEmployeeLeaves(currentUserId);
//     setLeaves(userLeaves);
//   }, [setTitle, currentUserId]);

//   // Calculate days between dates
//   const calculateDays = (start, end) => {
//     if (!start || !end) return 0;
//     const diffTime = Math.abs(end - start);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//     return diffDays;
//   };

//   const days = calculateDays(startDate, endDate);

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newLeave = {
//       id: editingLeave ? editingLeave.id : Date.now(),
//       employeeId: currentUserId,
//       employeeName: 'Ali Hamza', // In real app, get from auth
//       email: 'alihamza@gmail.com', // In real app, get from auth
//       leaveType: leaveType.value,
//       startDate: startDate.toISOString().split('T')[0],
//       endDate: endDate.toISOString().split('T')[0],
//       days,
//       reason,
//       status: 'Pending',
//       appliedDate: new Date().toISOString().split('T')[0],
//       adminComment: '',
//     };

//     if (editingLeave) {
//       // Update existing leave
//       setLeaves(leaves.map((l) => (l.id === editingLeave.id ? newLeave : l)));
//     } else {
//       // Add new leave
//       setLeaves([newLeave, ...leaves]);
//     }

//     // Reset form
//     resetForm();
//   };

//   const resetForm = () => {
//     setLeaveType(null);
//     setStartDate(null);
//     setEndDate(null);
//     setReason('');
//     setShowApplyForm(false);
//     setEditingLeave(null);
//   };

//   // Handle edit
//   const handleEdit = (leave) => {
//     if (leave.status !== 'Pending') {
//       alert('You can only edit pending leave requests');
//       return;
//     }

//     setEditingLeave(leave);
//     setLeaveType(leaveTypes.find((t) => t.value === leave.leaveType));
//     setStartDate(new Date(leave.startDate));
//     setEndDate(new Date(leave.endDate));
//     setReason(leave.reason);
//     setShowApplyForm(true);
//   };

//   // Handle delete
//   const handleDelete = (leaveId) => {
//     const leave = leaves.find((l) => l.id === leaveId);
//     if (leave.status !== 'Pending') {
//       alert('You can only delete pending leave requests');
//       return;
//     }

//     if (window.confirm('Are you sure you want to delete this leave request?')) {
//       setLeaves(leaves.filter((l) => l.id !== leaveId));
//     }
//   };

//   // View details
//   const viewDetails = (leave) => {
//     setSelectedLeave(leave);
//     setShowDetailModal(true);
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved':
//         return 'bg-green-100 text-green-800';
//       case 'Rejected':
//         return 'bg-red-100 text-red-800';
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="max-h-screen p-4 sm:p-6 lg:p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">
//           My Leave Requests
//         </h1>
//         <button
//           onClick={() => setShowApplyForm(true)}
//           className="px-4 py-2 bg-[#2C5284] text-white rounded-lg font-medium 
//             hover:bg-[#365F8D] transition-colors flex items-center gap-2"
//         >
//           <FaPlus size={16} />
//           Apply Leave
//         </button>
//       </div>

//       {/* Apply/Edit Leave Form */}
//       {showApplyForm && (
//         <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
//           <h2 className="text-xl font-bold text-[#2C5284] mb-4">
//             {editingLeave ? 'Edit Leave Request' : 'Apply for Leave'}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Leave Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Leave Type <span className="text-red-500">*</span>
//               </label>
//               <Select
//                 value={leaveType}
//                 onChange={setLeaveType}
//                 options={leaveTypes}
//                 required
//                 placeholder="Select leave type"
//                 className="react-select-container"
//                 classNamePrefix="react-select"
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     borderColor: '#d1d5db',
//                     '&:hover': { borderColor: '#365F8D' },
//                   }),
//                   option: (base, state) => ({
//                     ...base,
//                     backgroundColor: state.isSelected
//                       ? '#365F8D'
//                       : state.isFocused
//                       ? '#f3f4f6'
//                       : 'white',
//                     color: state.isSelected ? 'white' : '#1f2937',
//                   }),
//                 }}
//               />
//             </div>

//             {/* Date Range */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date <span className="text-red-500">*</span>
//                 </label>
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   minDate={new Date()}
//                   dateFormat="yyyy-MM-dd"
//                   required
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
//                     focus:ring-2 focus:ring-[#365F8D] focus:border-transparent 
//                     outline-none transition-all"
//                   placeholderText="Select start date"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date <span className="text-red-500">*</span>
//                 </label>
//                 <DatePicker
//                   selected={endDate}
//                   onChange={(date) => setEndDate(date)}
//                   minDate={startDate || new Date()}
//                   dateFormat="yyyy-MM-dd"
//                   required
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
//                     focus:ring-2 focus:ring-[#365F8D] focus:border-transparent 
//                     outline-none transition-all"
//                   placeholderText="Select end date"
//                 />
//               </div>
//             </div>

//             {/* Days Display */}
//             {days > 0 && (
//               <div className="bg-blue-50 rounded-lg p-3 text-center">
//                 <p className="text-sm text-blue-900">
//                   Total Days: <span className="font-bold text-lg">{days}</span>
//                 </p>
//               </div>
//             )}

//             {/* Reason */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Reason <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 required
//                 rows={4}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
//                   focus:ring-2 focus:ring-[#365F8D] focus:border-transparent 
//                   outline-none transition-all resize-none"
//                 placeholder="Enter the reason for your leave..."
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <button
//                 type="submit"
//                 className="flex-1 px-6 py-3 bg-[#2C5284] text-white rounded-lg 
//                   font-medium hover:bg-[#365F8D] transition-colors"
//               >
//                 {editingLeave ? 'Update Leave' : 'Submit Application'}
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg 
//                   font-medium hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Leave History */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="p-4 bg-[#2C5284]">
//           <h2 className="text-lg font-semibold text-white">Leave History</h2>
//         </div>

//         {/* Desktop Table */}
//         <div className="hidden lg:block overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium 
//                   text-gray-500 uppercase tracking-wider">
//                   Leave Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium 
//                   text-gray-500 uppercase tracking-wider">
//                   Duration
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium 
//                   text-gray-500 uppercase tracking-wider">
//                   Applied Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium 
//                   text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium 
//                   text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {leaves.length > 0 ? (
//                 leaves.map((leave) => (
//                   <tr key={leave.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm 
//                       text-gray-900">
//                       {leave.leaveType}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {leave.startDate} to {leave.endDate}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {leave.days} day(s)
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm 
//                       text-gray-900">
//                       {leave.appliedDate}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-3 py-1 inline-flex text-xs leading-5 
//                           font-semibold rounded-full ${getStatusColor(
//                             leave.status
//                           )}`}
//                       >
//                         {leave.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => viewDetails(leave)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 
//                             rounded-lg transition-colors"
//                           title="View Details"
//                         >
//                           <FaEye size={16} />
//                         </button>
//                         {leave.status === 'Pending' && (
//                           <>
//                             <button
//                               onClick={() => handleEdit(leave)}
//                               className="p-2 text-green-600 hover:bg-green-50 
//                                 rounded-lg transition-colors"
//                               title="Edit"
//                             >
//                               <FaEdit size={16} />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(leave.id)}
//                               className="p-2 text-red-600 hover:bg-red-50 
//                                 rounded-lg transition-colors"
//                               title="Delete"
//                             >
//                               <FaTrash size={16} />
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="px-6 py-12 text-center">
//                     <p className="text-gray-500">No leave requests yet</p>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Cards */}
//         <div className="lg:hidden p-4 space-y-4">
//           {leaves.length > 0 ? (
//             leaves.map((leave) => (
//               <div
//                 key={leave.id}
//                 className="bg-gray-50 rounded-lg p-4 space-y-3"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-semibold text-gray-900">
//                       {leave.leaveType}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       {leave.startDate} to {leave.endDate}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 text-xs font-semibold rounded-full 
//                       ${getStatusColor(leave.status)}`}
//                   >
//                     {leave.status}
//                   </span>
//                 </div>

//                 <div className="text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Days:</span>
//                     <span className="font-medium">{leave.days}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Applied:</span>
//                     <span className="font-medium">{leave.appliedDate}</span>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-2 border-t">
//                   <button
//                     onClick={() => viewDetails(leave)}
//                     className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 
//                       rounded-lg text-sm font-medium hover:bg-blue-100 
//                       transition-colors flex items-center justify-center gap-2"
//                   >
//                     <FaEye size={14} />
//                     View
//                   </button>
//                   {leave.status === 'Pending' && (
//                     <>
//                       <button
//                         onClick={() => handleEdit(leave)}
//                         className="px-3 py-2 bg-green-50 text-green-600 
//                           rounded-lg text-sm hover:bg-green-100"
//                       >
//                         <FaEdit size={14} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(leave.id)}
//                         className="px-3 py-2 bg-red-50 text-red-600 
//                           rounded-lg text-sm hover:bg-red-100"
//                       >
//                         <FaTrash size={14} />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-8">
//               <p className="text-gray-500">No leave requests yet</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Detail Modal */}
//       {showDetailModal && selectedLeave && (
//         <UserLeaveDetailModal
//           leave={selectedLeave}
//           onClose={() => setShowDetailModal(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default UserLeave;

























// import { useEffect, useState } from 'react';
// import Select from 'react-select';
// import DatePicker from 'react-datepicker';
// import { getEmployeeLeaves, leaveTypes } from '../../data/mockLeaveData';
// import { FaPlus, FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa';
// import { FaRegCheckCircle } from 'react-icons/fa';
// import { RxCrossCircled } from 'react-icons/rx';
// import { CalendarDays } from 'lucide-react';
// import { CgProfile } from 'react-icons/cg';
// import UserLeaveDetailModal from './UserLeaveDetailModal';

// import 'react-datepicker/dist/react-datepicker.css';

// // Apply / Edit Leave Modal
// function ApplyLeaveModal({ onClose, onSubmit, editingLeave }) {
//   const [leaveType, setLeaveType] = useState(
//     editingLeave ? leaveTypes.find(t => t.value === editingLeave.leaveType) : null
//   )
//   const [startDate, setStartDate] = useState(
//     editingLeave ? new Date(editingLeave.startDate) : null
//   )
//   const [endDate, setEndDate] = useState(
//     editingLeave ? new Date(editingLeave.endDate) : null
//   )
//   const [reason, setReason] = useState(editingLeave ? editingLeave.reason : '')

//   const calculateDays = (start, end) => {
//     if (!start || !end) return 0
//     return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1
//   }

//   const days = calculateDays(startDate, endDate)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!leaveType || !startDate || !endDate || !reason.trim()) return
//     onSubmit({
//       leaveType: leaveType.value,
//       startDate: startDate.toISOString().split('T')[0],
//       endDate: endDate.toISOString().split('T')[0],
//       days,
//       reason,
//     })
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
//           <h2 className="text-lg font-bold text-white">
//             {editingLeave ? 'Edit Leave Request' : 'Apply for Leave'}
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-white hover:bg-white/10 rounded-full p-2 transition-colors"
//           >
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-5 space-y-5">

//           {/* Leave Type */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Leave Type <span className="text-red-500">*</span>
//             </label>
//             <Select
//               value={leaveType}
//               onChange={setLeaveType}
//               options={leaveTypes}
//               required
//               placeholder="Select leave type..."
//               className="react-select-container"
//               classNamePrefix="react-select"
//               styles={{
//                 control: (base, state) => ({
//                   ...base,
//                   borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
//                   borderRadius: '0.5rem',
//                   padding: '2px',
//                   boxShadow: state.isFocused ? '0 0 0 2px rgba(44,82,132,0.2)' : 'none',
//                   '&:hover': { borderColor: '#2C5284' },
//                 }),
//                 option: (base, state) => ({
//                   ...base,
//                   backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? '#f3f4f6' : 'white',
//                   color: state.isSelected ? 'white' : '#1f2937',
//                 }),
//               }}
//             />
//           </div>

//           {/* Date Range */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Start Date <span className="text-red-500">*</span>
//               </label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => { setStartDate(date); if (endDate && date > endDate) setEndDate(null) }}
//                 minDate={new Date()}
//                 dateFormat="yyyy-MM-dd"
//                 required
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none transition-all text-sm"
//                 placeholderText="Select start date"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 End Date <span className="text-red-500">*</span>
//               </label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 minDate={startDate || new Date()}
//                 dateFormat="yyyy-MM-dd"
//                 required
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none transition-all text-sm"
//                 placeholderText="Select end date"
//               />
//             </div>
//           </div>

//           {/* Days Badge */}
//           {days > 0 && (
//             <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between">
//               <span className="text-sm text-blue-700 font-medium">Total Duration</span>
//               <span className="bg-[#2C5284] text-white text-sm font-bold px-3 py-1 rounded-full">
//                 {days} day{days > 1 ? 's' : ''}
//               </span>
//             </div>
//           )}

//           {/* Reason */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Reason <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               required
//               rows={4}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none transition-all resize-none text-sm"
//               placeholder="Enter the reason for your leave..."
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-3 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm"
//             >
//               {editingLeave ? 'Update Request' : 'Submit Application'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// function UserLeave({ setTitle }) {
//   const currentUserId = 1

//   const [leaves, setLeaves] = useState([])
//   const [showApplyModal, setShowApplyModal] = useState(false)
//   const [selectedLeave, setSelectedLeave] = useState(null)
//   const [showDetailModal, setShowDetailModal] = useState(false)
//   const [editingLeave, setEditingLeave] = useState(null)

//   useEffect(() => {
//     setTitle('My Leave Requests')
//     const userLeaves = getEmployeeLeaves(currentUserId)
//     setLeaves(userLeaves)
//   }, [setTitle])

//   const handleSubmit = ({ leaveType, startDate, endDate, days, reason }) => {
//     const newLeave = {
//       id: editingLeave ? editingLeave.id : Date.now(),
//       employeeId: currentUserId,
//       employeeName: 'Ali Hamza',
//       email: 'alihamza@gmail.com',
//       leaveType,
//       startDate,
//       endDate,
//       days,
//       reason,
//       status: 'Pending',
//       appliedDate: new Date().toISOString().split('T')[0],
//       adminComment: '',
//     }

//     if (editingLeave) {
//       setLeaves(leaves.map(l => l.id === editingLeave.id ? newLeave : l))
//     } else {
//       setLeaves([newLeave, ...leaves])
//     }

//     setShowApplyModal(false)
//     setEditingLeave(null)
//   }

//   const handleEdit = (leave) => {
//     if (leave.status !== 'Pending') {
//       alert('You can only edit pending leave requests')
//       return
//     }
//     setEditingLeave(leave)
//     setShowApplyModal(true)
//   }

//   const handleDelete = (leaveId) => {
//     const leave = leaves.find(l => l.id === leaveId)
//     if (leave.status !== 'Pending') {
//       alert('You can only delete pending leave requests')
//       return
//     }
//     if (window.confirm('Are you sure you want to delete this leave request?')) {
//       setLeaves(leaves.filter(l => l.id !== leaveId))
//     }
//   }

//   const viewDetails = (leave) => {
//     setSelectedLeave(leave)
//     setShowDetailModal(true)
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved': return 'bg-green-100 text-green-800'
//       case 'Rejected': return 'bg-red-100 text-red-800'
//       case 'Pending': return 'bg-yellow-100 text-yellow-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   const stats = {
//     total: leaves.length,
//     pending: leaves.filter(l => l.status === 'Pending').length,
//     approved: leaves.filter(l => l.status === 'Approved').length,
//     rejected: leaves.filter(l => l.status === 'Rejected').length,
//   }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">My Leave Requests</h1>
//         <button
//           onClick={() => { setEditingLeave(null); setShowApplyModal(true) }}
//           className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm shadow"
//         >
//           <FaPlus size={16} />
//           <span className="hidden sm:inline text-xl">Apply Leave</span>
//           <span className="sm:hidden">Apply</span>
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-24">
//           <div>
//             <p className="text-xs sm:text-sm text-[#2C5284]">Total</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.total}</h1>
//             <p className="text-xs text-gray-400 mt-0.5">Requests</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md">
//             <CgProfile size={22} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-24">
//           <div>
//             <p className="text-xs sm:text-sm text-[#2C5284]">Pending</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.pending}</h1>
//             <p className="text-xs text-gray-400 mt-0.5">Awaiting</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md">
//             <CalendarDays size={22} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-24">
//           <div>
//             <p className="text-xs sm:text-sm text-[#2C5284]">Approved</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.approved}</h1>
//             <p className="text-xs text-gray-400 mt-0.5">Accepted</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md">
//             <FaRegCheckCircle size={22} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-24">
//           <div>
//             <p className="text-xs sm:text-sm text-[#2C5284]">Rejected</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.rejected}</h1>
//             <p className="text-xs text-gray-400 mt-0.5">Declined</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md">
//             <RxCrossCircled size={22} className="text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#2C5284]">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Leave Type</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Duration</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Applied Date</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {leaves.length > 0 ? (
//               leaves.map((leave) => (
//                 <tr key={leave.id} className="hover:bg-blue-50/30 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {leave.leaveType}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{leave.startDate} to {leave.endDate}</div>
//                     <div className="text-xs text-gray-500">{leave.days} day(s)</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                     {leave.appliedDate}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
//                       {leave.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => viewDetails(leave)}
//                         className="p-2 text-[#2C5284] hover:bg-blue-50 rounded-lg transition-colors"
//                         title="View Details"
//                       >
//                         <FaEye size={16} />
//                       </button>
//                       {leave.status === 'Pending' && (
//                         <>
//                           <button
//                             onClick={() => handleEdit(leave)}
//                             className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                             title="Edit"
//                           >
//                             <FaEdit size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(leave.id)}
//                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                             title="Delete"
//                           >
//                             <FaTrash size={16} />
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
//                   No leave requests yet. Click "Apply Leave" to get started.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="lg:hidden space-y-3">
//         {leaves.length > 0 ? (
//           leaves.map((leave) => (
//             <div key={leave.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//               <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
//                 <div>
//                   <p className="font-semibold text-gray-900 text-sm">{leave.leaveType}</p>
//                   <p className="text-xs text-gray-500 mt-0.5">{leave.startDate} to {leave.endDate}</p>
//                 </div>
//                 <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(leave.status)}`}>
//                   {leave.status}
//                 </span>
//               </div>
//               <div className="p-4">
//                 <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
//                   <div>
//                     <p className="text-gray-400 uppercase font-bold mb-1">Duration</p>
//                     <p className="text-gray-900 font-medium">{leave.days} day(s)</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400 uppercase font-bold mb-1">Applied</p>
//                     <p className="text-gray-900 font-medium">{leave.appliedDate}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                   <button
//                     onClick={() => viewDetails(leave)}
//                     className="flex items-center gap-1.5 text-xs font-bold text-[#2C5284] uppercase tracking-wider"
//                   >
//                     <FaEye size={13} /> View Details
//                   </button>
//                   {leave.status === 'Pending' && (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => handleEdit(leave)}
//                         className="p-2 text-green-600 bg-green-50 rounded-lg"
//                         title="Edit"
//                       >
//                         <FaEdit size={14} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(leave.id)}
//                         className="p-2 text-red-600 bg-red-50 rounded-lg"
//                         title="Delete"
//                       >
//                         <FaTrash size={14} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
//             No leave requests yet. Tap "Apply" to get started.
//           </div>
//         )}
//       </div>

//       {/* Apply / Edit Leave Modal */}
//       {showApplyModal && (
//         <ApplyLeaveModal
//           editingLeave={editingLeave}
//           onClose={() => { setShowApplyModal(false); setEditingLeave(null) }}
//           onSubmit={handleSubmit}
//         />
//       )}

//       {/* Detail Modal */}
//       {showDetailModal && selectedLeave && (
//         <UserLeaveDetailModal
//           leave={selectedLeave}
//           onClose={() => setShowDetailModal(false)}
//         />
//       )}
//     </div>
//   )
// }

// export default UserLeave

























import { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { getEmployeeLeaves, leaveTypes } from '../../data/mockLeaveData';
import { FaPlus, FaEdit, FaTrash, FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaRegCheckCircle } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { CalendarDays } from 'lucide-react';
import { CgProfile } from 'react-icons/cg';
import UserLeaveDetailModal from './UserLeaveDetailModal';
import 'react-datepicker/dist/react-datepicker.css';

// ── Apply / Edit Leave Modal ──────────────────────────────────────────────────
function ApplyLeaveModal({ onClose, onSubmit, editingLeave }) {
  const [leaveType, setLeaveType] = useState(
    editingLeave ? leaveTypes.find(t => t.value === editingLeave.leaveType) : null
  )
  const [startDate, setStartDate] = useState(
    editingLeave ? new Date(editingLeave.startDate) : null
  )
  const [endDate, setEndDate] = useState(
    editingLeave ? new Date(editingLeave.endDate) : null
  )
  const [reason, setReason] = useState(editingLeave ? editingLeave.reason : '')

  const calculateDays = (start, end) => {
    if (!start || !end) return 0
    return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1
  }

  const days = calculateDays(startDate, endDate)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!leaveType || !startDate || !endDate || !reason.trim()) return
    onSubmit({
      leaveType: leaveType.value,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      days,
      reason,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Leave Type <span className="text-red-500">*</span>
            </label>
            <Select
              value={leaveType}
              onChange={setLeaveType}
              options={leaveTypes}
              placeholder="Select leave type..."
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
                  borderRadius: '0.5rem',
                  padding: '2px',
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(44,82,132,0.2)' : 'none',
                  '&:hover': { borderColor: '#2C5284' },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? '#f3f4f6' : 'white',
                  color: state.isSelected ? 'white' : '#1f2937',
                }),
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => { setStartDate(date); if (endDate && date > endDate) setEndDate(null) }}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
                placeholderText="Select start date"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate || new Date()}
                dateFormat="yyyy-MM-dd"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
                placeholderText="Select end date"
              />
            </div>
          </div>

          {days > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm text-blue-700 font-medium">Total Duration</span>
              <span className="bg-[#2C5284] text-white text-sm font-bold px-3 py-1 rounded-full">
                {days} day{days > 1 ? 's' : ''}
              </span>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none resize-none text-sm"
              placeholder="Enter the reason for your leave..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 px-4 py-3 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm">
              {editingLeave ? 'Update Request' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
function UserLeave({ setTitle }) {
  const currentUserId = 1
  const ITEMS_PER_PAGE = 5

  const [leaves, setLeaves]                     = useState([])
  const [showApplyModal, setShowApplyModal]     = useState(false)
  const [selectedLeave, setSelectedLeave]       = useState(null)
  const [showDetailModal, setShowDetailModal]   = useState(false)
  const [editingLeave, setEditingLeave]         = useState(null)
  const [currentPage, setCurrentPage]           = useState(1)
  const [filterDate, setFilterDate]             = useState('')
  const [filterStatus, setFilterStatus]         = useState('All')

  useEffect(() => {
    setTitle('My Leave Requests')
    setLeaves(getEmployeeLeaves(currentUserId))
  }, [setTitle])

  // ── Filtering ───────────────────────────────────────────────────────────────
  const filteredLeaves = leaves.filter(leave => {
    const matchesStatus = filterStatus === 'All' || leave.status === filterStatus
    const matchesDate   = !filterDate ||
      leave.startDate === filterDate ||
      leave.endDate   === filterDate ||
      leave.appliedDate === filterDate ||
      (leave.startDate <= filterDate && leave.endDate >= filterDate)
    return matchesStatus && matchesDate
  })

  const hasActiveFilter = filterDate || filterStatus !== 'All'

  const clearFilters = () => {
    setFilterDate('')
    setFilterStatus('All')
    setCurrentPage(1)
  }

  // ── Pagination ──────────────────────────────────────────────────────────────
  const totalPages      = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE)
  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1) }, [filterDate, filterStatus])

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleSubmit = ({ leaveType, startDate, endDate, days, reason }) => {
    const newLeave = {
      id: editingLeave ? editingLeave.id : Date.now(),
      employeeId: currentUserId,
      employeeName: 'Ali Hamza',
      email: 'alihamza@gmail.com',
      leaveType, startDate, endDate, days, reason,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      adminComment: '',
    }
    if (editingLeave) {
      setLeaves(prev => prev.map(l => l.id === editingLeave.id ? newLeave : l))
    } else {
      setLeaves(prev => [newLeave, ...prev])
      setCurrentPage(1)
    }
    setShowApplyModal(false)
    setEditingLeave(null)
  }

  const handleEdit = (leave) => {
    if (leave.status !== 'Pending') { alert('You can only edit pending leave requests'); return }
    setEditingLeave(leave)
    setShowApplyModal(true)
  }

  const handleDelete = (leaveId) => {
    const leave = leaves.find(l => l.id === leaveId)
    if (leave.status !== 'Pending') { alert('You can only delete pending leave requests'); return }
    if (!window.confirm('Are you sure you want to delete this leave request?')) return
    setLeaves(prev => {
      const updated  = prev.filter(l => l.id !== leaveId)
      const newTotal = Math.ceil(updated.filter(l => {
        const ms = filterStatus === 'All' || l.status === filterStatus
        const md = !filterDate || l.startDate <= filterDate && l.endDate >= filterDate || l.appliedDate === filterDate
        return ms && md
      }).length / ITEMS_PER_PAGE)
      if (currentPage > newTotal && newTotal > 0) setCurrentPage(newTotal)
      return updated
    })
  }

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'bg-green-100 text-green-800'
    if (status === 'Rejected') return 'bg-red-100 text-red-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  const stats = {
    total:    leaves.length,
    pending:  leaves.filter(l => l.status === 'Pending').length,
    approved: leaves.filter(l => l.status === 'Approved').length,
    rejected: leaves.filter(l => l.status === 'Rejected').length,
  }

  const statusOptions = ['All', 'Pending', 'Approved', 'Rejected']

  // ── Pagination Bar ──────────────────────────────────────────────────────────
  const PaginationBar = () => {
    if (totalPages <= 1) return null
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
        <p className="text-sm text-gray-500">
          Showing{' '}
          <span className="font-semibold text-gray-800">
            {filteredLeaves.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
          </span>{' '}to{' '}
          <span className="font-semibold text-gray-800">
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredLeaves.length)}
          </span>{' '}of{' '}
          <span className="font-semibold text-gray-800">{filteredLeaves.length}</span> requests
        </p>
        <div className="flex items-center gap-1">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <FaChevronLeft size={12} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => goToPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors border
                ${page === currentPage
                  ? 'bg-[#2C5284] text-white border-[#2C5284]'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
              {page}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>
    )
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">My Leave Requests</h1>
        <button
          onClick={() => { setEditingLeave(null); setShowApplyModal(true) }}
          className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm shadow"
        >
          <FaPlus size={16} />
          <span className="hidden sm:inline">Apply Leave</span>
          <span className="sm:hidden">Apply</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { label: 'Total',    value: stats.total,    sub: 'Requests', icon: <CgProfile size={22} className="text-white" /> },
          { label: 'Pending',  value: stats.pending,  sub: 'Awaiting', icon: <CalendarDays size={22} className="text-white" /> },
          { label: 'Approved', value: stats.approved, sub: 'Accepted', icon: <FaRegCheckCircle size={22} className="text-white" /> },
          { label: 'Rejected', value: stats.rejected, sub: 'Declined', icon: <RxCrossCircled size={22} className="text-white" /> },
        ].map(({ label, value, sub, icon }) => (
          <div key={label}
            className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition-shadow duration-300 min-h-24">
            <div>
              <p className="text-xs sm:text-sm text-[#2C5284]">{label}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{value}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
            <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
              {icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Date Filter */}
          <div className="flex items-center gap-2 flex-1">
            <CalendarDays size={18} className="text-[#2C5284] flex-shrink-0" />
            <input
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <Select
              value={filterStatus === 'All' ? { value: 'All', label: 'All Statuses' } : { value: filterStatus, label: filterStatus }}
              onChange={opt => setFilterStatus(opt ? opt.value : 'All')}
              options={statusOptions.map(s => ({ value: s, label: s === 'All' ? 'All Statuses' : s }))}
              placeholder="Filter by status..."
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
                  borderRadius: '0.5rem',
                  minHeight: '42px',
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(44,82,132,0.2)' : 'none',
                  '&:hover': { borderColor: '#2C5284' },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? '#f3f4f6' : 'white',
                  color: state.isSelected ? 'white' : '#1f2937',
                  fontSize: '0.875rem',
                }),
                singleValue: (base) => ({ ...base, fontSize: '0.875rem', color: '#1f2937' }),
              }}
            />
          </div>

          {/* Clear */}
          {hasActiveFilter && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <FaTimes size={11} /> Clear
            </button>
          )}
        </div>

        {/* Active filter label */}
        {filterDate && (
          <p className="text-xs text-[#365F8D] font-medium mt-2">
            Filtering by date:{' '}
            {new Date(filterDate + 'T00:00:00').toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>
        )}

        {filteredLeaves.length === 0 && hasActiveFilter && (
          <p className="text-xs text-red-500 font-medium mt-1">No leave requests match the selected filters.</p>
        )}
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#2C5284]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Leave Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Duration</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Applied Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedLeaves.length > 0 ? paginatedLeaves.map(leave => (
              <tr key={leave.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{leave.leaveType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{leave.startDate} → {leave.endDate}</div>
                  <div className="text-xs text-gray-500">{leave.days} day(s)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{leave.appliedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setSelectedLeave(leave); setShowDetailModal(true) }}
                      className="p-2 text-[#2C5284] hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                      <FaEye size={16} />
                    </button>
                    {leave.status === 'Pending' && (
                      <>
                        <button onClick={() => handleEdit(leave)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                          <FaEdit size={16} />
                        </button>
                        <button onClick={() => handleDelete(leave.id)}
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
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                  {hasActiveFilter ? 'No records match the selected filters.' : 'No leave requests yet. Click "Apply Leave" to get started.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Desktop Pagination footer */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30">
            <PaginationBar />
          </div>
        )}
      </div>

      {/* ── Mobile Cards ── */}
      <div className="lg:hidden space-y-3">
        {paginatedLeaves.length > 0 ? paginatedLeaves.map(leave => (
          <div key={leave.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{leave.leaveType}</p>
                <p className="text-xs text-gray-500 mt-0.5">{leave.startDate} → {leave.endDate}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(leave.status)}`}>
                {leave.status}
              </span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div>
                  <p className="text-gray-400 uppercase font-bold mb-1">Duration</p>
                  <p className="text-gray-900 font-medium">{leave.days} day(s)</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase font-bold mb-1">Applied</p>
                  <p className="text-gray-900 font-medium">{leave.appliedDate}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button onClick={() => { setSelectedLeave(leave); setShowDetailModal(true) }}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#2C5284] uppercase tracking-wider">
                  <FaEye size={13} /> View Details
                </button>
                {leave.status === 'Pending' && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(leave)} className="p-2 text-green-600 bg-green-50 rounded-lg">
                      <FaEdit size={14} />
                    </button>
                    <button onClick={() => handleDelete(leave.id)} className="p-2 text-red-600 bg-red-50 rounded-lg">
                      <FaTrash size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
            {hasActiveFilter ? 'No records match the selected filters.' : 'No leave requests yet. Tap "Apply" to get started.'}
          </div>
        )}

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3">
            <PaginationBar />
          </div>
        )}
      </div>

      {/* Modals */}
      {showApplyModal && (
        <ApplyLeaveModal
          editingLeave={editingLeave}
          onClose={() => { setShowApplyModal(false); setEditingLeave(null) }}
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
  )
}

export default UserLeave
