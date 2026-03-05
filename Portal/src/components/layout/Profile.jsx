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





import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CgProfile } from 'react-icons/cg'
import { FaSun, FaMoon, FaCloudMoon, FaShieldAlt } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
import { MdBadge } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})

function getInitials(name) {
  if (!name || !name.trim()) return null
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function ShiftBadge({ shift }) {
  if (!shift) return null
  const config = {
    AM:    { label: 'Morning Shift',   icon: <FaSun size={10} />,      className: 'bg-amber-100 text-amber-700 border-amber-200' },
    PM:    { label: 'Afternoon Shift', icon: <FaMoon size={10} />,     className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    Night: { label: 'Night Shift',     icon: <FaCloudMoon size={10} />, className: 'bg-slate-100 text-slate-700 border-slate-200' },
    // Support new Morning/Evening values too
    Morning: { label: 'Morning Shift', icon: <FaSun size={10} />,  className: 'bg-amber-100 text-amber-700 border-amber-200' },
    Evening: { label: 'Evening Shift', icon: <FaMoon size={10} />, className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  }
  const c = config[shift]
  if (!c) return null
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${c.className}`}>
      {c.icon} {c.label}
    </span>
  )
}

// ── Designation badge colors ───────────────────────────────────────────────────
const DESIGNATION_COLORS = {
  'Frontend Developer':   'bg-blue-100 text-blue-700 border-blue-200',
  'Backend Developer':    'bg-purple-100 text-purple-700 border-purple-200',
  'Full Stack Developer': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Mobile Developer':     'bg-cyan-100 text-cyan-700 border-cyan-200',
  'UI/UX Designer':       'bg-pink-100 text-pink-700 border-pink-200',
  'DevOps Engineer':      'bg-orange-100 text-orange-700 border-orange-200',
  'QA Engineer':          'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Project Manager':      'bg-green-100 text-green-700 border-green-200',
  'Product Manager':      'bg-teal-100 text-teal-700 border-teal-200',
  'Data Analyst':         'bg-lime-100 text-lime-700 border-lime-200',
  'Data Scientist':       'bg-emerald-100 text-emerald-700 border-emerald-200',
  'HR Manager':           'bg-rose-100 text-rose-700 border-rose-200',
  'Marketing Manager':    'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
  'Sales Manager':        'bg-amber-100 text-amber-700 border-amber-200',
  'Accountant':           'bg-sky-100 text-sky-700 border-sky-200',
  'Other':                'bg-gray-100 text-gray-700 border-gray-200',
}

function DesignationBadge({ designation }) {
  if (!designation) return null
  const color = DESIGNATION_COLORS[designation] || 'bg-gray-100 text-gray-700 border-gray-200'
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
      <MdBadge size={13} />
      {designation}
    </span>
  )
}

export default function Profile({ setTitle, userName, userEmail, userRole, userShift, userDesignation, onNameUpdate }) {
  const navigate = useNavigate()

  const [name, setName]           = useState(userName || '')
  const [nameLoading, setNameLoading] = useState(false)
  const nameChanged = name.trim() !== (userName || '').trim()
  const nameAtLimit = name.length >= 14

  const [showPassword, setShowPassword] = useState(false)
  const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [pwLoading, setPwLoading] = useState(false)

  useEffect(() => {
    setTitle && setTitle('My Profile')
  }, [setTitle])

  useEffect(() => {
    setName(userName || '')
  }, [userName])

  const handleSaveName = async () => {
    if (!nameChanged) return
    if (name.trim().length === 0) { toast.error('Name cannot be empty'); return }
    setNameLoading(true)
    try {
      const res = await api.put('/auth/update-profile', { name: name.trim() })
      toast.success('Name updated successfully!')
      onNameUpdate && onNameUpdate(res.data.user.name)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update name')
    } finally {
      setNameLoading(false)
    }
  }

  const handleSavePassword = async () => {
    if (!pwForm.oldPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
      toast.error('Please fill in all password fields'); return
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error('New passwords do not match'); return
    }
    if (pwForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters'); return
    }
    setPwLoading(true)
    try {
      await api.post('/auth/change-password', {
        oldPassword: pwForm.oldPassword,
        newPassword: pwForm.newPassword,
      })
      toast.success('Password changed successfully!')
      setPwForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
      setShowPassword(false)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password')
    } finally {
      setPwLoading(false)
    }
  }

  const initials = getInitials(name || userName)

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-lg mx-auto">

        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-[#2C5284] dark:text-blue-400 hover:underline flex items-center gap-1">
          ← Back
        </button>

        {/* Avatar Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-4 flex flex-col items-center text-center transition-colors duration-300">
          <div className="w-20 h-20 rounded-full bg-[#2C5284] dark:bg-blue-600 flex items-center justify-center mb-4 shadow-lg">
            {initials
              ? <span className="text-white text-2xl font-bold">{initials}</span>
              : <CgProfile size={40} className="text-white" />
            }
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{userName || 'No Name Set'}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{userEmail}</p>

          {/* Role + Shift badges */}
          <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize border
              ${userRole === 'admin'
                ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700'
                : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700'}`}>
              {userRole}
            </span>
            {userShift && <ShiftBadge shift={userShift} />}
          </div>

          {/* ── Designation badge ── */}
          {userDesignation && (
            <div className="mt-3">
              <DesignationBadge designation={userDesignation} />
            </div>
          )}
        </div>

        {/* Edit Name Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-4 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#2C5284]/10 dark:bg-blue-500/10 flex items-center justify-center">
              <AiOutlineUser size={16} className="text-[#2C5284] dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Full Name</h3>
          </div>

          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={14}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border rounded-xl outline-none text-sm transition-all focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500 focus:border-transparent pr-16
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                ${nameAtLimit ? 'border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-500' : 'border-gray-200 dark:border-gray-600'}`}
            />
            <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium
              ${nameAtLimit ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>
              {name.length}/14
            </span>
          </div>

          {nameAtLimit && <p className="text-xs text-orange-500 mt-1.5">Maximum 14 characters reached</p>}

          {nameChanged && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setName(userName || '')}
                className="flex-1 py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveName}
                disabled={nameLoading}
                className="flex-1 py-2.5 text-sm font-semibold bg-[#2C5284] dark:bg-blue-600 text-white rounded-xl hover:bg-[#365F8D] dark:hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {nameLoading ? 'Saving…' : 'Save Name'}
              </button>
            </div>
          )}
        </div>

        {/* Designation info card — shown when designation is set */}
        {userDesignation && (
          <div className={`rounded-2xl border p-5 mb-4 flex items-center gap-4 ${
            DESIGNATION_COLORS[userDesignation] || 'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center flex-shrink-0">
              <MdBadge size={22} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wide opacity-60">Your Designation</p>
              <p className="text-base font-bold mt-0.5">{userDesignation}</p>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <FaShieldAlt size={14} className="text-[#2C5284] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#2C5284] leading-relaxed">
            Your name is displayed in the sidebar and across the portal. Keep it professional and under 14 characters.
          </p>
        </div>

      </div>
    </div>
  )
}