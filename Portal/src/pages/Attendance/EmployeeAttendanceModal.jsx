







// import React, { useEffect, useState } from 'react';
// import Select from 'react-select';
// import { getEmployeeRecords } from '../../data/mockAttendanceData'; // ← yeh use kar rahe

// // For leave – abhi mock, real mein separate array bana sakte ho
// const mockLeaves = []; // Placeholder – future mein add kar dena

// function EmployeeAttendanceModal({ employee, onClose, isAdmin = false }) {
//   const [records, setRecords] = useState([]);
//   const [leaves, setLeaves] = useState(mockLeaves);
//   const [newLeave, setNewLeave] = useState({ date: '', reason: '' });

//   useEffect(() => {
//     const empRecords = getEmployeeRecords(employee.employeeId);
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setRecords(empRecords.sort((a, b) => new Date(b.date) - new Date(a.date))); // Latest first
//   }, [employee.employeeId]);

//   const handleApplyLeave = () => {
//     if (!newLeave.date || !newLeave.reason.trim()) return;
//     // Mock save
//     const newEntry = {
//       id: Date.now(),
//       date: newLeave.date,
//       reason: newLeave.reason,
//       status: 'Pending',
//     };
//     setLeaves([...leaves, newEntry]);
//     setNewLeave({ date: '', reason: '' });
//   };

//   const statusOptions = [
//     { value: 'Pending', label: 'Pending' },
//     { value: 'Accepted', label: 'Accept' },
//     { value: 'Denied', label: 'Deny' },
//   ];

//   const getRowBg = (status) => {
//     if (status === 'Present') return 'bg-green-50';
//     if (status === 'Absent') return 'bg-red-50';
//     if (status === 'Leave') return 'bg-yellow-50';
//     return '';
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-[#292c35] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border dark:border-white/5">
//         <div className="p-6 sm:p-8">
//           <h2 className="text-2xl font-bold text-[#2C5284] dark:text-gray-100 mb-6">
//             {isAdmin ? `${employee.name}'s` : 'My'} Attendance Details
//           </h2>

//           {/* Attendance Records Table */}
//           <div className="mb-10">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Attendance Records</h3>
//             {records.length > 0 ? (
//               <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-white/10">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
//                   <thead className="bg-[#365F8D]">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-white">Check In</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-white">Check Out</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-white">Work Hours</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-white/10 bg-white dark:bg-transparent">
//                     {records.map((record) => (
//                       <tr key={record.id} className={`${getRowBg(record.status)} hover:bg-gray-50 dark:hover:bg-white/5 transition-colors`}>
//                         <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">{record.date}</td>
//                         <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{record.checkIn}</td>
//                         <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{record.checkOut}</td>
//                         <td className="px-6 py-4">
//                           <span
//                             className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                                 record.status === 'Absent' ? 'bg-red-100 text-red-800' :
//                                   'bg-yellow-100 text-yellow-800'
//                               }`}
//                           >
//                             {record.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{record.workHours}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400 text-center py-8">No records found.</p>
//             )}
//           </div>

//           {/* Leave Section */}
//           <div className="mb-10">
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Leaves</h3>
//             {leaves.length > 0 ? (
//               <div className="space-y-4">
//                 {leaves.map((leave) => (
//                   <div key={leave.id} className="bg-gray-50 dark:bg-white/5 p-4 rounded-lg border border-gray-200 dark:border-white/10">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="font-medium text-gray-900 dark:text-gray-100">{leave.date}</p>
//                         <p className="text-gray-700 dark:text-gray-300 mt-1">{leave.reason}</p>
//                       </div>
//                       {isAdmin ? (
//                         <Select
//                           options={statusOptions}
//                           defaultValue={statusOptions.find(o => o.value === leave.status)}
//                           className="w-36 text-sm"
//                         />
//                       ) : (
//                         <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
//                           {leave.status}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400">No leave requests yet.</p>
//             )}

//             {!isAdmin && (
//               <div className="mt-8 bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
//                 <h4 className="text-lg font-semibold text-[#2C5284] dark:text-blue-300 mb-4">Apply New Leave</h4>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
//                     <input
//                       type="date"
//                       value={newLeave.date}
//                       onChange={(e) => setNewLeave({ ...newLeave, date: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#365F8D] focus:border-[#365F8D] outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason</label>
//                     <textarea
//                       value={newLeave.reason}
//                       onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
//                       rows={3}
//                       className="w-full px-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#365F8D] focus:border-[#365F8D] outline-none"
//                       placeholder="Enter reason for leave..."
//                     />
//                   </div>
//                   <button
//                     onClick={handleApplyLeave}
//                     className="w-full bg-[#365F8D] text-white py-3 rounded-lg hover:bg-[#2C5284] transition font-medium"
//                   >
//                     Submit Leave Request
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end">
//             <button
//               onClick={onClose}
//               className="px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition font-medium"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeAttendanceModal;












// import { useEffect, useRef } from 'react';
// import { FaTimes, FaSun, FaMoon } from 'react-icons/fa';
// import { FiClock } from 'react-icons/fi';

// function EmployeeAttendanceModal({ record, onClose }) {
//   const overlayRef = useRef(null);

//   useEffect(() => {
//     const handler = (e) => { if (e.key === 'Escape') onClose(); };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, [onClose]);

//   if (!record) return null;

//   const {
//     date           = '',
//     shift          = '',
//     status         = '',
//     firstCheckIn   = '--',
//     lastCheckOut   = '--',
//     totalWorkHours = '0h 0m',
//     sessions       = [],
//   } = record;

//   // ── Parse "5h 2m" → minutes ──────────────────────────────────────────────
//   const parseMinutes = (str) => {
//     if (!str) return 0;
//     const h = str.match(/(\d+)h/);
//     const m = str.match(/(\d+)m/);
//     return (h ? parseInt(h[1]) * 60 : 0) + (m ? parseInt(m[1]) : 0);
//   };

//   const SHIFT_MINUTES = 9 * 60; // 9-hour shift
//   const progress      = Math.min(parseMinutes(totalWorkHours) / SHIFT_MINUTES, 1); // 0.0 – 1.0

//   // ── SVG ring ─────────────────────────────────────────────────────────────
//   // pad = half stroke + 2px safety so strokeLinecap="round" is never clipped
//   const stroke = 9;
//   const pad    = Math.ceil(stroke / 2) + 2;   // = 7
//   const size   = 120;
//   const cx     = size / 2;                    // 60
//   const cy     = size / 2;                    // 60
//   // radius must leave room for stroke + padding on all sides
//   const r      = cx - pad;                    // 60 - 7 = 53
//   const circum = 2 * Math.PI * r;
//   const filled = circum * progress;
//   const gap    = circum - filled;
//   // viewBox is expanded by `pad` on every side so the arc is never clipped
//   const vbSize = size + pad * 2;              // 120 + 14 = 134
//   const vbOff  = -pad;                        // -7  (shift origin)

//   // ── Format date ──────────────────────────────────────────────────────────
//   const formatDate = (d) => {
//     if (!d) return '';
//     try {
//       const dt  = new Date(d + 'T00:00:00');
//       const day = dt.toLocaleDateString('en-US', { weekday: 'long' });
//       const [y, mo, da] = d.split('-');
//       return `${da}-${mo}-${y} (${day})`;
//     } catch { return d; }
//   };

//   const isMorning = shift === 'Morning';

//   const statusStyle = {
//     Present : 'bg-green-100 text-green-700',
//     Absent  : 'bg-red-100 text-red-700',
//     Leave   : 'bg-yellow-100 text-yellow-700',
//   }[status] ?? 'bg-gray-100 text-gray-600';

//   return (
//     <div
//       ref={overlayRef}
//       className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
//       onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
//     >
//       <div className="bg-white dark:bg-[#1e2130] rounded-2xl shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto">

//         {/* ── HEADER ──────────────────────────────────────────────────── */}
//         <div className="bg-[#2C5284] px-5 py-4 rounded-t-2xl flex items-start justify-between gap-2">
//           <div>
//             <h2 className="text-[17px] font-bold text-white leading-snug">Attendance Details</h2>
//             <p className="text-blue-200 text-[11px] mt-0.5">{formatDate(date)}</p>
//           </div>
//           <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
//             {shift && (
//               <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold
//                 ${isMorning ? 'bg-amber-400/20 text-amber-200' : 'bg-indigo-400/20 text-indigo-200'}`}>
//                 {isMorning ? <FaSun size={10} /> : <FaMoon size={10} />}
//                 {shift} Shift
//               </span>
//             )}
//             <button onClick={onClose} className="text-white hover:bg-white/15 rounded-full p-1.5 transition-colors">
//               <FaTimes size={15} />
//             </button>
//           </div>
//         </div>

//         {/* ── BODY ────────────────────────────────────────────────────── */}
//         <div className="p-5 space-y-4">

//           {/* Row: Ring + Clock cards */}
//           <div className="flex items-center gap-4">

//             {/* Ring block — fixed 120×120 container, text absolutely centred */}
//             <div className="shrink-0 flex flex-col items-center">
//               <div style={{ position: 'relative', width: 120, height: 120 }}>

//                 {/* SVG ring — starts at top (rotated -90°) */}
//                 {/*
//                   viewBox is expanded by `pad` on all sides so the rounded
//                   stroke caps are never clipped by the SVG viewport.
//                   The rendered size stays 120×120 — only the internal
//                   coordinate space grows.
//                 */}
//                 <svg
//                   width="120"
//                   height="120"
//                   viewBox={`${vbOff} ${vbOff} ${vbSize} ${vbSize}`}
//                   style={{ display: 'block', transform: 'rotate(-90deg)', overflow: 'visible' }}
//                 >
//                   {/* Grey track */}
//                   <circle
//                     cx={cx} cy={cy} r={r}
//                     fill="none"
//                     stroke="#e2e8f0"
//                     strokeWidth={stroke}
//                   />
//                   {/* Blue progress arc */}
//                   <circle
//                     cx={cx} cy={cy} r={r}
//                     fill="none"
//                     stroke="#2C5284"
//                     strokeWidth={stroke}
//                     strokeLinecap="round"
//                     strokeDasharray={`${filled} ${gap}`}
//                     style={{ transition: 'stroke-dasharray 0.7s ease' }}
//                   />
//                 </svg>

//                 {/* Text centred inside the ring */}
//                 <div style={{
//                   position: 'absolute',
//                   top: 0, left: 0,
//                   width: 120, height: 120,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   pointerEvents: 'none',
//                 }}>
//                   <span style={{ fontSize: 13, fontWeight: 700, color: '#2C5284', lineHeight: 1 }}>
//                     {totalWorkHours}
//                   </span>
//                   <span style={{ fontSize: 9, color: '#9ca3af', marginTop: 3 }}>
//                     Total Hrs
//                   </span>
//                 </div>
//               </div>

//               {/* Status badge below ring */}
//               <span className={`mt-2 px-3 py-0.5 rounded-full text-[11px] font-semibold ${statusStyle}`}>
//                 {status || 'N/A'}
//               </span>
//             </div>

//             {/* Clock In / Clock Out cards */}
//             <div className="flex-1 grid grid-cols-2 gap-3">
//               <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
//                 <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
//                   First Clock In
//                 </p>
//                 <p className="text-[20px] font-bold text-gray-900 dark:text-gray-100 leading-tight">
//                   {firstCheckIn}
//                 </p>
//               </div>
//               <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
//                 <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
//                   Last Clock Out
//                 </p>
//                 <p className="text-[20px] font-bold text-gray-900 dark:text-gray-100 leading-tight">
//                   {lastCheckOut}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Total Work Hours Banner */}
//           <div className="bg-[#2C5284] rounded-xl px-5 py-3.5 flex items-center justify-between">
//             <span className="text-white font-semibold text-sm">Total Work Hours</span>
//             <span className="text-white font-bold text-[18px]">{totalWorkHours}</span>
//           </div>

//           {/* Sessions */}
//           {sessions.length > 0 && (
//             <div>
//               <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
//                 Sessions ({sessions.length})
//               </p>
//               <div className="space-y-2">
//                 {sessions.map((s, i) => (
//                   <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3">
//                     <div className="w-7 h-7 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                       <span className="text-white text-xs font-bold">{i + 1}</span>
//                     </div>
//                     <div className="flex items-center gap-1.5 flex-1 text-sm">
//                       <FiClock size={13} className="text-[#2C5284] dark:text-blue-400 flex-shrink-0" />
//                       <span className="font-semibold text-[#2C5284] dark:text-blue-300 whitespace-nowrap">
//                         {s.checkIn || '--'}
//                       </span>
//                       <span className="text-gray-400 mx-0.5">→</span>
//                       <span className="font-semibold text-[#2C5284] dark:text-blue-300 whitespace-nowrap">
//                         {s.checkOut || '--'}
//                       </span>
//                     </div>
//                     <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 px-3 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
//                       {s.workHours || '0h 0m'}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeAttendanceModal;












// import { useEffect, useRef } from 'react';
// import { FaTimes, FaSun, FaMoon } from 'react-icons/fa';
// import { FiClock } from 'react-icons/fi';

// function EmployeeAttendanceModal({ record, onClose }) {
//   const overlayRef = useRef(null);

//   useEffect(() => {
//     const handler = (e) => { if (e.key === 'Escape') onClose(); };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, [onClose]);

//   if (!record) return null;

//   const {
//     date = '',
//     shift = '',
//     status = '',
//     firstCheckIn = '--',
//     lastCheckOut = '--',
//     totalWorkHours = '0h 0m',
//     sessions = [],
//   } = record;

//   // Parse "5h 2m" → minutes
//   const parseMinutes = (str) => {
//     if (!str) return 0;
//     const h = str.match(/(\d+)h/);
//     const m = str.match(/(\d+)m/);
//     return (h ? parseInt(h[1]) * 60 : 0) + (m ? parseInt(m[1]) : 0);
//   };

//   const SHIFT_MINUTES = 9 * 60;
//   const progress = Math.min(parseMinutes(totalWorkHours) / SHIFT_MINUTES, 1);

//   // SVG Ring
//   const stroke = 9;
//   const pad = Math.ceil(stroke / 2) + 2;
//   const size = 120;

//   const cx = size / 2;
//   const cy = size / 2;
//   const r = cx - pad;

//   const circum = 2 * Math.PI * r;
//   const filled = circum * progress;
//   const gap = circum - filled;

//   const vbSize = size + pad * 2;
//   const vbOff = -pad;

//   // Format date
//   const formatDate = (d) => {
//     if (!d) return '';
//     try {
//       const dt = new Date(d + 'T00:00:00');
//       const day = dt.toLocaleDateString('en-US', { weekday: 'long' });
//       const [y, mo, da] = d.split('-');
//       return `${da}-${mo}-${y} (${day})`;
//     } catch {
//       return d;
//     }
//   };

//   const isMorning = shift === 'Morning';

//   const statusStyle = {
//     Present: 'bg-green-100 text-green-700',
//     Absent: 'bg-red-100 text-red-700',
//     Leave: 'bg-yellow-100 text-yellow-700',
//   }[status] ?? 'bg-gray-100 text-gray-600';

//   return (
//     <div
//       ref={overlayRef}
//       className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
//       onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
//     >

//       <div className="bg-white dark:bg-[#1e2130] rounded-2xl shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto">

//         {/* HEADER */}
//         <div className="bg-[#2C5284] px-5 py-4 rounded-t-2xl flex items-start justify-between gap-2">
//           <div>
//             <h2 className="text-[17px] font-bold text-white leading-snug">
//               Attendance Details
//             </h2>
//             <p className="text-blue-200 text-[11px] mt-0.5">
//               {formatDate(date)}
//             </p>
//           </div>

//           <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
//             {shift && (
//               <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold
//                 ${isMorning ? 'bg-amber-400/20 text-amber-200' : 'bg-indigo-400/20 text-indigo-200'}`}>

//                 {isMorning ? <FaSun size={10} /> : <FaMoon size={10} />}
//                 {shift} Shift
//               </span>
//             )}

//             <button
//               onClick={onClose}
//               className="text-white hover:bg-white/15 rounded-full p-1.5 transition-colors"
//             >
//               <FaTimes size={15} />
//             </button>
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="p-5 space-y-4">

//           {/* Ring + Cards */}
//           <div className="flex items-center gap-4">

//             {/* RING */}
//             <div className="shrink-0 flex flex-col items-center">

//               <div style={{ position: 'relative', width: 120, height: 120 }}>

//                 <svg
//                   width="120"
//                   height="120"
//                   viewBox={`${vbOff} ${vbOff} ${vbSize} ${vbSize}`}
//                   style={{ display: 'block', transform: 'rotate(-90deg)', overflow: 'visible' }}
//                 >
//                   <circle
//                     cx={cx}
//                     cy={cy}
//                     r={r}
//                     fill="none"
//                     stroke="#e2e8f0"
//                     strokeWidth={stroke}
//                   />

//                   <circle
//                     cx={cx}
//                     cy={cy}
//                     r={r}
//                     fill="none"
//                     stroke="#2C5284"
//                     strokeWidth={stroke}
//                     strokeLinecap="round"
//                     strokeDasharray={`${filled} ${gap}`}
//                     style={{ transition: 'stroke-dasharray 0.7s ease' }}
//                   />
//                 </svg>

//                 {/* CENTER TEXT */}
//                 <div style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: 120,
//                   height: 120,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   transform: 'translateY(3px)',   // FIXED CENTERING
//                   pointerEvents: 'none',
//                 }}>

//                   <span style={{
//                     fontSize: 14,
//                     fontWeight: 700,
//                     color: '#2C5284',
//                     lineHeight: '16px'
//                   }}>
//                     {totalWorkHours}
//                   </span>

//                   <span style={{
//                     fontSize: 9,
//                     color: '#9ca3af',
//                     marginTop: 2
//                   }}>
//                     Total Hrs
//                   </span>

//                 </div>

//               </div>

//               {/* STATUS */}
//               <span className={`mt-2 px-3 py-0.5 rounded-full text-[11px] font-semibold ${statusStyle}`}>
//                 {status || 'N/A'}
//               </span>
//             </div>

//             {/* CLOCK CARDS */}
//             <div className="flex-1 grid grid-cols-2 gap-1">

//               <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-1">
//                 <p className="text-[7px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
//                   First Clock In
//                 </p>
//                 <p className="text-[18px] font-bold text-gray-900 dark:text-gray-100 leading-tight">
//                   {firstCheckIn}
//                 </p>
//               </div>

//               <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
//                 <p className="text-[7px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
//                   Last Clock Out
//                 </p>
//                 <p className="text-[18px] font-bold text-gray-900 dark:text-gray-100 leading-tight">
//                   {lastCheckOut}
//                 </p>
//               </div>

//             </div>
//           </div>

//           {/* TOTAL HOURS */}
//           <div className="bg-[#2C5284] rounded-xl px-5 py-3.5 flex items-center justify-between">
//             <span className="text-white font-semibold text-sm">
//               Total Work Hours
//             </span>
//             <span className="text-white font-bold text-[18px]">
//               {totalWorkHours}
//             </span>
//           </div>

//           {/* SESSIONS */}
//           {sessions.length > 0 && (
//             <div>

//               <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
//                 Sessions ({sessions.length})
//               </p>

//               <div className="space-y-2">

//                 {sessions.map((s, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3"
//                   >

//                     <div className="w-7 h-7 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                       <span className="text-white text-xs font-bold">
//                         {i + 1}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-1.5 flex-1 text-sm">
//                       <FiClock size={13} className="text-[#2C5284] dark:text-blue-400 flex-shrink-0" />

//                       <span className="font-semibold text-[#2C5284] dark:text-blue-300 whitespace-nowrap">
//                         {s.checkIn || '--'}
//                       </span>

//                       <span className="text-gray-400 mx-0.5">→</span>

//                       <span className="font-semibold text-[#2C5284] dark:text-blue-300 whitespace-nowrap">
//                         {s.checkOut || '--'}
//                       </span>
//                     </div>

//                     <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 px-3 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
//                       {s.workHours || '0h 0m'}
//                     </span>

//                   </div>
//                 ))}

//               </div>

//             </div>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default EmployeeAttendanceModal;















import { useEffect, useRef } from 'react';
import { FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

function EmployeeAttendanceModal({ record, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!record) return null;

  const {
    date = '',
    shift = '',
    status = '',
    firstCheckIn = '--',
    lastCheckOut = '--',
    totalWorkHours = '0h 0m',
    sessions = [],
  } = record;

  // Parse "5h 2m" → minutes
  const parseMinutes = (str) => {
    if (!str) return 0;
    const h = str.match(/(\d+)h/);
    const m = str.match(/(\d+)m/);
    return (h ? parseInt(h[1]) * 60 : 0) + (m ? parseInt(m[1]) : 0);
  };

  const SHIFT_MINUTES = 9 * 60;
  const progress = Math.min(parseMinutes(totalWorkHours) / SHIFT_MINUTES, 1);

  // SVG Ring - FIXED VERSION
  const stroke = 9;
  const size = 120;
  const center = size / 2;
  const radius = center - stroke; // Clean radius calculation

  const circumference = 2 * Math.PI * radius;
  const filled = circumference * progress;
  const gap = circumference - filled;

  // Format date
  const formatDate = (d) => {
    if (!d) return '';
    try {
      const dt = new Date(d + 'T00:00:00');
      const day = dt.toLocaleDateString('en-US', { weekday: 'long' });
      const [y, mo, da] = d.split('-');
      return `${da}-${mo}-${y} (${day})`;
    } catch {
      return d;
    }
  };

  const isMorning = shift === 'Morning';

  const statusStyle = {
    Present: 'bg-green-100 text-green-700',
    Absent: 'bg-red-100 text-red-700',
    Leave: 'bg-yellow-100 text-yellow-700',
  }[status] ?? 'bg-gray-100 text-gray-600';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white dark:bg-[#1e2130] rounded-2xl shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="bg-[#2C5284] px-5 py-4 rounded-t-2xl flex items-start justify-between gap-2">
          <div>
            <h2 className="text-[17px] font-bold text-white leading-snug">
              Attendance Details
            </h2>
            <p className="text-blue-200 text-[11px] mt-0.5">
              {formatDate(date)}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
            {shift && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold
                ${isMorning ? 'bg-amber-400/20 text-amber-200' : 'bg-indigo-400/20 text-indigo-200'}`}>
                {isMorning ? <FaSun size={10} /> : <FaMoon size={10} />}
                {shift} Shift
              </span>
            )}

            <button
              onClick={onClose}
              className="text-white hover:bg-white/15 rounded-full p-1.5 transition-colors"
            >
              <FaTimes size={15} />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-4">

          {/* Ring + Cards */}
          <div className="flex items-center gap-4">

            {/* RING - FIXED VERSION */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="relative" style={{ width: 120, height: 120 }}>
                {/* SVG Circle */}
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  style={{ transform: 'rotate(-90deg)' }}
                >
                  {/* Background circle */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                  />
                  
                  {/* Progress circle */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="#2C5284"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${filled} ${gap}`}
                    style={{ transition: 'stroke-dasharray 0.7s ease' }}
                  />
                </svg>

                {/* Center text - properly centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[14px] font-bold text-[#2C5284] dark:text-blue-400 leading-none">
                    {totalWorkHours}
                  </span>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-1">
                    Total Hrs
                  </span>
                </div>
              </div>

              {/* STATUS */}
              <span className={`mt-2 px-3 py-0.5 rounded-full text-[11px] font-semibold ${statusStyle}`}>
                {status || 'N/A'}
              </span>
            </div>

            {/* CLOCK CARDS */}
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                <p className="text-[7px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                  First Clock In
                </p>
                <p className="text-[18px] font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {firstCheckIn}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                <p className="text-[7px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                  Last Clock Out
                </p>
                <p className="text-[18px] font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {lastCheckOut}
                </p>
              </div>
            </div>
          </div>

          {/* TOTAL HOURS */}
          <div className="bg-[#2C5284] rounded-xl px-5 py-3.5 flex items-center justify-between">
            <span className="text-white font-semibold text-sm">
              Total Work Hours
            </span>
            <span className="text-white font-bold text-[18px]">
              {totalWorkHours}
            </span>
          </div>

          {/* SESSIONS */}
          {sessions.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Sessions ({sessions.length})
              </p>

              <div className="space-y-2">
                {sessions.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {i + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-1 text-sm">
                      <FiClock size={13} className="text-[#2C5284] dark:text-blue-400 flex-shrink-0" />

                      <span className="font-semibold text-[#2C5284] dark:text-blue-300 whitespace-nowrap">
                        {s.checkIn || '--'}
                      </span>

                      <span className="text-gray-400 mx-0.5">→</span>

                      <span className="font-semibold text-[#2C5284] dark:text-blue-300 whitespace-nowrap">
                        {s.checkOut || '--'}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 px-3 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                      {s.workHours || '0h 0m'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeAttendanceModal;