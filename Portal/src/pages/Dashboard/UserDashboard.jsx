// ── Legacy `UserDashboard` Code References Removed ──
// Over 500 lines of fully commented-out legacy dashboard versions were excised.
// Refer to previous commits for historical versions.ex items-center gap-2 mb-6">
//           <FaChartLine /> Weekly Work Hours
//         </h2>
//         <div className="h-64 sm:h-80">
//           <Line
//             data={weeklyHours}
//             options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 10, ticks: { stepSize: 2 } } } }}
//           />
//         </div>
//       </div>

//     </div>
//   );
// }

// export default UserDashboard;






















import { useEffect, useState, useCallback } from 'react';
import { FaClock, FaSignInAlt, FaSignOutAlt, FaCalendarAlt, FaChartLine, FaSun, FaMoon } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { FaRegCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAuthContext } from '../../context';
import { apiCheckIn, apiCheckOut, apiGetTodayStatus, apiGetMyAttendance } from '../../api/attendanceAPI';
import Loader from '../../components/common/Loader';

ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// ── Build last 7 days labels (same as AdminDashboard) ────────────────────────
function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.toISOString().split('T')[0],
    });
  }
  return days;
}

const SHIFT_TIMES = {
  Morning: { start: '9:00 AM', end: '6:00 PM' },
  Evening: { start: '6:00 PM', end: '3:00 AM' },
};

function ShiftInfoCard({ shift }) {
  if (!shift || (shift !== 'Morning' && shift !== 'Evening')) return null;
  const isMorning = shift === 'Morning';
  const times = SHIFT_TIMES[shift];
  return (
    <div className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold mb-3
      ${isMorning
        ? 'bg-amber-50 text-amber-800 border border-amber-200'
        : 'bg-indigo-50 text-indigo-800 border border-indigo-200'}`}>
      {isMorning ? <FaSun size={15} /> : <FaMoon size={15} />}
      <span>{shift} Shift &nbsp;·&nbsp; {times.start} – {times.end}</span>
    </div>
  );
}

function UserDashboard({ setTitle }) {
  const { user } = useAuthContext();

  const [statsLoading, setStatsLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayStatus, setTodayStatus] = useState(null);
  const [summary, setSummary] = useState({ present: 0, absent: 0, leave: 0 });
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [last7Days] = useState(getLast7Days());
  const [weeklyPresent, setWeeklyPresent] = useState([0, 0, 0, 0, 0, 0, 0]);

  const displayName = user?.name || '';
  const userShift = user?.shift || '';
  const hasValidShift = userShift === 'Morning' || userShift === 'Evening';

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
      setStatsLoading(true);
      const currentMonth = format(new Date(), 'yyyy-MM');
      const data = await apiGetMyAttendance({ month: currentMonth });
      if (data.summary) setSummary(data.summary);
    } catch { console.error('Failed to fetch summary'); }
    finally { setStatsLoading(false); }
  }, []);

  // Fetch weekly data for the line chart
  useEffect(() => {
    setChartLoading(true);
    const startDate = last7Days[0].date;
    const currentMonth = startDate.slice(0, 7);
    import('../../api/attendanceAPI').then(({ apiGetMyAttendance }) => {
      apiGetMyAttendance({ month: currentMonth })
        .then(data => {
          const records = (data.records || []);
          const counts = last7Days.map(({ date }) =>
            records.filter(r => r.date === date && r.status === 'Present').length
          );
          setWeeklyPresent(counts);
        })
        .catch(() => console.error('Failed to fetch weekly data'))
        .finally(() => setChartLoading(false));
    });
  }, [last7Days]);

  useEffect(() => {
    fetchTodayStatus();
    fetchSummary();
  }, [fetchTodayStatus, fetchSummary]);

  // ── Clock In ──────────────────────────────────────────────────────────────
  const handleClockIn = async () => {
    if (!hasValidShift) {
      setActionMsg('No shift assigned to your account. Please contact your admin.');
      setMsgType('error');
      return;
    }
    setLoading(true);
    setActionMsg('');
    try {
      const data = await apiCheckIn({ shift: userShift });
      setActionMsg(data.message || 'Clocked in successfully.');
      setMsgType('success');
      await fetchTodayStatus();
    } catch (err) {
      setActionMsg(err?.response?.data?.message || 'Clock in failed.');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  // ── Clock Out ─────────────────────────────────────────────────────────────
  const handleClockOut = async () => {
    setLoading(true);
    setActionMsg('');
    try {
      const data = await apiCheckOut();
      setActionMsg(data.message || 'Clocked out successfully.');
      setMsgType('success');
      await fetchTodayStatus();
      await fetchSummary();
    } catch (err) {
      setActionMsg(err?.response?.data?.message || 'Clock out failed.');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  const canCheckIn  = todayStatus?.canCheckIn  ?? true;
  const canCheckOut = todayStatus?.canCheckOut ?? false;
  const sessions    = todayStatus?.sessions    || [];
  const totalHours  = todayStatus?.totalWorkHours || null;
  const activeShift = todayStatus?.shift || userShift || null;

  const statusLabel = !todayStatus ? 'Loading...'
    : canCheckOut    ? `Checked in at ${todayStatus.currentCheckIn}`
    : sessions.length > 0 ? `Done — Total: ${totalHours || '0h 0m'}`
    : 'Not yet checked in';

  // ── Chart Data (same style as AdminDashboard) ─────────────────────────────
  const presentDays  = summary.present;
  const absentDays   = summary.absent;
  const leaveDays    = summary.leave;
  const totalDays    = presentDays + absentDays + leaveDays || 1;

  const MonthlyAttendanceData = {
    labels: ['Present', 'Absent', 'Leave'],
    datasets: [{
      label: 'Days',
      data: [presentDays, absentDays, leaveDays],
      backgroundColor: ['rgb(54, 95, 141)', 'rgb(148, 163, 184)', 'rgb(203, 213, 225)'],
      hoverOffset: 4,
    }],
  };

  const attendanceRate = Math.round((presentDays / totalDays) * 100);

  const AttendanceRateData = {
    labels: ['Present', 'Not Present'],
    datasets: [{
      data: [presentDays, totalDays - presentDays],
      backgroundColor: ['rgb(54, 95, 141)', 'rgb(226, 232, 240)'],
      hoverOffset: 4,
      borderWidth: 0,
    }],
  };

  const weeklyWorkData = {
    labels: last7Days.map(d => d.label),
    datasets: [{
      label: 'Present Days',
      data: weeklyPresent,
      fill: false,
      borderColor: 'rgb(54, 95, 141)',
      backgroundColor: 'rgba(71, 85, 105, 0.2)',
      tension: 0.3,
      pointBackgroundColor: 'rgb(71, 85, 105)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
    }],
  };

  // eslint-disable-next-line no-undef
  const dark = typeof darkMode !== 'undefined' ? darkMode : document.documentElement.classList.contains('dark');

  const chartOptions = {
    plugins: { legend: { labels: { color: dark ? '#e5e7eb' : '#374151' } } },
  };

  const lineOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: dark ? '#e5e7eb' : '#374151' } } },
    scales: {
      x: { ticks: { color: dark ? '#9ca3af' : '#6b7280' }, grid: { color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' } },
      y: { ticks: { color: dark ? '#9ca3af' : '#6b7280' }, grid: { color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }, beginAtZero: true },
    },
  };

  // Stat cards — identical structure to AdminDashboard
  const statCards = [
    { label: 'Present Days',    value: summary.present,         sub: 'This Month', icon: <FaRegCheckCircle size={20} className="text-white" /> },
    { label: 'Absent Days',     value: summary.absent,          sub: 'This Month', icon: <RxCrossCircled size={20} className="text-white" /> },
    { label: 'Leave Days',      value: summary.leave,           sub: 'This Month', icon: <FaCalendarAlt size={20} className="text-white" /> },
    { label: 'Total Work Hours',value: totalHours || '--',      sub: 'Today',      icon: <FaClock size={20} className="text-white" /> },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4">

      {/* ── Stat Cards — identical size/classes to AdminDashboard ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition duration-300"
          >
            <div>
              <p className="text-xs text-[#2C5284] dark:text-gray-300">{card.label}</p>
              <h1 className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-blue-300">
                {statsLoading ? <span className="text-gray-300 animate-pulse">--</span> : card.value}
              </h1>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{card.sub}</p>
            </div>
            <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Attendance Rate Banner — compact (same as AdminDashboard) ── */}
      {/* {!statsLoading && totalDays > 1 && (
        <div className="bg-white dark:bg-white/5 rounded-xl shadow p-4 flex items-center justify-between border-l-4 border-[#2C5294] dark:border-[#365F8D] transition-colors duration-300">
          <div>
            <p className="text-xs text-[#2C5284] dark:text-gray-300 font-medium">This Month's Attendance Rate</p>
            <h2 className="text-xl font-bold text-[#365F8D] dark:text-white">{attendanceRate}%</h2>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
              {presentDays} present out of {totalDays} working days
            </p>
          </div>
          <div className="flex-1 mx-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-[#365F8D] dark:bg-blue-500 transition-all duration-700"
                style={{ width: `${attendanceRate}%` }}
              />
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Absent</p>
            <p className="font-bold text-sm text-[#365F8D] dark:text-white">{absentDays}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">On Leave</p>
            <p className="font-bold text-sm text-[#365F8D] dark:text-white">{leaveDays}</p>
          </div>
        </div>
      )} */}

      {/* ── Clock In/Out Card — compact, full width ── */}
      <div className="bg-white dark:bg-white/5 p-5 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] shadow hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col items-center">
          <div className="bg-[#365F8D] w-14 h-14 rounded-full flex items-center justify-center mb-3">
            <FaClock size={28} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] dark:text-white mb-1">
            {format(currentTime, 'hh:mm:ss a')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{format(currentTime, 'EEEE, MMMM d, yyyy')}</p>
          <h2 className="text-base font-bold text-[#2C5284] dark:text-blue-200 mb-2">Today's Attendance</h2>

          <ShiftInfoCard shift={activeShift} />

          {!hasValidShift && (
            <div className="w-full mb-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 text-center">
              ⚠️ No shift assigned to your account. Contact your admin.
            </div>
          )}

          <p className="text-sm font-semibold mb-3 text-center dark:text-gray-200">
            Status:{' '}
            <span className={
              canCheckOut ? 'text-green-600 dark:text-green-400'
                : sessions.length ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
            }>
              {statusLabel}
            </span>
          </p>

          {/* Sessions */}
          {sessions.length > 0 && (
            <div className="w-full mb-3 space-y-2 max-w-xl">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center mb-1">Today's Sessions</p>
              {sessions.map((s, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-white/5 rounded-lg px-4 py-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Session {i + 1}</span>
                  <span className="text-[#365F8D] dark:text-blue-300 font-semibold">
                    {s.checkIn}{s.checkOut ? ` → ${s.checkOut}` : ' → ongoing'}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{s.workHours || '...'}</span>
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
            <p className={`text-sm px-4 py-2.5 rounded-lg mb-3 text-center w-full max-w-xl
              ${msgType === 'success'
                ? 'text-green-700 bg-green-50 dark:bg-green-500/10 dark:text-green-300 border border-green-200 dark:border-green-500/20'
                : 'text-red-700 bg-red-50 dark:bg-red-500/10 dark:text-red-300 border border-red-200 dark:border-red-500/20'}`}>
              {actionMsg}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={handleClockIn}
              disabled={!canCheckIn || loading || !hasValidShift}
              className={`flex items-center justify-center gap-3 px-8 py-3 rounded-lg font-medium text-base transition w-full sm:w-48
                ${!canCheckIn || loading || !hasValidShift
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#365F8D] text-white hover:bg-[#2C5284]'}`}
            >
              <FaSignInAlt size={18} />{loading ? 'Wait...' : 'Clock In'}
            </button>
            <button
              onClick={handleClockOut}
              disabled={!canCheckOut || loading}
              className={`flex items-center justify-center gap-3 px-8 py-3 rounded-lg font-medium text-base transition w-full sm:w-48
                ${!canCheckOut || loading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'}`}
            >
              <FaSignOutAlt size={18} />{loading ? 'Wait...' : 'Clock Out'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Doughnut Charts — same size/style as AdminDashboard ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Attendance Overview */}
        <div className="bg-white dark:bg-white/5 p-5 rounded-xl shadow hover:shadow-xl transition-all duration-300 border border-transparent dark:border-white/5">
          <h2 className="text-base font-bold mb-3 text-[#2C5284] dark:text-blue-300">This Month Overview</h2>
          {statsLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader size="medium" />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-48 h-48">
                <Doughnut data={MonthlyAttendanceData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>

        {/* Attendance Rate */}
        <div className="bg-white dark:bg-white/5 p-5 rounded-xl shadow hover:shadow-xl transition-all duration-300 border border-transparent dark:border-white/5">
          <h2 className="text-base font-bold mb-3 text-[#2C5284] dark:text-blue-300">This Month Attendance Rate</h2>
          {statsLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader size="medium" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-48 h-48">
                <Doughnut data={AttendanceRateData} options={chartOptions} />
              </div>
              <p className="mt-2 text-xl font-bold text-[#2C5284] dark:text-blue-200">{attendanceRate}% Present</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Weekly Line Chart — same height/style as AdminDashboard ── */}
      <div className="bg-white dark:bg-white/5 p-5 rounded-xl shadow hover:shadow-xl transition-all duration-300 border border-transparent dark:border-white/5">
        <h2 className="text-base font-bold mb-3 text-[#2C5284] dark:text-blue-300">Last 7 Days — My Attendance</h2>
        {chartLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader size="medium" />
          </div>
        ) : (
          <div className="h-56 sm:h-64 w-full">
            <Line data={weeklyWorkData} options={lineOptions} />
          </div>
        )}
      </div>

    </div>
  );
}

export default UserDashboard;