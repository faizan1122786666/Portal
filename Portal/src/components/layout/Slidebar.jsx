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
import { MdBadge } from 'react-icons/md';
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
  userDesignation,
  userProfileImage,
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
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-[2px] z-40 lg:hidden" onClick={handleSlidebar} />
      )}

      <div
        className={`h-screen w-60 bg-[#2C5282] dark:bg-[#292c35] text-white fixed top-0 left-0 transform
          transition-all duration-300 ease-in-out z-50 flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static border-r border-transparent dark:border-gray-800/20`}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-5 border-b border-[#1e3a5f] dark:border-gray-800/40 bg-[#2C5282] dark:bg-[#292c35] transition-colors duration-300">
          <AiOutlineTeam size={26} className="text-white flex-shrink-0" />
          <h1 className="font-bold text-lg ml-3 flex-1 tracking-tight">Employee Portal</h1>
          <button onClick={handleSlidebar} className="lg:hidden flex-shrink-0 text-white hover:bg-white/10 p-1 rounded-md transition-colors">
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-3 flex-1 overflow-y-auto space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={handleMenuItemClick}
                className={({ isActive }) =>
                  `w-full flex items-center px-6 py-3 transition-all duration-200 border-l-4 ${isActive
                    ? 'bg-[#1e3a5f]/80 dark:bg-white/5 text-white border-white'
                    : 'text-gray-300 hover:bg-[#1e3a5f]/40 dark:hover:bg-white/5 hover:text-white border-transparent'
                  }`
                }
              >
                <Icon size={20} className="mr-3 flex-shrink-0" />
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile Section — clickable → goes to /profile */}
        <div className="border-t border-[#1e3a5f] dark:border-gray-800/40 p-4 space-y-1">
          <button
            onClick={handleProfileClick}
            title="Edit your profile"
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e3a5f] dark:hover:bg-white/5 transition-colors text-left cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#1e3a5f] dark:bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/10">
              {userProfileImage ? (
                <img
                  src={userProfileImage && userProfileImage.startsWith('http') ? userProfileImage : `http://localhost:3000/uploads/profile/${userProfileImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = initials
                      ? `<span class="text-white text-xs font-bold">${initials}</span>`
                      : `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="20" width="20" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M858.5 763.6l-66.9-149.8C770.8 565.3 731.5 533 686 533h-10c-18.4 0-35.3 5.3-49.7 14.5a160 160 0 1 0-252.6 0A101.4 101.4 0 0 0 348 533h-10c-45.5 0-84.8 32.3-95.6 70.8l-66.9 149.8C162.7 782.9 178.5 811 202.9 811h618.2c24.4 0 40.2-28.1 27.4-47.4z"></path></svg>`;
                  }}
                />
              ) : (
                initials
                  ? <span className="text-white text-xs font-bold">{initials}</span>
                  : <CgProfile size={22} className="text-white" />
              )}
            </div>

            {/* Name + email + shift + designation */}
            <div className="flex-1 overflow-hidden min-w-0 text-white">
              {userName && (
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <p className="text-sm font-bold truncate" title={userName}>{userName}</p>
                  {userShift && <ShiftBadge shift={userShift} />}
                </div>
              )}
              {userDesignation && (
                <div className="flex items-center gap-1 text-[10px] text-blue-200 dark:text-blue-100 mt-0.5 mb-1 px-1.5 py-0.5 bg-white/10 dark:bg-white/5 rounded-full w-fit max-w-full">
                  <MdBadge size={10} className="flex-shrink-0" />
                  <span className="truncate">{userDesignation}</span>
                </div>
              )}
              <p className="text-xs text-blue-50/70 dark:text-gray-400 truncate">{userEmail}</p>
            </div>
          </button>

          <button
            onClick={handleLogoutClick}
            className="mt-2 w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-white/10 bg-[#365F8D] dark:bg-white/5 transition-colors text-sm cursor-pointer"
          >
            <AiOutlineLogout size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}