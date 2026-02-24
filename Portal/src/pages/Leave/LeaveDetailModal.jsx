// import { useState } from 'react';
// import Select from 'react-select';
// import { FaTimes } from 'react-icons/fa';

// function LeaveDetailModal({ leave, onClose, onStatusChange }) {
//   const [status, setStatus] = useState({
//     value: leave.status,
//     label: leave.status,
//   });
//   const [adminComment, setAdminComment] = useState(leave.adminComment || '');

//   const statusOptions = [
//     { value: 'Pending', label: 'Pending' },
//     { value: 'Approved', label: 'Approved' },
//     { value: 'Rejected', label: 'Rejected' },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onStatusChange(leave.id, status.value, adminComment);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
//       justify-center z-50 p-4 overflow-y-auto">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl 
//         my-8">
        
//         {/* Header */}
//         <div className="bg-[#2C5284] p-4 sm:p-6 flex justify-between items-center 
//           rounded-t-xl">
//           <h2 className="text-xl sm:text-2xl font-bold text-white">
//             Leave Request Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-white hover:text-gray-200 transition-colors p-2"
//           >
//             <FaTimes size={24} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
//           {/* Employee Info */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-4 sm:mb-6">
//             <h3 className="text-base sm:text-lg font-semibold text-[#2C5284] mb-3">
//               Employee Information
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Name</p>
//                 <p className="font-medium text-gray-900 text-sm sm:text-base">
//                   {leave.employeeName}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Email</p>
//                 <p className="font-medium text-gray-900 text-sm sm:text-base break-all">
//                   {leave.email}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Leave Details */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-4 sm:mb-6">
//             <h3 className="text-base sm:text-lg font-semibold text-[#2C5284] mb-3">
//               Leave Details
//             </h3>
//             <div className="space-y-2 sm:space-y-3">
//               <div className="flex justify-between text-sm sm:text-base">
//                 <span className="text-gray-600">Leave Type:</span>
//                 <span className="font-medium text-gray-900">
//                   {leave.leaveType}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm sm:text-base">
//                 <span className="text-gray-600">Start Date:</span>
//                 <span className="font-medium text-gray-900">
//                   {leave.startDate}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm sm:text-base">
//                 <span className="text-gray-600">End Date:</span>
//                 <span className="font-medium text-gray-900">{leave.endDate}</span>
//               </div>
//               <div className="flex justify-between text-sm sm:text-base">
//                 <span className="text-gray-600">Total Days:</span>
//                 <span className="font-medium text-gray-900">
//                   {leave.days} day(s)
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm sm:text-base">
//                 <span className="text-gray-600">Applied Date:</span>
//                 <span className="font-medium text-gray-900">
//                   {leave.appliedDate}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Reason */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-4 sm:mb-6">
//             <h3 className="text-base sm:text-lg font-semibold text-[#2C5284] mb-3">
//               Reason
//             </h3>
//             <p className="text-gray-900 leading-relaxed text-sm sm:text-base">
//               {leave.reason}
//             </p>
//           </div>

//           {/* Admin Action Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Status Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Update Status
//               </label>
//               <Select
//                 value={status}
//                 onChange={setStatus}
//                 options={statusOptions}
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

//             {/* Admin Comment */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Admin Comment
//               </label>
//               <textarea
//                 value={adminComment}
//                 onChange={(e) => setAdminComment(e.target.value)}
//                 rows={4}
//                 className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg 
//                   focus:ring-2 focus:ring-[#365F8D] focus:border-transparent 
//                   outline-none transition-all resize-none text-sm sm:text-base"
//                 placeholder="Add your comment here..."
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <button
//                 type="submit"
//                 className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#2C5284] text-white rounded-lg 
//                   font-medium hover:bg-[#365F8D] transition-colors text-sm sm:text-base"
//               >
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 text-gray-700 rounded-lg 
//                   font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>

//           {/* Previous Admin Comment (if exists) */}
//           {leave.adminComment && (
//             <div className="mt-4 sm:mt-6 bg-blue-50 rounded-lg p-4 border-l-4 
//               border-blue-500">
//               <h4 className="text-sm font-semibold text-blue-900 mb-2">
//                 Previous Admin Comment
//               </h4>
//               <p className="text-sm text-blue-800">{leave.adminComment}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LeaveDetailModal;















// import { useState } from 'react';
// import Select from 'react-select';
// import { FaTimes } from 'react-icons/fa';

// function LeaveDetailModal({ leave, onClose, onStatusChange }) {
//   const [status, setStatus] = useState({
//     value: leave.status,
//     label: leave.status,
//   });
//   const [adminComment, setAdminComment] = useState(leave.adminComment || '');

//   const statusOptions = [
//     { value: 'Pending', label: 'Pending' },
//     { value: 'Approved', label: 'Approved' },
//     { value: 'Rejected', label: 'Rejected' },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onStatusChange(leave.id, status.value, adminComment);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
//       justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full 
//         max-h-[95vh] overflow-y-auto">
        
//         {/* Header */}
//         <div className="bg-[#2C5284] p-6 flex justify-between items-center 
//           rounded-t-xl">
//           <h2 className="text-2xl font-bold text-white">Leave Request Details</h2>
//           <button
//             onClick={onClose}
//             className="text-white hover:text-gray-200 transition-colors"
//           >
//             <FaTimes size={24} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Employee Info */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-6">
//             <h3 className="text-lg font-semibold text-[#2C5284] mb-3">
//               Employee Information
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600">Name</p>
//                 <p className="font-medium text-gray-900">{leave.employeeName}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Email</p>
//                 <p className="font-medium text-gray-900">{leave.email}</p>
//               </div>
//             </div>
//           </div>

//           {/* Leave Details */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-6">
//             <h3 className="text-lg font-semibold text-[#2C5284] mb-3">
//               Leave Details
//             </h3>
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Leave Type:</span>
//                 <span className="font-medium text-gray-900">
//                   {leave.leaveType}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Start Date:</span>
//                 <span className="font-medium text-gray-900">
//                   {leave.startDate}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">End Date:</span>
//                 <span className="font-medium text-gray-900">{leave.endDate}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Total Days:</span>
//                 <span className="font-medium text-gray-900">
//                   {leave.days} day(s)
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Applied Date:</span>
//                 <span className="font-medium text-gray-900">
//                   {leave.appliedDate}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Reason */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-6">
//             <h3 className="text-lg font-semibold text-[#2C5284] mb-3">Reason</h3>
//             <p className="text-gray-900 leading-relaxed">{leave.reason}</p>
//           </div>

//           {/* Admin Action Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Status Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Update Status
//               </label>
//               <Select
//                 value={status}
//                 onChange={setStatus}
//                 options={statusOptions}
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

//             {/* Admin Comment */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Admin Comment
//               </label>
//               <textarea
//                 value={adminComment}
//                 onChange={(e) => setAdminComment(e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
//                   focus:ring-2 focus:ring-[#365F8D] focus:border-transparent 
//                   outline-none transition-all resize-none"
//                 placeholder="Add your comment here..."
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="submit"
//                 className="flex-1 px-6 py-3 bg-[#2C5284] text-white rounded-lg 
//                   font-medium hover:bg-[#365F8D] transition-colors"
//               >
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg 
//                   font-medium hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>

//           {/* Previous Admin Comment (if exists) */}
//           {leave.adminComment && (
//             <div className="mt-6 bg-blue-50 rounded-lg p-4 border-l-4 
//               border-blue-500">
//               <h4 className="text-sm font-semibold text-blue-900 mb-2">
//                 Previous Admin Comment
//               </h4>
//               <p className="text-sm text-blue-800">{leave.adminComment}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LeaveDetailModal;























import { useState } from 'react';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';

function LeaveDetailModal({ leave, onClose, onStatusChange }) {
  const [status, setStatus] = useState({
    value: leave.status,
    label: leave.status,
  });
  const [adminComment, setAdminComment] = useState(leave.adminComment || '');

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onStatusChange(leave.id, status.value, adminComment);
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center 
      justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full 
        max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-[#2C5284] p-6 flex justify-between items-center 
          rounded">
          <h2 className="text-2xl font-bold text-white">Leave Request Details</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Employee Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-[#2C5284] mb-3">
              Employee Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{leave.employeeName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{leave.email}</p>
              </div>
            </div>
          </div>

          {/* Leave Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-[#2C5284] mb-3">
              Leave Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Leave Type:</span>
                <span className="font-medium text-gray-900">
                  {leave.leaveType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium text-gray-900">
                  {leave.startDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Date:</span>
                <span className="font-medium text-gray-900">{leave.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Days:</span>
                <span className="font-medium text-gray-900">
                  {leave.days} day(s)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Applied Date:</span>
                <span className="font-medium text-gray-900">
                  {leave.appliedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-[#2C5284] mb-3">Reason</h3>
            <p className="text-gray-900 leading-relaxed">{leave.reason}</p>
          </div>

          {/* Admin Action Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Status Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Status
              </label>
              <Select
                value={status}
                onChange={setStatus}
                options={statusOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#d1d5db',
                    '&:hover': { borderColor: '#2C5284' },
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? '#2C5284'
                      : state.isFocused
                      ? '#f3f4f6'
                      : 'white',
                    color: state.isSelected ? 'white' : '#1f2937',
                  }),
                }}
              />
            </div>

            {/* Admin Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Comment
              </label>
              <textarea
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-[#2C5284] focus:border-transparent 
                  outline-none transition-all resize-none"
                placeholder="Add your comment here..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#2C5284] text-white rounded-lg 
                  font-medium hover:bg-[#2C5284] transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg 
                  font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Previous Admin Comment (if exists) */}
          {leave.adminComment && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border-l-4 
              border-blue-500">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Previous Admin Comment
              </h4>
              <p className="text-sm text-blue-800">{leave.adminComment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaveDetailModal;


