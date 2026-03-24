import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaSun, FaMoon, FaEnvelope, FaBriefcase, FaBuilding, FaDollarSign, FaRegEdit, FaTimes, FaCheck } from 'react-icons/fa';
import { MdBadge, MdWorkOutline, MdPhotoCamera } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../common/Loader';
import { useAuthContext } from '../../context';
import ChangePassword from '../../pages/Auth/ChangePassword';

/**
 * Component: UserProfile / Profile
 * Description: A page component that displays and allows editing of User-specific profile information.
 * Why: To allow users to view their account details, change passwords, and update their display information.
 */
function ShiftBadge({ shift }) {
  if (!shift) return <span className="text-gray-700">Not assigned</span>;
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
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 dark:border-white/5 last:border-0">
      <div className={`w-9 h-9 rounded-lg bg-blue-50 dark:bg-white/5 flex items-center justify-center shrink-0 ${iconColor}`}>
        <Icon size={17} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</div>
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
      if (err.response?.status === 401) {
        window.dispatchEvent(new CustomEvent('unauthorized-access'));
      }
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#292c35] rounded-2xl shadow-2xl w-full max-w-sm  dark:border-white/10">
        <div className="bg-[#2C5284] dark:bg-white/10 p-5 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Edit Display Name</h2>
          <button onClick={onClose} className="text-white hover:bg-white/10 rounded-full p-1.5 transition-colors">
            <FaTimes size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name <span className="text-gray-400 dark:text-gray-500 font-normal">(max 14 characters)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={14}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500/50 outline-none text-sm dark:bg-white/5 dark:text-white"
              placeholder="Enter your name..."
              autoFocus
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right">{name.length}/14</p>
          </div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm text-center">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#2C5284] dark:bg-blue-600 text-white rounded-lg font-medium hover:bg-[#1e3a5f] dark:hover:bg-blue-700 transition-colors text-sm disabled:opacity-60">
              <FaCheck size={13} />
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Profile Component
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
      const response = await axios.post(
        'http://localhost:3000/api/auth/upload-profile-image',
        formData,
        { withCredentials: true }
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-transparent">

      
      <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] dark:text-blue-300 mb-6">My Profile</h1>

      <div className="max-w-2xl mx-auto space-y-5">

       
        <div className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 p-6 flex flex-col sm:flex-row items-center gap-5">
          
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-[#2C5284] dark:bg-white/10 flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden border-4 border-white dark:border-white/10">
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
                  <Loader size="small" className="border-white/30 border-t-white" />
                </div>
              )}
            </div>

            <label className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-white/10 flex items-center justify-center cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              <MdPhotoCamera size={16} className="text-[#2C5284] dark:text-blue-400" />
            </label>
          </div>

          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user?.name || <span className="text-gray-400 italic">No name set</span>}
              </h2>
              <button
                onClick={() => setShowEditName(true)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-[#2C5284] transition-colors"
                title="Edit name"
              >
                <FaRegEdit size={13} />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{user?.email}</p>
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${isAdmin ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                }`}>
                {user?.role || 'employee'}
              </span>
              {(userDesignation || user?.designation) && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                  {userDesignation || user.designation}
                </span>
              )}
            </div>
          </div>
        </div>

       
        <div className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 p-5">
          <h3 className="text-base font-bold text-gray-700 dark:text-blue-200 mb-1">Profile Details</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Information managed by your administrator</p>

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
                : <span className="text-gray-700">Not assigned</span>
            }
          />

          <InfoRow
            icon={FaBuilding}
            label="Department"
            value={user?.department || <span className="text-gray-700">Not assigned</span>}
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
                  : <span className="text-gray-700">Not set</span>
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

        
        <div className="bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 p-5">
          <h3 className="text-base font-bold text-gray-700 dark:text-blue-200 mb-4">Account Settings</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowEditName(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#2C5284] dark:hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-white/5 transition-all group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-white/10 group-hover:bg-[#2C5284] dark:group-hover:bg-blue-600 flex items-center justify-center transition-colors shrink-0">
                <FaRegEdit size={15} className="text-[#2C5284] dark:text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Edit Display Name</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Update how your name appears in the portal</p>
              </div>
            </button>

            <button
              onClick={() => setShowChangePass(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#2C5284] dark:hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-white/5 transition-all group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-white/10 group-hover:bg-[#2C5284] dark:group-hover:bg-blue-600 flex items-center justify-center transition-colors shrink-0">
                <CgProfile size={17} className="text-[#2C5284] dark:text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Change Password</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Update your account password</p>
              </div>
            </button>
          </div>
        </div>

        
      </div>

      {showEditName && (
        <EditNameModal
          currentName={user?.name}
          onClose={() => setShowEditName(false)}
          onSave={handleNameSaved}
        />
      )}
      {showChangePass && (
        <ChangePassword onClose={() => setShowChangePass(false)} />
      )}
    </div>
  );
}

export default UserProfile;