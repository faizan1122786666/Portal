// import React, { useState } from 'react';
// import axios from 'axios';

// const ChangePassword = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         oldPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//     });
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//         setError('');
//         setSuccess('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         // Validation
//         if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
//             setError('All fields are required');
//             return;
//         }

//         if (formData.newPassword !== formData.confirmPassword) {
//             setError('New passwords do not match');
//             return;
//         }

//         if (formData.newPassword.length < 6) {
//             setError('New password must be at least 6 characters long');
//             return;
//         }

//         if (formData.oldPassword === formData.newPassword) {
//             setError('New password must be different from old password');
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await axios.post(
//                 'http://localhost:3000/api/auth/change-password',
//                 {
//                     oldPassword: formData.oldPassword,
//                     newPassword: formData.newPassword
//                 },
//                 {
//                     withCredentials: true // Important for sending cookies
//                 }
//             );

//             setSuccess(response.data.message);
//             setFormData({
//                 oldPassword: '',
//                 newPassword: '',
//                 confirmPassword: ''
//             });

//             // Close modal after 2 seconds
//             setTimeout(() => {
//                 if (onClose) onClose();
//             }, 2000);

//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to change password');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-[#2C5284] bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm p-6 sm:p-8 m-4">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl sm:text-2xl font-bold text-heading">Change Password</h2>
//                     {onClose && (
//                         <button
//                             onClick={onClose}
//                             className="text-body hover:text-heading transition-colors cursor-pointer"
//                         >
//                             <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     )}
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* Error Message */}
//                     {error && (
//                         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-base">
//                             <p className="text-xs sm:text-sm font-medium">{error}</p>
//                         </div>
//                     )}

//                     {/* Success Message */}
//                     {success && (
//                         <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-base">
//                             <p className="text-xs sm:text-sm font-medium">{success}</p>
//                         </div>
//                     )}

//                     {/* Old Password */}
//                     <div>
//                         <label htmlFor="oldPassword" className="block mb-2 text-xs sm:text-sm font-bold text-heading">
//                             Old Password
//                         </label>
//                         <input
//                             type="password"
//                             id="oldPassword"
//                             name="oldPassword"
//                             value={formData.oldPassword}
//                             onChange={handleChange}
//                           className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-xs sm:text-sm rounded-base block w-full px-3 py-2.5 sm:py-2.5 shadow-xs placeholder:text-body"
//                             placeholder="Enter your old password"
//                         />
//                     </div>

//                     {/* New Password */}
//                     <div>
//                         <label htmlFor="newPassword" className="block mb-2 text-xs sm:text-sm font-bold text-heading">
//                             New Password
//                         </label>
//                         <input
//                             type="password"
//                             id="newPassword"
//                             name="newPassword"
//                             value={formData.newPassword}
//                             onChange={handleChange}
//                             className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-xs sm:text-sm rounded-base block w-full px-3 py-2.5 sm:py-2.5 shadow-xs placeholder:text-body"
//                             placeholder="Enter your new password"
//                         />
//                     </div>

//                     {/* Confirm New Password */}
//                     <div>
//                         <label htmlFor="confirmPassword" className="block mb-2 text-xs sm:text-sm font-bold text-heading">
//                             Confirm New Password
//                         </label>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-xs sm:text-sm rounded-base block w-full px-3 py-2.5 shadow-xs placeholder:text-body "
//                             placeholder="Confirm your new password"
//                         />
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex gap-3 pt-4">
//                         {onClose && (
//                             <button
//                                 type="button"
//                                 onClick={onClose}
//                                 className="flex-1 px-4 py-2.5 border border-gray-400 outline-none text-heading rounded-base hover:bg-gray-200 transition-colors font-medium text-xs sm:text-sm cursor-pointer"
//                             >
//                                 Cancel
//                             </button>
//                         )}
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className={`flex-1 px-4 py-2.5 bg-[#2C5282] text-white rounded-base 
//                                 cursor-pointer hover:bg-brand-strong transition-colors font-medium text-xs sm:text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         >
//                             {loading ? 'Changing...' : 'Change Password'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ChangePassword;






















import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ChangePassword = ({ onClose }) => {
  const [formData, setFormData] = useState({
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

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
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
        { oldPassword: formData.oldPassword, newPassword: formData.newPassword },
        { withCredentials: true }
      )
      toast.success(response.data.message || 'Password changed successfully!')
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' })

      // Close modal after a short delay so the toast is visible
      setTimeout(() => {
        if (onClose) onClose()
      }, 1500)
    } catch (err) {
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
          <h2 className="text-xl sm:text-2xl font-bold text-heading">Change Password</h2>
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
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Old Password */}
          <div>
            <label htmlFor="oldPassword" className="block mb-2 text-xs sm:text-sm font-bold text-heading">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-xs sm:text-sm rounded-base block w-full px-3 py-2.5 sm:py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter your old password"
            />
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block mb-2 text-xs sm:text-sm font-bold text-heading">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-xs sm:text-sm rounded-base block w-full px-3 py-2.5 sm:py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter your new password"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-xs sm:text-sm font-bold text-heading">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-neutral-secondary-medium border border-gray-400 outline-none text-heading text-xs sm:text-sm rounded-base block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Confirm your new password"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-400 outline-none text-heading rounded-base hover:bg-gray-200 transition-colors font-medium text-xs sm:text-sm cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-2.5 bg-[#2C5282] text-white rounded-base cursor-pointer hover:bg-brand-strong transition-colors font-medium text-xs sm:text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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