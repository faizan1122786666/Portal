// import React from 'react'
// import { useEffect } from 'react'


// function Attendance({setTitle}) {
//  useEffect(() => {
//     setTitle('Attendance Page')
//   }, [setTitle])
  
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Attendance








// import { useEffect, useState } from 'react'
// import { getEmployeeRecords } from '../../data/mockAttendanceData'
// import { FaEye } from 'react-icons/fa'
// import EmployeeAttendanceModal from './EmployeeAttendanceModal'
// import { useAuthContext } from '../../context'

// function UserAttendance({ setTitle }) {
//   const { user } = useAuthContext()
//   const [records, setRecords] = useState([])
//   const [showModal, setShowModal] = useState(false)

//   // Use employeeId from user context, fallback to 1 for mock
//   const currentEmployee = {
//     employeeId: user?.employeeId || 1,
//     name: user?.name || 'Employee',
//     email: user?.email || ''
//   }

//   useEffect(() => {
//     setTitle('My Attendance')
//     const empRecords = getEmployeeRecords(currentEmployee.employeeId)
//     setRecords(empRecords.sort((a, b) => new Date(b.date) - new Date(a.date)))
//   }, [setTitle])

//   // Monthly summary
//   const summary = {
//     present: records.filter(r => r.status === 'Present').length,
//     absent: records.filter(r => r.status === 'Absent').length,
//     leave: records.filter(r => r.status === 'Leave').length,
//   }

//   const getStatusColor = (status) => {
//     if (status === 'Present') return 'bg-green-100 text-green-800'
//     if (status === 'Absent') return 'bg-red-100 text-red-800'
//     return 'bg-yellow-100 text-yellow-800'
//   }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">My Attendance</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-[#2C5284] text-white rounded-lg 
//             hover:bg-[#365F8D] transition-colors font-medium"
//         >
//           <FaEye size={16} />
//           View Details
//         </button>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm text-center">
//           <p className="text-2xl font-bold text-green-600">{summary.present}</p>
//           <p className="text-sm text-gray-600">Present</p>
//         </div>
//         <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm text-center">
//           <p className="text-2xl font-bold text-red-600">{summary.absent}</p>
//           <p className="text-sm text-gray-600">Absent</p>
//         </div>
//         <div className="bg-white p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm text-center">
//           <p className="text-2xl font-bold text-yellow-600">{summary.leave}</p>
//           <p className="text-sm text-gray-600">Leave</p>
//         </div>
//       </div>

//       {/* Attendance Table - Desktop */}
//       <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="p-4 bg-[#2C5284]">
//           <h2 className="text-lg font-semibold text-white">Attendance Records</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Work Hours</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {records.map((record) => (
//                 <tr key={record.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{record.date}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{record.checkIn}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{record.checkOut}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
//                       {record.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{record.workHours}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile Cards */}
//       <div className="lg:hidden space-y-3">
//         <div className="p-4 bg-[#2C5284] rounded-t-xl">
//           <h2 className="text-lg font-semibold text-white">Attendance Records</h2>
//         </div>
//         {records.map((record) => (
//           <div key={record.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//             <div className="flex justify-between items-start mb-2">
//               <span className="font-medium text-gray-900">{record.date}</span>
//               <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
//                 {record.status}
//               </span>
//             </div>
//             <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
//               <div>In: <span className="text-gray-900">{record.checkIn}</span></div>
//               <div>Out: <span className="text-gray-900">{record.checkOut}</span></div>
//               <div className="col-span-2">Hours: <span className="text-gray-900">{record.workHours}</span></div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Detail Modal */}
//       {showModal && (
//         <EmployeeAttendanceModal
//           employee={currentEmployee}
//           onClose={() => setShowModal(false)}
//           isAdmin={false}
//         />
//       )}
//     </div>
//   )
// }

// export default UserAttendance




















// import { useEffect, useState } from 'react'
// import { getEmployeeRecords } from '../../data/mockAttendanceData'
// import { useAuthContext } from '../../context'
// import { CgProfile } from 'react-icons/cg'
// import { FaTimes, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { AiOutlineClockCircle } from 'react-icons/ai'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import { RxCrossCircled } from 'react-icons/rx'
// import { CalendarDays } from 'lucide-react'

// // Circular Progress Component
// function CircularProgress({ workHours }) {
//   if (!workHours || workHours === '------') return (
//     <div className="flex justify-center items-center">
//       <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
//         <span className="text-gray-400 text-sm">No Data</span>
//       </div>
//     </div>
//   )

//   const parts = workHours.split('h')
//   const hours = parseInt(parts[0].trim()) || 0
//   const minutes = parts[1] ? parseInt(parts[1].trim()) || 0 : 0
//   const totalMinutes = hours * 60 + minutes
//   const percentage = Math.min((totalMinutes / 540) * 100, 100)
//   const strokeDasharray = 2 * Math.PI * 60
//   const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

//   return (
//     <div className="flex justify-center items-center relative">
//       <svg className="w-32 h-32 transform -rotate-90">
//         <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
//         <circle
//           cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8"
//           strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round" fill="transparent" className="text-[#2C5284]"
//         />
//       </svg>
//       <div className="absolute flex flex-col items-center">
//         <span className="text-lg font-bold text-gray-800">{workHours}</span>
//         <span className="text-xs text-gray-500">Work Hours</span>
//       </div>
//     </div>
//   )
// }

// // Attendance Detail Modal
// function AttendanceDetailModal({ record, employee, onClose }) {
//   const isPresent = record.status === 'Present'
//   const isLeave = record.status === 'Leave'

//   const dateObj = new Date(record.date + 'T00:00:00')
//   const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
//   const formattedDate = record.date.split('-').reverse().join('-')

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
//           <div>
//             <h2 className="text-lg font-bold text-white">Attendance Details</h2>
//             <p className="text-blue-100 text-sm">{formattedDate} ({dayName})</p>
//           </div>
//           <button onClick={onClose} className="text-white hover:bg-white/10 rounded-full p-2 transition-colors">
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Employee Info */}
//         <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
//           <div className="flex items-center gap-4 flex-wrap">
//             <div className="w-12 h-12 rounded-full bg-[#365F8D] flex items-center justify-center flex-shrink-0">
//               <CgProfile size={28} className="text-white" />
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h3 className="font-bold text-gray-900">{employee.name}</h3>
//                 <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">It's you</span>
//                 <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
//                   #{employee.employeeId}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-500 mt-0.5">{employee.designation || 'Employee'}</p>
//             </div>
//             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
//               record.status === 'Present' ? 'bg-green-100 text-green-700' :
//               record.status === 'Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//             }`}>
//               {record.status}
//             </span>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Left - Times */}
//           <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100">
//             <div className="mb-4">
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock In</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {isPresent ? record.checkIn : '------'}
//               </p>
//             </div>

//             <div className="my-4">
//               <CircularProgress workHours={record.workHours} />
//             </div>

//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock Out</p>
//               <p className="text-base font-semibold text-gray-700">
//                 {record.checkOut === '------' ? '-- : -- (Did not clock out)' : record.checkOut}
//               </p>
//             </div>
//           </div>

//           {/* Right - Activity */}
//           <div className="p-5">
//             <h4 className="text-base font-bold text-gray-900 mb-4">Activity</h4>

//             {/* Clock In Activity */}
//             <div className="flex items-start gap-3">
//               <div className="mt-0.5 flex flex-col items-center">
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPresent ? 'border-[#365F8D]' : 'border-gray-300'}`}>
//                   {isPresent && <div className="w-2.5 h-2.5 rounded-full bg-[#365F8D]" />}
//                 </div>
//                 <div className="w-0.5 h-10 bg-gray-200 my-1" />
//               </div>
//               <div className="flex-1 pb-2">
//                 <div className="flex items-center gap-2 mb-1 flex-wrap">
//                   <p className="font-semibold text-gray-900 text-sm">Clock In</p>
//                   {isPresent && <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">General Shift</span>}
//                   {isLeave && <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">On Leave</span>}
//                   {!isPresent && !isLeave && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">Absent</span>}
//                 </div>
//                 {isPresent ? (
//                   <>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <AiOutlineClockCircle size={12} />{formattedDate} {record.checkIn}
//                     </p>
//                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                       <FaMapMarkerAlt size={10} />Lahore (home)
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-xs text-gray-400 italic">
//                     {isLeave ? 'On approved leave' : 'Did not clock in'}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Clock Out Activity */}
//             <div className="flex items-start gap-3">
//               <div className="mt-0.5">
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPresent && record.checkOut !== '------' ? 'border-gray-400' : 'border-gray-200'}`}>
//                   {isPresent && record.checkOut !== '------' && <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />}
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-900 text-sm mb-1">Clock Out</p>
//                 {isPresent && record.checkOut !== '------' ? (
//                   <>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <AiOutlineClockCircle size={12} />{formattedDate} {record.checkOut}
//                     </p>
//                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                       <FaMapMarkerAlt size={10} />Lahore (home)
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-xs text-gray-400 italic">Did not clock out</p>
//                 )}
//               </div>
//             </div>

//             {/* Status summary */}
//             <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">Status</span>
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                   record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' :
//                   'bg-red-100 text-red-800'
//                 }`}>{record.status}</span>
//               </div>
//               {record.workHours !== '------' && (
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Work Hours</span>
//                   <span className="text-sm font-semibold text-[#365F8D]">{record.workHours}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function UserAttendance({ setTitle }) {
//   const { user } = useAuthContext()
//   const [records, setRecords] = useState([])
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 8

//   const currentEmployee = {
//     employeeId: user?.employeeId || 2,
//     name: user?.name || 'Employee',
//     email: user?.email || '',
//     designation: user?.designation || 'Employee',
//   }

//   useEffect(() => {
//     setTitle('My Attendance')
//     const empRecords = getEmployeeRecords(currentEmployee.employeeId)
//     setRecords(empRecords.sort((a, b) => new Date(b.date) - new Date(a.date)))
//   }, [setTitle])

//   const summary = {
//     present: records.filter(r => r.status === 'Present').length,
//     absent: records.filter(r => r.status === 'Absent').length,
//     leave: records.filter(r => r.status === 'Leave').length,
//   }

//   const totalPages = Math.ceil(records.length / itemsPerPage)
//   const paginatedRecords = records.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   const handleRowClick = (record) => {
//     setSelectedRecord(record)
//     setShowModal(true)
//   }

//   const getStatusColor = (status) => {
//     if (status === 'Present') return 'bg-green-100 text-green-800'
//     if (status === 'Absent') return 'bg-red-100 text-red-800'
//     return 'bg-yellow-100 text-yellow-800'
//   }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">
//       <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">My Attendance</h1>

//       {/* Enhanced Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-28">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Present Days</p>
//             <h1 className="text-3xl sm:text-4xl font-bold text-[#365F8D]">{summary.present}</h1>
//             <p className="text-xs text-gray-400 mt-1">This period</p>
//           </div>
//           <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
//             <FaRegCheckCircle size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-28">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Absent Days</p>
//             <h1 className="text-3xl sm:text-4xl font-bold text-[#365F8D]">{summary.absent}</h1>
//             <p className="text-xs text-gray-400 mt-1">This period</p>
//           </div>
//           <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
//             <RxCrossCircled size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-28">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Leave Days</p>
//             <h1 className="text-3xl sm:text-4xl font-bold text-[#365F8D]">{summary.leave}</h1>
//             <p className="text-xs text-gray-400 mt-1">This period</p>
//           </div>
//           <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
//             <CalendarDays size={24} className="text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#2C5284]">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock In</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock Out</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedRecords.map((record) => (
//               <tr
//                 key={record.id}
//                 onClick={() => handleRowClick(record)}
//                 className="hover:bg-blue-50 cursor-pointer transition-colors"
//                 title="Click to view details"
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{record.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkIn}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkOut}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.workHours}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
//                     {record.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//             {paginatedRecords.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">No records found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         <p className="text-xs text-gray-400 text-center py-3 border-t border-gray-100">
//           Click any row to view detailed attendance info
//         </p>
//       </div>

//       {/* Mobile Cards */}
//       <div className="lg:hidden space-y-3">
//         {paginatedRecords.map((record) => (
//           <div
//             key={record.id}
//             onClick={() => handleRowClick(record)}
//             className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer active:scale-[0.98] transition-all"
//           >
//             <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
//               <span className="font-semibold text-gray-900 text-sm">{record.date}</span>
//               <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
//                 {record.status}
//               </span>
//             </div>
//             <div className="p-4 grid grid-cols-3 gap-3">
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Clock In</p>
//                 <p className="text-sm text-gray-900 font-medium">{record.checkIn}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Clock Out</p>
//                 <p className="text-sm text-gray-900 font-medium">{record.checkOut}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Work Hrs</p>
//                 <p className="text-sm text-gray-900 font-medium">{record.workHours}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//         {paginatedRecords.length === 0 && (
//           <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
//             No records found.
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-600">
//             Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
//             <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, records.length)}</span> of{' '}
//             <span className="font-semibold text-gray-900">{records.length}</span> records
//           </p>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//             >
//               <FaChevronLeft size={14} className="text-gray-600" />
//             </button>
//             <div className="flex items-center gap-1">
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                     currentPage === i + 1 ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//             <button
//               onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//             >
//               <FaChevronRight size={14} className="text-gray-600" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Detail Modal */}
//       {showModal && selectedRecord && (
//         <AttendanceDetailModal
//           record={selectedRecord}
//           employee={currentEmployee}
//           onClose={() => { setShowModal(false); setSelectedRecord(null) }}
//         />
//       )}
//     </div>
//   )
// }

// export default UserAttendance
























// import { useEffect, useState } from 'react'
// import { getEmployeeRecords } from '../../data/mockAttendanceData'
// import { useAuthContext } from '../../context'
// import { CgProfile } from 'react-icons/cg'
// import { FaTimes, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { AiOutlineClockCircle } from 'react-icons/ai'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import { RxCrossCircled } from 'react-icons/rx'
// import { CalendarDays } from 'lucide-react'

// // Circular Progress Component
// function CircularProgress({ workHours }) {
//   if (!workHours || workHours === '------') return (
//     <div className="flex justify-center items-center">
//       <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
//         <span className="text-gray-400 text-sm">No Data</span>
//       </div>
//     </div>
//   )

//   const parts = workHours.split('h')
//   const hours = parseInt(parts[0].trim()) || 0
//   const minutes = parts[1] ? parseInt(parts[1].trim()) || 0 : 0
//   const totalMinutes = hours * 60 + minutes
//   const percentage = Math.min((totalMinutes / 540) * 100, 100)
//   const strokeDasharray = 2 * Math.PI * 60
//   const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

//   return (
//     <div className="flex justify-center items-center relative">
//       <svg className="w-32 h-32 transform -rotate-90">
//         <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
//         <circle
//           cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8"
//           strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round" fill="transparent" className="text-[#2C5284]"
//         />
//       </svg>
//       <div className="absolute flex flex-col items-center">
//         <span className="text-lg font-bold text-gray-800">{workHours}</span>
//         <span className="text-xs text-gray-500">Work Hours</span>
//       </div>
//     </div>
//   )
// }

// // Attendance Detail Modal
// function AttendanceDetailModal({ record, employee, onClose }) {
//   const isPresent = record.status === 'Present'
//   const isLeave = record.status === 'Leave'

//   const dateObj = new Date(record.date + 'T00:00:00')
//   const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
//   const formattedDate = record.date.split('-').reverse().join('-')

//   return (
//     <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
//           <div>
//             <h2 className="text-lg font-bold text-white">Attendance Details</h2>
//             <p className="text-blue-100 text-sm">{formattedDate} ({dayName})</p>
//           </div>
//           <button onClick={onClose} className="text-white hover:bg-white/10 rounded-full p-2 transition-colors">
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Employee Info */}
//         <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
//           <div className="flex items-center gap-4 flex-wrap">
//             <div className="w-12 h-12 rounded-full bg-[#365F8D] flex items-center justify-center flex-shrink-0">
//               <CgProfile size={28} className="text-white" />
//             </div>
//             <div className="flex-1">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h3 className="font-bold text-gray-900">{employee.name}</h3>
//                 <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">It's you</span>
//                 <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
//                   #{employee.employeeId}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-500 mt-0.5">{employee.designation || 'Employee'}</p>
//             </div>
//             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
//               record.status === 'Present' ? 'bg-green-100 text-green-700' :
//               record.status === 'Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//             }`}>
//               {record.status}
//             </span>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Left - Times */}
//           <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100">
//             <div className="mb-4">
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock In</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {isPresent ? record.checkIn : '------'}
//               </p>
//             </div>

//             <div className="my-4">
//               <CircularProgress workHours={record.workHours} />
//             </div>

//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock Out</p>
//               <p className="text-base font-semibold text-gray-700">
//                 {record.checkOut === '------' ? '-- : -- (Did not clock out)' : record.checkOut}
//               </p>
//             </div>
//           </div>

//           {/* Right - Activity */}
//           <div className="p-5">
//             <h4 className="text-base font-bold text-gray-900 mb-4">Activity</h4>

//             {/* Clock In Activity */}
//             <div className="flex items-start gap-3">
//               <div className="mt-0.5 flex flex-col items-center">
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPresent ? 'border-[#365F8D]' : 'border-gray-300'}`}>
//                   {isPresent && <div className="w-2.5 h-2.5 rounded-full bg-[#365F8D]" />}
//                 </div>
//                 <div className="w-0.5 h-10 bg-gray-200 my-1" />
//               </div>
//               <div className="flex-1 pb-2">
//                 <div className="flex items-center gap-2 mb-1 flex-wrap">
//                   <p className="font-semibold text-gray-900 text-sm">Clock In</p>
//                   {isPresent && <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">General Shift</span>}
//                   {isLeave && <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">On Leave</span>}
//                   {!isPresent && !isLeave && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">Absent</span>}
//                 </div>
//                 {isPresent ? (
//                   <>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <AiOutlineClockCircle size={12} />{formattedDate} {record.checkIn}
//                     </p>
//                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                       <FaMapMarkerAlt size={10} />Lahore (home)
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-xs text-gray-400 italic">
//                     {isLeave ? 'On approved leave' : 'Did not clock in'}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Clock Out Activity */}
//             <div className="flex items-start gap-3">
//               <div className="mt-0.5">
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPresent && record.checkOut !== '------' ? 'border-gray-400' : 'border-gray-200'}`}>
//                   {isPresent && record.checkOut !== '------' && <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />}
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-900 text-sm mb-1">Clock Out</p>
//                 {isPresent && record.checkOut !== '------' ? (
//                   <>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <AiOutlineClockCircle size={12} />{formattedDate} {record.checkOut}
//                     </p>
//                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                       <FaMapMarkerAlt size={10} />Lahore (home)
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-xs text-gray-400 italic">Did not clock out</p>
//                 )}
//               </div>
//             </div>

//             {/* Status summary */}
//             <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">Status</span>
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                   record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' :
//                   'bg-red-100 text-red-800'
//                 }`}>{record.status}</span>
//               </div>
//               {record.workHours !== '------' && (
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Work Hours</span>
//                   <span className="text-sm font-semibold text-[#365F8D]">{record.workHours}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function UserAttendance({ setTitle }) {
//   const { user } = useAuthContext()
//   const [records, setRecords] = useState([])
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [selectedDate, setSelectedDate] = useState('')
//   const itemsPerPage = 8

//   const currentEmployee = {
//     employeeId: user?.employeeId || 2,
//     name: user?.name || 'Employee',
//     email: user?.email || '',
//     designation: user?.designation || 'Employee',
//   }

//   useEffect(() => {
//     setTitle('My Attendance')
//     const empRecords = getEmployeeRecords(currentEmployee.employeeId)
//     setRecords(empRecords.sort((a, b) => new Date(b.date) - new Date(a.date)))
//   }, [setTitle])

//   const summary = {
//     present: records.filter(r => r.status === 'Present').length,
//     absent: records.filter(r => r.status === 'Absent').length,
//     leave: records.filter(r => r.status === 'Leave').length,
//   }

//   const filteredRecords = selectedDate
//     ? records.filter(r => r.date === selectedDate)
//     : records

//   const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
//   const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   const handleRowClick = (record) => {
//     setSelectedRecord(record)
//     setShowModal(true)
//   }

//   const getStatusColor = (status) => {
//     if (status === 'Present') return 'bg-green-100 text-green-800'
//     if (status === 'Absent') return 'bg-red-100 text-red-800'
//     return 'bg-yellow-100 text-yellow-800'
//   }

//   return (
//     <div className="min-h-screen p-5 sm:p-6 lg:p-8 bg-gray-50/50">
//       <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">My Attendance</h1>

//       {/* Enhanced Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-28">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Present Days</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.present}</h1>
//             <p className="text-xs text-gray-400 mt-1">This period</p>
//           </div>
//           <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
//             <FaRegCheckCircle size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-28">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Absent Days</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.absent}</h1>
//             <p className="text-xs text-gray-400 mt-1">This period</p>
//           </div>
//           <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
//             <RxCrossCircled size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transform transition duration-300 ease-in-out min-h-28">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Leave Days</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.leave}</h1>
//             <p className="text-xs text-gray-400 mt-1">This period</p>
//           </div>
//           <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
//             <CalendarDays size={24} className="text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Date Filter */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//           <div className="flex items-center gap-2 flex-1">
//             <CalendarDays size={18} className="text-[#2C5284] flex-shrink-0" />
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1) }}
//               className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>
//           {selectedDate && (
//             <button
//               onClick={() => { setSelectedDate(''); setCurrentPage(1) }}
//               className="px-4 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap flex items-center gap-1"
//             >
//               <FaTimes size={12} /> Clear
//             </button>
//           )}
//         </div>
//         {selectedDate && (
//           <p className="text-xs text-[#365F8D] mt-2 font-medium">
//             Filtering by: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
//               weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//             })}
//           </p>
//         )}
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#2C5284]">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock In</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock Out</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedRecords.map((record) => (
//               <tr
//                 key={record.id}
//                 onClick={() => handleRowClick(record)}
//                 className="hover:bg-blue-50 cursor-pointer transition-colors"
//                 title="Click to view details"
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{record.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkIn}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkOut}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.workHours}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
//                     {record.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//             {paginatedRecords.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">No records found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         {/* <p className="text-xs text-gray-400 text-center py-3 border-t border-gray-100">
//           Click any row to view detailed attendance info
//         </p> */}
//       </div>

//       {/* Mobile Cards */}
//       <div className="lg:hidden space-y-3">
//         {paginatedRecords.map((record) => (
//           <div
//             key={record.id}
//             onClick={() => handleRowClick(record)}
//             className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer active:scale-[0.98] transition-all"
//           >
//             <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
//               <span className="font-semibold text-gray-900 text-sm">{record.date}</span>
//               <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
//                 {record.status}
//               </span>
//             </div>
//             <div className="p-4 grid grid-cols-3 gap-3">
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Clock In</p>
//                 <p className="text-sm text-gray-900 font-medium">{record.checkIn}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Clock Out</p>
//                 <p className="text-sm text-gray-900 font-medium">{record.checkOut}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Work Hrs</p>
//                 <p className="text-sm text-gray-900 font-medium">{record.workHours}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//         {paginatedRecords.length === 0 && (
//           <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
//             No records found.
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-600">
//             Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
//             <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredRecords.length)}</span> of{' '}
//             <span className="font-semibold text-gray-900">{filteredRecords.length}</span> records
//           </p>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//             >
//               <FaChevronLeft size={14} className="text-gray-600" />
//             </button>
//             <div className="flex items-center gap-1">
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                     currentPage === i + 1 ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//             <button
//               onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//             >
//               <FaChevronRight size={14} className="text-gray-600" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Detail Modal */}
//       {showModal && selectedRecord && (
//         <AttendanceDetailModal
//           record={selectedRecord}
//           employee={currentEmployee}
//           onClose={() => { setShowModal(false); setSelectedRecord(null) }}
//         />
//       )}
//     </div>
//   )
// }

// export default UserAttendance












import { useEffect, useState, useCallback } from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaTimes, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaRegCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from 'react-icons/rx'
import { CalendarDays } from 'lucide-react'
import { apiGetMyAttendance, apiGetTodayStatus } from '../../api/attendanceAPI'

// ── Circular Progress ─────────────────────────────────────────────────────────
function CircularProgress({ workHours }) {
  if (!workHours) return (
    <div className="flex justify-center items-center">
      <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
        <span className="text-gray-400 text-sm">No Data</span>
      </div>
    </div>
  )

  const parts = workHours.split('h')
  const hours = parseInt(parts[0].trim()) || 0
  const minutes = parts[1] ? parseInt(parts[1].trim()) || 0 : 0
  const totalMinutes = hours * 60 + minutes
  const percentage = Math.min((totalMinutes / 540) * 100, 100)
  const strokeDasharray = 2 * Math.PI * 60
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

  return (
    <div className="flex justify-center items-center relative">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8"
          strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" fill="transparent" className="text-[#2C5284]" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold text-gray-800">{workHours}</span>
        <span className="text-xs text-gray-500">Work Hours</span>
      </div>
    </div>
  )
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function AttendanceDetailModal({ record, onClose }) {
  const isPresent = record.status === 'Present'
  const isLeave   = record.status === 'Leave'

  const dateObj      = new Date(record.date + 'T00:00:00')
  const dayName      = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
  const formattedDate = record.date.split('-').reverse().join('-')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-white">Attendance Details</h2>
            <p className="text-blue-100 text-sm">{formattedDate} ({dayName})</p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/10 rounded-full p-2 transition-colors">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left */}
          <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="mb-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock In</p>
              <p className="text-2xl font-bold text-gray-900">{record.checkIn || '------'}</p>
            </div>
            <div className="my-4">
              <CircularProgress workHours={record.workHours} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock Out</p>
              <p className="text-base font-semibold text-gray-700">
                {record.checkOut || '-- : -- (Did not clock out)'}
              </p>
            </div>
          </div>

          {/* Right - Activity */}
          <div className="p-5">
            <h4 className="text-base font-bold text-gray-900 mb-4">Activity</h4>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPresent ? 'border-[#365F8D]' : 'border-gray-300'}`}>
                  {isPresent && <div className="w-2.5 h-2.5 rounded-full bg-[#365F8D]" />}
                </div>
                <div className="w-0.5 h-10 bg-gray-200 my-1" />
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-semibold text-gray-900 text-sm">Clock In</p>
                  {isPresent && <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">General Shift</span>}
                  {isLeave   && <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">On Leave</span>}
                  {!isPresent && !isLeave && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">Absent</span>}
                </div>
                {isPresent ? (
                  <>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <AiOutlineClockCircle size={12} /> {formattedDate} {record.checkIn}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <FaMapMarkerAlt size={10} /> Office
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    {isLeave ? 'On approved leave' : 'Did not clock in'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPresent && record.checkOut ? 'border-gray-400' : 'border-gray-200'}`}>
                  {isPresent && record.checkOut && <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm mb-1">Clock Out</p>
                {isPresent && record.checkOut ? (
                  <>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <AiOutlineClockCircle size={12} /> {formattedDate} {record.checkOut}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <FaMapMarkerAlt size={10} /> Office
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-gray-400 italic">Did not clock out</p>
                )}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  record.status === 'Present' ? 'bg-green-100 text-green-800' :
                  record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>{record.status}</span>
              </div>
              {record.workHours && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Work Hours</span>
                  <span className="text-sm font-semibold text-[#365F8D]">{record.workHours}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
function UserAttendance({ setTitle }) {
  const [records, setRecords]           = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [showModal, setShowModal]       = useState(false)
  const [currentPage, setCurrentPage]  = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState('')
  const itemsPerPage = 8

  const fetchRecords = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const filters = {}
      if (selectedDate) filters.date = selectedDate
      const data = await apiGetMyAttendance(filters)
      setRecords(data.records || [])
    } catch {
      setError('Failed to load attendance records.')
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  useEffect(() => {
    setTitle('My Attendance')
  }, [setTitle])

  useEffect(() => {
    fetchRecords()
    setCurrentPage(1)
  }, [fetchRecords])

  // Summary from all records (not filtered)
  const [allRecords, setAllRecords] = useState([])
  useEffect(() => {
    apiGetMyAttendance({}).then(data => setAllRecords(data.records || [])).catch(() => {})
  }, [])

  const summary = {
    present: allRecords.filter(r => r.status === 'Present').length,
    absent:  allRecords.filter(r => r.status === 'Absent').length,
    leave:   allRecords.filter(r => r.status === 'Leave').length,
  }

  const totalPages      = Math.ceil(records.length / itemsPerPage)
  const paginatedRecords = records.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status) => {
    if (status === 'Present') return 'bg-green-100 text-green-800'
    if (status === 'Absent')  return 'bg-red-100 text-red-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="min-h-screen p-5 sm:p-6 lg:p-8 bg-gray-50/50">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">My Attendance</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-28">
          <div>
            <p className="text-sm text-[#2C5284]">Present Days</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.present}</h1>
            <p className="text-xs text-gray-400 mt-1">This period</p>
          </div>
          <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
            <FaRegCheckCircle size={24} className="text-white" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-28">
          <div>
            <p className="text-sm text-[#2C5284]">Absent Days</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.absent}</h1>
            <p className="text-xs text-gray-400 mt-1">This period</p>
          </div>
          <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
            <RxCrossCircled size={24} className="text-white" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-28">
          <div>
            <p className="text-sm text-[#2C5284]">Leave Days</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.leave}</h1>
            <p className="text-xs text-gray-400 mt-1">This period</p>
          </div>
          <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
            <CalendarDays size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Date Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <CalendarDays size={18} className="text-[#2C5284] flex-shrink-0" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1) }}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
            />
          </div>
          {selectedDate && (
            <button
              onClick={() => { setSelectedDate(''); setCurrentPage(1) }}
              className="px-4 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <FaTimes size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-4 border border-red-200">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">
          Loading attendance records...
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#2C5284]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock In</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock Out</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRecords.map((record) => (
                  <tr
                    key={record._id}
                    onClick={() => { setSelectedRecord(record); setShowModal(true) }}
                    className="hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkIn || '------'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkOut || '------'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.workHours || '------'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {paginatedRecords.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {paginatedRecords.map((record) => (
              <div
                key={record._id}
                onClick={() => { setSelectedRecord(record); setShowModal(true) }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer active:scale-[0.98] transition-all"
              >
                <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                  <span className="font-semibold text-gray-900 text-sm">{record.date}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
                <div className="p-4 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Clock In</p>
                    <p className="text-sm text-gray-900 font-medium">{record.checkIn || '------'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Clock Out</p>
                    <p className="text-sm text-gray-900 font-medium">{record.checkOut || '------'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Work Hrs</p>
                    <p className="text-sm text-gray-900 font-medium">{record.workHours || '------'}</p>
                  </div>
                </div>
              </div>
            ))}
            {paginatedRecords.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
                No records found.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-semibold">{Math.min(currentPage * itemsPerPage, records.length)}</span> of{' '}
                <span className="font-semibold">{records.length}</span> records
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors">
                  <FaChevronLeft size={14} className="text-gray-600" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === i + 1 ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors">
                  <FaChevronRight size={14} className="text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {showModal && selectedRecord && (
        <AttendanceDetailModal
          record={selectedRecord}
          onClose={() => { setShowModal(false); setSelectedRecord(null) }}
        />
      )}
    </div>
  )
}

export default UserAttendance