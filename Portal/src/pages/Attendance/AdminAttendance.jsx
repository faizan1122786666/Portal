
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































// import { useEffect, useState } from 'react'
// import mockAttendanceData from '../../data/mockAttendanceData'
// import { CgProfile } from 'react-icons/cg'
// import { FaTimes, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { AiOutlineClockCircle } from 'react-icons/ai'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import { RxCrossCircled } from 'react-icons/rx'
// // import SlCalendar  from 'react-icons/sl'
// import { CalendarDays } from "lucide-react";
// // import {EmployeeAttendanceModal} from './EmployeeAttendanceModal'

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

//     {/* Stats Cards */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Total Employees</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.total}</h1>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <CgProfile size={24} className="text-white" />
//           </div>
//         </div>


//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Today Present</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.present}</h1>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <FaRegCheckCircle size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Today Absent</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.absent}</h1>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <RxCrossCircled size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Today Leave</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.onLeave}</h1>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             {/* <SlCalendar size={24} className="text-white" /> */}
//             <CalendarDays size={24} className='text-white' /> 

//           </div>
//         </div>
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
//               <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#2C5284] text-white">{record.status}</span>
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















// import { useEffect, useState, useCallback } from 'react'
// import { CgProfile } from 'react-icons/cg'
// import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { AiOutlineClockCircle } from 'react-icons/ai'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import { RxCrossCircled } from 'react-icons/rx'
// import { CalendarDays } from 'lucide-react'
// import { apiGetAllAttendance, apiGetTodaySummary } from '../../api/attendanceAPI'

// // ── Circular Progress ─────────────────────────────────────────────────────────
// function CircularProgress({ workHours }) {
//   if (!workHours) return (
//     <div className="flex justify-center items-center">
//       <div className="w-36 h-36 rounded-full border-8 border-gray-200 flex items-center justify-center">
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
//       <svg className="w-36 h-36 transform -rotate-90">
//         <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
//         <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8"
//           strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round" fill="transparent" className="text-[#2C5284]" />
//       </svg>
//       <div className="absolute flex flex-col items-center">
//         <span className="text-2xl font-bold text-gray-800">{workHours}</span>
//         <span className="text-xs text-gray-500">Work Hours</span>
//       </div>
//     </div>
//   )
// }

// // ── Detail Modal ──────────────────────────────────────────────────────────────
// function AttendanceDetailModal({ record, onClose }) {
//   // record.employeeId is populated object from backend
//   const emp = record.employeeId || {}

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
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
//               <h3 className="font-bold text-gray-900 text-lg">{emp.email || 'Employee'}</h3>
//               <p className="text-gray-500 text-sm">{emp.department || emp.role || ''}</p>
//             </div>
//             <div className="ml-auto">
//               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
//                 record.status === 'Present' ? 'bg-green-100 text-green-700' :
//                 record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
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

// // ── Main Component ────────────────────────────────────────────────────────────
// function AdminAttendance({ setTitle }) {
//   const [records, setRecords]             = useState([])
//   const [todayStats, setTodayStats]       = useState({ totalEmployees: 0, present: 0, absent: 0, onLeave: 0 })
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showModal, setShowModal]         = useState(false)
//   const [searchTerm, setSearchTerm]       = useState('')
//   const [selectedDate, setSelectedDate]   = useState('')
//   const [currentPage, setCurrentPage]     = useState(1)
//   const [loading, setLoading]             = useState(true)
//   const [error, setError]                 = useState('')
//   const itemsPerPage = 8

//   useEffect(() => { setTitle('Attendance Management') }, [setTitle])

//   // Fetch today's summary
//   const fetchSummary = useCallback(async () => {
//     try {
//       const data = await apiGetTodaySummary()
//       setTodayStats(data)
//     } catch {
//       console.error('Failed to fetch summary')
//     }
//   }, [])

//   // Fetch all attendance records
//   const fetchRecords = useCallback(async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const filters = {}
//       if (selectedDate) filters.date = selectedDate
//       const data = await apiGetAllAttendance(filters)
//       setRecords(data.records || [])
//     } catch {
//       setError('Failed to load attendance records.')
//     } finally {
//       setLoading(false)
//     }
//   }, [selectedDate])

//   useEffect(() => {
//     fetchSummary()
//   }, [fetchSummary])

//   useEffect(() => {
//     fetchRecords()
//     setCurrentPage(1)
//   }, [fetchRecords])

//   // Filter by search (employee email)
//   const filteredRecords = records.filter(r => {
//     const emp = r.employeeId || {}
//     const email = emp.email || ''
//     const dept  = emp.department || ''
//     return (
//       email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       dept.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   const totalPages       = Math.ceil(filteredRecords.length / itemsPerPage)
//   const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">
//       <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">Attendance Management</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-30">
//           <div>
//             <p className="text-sm text-[#2C5284]">Total Employees</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.totalEmployees}</h1>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <CgProfile size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-30">
//           <div>
//             <p className="text-sm text-[#2C5284]">Today Present</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.present}</h1>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <FaRegCheckCircle size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-30">
//           <div>
//             <p className="text-sm text-[#2C5284]">Today Absent</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.absent}</h1>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <RxCrossCircled size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-30">
//           <div>
//             <p className="text-sm text-[#2C5284]">Today Leave</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{todayStats.onLeave}</h1>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <CalendarDays size={24} className="text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Search & Date Filter */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             placeholder="Search by email or department..."
//             value={searchTerm}
//             onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
//             className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none"
//           />
//           <div className="flex items-center gap-2">
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1) }}
//               className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
//             />
//             {selectedDate && (
//               <button
//                 onClick={() => { setSelectedDate(''); setCurrentPage(1) }}
//                 className="px-3 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
//               >
//                 <FaTimes size={12} /> Clear
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-4 border border-red-200">{error}</div>
//       )}

//       {/* Loading */}
//       {loading ? (
//         <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">
//           Loading attendance records...
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#2C5284]">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock In</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock Out</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedRecords.map((record) => {
//                   const emp = record.employeeId || {}
//                   return (
//                     <tr
//                       key={record._id}
//                       onClick={() => { setSelectedRecord(record); setShowModal(true) }}
//                       className="hover:bg-blue-50 cursor-pointer transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-3">
//                           <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center">
//                             <CgProfile size={18} className="text-white" />
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">{emp.email || 'Unknown'}</div>
//                             <div className="text-xs text-gray-500">{emp.department || emp.role || ''}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkIn || '------'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkOut || '------'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.workHours || '------'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                           record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
//                         }`}>{record.status}</span>
//                       </td>
//                     </tr>
//                   )
//                 })}
//                 {paginatedRecords.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="px-6 py-10 text-center text-gray-400 italic">No records found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-4">
//             {paginatedRecords.map((record) => {
//               const emp = record.employeeId || {}
//               return (
//                 <div
//                   key={record._id}
//                   onClick={() => { setSelectedRecord(record); setShowModal(true) }}
//                   className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer"
//                 >
//                   <div className="p-4 flex items-center gap-3 border-b border-gray-100 bg-gray-50/50">
//                     <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center">
//                       <CgProfile size={20} className="text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-900 text-sm">{emp.email || 'Unknown'}</p>
//                       <p className="text-xs text-gray-500">{emp.department || emp.role || ''}</p>
//                     </div>
//                     <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
//                       record.status === 'Present' ? 'bg-green-100 text-green-700' :
//                       record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//                     }`}>{record.status}</span>
//                   </div>
//                   <div className="p-4 grid grid-cols-2 gap-4">
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">Date</p><p className="text-sm text-gray-700">{record.date}</p></div>
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">Work Hours</p><p className="text-sm text-gray-700">{record.workHours || '------'}</p></div>
//                   </div>
//                 </div>
//               )
//             })}
//             {paginatedRecords.length === 0 && (
//               <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
//                 No records found.
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//               <p className="text-sm text-gray-600">
//                 Showing {paginatedRecords.length} of {filteredRecords.length} entries
//               </p>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
//                   className="p-2 border rounded-lg disabled:opacity-50">
//                   <FaChevronLeft size={14} />
//                 </button>
//                 {[...Array(totalPages)].map((_, i) => (
//                   <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
//                     className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                       currentPage === i + 1 ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
//                     }`}>
//                     {i + 1}
//                   </button>
//                 ))}
//                 <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
//                   className="p-2 border rounded-lg disabled:opacity-50">
//                   <FaChevronRight size={14} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Modal */}
//       {showModal && selectedRecord && (
//         <AttendanceDetailModal
//           record={selectedRecord}
//           onClose={() => { setShowModal(false); setSelectedRecord(null) }}
//         />
//       )}
//     </div>
//   )
// }

// export default AdminAttendance













// import { useEffect, useState, useCallback } from 'react'
// import { CgProfile } from 'react-icons/cg'
// import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { AiOutlineClockCircle } from 'react-icons/ai'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import { RxCrossCircled } from 'react-icons/rx'
// import { CalendarDays } from 'lucide-react'
// import { apiGetAllAttendance, apiGetTodaySummary } from '../../api/attendanceAPI'

// // ── Circular Progress ─────────────────────────────────────────────────────────
// function CircularProgress({ workHours }) {
//   if (!workHours) return (
//     <div className="flex justify-center items-center">
//       <div className="w-36 h-36 rounded-full border-8 border-gray-200 flex items-center justify-center">
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
//       <svg className="w-36 h-36 transform -rotate-90">
//         <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
//         <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8"
//           strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round" fill="transparent" className="text-[#2C5284]" />
//       </svg>
//       <div className="absolute flex flex-col items-center">
//         <span className="text-xl font-bold text-gray-800">{workHours}</span>
//         <span className="text-xs text-gray-500">Total Hours</span>
//       </div>
//     </div>
//   )
// }

// // ── Detail Modal ──────────────────────────────────────────────────────────────
// function AttendanceDetailModal({ record, onClose }) {
//   const emp      = record.employeeId || {}
//   const sessions = record.sessions   || []

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

//         <div className="bg-[#2C5284] p-5 text-white flex justify-between items-center rounded-t-2xl">
//           <div>
//             <h2 className="text-xl font-bold">Attendance Details</h2>
//             <p className="text-blue-100 text-sm">{record.date}</p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <div className="p-6 space-y-5">

//           {/* Employee Info */}
//           <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
//             <div className="w-14 h-14 rounded-full bg-[#2C5284] flex items-center justify-center text-white flex-shrink-0">
//               <CgProfile size={32} />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="font-bold text-gray-900 truncate">{emp.email || 'Unknown'}</h3>
//               <p className="text-gray-500 text-sm">{emp.department || emp.role || 'Employee'}</p>
//             </div>
//             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex-shrink-0 ${
//               record.status === 'Present' ? 'bg-green-100 text-green-700' :
//               record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//             }`}>
//               {record.status}
//             </span>
//           </div>

//           {/* Sessions list */}
//           {sessions.length > 0 ? (
//             <div>
//               <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
//                 Sessions ({sessions.length})
//               </h4>
//               <div className="space-y-2">
//                 {sessions.map((s, i) => (
//                   <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 text-sm">
//                     <span className="text-gray-500 font-medium w-20 flex-shrink-0">Session {i + 1}</span>
//                     <div className="flex items-center gap-2 text-[#365F8D] font-semibold flex-1 justify-center">
//                       <AiOutlineClockCircle size={14} />
//                       <span>{s.checkIn}</span>
//                       <span className="text-gray-400">→</span>
//                       {s.checkOut
//                         ? <span>{s.checkOut}</span>
//                         : <span className="text-green-600 italic">ongoing</span>
//                       }
//                     </div>
//                     <span className="text-gray-700 font-medium w-16 text-right flex-shrink-0">
//                       {s.workHours || '...'}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-400 text-sm italic text-center py-4">No sessions recorded.</p>
//           )}

//           {/* Summary row */}
//           <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
//             <div className="flex-1 flex justify-center">
//               <CircularProgress workHours={record.totalWorkHours} />
//             </div>
//             <div className="flex-1 space-y-3">
//               <div>
//                 <p className="text-xs text-gray-500 uppercase font-semibold mb-1">First Check-in</p>
//                 <p className="font-bold text-gray-900">{sessions[0]?.checkIn || '--:--'}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Last Check-out</p>
//                 <p className="font-bold text-gray-900">
//                   {[...sessions].reverse().find(s => s.checkOut)?.checkOut || '--:--'}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Sessions</p>
//                 <p className="font-bold text-[#2C5284]">{sessions.length}</p>
//               </div>
//             </div>
//           </div>

//         </div>

//         <div className="p-4 bg-gray-50 flex justify-end rounded-b-2xl">
//           <button onClick={onClose} className="px-6 py-2 bg-[#2C5284] text-white rounded-lg font-semibold hover:bg-[#1e3a5f] transition-colors">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// function AdminAttendance({ setTitle }) {
//   const [records, setRecords]               = useState([])
//   const [todayStats, setTodayStats]         = useState({ totalEmployees: 0, present: 0, absent: 0, onLeave: 0 })
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showModal, setShowModal]           = useState(false)
//   const [searchTerm, setSearchTerm]         = useState('')
//   const [selectedDate, setSelectedDate]     = useState('')
//   const [currentPage, setCurrentPage]       = useState(1)
//   const [loading, setLoading]               = useState(true)
//   const [error, setError]                   = useState('')
//   const itemsPerPage = 8

//   useEffect(() => { setTitle('Attendance Management') }, [setTitle])

//   const fetchSummary = useCallback(async () => {
//     try {
//       const data = await apiGetTodaySummary()
//       setTodayStats(data)
//     } catch { console.error('Failed to fetch summary') }
//   }, [])

//   const fetchRecords = useCallback(async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const filters = {}
//       if (selectedDate) filters.date = selectedDate
//       const data = await apiGetAllAttendance(filters)
//       setRecords(data.records || [])
//     } catch {
//       setError('Failed to load attendance records.')
//     } finally {
//       setLoading(false)
//     }
//   }, [selectedDate])

//   useEffect(() => { fetchSummary() }, [fetchSummary])
//   useEffect(() => { fetchRecords(); setCurrentPage(1) }, [fetchRecords])

//   const filteredRecords = records.filter(r => {
//     const emp  = r.employeeId || {}
//     const text = `${emp.email || ''} ${emp.department || ''}`.toLowerCase()
//     return text.includes(searchTerm.toLowerCase())
//   })

//   const totalPages       = Math.ceil(filteredRecords.length / itemsPerPage)
//   const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   const getFirstIn      = (sessions = []) => sessions[0]?.checkIn || '------'
//   const getLastOut      = (sessions = []) => [...sessions].reverse().find(s => s.checkOut)?.checkOut || '------'
//   const getSessionCount = (sessions = []) => sessions.length

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">
//       <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">Attendance Management</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {[
//           { label: 'Total Employees', value: todayStats.totalEmployees, icon: <CgProfile size={24} className="text-white" /> },
//           { label: 'Today Present',   value: todayStats.present,        icon: <FaRegCheckCircle size={24} className="text-white" /> },
//           { label: 'Today Absent',    value: todayStats.absent,         icon: <RxCrossCircled size={24} className="text-white" /> },
//           { label: 'Today Leave',     value: todayStats.onLeave,        icon: <CalendarDays size={24} className="text-white" /> },
//         ].map((card, i) => (
//           <div key={i} className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300">
//             <div>
//               <p className="text-sm text-[#2C5284]">{card.label}</p>
//               <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{card.value}</h1>
//             </div>
//             <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//               {card.icon}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             placeholder="Search by email or department..."
//             value={searchTerm}
//             onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
//             className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none"
//           />
//           <div className="flex items-center gap-2">
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1) }}
//               className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
//             />
//             {selectedDate && (
//               <button
//                 onClick={() => { setSelectedDate(''); setCurrentPage(1) }}
//                 className="px-3 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
//               >
//                 <FaTimes size={12} /> Clear
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-4 border border-red-200">{error}</div>}

//       {loading ? (
//         <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">
//           Loading attendance records...
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#2C5284]">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">First In</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Last Out</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Sessions</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total Hours</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedRecords.map((record) => {
//                   const emp = record.employeeId || {}
//                   return (
//                     <tr key={record._id}
//                       onClick={() => { setSelectedRecord(record); setShowModal(true) }}
//                       className="hover:bg-blue-50 cursor-pointer transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-3">
//                           <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                             <CgProfile size={18} className="text-white" />
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">{emp.email || 'Unknown'}</div>
//                             <div className="text-xs text-gray-500">{emp.department || emp.role || ''}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getFirstIn(record.sessions)}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getLastOut(record.sessions)}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
//                           {getSessionCount(record.sessions)} session{getSessionCount(record.sessions) !== 1 ? 's' : ''}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#2C5284]">
//                         {record.totalWorkHours || '------'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                           record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
//                         }`}>{record.status}</span>
//                       </td>
//                     </tr>
//                   )
//                 })}
//                 {paginatedRecords.length === 0 && (
//                   <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400 italic">No records found.</td></tr>
//                 )}
//               </tbody>
//             </table>
//             <p className="text-xs text-gray-400 text-center py-3 border-t border-gray-100">
//               Click any row to view full session details
//             </p>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-4">
//             {paginatedRecords.map((record) => {
//               const emp = record.employeeId || {}
//               return (
//                 <div key={record._id}
//                   onClick={() => { setSelectedRecord(record); setShowModal(true) }}
//                   className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer active:scale-[0.98] transition-all">
//                   <div className="p-4 flex items-center gap-3 border-b border-gray-100 bg-gray-50/50">
//                     <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                       <CgProfile size={20} className="text-white" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-gray-900 text-sm truncate">{emp.email || 'Unknown'}</p>
//                       <p className="text-xs text-gray-500">{emp.department || emp.role || ''}</p>
//                     </div>
//                     <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0 ${
//                       record.status === 'Present' ? 'bg-green-100 text-green-700' :
//                       record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//                     }`}>{record.status}</span>
//                   </div>
//                   <div className="p-4 grid grid-cols-2 gap-3">
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">Date</p><p className="text-sm text-gray-700">{record.date}</p></div>
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">Total Hours</p><p className="text-sm font-semibold text-[#2C5284]">{record.totalWorkHours || '------'}</p></div>
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">First In</p><p className="text-sm text-gray-700">{getFirstIn(record.sessions)}</p></div>
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">Sessions</p><p className="text-sm text-gray-700">{getSessionCount(record.sessions)}</p></div>
//                   </div>
//                 </div>
//               )
//             })}
//             {paginatedRecords.length === 0 && (
//               <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">No records found.</div>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//               <p className="text-sm text-gray-600">Showing {paginatedRecords.length} of {filteredRecords.length} entries</p>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
//                   className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"><FaChevronLeft size={14} /></button>
//                 {[...Array(totalPages)].map((_, i) => (
//                   <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
//                     className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                       currentPage === i + 1 ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
//                     }`}>{i + 1}</button>
//                 ))}
//                 <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
//                   className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"><FaChevronRight size={14} /></button>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {showModal && selectedRecord && (
//         <AttendanceDetailModal
//           record={selectedRecord}
//           onClose={() => { setShowModal(false); setSelectedRecord(null) }}
//         />
//       )}
//     </div>
//   )
// }

// export default AdminAttendance




















// import { useEffect, useState, useCallback } from 'react'
// import Select from 'react-select'
// import { CgProfile } from 'react-icons/cg'
// import { FaTimes, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa'
// import { AiOutlineClockCircle } from 'react-icons/ai'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import { RxCrossCircled } from 'react-icons/rx'
// import { CalendarDays } from 'lucide-react'
// import {
//   apiGetAllAttendance,
//   apiGetTodaySummary,
//   apiGetEmployees,
//   apiMarkAttendance,
// } from '../../api/attendanceAPI'

// // ── React Select custom styles to match app theme ────────────────────────────
// const selectStyles = {
//   control: (base, state) => ({
//     ...base,
//     borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
//     boxShadow: state.isFocused ? '0 0 0 2px rgba(44,82,132,0.2)' : 'none',
//     borderRadius: '0.5rem',
//     minHeight: '42px',
//     '&:hover': { borderColor: '#2C5284' },
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isSelected
//       ? '#2C5284'
//       : state.isFocused
//       ? '#EBF2FB'
//       : 'white',
//     color: state.isSelected ? 'white' : '#111827',
//     cursor: 'pointer',
//   }),
//   placeholder: (base) => ({ ...base, color: '#9ca3af' }),
// }

// // ── Status options ────────────────────────────────────────────────────────────
// const statusOptions = [
//   { value: 'Present', label: 'Present' },
//   { value: 'Absent',  label: 'Absent'  },
//   { value: 'Leave',   label: 'Leave'   },
// ]

// // ── Circular Progress ─────────────────────────────────────────────────────────
// function CircularProgress({ workHours }) {
//   if (!workHours) return (
//     <div className="flex justify-center items-center">
//       <div className="w-36 h-36 rounded-full border-8 border-gray-200 flex items-center justify-center">
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
//       <svg className="w-36 h-36 transform -rotate-90">
//         <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
//         <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="8"
//           strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round" fill="transparent" className="text-[#2C5284]" />
//       </svg>
//       <div className="absolute flex flex-col items-center">
//         <span className="text-xl font-bold text-gray-800">{workHours}</span>
//         <span className="text-xs text-gray-500">Total Hours</span>
//       </div>
//     </div>
//   )
// }

// // ── Detail Modal ──────────────────────────────────────────────────────────────
// function AttendanceDetailModal({ record, onClose }) {
//   const emp      = record.employeeId || {}
//   const sessions = record.sessions   || []

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
//         <div className="bg-[#2C5284] p-5 text-white flex justify-between items-center rounded-t-2xl">
//           <div>
//             <h2 className="text-xl font-bold">Attendance Details</h2>
//             <p className="text-blue-100 text-sm">{record.date}</p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <div className="p-6 space-y-5">
//           <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
//             <div className="w-14 h-14 rounded-full bg-[#2C5284] flex items-center justify-center text-white flex-shrink-0">
//               <CgProfile size={32} />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="font-bold text-gray-900 truncate">{emp.email || 'Unknown'}</h3>
//               <p className="text-gray-500 text-sm">{emp.department || emp.role || 'Employee'}</p>
//             </div>
//             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex-shrink-0 ${
//               record.status === 'Present' ? 'bg-green-100 text-green-700' :
//               record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//             }`}>
//               {record.status}
//             </span>
//           </div>

//           {sessions.length > 0 ? (
//             <div>
//               <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
//                 Sessions ({sessions.length})
//               </h4>
//               <div className="space-y-2">
//                 {sessions.map((s, i) => (
//                   <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 text-sm">
//                     <span className="text-gray-500 font-medium w-20 flex-shrink-0">Session {i + 1}</span>
//                     <div className="flex items-center gap-2 text-[#365F8D] font-semibold flex-1 justify-center">
//                       <AiOutlineClockCircle size={14} />
//                       <span>{s.checkIn}</span>
//                       <span className="text-gray-400">→</span>
//                       {s.checkOut
//                         ? <span>{s.checkOut}</span>
//                         : <span className="text-green-600 italic">ongoing</span>
//                       }
//                     </div>
//                     <span className="text-gray-700 font-medium w-16 text-right flex-shrink-0">
//                       {s.workHours || '...'}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-400 text-sm italic text-center py-4">No sessions recorded.</p>
//           )}

//           <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
//             <div className="flex-1 flex justify-center">
//               <CircularProgress workHours={record.totalWorkHours} />
//             </div>
//             <div className="flex-1 space-y-3">
//               <div>
//                 <p className="text-xs text-gray-500 uppercase font-semibold mb-1">First Check-in</p>
//                 <p className="font-bold text-gray-900">{sessions[0]?.checkIn || '--:--'}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Last Check-out</p>
//                 <p className="font-bold text-gray-900">
//                   {[...sessions].reverse().find(s => s.checkOut)?.checkOut || '--:--'}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Sessions</p>
//                 <p className="font-bold text-[#2C5284]">{sessions.length}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 bg-gray-50 flex justify-end rounded-b-2xl">
//           <button onClick={onClose} className="px-6 py-2 bg-[#2C5284] text-white rounded-lg font-semibold hover:bg-[#1e3a5f] transition-colors">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ── Mark Attendance Modal ─────────────────────────────────────────────────────
// function MarkAttendanceModal({ employees, onClose, onSuccess }) {
//   const [selectedEmployee, setSelectedEmployee] = useState(null)
//   const [selectedStatus, setSelectedStatus]     = useState(null)
//   const [selectedDate, setSelectedDate]         = useState(() => {
//     // default to today
//     const now  = new Date()
//     const yyyy = now.getFullYear()
//     const mm   = String(now.getMonth() + 1).padStart(2, '0')
//     const dd   = String(now.getDate()).padStart(2, '0')
//     return `${yyyy}-${mm}-${dd}`
//   })
//   const [checkIn, setCheckIn]   = useState('')
//   const [checkOut, setCheckOut] = useState('')
//   const [loading, setLoading]   = useState(false)
//   const [error, setError]       = useState('')
//   const [success, setSuccess]   = useState('')

//   // Build employee options for React Select
//   const employeeOptions = employees.map(emp => ({
//     value: emp._id,
//     label: emp.email,
//     sub:   emp.department || emp.role || 'Employee',
//   }))

//   const handleSubmit = async () => {
//     if (!selectedEmployee) return setError('Please select an employee.')
//     if (!selectedStatus)   return setError('Please select a status.')
//     if (!selectedDate)     return setError('Please select a date.')

//     setLoading(true)
//     setError('')
//     setSuccess('')

//     try {
//       const payload = {
//         employeeId: selectedEmployee.value,
//         date:       selectedDate,
//         status:     selectedStatus.value,
//       }
//       if (checkIn)  payload.checkIn  = checkIn
//       if (checkOut) payload.checkOut = checkOut

//       const data = await apiMarkAttendance(payload)

//       if (data.message && data.message.toLowerCase().includes('successfully')) {
//         setSuccess(`✅ Attendance marked as "${selectedStatus.value}" for ${selectedEmployee.label} on ${selectedDate}.`)
//         setTimeout(() => {
//           onSuccess()   // refresh parent list
//           onClose()
//         }, 1500)
//       } else {
//         setError(data.message || 'Something went wrong.')
//       }
//     } catch {
//       setError('Failed to mark attendance. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

//         {/* Header */}
//         <div className="bg-[#2C5284] p-5 text-white flex justify-between items-center rounded-t-2xl">
//           <div>
//             <h2 className="text-xl font-bold">Mark Attendance</h2>
//             <p className="text-blue-100 text-sm">Manually set attendance for an employee</p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <div className="p-6 space-y-5">

//           {/* Employee Select */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Employee <span className="text-red-500">*</span>
//             </label>
//             <Select
//               options={employeeOptions}
//               value={selectedEmployee}
//               onChange={setSelectedEmployee}
//               styles={selectStyles}
//               placeholder="Search and select employee..."
//               formatOptionLabel={(opt) => (
//                 <div>
//                   <div className="text-sm font-medium text-gray-900">{opt.label}</div>
//                   <div className="text-xs text-gray-400">{opt.sub}</div>
//                 </div>
//               )}
//               isSearchable
//             />
//           </div>

//           {/* Date */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Status Select */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Status <span className="text-red-500">*</span>
//             </label>
//             <Select
//               options={statusOptions}
//               value={selectedStatus}
//               onChange={setSelectedStatus}
//               styles={selectStyles}
//               placeholder="Select attendance status..."
//               isSearchable={false}
//             />
//           </div>

//           {/* Optional times — only shown when Present */}
//           {selectedStatus?.value === 'Present' && (
//             <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//                   Check-in Time <span className="text-gray-400 font-normal">(optional)</span>
//                 </label>
//                 <input
//                   type="time"
//                   value={checkIn}
//                   onChange={(e) => setCheckIn(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//                   Check-out Time <span className="text-gray-400 font-normal">(optional)</span>
//                 </label>
//                 <input
//                   type="time"
//                   value={checkOut}
//                   onChange={(e) => setCheckOut(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
//                 />
//               </div>
//               <p className="col-span-2 text-xs text-blue-600">
//                 💡 Leave times empty to just mark as Present without clock-in/out data.
//               </p>
//             </div>
//           )}

//           {/* Error / Success */}
//           {error   && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-200">{error}</div>}
//           {success && <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-200">{success}</div>}
//         </div>

//         {/* Footer */}
//         <div className="p-5 bg-gray-50 flex items-center justify-between gap-3 rounded-b-2xl border-t border-gray-100">
//           <button
//             onClick={onClose}
//             className="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="flex items-center gap-2 px-6 py-2.5 bg-[#2C5284] text-white text-sm font-semibold rounded-lg hover:bg-[#1e3a5f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <FaRegCheckCircle size={15} />
//                 Mark Attendance
//               </>
//             )}
//           </button>
//         </div>

//       </div>
//     </div>
//   )
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// function AdminAttendance({ setTitle }) {
//   const [records, setRecords]               = useState([])
//   const [employees, setEmployees]           = useState([])
//   const [todayStats, setTodayStats]         = useState({ totalEmployees: 0, present: 0, absent: 0, onLeave: 0 })
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showDetailModal, setShowDetailModal] = useState(false)
//   const [showMarkModal, setShowMarkModal]   = useState(false)
//   const [searchTerm, setSearchTerm]         = useState('')
//   const [selectedDate, setSelectedDate]     = useState('')
//   const [currentPage, setCurrentPage]       = useState(1)
//   const [loading, setLoading]               = useState(true)
//   const [error, setError]                   = useState('')
//   const itemsPerPage = 8

//   useEffect(() => { setTitle('Attendance Management') }, [setTitle])

//   const fetchSummary = useCallback(async () => {
//     try {
//       const data = await apiGetTodaySummary()
//       setTodayStats(data)
//     } catch { console.error('Failed to fetch summary') }
//   }, [])

//   const fetchRecords = useCallback(async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const filters = {}
//       if (selectedDate) filters.date = selectedDate
//       const data = await apiGetAllAttendance(filters)
//       setRecords(data.records || [])
//     } catch {
//       setError('Failed to load attendance records.')
//     } finally {
//       setLoading(false)
//     }
//   }, [selectedDate])

//   // Load employees list (for the Mark modal dropdown)
//   const fetchEmployees = useCallback(async () => {
//     try {
//       const data = await apiGetEmployees()
//       setEmployees(data.employees || [])
//     } catch { console.error('Failed to fetch employees') }
//   }, [])

//   useEffect(() => { fetchSummary() }, [fetchSummary])
//   useEffect(() => { fetchRecords(); setCurrentPage(1) }, [fetchRecords])
//   useEffect(() => { fetchEmployees() }, [fetchEmployees])

//   const filteredRecords = records.filter(r => {
//     const emp  = r.employeeId || {}
//     const text = `${emp.email || ''} ${emp.department || ''}`.toLowerCase()
//     return text.includes(searchTerm.toLowerCase())
//   })

//   const totalPages       = Math.ceil(filteredRecords.length / itemsPerPage)
//   const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   const getFirstIn      = (sessions = []) => sessions[0]?.checkIn || '------'
//   const getLastOut      = (sessions = []) => [...sessions].reverse().find(s => s.checkOut)?.checkOut || '------'
//   const getSessionCount = (sessions = []) => sessions.length

//   // After marking attendance, refresh both summary & records
//   const handleMarkSuccess = () => {
//     fetchRecords()
//     fetchSummary()
//   }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

//       {/* Page header with Mark Attendance button */}
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">Attendance Management</h1>
//         <button
//           onClick={() => setShowMarkModal(true)}
//           className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white text-sm font-semibold rounded-xl shadow hover:bg-[#1e3a5f] transition-all hover:shadow-md active:scale-[0.97]"
//         >
//           <FaPlus size={13} />
//           Mark Attendance
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {[
//           { label: 'Total Employees', value: todayStats.totalEmployees, icon: <CgProfile size={24} className="text-white" /> },
//           { label: 'Today Present',   value: todayStats.present,        icon: <FaRegCheckCircle size={24} className="text-white" /> },
//           { label: 'Today Absent',    value: todayStats.absent,         icon: <RxCrossCircled size={24} className="text-white" /> },
//           { label: 'Today Leave',     value: todayStats.onLeave,        icon: <CalendarDays size={24} className="text-white" /> },
//         ].map((card, i) => (
//           <div key={i} className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300">
//             <div>
//               <p className="text-sm text-[#2C5284]">{card.label}</p>
//               <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{card.value}</h1>
//             </div>
//             <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//               {card.icon}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             placeholder="Search by email or department..."
//             value={searchTerm}
//             onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
//             className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none"
//           />
//           <div className="flex items-center gap-2">
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1) }}
//               className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
//             />
//             {selectedDate && (
//               <button
//                 onClick={() => { setSelectedDate(''); setCurrentPage(1) }}
//                 className="px-3 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
//               >
//                 <FaTimes size={12} /> Clear
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-4 border border-red-200">{error}</div>}

//       {loading ? (
//         <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">
//           Loading attendance records...
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#2C5284]">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">First In</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Last Out</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Sessions</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total Hours</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedRecords.map((record) => {
//                   const emp = record.employeeId || {}
//                   return (
//                     <tr key={record._id}
//                       onClick={() => { setSelectedRecord(record); setShowDetailModal(true) }}
//                       className="hover:bg-blue-50 cursor-pointer transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-3">
//                           <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                             <CgProfile size={18} className="text-white" />
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">{emp.email || 'Unknown'}</div>
//                             <div className="text-xs text-gray-500">{emp.department || emp.role || ''}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getFirstIn(record.sessions)}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getLastOut(record.sessions)}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
//                           {getSessionCount(record.sessions)} session{getSessionCount(record.sessions) !== 1 ? 's' : ''}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#2C5284]">
//                         {record.totalWorkHours || '------'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                           record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
//                         }`}>{record.status}</span>
//                       </td>
//                     </tr>
//                   )
//                 })}
//                 {paginatedRecords.length === 0 && (
//                   <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400 italic">No records found.</td></tr>
//                 )}
//               </tbody>
//             </table>
//             {/* <p className="text-xs text-gray-400 text-center py-3 border-t border-gray-100">
//               Click any row to view full session details
//             </p> */}
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-4">
//             {paginatedRecords.map((record) => {
//               const emp = record.employeeId || {}
//               return (
//                 <div key={record._id}
//                   onClick={() => { setSelectedRecord(record); setShowDetailModal(true) }}
//                   className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer active:scale-[0.98] transition-all">
//                   <div className="p-4 flex items-center gap-3 border-b border-gray-100 bg-gray-50/50">
//                     <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                       <CgProfile size={20} className="text-white" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-gray-900 text-sm truncate">{emp.email || 'Unknown'}</p>
//                       <p className="text-xs text-gray-500">{emp.department || emp.role || ''}</p>
//                     </div>
//                     <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0 ${
//                       record.status === 'Present' ? 'bg-green-100 text-green-700' :
//                       record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//                     }`}>{record.status}</span>
//                   </div>
//                   <div className="p-4 grid grid-cols-2 gap-3">
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">Date</p><p className="text-sm text-gray-700">{record.date}</p></div>
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">Total Hours</p><p className="text-sm font-semibold text-[#2C5284]">{record.totalWorkHours || '------'}</p></div>
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">First In</p><p className="text-sm text-gray-700">{getFirstIn(record.sessions)}</p></div>
//                     <div><p className="text-[10px] text-gray-400 uppercase font-bold">Sessions</p><p className="text-sm text-gray-700">{getSessionCount(record.sessions)}</p></div>
//                   </div>
//                 </div>
//               )
//             })}
//             {paginatedRecords.length === 0 && (
//               <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">No records found.</div>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//               <p className="text-sm text-gray-600">Showing {paginatedRecords.length} of {filteredRecords.length} entries</p>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
//                   className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"><FaChevronLeft size={14} /></button>
//                 {[...Array(totalPages)].map((_, i) => (
//                   <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
//                     className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
//                       currentPage === i + 1 ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
//                     }`}>{i + 1}</button>
//                 ))}
//                 <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
//                   className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"><FaChevronRight size={14} /></button>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Detail Modal */}
//       {showDetailModal && selectedRecord && (
//         <AttendanceDetailModal
//           record={selectedRecord}
//           onClose={() => { setShowDetailModal(false); setSelectedRecord(null) }}
//         />
//       )}

//       {/* Mark Attendance Modal */}
//       {showMarkModal && (
//         <MarkAttendanceModal
//           employees={employees}
//           onClose={() => setShowMarkModal(false)}
//           onSuccess={handleMarkSuccess}
//         />
//       )}

//     </div>
//   )
// }

// export default AdminAttendance
















import { useEffect, useState, useCallback } from 'react'
import Select from 'react-select'
import { CgProfile } from 'react-icons/cg'
import { FaTimes, FaChevronLeft, FaChevronRight, FaPlus, FaEye } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaRegCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from 'react-icons/rx'
import { CalendarDays } from 'lucide-react'
import {
  apiGetAllAttendance,
  apiGetTodaySummary,
  apiGetEmployees,
  apiMarkAttendance,
  apiGetEmployeeAttendance,
} from '../../api/attendanceAPI'

// ── React Select custom styles ────────────────────────────────────────────────
const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(44,82,132,0.2)' : 'none',
    borderRadius: '0.5rem',
    minHeight: '42px',
    '&:hover': { borderColor: '#2C5284' },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? '#EBF2FB' : 'white',
    color: state.isSelected ? 'white' : '#111827',
    cursor: 'pointer',
  }),
  placeholder: (base) => ({ ...base, color: '#9ca3af' }),
}

const statusOptions = [
  { value: 'Present', label: 'Present' },
  { value: 'Absent',  label: 'Absent'  },
  { value: 'Leave',   label: 'Leave'   },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

function getTodayYMD() {
  const now  = new Date()
  const yyyy = now.getFullYear()
  const mm   = String(now.getMonth() + 1).padStart(2, '0')
  const dd   = String(now.getDate()).padStart(2, '0')
  return { yyyy, mm, dd, full: `${yyyy}-${mm}-${dd}` }
}

// ── Circular Progress ─────────────────────────────────────────────────────────
function CircularProgress({ workHours }) {
  if (!workHours) return (
    <div className="flex justify-center items-center">
      <div className="w-28 h-28 rounded-full border-8 border-gray-200 flex items-center justify-center">
        <span className="text-gray-400 text-xs">No Data</span>
      </div>
    </div>
  )
  const parts   = workHours.split('h')
  const hours   = parseInt(parts[0].trim()) || 0
  const minutes = parts[1] ? parseInt(parts[1].trim()) || 0 : 0
  const total   = hours * 60 + minutes
  const pct     = Math.min((total / 540) * 100, 100)
  const DA      = 2 * Math.PI * 54
  const DO      = DA - (DA * pct) / 100
  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-28 h-28 -rotate-90">
        <circle cx="56" cy="56" r="54" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
        <circle cx="56" cy="56" r="54" stroke="#2C5284" strokeWidth="8"
          strokeDasharray={DA} strokeDashoffset={DO}
          strokeLinecap="round" fill="transparent" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-base font-bold text-gray-800">{workHours}</span>
        <span className="text-[10px] text-gray-500">Total Hrs</span>
      </div>
    </div>
  )
}

// ── Employee History Modal ────────────────────────────────────────────────────
function EmployeeHistoryModal({ employee, onClose }) {
  const today        = getTodayYMD()
  const [year, setYear]   = useState(parseInt(today.yyyy))
  const [month, setMonth] = useState(parseInt(today.mm) - 1) // 0-indexed
  const [records, setRecords]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedRecord, setSelectedRecord] = useState(null)

  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`

  const fetchMonthRecords = useCallback(async () => {
    setLoading(true)
    setSelectedDay(null)
    setSelectedRecord(null)
    try {
      const data = await apiGetEmployeeAttendance(employee._id, { month: monthStr })
      // setRecords(data.records || [])
      setRecords((data.records || []).filter(r => r.employeeId !== null))

    } catch {
      setRecords([])
    } finally {
      setLoading(false)
    }
  }, [employee._id, monthStr])

  useEffect(() => { fetchMonthRecords() }, [fetchMonthRecords])

  // Build a map: date string → record
  const recordMap = {}
  records.forEach(r => { recordMap[r.date] = r })

  // Calendar grid
  const daysInMonth  = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay() // 0=Sun

  // Navigate months
  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const handleDayClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDay(day)
    setSelectedRecord(recordMap[dateStr] || null)
  }

  // Summary
  const summary = {
    present: records.filter(r => r.status === 'Present').length,
    absent:  records.filter(r => r.status === 'Absent').length,
    leave:   records.filter(r => r.status === 'Leave').length,
  }

  const emp = employee

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="bg-[#2C5284] rounded-t-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <CgProfile size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{emp.email}</h2>
              <p className="text-blue-200 text-sm">{emp.department || emp.role || 'Employee'} • Attendance History</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT: Calendar */}
          <div>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <FaChevronLeft size={13} className="text-gray-600" />
              </button>
              <div className="text-center">
                <h3 className="text-base font-bold text-gray-800">{MONTHS[month]} {year}</h3>
                <div className="flex items-center justify-center gap-3 mt-1 text-xs">
                  <span className="flex items-center gap-1 text-green-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> {summary.present} Present
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" /> {summary.absent} Absent
                  </span>
                  <span className="flex items-center gap-1 text-yellow-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" /> {summary.leave} Leave
                  </span>
                </div>
              </div>
              <button onClick={nextMonth}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <FaChevronRight size={13} className="text-gray-600" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">{d}</div>
              ))}
            </div>

            {/* Calendar cells */}
            {loading ? (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                Loading...
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for first week offset */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                  const rec     = recordMap[dateStr]
                  const isToday = dateStr === today.full
                  const isSel   = selectedDay === day
                  const status  = rec?.status

                  let bg = 'bg-gray-50 hover:bg-gray-100'
                  let dot = null
                  if (status === 'Present') { bg = 'bg-green-50 hover:bg-green-100'; dot = 'bg-green-500' }
                  if (status === 'Absent')  { bg = 'bg-red-50 hover:bg-red-100';     dot = 'bg-red-400'   }
                  if (status === 'Leave')   { bg = 'bg-yellow-50 hover:bg-yellow-100'; dot = 'bg-yellow-400' }

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`
                        relative flex flex-col items-center justify-center aspect-square rounded-lg text-sm font-medium transition-all
                        ${bg}
                        ${isToday ? 'ring-2 ring-[#2C5284] ring-offset-1' : ''}
                        ${isSel   ? '!bg-[#2C5284] !text-white shadow-md scale-105' : 'text-gray-700'}
                      `}
                    >
                      <span className={isSel ? 'text-white' : ''}>{day}</span>
                      {dot && !isSel && (
                        <span className={`w-1.5 h-1.5 rounded-full ${dot} mt-0.5`} />
                      )}
                      {isSel && dot && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/70 mt-0.5" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 border-t pt-3">
              <span className="font-medium text-gray-600">Legend:</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100 border border-green-300" /> Present</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 border border-red-300" /> Absent</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300" /> Leave</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-50 border border-gray-200" /> No record</span>
            </div>
          </div>

          {/* RIGHT: Record detail OR records list */}
          <div>
            {selectedDay && selectedRecord ? (
              /* Selected day detail */
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 text-base">
                    {MONTHS[month]} {selectedDay}, {year}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    selectedRecord.status === 'Present' ? 'bg-green-100 text-green-700' :
                    selectedRecord.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedRecord.status}
                  </span>
                </div>

                {/* Circular + times */}
                <div className="flex items-center gap-6 mb-5">
                  <CircularProgress workHours={selectedRecord.totalWorkHours} />
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold">First Clock In</p>
                      <p className="text-lg font-bold text-gray-800">
                        {selectedRecord.sessions?.[0]?.checkIn || '--:--'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold">Last Clock Out</p>
                      <p className="text-lg font-bold text-gray-800">
                        {[...(selectedRecord.sessions || [])].reverse().find(s => s.checkOut)?.checkOut || '--:--'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sessions */}
                {selectedRecord.sessions?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Sessions ({selectedRecord.sessions.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedRecord.sessions.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5 text-sm">
                          <span className="text-gray-400 font-medium w-16 flex-shrink-0">S{i + 1}</span>
                          <div className="flex items-center gap-1.5 text-[#2C5284] font-semibold flex-1">
                            <AiOutlineClockCircle size={13} />
                            <span>{s.checkIn}</span>
                            <span className="text-gray-400 mx-0.5">→</span>
                            {s.checkOut
                              ? <span className="text-gray-700">{s.checkOut}</span>
                              : <span className="text-green-500 italic text-xs">ongoing</span>
                            }
                          </div>
                          <span className="text-gray-500 text-xs font-medium flex-shrink-0">
                            {s.workHours || '...'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => { setSelectedDay(null); setSelectedRecord(null) }}
                  className="mt-4 text-xs text-[#2C5284] hover:underline"
                >
                  ← Back to all records
                </button>
              </div>
            ) : selectedDay && !selectedRecord ? (
              /* Selected day — no record */
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <CalendarDays size={28} className="text-gray-300" />
                </div>
                <p className="font-semibold text-gray-700">{MONTHS[month]} {selectedDay}, {year}</p>
                <p className="text-sm text-gray-400 mt-1">No attendance record for this day.</p>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="mt-4 text-xs text-[#2C5284] hover:underline"
                >
                  ← Back to all records
                </button>
              </div>
            ) : (
              /* All records list for the month */
              <div>
                <h3 className="font-bold text-gray-800 text-base mb-3">
                  {MONTHS[month]} {year} — All Records
                </h3>
                {loading ? (
                  <div className="py-8 text-center text-gray-400 text-sm">Loading...</div>
                ) : records.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-sm">
                    No records for this month.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[52vh] overflow-y-auto pr-1">
                    {records.map(r => (
                      <button
                        key={r._id}
                        onClick={() => {
                          const day = parseInt(r.date.split('-')[2])
                          setSelectedDay(day)
                          setSelectedRecord(r)
                        }}
                        className="w-full flex items-center justify-between bg-gray-50 hover:bg-blue-50 rounded-lg px-4 py-3 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                            r.status === 'Present' ? 'bg-green-500' :
                            r.status === 'Leave'   ? 'bg-yellow-400' : 'bg-red-400'
                          }`} />
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{r.date}</p>
                            <p className="text-xs text-gray-400">
                              {r.sessions?.[0]?.checkIn || '--'}
                              {r.sessions?.[0]?.checkIn ? ' → ' : ''}
                              {[...(r.sessions || [])].reverse().find(s => s.checkOut)?.checkOut || (r.sessions?.[0]?.checkIn ? 'ongoing' : '')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {r.totalWorkHours && (
                            <span className="text-xs font-semibold text-[#2C5284]">{r.totalWorkHours}</span>
                          )}
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            r.status === 'Present' ? 'bg-green-100 text-green-700' :
                            r.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {r.status}
                          </span>
                          <FaChevronRight size={10} className="text-gray-300 group-hover:text-[#2C5284] transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Single Record Detail Modal ────────────────────────────────────────────────
function AttendanceDetailModal({ record, onClose }) {
  const emp      = record.employeeId || {}
  const sessions = record.sessions   || []
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-[#2C5284] p-5 text-white flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold">Attendance Details</h2>
            <p className="text-blue-100 text-sm">{record.date}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-[#2C5284] flex items-center justify-center text-white flex-shrink-0">
              <CgProfile size={32} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate">{emp.email || 'Unknown'}</h3>
              <p className="text-gray-500 text-sm">{emp.department || emp.role || 'Employee'}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex-shrink-0 ${
              record.status === 'Present' ? 'bg-green-100 text-green-700' :
              record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`}>{record.status}</span>
          </div>
          {sessions.length > 0 ? (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Sessions ({sessions.length})</h4>
              <div className="space-y-2">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 text-sm">
                    <span className="text-gray-500 font-medium w-20 flex-shrink-0">Session {i + 1}</span>
                    <div className="flex items-center gap-2 text-[#365F8D] font-semibold flex-1 justify-center">
                      <AiOutlineClockCircle size={14} />
                      <span>{s.checkIn}</span>
                      <span className="text-gray-400">→</span>
                      {s.checkOut ? <span>{s.checkOut}</span> : <span className="text-green-600 italic">ongoing</span>}
                    </div>
                    <span className="text-gray-700 font-medium w-16 text-right flex-shrink-0">{s.workHours || '...'}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic text-center py-4">No sessions recorded.</p>
          )}
          <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
            <div className="flex-1 flex justify-center">
              <CircularProgress workHours={record.totalWorkHours} />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">First Check-in</p>
                <p className="font-bold text-gray-900">{sessions[0]?.checkIn || '--:--'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Last Check-out</p>
                <p className="font-bold text-gray-900">{[...sessions].reverse().find(s => s.checkOut)?.checkOut || '--:--'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Sessions</p>
                <p className="font-bold text-[#2C5284]">{sessions.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 flex justify-end rounded-b-2xl">
          <button onClick={onClose} className="px-6 py-2 bg-[#2C5284] text-white rounded-lg font-semibold hover:bg-[#1e3a5f] transition-colors">Close</button>
        </div>
      </div>
    </div>
  )
}

// ── Mark Attendance Modal ─────────────────────────────────────────────────────
function MarkAttendanceModal({ employees, onClose, onSuccess }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedStatus, setSelectedStatus]     = useState(null)
  const [selectedDate, setSelectedDate]         = useState(() => getTodayYMD().full)
  const [checkIn, setCheckIn]   = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  const employeeOptions = employees.map(emp => ({
    value: emp._id,
    label: emp.email,
    sub:   emp.department || emp.role || 'Employee',
  }))

  const handleSubmit = async () => {
    if (!selectedEmployee) return setError('Please select an employee.')
    if (!selectedStatus)   return setError('Please select a status.')
    if (!selectedDate)     return setError('Please select a date.')
    setLoading(true); setError(''); setSuccess('')
    try {
      const payload = { employeeId: selectedEmployee.value, date: selectedDate, status: selectedStatus.value }
      if (checkIn)  payload.checkIn  = checkIn
      if (checkOut) payload.checkOut = checkOut
      const data = await apiMarkAttendance(payload)
      if (data.message?.toLowerCase().includes('successfully')) {
        setSuccess(`✅ Marked "${selectedStatus.value}" for ${selectedEmployee.label} on ${selectedDate}.`)
        setTimeout(() => { onSuccess(); onClose() }, 1500)
      } else {
        setError(data.message || 'Something went wrong.')
      }
    } catch {
      setError('Failed to mark attendance.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="bg-[#2C5284] p-5 text-white flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold">Mark Attendance</h2>
            <p className="text-blue-100 text-sm">Manually set attendance for an employee</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><FaTimes size={20} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Employee <span className="text-red-500">*</span></label>
            <Select options={employeeOptions} value={selectedEmployee} onChange={setSelectedEmployee}
              styles={selectStyles} placeholder="Search and select employee..."
              formatOptionLabel={(opt) => (
                <div>
                  <div className="text-sm font-medium text-gray-900">{opt.label}</div>
                  <div className="text-xs text-gray-400">{opt.sub}</div>
                </div>
              )} isSearchable />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date <span className="text-red-500">*</span></label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status <span className="text-red-500">*</span></label>
            <Select options={statusOptions} value={selectedStatus} onChange={setSelectedStatus}
              styles={selectStyles} placeholder="Select status..." isSearchable={false} />
          </div>
          {selectedStatus?.value === 'Present' && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Check-in <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Check-out <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
              </div>
              <p className="col-span-2 text-xs text-blue-600">💡 Leave empty to just mark as Present.</p>
            </div>
          )}
          {error   && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-200">{error}</div>}
          {success && <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-200">{success}</div>}
        </div>
        <div className="p-5 bg-gray-50 flex items-center justify-between gap-3 rounded-b-2xl border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2C5284] text-white text-sm font-semibold rounded-lg hover:bg-[#1e3a5f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? (
              <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>Saving...</>
            ) : (
              <><FaRegCheckCircle size={15} />Mark Attendance</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
function AdminAttendance({ setTitle }) {
  const [records, setRecords]                   = useState([])
  const [employees, setEmployees]               = useState([])
  const [todayStats, setTodayStats]             = useState({ totalEmployees: 0, present: 0, absent: 0, onLeave: 0 })
  const [selectedRecord, setSelectedRecord]     = useState(null)
  const [showDetailModal, setShowDetailModal]   = useState(false)
  const [showMarkModal, setShowMarkModal]       = useState(false)
  const [historyEmployee, setHistoryEmployee]   = useState(null) // for EmployeeHistoryModal
  const [searchTerm, setSearchTerm]             = useState('')
  const [selectedDate, setSelectedDate]         = useState('')
  const [currentPage, setCurrentPage]           = useState(1)
  const [loading, setLoading]                   = useState(true)
  const [error, setError]                       = useState('')
  const itemsPerPage = 8

  useEffect(() => { setTitle('Attendance Management') }, [setTitle])

  const fetchSummary = useCallback(async () => {
    try { const data = await apiGetTodaySummary(); setTodayStats(data) }
    catch { console.error('Failed to fetch summary') }
  }, [])

  const fetchRecords = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const filters = {}
      if (selectedDate) filters.date = selectedDate
      const data = await apiGetAllAttendance(filters)
      setRecords(data.records || [])
    } catch {
      setError('Failed to load attendance records.')
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  const fetchEmployees = useCallback(async () => {
    try { const data = await apiGetEmployees(); setEmployees(data.employees || []) }
    catch { console.error('Failed to fetch employees') }
  }, [])

  useEffect(() => { fetchSummary() }, [fetchSummary])
  useEffect(() => { fetchRecords(); setCurrentPage(1) }, [fetchRecords])
  useEffect(() => { fetchEmployees() }, [fetchEmployees])

  const filteredRecords = records.filter(r => {
    const emp  = r.employeeId || {}
    const text = `${emp.email || ''} ${emp.department || ''}`.toLowerCase()
    return text.includes(searchTerm.toLowerCase())
  })

  const totalPages       = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getFirstIn      = (sessions = []) => sessions[0]?.checkIn || '------'
  const getLastOut      = (sessions = []) => [...sessions].reverse().find(s => s.checkOut)?.checkOut || '------'
  const getSessionCount = (sessions = []) => sessions.length

  const handleMarkSuccess = () => { fetchRecords(); fetchSummary() }

  // When clicking a row, open single record detail
  const handleRowClick = (record) => {
    setSelectedRecord(record)
    setShowDetailModal(true)
  }

  // When clicking eye icon on an employee, open full history modal
  const handleViewEmployee = (e, employeeObj) => {
    e.stopPropagation()
    setHistoryEmployee(employeeObj)
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">Attendance Management</h1>
        <button
          onClick={() => setShowMarkModal(true)}
          className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white text-sm font-semibold rounded-xl shadow hover:bg-[#1e3a5f] transition-all hover:shadow-md active:scale-[0.97]"
        >
          <FaPlus size={13} />
          Mark Attendance
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Employees', value: todayStats.totalEmployees, icon: <CgProfile size={24} className="text-white" /> },
          { label: 'Today Present',   value: todayStats.present,        icon: <FaRegCheckCircle size={24} className="text-white" /> },
          { label: 'Today Absent',    value: todayStats.absent,         icon: <RxCrossCircled size={24} className="text-white" /> },
          { label: 'Today Leave',     value: todayStats.onLeave,        icon: <CalendarDays size={24} className="text-white" /> },
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300">
            <div>
              <p className="text-sm text-[#2C5284]">{card.label}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{card.value}</h1>
            </div>
            <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" placeholder="Search by email or department..."
            value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none" />
          <div className="flex items-center gap-2">
            <input type="date" value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1) }}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
            {selectedDate && (
              <button onClick={() => { setSelectedDate(''); setCurrentPage(1) }}
                className="px-3 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1">
                <FaTimes size={12} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-4 border border-red-200">{error}</div>}

      {loading ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">Loading attendance records...</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#2C5284]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">First In</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Last Out</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Sessions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total Hours</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">History</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRecords.map((record) => {
                  const emp = record.employeeId || {}
                  return (
                    <tr key={record._id} onClick={() => handleRowClick(record)}
                      className="hover:bg-blue-50 cursor-pointer transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
                            <CgProfile size={18} className="text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{emp.email || 'Unknown'}</div>
                            <div className="text-xs text-gray-500">{emp.department || emp.role || ''}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getFirstIn(record.sessions)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getLastOut(record.sessions)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                          {getSessionCount(record.sessions)} session{getSessionCount(record.sessions) !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#2C5284]">
                        {record.totalWorkHours || '------'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          record.status === 'Present' ? 'bg-green-100 text-green-800' :
                          record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>{record.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => handleViewEmployee(e, emp)}
                          title="View full attendance history"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2C5284]/10 hover:bg-[#2C5284] text-[#2C5284] hover:text-white rounded-lg text-xs font-semibold transition-all group"
                        >
                          <FaEye size={12} />
                          <span>History</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {paginatedRecords.length === 0 && (
                  <tr><td colSpan={8} className="px-6 py-10 text-center text-gray-400 italic">No records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {paginatedRecords.map((record) => {
              const emp = record.employeeId || {}
              return (
                <div key={record._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div
                    onClick={() => handleRowClick(record)}
                    className="p-4 flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 cursor-pointer active:bg-blue-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
                      <CgProfile size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{emp.email || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{emp.department || emp.role || ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0 ${
                        record.status === 'Present' ? 'bg-green-100 text-green-700' :
                        record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>{record.status}</span>
                      <button
                        onClick={(e) => handleViewEmployee(e, emp)}
                        className="p-1.5 rounded-lg bg-[#2C5284]/10 text-[#2C5284] hover:bg-[#2C5284] hover:text-white transition-all"
                        title="View history"
                      >
                        <FaEye size={12} />
                      </button>
                    </div>
                  </div>
                  <div
                    onClick={() => handleRowClick(record)}
                    className="p-4 grid grid-cols-2 gap-3 cursor-pointer"
                  >
                    <div><p className="text-[10px] text-gray-400 uppercase font-bold">Date</p><p className="text-sm text-gray-700">{record.date}</p></div>
                    <div><p className="text-[10px] text-gray-400 uppercase font-bold">Total Hours</p><p className="text-sm font-semibold text-[#2C5284]">{record.totalWorkHours || '------'}</p></div>
                    <div><p className="text-[10px] text-gray-400 uppercase font-bold">First In</p><p className="text-sm text-gray-700">{getFirstIn(record.sessions)}</p></div>
                    <div><p className="text-[10px] text-gray-400 uppercase font-bold">Sessions</p><p className="text-sm text-gray-700">{getSessionCount(record.sessions)}</p></div>
                  </div>
                </div>
              )
            })}
            {paginatedRecords.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">No records found.</div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Showing {paginatedRecords.length} of {filteredRecords.length} entries</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
                  className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"><FaChevronLeft size={14} /></button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === i + 1 ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}>{i + 1}</button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
                  className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"><FaChevronRight size={14} /></button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Single Record Detail Modal */}
      {showDetailModal && selectedRecord && (
        <AttendanceDetailModal
          record={selectedRecord}
          onClose={() => { setShowDetailModal(false); setSelectedRecord(null) }}
        />
      )}

      {/* Employee Full History Modal */}
      {historyEmployee && (
        <EmployeeHistoryModal
          employee={historyEmployee}
          onClose={() => setHistoryEmployee(null)}
        />
      )}

      {/* Mark Attendance Modal */}
      {showMarkModal && (
        <MarkAttendanceModal
          employees={employees}
          onClose={() => setShowMarkModal(false)}
          onSuccess={handleMarkSuccess}
        />
      )}
    </div>
  )
}

export default AdminAttendance