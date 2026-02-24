
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















/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { RxCrossCircled } from 'react-icons/rx'
import { FaRegCheckCircle } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { SlCalender } from 'react-icons/sl'
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

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

// ── Mock Data ─────────────────────────────────────────────────────────────────
const mockdata = {
  totalemployees: 110,
  todaypresent: 95,
  todayabsent: 10,
  todayleave: 5,
}

const TodayAttendanceData = {
  labels: ['Present', 'Absent', 'On Leave'],
  datasets: [
    {
      label: 'Employees',
      data: [mockdata.todaypresent, mockdata.todayabsent, mockdata.todayleave],
      backgroundColor: [
        'rgb(54, 95, 141)',
        'rgb(148, 163, 184)',
        'rgb(203, 213, 225)',
      ],
      hoverOffset: 4,
    },
  ],
}

const EmployeeTaskPerformanceData = {
  labels: ['Completed', 'Pending', 'In Progress'],
  datasets: [
    {
      label: 'Tasks',
      data: [mockdata.todaypresent, mockdata.todayabsent, mockdata.todayabsent],
      backgroundColor: [
        'rgb(54, 95, 141)',
        'rgb(148, 163, 184)',
        'rgb(203, 213, 225)',
      ],
      hoverOffset: 4,
    },
  ],
}

const weeklyAttendanceData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Present Employees',
      data: [95, 90, 85, 92, 88, 94, 90],
      fill: false,
      borderColor: 'rgb(54, 95, 141)',
      backgroundColor: 'rgba(71, 85, 105, 0.2)',
      tension: 0.3,
      pointBackgroundColor: 'rgb(71, 85, 105)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
  ],
}

// ── Stat Card Component ───────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, dark }) {
  return (
    <div className={`p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-28 hover:shadow-xl transition-all duration-300
      ${dark ? 'bg-gray-800' : 'bg-white'}`}>
      <div>
        <p className={`text-sm sm:text-base ${dark ? 'text-blue-300' : 'text-[#2C5284]'}`}>{label}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{value}</h1>
      </div>
      <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
        <Icon size={24} className="text-white" />
      </div>
    </div>
  )
}

// ── Chart Card Component ──────────────────────────────────────────────────────
function ChartCard({ title, children, dark }) {
  return (
    <div className={`p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300
      ${dark ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-lg font-bold mb-4 ${dark ? 'text-blue-300' : 'text-[#2C5284]'}`}>{title}</h2>
      {children}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
function AdminDashboard({ setTitle, darkMode }) {
  const dark = darkMode

  useEffect(() => {
    setTitle('Dashboard Page')
  }, [setTitle])

  // Dark-aware chart legend label color
  const legendColor = dark ? '#e5e7eb' : '#374151'

  const chartOptions = {
    plugins: {
      legend: {
        labels: { color: legendColor },
      },
    },
  }

  const lineOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: legendColor },
      },
    },
    scales: {
      x: {
        ticks: { color: dark ? '#9ca3af' : '#6b7280' },
        grid:  { color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
      },
      y: {
        ticks: { color: dark ? '#9ca3af' : '#6b7280' },
        grid:  { color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
      },
    },
  }

  return (
    <div className={`min-h-screen p-4 sm:p-6 transition-colors duration-300 ${dark ? 'bg-gray-900' : 'bg-gray-50/50'}`}>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        <StatCard icon={CgProfile}        label="Total Employees" value={mockdata.totalemployees} dark={dark} />
        <StatCard icon={FaRegCheckCircle} label="Today Present"   value={mockdata.todaypresent}   dark={dark} />
        <StatCard icon={RxCrossCircled}   label="Today Absent"    value={mockdata.todayabsent}    dark={dark} />
        <StatCard icon={SlCalender}       label="On Leave"        value={mockdata.todayleave}      dark={dark} />
      </div>

      {/* ── Doughnut Charts ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <ChartCard title="Today Attendance Overview" dark={dark}>
          <div className="w-full flex justify-center">
            <div className="w-64 sm:w-72 md:w-64">
              <Doughnut data={TodayAttendanceData} options={chartOptions} />
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Today Employee Task Performance" dark={dark}>
          <div className="w-full flex justify-center">
            <div className="w-64 sm:w-72 md:w-64">
              <Doughnut data={EmployeeTaskPerformanceData} options={chartOptions} />
            </div>
          </div>
        </ChartCard>
      </div>

      {/* ── Weekly Line Chart ── */}
      <div className="mt-10">
        <ChartCard title="Weekly Attendance Overview" dark={dark}>
          <div className="h-72 sm:h-80 md:h-96 w-full">
            <Line data={weeklyAttendanceData} options={lineOptions} />
          </div>
        </ChartCard>
      </div>

    </div>
  )
}

export default AdminDashboard