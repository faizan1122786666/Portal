// import { useEffect, useState } from 'react';
// import { FaClock, FaSignInAlt, FaSignOutAlt, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
// import { RxCrossCircled } from "react-icons/rx";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { format } from 'date-fns';
// import { Line, Doughnut } from 'react-chartjs-2';

// // Mock recent attendance data
// const mockRecentAttendance = [
//   { date: '2026-01-27', clockIn: '09:02 AM', clockOut: '06:15 PM', duration: '9h 13m', status: 'present' },
//   { date: '2026-01-26', clockIn: '08:55 AM', clockOut: '05:48 PM', duration: '8h 53m', status: 'present' },
//   { date: '2026-01-25', clockIn: '09:10 AM', clockOut: '06:00 PM', duration: '8h 50m', status: 'present' },
//   { date: '2026-01-24', clockIn: '09:00 AM', clockOut: '06:05 PM', duration: '9h 5m', status: 'present' },
//   { date: '2026-01-23', clockIn: '-', clockOut: '-', duration: '-', status: 'leave' },
// ];

// // Mock weekly data
// const weeklyHours = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [
//     {
//       label: 'Work Hours',
//       data: [9, 8.5, 9.2, 8.8, 9, 0, 0],
//       fill: true,
//       borderColor: 'rgb(217, 119, 6)',
//       backgroundColor: 'rgba(251, 191, 36, 0.1)',
//       tension: 0.4,
//       pointBackgroundColor: 'rgb(217, 119, 6)',
//       pointBorderColor: '#fff',
//       pointBorderWidth: 2,
//       pointRadius: 5,
//       pointHoverRadius: 7,
//     },
//   ],
// };

// // Attendance distribution
// const attendanceDistribution = {
//   labels: ['Present', 'Absent', 'Leave'],
//   datasets: [
//     {
//       data: [19, 1, 2],
//       backgroundColor: [
//        'rgb(217, 119, 6)',
//         'rgb(254, 215, 170)',
//         'rgb(253, 186, 116)',
//       ],
//       borderWidth: 0,
//       hoverOffset: 4,
//     },
//   ],
// };

// function UserDashboard({ setTitle }) {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [clockInTime, setClockInTime] = useState(null);
//   const [todayStatus, setTodayStatus] = useState('Not yet clocked in');

//   useEffect(() => {
//     setTitle('Dashboard Page');

//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [setTitle]);

//   // Check for existing clock-in
//   useEffect(() => {
//     const saved = localStorage.getItem('clockInTime');
//     if (saved) {
//       const parsed = new Date(saved);
//       if (parsed.toDateString() === new Date().toDateString()) {
//         setClockInTime(parsed);
//         setIsClockedIn(true);
//         setTodayStatus('Clocked In');
//       }
//     }
//   }, []);

//   const handleClockIn = () => {
//     const now = new Date();
//     setClockInTime(now);
//     setIsClockedIn(true);
//     setTodayStatus('Clocked In');
//     localStorage.setItem('clockInTime', now.toISOString());
//   };

//   const handleClockOut = () => {
//     setIsClockedIn(false);
//     setTodayStatus('Clocked Out');
//     localStorage.removeItem('clockInTime');
//   };

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8">
//       {/* Current Time Display */}
//       <div className="bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-xl shadow-sm hover:shadow-lg p-5 mb-6 text-center mt-3 transition-all duration-300">
//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900">
//           {format(currentTime, 'hh:mm:ss a')}
//         </h1>
//         <p className="text-amber-700 mt-2 text-base sm:text-lg">
//           {format(currentTime, 'EEEE, MMMM d, yyyy')}
//         </p>
//       </div>

//       {/* Quick Stats Grid */}
//      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mb-4">
//        <div className="bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 p-5 rounded-xl border-l-4 border-amber-600 shadow w-full min-h-30 hover:shadow-xl transform transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs sm:text-sm text-amber-800 mb-1">This Month</p>
//               <p className="text-2xl sm:text-3xl font-bold text-amber-900">19</p>
//               <p className="text-xs text-amber-700">Present Days</p>
//             </div>
//             <div className="bg-amber-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//               <FaRegCheckCircle size={24} className="text-white" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 p-5 rounded-xl border-l-4 border-amber-600 shadow w-full min-h-30 hover:shadow-xl transform transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs sm:text-sm text-amber-800 mb-1">This Month</p>
//               <p className="text-2xl sm:text-3xl font-bold text-amber-900">1</p>
//               <p className="text-xs text-amber-700">Absent Days</p>
//             </div>
//             <div className="bg-amber-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//               <RxCrossCircled size={24} className="text-white" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 p-5 rounded-xl border-l-4 border-amber-600 shadow w-full min-h-30 hover:shadow-xl transform transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs sm:text-sm text-amber-800 mb-1">Leave Days</p>
//               <p className="text-2xl sm:text-3xl font-bold text-amber-900">2</p>
//               <p className="text-xs text-amber-700">This Month</p>
//             </div>
//             <div className="bg-amber-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//               <FaCalendarAlt size={24} className="text-white" />
//             </div>
//           </div>
//         </div>

//          <div className="bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 p-5 rounded-xl border-l-4 border-amber-600 shadow w-full min-h-30 hover:shadow-xl transform transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs sm:text-sm text-amber-800 mb-1">Pending</p>
//               <p className="text-2xl sm:text-3xl font-bold text-amber-900">1</p>
//               <p className="text-xs text-amber-700">Leave Request</p>
//             </div>
//             <div className="bg-amber-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//               <FaClock size={24} className="text-white" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Clock In/Out Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         {/* Main Clock Card */}
//         <div className="lg:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 p-6 rounded-xl border-l-4 border-amber-600 shadow-sm hover:shadow-xl transition-all duration-300">
//           <div className="flex flex-col items-center">
//             <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
//               <FaClock size={24} className="text-white" />
//             </div>

//             <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-4">
//               Today's Attendance
//             </h2>

//             <p className="text-lg font-semibold mb-6">
//               Status:{' '}
//               <span
//                 className={
//                   isClockedIn
//                     ? 'text-green-600 font-bold'
//                     : 'text-amber-800 font-medium'
//                 }
//               >
//                 {todayStatus}
//               </span>
//             </p>

//             {clockInTime && (
//               <p className="text-base sm:text-lg mb-8">
//                 Clocked in at:{' '}
//                 <span className="font-bold text-amber-900">
//                   {format(clockInTime, 'hh:mm a')}
//                 </span>
//               </p>
//             )}

//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <button
//                 onClick={handleClockIn}
//                 disabled={isClockedIn}
//                 className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-medium text-base transition-all duration-300 w-full sm:w-48
//                   ${
//                     isClockedIn
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg transform hover:scale-105'
//                   }`}
//               >
//                 <FaSignInAlt size={24} />
//                 Clock In
//               </button>

//               <button
//                 onClick={handleClockOut}
//                 disabled={!isClockedIn}
//                 className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-medium text-base transition-all duration-300 w-full sm:w-48
//                   ${
//                     !isClockedIn
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg transform hover:scale-105'
//                   }`}
//               >
//                 <FaSignOutAlt size={20} />
//                 Clock Out
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Attendance Distribution */}
//         <div className="bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
//           <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
//             <FaChartLine />
//             This Month
//           </h3>
//           <div className="flex justify-center">
//             <div className="w-48 h-48">
//               <Doughnut 
//                 data={attendanceDistribution}
//                 options={{
//                   maintainAspectRatio: true,
//                   plugins: {
//                     legend: {
//                       position: 'bottom',
//                       labels: {
//                         boxWidth: 12,
//                         padding: 10,
//                         font: {
//                           size: 11
//                         }
//                       }
//                     }
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Weekly Work Hours Chart */}
//       <div className="bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 mb-6">
//         <h2 className="text-lg font-bold text-amber-900 mb-6">
//           Weekly Work Hours
//         </h2>
//         <div className="h-64 sm:h-80">
//           <Line 
//             data={weeklyHours}
//             options={{
//               maintainAspectRatio: false,
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: false
//                 }
//               },
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   max: 10,
//                   ticks: {
//                     stepSize: 2
//                   }
//                 }
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;


















// import { useEffect, useState } from 'react';
// import { FaClock, FaSignInAlt, FaSignOutAlt, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
// import { RxCrossCircled } from "react-icons/rx";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { format } from 'date-fns';
// import { Line, Doughnut } from 'react-chartjs-2';

// // Mock recent attendance data
// const mockRecentAttendance = [
//   { date: '2026-01-27', clockIn: '09:02 AM', clockOut: '06:15 PM', duration: '9h 13m', status: 'present' },
//   { date: '2026-01-26', clockIn: '08:55 AM', clockOut: '05:48 PM', duration: '8h 53m', status: 'present' },
//   { date: '2026-01-25', clockIn: '09:10 AM', clockOut: '06:00 PM', duration: '8h 50m', status: 'present' },
//   { date: '2026-01-24', clockIn: '09:00 AM', clockOut: '06:05 PM', duration: '9h 5m', status: 'present' },
//   { date: '2026-01-23', clockIn: '-', clockOut: '-', duration: '-', status: 'leave' },
// ];

// // Mock weekly data
// const weeklyHours = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [
//     {
//       label: 'Work Hours',
//       data: [9, 8.5, 9.2, 8.8, 9, 0, 0],
//       fill: true,
//       borderColor: 'rgb(217, 119, 6)',
//       backgroundColor: 'rgba(251, 191, 36, 0.1)',
//       tension: 0.4,
//       pointBackgroundColor: 'rgb(217, 119, 6)',
//       pointBorderColor: '#fff',
//       pointBorderWidth: 2,
//       pointRadius: 5,
//       pointHoverRadius: 7,
//     },
//   ],
// };

// // Attendance distribution
// const attendanceDistribution = {
//   labels: ['Present', 'Absent', 'Leave'],
//   datasets: [
//     {
//       data: [19, 1, 2],
//       backgroundColor: [
//        'rgb(217, 119, 6)',
//         'rgb(254, 215, 170)',
//         'rgb(253, 186, 116)',
//       ],
//       borderWidth: 0,
//       hoverOffset: 4,
//     },
//   ],
// };

// function UserDashboard({ setTitle }) {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [clockInTime, setClockInTime] = useState(null);
//   const [todayStatus, setTodayStatus] = useState('Not yet clocked in');

//   useEffect(() => {
//     setTitle('Dashboard Page');

//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [setTitle]);

//   // Check for existing clock-in
//   useEffect(() => {
//     const saved = localStorage.getItem('clockInTime');
//     if (saved) {
//       const parsed = new Date(saved);
//       if (parsed.toDateString() === new Date().toDateString()) {
//         setClockInTime(parsed);
//         setIsClockedIn(true);
//         setTodayStatus('Clocked In');
//       }
//     }
//   }, []);

//   const handleClockIn = () => {
//     const now = new Date();
//     setClockInTime(now);
//     setIsClockedIn(true);
//     setTodayStatus('Clocked In');
//     localStorage.setItem('clockInTime', now.toISOString());
//   };

//   const handleClockOut = () => {
//     setIsClockedIn(false);
//     setTodayStatus('Clocked Out');
//     localStorage.removeItem('clockInTime');
//   };

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8">
//       {/* Current Time Display */}
//       <div className="bg-gradient-to-br from-amber-50 to-orange-50 
//         dark:from-gray-800 dark:to-gray-900
//         hover:from-amber-100 hover:to-orange-100 
//         dark:hover:from-gray-700 dark:hover:to-gray-800
//         rounded-xl shadow-sm hover:shadow-lg p-5 mb-6 text-center mt-3 
//         transition-all duration-300 border border-amber-200 dark:border-gray-700">
//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold 
//           text-amber-900 dark:text-amber-400">
//           {format(currentTime, 'hh:mm:ss a')}
//         </h1>
//         <p className="text-amber-700 dark:text-amber-500 mt-2 text-base sm:text-lg">
//           {format(currentTime, 'EEEE, MMMM d, yyyy')}
//         </p>
//       </div>

//       {/* Quick Stats Grid */}
//      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mb-4">
//        <div className="bg-gradient-to-br from-amber-50 to-orange-50 
//          dark:from-gray-800 dark:to-gray-900
//          hover:from-amber-100 hover:to-orange-100 
//          dark:hover:from-gray-700 dark:hover:to-gray-800
//          p-5 rounded-xl border-l-4 border-amber-600 dark:border-amber-500
//          shadow w-full min-h-30 hover:shadow-xl transform transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-400 mb-1">
//                 This Month
//               </p>
//               <p className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-300">
//                 19
//               </p>
//               <p className="text-xs text-amber-700 dark:text-amber-500">
//                 Present Days
//               </p>
//             </div>
//             <div className="bg-amber-600 dark:bg-amber-500 w-10 h-10 sm:w-12 sm:h-12 
//               rounded-full flex items-center justify-center">
//               <FaRegCheckCircle size={24} className="text-white" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-amber-50 to-orange-50 
//          dark:from-gray-800 dark:to-gray-900
//          hover:from-amber-100 hover:to-orange-100 
//          dark:hover:from-gray-700 dark:hover:to-gray-800
//          p-5 rounded-xl border-l-4 border-amber-600 dark:border-amber-500
//          shadow w-full min-h-30 hover:shadow-xl transform transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-400 mb-1">
//                 This Month
//               </p>
//               <p className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-300">
//                 1
//               </p>
//               <p className="text-xs text-amber-700 dark:text-amber-500">
//                 Absent Days
//               </p>
//             </div>
//             <div className="bg-amber-600 dark:bg-amber-500 w-10 h-10 sm:w-12 sm:h-12 
//               rounded-full flex items-center justify-center">
//               <RxCrossCircled size={24} className="text-white" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-amber-50 to-orange-50 
//          dark:from-gray-800 dark:to-gray-900
//          hover:from-amber-100 hover:to-orange-100 
//          dark:hover:from-gray-700 dark:hover:to-gray-800
//          p-5 rounded-xl border-l-4 border-amber-600 dark:border-amber-500
//          shadow w-full min-h-30 hover:shadow-xl transform transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-400 mb-1">
//                 Leave Days
//               </p>
//               <p className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-300">
//                 2
//               </p>
//               <p className="text-xs text-amber-700 dark:text-amber-500">
//                 This Month
//               </p>
//             </div>
//             <div className="bg-amber-600 dark:bg-amber-500 w-10 h-10 sm:w-12 sm:h-12 
//               rounded-full flex items-center justify-center">
//               <FaCalendarAlt size={24} className="text-white" />
//             </div>
//           </div>
//         </div>

//          <div className="bg-gradient-to-br from-amber-50 to-orange-50 
//          dark:from-gray-800 dark:to-gray-900
//          hover:from-amber-100 hover:to-orange-100 
//          dark:hover:from-gray-700 dark:hover:to-gray-800
//          p-5 rounded-xl border-l-4 border-amber-600 dark:border-amber-500
//          shadow w-full min-h-30 hover:shadow-xl transform transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-400 mb-1">
//                 Pending
//               </p>
//               <p className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-300">
//                 1
//               </p>
//               <p className="text-xs text-amber-700 dark:text-amber-500">
//                 Leave Request
//               </p>
//             </div>
//             <div className="bg-amber-600 dark:bg-amber-500 w-10 h-10 sm:w-12 sm:h-12 
//               rounded-full flex items-center justify-center">
//               <FaClock size={24} className="text-white" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Clock In/Out Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         {/* Main Clock Card */}
//         <div className="lg:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 
//          dark:from-gray-800 dark:to-gray-900
//          hover:from-amber-100 hover:to-orange-100 
//          dark:hover:from-gray-700 dark:hover:to-gray-800
//          p-6 rounded-xl border-l-4 border-amber-600 dark:border-amber-500
//          shadow-sm hover:shadow-xl transition-all duration-300">
//           <div className="flex flex-col items-center">
//             <div className="bg-amber-600 dark:bg-amber-500 w-16 h-16 rounded-full 
//               flex items-center justify-center mb-6">
//               <FaClock size={24} className="text-white" />
//             </div>

//             <h2 className="text-xl sm:text-2xl font-bold text-amber-900 dark:text-amber-300 mb-4">
//               Today's Attendance
//             </h2>

//             <p className="text-lg font-semibold mb-6">
//               Status:{' '}
//               <span
//                 className={
//                   isClockedIn
//                     ? 'text-green-600 dark:text-green-400 font-bold'
//                     : 'text-amber-800 dark:text-amber-400 font-medium'
//                 }
//               >
//                 {todayStatus}
//               </span>
//             </p>

//             {clockInTime && (
//               <p className="text-base sm:text-lg mb-8 text-amber-800 dark:text-amber-400">
//                 Clocked in at:{' '}
//                 <span className="font-bold text-amber-900 dark:text-amber-300">
//                   {format(clockInTime, 'hh:mm a')}
//                 </span>
//               </p>
//             )}

//             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//               <button
//                 onClick={handleClockIn}
//                 disabled={isClockedIn}
//                 className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg 
//                   font-medium text-base transition-all duration-300 w-full sm:w-48
//                   ${
//                     isClockedIn
//                       ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                       : 'bg-amber-600 dark:bg-amber-500 text-white hover:bg-amber-700 dark:hover:bg-amber-600 hover:shadow-lg transform hover:scale-105'
//                   }`}
//               >
//                 <FaSignInAlt size={24} />
//                 Clock In
//               </button>

//               <button
//                 onClick={handleClockOut}
//                 disabled={!isClockedIn}
//                 className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg 
//                   font-medium text-base transition-all duration-300 w-full sm:w-48
//                   ${
//                     !isClockedIn
//                       ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                       : 'bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 hover:shadow-lg transform hover:scale-105'
//                   }`}
//               >
//                 <FaSignOutAlt size={20} />
//                 Clock Out
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Attendance Distribution */}
//         <div className="bg-gradient-to-br from-amber-50 to-orange-50 
//          dark:from-gray-800 dark:to-gray-900
//          hover:from-amber-100 hover:to-orange-100 
//          dark:hover:from-gray-700 dark:hover:to-gray-800
//          p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
//           <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-4 
//             flex items-center gap-2">
//             <FaChartLine />
//             This Month
//           </h3>
//           <div className="flex justify-center">
//             <div className="w-48 h-48">
//               <Doughnut 
//                 data={attendanceDistribution}
//                 options={{
//                   maintainAspectRatio: true,
//                   plugins: {
//                     legend: {
//                       position: 'bottom',
//                       labels: {
//                         boxWidth: 12,
//                         padding: 10,
//                         font: {
//                           size: 11
//                         }
//                       }
//                     }
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Weekly Work Hours Chart */}
//       <div className="bg-gradient-to-br from-amber-50 to-orange-50 
//          dark:from-gray-800 dark:to-gray-900
//          hover:from-amber-100 hover:to-orange-100 
//          dark:hover:from-gray-700 dark:hover:to-gray-800
//          p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 mb-6">
//         <h2 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-6">
//           Weekly Work Hours
//         </h2>
//         <div className="h-64 sm:h-80">
//           <Line 
//             data={weeklyHours}
//             options={{
//               maintainAspectRatio: false,
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: false
//                 }
//               },
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   max: 10,
//                   ticks: {
//                     stepSize: 2
//                   }
//                 }
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;






















import { useEffect, useState } from 'react';
import { FaClock, FaSignInAlt, FaSignOutAlt, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { format } from 'date-fns';
import { Line, Doughnut } from 'react-chartjs-2';

// Mock recent attendance data
const mockRecentAttendance = [
  { date: '2026-01-27', clockIn: '09:02 AM', clockOut: '06:15 PM', duration: '9h 13m', status: 'present' },
  { date: '2026-01-26', clockIn: '08:55 AM', clockOut: '05:48 PM', duration: '8h 53m', status: 'present' },
  { date: '2026-01-25', clockIn: '09:10 AM', clockOut: '06:00 PM', duration: '8h 50m', status: 'present' },
  { date: '2026-01-24', clockIn: '09:00 AM', clockOut: '06:05 PM', duration: '9h 5m', status: 'present' },
  { date: '2026-01-23', clockIn: '-', clockOut: '-', duration: '-', status: 'leave' },
];

// Mock weekly data
const weeklyHours = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
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
    },
  ],
};

// Attendance distribution
const attendanceDistribution = {
  labels: ['Present', 'Absent', 'Leave'],
  datasets: [
    {
      data: [19, 1, 2],
      backgroundColor: [
       'rgb(54, 95, 141)',  
        'rgb(148, 163, 184)',   
        'rgb(203, 213, 225)',  
      ],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

function UserDashboard({ setTitle }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [todayStatus, setTodayStatus] = useState('Not yet clocked in');

  useEffect(() => {
    setTitle('Dashboard Page');

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [setTitle]);

  // Check for existing clock-in
  useEffect(() => {
    const saved = localStorage.getItem('clockInTime');
    if (saved) {
      const parsed = new Date(saved);
      if (parsed.toDateString() === new Date().toDateString()) {
        setClockInTime(parsed);
        setIsClockedIn(true);
        setTodayStatus('Clocked In');
      }
    }
  }, []);

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setIsClockedIn(true);
    setTodayStatus('Clocked In');
    localStorage.setItem('clockInTime', now.toISOString());
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    setTodayStatus('Clocked Out');
    localStorage.removeItem('clockInTime');
  };

  return (
    <div className="min-h-screen">
      {/* Current Time Display */}
      {/* <div className="bg-white rounded-xl shadow-sm p-6 mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#365F8D]">
          {format(currentTime, 'hh:mm:ss a')}
        </h1>
        <p className="text-gray-600 mt-2 text-base sm:text-lg">
          {format(currentTime, 'EEEE, MMMM d, yyyy')}
        </p>
      </div> */}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-3.5">
        <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">19</p>
              <p className="text-xs text-gray-500">Present Days</p>
            </div>
            <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <FaRegCheckCircle size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">1</p>
              <p className="text-xs text-gray-500">Absent Days</p>
            </div>
            <div className="bg-[#2C5284] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <RxCrossCircled size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Leave Days</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">2</p>
              <p className="text-xs text-gray-500">This Month</p>
            </div>
            <div className="bg-[#2C5284] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <FaCalendarAlt size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">1</p>
              <p className="text-xs text-gray-500">Leave Request</p>
            </div>
            <div className="bg-[#2C5284] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <FaClock size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Clock In/Out Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Clock Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border-l-4 border-[#2C5284] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center">
            <div className="bg-[#365F8D] w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FaClock size={32} className="text-white" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#2C5284] mb-4">
              Today's Attendance
            </h2>

            <p className="text-lg font-semibold mb-6">
              Status:{' '}
              <span
                className={
                  isClockedIn
                    ? 'text-green-600 font-bold'
                    : 'text-gray-700 font-medium'
                }
              >
                {todayStatus}
              </span>
            </p>

            {clockInTime && (
              <p className="text-base sm:text-lg mb-8">
                Clocked in at:{' '}
                <span className="font-bold text-[#365F8D]">
                  {format(clockInTime, 'hh:mm a')}
                </span>
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={handleClockIn}
                disabled={isClockedIn}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-medium text-base transition w-full sm:w-48
                  ${
                    isClockedIn
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#365F8D] text-white hover:bg-[#2C5284]'
                  }`}
              >
                <FaSignInAlt size={20} />
                Clock In
              </button>

              <button
                onClick={handleClockOut}
                disabled={!isClockedIn}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-medium text-base transition w-full sm:w-48
                  ${
                    !isClockedIn
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
              >
                <FaSignOutAlt size={20} />
                Clock Out
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Distribution */}
         <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-[#2C5284] mb-4 flex items-center gap-2">
            <FaChartLine />
            This Month
          </h3>
          <div className="flex justify-center">
            <div className="w-48 h-48">
              <Doughnut 
                data={attendanceDistribution}
                options={{
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        padding: 10,
                        font: {
                          size: 11
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div> 

      {/* Weekly Work Hours Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-6">
        <h2 className="text-lg font-bold text-[#2C5284] mb-6">
          Weekly Work Hours
        </h2>
        <div className="h-64 sm:h-80">
          <Line 
            data={weeklyHours}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 10,
                  ticks: {
                    stepSize: 2
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Recent Attendance Table */}
      {/* <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-lg font-bold text-[#2C5284] mb-5">
          Recent Attendance
        </h2>

        {/* Desktop Table */}
        {/* <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="pb-3 font-medium text-left">Date</th>
                <th className="pb-3 font-medium text-left">Clock In</th>
                <th className="pb-3 font-medium text-left">Clock Out</th>
                <th className="pb-3 font-medium text-left">Duration</th>
                <th className="pb-3 font-medium text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentAttendance.map((record, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-4">
                    {format(new Date(record.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-4">{record.clockIn}</td> */}
                  {/* <td className="py-4">{record.clockOut}</td>
                  <td className="py-4">{record.duration}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === 'present'
                          ? 'bg-green-100 text-green-700'
                          : record.status === 'leave'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {record.status === 'present'
                        ? 'Present'
                        : record.status === 'leave'
                        ? 'Leave'
                        : 'Absent'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */} 

        {/* Mobile Cards */}
        {/* <div className="md:hidden space-y-3">
          {mockRecentAttendance.map((record, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <span className="font-medium">
                  {format(new Date(record.date), 'MMM dd, yyyy')}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    record.status === 'present'
                      ? 'bg-green-100 text-green-700'
                      : record.status === 'leave'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {record.status === 'present'
                    ? 'Present'
                    : record.status === 'leave'
                    ? 'Leave'
                    : 'Absent'} */}
                {/* </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">In:</span> {record.clockIn}
                </div>
                <div>
                  <span className="text-gray-600">Out:</span> {record.clockOut}
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Duration:</span> {record.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
     </div> 
  );
}

export default UserDashboard;