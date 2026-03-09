





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
import Loader from '../../components/common/Loader'

// ── React Select custom styles ────────────────────────────────────────────────
const selectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'transparent',
    borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(44,82,132,0.2)' : 'none',
    borderRadius: '0.5rem',
    minHeight: '42px',
    '&:hover': { borderColor: '#2C5284' },
  }),
  singleValue: (base) => ({
    ...base,
    color: 'inherit',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(255,255,255,0.05)' : 'transparent',
    color: state.isSelected ? 'white' : 'inherit',
    cursor: 'pointer',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#292c35',
    border: '1px solid rgba(255,255,255,0.1)',
  }),
  placeholder: (base) => ({ ...base, color: '#9ca3af' }),
}

const statusOptions = [
  { value: 'Present', label: 'Present' },
  { value: 'Absent', label: 'Absent' },
  { value: 'Leave', label: 'Leave' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function getTodayYMD() {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
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
  const parts = workHours.split('h')
  const hours = parseInt(parts[0].trim()) || 0
  const minutes = parts[1] ? parseInt(parts[1].trim()) || 0 : 0
  const total = hours * 60 + minutes
  const pct = Math.min((total / 540) * 100, 100)
  const DA = 2 * Math.PI * 54
  const DO = DA - (DA * pct) / 100
  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-28 h-28 -rotate-90">
        <circle cx="56" cy="56" r="54" stroke="#e5e7eb" strokeWidth="8" fill="transparent" className="opacity-10" />
        <circle cx="56" cy="56" r="54" stroke="#2C5284" strokeWidth="8"
          strokeDasharray={DA} strokeDashoffset={DO}
          strokeLinecap="round" fill="transparent" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-base font-bold text-gray-800 dark:text-gray-100">{workHours}</span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">Total Hrs</span>
      </div>
    </div>
  )
}

// ── Employee History Modal ────────────────────────────────────────────────────
function EmployeeHistoryModal({ employee, onClose }) {
  const today = getTodayYMD()
  const [year, setYear] = useState(parseInt(today.yyyy))
  const [month, setMonth] = useState(parseInt(today.mm) - 1) // 0-indexed
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
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
  const daysInMonth = new Date(year, month + 1, 0).getDate()
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
    absent: records.filter(r => r.status === 'Absent').length,
    leave: records.filter(r => r.status === 'Leave').length,
  }

  const emp = employee

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white dark:bg-[#292c35] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto border dark:border-white/5">

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
                className="p-2 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <FaChevronLeft size={13} className="text-gray-600 dark:text-gray-400" />
              </button>
              <div className="text-center">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">{MONTHS[month]} {year}</h3>
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
                className="p-2 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <FaChevronRight size={13} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">{d}</div>
              ))}
            </div>

            {/* Calendar cells */}
            {loading ? (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                <Loader size="small" />
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for first week offset */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                  const rec = recordMap[dateStr]
                  const isToday = dateStr === today.full
                  const isSel = selectedDay === day
                  const status = rec?.status

                  let bg = 'bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10'
                  let dot = null
                  if (status === 'Present') { bg = 'bg-green-50 dark:bg-green-500/10 hover:bg-green-100'; dot = 'bg-green-500' }
                  if (status === 'Absent') { bg = 'bg-red-50 dark:bg-red-500/10 hover:bg-red-100'; dot = 'bg-red-400' }
                  if (status === 'Leave') { bg = 'bg-yellow-50 dark:bg-yellow-500/10 hover:bg-yellow-100'; dot = 'bg-yellow-400' }

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`
                        relative flex flex-col items-center justify-center aspect-square rounded-lg text-sm font-medium transition-all
                        ${bg}
                        ${isToday ? 'ring-2 ring-[#2C5284] ring-offset-1 dark:ring-offset-[#292c35]' : ''}
                        ${isSel ? '!bg-[#2C5284] !text-white shadow-md scale-105' : 'text-gray-700 dark:text-gray-300'}
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
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 border-t dark:border-white/10 pt-3">
              <span className="font-medium text-gray-600 dark:text-gray-300">Legend:</span>
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
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base">
                    {MONTHS[month]} {selectedDay}, {year}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${selectedRecord.status === 'Present' ? 'bg-green-100 text-green-700' :
                    selectedRecord.status === 'Leave' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                    {selectedRecord.status}
                  </span>
                </div>

                {/* Circular + times */}
                <div className="flex items-center gap-6 mb-5 p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
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
                  className="mt-4 text-xs text-[#2C5284] dark:text-blue-300 hover:underline"
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
                  <div className="py-8 text-center text-gray-400 text-sm">
                    <Loader size="small" />
                  </div>
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
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${r.status === 'Present' ? 'bg-green-500' :
                            r.status === 'Leave' ? 'bg-yellow-400' : 'bg-red-400'
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
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${r.status === 'Present' ? 'bg-green-100 text-green-700' :
                            r.status === 'Leave' ? 'bg-yellow-100 text-yellow-700' :
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
  const emp = record.employeeId || {}
  const sessions = record.sessions || []
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-[#292c35] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border dark:border-white/5">
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
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-[#2C5284] dark:bg-gray-800 flex items-center justify-center text-white flex-shrink-0">
              <CgProfile size={32} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 truncate">{emp.email || 'Unknown'}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{emp.department || emp.role || 'Employee'}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex-shrink-0 ${record.status === 'Present' ? 'bg-green-100 text-green-700' :
              record.status === 'Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>{record.status}</span>
          </div>
          {sessions.length > 0 ? (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Sessions ({sessions.length})</h4>
              <div className="space-y-2">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-white/5 rounded-lg px-4 py-3 text-sm">
                    <span className="text-gray-500 dark:text-gray-400 font-medium w-20 flex-shrink-0">Session {i + 1}</span>
                    <div className="flex items-center gap-2 text-[#365F8D] dark:text-blue-300 font-semibold flex-1 justify-center">
                      <AiOutlineClockCircle size={14} />
                      <span>{s.checkIn}</span>
                      <span className="text-gray-400">→</span>
                      {s.checkOut ? <span>{s.checkOut}</span> : <span className="text-green-600 italic">ongoing</span>}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium w-16 text-right flex-shrink-0">{s.workHours || '...'}</span>
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
        <div className="p-4 bg-gray-50 dark:bg-white/5 flex justify-end rounded-b-2xl">
          <button onClick={onClose} className="px-6 py-2 bg-[#2C5284] text-white rounded-lg font-semibold hover:bg-[#1e3a5f] transition-colors">Close</button>
        </div>
      </div>
    </div>
  )
}

// ── Mark Attendance Modal ─────────────────────────────────────────────────────
function MarkAttendanceModal({ employees, onClose, onSuccess }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedDate, setSelectedDate] = useState(() => getTodayYMD().full)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const employeeOptions = employees.map(emp => ({
    value: emp._id,
    label: emp.email,
    sub: emp.department || emp.role || 'Employee',
  }))

  const handleSubmit = async () => {
    if (!selectedEmployee) return setError('Please select an employee.')
    if (!selectedStatus) return setError('Please select a status.')
    if (!selectedDate) return setError('Please select a date.')
    setLoading(true); setError(''); setSuccess('')
    try {
      const payload = { employeeId: selectedEmployee.value, date: selectedDate, status: selectedStatus.value }
      if (checkIn) payload.checkIn = checkIn
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
      <div className="bg-white dark:bg-[#292c35] rounded-2xl shadow-2xl w-full max-w-md border dark:border-white/5">
        <div className="bg-[#2C5284] p-5 text-white flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold">Mark Attendance</h2>
            <p className="text-blue-100 text-sm">Manually set attendance for an employee</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><FaTimes size={20} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Employee <span className="text-red-500">*</span></label>
            <Select options={employeeOptions} value={selectedEmployee} onChange={setSelectedEmployee}
              styles={selectStyles} placeholder="Search and select employee..."
              formatOptionLabel={(opt) => (
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{opt.label}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{opt.sub}</div>
                </div>
              )} isSearchable />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Date <span className="text-red-500">*</span></label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Status <span className="text-red-500">*</span></label>
            <Select options={statusOptions} value={selectedStatus} onChange={setSelectedStatus}
              styles={selectStyles} placeholder="Select status..." isSearchable={false} />
          </div>
          {selectedStatus?.value === 'Present' && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 dark:bg-white/5 rounded-xl border border-blue-100 dark:border-white/10">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Check-in <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Check-out <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
              </div>
              <p className="col-span-2 text-xs text-blue-600 dark:text-blue-400">💡 Leave empty to just mark as Present.</p>
            </div>
          )}
          {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-200">{error}</div>}
          {success && <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-200">{success}</div>}
        </div>
        <div className="p-5 bg-gray-50 dark:bg-white/5 flex items-center justify-between gap-3 rounded-b-2xl border-t border-gray-100 dark:border-white/10">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2C5284] text-white text-sm font-semibold rounded-lg hover:bg-[#1e3a5f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? (
              <><Loader size="small" className="!p-0 border-white/30 border-t-white" />Saving...</>
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
  const [records, setRecords] = useState([])
  const [employees, setEmployees] = useState([])
  const [todayStats, setTodayStats] = useState({ totalEmployees: 0, present: 0, absent: 0, onLeave: 0 })
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showMarkModal, setShowMarkModal] = useState(false)
  const [historyEmployee, setHistoryEmployee] = useState(null) // for EmployeeHistoryModal
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
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
    const emp = r.employeeId || {}
    const text = `${emp.email || ''} ${emp.department || ''}`.toLowerCase()
    return text.includes(searchTerm.toLowerCase())
  })

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getFirstIn = (sessions = []) => sessions[0]?.checkIn || '------'
  const getLastOut = (sessions = []) => [...sessions].reverse().find(s => s.checkOut)?.checkOut || '------'
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-[#292c35]">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300">Attendance Management</h1>
        <button
          onClick={() => setShowMarkModal(true)}
          className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white text-sm font-semibold rounded-xl shadow hover:bg-[#1e3a5f] transition-all hover:shadow-md active:scale-[0.97]"
        >
          <FaPlus size={12} />
          Mark Attendance
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Employees', value: todayStats.totalEmployees, icon: <CgProfile size={20} className="text-white" /> },
          { label: 'Today Present', value: todayStats.present, icon: <FaRegCheckCircle size={20} className="text-white" /> },
          { label: 'Today Absent', value: todayStats.absent, icon: <RxCrossCircled size={20} className="text-white" /> },
          { label: 'Today Leave', value: todayStats.onLeave, icon: <CalendarDays size={20} className="text-white" /> },
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition duration-300">
            <div>
              <p className="text-xs text-[#2C5284] dark:text-gray-300">{card.label}</p>
              <h1 className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-blue-300">{card.value}</h1>
            </div>
            <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <input type="text" placeholder="Search by email or department..."
              value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-xs" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5284]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="date" value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setCurrentPage(1) }}
              className="px-4 py-2.5 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm" />
            {selectedDate && (
              <button onClick={() => { setSelectedDate(''); setCurrentPage(1) }}
                className="px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-1">
                <FaTimes size={12} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-4 border border-red-200">{error}</div>}

      {loading ? (
        <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-12 text-center text-gray-500 flex flex-col items-center justify-center border border-gray-100 dark:border-white/5">
          <Loader size="medium" />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
              <thead className="bg-[#2C5294] dark:bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">First In</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Last Out</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Sessions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Total Hours</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">History</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-white/5">
                {paginatedRecords.map((record) => {
                  const emp = record.employeeId || {}
                  return (
                    <tr key={record._id} onClick={() => handleRowClick(record)}
                      className="hover:bg-blue-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#2C5284] dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                            <CgProfile size={18} className="text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{emp.email || 'Unknown'}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{emp.department || emp.role || ''}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{getFirstIn(record.sessions)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{getLastOut(record.sessions)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-50 dark:bg-white/5 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                          {getSessionCount(record.sessions)} session{getSessionCount(record.sessions) !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#2C5284] dark:text-blue-300">
                        {record.totalWorkHours || '------'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
                          record.status === 'Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>{record.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => handleViewEmployee(e, emp)}
                          title="View full attendance history"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2C5284]/10 dark:bg-white/5 hover:bg-[#2C5284] text-[#2C5284] dark:text-blue-300 hover:text-white rounded-lg text-xs font-semibold transition-all group"
                        >
                          <FaEye size={12} />
                          <span>History</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {paginatedRecords.length === 0 && (
                  <tr><td colSpan={8} className="px-6 py-10 text-center text-gray-500">No records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {paginatedRecords.map((record) => {
              const emp = record.employeeId || {}
              return (
                <div key={record._id} className="bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/10">
                  <div
                    onClick={() => handleRowClick(record)}
                    className="p-4 flex items-center gap-3 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 cursor-pointer active:bg-blue-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2C5284] dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <CgProfile size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{emp.email || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{emp.department || emp.role || ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0 ${record.status === 'Present' ? 'bg-green-100 text-green-700' :
                        record.status === 'Leave' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
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
                    className="p-4 grid grid-cols-2 gap-3 cursor-pointer bg-white dark:bg-white/5"
                  >
                    <div><p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold">Date</p><p className="text-sm text-gray-700 dark:text-gray-300">{record.date}</p></div>
                    <div><p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold">Total Hours</p><p className="text-sm font-semibold text-[#2C5284] dark:text-blue-300">{record.totalWorkHours || '------'}</p></div>
                    <div><p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold">First In</p><p className="text-sm text-gray-700 dark:text-gray-300">{getFirstIn(record.sessions)}</p></div>
                    <div><p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold">Sessions</p><p className="text-sm text-gray-700 dark:text-gray-300">{getSessionCount(record.sessions)}</p></div>
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
            <div className="mt-8 flex items-center justify-between bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
              <p className="text-sm text-gray-600">Showing {paginatedRecords.length} of {filteredRecords.length} entries</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
                  className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"><FaChevronLeft size={14} className="text-gray-600 dark:text-gray-400" /></button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-[#2C5284] text-white' : 'text-gray-600 hover:bg-gray-50 border border-gray-200 dark:text-gray-300 dark:border-white/10 dark:hover:bg-white/5'
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