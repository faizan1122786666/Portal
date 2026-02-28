import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CgProfile } from 'react-icons/cg'
import { FaSun, FaMoon, FaCloudMoon, FaChevronDown, FaChevronUp, FaShieldAlt } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
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
    AM:    { label: 'Morning Shift', icon: <FaSun size={10} />,       className: 'bg-amber-100 text-amber-700 border-amber-200' },
    PM:    { label: 'Evening Shift', icon: <FaMoon size={10} />,      className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    Night: { label: 'Night Shift',   icon: <FaCloudMoon size={10} />, className: 'bg-slate-100 text-slate-700 border-slate-200' },
  }
  const c = config[shift]
  if (!c) return null
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${c.className}`}>
      {c.icon} {c.label}
    </span>
  )
}

export default function Profile({ setTitle, userName, userEmail, userRole, userShift, onNameUpdate }) {
  const navigate = useNavigate()

  const [name, setName]               = useState(userName || '')
  const [nameLoading, setNameLoading] = useState(false)
  const nameChanged = name.trim() !== (userName || '').trim()
  const nameAtLimit = name.length >= 14

  const [showPassword, setShowPassword] = useState(false)
  const [pwForm, setPwForm]             = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [pwLoading, setPwLoading]       = useState(false)

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
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-lg mx-auto">

        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-[#2C5284] hover:underline flex items-center gap-1">
          ← Back
        </button>

        {/* Avatar Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#2C5284] flex items-center justify-center mb-4 shadow-lg">
            {initials
              ? <span className="text-white text-2xl font-bold">{initials}</span>
              : <CgProfile size={40} className="text-white" />
            }
          </div>
          <h2 className="text-lg font-bold text-gray-900">{userName || 'No Name Set'}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{userEmail}</p>
          <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize border
              ${userRole === 'admin' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
              {userRole}
            </span>
            {userShift && <ShiftBadge shift={userShift} />}
          </div>
        </div>

        {/* Edit Name Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#2C5284]/10 flex items-center justify-center">
              <AiOutlineUser size={16} className="text-[#2C5284]" />
            </div>
            <h3 className="font-semibold text-gray-800">Full Name</h3>
          </div>

          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={14}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border rounded-xl outline-none text-sm transition-all focus:ring-2 focus:ring-[#2C5284] focus:border-transparent pr-16
                ${nameAtLimit ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`}
            />
            <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium
              ${nameAtLimit ? 'text-orange-500' : 'text-gray-400'}`}>
              {name.length}/14
            </span>
          </div>

          {nameAtLimit && <p className="text-xs text-orange-500 mt-1.5">Maximum 14 characters reached</p>}

          {nameChanged && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setName(userName || '')}
                className="flex-1 py-2.5 text-sm font-medium border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveName}
                disabled={nameLoading}
                className="flex-1 py-2.5 text-sm font-semibold bg-[#2C5284] text-white rounded-xl hover:bg-[#365F8D] transition-colors disabled:opacity-60"
              >
                {nameLoading ? 'Saving…' : 'Save Name'}
              </button>
            </div>
          )}
        </div>

        {/* Change Password Card */}
        {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          <button
            onClick={() => setShowPassword(v => !v)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2C5284]/10 flex items-center justify-center">
                <AiOutlineLock size={16} className="text-[#2C5284]" />
              </div>
              <h3 className="font-semibold text-gray-800">Change Password</h3>
            </div>
            {showPassword ? <FaChevronUp size={13} className="text-gray-400" /> : <FaChevronDown size={13} className="text-gray-400" />}
          </button>

          {showPassword && (
            <div className="px-6 pb-6 space-y-3 border-t border-gray-100 pt-5">
              {[
                { key: 'oldPassword',     label: 'Current Password', placeholder: 'Enter current password' },
                { key: 'newPassword',     label: 'New Password',     placeholder: 'At least 6 characters' },
                { key: 'confirmPassword', label: 'Confirm Password', placeholder: 'Repeat new password' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
                  <input
                    type="password"
                    value={pwForm[key]}
                    onChange={e => setPwForm(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-[#2C5284] focus:border-transparent"
                  />
                </div>
              ))}
              <button
                onClick={handleSavePassword}
                disabled={pwLoading}
                className="w-full py-3 mt-2 text-sm font-semibold bg-[#2C5284] text-white rounded-xl hover:bg-[#365F8D] transition-colors disabled:opacity-60"
              >
                {pwLoading ? 'Updating…' : 'Update Password'}
              </button>
            </div> */}
          {/* )}
        </div> */}

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