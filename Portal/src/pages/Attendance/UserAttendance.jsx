


// import { useEffect, useState, useCallback } from 'react'
// import { CgProfile } from 'react-icons/cg'
// import { FaTimes, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { AiOutlineClockCircle } from 'react-icons/ai'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import { RxCrossCircled } from 'react-icons/rx'
// import { CalendarDays } from 'lucide-react'
// import { apiGetMyAttendance, apiGetTodayStatus } from '../../api/attendanceAPI'

// // ── Circular Progress ─────────────────────────────────────────────────────────
// function CircularProgress({ workHours }) {
//   if (!workHours) return (
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
//         <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8"
//           strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round" fill="transparent" className="text-[#2C5284]" />
//       </svg>
//       <div className="absolute flex flex-col items-center">
//         <span className="text-lg font-bold text-gray-800">{workHours}</span>
//         <span className="text-xs text-gray-500">Work Hours</span>
//       </div>
//     </div>
//   )
// }

// // ── Detail Modal ──────────────────────────────────────────────────────────────
// function AttendanceDetailModal({ record, onClose }) {
//   const isPresent = record.status === 'Present'
//   const isLeave   = record.status === 'Leave'

//   const dateObj      = new Date(record.date + 'T00:00:00')
//   const dayName      = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
//   const formattedDate = record.date.split('-').reverse().join('-')

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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

//         {/* Main Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2">

//           {/* Left */}
//           <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100">
//             <div className="mb-4">
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock In</p>
//               <p className="text-2xl font-bold text-gray-900">{record.checkIn || '------'}</p>
//             </div>
//             <div className="my-4">
//               <CircularProgress workHours={record.workHours} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Clock Out</p>
//               <p className="text-base font-semibold text-gray-700">
//                 {record.checkOut || '-- : -- (Did not clock out)'}
//               </p>
//             </div>
//           </div>

//           {/* Right - Activity */}
//           <div className="p-5">
//             <h4 className="text-base font-bold text-gray-900 mb-4">Activity</h4>

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
//                   {isLeave   && <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">On Leave</span>}
//                   {!isPresent && !isLeave && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">Absent</span>}
//                 </div>
//                 {isPresent ? (
//                   <>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <AiOutlineClockCircle size={12} /> {formattedDate} {record.checkIn}
//                     </p>
//                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                       <FaMapMarkerAlt size={10} /> Office
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-xs text-gray-400 italic">
//                     {isLeave ? 'On approved leave' : 'Did not clock in'}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <div className="mt-0.5">
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPresent && record.checkOut ? 'border-gray-400' : 'border-gray-200'}`}>
//                   {isPresent && record.checkOut && <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />}
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-900 text-sm mb-1">Clock Out</p>
//                 {isPresent && record.checkOut ? (
//                   <>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <AiOutlineClockCircle size={12} /> {formattedDate} {record.checkOut}
//                     </p>
//                     <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                       <FaMapMarkerAlt size={10} /> Office
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-xs text-gray-400 italic">Did not clock out</p>
//                 )}
//               </div>
//             </div>

//             <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">Status</span>
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                   record.status === 'Leave'   ? 'bg-yellow-100 text-yellow-800' :
//                   'bg-red-100 text-red-800'
//                 }`}>{record.status}</span>
//               </div>
//               {record.workHours && (
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

// // ── Main Component ────────────────────────────────────────────────────────────
// function UserAttendance({ setTitle }) {
//   const [records, setRecords]           = useState([])
//   const [selectedRecord, setSelectedRecord] = useState(null)
//   const [showModal, setShowModal]       = useState(false)
//   const [currentPage, setCurrentPage]  = useState(1)
//   const [selectedDate, setSelectedDate] = useState('')
//   const [loading, setLoading]           = useState(true)
//   const [error, setError]               = useState('')
//   const itemsPerPage = 8

//   const fetchRecords = useCallback(async () => {
//     setLoading(true)
//     setError('')
//     try {
//       const filters = {}
//       if (selectedDate) filters.date = selectedDate
//       const data = await apiGetMyAttendance(filters)
//       setRecords(data.records || [])
//     } catch {
//       setError('Failed to load attendance records.')
//     } finally {
//       setLoading(false)
//     }
//   }, [selectedDate])

//   useEffect(() => {
//     setTitle('My Attendance')
//   }, [setTitle])

//   useEffect(() => {
//     fetchRecords()
//     setCurrentPage(1)
//   }, [fetchRecords])

//   // Summary from all records (not filtered)
//   const [allRecords, setAllRecords] = useState([])
//   useEffect(() => {
//     apiGetMyAttendance({}).then(data => setAllRecords(data.records || [])).catch(() => {})
//   }, [])

//   const summary = {
//     present: allRecords.filter(r => r.status === 'Present').length,
//     absent:  allRecords.filter(r => r.status === 'Absent').length,
//     leave:   allRecords.filter(r => r.status === 'Leave').length,
//   }

//   const totalPages      = Math.ceil(records.length / itemsPerPage)
//   const paginatedRecords = records.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   const getStatusColor = (status) => {
//     if (status === 'Present') return 'bg-green-100 text-green-800'
//     if (status === 'Absent')  return 'bg-red-100 text-red-800'
//     return 'bg-yellow-100 text-yellow-800'
//   }

//   return (
//     <div className="min-h-screen p-5 sm:p-6 lg:p-8 bg-gray-50/50">
//       <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">My Attendance</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-28">
//           <div>
//             <p className="text-sm text-[#2C5284]">Present Days</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.present}</h1>
//             <p className="text-xs text-gray-400 mt-1">This period</p>
//           </div>
//           <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
//             <FaRegCheckCircle size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-28">
//           <div>
//             <p className="text-sm text-[#2C5284]">Absent Days</p>
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.absent}</h1>
//             <p className="text-xs text-gray-400 mt-1">This period</p>
//           </div>
//           <div className="bg-[#365F8D] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
//             <RxCrossCircled size={24} className="text-white" />
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition duration-300 min-h-28">
//           <div>
//             <p className="text-sm text-[#2C5284]">Leave Days</p>
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
//               className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
//             />
//           </div>
//           {selectedDate && (
//             <button
//               onClick={() => { setSelectedDate(''); setCurrentPage(1) }}
//               className="px-4 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
//             >
//               <FaTimes size={12} /> Clear
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-4 border border-red-200">
//           {error}
//         </div>
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
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock In</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Clock Out</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedRecords.map((record) => (
//                   <tr
//                     key={record._id}
//                     onClick={() => { setSelectedRecord(record); setShowModal(true) }}
//                     className="hover:bg-blue-50 cursor-pointer transition-colors"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{record.date}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkIn || '------'}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.checkOut || '------'}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.workHours || '------'}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
//                         {record.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//                 {paginatedRecords.length === 0 && (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic">No records found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-3">
//             {paginatedRecords.map((record) => (
//               <div
//                 key={record._id}
//                 onClick={() => { setSelectedRecord(record); setShowModal(true) }}
//                 className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer active:scale-[0.98] transition-all"
//               >
//                 <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
//                   <span className="font-semibold text-gray-900 text-sm">{record.date}</span>
//                   <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
//                     {record.status}
//                   </span>
//                 </div>
//                 <div className="p-4 grid grid-cols-3 gap-3">
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Clock In</p>
//                     <p className="text-sm text-gray-900 font-medium">{record.checkIn || '------'}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Clock Out</p>
//                     <p className="text-sm text-gray-900 font-medium">{record.checkOut || '------'}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Work Hrs</p>
//                     <p className="text-sm text-gray-900 font-medium">{record.workHours || '------'}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {paginatedRecords.length === 0 && (
//               <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
//                 No records found.
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//               <p className="text-sm text-gray-600">
//                 Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
//                 <span className="font-semibold">{Math.min(currentPage * itemsPerPage, records.length)}</span> of{' '}
//                 <span className="font-semibold">{records.length}</span> records
//               </p>
//               <div className="flex items-center gap-2">
//                 <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors">
//                   <FaChevronLeft size={14} className="text-gray-600" />
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
//                   className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors">
//                   <FaChevronRight size={14} className="text-gray-600" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Detail Modal */}
//       {showModal && selectedRecord && (
//         <AttendanceDetailModal
//           record={selectedRecord}
//           onClose={() => { setShowModal(false); setSelectedRecord(null) }}
//         />
//       )}
//     </div>
//   )
// }

// export default UserAttendance




import { useEffect, useState, useCallback } from 'react'
import { FaTimes, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaSun, FaMoon } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaRegCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from 'react-icons/rx'
import { CalendarDays } from 'lucide-react'
import { apiGetMyAttendance } from '../../api/attendanceAPI'
import Loader from '../../components/common/Loader'

// ── Helpers ───────────────────────────────────────────────────────────────────
function getFirstCheckIn(sessions = []) {
  return sessions[0]?.checkIn || null
}

function getLastCheckOut(sessions = []) {
  return [...sessions].reverse().find(s => s.checkOut)?.checkOut || null
}

function getShiftIcon(shift) {
  if (shift === 'Morning') return <FaSun size={11} className="text-amber-500" />
  if (shift === 'Evening') return <FaMoon size={11} className="text-indigo-500" />
  return null
}

function getShiftLabel(shift) {
  if (shift === 'Morning') return 'Morning (9 AM–6 PM)'
  if (shift === 'Evening') return 'Evening (6 PM–3 AM)'
  return shift || '—'
}

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
        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-white/10" />
        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8"
          strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" fill="transparent" className="text-[#2C5284] dark:text-[#365f8d]" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold text-gray-800 dark:text-gray-100">{workHours}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">Work Hours</span>
      </div>
    </div>
  )
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function AttendanceDetailModal({ record, onClose }) {
  const sessions = record.sessions || []
  const firstCheckIn = getFirstCheckIn(sessions)
  const lastCheckOut = getLastCheckOut(sessions)
  const totalHours = record.totalWorkHours || null

  const dateObj = new Date(record.date + 'T00:00:00')
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
  const formattedDate = record.date.split('-').reverse().join('-')

  const isPresent = record.status === 'Present'
  const isLeave = record.status === 'Leave'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#292c35] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border dark:border-white/5">

        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-white">Attendance Details</h2>
            <p className="text-blue-100 text-sm">{formattedDate} ({dayName})</p>
          </div>
          <div className="flex items-center gap-3">
            {record.shift && (
              <span className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {getShiftIcon(record.shift)}
                {getShiftLabel(record.shift)}
              </span>
            )}
            <button onClick={onClose} className="text-white hover:bg-white/10 rounded-full p-2 transition-colors">
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5">

          {/* Status + Work Hours row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-5">

            {/* Left: circular progress */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <CircularProgress workHours={totalHours} />
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
                record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>{record.status}</span>
            </div>

            {/* Right: first in / last out / total */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold mb-1">First Clock In</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{firstCheckIn || '--:--'}</p>
                {firstCheckIn && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt size={10} /> Office
                  </p>
                )}
              </div>
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold mb-1">Last Clock Out</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {lastCheckOut || (isPresent ? <span className="text-green-500 text-base italic">Ongoing</span> : '--:--')}
                </p>
                {lastCheckOut && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt size={10} /> Office
                  </p>
                )}
              </div>
              {totalHours && (
                <div className="sm:col-span-2 bg-[#2C5284] rounded-xl p-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Total Work Hours</p>
                  <p className="text-xl font-bold text-white">{totalHours}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sessions timeline */}
          {sessions.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                Sessions ({sessions.length})
              </h4>
              <div className="space-y-2">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3 text-sm">
                    <div className="w-7 h-7 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <AiOutlineClockCircle size={13} className="text-[#2C5284] dark:text-[#365f8d] flex-shrink-0" />
                      <span className="font-semibold text-[#2C5284] dark:text-[#365f8d]">{s.checkIn}</span>
                      <span className="text-gray-400">→</span>
                      {s.checkOut
                        ? <span className="font-semibold text-gray-700 dark:text-gray-200">{s.checkOut}</span>
                        : <span className="text-green-500 italic text-xs font-semibold">Ongoing</span>
                      }
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-semibold text-xs flex-shrink-0 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-lg">
                      {s.workHours || '...'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Absent / Leave note */}
          {!isPresent && (
            <div className={`mt-4 p-4 rounded-xl ${isLeave ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`text-sm font-medium ${isLeave ? 'text-yellow-700' : 'text-red-700'}`}>
                {isLeave ? '📅 On approved leave this day.' : '❌ No attendance recorded for this day.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
function UserAttendance({ setTitle }) {
  const [records, setRecords] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
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

  // Summary from all records (unfiltered)
  const [allRecords, setAllRecords] = useState([])
  useEffect(() => {
    apiGetMyAttendance({}).then(data => setAllRecords(data.records || [])).catch(() => { })
  }, [])

  const summary = {
    present: allRecords.filter(r => r.status === 'Present').length,
    absent: allRecords.filter(r => r.status === 'Absent').length,
    leave: allRecords.filter(r => r.status === 'Leave').length,
  }

  const totalPages = Math.ceil(records.length / itemsPerPage)
  const paginatedRecords = records.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status) => {
    if (status === 'Present') return 'bg-green-100 text-green-800'
    if (status === 'Absent') return 'bg-red-100 text-red-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="min-h-screen p-5 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] dark:text-blue-300 mb-6">My Attendance</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-white/5 p-5 flex items-center justify-between shadow hover:shadow-xl transition-all duration-300 min-h-[110px] sm:min-h-28 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D]">
          <div>
            <p className="text-xs sm:text-sm text-[#2C5284] dark:text-gray-300">Present Days</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D] dark:text-gray-100">{summary.present}</h1>
            <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1">This period</p>
          </div>
          <div className="bg-[#365F8D] dark:bg-[#2C5282] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <FaRegCheckCircle size={24} className="text-white" />
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 p-5 flex items-center justify-between shadow hover:shadow-xl transition-all duration-300 min-h-[110px] sm:min-h-28 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D]">
          <div>
            <p className="text-xs sm:text-sm text-[#2C5284] dark:text-gray-300">Absent Days</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D] dark:text-gray-100">{summary.absent}</h1>
            <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1">This period</p>
          </div>
          <div className="bg-[#2C5284] dark:bg-[#2C5282] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <RxCrossCircled size={24} className="text-white" />
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 p-5 flex items-center justify-between shadow hover:shadow-xl transition-all duration-300 min-h-[110px] sm:min-h-28 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D]">
          <div>
            <p className="text-xs sm:text-sm text-[#2C5284] dark:text-gray-300">Leave Days</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D] dark:text-gray-100">{summary.leave}</h1>
            <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1">This period</p>
          </div>
          <div className="bg-[#2C5284] dark:bg-[#2C5282] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <CalendarDays size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Date Filter */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-1 relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1) }}
                className="flex-1 pl-10 pr-4 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5284] dark:text-blue-300">
                <CalendarDays size={18} />
              </div>
            </div>
          {selectedDate && (
            <button
              onClick={() => { setSelectedDate(''); setCurrentPage(1) }}
              className="px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-1"
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

      {loading ? (
        <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-12 text-center text-gray-500 flex flex-col items-center justify-center border border-gray-100 dark:border-white/5">
          <Loader size="medium" />
          <p className="mt-4 text-xs font-bold uppercase tracking-widest">Loading attendance records...</p>
        </div>
      ) : (
        <>
          {/* ── Desktop Table ── */}
          <div className="hidden lg:block bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
              <thead className="bg-[#2C5294] dark:bg-white/10">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Date</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Shift</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">First Clock In</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Last Clock Out</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Sessions</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Total Hours</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-white/5">
                {paginatedRecords.map((record) => {
                  const sessions = record.sessions || []
                  const firstCheckIn = getFirstCheckIn(sessions)
                  const lastCheckOut = getLastCheckOut(sessions)
                  const openSession = sessions.find(s => s.checkIn && !s.checkOut)

                  return (
                    <tr
                      key={record._id}
                      onClick={() => { setSelectedRecord(record); setShowModal(true) }}
                      className="hover:bg-blue-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      {/* Date */}
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {record.date}
                      </td>

                      {/* Shift */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {record.shift ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${record.shift === 'Morning'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-indigo-100 text-indigo-700'
                            }`}>
                            {getShiftIcon(record.shift)}
                            {record.shift}
                          </span>
                        ) : (
                          <span className="text-gray-300 dark:text-gray-600 text-sm">—</span>
                        )}
                      </td>

                      {/* First Clock In */}
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {firstCheckIn || <span className="text-gray-400 dark:text-gray-600">--:--</span>}
                      </td>

                      {/* Last Clock Out */}
                      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {lastCheckOut || (
                          record.status === 'Present' && openSession ? (
                            <span className="text-green-500 italic">Ongoing</span>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-600">--:--</span>
                          )
                        )}
                      </td>

                      {/* Sessions */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-blue-50 dark:bg-white/5 text-blue-700 dark:text-blue-300 rounded-full text-[10px] font-bold uppercase">
                          {sessions.length} Session{sessions.length !== 1 ? 's' : ''}
                        </span>
                      </td>

                      {/* Total Hours */}
                      <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-[#2C5284] dark:text-blue-300">
                        {record.totalWorkHours || <span className="text-gray-400 font-normal">--:--</span>}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
                {paginatedRecords.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-400 italic">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Cards ── */}
          <div className="lg:hidden space-y-3">
            {paginatedRecords.map((record) => {
              const sessions = record.sessions || []
              const firstCheckIn = getFirstCheckIn(sessions)
              const lastCheckOut = getLastCheckOut(sessions)
              const openSession = sessions.find(s => s.checkIn && !s.checkOut)

              return (
                <div
                  key={record._id}
                  onClick={() => { setSelectedRecord(record); setShowModal(true) }}
                  className="bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/10 cursor-pointer active:scale-[0.98] transition-all"
                >
                  {/* Card header */}
                  <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/10">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{record.date}</span>
                      {record.shift && (
                        <span className={`ml-2 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${record.shift === 'Morning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                          }`}>
                          {getShiftIcon(record.shift)} {record.shift}
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">First Clock In</p>
                      <p className="text-sm text-[#2C5284] dark:text-blue-300 font-semibold">{firstCheckIn || '——'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Last Clock Out</p>
                      {lastCheckOut ? (
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">{lastCheckOut}</p>
                      ) : openSession ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Ongoing
                        </span>
                      ) : (
                        <p className="text-sm text-gray-300">——</p>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Sessions</p>
                      <p className="text-sm text-gray-700 font-medium">{sessions.length || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Total Hours</p>
                      {record.totalWorkHours ? (
                        <p className="text-sm font-bold text-[#2C5284] dark:text-blue-300">{record.totalWorkHours}</p>
                      ) : openSession ? (
                        <p className="text-xs text-gray-400 italic">In progress...</p>
                      ) : (
                        <p className="text-sm text-gray-300">——</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            {paginatedRecords.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
                No records found.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
              <p className="text-sm text-gray-600 dark:text-gray-400">
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
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
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