/**
 * Component: ChangePassword
 * Description: A security component allowing users to update their account password.
 * Why: To provide a secure mechanism for password rotation and account protection.
 */
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ChangePassword = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('All fields are required')
      return
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (formData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long')
      return
    }
    if (formData.oldPassword === formData.newPassword) {
      toast.error('New password must be different from old password')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/change-password',
        { 
          email: formData.email,
          oldPassword: formData.oldPassword, 
          newPassword: formData.newPassword 
        },
        { withCredentials: true }
      )
      toast.success(response.data.message || 'Password changed successfully!')
      setFormData({ email: '', oldPassword: '', newPassword: '', confirmPassword: '' })

      // Close modal after a short delay so the toast is visible
      setTimeout(() => {
        if (onClose) onClose()
      }, 1500)
    } catch (err) {
      if (err.response?.status === 401) {
        window.dispatchEvent(new CustomEvent('unauthorized-access'));
      }
      toast.error(err.response?.data?.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#2C5284] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm p-6 sm:p-8 m-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Change Password</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-body hover:text-heading transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block mb-2 sm:mb-2.5 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none text-gray-900 dark:text-white text-sm rounded-lg block w-full px-3 py-2.5 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#2C5282] dark:focus:ring-blue-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          {/* Old Password */}
          <div>
            <label htmlFor="oldPassword" className="block mb-2 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none text-gray-900 dark:text-white text-sm rounded-lg block w-full px-3 py-2.5 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#2C5282] dark:focus:ring-blue-500 transition-colors"
              placeholder="Enter your old password"
            />
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block mb-2 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none text-gray-900 dark:text-white text-xs sm:text-sm rounded-lg block w-full px-3 py-2.5 sm:py-2.5 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#2C5282] dark:focus:ring-blue-500 transition-colors"
              placeholder="Enter your new password"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
               className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none text-gray-900 dark:text-white text-xs sm:text-sm rounded-lg block w-full px-3 py-2.5 sm:py-2.5 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#2C5282] dark:focus:ring-blue-500 transition-colors"
              placeholder="Confirm your new password"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 outline-none rounded-base hover:bg-gray-200 transition-colors font-medium text-xs sm:text-sm cursor-pointer
                dark:focus:ring-blue-800 font-medium rounded-lg text-xs sm:text-sm px-4 py-2.5 sm:py-2.5 focus:outline-none transition-colors duration-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-2.5 cursor-pointer text-white bg-[#2C5282] dark:bg-blue-600 hover:bg-[#1e3a5f] dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs sm:text-sm px-4 py-2.5 sm:py-2.5 focus:outline-none transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword