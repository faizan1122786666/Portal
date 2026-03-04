


import { useEffect, useState, useCallback } from 'react';
import { FaClock, FaSignInAlt, FaSignOutAlt, FaCalendarAlt, FaChartLine, FaSun, FaMoon, FaStar } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';
import { Line, Doughnut } from 'react-chartjs-2';
import { apiCheckIn, apiCheckOut, apiGetTodayStatus, apiGetMyAttendance } from '../../api/attendanceAPI';

function buildDoughnut(present, absent, leave) {
  return {
    labels: ['Present', 'Absent', 'Leave'],
    datasets: [{
      data: [present, absent, leave],
      backgroundColor: ['rgb(54, 95, 141)', 'rgb(148, 163, 184)', 'rgb(203, 213, 225)'],
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };
}

const weeklyHours = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Work Hours',
    data: [9, 8.5, 9.2, 8.8, 9, 0, 0],
    fill: true,
    borderColor: 'rgb(54, 95, 141)',
    backgroundColor: 'rgba(54, 95, 141, 0.1)',
    tension: 0.4,
    pointBackgroundColor: 'rgb(54, 95, 141)',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 5,
    pointHoverRadius: 7,
  }],
};

// ── Shift Badge (shown in clock card after check-in) ─────────────────
function ShiftBadge({ shift }) {
  if (!shift) return null;
  const isMorning = shift === 'Morning';
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 ${isMorning ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}`}>
      {isMorning ? <FaSun size={11} /> : <FaMoon size={11} />}
      {isMorning ? 'Morning Shift · 9:00 AM – 6:00 PM' : 'Evening Shift · 6:00 PM – 3:00 AM'}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
function UserDashboard({ setTitle, user }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayStatus, setTodayStatus] = useState(null);
  const [summary, setSummary] = useState({ present: 0, absent: 0, leave: 0 });
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');
  const [msgType, setMsgType] = useState('success');

  const displayName = user?.name || '';
  const userShift = user?.shift || '';   // admin-assigned shift (default suggestion)

  useEffect(() => {
    setTitle('Dashboard Page');
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [setTitle]);

  const fetchTodayStatus = useCallback(async () => {
    try {
      const data = await apiGetTodayStatus();
      setTodayStatus(data);
    } catch { console.error('Failed to fetch today status'); }
  }, []);

  const fetchSummary = useCallback(async () => {
    try {
      const currentMonth = format(new Date(), 'yyyy-MM');
      const data = await apiGetMyAttendance({ month: currentMonth });
      if (data.summary) setSummary(data.summary);
    } catch { console.error('Failed to fetch summary'); }
  }, []);

  useEffect(() => {
    fetchTodayStatus();
    fetchSummary();
  }, [fetchTodayStatus, fetchSummary]);

  // ── Called when user clicks "Clock In" button ────────────────────────
  // Clock in directly using the admin-assigned shift (no user choice)
  const handleClockInClick = () => {
    performClockIn(userShift || null);
  };

  const performClockIn = async (shift) => {
    setLoading(true);
    setActionMsg('');
    try {
      const body = shift ? { shift } : {};
      const data = await apiCheckIn(body);
      setActionMsg(data.message || '');
      setMsgType(data.record ? 'success' : 'error');
      await fetchTodayStatus();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Clock in failed.';
      setActionMsg(msg);
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    setLoading(true);
    setActionMsg('');
    try {
      const data = await apiCheckOut();
      setActionMsg(data.message || '');
      setMsgType(data.record ? 'success' : 'error');
      await fetchTodayStatus();
      await fetchSummary();
    } catch {
      setActionMsg('Clock out failed.');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  const canCheckIn = todayStatus?.canCheckIn ?? true;
  const canCheckOut = todayStatus?.canCheckOut ?? false;
  const sessions = todayStatus?.sessions || [];
  const totalHours = todayStatus?.totalWorkHours || null;
  const todayShift = todayStatus?.shift || null;  // shift chosen at first clock-in

  const statusLabel = !todayStatus ? 'Loading...'
    : canCheckOut ? `Checked in at ${todayStatus.currentCheckIn}`
      : sessions.length > 0 ? `Done — Total: ${totalHours || '0h 0m'}`
        : 'Not yet checked in';

  const doughnutData = buildDoughnut(summary.present, summary.absent, summary.leave);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

      {/* ── Welcome Banner ── */}
      {displayName && (
        <div className="bg-white rounded-xl shadow-sm px-5 py-4 mb-5 border-l-4 border-[#2C5284] flex items-center gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#2C5284]">
              Welcome back, {displayName} 👋
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {format(currentTime, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>
      )}

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-3">
        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.present}</p>
              <p className="text-xs text-gray-500">Present Days</p>
            </div>
            <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <FaRegCheckCircle size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.absent}</p>
              <p className="text-xs text-gray-500">Absent Days</p>
            </div>
            <div className="bg-[#2C5284] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <RxCrossCircled size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Leave Days</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{summary.leave}</p>
              <p className="text-xs text-gray-500">This Month</p>
            </div>
            <div className="bg-[#2C5284] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <FaCalendarAlt size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Today</p>
              <p className="text-lg sm:text-xl font-bold text-[#365F8D]">{totalHours || '--'}</p>
              <p className="text-xs text-gray-500">Total Work Hours</p>
            </div>
            <div className="bg-[#2C5284] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <FaClock size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Clock In / Out + Doughnut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center">
            <div className="bg-[#365F8D] w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <FaClock size={32} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2C5284] mb-1">
              {format(currentTime, 'hh:mm:ss a')}
            </h1>
            <p className="text-gray-500 text-sm mb-4">{format(currentTime, 'EEEE, MMMM d, yyyy')}</p>
            <h2 className="text-xl font-bold text-[#2C5284] mb-3">Today's Attendance</h2>

            {/* Today's shift badge (shown after first check-in) */}
            {todayShift && <ShiftBadge shift={todayShift} />}

            <p className="text-base font-semibold mb-4 text-center">
              Status:{' '}
              <span className={canCheckOut ? 'text-green-600' : sessions.length > 0 ? 'text-blue-600' : 'text-gray-500'}>
                {statusLabel}
              </span>
            </p>

            {/* Sessions list */}
            {sessions.length > 0 && (
              <div className="w-full mb-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center mb-2">Today's Sessions</p>
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 text-sm">
                    <span className="text-gray-500 font-medium">Session {i + 1}</span>
                    <span className="text-[#365F8D] font-semibold">
                      {s.checkIn}{s.checkOut ? ` → ${s.checkOut}` : ' → ongoing'}
                    </span>
                    <span className="text-gray-700 font-medium">{s.workHours || '...'}</span>
                  </div>
                ))}
                {totalHours && (
                  <div className="flex items-center justify-between bg-[#2C5284] rounded-lg px-4 py-2 text-sm mt-1">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-white font-bold">{totalHours}</span>
                  </div>
                )}
              </div>
            )}

            {actionMsg && (
              <p className={`text-sm px-4 py-2 rounded-lg mb-4 text-center w-full ${msgType === 'success' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
                }`}>{actionMsg}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={handleClockInClick}
                disabled={!canCheckIn || loading}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-medium text-base transition w-full sm:w-48
                  ${!canCheckIn || loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#365F8D] text-white hover:bg-[#2C5284]'}`}
              >
                <FaSignInAlt size={20} />{loading ? 'Wait...' : 'Clock In'}
              </button>
              <button
                onClick={handleClockOut}
                disabled={!canCheckOut || loading}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-medium text-base transition w-full sm:w-48
                  ${!canCheckOut || loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                <FaSignOutAlt size={20} />{loading ? 'Wait...' : 'Clock Out'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-[#2C5284] mb-4 flex items-center gap-2">
            <FaChartLine /> This Month
          </h3>
          <div className="flex justify-center">
            <div className="w-48 h-48">
              <Doughnut
                data={doughnutData}
                options={{ maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 10, font: { size: 11 } } } } }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Weekly Work Hours ── */}
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-6">
        <h2 className="text-lg font-bold text-[#2C5284] flex items-center gap-2 mb-6">
          <FaChartLine /> Weekly Work Hours
        </h2>
        <div className="h-64 sm:h-80">
          <Line
            data={weeklyHours}
            options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 10, ticks: { stepSize: 2 } } } }}
          />
        </div>
      </div>



    </div>
  );
}

export default UserDashboard;