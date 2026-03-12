/**
 * Component: EmployeeAttendanceModal
 * Description: An administrative modal for viewing detailed attendance records, sessions, and work hours for a specific employee.
 * Why: To allow managers to deep-dive into an individual employee's attendance patterns and verify session-level clock-in/out data.
 */
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

  // ── Parse "5h 2m" → minutes ──────────────────────────────────────────────
  const parseMinutes = (str) => {
    if (!str) return 0;
    const h = str.match(/(\d+)h/);
    const m = str.match(/(\d+)m/);
    return (h ? parseInt(h[1]) * 60 : 0) + (m ? parseInt(m[1]) : 0);
  };

  const SHIFT_MINUTES = 9 * 60; // 9-hour shift
  const progress = Math.min(parseMinutes(totalWorkHours) / SHIFT_MINUTES, 1); // 0.0 – 1.0

  // ── SVG Ring — safe values that won't get clipped ──────────────────────────
  const SIZE = 120;
  const STROKE = 8;
  const RADIUS = (SIZE / 2) - (STROKE / 2) - 2; // 60 - 4 - 2 = 54
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const filledDash = CIRCUMFERENCE * progress;
  const gapDash = CIRCUMFERENCE - filledDash;

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

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <div className="bg-[#2C5284] px-5 py-4 rounded-t-2xl flex items-start justify-between gap-2">
          <div>
            <h2 className="text-[17px] font-bold text-white leading-snug">Attendance Details</h2>
            <p className="text-blue-200 text-[11px] mt-0.5">{formatDate(date)}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
            {shift && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold
                ${isMorning ? 'bg-amber-400/20 text-amber-200' : 'bg-indigo-400/20 text-indigo-200'}`}>
                {isMorning ? <FaSun size={10} /> : <FaMoon size={10} />}
                {shift} Shift
              </span>
            )}
            <button onClick={onClose} className="text-white hover:bg-white/15 rounded-full p-1.5 transition-colors">
              <FaTimes size={15} />
            </button>
          </div>
        </div>

        {/* ── BODY ────────────────────────────────────────────────────── */}
        <div className="p-5 space-y-4">

          <div className="flex items-center gap-4">
            <div className="shrink-0 flex flex-col items-center">
              <div style={{ position: 'relative', width: 120, height: 120 }}>
                <svg
                  width="120"
                  height="120"
                  viewBox={`-7 -7 134 134`}
                  style={{ display: 'block', transform: 'rotate(-90deg)', overflow: 'visible' }}
                >
                  <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth={STROKE} />
                  <circle
                    cx={CX} cy={CY} r={RADIUS}
                    fill="none" stroke="#2C5284" strokeWidth={STROKE}
                    strokeLinecap="round" strokeDasharray={`${filledDash} ${gapDash}`}
                    style={{ transition: 'stroke-dasharray 0.7s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center transform translateY-[3px] pointer-events-none">
                  <span className="text-sm font-bold text-[#2C5284] dark:text-blue-300 leading-none">{totalWorkHours}</span>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-1 uppercase font-bold">Total Hrs</span>
                </div>
              </div>
              <span className={`mt-2 px-3 py-0.5 rounded-full text-[11px] font-semibold ${statusStyle}`}>
                {status || 'N/A'}
              </span>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-2">
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">First Clock In</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">{firstCheckIn}</p>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Last Clock Out</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">{lastCheckOut}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2C5284] rounded-xl px-5 py-3.5 flex items-center justify-between shadow-sm">
            <span className="text-white font-semibold text-sm">Total Work Hours</span>
            <span className="text-white font-bold text-lg">{totalWorkHours}</span>
          </div>

          {sessions.length > 0 && (
            <div>
              <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Sessions ({sessions.length})</p>
              <div className="space-y-2">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3 border border-gray-100 dark:border-white/5">
                    <div className="w-7 h-7 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-1 text-sm">
                      <FiClock size={13} className="text-[#2C5284] dark:text-blue-400 flex-shrink-0" />
                      <span className="font-semibold text-[#2C5284] dark:text-blue-300 whitespace-nowrap">{s.checkIn || '--'}</span>
                      <span className="text-gray-400 mx-0.5">→</span>
                      <span className="font-semibold text-[#2C5284] dark:text-blue-300 whitespace-nowrap">{s.checkOut || '--'}</span>
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
  const CX = SIZE / 2;
//   const CY = SIZE / 2;
//   const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
//   const filledDash = CIRCUMFERENCE * progress;
//   const gapDash = CIRCUMFERENCE - filledDash;

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
//     Absent:  'bg-red-100 text-red-700',
//     Leave:   'bg-yellow-100 text-yellow-700',
//   }[status] ?? 'bg-gray-100 text-gray-600';

//   return (
//     <div
//       ref={overlayRef}
//       className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
//       onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
//     >
//       <div className="bg-white dark:bg-[#1e2130] rounded-2xl shadow-2xl w-full max-w-130 max-h-[90vh] overflow-y-auto">

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

//             {/* ── RING — Fixed ── */}
//             <div className="shrink-0 flex flex-col items-center p-1">
//               <div className="relative" style={{ width: SIZE, height: SIZE }}>

//                 {/*
//                   overflow="visible" ensures the rounded stroke caps are never
//                   clipped by the SVG viewport even if they extend beyond the edge.
//                   The transform: rotate(-90deg) makes the arc start at 12 o'clock.
//                 */}
//                 <svg
//                   width={SIZE}
//                   height={SIZE}
//                   viewBox={`0 0 ${SIZE} ${SIZE}`}
//                   style={{ display: 'block', transform: 'rotate(-90deg)', overflow: 'visible' }}
//                 >
//                   {/* Grey track */}
//                   <circle
//                     cx={CX}
//                     cy={CY}
//                     r={RADIUS}
//                     fill="none"
//                     stroke="#e2e8f0"
//                     strokeWidth={STROKE}
//                   />
//                   {/* Blue progress arc */}
//                   <circle
//                     cx={CX}
//                     cy={CY}
//                     r={RADIUS}
//                     fill="none"
//                     stroke="#2C5284"
//                     strokeWidth={STROKE}
//                     strokeLinecap="round"
//                     strokeDasharray={`${filledDash} ${gapDash}`}
//                     style={{ transition: 'stroke-dasharray 0.7s ease' }}
//                   />
//                 </svg>

//                 {/* Center text — absolutely centred, unaffected by SVG rotation */}
//                 <div
//                   className="absolute inset-0 flex flex-col items-center justify-center"
//                   style={{ pointerEvents: 'none' }}
//                 >
//                   <span className="text-[13px] font-bold text-[#2C5284] dark:text-blue-400 leading-none">
//                     {totalWorkHours}
//                   </span>
//                   <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-1">
//                     Total Hrs
//                   </span>
//                 </div>
//               </div>

//               {/* Status badge */}
//               <span className={`mt-2 px-3 py-0.5 rounded-full text-[11px] font-semibold ${statusStyle}`}>
//                 {status || 'N/A'}
//               </span>
//             </div>

//             {/* CLOCK CARDS */}
//             <div className="flex-1 grid grid-cols-2 gap-2">
//               <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
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

//           {/* TOTAL HOURS BANNER */}
//           <div className="bg-[#2C5284] rounded-xl px-5 py-3.5 flex items-center justify-between">
//             <span className="text-white font-semibold text-sm">Total Work Hours</span>
//             <span className="text-white font-bold text-[18px]">{totalWorkHours}</span>
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

    const SIZE = 120;
    const STROKE = 8;
    const RADIUS = (SIZE / 2) - (STROKE / 2) - 2;
    const CX = SIZE / 2;
    const CY = SIZE / 2;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const filledDash = CIRCUMFERENCE * progress;
    const gapDash = CIRCUMFERENCE - filledDash;

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
      Absent:  'bg-red-100 text-red-700',
      Leave:   'bg-yellow-100 text-yellow-700',
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

              {/* ── RING ── */}
              <div className="shrink-0 flex flex-col items-center p-1">
                <div className="relative" style={{ width: SIZE, height: SIZE }}>

                  <svg
                    width={SIZE}
                    height={SIZE}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    style={{ display: 'block', transform: 'rotate(-90deg)', overflow: 'visible' }}
                  >
                    {/* Grey track */}
                    <circle
                      cx={CX}
                      cy={CY}
                      r={RADIUS}
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth={STROKE}
                    />
                    {/* Blue progress arc */}
                    <circle
                      cx={CX}
                      cy={CY}
                      r={RADIUS}
                      fill="none"
                      stroke="#2C5284"
                      strokeWidth={STROKE}
                      strokeLinecap="round"
                      strokeDasharray={`${filledDash} ${gapDash}`}
                      style={{ transition: 'stroke-dasharray 0.7s ease' }}
                    />
                  </svg>

                  {/* Center text */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ pointerEvents: 'none' }}
                  >
                    <span className="text-[13px] font-bold text-[#2C5284] dark:text-blue-400 leading-none">
                      {totalWorkHours}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-1">
                      Total Hrs
                    </span>
                  </div>
                </div>

                {/* Status badge */}
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

            {/* TOTAL HOURS BANNER */}
            <div className="bg-[#2C5284] rounded-xl px-5 py-3.5 flex items-center justify-between">
              <span className="text-white font-semibold text-sm">Total Work Hours</span>
              <span className="text-white font-bold text-[18px]">{totalWorkHours}</span>
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
                        <span className="text-white text-xs font-bold">{i + 1}</span>
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

                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-white/10 border
  border-gray-200 dark:border-white/10 px-3 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
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