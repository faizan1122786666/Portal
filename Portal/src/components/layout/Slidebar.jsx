import React from 'react';
import { AiOutlineClose, AiOutlineDashboard, AiOutlineClockCircle, AiOutlineCalendar, AiOutlineTeam, AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';

export default function Slidebar({ isOpen, handleSlidebar, userEmail, onLogout }) {
  const menuItems = [
    { name: 'Dashboard', icon: AiOutlineDashboard, path: '/' },
    { name: 'Attendance', icon: AiOutlineClockCircle, path: '/attendance' },
    { name: 'Leave', icon: AiOutlineCalendar, path: '/leave' },
  ];

  const handleMenuItemClick = () => {
    if (window.innerWidth < 1024) {
      handleSlidebar();
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    if (window.innerWidth < 1024) {
      handleSlidebar();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-100 bg-opacity-50 z-40 lg:hidden"
          onClick={handleSlidebar}/>
      )}

      <div className={`h-screen w-64 bg-[#2C5282] text-white fixed top-0 left-0 transform transition-transform duration-300 ease-in-out z-50 flex flex-col
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}> 
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <AiOutlineTeam size={30} className="text-white mr-4"/>
          <h1 className="font-bold text-2xl">
            Employee Portal
          </h1>
          <button onClick={handleSlidebar} className="lg:hidden">
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Navigation - grows to fill space */}
        <nav className="mt-6 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleMenuItemClick}
                end={item.path === '/'}
                className={({ isActive }) => 
                  isActive 
                    ? 'w-full flex items-center px-6 py-3 transition-colors bg-slate-800 text-white border-l-4 border-[#2C5284]' 
                    : 'w-full flex items-center px-6 py-3 transition-colors text-white hover:bg-slate-800'
                }
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
              <CgProfile size={24} className="text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              {/* <p className="text-sm font-medium text-white truncate">{userName}</p> */}
              <p className="text-xs text-gray-300 truncate">{userEmail}</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogoutClick}
            className="mt-2 w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-slate-800 bg-[#365F8D] transition-colors text-sm cursor-pointer">
            <AiOutlineLogout size={18}/>
            <span className='mr-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}