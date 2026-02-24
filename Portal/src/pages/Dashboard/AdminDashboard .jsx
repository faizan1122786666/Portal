
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { SlCalender } from "react-icons/sl";
import { Doughnut,Line } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)
import { LineElement, PointElement, CategoryScale, LinearScale, Title } from 'chart.js'
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
      data: [
        mockdata.todaypresent,
        mockdata.todayabsent,
        mockdata.todayleave,
      ],
      backgroundColor: [
        'rgb(54, 95, 141)',  
        'rgb(148, 163, 184)',   
        'rgb(203, 213, 225)',   
      ],
      hoverOffset: 4,
    },
  ],
}

const weeklyAttendanceLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weeklyAttendanceData = {
  labels: weeklyAttendanceLabels,
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
};


const EmployeeTaskPerformanceDate = {
   labels:['Completed','Pending','In Progress'],
   datasets:[
    {
      label:'Tasks',
      data:[
        mockdata.todaypresent,
        mockdata.todayabsent,
        mockdata.todayabsent,
      ],
       backgroundColor: [
        'rgb(54, 95, 141)',   
        'rgb(148, 163, 184)',  
        'rgb(203, 213, 225)',   
      ],
      hoverOffset:4,
    },
   ],
}
function AdminDashboard({ setTitle }) {
  const [data, setData] = useState(mockdata)

  useEffect(() => {
    setTitle('Dashboard Page')
  }, [setTitle])

  return (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
      <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
        <div>
          <p className="text-sm sm:text-base text-[#2C5284]">
            Total Employees
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">
            {data.totalemployees}
          </h1>
        </div>

        <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
          <CgProfile size={24} className="text-white" />
        </div>
      </div>

         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
          <p className="text-sm sm:text-base text-[#2C5284]">
            Today Present
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">
            {data.todaypresent}
          </h1>
        </div>
         <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
          <FaRegCheckCircle size={24} className="text-white" />
        </div>
      </div>

        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
          <p className="text-sm sm:text-base text-[#2C5284]">
            Today Absent
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">
            {data.todayabsent}
          </h1>
        </div>
        <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
          <RxCrossCircled size={24} className="text-white" />
        </div>
      </div>

       <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
          <p className="text-sm sm:text-base text-[#2C5284]">
            onLeave
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">
            {data.todayleave}
          </h1>
        </div>
        <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
          <SlCalender size={24} className="text-white" />
        </div>
      </div>

    </div>


   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
   <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transform transition duration-300 ease-in-out">
    <h2 className="text-lg font-bold text-[#2C5284] mb-4">
      Today Attendance Overview
    </h2>

    <div className="w-full flex justify-center">
      <div className="w-64 sm:w-72 md:w-64">
        <Doughnut data={TodayAttendanceData} />
       </div>
     </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transform transition  duration-300 ease-in-out">
    <h2 className="text-lg font-bold text-[#2C5284] mb-4">
      Today Employee Task Performance
    </h2>

    <div className="w-full flex justify-center">
      <div className="w-64 sm:w-72 md:w-64">
        <Doughnut data={EmployeeTaskPerformanceDate} />
      </div>
    </div>
    </div>
  </div>

  <div className="grid grid-cols-1 mt-10 hover:shadow-xl transform transition duration-300 ease-in-out">
    <div  className="bg-white p-6 rounded-xl ">
      <h2  className="text-lg font-bold text-[#2C5284] mb-4">
        Weekly Attendance Overview</h2>
      <div className="w-full flex justify-center">
      <div className="h-72 sm:h-80 md:h-96 w-full">
           <Line data={weeklyAttendanceData} options={{maintainAspectRatio:false}}/>
        </div>
      </div>
    </div>
  </div>

  </>
  )
}

export default AdminDashboard








