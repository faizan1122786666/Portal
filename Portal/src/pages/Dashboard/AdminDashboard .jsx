
// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from 'react'
// import { RxCrossCircled } from "react-icons/rx";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
// import { SlCalender } from "react-icons/sl";
// import { Doughnut,Line } from 'react-chartjs-2';

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
// ChartJS.register(ArcElement, Tooltip, Legend)
// import { LineElement, PointElement, CategoryScale, LinearScale, Title } from 'chart.js'
// ChartJS.register(
//   ArcElement,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend
// )
// const mockdata = {
//   totalemployees: 110,
//   todaypresent: 95,
//   todayabsent: 10,
//   todayleave: 5,
// }

// const TodayAttendanceData = {
//   labels: ['Present', 'Absent', 'On Leave'],
//   datasets: [
//     {
//       label: 'Employees',
//       data: [
//         mockdata.todaypresent,
//         mockdata.todayabsent,
//         mockdata.todayleave,
//       ],
//       backgroundColor: [
//         'rgb(54, 95, 141)',  
//         'rgb(148, 163, 184)',   
//         'rgb(203, 213, 225)',   
//       ],
//       hoverOffset: 4,
//     },
//   ],
// }

// const weeklyAttendanceLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// const weeklyAttendanceData = {
//   labels: weeklyAttendanceLabels,
//   datasets: [
//     {
//       label: 'Present Employees',
//       data: [95, 90, 85, 92, 88, 94, 90],
//       fill: false,
//       borderColor: 'rgb(54, 95, 141)',
//       backgroundColor: 'rgba(71, 85, 105, 0.2)',
//       tension: 0.3,
//       pointBackgroundColor: 'rgb(71, 85, 105)',
//       pointBorderColor: '#fff',
//       pointBorderWidth: 2,
//       pointRadius: 5,
//       pointHoverRadius: 8,
//     },
//   ],
// };


// const EmployeeTaskPerformanceDate = {
//    labels:['Completed','Pending','In Progress'],
//    datasets:[
//     {
//       label:'Tasks',
//       data:[
//         mockdata.todaypresent,
//         mockdata.todayabsent,
//         mockdata.todayabsent,
//       ],
//        backgroundColor: [
//         'rgb(54, 95, 141)',   
//         'rgb(148, 163, 184)',  
//         'rgb(203, 213, 225)',   
//       ],
//       hoverOffset:4,
//     },
//    ],
// }
// function AdminDashboard({ setTitle }) {
//   const [data, setData] = useState(mockdata)

//   useEffect(() => {
//     setTitle('Dashboard Page')
//   }, [setTitle])

//   return (
//   <>
//     <div className="grid grid-cols-1 dark: sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
//       <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//         <div>
//           <p className="text-sm sm:text-base text-[#2C5284]">
//             Total Employees
//           </p>
//           <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">
//             {data.totalemployees}
//           </h1>
//         </div>

//         <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//           <CgProfile size={24} className="text-white" />
//         </div>
//       </div>

//          <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//           <p className="text-sm sm:text-base text-[#2C5284]">
//             Today Present
//           </p>
//           <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">
//             {data.todaypresent}
//           </h1>
//         </div>
//          <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//           <FaRegCheckCircle size={24} className="text-white" />
//         </div>
//       </div>

//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//           <p className="text-sm sm:text-base text-[#2C5284]">
//             Today Absent
//           </p>
//           <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">
//             {data.todayabsent}
//           </h1>
//         </div>
//         <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//           <RxCrossCircled size={24} className="text-white" />
//         </div>
//       </div>

//        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//           <p className="text-sm sm:text-base text-[#2C5284]">
//             onLeave
//           </p>
//           <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">
//             {data.todayleave}
//           </h1>
//         </div>
//         <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//           <SlCalender size={24} className="text-white" />
//         </div>
//       </div>

//     </div>


//    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
//    <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transform transition duration-300 ease-in-out">
//     <h2 className="text-lg font-bold text-[#2C5284] mb-4">
//       Today Attendance Overview
//     </h2>

//     <div className="w-full flex justify-center">
//       <div className="w-64 sm:w-72 md:w-64">
//         <Doughnut data={TodayAttendanceData} />
//        </div>
//      </div>
//     </div>

//     <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transform transition  duration-300 ease-in-out">
//     <h2 className="text-lg font-bold text-[#2C5284] mb-4">
//       Today Employee Task Performance
//     </h2>

//     <div className="w-full flex justify-center">
//       <div className="w-64 sm:w-72 md:w-64">
//         <Doughnut data={EmployeeTaskPerformanceDate} />
//       </div>
//     </div>
//     </div>
//   </div>

//   <div className="grid grid-cols-1 mt-10 hover:shadow-xl transform transition duration-300 ease-in-out">
//     <div  className="bg-white p-6 rounded-xl ">
//       <h2  className="text-lg font-bold text-[#2C5284] mb-4">
//         Weekly Attendance Overview</h2>
//       <div className="w-full flex justify-center">
//       <div className="h-72 sm:h-80 md:h-96 w-full">
//            <Line data={weeklyAttendanceData} options={{maintainAspectRatio:false}}/>
//         </div>
//       </div>
//     </div>
//   </div>

//   </>
//   )
// }

// export default AdminDashboard















// /* eslint-disable no-unused-vars */
// import { useEffect } from 'react'
// import { RxCrossCircled } from 'react-icons/rx'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import { CgProfile } from 'react-icons/cg'
// import { SlCalender } from 'react-icons/sl'
// import { Doughnut, Line } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   ArcElement,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'

// ChartJS.register(
//   ArcElement,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend
// )

// // ── Mock Data ─────────────────────────────────────────────────────────────────
// const mockdata = {
//   totalemployees: 110,
//   todaypresent: 95,
//   todayabsent: 10,
//   todayleave: 5,
// }

// const TodayAttendanceData = {
//   labels: ['Present', 'Absent', 'On Leave'],
//   datasets: [
//     {
//       label: 'Employees',
//       data: [mockdata.todaypresent, mockdata.todayabsent, mockdata.todayleave],
//       backgroundColor: [
//         'rgb(54, 95, 141)',
//         'rgb(148, 163, 184)',
//         'rgb(203, 213, 225)',
//       ],
//       hoverOffset: 4,
//     },
//   ],
// }

// const EmployeeTaskPerformanceData = {
//   labels: ['Completed', 'Pending', 'In Progress'],
//   datasets: [
//     {
//       label: 'Tasks',
//       data: [mockdata.todaypresent, mockdata.todayabsent, mockdata.todayabsent],
//       backgroundColor: [
//         'rgb(54, 95, 141)',
//         'rgb(148, 163, 184)',
//         'rgb(203, 213, 225)',
//       ],
//       hoverOffset: 4,
//     },
//   ],
// }

// const weeklyAttendanceData = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [
//     {
//       label: 'Present Employees',
//       data: [95, 90, 85, 92, 88, 94, 90],
//       fill: false,
//       borderColor: 'rgb(54, 95, 141)',
//       backgroundColor: 'rgba(71, 85, 105, 0.2)',
//       tension: 0.3,
//       pointBackgroundColor: 'rgb(71, 85, 105)',
//       pointBorderColor: '#fff',
//       pointBorderWidth: 2,
//       pointRadius: 5,
//       pointHoverRadius: 8,
//     },
//   ],
// }

// // ── Stat Card Component ───────────────────────────────────────────────────────
// function StatCard({ icon: Icon, label, value, dark }) {
//   return (
//     <div className={`p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-28 hover:shadow-xl transition-all duration-300
//       ${dark ? 'bg-gray-800' : 'bg-white'}`}>
//       <div>
//         <p className={`text-sm sm:text-base ${dark ? 'text-blue-300' : 'text-[#2C5284]'}`}>{label}</p>
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{value}</h1>
//       </div>
//       <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
//         <Icon size={24} className="text-white" />
//       </div>
//     </div>
//   )
// }

// // ── Chart Card Component ──────────────────────────────────────────────────────
// function ChartCard({ title, children, dark }) {
//   return (
//     <div className={`p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300
//       ${dark ? 'bg-gray-800' : 'bg-white'}`}>
//       <h2 className={`text-lg font-bold mb-4 ${dark ? 'text-blue-300' : 'text-[#2C5284]'}`}>{title}</h2>
//       {children}
//     </div>
//   )
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// function AdminDashboard({ setTitle, darkMode }) {
//   const dark = darkMode

//   useEffect(() => {
//     setTitle('Dashboard Page')
//   }, [setTitle])

//   // Dark-aware chart legend label color
//   const legendColor = dark ? '#e5e7eb' : '#374151'

//   const chartOptions = {
//     plugins: {
//       legend: {
//         labels: { color: legendColor },
//       },
//     },
//   }

//   const lineOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         labels: { color: legendColor },
//       },
//     },
//     scales: {
//       x: {
//         ticks: { color: dark ? '#9ca3af' : '#6b7280' },
//         grid:  { color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
//       },
//       y: {
//         ticks: { color: dark ? '#9ca3af' : '#6b7280' },
//         grid:  { color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
//       },
//     },
//   }

//   return (
//     <div className={`min-h-screen p-4 sm:p-6 transition-colors duration-300 ${dark ? 'bg-gray-900' : 'bg-gray-50/50'}`}>

//       {/* ── Stat Cards ── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
//         <StatCard icon={CgProfile}        label="Total Employees" value={mockdata.totalemployees} dark={dark} />
//         <StatCard icon={FaRegCheckCircle} label="Today Present"   value={mockdata.todaypresent}   dark={dark} />
//         <StatCard icon={RxCrossCircled}   label="Today Absent"    value={mockdata.todayabsent}    dark={dark} />
//         <StatCard icon={SlCalender}       label="On Leave"        value={mockdata.todayleave}      dark={dark} />
//       </div>

//       {/* ── Doughnut Charts ── */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
//         <ChartCard title="Today Attendance Overview" dark={dark}>
//           <div className="w-full flex justify-center">
//             <div className="w-64 sm:w-72 md:w-64">
//               <Doughnut data={TodayAttendanceData} options={chartOptions} />
//             </div>
//           </div>
//         </ChartCard>

//         <ChartCard title="Today Employee Task Performance" dark={dark}>
//           <div className="w-full flex justify-center">
//             <div className="w-64 sm:w-72 md:w-64">
//               <Doughnut data={EmployeeTaskPerformanceData} options={chartOptions} />
//             </div>
//           </div>
//         </ChartCard>
//       </div>

//       {/* ── Weekly Line Chart ── */}
//       <div className="mt-10">
//         <ChartCard title="Weekly Attendance Overview" dark={dark}>
//           <div className="h-72 sm:h-80 md:h-96 w-full">
//             <Line data={weeklyAttendanceData} options={lineOptions} />
//           </div>
//         </ChartCard>
//       </div>

//     </div>
//   )
// }

// export default AdminDashboard











import { useEffect, useState } from 'react'
import { RxCrossCircled } from 'react-icons/rx'
import { FaRegCheckCircle } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { CalendarDays } from 'lucide-react'
import { Doughnut, Line } from 'react-chartjs-2'
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
} from 'chart.js'
import { apiGetTodaySummary, apiGetAllAttendance } from '../../api/attendanceAPI'

ChartJS.register(ArcElement, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, loading }) {
  return (
    <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-28 hover:shadow-xl transition-all duration-300">
      <div>
        <p className="text-sm sm:text-base text-[#2C5284]">{label}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">
          {loading ? <span className="text-gray-300 animate-pulse">--</span> : value}
        </h1>
      </div>
      <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
        <Icon size={24} className="text-white" />
      </div>
    </div>
  )
}

// ── Chart Card ────────────────────────────────────────────────────────────────
function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300">
      <h2 className="text-lg font-bold mb-4 text-[#2C5284]">{title}</h2>
      {children}
    </div>
  )
}

// ── Build last 7 days labels ──────────────────────────────────────────────────
function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date:  d.toISOString().split('T')[0],
    })
  }
  return days
}

// ── Main Component ────────────────────────────────────────────────────────────
function AdminDashboard({ setTitle }) {
  const [statsLoading, setStatsLoading]   = useState(true)
  const [chartLoading, setChartLoading]   = useState(true)
  const [todayStats, setTodayStats]       = useState({ totalEmployees: 0, present: 0, absent: 0, onLeave: 0 })
  const [weeklyPresent, setWeeklyPresent] = useState([0, 0, 0, 0, 0, 0, 0])
  const [last7Days]                       = useState(getLast7Days())

  useEffect(() => { setTitle('Dashboard Page') }, [setTitle])

  // Fetch today summary
  useEffect(() => {
    setStatsLoading(true)
    apiGetTodaySummary()
      .then(data => setTodayStats(data))
      .catch(() => console.error('Failed to fetch today summary'))
      .finally(() => setStatsLoading(false))
  }, [])

  // Fetch last 7 days attendance for weekly chart
  useEffect(() => {
    setChartLoading(true)
    const startDate = last7Days[0].date
    const endDate   = last7Days[6].date

    // Fetch records for current month to cover all 7 days
    const currentMonth = startDate.slice(0, 7)
    apiGetAllAttendance({ month: currentMonth })
      .then(data => {
        // const records = data.records || []
         const records = (data.records || []).filter(r => r.employeeId !== null)
        const counts = last7Days.map(({ date }) => {
          return records.filter(r => r.date === date && r.status === 'Present').length
        })
        setWeeklyPresent(counts)
      })
      .catch(() => console.error('Failed to fetch weekly data'))
      .finally(() => setChartLoading(false))
  }, [last7Days])

  // ── Chart data built from real stats ─────────────────────────────────────────
  const TodayAttendanceData = {
    labels: ['Present', 'Absent', 'On Leave'],
    datasets: [{
      label: 'Employees',
      data: [todayStats.present, todayStats.absent, todayStats.onLeave],
      backgroundColor: ['rgb(54, 95, 141)', 'rgb(148, 163, 184)', 'rgb(203, 213, 225)'],
      hoverOffset: 4,
    }],
  }

  const weeklyAttendanceData = {
    labels: last7Days.map(d => d.label),
    datasets: [{
      label: 'Present Employees',
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
  }

  // Attendance rate doughnut
  const attendanceRate = todayStats.totalEmployees > 0
    ? Math.round((todayStats.present / todayStats.totalEmployees) * 100)
    : 0

  const AttendanceRateData = {
    labels: ['Present', 'Not Present'],
    datasets: [{
      data: [todayStats.present, todayStats.totalEmployees - todayStats.present],
      backgroundColor: ['rgb(54, 95, 141)', 'rgb(226, 232, 240)'],
      hoverOffset: 4,
      borderWidth: 0,
    }],
  }

  const chartOptions = {
    plugins: { legend: { labels: { color: '#374151' } } },
  }

  const lineOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#374151' } } },
    scales: {
      x: { ticks: { color: '#6b7280' }, grid: { color: 'rgba(0,0,0,0.05)' } },
      y: { ticks: { color: '#6b7280' }, grid: { color: 'rgba(0,0,0,0.05)' }, beginAtZero: true },
    },
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50/50">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        <StatCard icon={CgProfile}        label="Total Employees" value={todayStats.totalEmployees} loading={statsLoading} />
        <StatCard icon={FaRegCheckCircle} label="Today Present"   value={todayStats.present}        loading={statsLoading} />
        <StatCard icon={RxCrossCircled}   label="Today Absent"    value={todayStats.absent}         loading={statsLoading} />
        <StatCard icon={CalendarDays}     label="On Leave"        value={todayStats.onLeave}        loading={statsLoading} />
      </div>

      {/* ── Attendance Rate Banner ── */}
      {!statsLoading && todayStats.totalEmployees > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow p-5 flex items-center justify-between border-l-4 border-[#2C5284]">
          <div>
            <p className="text-sm text-[#2C5284] font-medium">Today's Attendance Rate</p>
            <h2 className="text-3xl font-bold text-[#365F8D]">{attendanceRate}%</h2>
            <p className="text-xs text-gray-500 mt-1">
              {todayStats.present} out of {todayStats.totalEmployees} employees present
            </p>
          </div>
          {/* Simple progress bar */}
          <div className="flex-1 mx-8">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-4 rounded-full bg-[#365F8D] transition-all duration-700"
                style={{ width: `${attendanceRate}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Absent</p>
            <p className="font-bold text-[#365F8D]">{todayStats.absent}</p>
            <p className="text-xs text-gray-500 mt-1">On Leave</p>
            <p className="font-bold text-[#365F8D]">{todayStats.onLeave}</p>
          </div>
        </div>
      )}

      {/* ── Doughnut Charts ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard title="Today Attendance Overview">
          {statsLoading ? (
            <div className="flex justify-center items-center h-48 text-gray-400">Loading...</div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-64">
                <Doughnut data={TodayAttendanceData} options={chartOptions} />
              </div>
            </div>
          )}
        </ChartCard>

        <ChartCard title="Today Attendance Rate">
          {statsLoading ? (
            <div className="flex justify-center items-center h-48 text-gray-400">Loading...</div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="w-64">
                <Doughnut data={AttendanceRateData} options={chartOptions} />
              </div>
              <p className="mt-3 text-2xl font-bold text-[#2C5284]">{attendanceRate}% Present</p>
            </div>
          )}
        </ChartCard>
      </div>

      {/* ── Weekly Line Chart ── */}
      <div className="mt-6">
        <ChartCard title="Last 7 Days — Present Employees">
          {chartLoading ? (
            <div className="flex justify-center items-center h-48 text-gray-400">Loading chart...</div>
          ) : (
            <div className="h-72 sm:h-80 md:h-96 w-full">
              <Line data={weeklyAttendanceData} options={lineOptions} />
            </div>
          )}
        </ChartCard>
      </div>

    </div>
  )
}

export default AdminDashboard