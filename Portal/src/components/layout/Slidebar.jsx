import {
  AiOutlineClose,
  AiOutlineDashboard,
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineTeam,
  AiOutlineLogout,
  AiOutlineCheckSquare,
} from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FiUser } from "react-icons/fi";
import { FaSun, FaMoon, FaCloudMoon } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function getInitials(name) {
  if (!name || !name.trim()) return null;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ShiftBadge({ shift }) {
  if (!shift) return null;
  const config = {
    AM: { icon: <FaSun size={8} />, className: 'bg-amber-400/20 text-amber-300 border-amber-400/30', label: 'AM' },
    PM: { icon: <FaMoon size={8} />, className: 'bg-indigo-400/20 text-indigo-300 border-indigo-400/30', label: 'PM' },
    Night: { icon: <FaCloudMoon size={8} />, className: 'bg-slate-400/20 text-slate-300 border-slate-400/30', label: 'Night' },
  };
  const c = config[shift];
  if (!c) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${c.className}`}>
      {c.icon} {c.label}
    </span>
  );
}

export default function Slidebar({
  isOpen,
  handleSlidebar,
  userEmail,
  userName,
  userShift,
  userRole,
  onLogout,
}) {
  const navigate = useNavigate();

  const baseMenuItems = [
    { name: 'Dashboard', icon: AiOutlineDashboard, path: '/' },
    { name: 'Attendance', icon: AiOutlineClockCircle, path: '/attendance' },
    { name: 'Leave', icon: AiOutlineCalendar, path: '/leave' },
    { name: 'Tasks', icon: AiOutlineCheckSquare, path: '/tasks' },
  ];
  const adminMenuItems = [
    ...baseMenuItems,
    { name: 'Manage Employees', icon: FiUser, path: '/employees' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : baseMenuItems;

  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) handleSlidebar();
  };

  const handleLogoutClick = () => {
    toast.success('Logged out successfully!');
    setTimeout(() => {
      onLogout();
      if (window.innerWidth < 1024) handleSlidebar();
    }, 800);
  };

  // ── Navigate to profile page when user section is clicked ─────────────────
  const handleProfileClick = () => {
    navigate('/profile');
    if (window.innerWidth < 1024) handleSlidebar();
  };

  const initials = getInitials(userName);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={handleSlidebar} />
      )}

      <div
        className={`h-screen w-64 bg-[#2C5282] dark:bg-gray-900 text-white fixed top-0 left-0 transform
          transition-all duration-300 ease-in-out z-50 flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1e3a5f] dark:border-gray-700">
          <AiOutlineTeam size={28} className="text-white flex-shrink-0" />
          <h1 className="font-bold text-xl mx-3 flex-1">Employee Portal</h1>
          <button onClick={handleSlidebar} className="lg:hidden flex-shrink-0 text-white">
            <AiOutlineClose size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-3 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={handleMenuItemClick}
                className={({ isActive }) =>
                  isActive
                    ? 'w-full flex items-center px-6 py-3.5 transition-colors bg-[#1e3a5f] dark:bg-gray-700 text-white border-l-4 border-white'
                    : 'w-full flex items-center px-6 py-3.5 transition-colors text-white hover:bg-[#1e3a5f] dark:hover:bg-gray-700 border-l-4 border-transparent'
                }
              >
                <Icon size={20} className="mr-3 flex-shrink-0" />
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile Section — clickable → goes to /profile */}
        <div className="border-t border-[#1e3a5f] dark:border-gray-700 p-4 space-y-1">
          <button
            onClick={handleProfileClick}
            title="Edit your profile"
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e3a5f] dark:hover:bg-gray-700 transition-colors text-left cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#1e3a5f] dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
              {initials
                ? <span className="text-white text-sm font-bold">{initials}</span>
                : <CgProfile size={22} className="text-white" />
              }
            </div>

            {/* Name + email + shift */}
            <div className="flex-1 overflow-hidden min-w-0">
              {userName && (
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <p className="text-sm font-bold text-white truncate" title={userName}>{userName}</p>
                  {userShift && <ShiftBadge shift={userShift} />}
                </div>
              )}
              <p className="text-xs text-gray-300 truncate">{userEmail}</p>
            </div>
          </button>

          <button
            onClick={handleLogoutClick}
            className="mt-2 w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-gray-700 bg-[#365F8D] dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm cursor-pointer"
          >
            <AiOutlineLogout size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}