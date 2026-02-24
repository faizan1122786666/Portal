// // import { useEffect, useState } from 'react'
// // import mockAttendanceData from '../../data/mockAttendanceData'
// // import { CgProfile } from 'react-icons/cg'
// // import { FaEye } from 'react-icons/fa'
// // import EmployeeAttendanceModal from './EmployeeAttendanceModal'

// // // Mock employees list
// // const mockEmployees = [
// //   { employeeId: 1, name: 'Ali Hamza', email: 'alihamza@gmail.com', role: 'employee' },
// //   { employeeId: 2, name: 'Ali Zain', email: 'alizain@gmail.com', role: 'employee' },
// //   { employeeId: 3, name: 'Khubaib', email: 'khubaib@gmail.com', role: 'employee' },
// //   { employeeId: 4, name: 'Shazain', email: 'shazain@gmail.com', role: 'employee' },
// // ]

// // function AdminAttendance({ setTitle }) {
// //   const [selectedEmployee, setSelectedEmployee] = useState(null)
// //   const [showModal, setShowModal] = useState(false)
// //   const [searchTerm, setSearchTerm] = useState('')

// //   useEffect(() => {
// //     setTitle('Attendance Management')
// //   }, [setTitle])

// //   const filteredEmployees = mockEmployees.filter(emp =>
// //     emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     emp.email.toLowerCase().includes(searchTerm.toLowerCase())
// //   )

// //   // Get attendance summary for each employee
// //   const getEmployeeSummary = (employeeId) => {
// //     const records = mockAttendanceData.filter(r => r.employeeId === employeeId)
// //     return {
// //       present: records.filter(r => r.status === 'Present').length,
// //       absent: records.filter(r => r.status === 'Absent').length,
// //       leave: records.filter(r => r.status === 'Leave').length,
// //       total: records.length
// //     }
// //   }

// //   const viewEmployee = (employee) => {
// //     setSelectedEmployee(employee)
// //     setShowModal(true)
// //   }

// //   // Today's summary stats
// //   const todayStats = {
// //     total: mockEmployees.length,
// //     present: 3,
// //     absent: 1,
// //     onLeave: 0,
// //   }

// //   return (
// //     <div className="min-h-screen p-4 sm:p-6 lg:p-8">
// //       {/* Header */}
// //       <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">
// //         Attendance Management
// //       </h1>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //         <div className="bg-white p-4 rounded-xl border-l-4 border-[#2C5284] shadow-sm">
// //           <p className="text-sm text-gray-600">Total Employees</p>
// //           <p className="text-2xl font-bold text-[#365F8D]">{todayStats.total}</p>
// //         </div>
// //         <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
// //           <p className="text-sm text-gray-600">Present Today</p>
// //           <p className="text-2xl font-bold text-green-600">{todayStats.present}</p>
// //         </div>
// //         <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
// //           <p className="text-sm text-gray-600">Absent Today</p>
// //           <p className="text-2xl font-bold text-red-600">{todayStats.absent}</p>
// //         </div>
// //         <div className="bg-white p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm">
// //           <p className="text-sm text-gray-600">On Leave</p>
// //           <p className="text-2xl font-bold text-yellow-600">{todayStats.onLeave}</p>
// //         </div>
// //       </div>

// //       {/* Search */}
// //       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
// //         <input
// //           type="text"
// //           placeholder="Search employee by name or email..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
// //             focus:ring-2 focus:ring-[#365F8D] focus:border-transparent outline-none"
// //         />
// //       </div>

// //       {/* Employee Table - Desktop */}
// //       <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-[#365F8D]">
// //             <tr>
// //               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
// //               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Present Days</th>
// //               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Absent Days</th>
// //               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Leave Days</th>
// //               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {filteredEmployees.map((employee) => {
// //               const summary = getEmployeeSummary(employee.employeeId)
// //               return (
// //                 <tr key={employee.employeeId} className="hover:bg-gray-50 transition-colors">
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-10 h-10 rounded-full bg-[#365F8D] flex items-center justify-center">
// //                         <CgProfile size={20} className="text-white" />
// //                       </div>
// //                       <div>
// //                         <div className="text-sm font-medium text-gray-900">{employee.name}</div>
// //                         <div className="text-sm text-gray-500">{employee.email}</div>
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
// //                       {summary.present} days
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
// //                       {summary.absent} days
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
// //                       {summary.leave} days
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <button
// //                       onClick={() => viewEmployee(employee)}
// //                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// //                       title="View Details"
// //                     >
// //                       <FaEye size={18} />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               )
// //             })}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Employee Cards - Mobile */}
// //       <div className="lg:hidden space-y-4">
// //         {filteredEmployees.map((employee) => {
// //           const summary = getEmployeeSummary(employee.employeeId)
// //           return (
// //             <div key={employee.employeeId} className="bg-white rounded-xl shadow-sm p-4">
// //               <div className="flex items-center justify-between mb-3">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-10 h-10 rounded-full bg-[#365F8D] flex items-center justify-center">
// //                     <CgProfile size={20} className="text-white" />
// //                   </div>
// //                   <div>
// //                     <p className="font-semibold text-gray-900">{employee.name}</p>
// //                     <p className="text-sm text-gray-500">{employee.email}</p>
// //                   </div>
// //                 </div>
// //                 <button
// //                   onClick={() => viewEmployee(employee)}
// //                   className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
// //                 >
// //                   <FaEye size={18} />
// //                 </button>
// //               </div>
// //               <div className="grid grid-cols-3 gap-2 text-center text-xs">
// //                 <div className="bg-green-50 rounded-lg p-2">
// //                   <p className="text-green-800 font-bold text-lg">{summary.present}</p>
// //                   <p className="text-green-600">Present</p>
// //                 </div>
// //                 <div className="bg-red-50 rounded-lg p-2">
// //                   <p className="text-red-800 font-bold text-lg">{summary.absent}</p>
// //                   <p className="text-red-600">Absent</p>
// //                 </div>
// //                 <div className="bg-yellow-50 rounded-lg p-2">
// //                   <p className="text-yellow-800 font-bold text-lg">{summary.leave}</p>
// //                   <p className="text-yellow-600">Leave</p>
// //                 </div>
// //               </div>
// //             </div>
// //           )
// //         })}
// //       </div>

// //       {/* Modal */}
// //       {showModal && selectedEmployee && (
// //         <EmployeeAttendanceModal
// //           employee={selectedEmployee}
// //           onClose={() => { setShowModal(false); setSelectedEmployee(null) }}
// //           isAdmin={true}
// //         />
// //       )}
// //     </div>
// //   )
// // }

// // export default AdminAttendance























// import { useEffect, useState } from 'react'
// import mockAttendanceData from '../../data/mockAttendanceData'
// import { CgProfile } from 'react-icons/cg'
// import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa'
// import { AiOutlineClockCircle } from 'react-icons/ai'

// // Mock employees list
// const mockEmployees = [
//   { employeeId: 1, name: 'Abdul Rehman', email: 'abdulrehman@gmail.com', role: 'admin', designation: 'Frontend Developer' },
//   { employeeId: 2, name: 'Ali Zain', email: 'alizain@gmail.com', role: 'employee', designation: 'Backend Developer' },
//   { employeeId: 3, name: 'Khubaib', email: 'khubaib@gmail.com', role: 'employee', designation: 'UI/UX Designer' },
//   { employeeId: 4, name: 'Shazain', email: 'shazain@gmail.com', role: 'employee', designation: 'Full Stack Developer' },
// ]

// // Circular Progress Component
// function CircularProgress({ workHours }) {
//   if (!workHours || workHours === '------') return (
//     <div className="flex justify-center items-center">
//       <div className="w-36 h-36 rounded-full border-8 border-gray-200 flex items-center justify-center">
//         <span className="text-gray-400 text-sm font-medium">No Data</span>
//       </div>
//     </div>
//   )

//   const match = workHours.match(/(\d+)h\s*(\d+)?m?/)
//   const hours = match ? parseInt(match[1]) : 0
//   const minutes = match && match[2] ? parseInt(match[2]) : 0
//   const totalMinutes = hours * 60 + minutes
//   const maxMinutes = 9 * 60
//   const percentage = Math.min(totalMinutes / maxMinutes, 1)
//   const radius = 54
//   const circumference = 2 * Math.PI * radius
//   const strokeDasharray = `${percentage * circumference} ${circumference}`

//   return (
//     <div className="flex justify-center items-center">
//       <div className="relative w-36 h-36">
//         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
//           <circle cx="60" cy="60" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
//           <circle
//             cx="60" cy="60" r={radius}
//             stroke="#365F8D"
//             strokeWidth="8"
//             fill="none"
//             strokeDasharray={strokeDasharray}
//             strokeLinecap="round"
//           />
//         </svg>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="text-base font-bold text-gray-800">{workHours}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Attendance Detail Modal
// function AttendanceDetailModal({ employee, record, onClose }) {
//   if (!record) return null

//   const dateObj = new Date(record.date + 'T00:00:00')
//   const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
//   const formattedDate = record.date.split('-').reverse().join('-')
//   const isPresent = record.status === 'Present'
//   const isLeave = record.status === 'Leave'

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 border-b border-gray-100">
//           <h2 className="text-lg font-bold text-gray-900">Attendance Details</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
//             <FaTimes size={18} />
//           </button>
//         </div>

//         {/* Employee Info */}
//         <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 rounded-full bg-[#365F8D] flex items-center justify-center">
//               <CgProfile size={32} className="text-white" />
//             </div>
//             <div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h3 className="font-bold text-gray-900 text-base">{employee.name}</h3>
//                 <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">It's you</span>
//                 <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
//                   #{employee.employeeId}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-500 mt-0.5">{employee.designation}</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Content - 2 columns */}
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Left - Times */}
//           <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100">
//             <h4 className="text-sm font-semibold text-gray-700 mb-4">
//               Date - {formattedDate} ({dayName})
//             </h4>

//             <div className="mb-4">
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock In</p>
//               <p className="text-xl font-bold text-gray-900">
//                 {isPresent ? record.checkIn : '------'}
//               </p>
//             </div>

//             <div className="my-5">
//               <CircularProgress workHours={record.workHours} />
//             </div>

//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock Out</p>
//               <p className="text-base font-semibold text-gray-700">
//                 {record.checkOut === '------'
//                   ? '00:00 pm (Did not clock out)'
//                   : record.checkOut}
//               </p>
//             </div>
//           </div>

//           {/* Right - Activity */}
//           <div className="p-5">
//             <h4 className="text-base font-bold text-gray-900 mb-4">Activity</h4>

//             <div className="space-y-1">
//               {/* Clock In */}
//               <div className="flex items-start gap-3">
//                 <div className="mt-0.5 flex flex-col items-center">
//                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPresent ? 'border-[#365F8D]' : 'border-gray-300'}`}>
//                     {isPresent && <div className="w-2.5 h-2.5 rounded-full bg-[#365F8D]" />}
//                   </div>
//                   <div className="w-0.5 h-10 bg-gray-200 my-1" />
//                 </div>
//                 <div className="flex-1 pb-2">
//                   <div className="flex items-center gap-2 mb-1">
//                     <p className="font-semibold text-gray-900 text-sm">Clock In</p>
//                     {isPresent && (
//                       <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">General Shift</span>
//                     )}
//                     {isLeave && (
//                       <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">On Leave</span>
//                     )}
//                     {!isPresent && !isLeave && (
//                       <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">Absent</span>
//                     )}
//                   </div>
//                   {isPresent ? (
//                     <>
//                       <p className="text-xs text-gray-500 flex items-center gap-1">
//                         <AiOutlineClockCircle size={12} />
//                         {formattedDate} {record.checkIn}
//                       </p>
//                       <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                         <FaMapMarkerAlt size={10} />
//                         Lahore (home)
//                       </p>
//                     </>
//                   ) : (
//                     <p className="text-xs text-gray-400 italic">
//                       {isLeave ? 'On approved leave' : 'Did not clock in'}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Clock Out */}
//               <div className="flex items-start gap-3">
//                 <div className="mt-0.5">
//                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPresent && record.checkOut !== '------' ? 'border-gray-400' : 'border-gray-200'}`}>
//                     {isPresent && record.checkOut !== '------' && (
//                       <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-semibold text-gray-900 text-sm mb-1">Clock Out</p>
//                   {isPresent && record.checkOut !== '------' ? (
//                     <>
//                       <p className="text-xs text-gray-500 flex items-center gap-1">
//                         <AiOutlineClockCircle size={12} />
//                         {formattedDate} {record.checkOut}
//                       </p>
//                       <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                         <FaMapMarkerAlt size={10} />
//                         Lahore (home)
//                       </p>
//                     </>
//                   ) : (
//                     <p className="text-xs text-gray-400 italic">Did not clock out</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Status & Hours Summary */}
//             <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">Status</span>
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                   record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' :
//                   'bg-red-100 text-red-800'
//                 }`}>
//                   {record.status}
//                 </span>
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

// function AdminAttendance({ setTitle }) {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedDate, setSelectedDate] = useState('')
//   const [selectedEmployee, setSelectedEmployee] = useState(null)
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showModal, setShowModal] = useState(false)

//   useEffect(() => {
//     setTitle('Attendance Management')
//   }, [setTitle])

//   const getEmployeeSummary = (employeeId) => {
//     const records = mockAttendanceData.filter(r => r.employeeId === employeeId)
//     return {
//       present: records.filter(r => r.status === 'Present').length,
//       absent: records.filter(r => r.status === 'Absent').length,
//       leave: records.filter(r => r.status === 'Leave').length,
//     }
//   }

//   const filteredEmployees = mockEmployees.filter(emp =>
//     emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     emp.email.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const getFilteredRecords = (employeeId) => {
//     let records = mockAttendanceData.filter(r => r.employeeId === employeeId)
//     if (selectedDate) {
//       records = records.filter(r => r.date === selectedDate)
//     }
//     return records.sort((a, b) => new Date(b.date) - new Date(a.date))
//   }

//   const handleRowClick = (employee, record) => {
//     setSelectedEmployee(employee)
//     setSelectedRecord(record)
//     setShowModal(true)
//   }

//   const todayStats = { total: mockEmployees.length, present: 3, absent: 1, onLeave: 0 }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8">
//       <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">
//         Attendance Management
//       </h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-xl border-l-4 border-[#2C5284] shadow-sm">
//           <p className="text-sm text-gray-600">Total Employees</p>
//           <p className="text-2xl font-bold text-[#365F8D]">{todayStats.total}</p>
//         </div>
//         <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
//           <p className="text-sm text-gray-600">Present Today</p>
//           <p className="text-2xl font-bold text-green-600">{todayStats.present}</p>
//         </div>
//         <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
//           <p className="text-sm text-gray-600">Absent Today</p>
//           <p className="text-2xl font-bold text-red-600">{todayStats.absent}</p>
//         </div>
//         <div className="bg-white p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm">
//           <p className="text-sm text-gray-600">On Leave</p>
//           <p className="text-2xl font-bold text-yellow-600">{todayStats.onLeave}</p>
//         </div>
//       </div>

//       {/* Search & Date Filter */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             placeholder="Search employee by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg 
//               focus:ring-2 focus:ring-[#365F8D] focus:border-transparent outline-none"
//           />
//           <div className="flex items-center gap-2">
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="px-4 py-2.5 border border-gray-300 rounded-lg 
//                 focus:ring-2 focus:ring-[#365F8D] focus:border-transparent outline-none text-sm"
//             />
//             {selectedDate && (
//               <button
//                 onClick={() => setSelectedDate('')}
//                 className="px-3 py-2.5 text-sm text-gray-600 border border-gray-300 
//                   rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
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
//       <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#365F8D]">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock In</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock Out</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredEmployees.flatMap((employee) => {
//               const records = getFilteredRecords(employee.employeeId)

//               if (records.length === 0) {
//                 return [(
//                   <tr key={`${employee.employeeId}-empty`} className="bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
//                           <CgProfile size={18} className="text-white" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-700">{employee.name}</p>
//                           <p className="text-xs text-gray-400">{employee.email}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td colSpan={5} className="px-6 py-4 text-sm text-gray-400 italic">
//                       No record found for selected date
//                     </td>
//                   </tr>
//                 )]
//               }

//               return records.map((record, index) => (
//                 <tr
//                   key={`${employee.employeeId}-${record.id}`}
//                   onClick={() => handleRowClick(employee, record)}
//                   className="hover:bg-blue-50 cursor-pointer transition-colors"
//                   title="Click to view details"
//                 >
//                   {index === 0 ? (
//                     <td className="px-6 py-4 whitespace-nowrap" rowSpan={records.length}
//                       style={{ verticalAlign: 'top' }}>
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-[#365F8D] flex items-center justify-center">
//                           <CgProfile size={18} className="text-white" />
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{employee.name}</div>
//                           <div className="text-xs text-gray-500">{employee.email}</div>
//                         </div>
//                       </div>
//                     </td>
//                   ) : null}
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkIn}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkOut}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.workHours}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                       record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {record.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             })}
//           </tbody>
//         </table>
//         <p className="text-xs text-gray-400 text-center py-3">
//           Click any row to view detailed attendance info
//         </p>
//       </div>

//       {/* Mobile Cards */}
//       <div className="lg:hidden space-y-4">
//         {filteredEmployees.map((employee) => {
//           const records = getFilteredRecords(employee.employeeId)
//           const summary = getEmployeeSummary(employee.employeeId)

//           return (
//             <div key={employee.employeeId} className="bg-white rounded-xl shadow-sm overflow-hidden">
//               <div className="p-4 flex items-center gap-3 border-b border-gray-100 bg-gray-50">
//                 <div className="w-10 h-10 rounded-full bg-[#365F8D] flex items-center justify-center">
//                   <CgProfile size={20} className="text-white" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900 text-sm">{employee.name}</p>
//                   <p className="text-xs text-gray-500">{employee.email}</p>
//                 </div>
//               </div>

//               {records.length === 0 ? (
//                 <div className="p-4 text-center text-gray-400 text-sm italic">
//                   No record for selected date
//                 </div>
//               ) : (
//                 records.map(record => (
//                   <div
//                     key={record.id}
//                     onClick={() => handleRowClick(employee, record)}
//                     className="p-4 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-blue-50 transition-colors"
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="text-sm font-medium text-gray-700">{record.date}</span>
//                       <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
//                         record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                         record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' :
//                         'bg-red-100 text-red-800'
//                       }`}>
//                         {record.status}
//                       </span>
//                     </div>
//                     <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
//                       <div>In: <span className="font-medium text-gray-900">{record.checkIn}</span></div>
//                       <div>Out: <span className="font-medium text-gray-900">{record.checkOut}</span></div>
//                       <div>Hrs: <span className="font-medium text-gray-900">{record.workHours}</span></div>
//                     </div>
//                   </div>
//                 ))
//               )}

//               {!selectedDate && (
//                 <div className="px-4 py-3 bg-gray-50 grid grid-cols-3 gap-2 text-center text-xs">
//                   <div className="bg-green-50 rounded-lg p-2">
//                     <p className="font-bold text-green-700 text-base">{summary.present}</p>
//                     <p className="text-green-600">Present</p>
//                   </div>
//                   <div className="bg-red-50 rounded-lg p-2">
//                     <p className="font-bold text-red-700 text-base">{summary.absent}</p>
//                     <p className="text-red-600">Absent</p>
//                   </div>
//                   <div className="bg-yellow-50 rounded-lg p-2">
//                     <p className="font-bold text-yellow-700 text-base">{summary.leave}</p>
//                     <p className="text-yellow-600">Leave</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )
//         })}
//       </div>

//       {/* Detail Modal */}
//       {showModal && selectedEmployee && selectedRecord && (
//         <AttendanceDetailModal
//           employee={selectedEmployee}
//           record={selectedRecord}
//           onClose={() => { setShowModal(false); setSelectedEmployee(null); setSelectedRecord(null) }}
//         />
//       )}
//     </div>
//   )
// }

// export default AdminAttendance






















// import { useEffect, useState } from 'react'
// import mockAttendanceData from '../../data/mockAttendanceData'
// import { CgProfile } from 'react-icons/cg'
// import { FaTimes, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { AiOutlineClockCircle } from 'react-icons/ai'

// // Mock employees list
// const mockEmployees = [
//   { employeeId: 1, name: 'Abdul Rehman', email: 'abdulrehman@gmail.com', role: 'admin', designation: 'Frontend Developer' },
//   { employeeId: 2, name: 'Ali Zain', email: 'alizain@gmail.com', role: 'employee', designation: 'Backend Developer' },
//   { employeeId: 3, name: 'Khubaib', email: 'khubaib@gmail.com', role: 'employee', designation: 'UI/UX Designer' },
//   { employeeId: 4, name: 'Shazain', email: 'shazain@gmail.com', role: 'employee', designation: 'Full Stack Developer' },
// ]

// // Circular Progress Component for Work Hours
// function CircularProgress({ workHours }) {
//   if (!workHours || workHours === '------') return (
//     <div className="flex justify-center items-center">
//       <div className="w-36 h-36 rounded-full border-8 border-gray-200 flex items-center justify-center">
//         <span className="text-gray-400 text-sm">No Data</span>
//       </div>
//     </div>
//   )

//   const [hours, minutes] = workHours.split('h').map(s => parseInt(s.trim()))
//   const totalMinutes = (hours || 0) * 60 + (minutes || 0)
//   const percentage = Math.min((totalMinutes / 540) * 100, 100) // 9 hours (540 mins) is 100%
//   const strokeDasharray = 2 * Math.PI * 60
//   const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

//   return (
//     <div className="flex justify-center items-center relative">
//       <svg className="w-36 h-36 transform -rotate-90">
//         <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
//         <circle
//           cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8"
//           strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round" fill="transparent" className="text-[#2C5284]"
//         />
//       </svg>
//       <div className="absolute flex flex-col items-center">
//         <span className="text-2xl font-bold text-gray-800">{workHours}</span>
//         <span className="text-xs text-gray-500">Work Hours</span>
//       </div>
//     </div>
//   )
// }

// // Attendance Detail Modal
// function AttendanceDetailModal({ employee, record, onClose }) {
//   const isPresent = record.status === 'Present'
//   const isLeave = record.status === 'Leave'

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
//         <div className="bg-[#2C5284] p-6 text-white flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-bold">Attendance Details</h2>
//             <p className="text-blue-100 text-sm">{record.date}</p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
//             <div className="w-14 h-14 rounded-full bg-[#2C5284] flex items-center justify-center text-white">
//               <CgProfile size={32} />
//             </div>
//             <div>
//               <h3 className="font-bold text-gray-900 text-lg">{employee.name}</h3>
//               <p className="text-gray-500 text-sm">{employee.designation}</p>
//             </div>
//             <div className="ml-auto">
//               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
//                 record.status === 'Present' ? 'bg-green-100 text-green-700' :
//                 record.status === 'Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//               }`}>
//                 {record.status}
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-blue-50 rounded-lg text-[#2C5284]"><AiOutlineClockCircle size={20} /></div>
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase font-semibold">Clock In</p>
//                   <p className="font-bold text-gray-900">{record.checkIn || '--:--'}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-blue-50 rounded-lg text-[#2C5284]"><AiOutlineClockCircle size={20} /></div>
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase font-semibold">Clock Out</p>
//                   <p className="font-bold text-gray-900">{record.checkOut || '--:--'}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col items-center justify-center border-l border-gray-100 pl-6">
//               <CircularProgress workHours={record.workHours} />
//             </div>
//           </div>
//         </div>

//         <div className="p-4 bg-gray-50 flex justify-end">
//           <button onClick={onClose} className="px-6 py-2 bg-[#2C5284] text-white rounded-lg font-semibold hover:bg-[#1e3a5f] transition-colors">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// function AdminAttendance({ setTitle }) {
//   const [selectedEmployee, setSelectedEmployee] = useState(null)
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedDate, setSelectedDate] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 8

//   useEffect(() => { setTitle('Attendance Management') }, [setTitle])

//   const getFilteredRecords = (employeeId) => {
//     let records = mockAttendanceData.filter(r => r.employeeId === employeeId)
//     if (selectedDate) records = records.filter(r => r.date === selectedDate)
//     return records
//   }

//   const handleRowClick = (employee, record) => {
//     setSelectedEmployee(employee); setSelectedRecord(record); setShowModal(true)
//   }

//   const filteredEmployees = mockEmployees.filter(emp =>
//     emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     emp.email.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const allRecords = filteredEmployees.flatMap(employee => {
//     const records = getFilteredRecords(employee.employeeId)
//     if (records.length === 0 && selectedDate) {
//       return [{ employee, isEmpty: true, date: selectedDate, status: 'No Record' }]
//     }
//     return records.map(record => ({ employee, ...record }))
//   })

//   const totalPages = Math.ceil(allRecords.length / itemsPerPage)
//   const paginatedRecords = allRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   const todayStats = { total: mockEmployees.length, present: 3, absent: 1, onLeave: 0 }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">
//       <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">Attendance Management</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-xl border-l-4 border-[#2C5284] shadow-sm">
//           <p className="text-sm text-gray-600">Total Employees</p>
//           <p className="text-2xl font-bold text-[#2C5284]">{todayStats.total}</p>
//         </div>
//         {/* ... other stats cards ... */}
//       </div>

//       {/* Search & Date Filter */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text" placeholder="Search employee..." value={searchTerm}
//             onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//             className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none"
//           />
//           <input
//             type="date" value={selectedDate}
//             onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
//           />
//         </div>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#2C5284]">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock In</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock Out</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {paginatedRecords.map((record, idx) => (
//               <tr key={idx} onClick={() => !record.isEmpty && handleRowClick(record.employee, record)} className="hover:bg-blue-50 cursor-pointer transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center"><CgProfile size={18} className="text-white" /></div>
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">{record.employee.name}</div>
//                       <div className="text-xs text-gray-500">{record.employee.email}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkIn || '------'}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkOut || '------'}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.workHours || '------'}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                     record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
//                   }`}>{record.status}</span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="lg:hidden space-y-4">
//         {paginatedRecords.map((record, idx) => (
//           <div key={idx} onClick={() => !record.isEmpty && handleRowClick(record.employee, record)} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <div className="p-4 flex items-center gap-3 border-b border-gray-100 bg-gray-50/50">
//               <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center"><CgProfile size={20} className="text-white" /></div>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-900 text-sm">{record.employee.name}</p>
//                 <p className="text-xs text-gray-500">{record.employee.email}</p>
//               </div>
//               <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">{record.status}</span>
//             </div>
//             <div className="p-4 grid grid-cols-2 gap-4">
//               <div><p className="text-[10px] text-gray-400 uppercase font-bold">Date</p><p className="text-sm text-gray-700">{record.date}</p></div>
//               <div><p className="text-[10px] text-gray-400 uppercase font-bold">Work Hours</p><p className="text-sm text-gray-700">{record.workHours || '------'}</p></div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-600">Showing {paginatedRecords.length} of {allRecords.length} entries</p>
//           <div className="flex items-center gap-2">
//             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-50"><FaChevronLeft size={14} /></button>
//             <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-50"><FaChevronRight size={14} /></button>
//           </div>
//         </div>
//       )}

//       {showModal && selectedEmployee && selectedRecord && (
//         <AttendanceDetailModal employee={selectedEmployee} record={selectedRecord} onClose={() => setShowModal(false)} />
//       )}
//     </div>
//   )
// }

// export default AdminAttendance































import { useEffect, useState } from 'react'
import mockAttendanceData from '../../data/mockAttendanceData'
import { CgProfile } from 'react-icons/cg'
import { FaTimes, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaRegCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from 'react-icons/rx'
// import SlCalendar  from 'react-icons/sl'
import { CalendarDays } from "lucide-react";
// import {EmployeeAttendanceModal} from './EmployeeAttendanceModal'

// Mock employees list
const mockEmployees = [
  { employeeId: 1, name: 'Abdul Rehman', email: 'abdulrehman@gmail.com', role: 'admin', designation: 'Frontend Developer' },
  { employeeId: 2, name: 'Ali Zain', email: 'alizain@gmail.com', role: 'employee', designation: 'Backend Developer' },
  { employeeId: 3, name: 'Khubaib', email: 'khubaib@gmail.com', role: 'employee', designation: 'UI/UX Designer' },
  { employeeId: 4, name: 'Shazain', email: 'shazain@gmail.com', role: 'employee', designation: 'Full Stack Developer' },
]

// Circular Progress Component for Work Hours
function CircularProgress({ workHours }) {
  if (!workHours || workHours === '------') return (
    <div className="flex justify-center items-center">
      <div className="w-36 h-36 rounded-full border-8 border-gray-200 flex items-center justify-center">
        <span className="text-gray-400 text-sm">No Data</span>
      </div>
    </div>
  )

  const [hours, minutes] = workHours.split('h').map(s => parseInt(s.trim()))
  const totalMinutes = (hours || 0) * 60 + (minutes || 0)
  const percentage = Math.min((totalMinutes / 540) * 100, 100) // 9 hours (540 mins) is 100%
  const strokeDasharray = 2 * Math.PI * 60
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

  return (
    <div className="flex justify-center items-center relative">
      <svg className="w-36 h-36 transform -rotate-90">
        <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
        <circle
          cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8"
          strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" fill="transparent" className="text-[#2C5284]"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-gray-800">{workHours}</span>
        <span className="text-xs text-gray-500">Work Hours</span>
      </div>
    </div>
  )
}

// Attendance Detail Modal
function AttendanceDetailModal({ employee, record, onClose }) {
  const isPresent = record.status === 'Present'
  const isLeave = record.status === 'Leave'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-[#2C5284] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Attendance Details</h2>
            <p className="text-blue-100 text-sm">{record.date}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-[#2C5284] flex items-center justify-center text-white">
              <CgProfile size={32} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{employee.name}</h3>
              <p className="text-gray-500 text-sm">{employee.designation}</p>
            </div>
            <div className="ml-auto">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                record.status === 'Present' ? 'bg-green-100 text-green-700' :
                record.status === 'Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                {record.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-[#2C5284]"><AiOutlineClockCircle size={20} /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Clock In</p>
                  <p className="font-bold text-gray-900">{record.checkIn || '--:--'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-[#2C5284]"><AiOutlineClockCircle size={20} /></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Clock Out</p>
                  <p className="font-bold text-gray-900">{record.checkOut || '--:--'}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-gray-100 pl-6">
              <CircularProgress workHours={record.workHours} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-[#2C5284] text-white rounded-lg font-semibold hover:bg-[#1e3a5f] transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function AdminAttendance({ setTitle }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => { setTitle('Attendance Management') }, [setTitle])

  const getFilteredRecords = (employeeId) => {
    let records = mockAttendanceData.filter(r => r.employeeId === employeeId)
    if (selectedDate) records = records.filter(r => r.date === selectedDate)
    return records
  }

  const handleRowClick = (employee, record) => {
    setSelectedEmployee(employee); setSelectedRecord(record); setShowModal(true)
  }

  const filteredEmployees = mockEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const allRecords = filteredEmployees.flatMap(employee => {
    const records = getFilteredRecords(employee.employeeId)
    if (records.length === 0 && selectedDate) {
      return [{ employee, isEmpty: true, date: selectedDate, status: 'No Record' }]
    }
    return records.map(record => ({ employee, ...record }))
  })

  const totalPages = Math.ceil(allRecords.length / itemsPerPage)
  const paginatedRecords = allRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const todayStats = { total: mockEmployees.length, present: 3, absent: 1, onLeave: 0 }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">Attendance Management</h1>

      {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
            <p className="text-sm sm:text-base text-[#2C5284]">Total Employees</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.total}</h1>
          </div>
          <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
            <CgProfile size={24} className="text-white" />
          </div>
        </div>

         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
            <p className="text-sm sm:text-base text-[#2C5284]">Today Present</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.present}</h1>
          </div>
          <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
            <FaRegCheckCircle size={24} className="text-white" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
            <p className="text-sm sm:text-base text-[#2C5284]">Today Absent</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.absent}</h1>
          </div>
          <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
            <RxCrossCircled size={24} className="text-white" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
            <p className="text-sm sm:text-base text-[#2C5284]">Today Leave</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.onLeave}</h1>
          </div>
          <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
            {/* <SlCalendar size={24} className="text-white" /> */}
            <CalendarDays size={24} className='text-white' /> 
            
          </div>
        </div>
      </div>

      {/* Search & Date Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text" placeholder="Search employee..." value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none"
          />
          <input
            type="date" value={selectedDate}
            onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#2C5284]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock In</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock Out</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedRecords.map((record, idx) => (
              <tr key={idx} onClick={() => !record.isEmpty && handleRowClick(record.employee, record)} className="hover:bg-blue-50 cursor-pointer transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center"><CgProfile size={18} className="text-white" /></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.employee.name}</div>
                      <div className="text-xs text-gray-500">{record.employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkIn || '------'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkOut || '------'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.workHours || '------'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    record.status === 'Present' ? 'bg-green-100 text-green-800' :
                    record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>{record.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {paginatedRecords.map((record, idx) => (
          <div key={idx} onClick={() => !record.isEmpty && handleRowClick(record.employee, record)} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-4 flex items-center gap-3 border-b border-gray-100 bg-gray-50/50">
              <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center"><CgProfile size={20} className="text-white" /></div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{record.employee.name}</p>
                <p className="text-xs text-gray-500">{record.employee.email}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#2C5284] text-white">{record.status}</span>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div><p className="text-[10px] text-gray-400 uppercase font-bold">Date</p><p className="text-sm text-gray-700">{record.date}</p></div>
              <div><p className="text-[10px] text-gray-400 uppercase font-bold">Work Hours</p><p className="text-sm text-gray-700">{record.workHours || '------'}</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">Showing {paginatedRecords.length} of {allRecords.length} entries</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-50"><FaChevronLeft size={14} /></button>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-50"><FaChevronRight size={14} /></button>
          </div>
        </div>
      )}

      {showModal && selectedEmployee && selectedRecord && (
        <AttendanceDetailModal employee={selectedEmployee} record={selectedRecord} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default AdminAttendance
