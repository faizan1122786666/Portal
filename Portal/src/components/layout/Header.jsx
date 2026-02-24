// import React from 'react'
// import { AiOutlineMenu } from 'react-icons/ai'

// export default function Header({ title, handleSlidebar }) {
//   return (
//     <header
//       className="
//         fixed top-0 right-0 h-16 bg-white z-40 flex items-center gap-4 px-6 border-b border-gray-200 left-0 lg:left-64">
            
//        {/* Icon */}
//       <button onClick={handleSlidebar} className="lg:hidden">
//         <AiOutlineMenu size={24} />
//       </button>
       
//        {/* Title */}
//       <h1 className="text-xl font-semibold text-[#2C5282]">
//         {title}
//       </h1>
//     </header>
//   )
// }







import { AiOutlineMenu } from 'react-icons/ai'
import { Moon, Sun } from 'lucide-react'

export default function Header({ title, handleSlidebar, isAdmin, darkMode, toggleDarkMode }) {
  return (
    <header className="fixed top-0 right-0 h-16 bg-white dark:bg-gray-800 z-40 flex items-center justify-between gap-4 px-6 border-b border-gray-200 dark:border-gray-700 left-0 lg:left-64 transition-colors duration-300">

      <div className="flex items-center gap-4">
        {/* Hamburger (mobile) */}
        <button onClick={handleSlidebar} className="lg:hidden text-gray-600 dark:text-gray-300">
          <AiOutlineMenu size={24} />
        </button>

        {/* Page Title */}
        <h1 className="text-xl font-semibold text-[#2C5282] dark:text-blue-300">
          {title}
        </h1>
      </div>

      {/* Dark Mode Toggle — only for admin */}
      {isAdmin && (
        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-yellow-300"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      )}
    </header>
  )
}