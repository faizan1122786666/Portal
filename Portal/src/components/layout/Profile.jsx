// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { CgProfile } from 'react-icons/cg'
// import { FaSun, FaMoon, FaCloudMoon, FaChevronDown, FaChevronUp, FaShieldAlt } from 'react-icons/fa'
// import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
// import { useNavigate } from 'react-router-dom'

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   withCredentials: true,
// })

// function getInitials(name) {
//   if (!name || !name.trim()) return null
//   const parts = name.trim().split(/\s+/)
//   if (parts.length === 1) return parts[0][0].toUpperCase()
//   return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
// }

// function ShiftBadge({ shift }) {
//   if (!shift) return null
//   const config = {
//     AM: { label: 'Morning Shift', icon: <FaSun size={10} />, className: 'bg-amber-100 text-amber-700 border-amber-200' },
//     PM: { label: 'Afternoon Shift', icon: <FaMoon size={10} />, className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
//     Night: { label: 'Night Shift', icon: <FaCloudMoon size={10} />, className: 'bg-slate-100 text-slate-700 border-slate-200' },
//   }
//   const c = config[shift]
//   if (!c) return null
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${c.className}`}>
//       {c.icon} {c.label}
//     </span>
//   )
// }

// export default function Profile({ setTitle, userName, userEmail, userRole, userShift, onNameUpdate }) {
//   const navigate = useNavigate()

//   const [name, setName] = useState(userName || '')
//   const [nameLoading, setNameLoading] = useState(false)
//   const nameChanged = name.trim() !== (userName || '').trim()
//   const nameAtLimit = name.length >= 14

//   const [showPassword, setShowPassword] = useState(false)
//   const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
//   const [pwLoading, setPwLoading] = useState(false)

//   useEffect(() => {
//     setTitle && setTitle('My Profile')
//   }, [setTitle])

//   useEffect(() => {
//     setName(userName || '')
//   }, [userName])

//   const handleSaveName = async () => {
//     if (!nameChanged) return
//     if (name.trim().length === 0) { toast.error('Name cannot be empty'); return }
//     setNameLoading(true)
//     try {
//       const res = await api.put('/auth/update-profile', { name: name.trim() })
//       toast.success('Name updated successfully!')
//       onNameUpdate && onNameUpdate(res.data.user.name)
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to update name')
//     } finally {
//       setNameLoading(false)
//     }
//   }

//   const handleSavePassword = async () => {
//     if (!pwForm.oldPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
//       toast.error('Please fill in all password fields'); return
//     }
//     if (pwForm.newPassword !== pwForm.confirmPassword) {
//       toast.error('New passwords do not match'); return
//     }
//     if (pwForm.newPassword.length < 6) {
//       toast.error('New password must be at least 6 characters'); return
//     }
//     setPwLoading(true)
//     try {
//       await api.post('/auth/change-password', {
//         oldPassword: pwForm.oldPassword,
//         newPassword: pwForm.newPassword,
//       })
//       toast.success('Password changed successfully!')
//       setPwForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
//       setShowPassword(false)
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to change password')
//     } finally {
//       setPwLoading(false)
//     }
//   }

//   const initials = getInitials(name || userName)

//   return (
//     <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
//       <div className="max-w-lg mx-auto">

//         <button onClick={() => navigate(-1)} className="mb-6 text-sm text-[#2C5284] dark:text-blue-400 hover:underline flex items-center gap-1">
//           ← Back
//         </button>

//         {/* Avatar Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-4 flex flex-col items-center text-center transition-colors duration-300">
//           <div className="w-20 h-20 rounded-full bg-[#2C5284] dark:bg-blue-600 flex items-center justify-center mb-4 shadow-lg">
//             {initials
//               ? <span className="text-white text-2xl font-bold">{initials}</span>
//               : <CgProfile size={40} className="text-white" />
//             }
//           </div>
//           <h2 className="text-lg font-bold text-gray-900 dark:text-white">{userName || 'No Name Set'}</h2>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{userEmail}</p>
//           <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
//             <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize border
//               ${userRole === 'admin'
//                 ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700'
//                 : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700'}`}>
//               {userRole}
//             </span>
//             {userShift && <ShiftBadge shift={userShift} />}
//           </div>
//         </div>

//         {/* Edit Name Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-4 transition-colors duration-300">
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-8 h-8 rounded-full bg-[#2C5284]/10 dark:bg-blue-500/10 flex items-center justify-center">
//               <AiOutlineUser size={16} className="text-[#2C5284] dark:text-blue-400" />
//             </div>
//             <h3 className="font-semibold text-gray-800 dark:text-gray-200">Full Name</h3>
//           </div>

//           <div className="relative">
//             <input
//               type="text"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               maxLength={14}
//               placeholder="Enter your full name"
//               className={`w-full px-4 py-3 border rounded-xl outline-none text-sm transition-all focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500 focus:border-transparent pr-16
//                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
//                 ${nameAtLimit ? 'border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-500' : 'border-gray-200 dark:border-gray-600'}`}
//             />
//             <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium
//               ${nameAtLimit ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>
//               {name.length}/14
//             </span>
//           </div>

//           {nameAtLimit && <p className="text-xs text-orange-500 mt-1.5">Maximum 14 characters reached</p>}

//           {nameChanged && (
//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={() => setName(userName || '')}
//                 className="flex-1 py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveName}
//                 disabled={nameLoading}
//                 className="flex-1 py-2.5 text-sm font-semibold bg-[#2C5284] dark:bg-blue-600 text-white rounded-xl hover:bg-[#365F8D] dark:hover:bg-blue-700 transition-colors disabled:opacity-60"
//               >
//                 {nameLoading ? 'Saving…' : 'Save Name'}
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
//           <FaShieldAlt size={14} className="text-[#2C5284] mt-0.5 flex-shrink-0" />
//           <p className="text-xs text-[#2C5284] leading-relaxed">
//             Your name is displayed in the sidebar and across the portal. Keep it professional and under 14 characters.
//           </p>
//         </div>

//       </div>
//     </div>
//   )
// }





// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { CgProfile } from 'react-icons/cg'
// import { FaSun, FaMoon, FaCloudMoon, FaShieldAlt } from 'react-icons/fa'
// import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
// import { MdBadge } from 'react-icons/md'
// import { useNavigate } from 'react-router-dom'

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   withCredentials: true,
// })

// function getInitials(name) {
//   if (!name || !name.trim()) return null
//   const parts = name.trim().split(/\s+/)
//   if (parts.length === 1) return parts[0][0].toUpperCase()
//   return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
// }

// function ShiftBadge({ shift }) {
//   if (!shift) return null
//   const config = {
//     AM:    { label: 'Morning Shift',   icon: <FaSun size={10} />,      className: 'bg-amber-100 text-amber-700 border-amber-200' },
//     PM:    { label: 'Afternoon Shift', icon: <FaMoon size={10} />,     className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
//     Night: { label: 'Night Shift',     icon: <FaCloudMoon size={10} />, className: 'bg-slate-100 text-slate-700 border-slate-200' },
//     // Support new Morning/Evening values too
//     Morning: { label: 'Morning Shift', icon: <FaSun size={10} />,  className: 'bg-amber-100 text-amber-700 border-amber-200' },
//     Evening: { label: 'Evening Shift', icon: <FaMoon size={10} />, className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
//   }
//   const c = config[shift]
//   if (!c) return null
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${c.className}`}>
//       {c.icon} {c.label}
//     </span>
//   )
// }

// // ── Designation badge colors ───────────────────────────────────────────────────
// const DESIGNATION_COLORS = {
//   'Frontend Developer':   'bg-blue-100 text-blue-700 border-blue-200',
//   'Backend Developer':    'bg-purple-100 text-purple-700 border-purple-200',
//   'Full Stack Developer': 'bg-indigo-100 text-indigo-700 border-indigo-200',
//   'Mobile Developer':     'bg-cyan-100 text-cyan-700 border-cyan-200',
//   'UI/UX Designer':       'bg-pink-100 text-pink-700 border-pink-200',
//   'DevOps Engineer':      'bg-orange-100 text-orange-700 border-orange-200',
//   'QA Engineer':          'bg-yellow-100 text-yellow-700 border-yellow-200',
//   'Project Manager':      'bg-green-100 text-green-700 border-green-200',
//   'Product Manager':      'bg-teal-100 text-teal-700 border-teal-200',
//   'Data Analyst':         'bg-lime-100 text-lime-700 border-lime-200',
//   'Data Scientist':       'bg-emerald-100 text-emerald-700 border-emerald-200',
//   'HR Manager':           'bg-rose-100 text-rose-700 border-rose-200',
//   'Marketing Manager':    'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
//   'Sales Manager':        'bg-amber-100 text-amber-700 border-amber-200',
//   'Accountant':           'bg-sky-100 text-sky-700 border-sky-200',
//   'Other':                'bg-gray-100 text-gray-700 border-gray-200',
// }

// function DesignationBadge({ designation }) {
//   if (!designation) return null
//   const color = DESIGNATION_COLORS[designation] || 'bg-gray-100 text-gray-700 border-gray-200'
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
//       <MdBadge size={13} />
//       {designation}
//     </span>
//   )
// }

// export default function Profile({ setTitle, userName, userEmail, userRole, userShift, userDesignation, onNameUpdate }) {
//   const navigate = useNavigate()

//   const [name, setName]           = useState(userName || '')
//   const [nameLoading, setNameLoading] = useState(false)
//   const nameChanged = name.trim() !== (userName || '').trim()
//   const nameAtLimit = name.length >= 14

//   const [showPassword, setShowPassword] = useState(false)
//   const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
//   const [pwLoading, setPwLoading] = useState(false)

//   useEffect(() => {
//     setTitle && setTitle('My Profile')
//   }, [setTitle])

//   useEffect(() => {
//     setName(userName || '')
//   }, [userName])

//   const handleSaveName = async () => {
//     if (!nameChanged) return
//     if (name.trim().length === 0) { toast.error('Name cannot be empty'); return }
//     setNameLoading(true)
//     try {
//       const res = await api.put('/auth/update-profile', { name: name.trim() })
//       toast.success('Name updated successfully!')
//       onNameUpdate && onNameUpdate(res.data.user.name)
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to update name')
//     } finally {
//       setNameLoading(false)
//     }
//   }

//   const handleSavePassword = async () => {
//     if (!pwForm.oldPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
//       toast.error('Please fill in all password fields'); return
//     }
//     if (pwForm.newPassword !== pwForm.confirmPassword) {
//       toast.error('New passwords do not match'); return
//     }
//     if (pwForm.newPassword.length < 6) {
//       toast.error('New password must be at least 6 characters'); return
//     }
//     setPwLoading(true)
//     try {
//       await api.post('/auth/change-password', {
//         oldPassword: pwForm.oldPassword,
//         newPassword: pwForm.newPassword,
//       })
//       toast.success('Password changed successfully!')
//       setPwForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
//       setShowPassword(false)
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to change password')
//     } finally {
//       setPwLoading(false)
//     }
//   }

//   const initials = getInitials(name || userName)

//   return (
//     <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
//       <div className="max-w-lg mx-auto">

//         <button onClick={() => navigate(-1)} className="mb-6 text-sm text-[#2C5284] dark:text-blue-400 hover:underline flex items-center gap-1">
//           ← Back
//         </button>

//         {/* Avatar Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-4 flex flex-col items-center text-center transition-colors duration-300">
//           <div className="w-20 h-20 rounded-full bg-[#2C5284] dark:bg-blue-600 flex items-center justify-center mb-4 shadow-lg">
//             {initials
//               ? <span className="text-white text-2xl font-bold">{initials}</span>
//               : <CgProfile size={40} className="text-white" />
//             }
//           </div>
//           <h2 className="text-lg font-bold text-gray-900 dark:text-white">{userName || 'No Name Set'}</h2>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{userEmail}</p>

//           {/* Role + Shift badges */}
//           <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
//             <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize border
//               ${userRole === 'admin'
//                 ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700'
//                 : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700'}`}>
//               {userRole}
//             </span>
//             {userShift && <ShiftBadge shift={userShift} />}
//           </div>

//           {/* ── Designation badge ── */}
//           {userDesignation && (
//             <div className="mt-3">
//               <DesignationBadge designation={userDesignation} />
//             </div>
//           )}
//         </div>

//         {/* Edit Name Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-4 transition-colors duration-300">
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-8 h-8 rounded-full bg-[#2C5284]/10 dark:bg-blue-500/10 flex items-center justify-center">
//               <AiOutlineUser size={16} className="text-[#2C5284] dark:text-blue-400" />
//             </div>
//             <h3 className="font-semibold text-gray-800 dark:text-gray-200">Full Name</h3>
//           </div>

//           <div className="relative">
//             <input
//               type="text"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               maxLength={14}
//               placeholder="Enter your full name"
//               className={`w-full px-4 py-3 border rounded-xl outline-none text-sm transition-all focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500 focus:border-transparent pr-16
//                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
//                 ${nameAtLimit ? 'border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-500' : 'border-gray-200 dark:border-gray-600'}`}
//             />
//             <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium
//               ${nameAtLimit ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>
//               {name.length}/14
//             </span>
//           </div>

//           {nameAtLimit && <p className="text-xs text-orange-500 mt-1.5">Maximum 14 characters reached</p>}

//           {nameChanged && (
//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={() => setName(userName || '')}
//                 className="flex-1 py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveName}
//                 disabled={nameLoading}
//                 className="flex-1 py-2.5 text-sm font-semibold bg-[#2C5284] dark:bg-blue-600 text-white rounded-xl hover:bg-[#365F8D] dark:hover:bg-blue-700 transition-colors disabled:opacity-60"
//               >
//                 {nameLoading ? 'Saving…' : 'Save Name'}
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Designation info card — shown when designation is set */}
//         {userDesignation && (
//           <div className={`rounded-2xl border p-5 mb-4 flex items-center gap-4 ${
//             DESIGNATION_COLORS[userDesignation] || 'bg-gray-50 text-gray-700 border-gray-200'
//           }`}>
//             <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center flex-shrink-0">
//               <MdBadge size={22} />
//             </div>
//             <div>
//               <p className="text-xs uppercase font-bold tracking-wide opacity-60">Your Designation</p>
//               <p className="text-base font-bold mt-0.5">{userDesignation}</p>
//             </div>
//           </div>
//         )}

//         <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
//           <FaShieldAlt size={14} className="text-[#2C5284] mt-0.5 flex-shrink-0" />
//           <p className="text-xs text-[#2C5284] leading-relaxed">
//             Your name is displayed in the sidebar and across the portal. Keep it professional and under 14 characters.
//           </p>
//         </div>

//       </div>
//     </div>
//   )
// }













import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaSun, FaMoon, FaEnvelope, FaBriefcase, FaBuilding, FaDollarSign, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';
import { MdBadge, MdWorkOutline, MdPhotoCamera } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthContext } from '../../context';
import ChangePassword from '../../pages/Auth/ChangePassword';

// ── Shift badge ───────────────────────────────────────────────────────────────
function ShiftBadge({ shift }) {
  if (!shift) return <span className="text-gray-400 text-sm">Not assigned</span>;
  const isMorning = shift === 'Morning';
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
      ${isMorning ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}`}>
      {isMorning ? <FaSun size={11} /> : <FaMoon size={11} />}
      {isMorning ? 'Morning (9:00 AM – 6:00 PM)' : 'Evening (6:00 PM – 3:00 AM)'}
    </span>
  );
}

// ── Info Row ──────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, iconColor = 'text-[#2C5284]' }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className={`w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 ${iconColor}`}>
        <Icon size={17} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
        <div className="text-sm font-medium text-gray-800">{value}</div>
      </div>
    </div>
  );
}

// ── Edit Name Modal ───────────────────────────────────────────────────────────
function EditNameModal({ currentName, onClose, onSave }) {
  const [name, setName] = useState(currentName || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Name cannot be empty.');
    if (name.trim().length > 14) return setError('Name cannot exceed 14 characters.');
    setLoading(true);
    try {
      const res = await axios.put(
        'http://localhost:3000/api/auth/update-profile',
        { name: name.trim() },
        { withCredentials: true }
      );
      toast.success('Profile updated successfully!');
      onSave(res.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="bg-[#2C5284] p-5 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Edit Display Name</h2>
          <button onClick={onClose} className="text-white hover:bg-white/10 rounded-full p-1.5 transition-colors">
            <FaTimes size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Full Name <span className="text-gray-400 font-normal">(max 14 characters)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={14}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm"
              placeholder="Enter your name..."
              autoFocus
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{name.length}/14</p>
          </div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#1e3a5f] transition-colors text-sm disabled:opacity-60">
              <FaCheck size={13} />
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Profile Component ────────────────────────────────────────────────────
function UserProfile({ setTitle, userDesignation, userProfileImage, onProfileUpdate }) {
  const { user } = useAuthContext();
  const [showEditName, setShowEditName] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    setUploading(true);
    try {
      console.log('Uploading file:', file.name, file.size);
      const response = await axios.post(
        'http://localhost:3000/api/auth/upload-profile-image',
        formData,
        {
          withCredentials: true
          // Removed manual Content-Type header to allow axios/browser to handle it
        }
      );

      toast.success('Profile image updated!');
      const updatedUser = response.data.user;
      const stored = localStorage.getItem('user');
      if (stored) {
        const fullUser = JSON.parse(stored);
        const merged = { ...fullUser, ...updatedUser };
        localStorage.setItem('user', JSON.stringify(merged));
        onProfileUpdate && onProfileUpdate(merged);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  const handleNameSaved = (updatedUser) => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const fullUser = JSON.parse(stored);
      const merged = { ...fullUser, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(merged));
      onProfileUpdate && onProfileUpdate(merged);
    }
  };

  const initials = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || '??';

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

      {/* ── Page Title ── */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">My Profile</h1>

      <div className="max-w-2xl mx-auto space-y-5">

        {/* ── Avatar Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-5">
          {/* Avatar with upload trigger */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden border-4 border-white">
              {(userProfileImage || user?.profileImage) ? (
                <img
                  src={(userProfileImage || user?.profileImage).startsWith('http') ? (userProfileImage || user?.profileImage) : `http://localhost:3000/uploads/profile/${userProfileImage || user.profileImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-white text-3xl font-bold">${initials}</span>`;
                  }}
                />
              ) : (
                <span className="text-white text-3xl font-bold">{initials}</span>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <label className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors">
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              <MdPhotoCamera size={16} className="text-[#2C5284]" />
            </label>
          </div>

          {/* Name + role */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900">
                {user?.name || <span className="text-gray-400 italic">No name set</span>}
              </h2>
              <button
                onClick={() => setShowEditName(true)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-[#2C5284] transition-colors"
                title="Edit name"
              >
                <FaEdit size={13} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                {user?.role || 'employee'}
              </span>
              {(userDesignation || user?.designation) && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                  {userDesignation || user.designation}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Details Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-bold text-gray-700 mb-1">Profile Details</h3>
          <p className="text-xs text-gray-400 mb-4">Information managed by your administrator</p>

          <InfoRow
            icon={FaEnvelope}
            label="Email Address"
            value={user?.email || '—'}
          />

          <InfoRow
            icon={MdBadge}
            label="Designation"
            value={
              (userDesignation || user?.designation)
                ? <span className="font-semibold text-[#2C5284]">{userDesignation || user.designation}</span>
                : <span className="text-gray-400 italic">Not assigned</span>
            }
          />

          <InfoRow
            icon={FaBuilding}
            label="Department"
            value={user?.department || <span className="text-gray-400 italic">Not assigned</span>}
          />

          <InfoRow
            icon={MdWorkOutline}
            label="Work Shift"
            value={<ShiftBadge shift={user?.shift} />}
          />

          {!isAdmin && (
            <InfoRow
              icon={FaDollarSign}
              label="Salary"
              value={
                user?.salary
                  ? <span className="font-semibold text-green-700">${Number(user.salary).toLocaleString()}</span>
                  : <span className="text-gray-400 italic">Not set</span>
              }
            />
          )}

          <InfoRow
            icon={FaBriefcase}
            label="Role"
            value={
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                {user?.role || '—'}
              </span>
            }
          />
        </div>

        {/* ── Account Actions Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-bold text-gray-700 mb-4">Account Settings</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowEditName(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-[#2C5284] hover:bg-blue-50/50 transition-all group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 group-hover:bg-[#2C5284] flex items-center justify-center transition-colors flex-shrink-0">
                <FaEdit size={15} className="text-[#2C5284] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Edit Display Name</p>
                <p className="text-xs text-gray-400">Update how your name appears in the portal</p>
              </div>
            </button>

            <button
              onClick={() => setShowChangePass(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-[#2C5284] hover:bg-blue-50/50 transition-all group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 group-hover:bg-[#2C5284] flex items-center justify-center transition-colors flex-shrink-0">
                <CgProfile size={17} className="text-[#2C5284] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Change Password</p>
                <p className="text-xs text-gray-400">Update your account password</p>
              </div>
            </button>
          </div>
        </div>

        {/* ── Read-only notice ── */}
        <p className="text-xs text-center text-gray-400 pb-4">
          Fields like designation, department, salary, and shift are managed by your administrator and cannot be changed here.
        </p>
      </div>

      {/* Modals */}
      {
        showEditName && (
          <EditNameModal
            currentName={user?.name}
            onClose={() => setShowEditName(false)}
            onSave={handleNameSaved}
          />
        )
      }
      {
        showChangePass && (
          <ChangePassword onClose={() => setShowChangePass(false)} />
        )
      }
    </div >
  );
}

export default UserProfile;