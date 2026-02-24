// import { FaTimes } from 'react-icons/fa';

// function UserLeaveDetailModal({ leave, onClose }) {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Approved':
//         return 'bg-green-100 text-green-800 border-green-300';
//       case 'Rejected':
//         return 'bg-red-100 text-red-800 border-red-300';
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-300';
//     }
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
//         <div className="p-6 space-y-6">
//           {/* Status Badge */}
//           <div className="text-center">
//             <span
//               className={`inline-block px-6 py-3 rounded-full text-lg 
//                 font-semibold border-2 ${getStatusColor(leave.status)}`}
//             >
//               {leave.status}
//             </span>
//           </div>

//           {/* Leave Type & Days */}
//           <div className="bg-gray-50 rounded-lg p-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center">
//                 <p className="text-sm text-gray-600 mb-1">Leave Type</p>
//                 <p className="text-lg font-semibold text-gray-900">
//                   {leave.leaveType}
//                 </p>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-gray-600 mb-1">Total Days</p>
//                 <p className="text-lg font-semibold text-gray-900">
//                   {leave.days} day(s)
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Date Information */}
//           <div className="bg-gray-50 rounded-lg p-4">
//             <h3 className="text-lg font-semibold text-[#2C5284] mb-3">
//               Date Information
//             </h3>
//             <div className="space-y-2">
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
//                 <span className="text-gray-600">Applied Date:</span>
//                 <span className="font-medium text-gray-900">
//                   {leave.appliedDate}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Reason */}
//           <div className="bg-gray-50 rounded-lg p-4">
//             <h3 className="text-lg font-semibold text-[#2C5284] mb-3">
//               Reason for Leave
//             </h3>
//             <p className="text-gray-900 leading-relaxed">{leave.reason}</p>
//           </div>

//           {/* Admin Comment (if exists) */}
//           {leave.adminComment && (
//             <div
//               className={`rounded-lg p-4 border-l-4 ${
//                 leave.status === 'Approved'
//                   ? 'bg-green-50 border-green-500'
//                   : leave.status === 'Rejected'
//                   ? 'bg-red-50 border-red-500'
//                   : 'bg-blue-50 border-blue-500'
//               }`}
//             >
//               <h3
//                 className={`text-sm font-semibold mb-2 ${
//                   leave.status === 'Approved'
//                     ? 'text-green-900'
//                     : leave.status === 'Rejected'
//                     ? 'text-red-900'
//                     : 'text-blue-900'
//                 }`}
//               >
//                 Admin Comment
//               </h3>
//               <p
//                 className={`text-sm ${
//                   leave.status === 'Approved'
//                     ? 'text-green-800'
//                     : leave.status === 'Rejected'
//                     ? 'text-red-800'
//                     : 'text-blue-800'
//                 }`}
//               >
//                 {leave.adminComment}
//               </p>
//             </div>
//           )}

//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="w-full px-6 py-3 bg-[#2C5284] text-white rounded-lg 
//               font-medium hover:bg-[#365F8D] transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserLeaveDetailModal;












import { FaTimes } from 'react-icons/fa';

function UserLeaveDetailModal({ leave, onClose }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center 
      justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full 
        max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-[#2C5284] p-6 flex justify-between items-center 
          rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">Leave Request Details</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="text-center">
            <span
              className={`inline-block px-6 py-3 rounded-full text-lg 
                font-semibold border-2 ${getStatusColor(leave.status)}`}
            >
              {leave.status}
            </span>
          </div>

          {/* Leave Type & Days */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Leave Type</p>
                <p className="text-lg font-semibold text-gray-900">
                  {leave.leaveType}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Days</p>
                <p className="text-lg font-semibold text-gray-900">
                  {leave.days} day(s)
                </p>
              </div>
            </div>
          </div>

          {/* Date Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#2C5284] mb-3">
              Date Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium text-gray-900">{leave.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Date:</span>
                <span className="font-medium text-gray-900">{leave.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Applied Date:</span>
                <span className="font-medium text-gray-900">{leave.appliedDate}</span>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#2C5284] mb-3">
              Reason for Leave
            </h3>
            <p className="text-gray-900 leading-relaxed">{leave.reason}</p>
          </div>

          {/* Admin Comment */}
          {leave.adminComment && (
            <div
              className={`rounded-lg p-4 border-l-4 ${
                leave.status === 'Approved'
                  ? 'bg-green-50 border-green-500'
                  : leave.status === 'Rejected'
                  ? 'bg-red-50 border-red-500'
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <h3
                className={`text-sm font-semibold mb-2 ${
                  leave.status === 'Approved'
                    ? 'text-green-900'
                    : leave.status === 'Rejected'
                    ? 'text-red-900'
                    : 'text-blue-900'
                }`}
              >
                Admin Comment
              </h3>
              <p
                className={`text-sm ${
                  leave.status === 'Approved'
                    ? 'text-green-800'
                    : leave.status === 'Rejected'
                    ? 'text-red-800'
                    : 'text-blue-800'
                }`}
              >
                {leave.adminComment}
              </p>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[#2C5284] text-white rounded-lg 
              font-medium hover:bg-[#365F8D] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLeaveDetailModal;