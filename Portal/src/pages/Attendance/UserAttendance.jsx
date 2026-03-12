/**
 * Component: UserAttendance
 * Description: A personal attendance tracking page for employees to view their check-in/check-out history.
 * Why: To provide employees with transparency regarding their work hours, shifts, and attendance status.
 */
import { useEffect, useState, useCallback } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight, FaSun, FaMoon } from 'react-icons/fa'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaRegCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from 'react-icons/rx'
import { CalendarDays } from 'lucide-react'
import { apiGetMyAttendance } from '../../api/attendanceAPI'
import Loader from '../../components/common/Loader'
import TableSkeleton from '../../components/common/TableSkeleton'
import Skeleton from '../../components/common/Skeleton'

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

// ── Circular Progress ─────────────────────────────────────────────────────────
function CircularProgress({ workHours = "0h 0m" }) {
  const parts = workHours?.split('h') || ["0", "0"];
  const hours = parseInt(parts[0]) || 0;
  const minutes = parts[1] ? parseInt(parts[1]) || 0 : 0;
  const totalMinutes = hours * 60 + minutes;

  // Progress logic: 9 hours (540m) as 100%
  const pct = Math.min((totalMinutes / 540) * 100, 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-32 h-32 -rotate-90">
        <circle cx="64" cy="64" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="transparent" className="opacity-40" />
        <circle
          cx="64" cy="64" r={radius} stroke="#2C5284" strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" fill="transparent" className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-black text-gray-800 dark:text-gray-100">{workHours}</span>
        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">Total Hrs</span>
      </div>
    </div>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function AttendanceDetailModal({ record, onClose }) {
  const sessions = record.sessions || []
  const firstCheckIn = getFirstCheckIn(sessions)
  const lastCheckOut = getLastCheckOut(sessions)
  const isPresent = record.status === 'Present'
  const isLeave = record.status === 'Leave'
  const dateObj = new Date(record.date + 'T00:00:00')
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
  const formattedDate = record.date.split('-').reverse().join('-')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#292c35] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto dark:border-white/5">

        <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-white">Attendance Details</h2>
            <p className="text-blue-100 text-sm">{formattedDate} ({dayName})</p>
          </div>
          <div className="flex items-center gap-3">
            {record.shift && (
              <span className={`flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                {getShiftIcon(record.shift)}
                {record.shift} Shift
              </span>
            )}
            <button onClick={onClose} className="text-white hover:bg-white/10 rounded-full p-2 transition-colors">
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <CircularProgress workHours={record.totalWorkHours} />
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.status === 'Present' ? 'bg-green-100 text-green-800' : record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {record.status}
              </span>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold mb-1">First Clock In</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{firstCheckIn || '--:--'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold mb-1">Last Clock Out</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {lastCheckOut || (isPresent ? <span className="text-green-500 text-base italic">Ongoing</span> : '--:--')}
                </p>
              </div>
              {record.totalWorkHours && (
                <div className="sm:col-span-2 bg-[#2C5284] rounded-xl p-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Total Work Hours</p>
                  <p className="text-xl font-bold text-white">{record.totalWorkHours}</p>
                </div>
              )}
            </div>
          </div>

          {sessions.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                Sessions ({sessions.length})
              </h4>
              <div className="space-y-2">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3 text-sm">
                    <div className="w-7 h-7 rounded-full bg-[#2C5284] flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <AiOutlineClockCircle size={13} className="text-[#2C5284] dark:text-blue-300 shrink-0" />
                      <span className="font-semibold text-[#2C5284] dark:text-blue-300">{s.checkIn}</span>
                      <span className="text-gray-400">→</span>
                      {s.checkOut
                        ? <span className="font-semibold text-gray-700 dark:text-gray-200">{s.checkOut}</span>
                        : <span className="text-green-500 italic text-xs font-semibold">Ongoing</span>
                      }
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-semibold text-xs shrink-0 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-lg">
                      {s.workHours || '...'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

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

  useEffect(() => { setTitle('My Attendance') }, [setTitle])
  useEffect(() => { fetchRecords(); setCurrentPage(1) }, [fetchRecords])

  const [allRecords, setAllRecords] = useState([])
  useEffect(() => {
    apiGetMyAttendance({}).then(data => setAllRecords(data.records || [])).catch(() => {})
  }, [])

  const summary = {
    present: allRecords.filter(r => r.status === 'Present').length,
    absent:  allRecords.filter(r => r.status === 'Absent').length,
    leave:   allRecords.filter(r => r.status === 'Leave').length,
  }

  const totalPages = Math.ceil(records.length / itemsPerPage)
  const paginatedRecords = records.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status) => {
    if (status === 'Present') return 'bg-green-100 text-green-800'
    if (status === 'Absent')  return 'bg-red-100 text-red-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  const PaginationBar = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100">{Math.min(currentPage * itemsPerPage, records.length)}</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100">{records.length}</span> entries
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}
            className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5 transition-colors">
            <FaChevronLeft size={14} className="text-gray-600 dark:text-gray-400" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200 dark:text-gray-300 dark:border-white/10 dark:hover:bg-white/5'}`}>
              {page}
            </button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}
            className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:border-white/10 transition-colors">
            <FaChevronRight size={14} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300">My Attendance</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {loading
          ? [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-gray-100 dark:border-white/5 flex items-center justify-between shadow transition duration-300">
              <div className="space-y-2 flex-1">
                <Skeleton height="0.6rem" width="40%" />
                <Skeleton height="1.5rem" width="20%" />
              </div>
              <Skeleton variant="circular" width="2.5rem" height="2.5rem" className="shrink-0" />
            </div>
          ))
          : [
            { label: 'Present Days', value: summary.present, icon: <FaRegCheckCircle size={20} className="text-white" /> },
            { label: 'Absent Days',  value: summary.absent,  icon: <RxCrossCircled size={20} className="text-white" /> },
            { label: 'Leave Days',   value: summary.leave,   icon: <CalendarDays size={20} className="text-white" /> },
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition duration-300">
              <div>
                <p className="text-xs text-[#2C5284] dark:text-gray-300">{card.label}</p>
                <h1 className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-blue-300">{card.value}</h1>
              </div>
              <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0">
                {card.icon}
              </div>
            </div>
          ))}
      </div>

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

      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-4 border border-red-200">{error}</div>
      )}

      {loading ? (
        <TableSkeleton rows={8} cols={7} />
      ) : (
        <>
          <div className="hidden lg:block bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
            <table className="w-full divide-y divide-gray-200 dark:divide-white/5 table-fixed">
              <thead className="bg-[#2C5294] dark:bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Shift</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">First Clock In</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Last Clock Out</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Sessions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Total Hours</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Status</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.shift ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${record.shift === 'Morning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                            {getShiftIcon(record.shift)} {record.shift}
                          </span>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-600 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {firstCheckIn || <span className="text-gray-400">--:--</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {lastCheckOut || (record.status === 'Present' && openSession
                          ? <span className="text-green-500 italic">Ongoing</span>
                          : <span className="text-gray-400">--:--</span>)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-blue-50 dark:bg-white/5 text-blue-700 dark:text-blue-300 rounded-full text-[10px] font-bold uppercase">
                          {sessions.length} Session{sessions.length !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#2C5284] dark:text-blue-300">
                        {record.totalWorkHours || <span className="text-gray-400 font-normal">--:--</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
                {paginatedRecords.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400 italic">No records found.</td></tr>
                )}
              </tbody>
            </table>
            <PaginationBar />
          </div>

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
                  <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{record.date}</span>
                      {record.shift && (
                        <span className={`ml-2 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${record.shift === 'Morning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                          {getShiftIcon(record.shift)} {record.shift} Shift
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>{record.status}</span>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-3">
                    <div><p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">First Clock In</p><p className="text-sm text-[#2C5284] dark:text-blue-300 font-semibold">{firstCheckIn || '——'}</p></div>
                    <div><p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Last Clock Out</p>
                      {lastCheckOut ? <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">{lastCheckOut}</p>
                        : openSession ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Ongoing</span>
                        : <p className="text-sm text-gray-300">——</p>}
                    </div>
                    <div><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Sessions</p><p className="text-sm text-gray-700 font-medium">{sessions.length || '—'}</p></div>
                    <div><p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold mb-1">Total Hours</p>
                      {record.totalWorkHours
                        ? <p className="text-sm font-bold text-[#2C5284] dark:text-blue-300">{record.totalWorkHours}</p>
                        : openSession ? <p className="text-xs text-gray-400 italic">In progress...</p>
                        : <p className="text-sm text-gray-300">——</p>}
                    </div>
                  </div>
                </div>
              )
            })}
            {paginatedRecords.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">No records found.</div>
            )}
            <PaginationBar />
          </div>
        </>
      )}

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