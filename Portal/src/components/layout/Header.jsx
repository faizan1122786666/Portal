import { AiOutlineMenu } from 'react-icons/ai'
import { HiUserGroup } from 'react-icons/hi'
import { Moon, Sun } from 'lucide-react'

/**
 * Component: Header
 * Description: The top navigation bar component, displaying the page title and theme toggle.
 * Why: To provide a consistent header across the application, allowing for mobile menu access and theme switching.
 */
export default function Header({ title, handleSlidebar, isAdmin, darkMode, toggleDarkMode }) {
  return (
    <header className="fixed top-0 right-0 h-16 bg-white dark:bg-[#292c35] z-40 flex items-center justify-between gap-4 px-6 border-b border-gray-200 dark:border-gray-800/40 left-0 lg:left-64 transition-all duration-300">

      <div className="flex items-center gap-4 lg:pl-4">
        {/* Hamburger (mobile) */}
        <button onClick={handleSlidebar} className="lg:hidden text-gray-600 dark:text-gray-300">
          <AiOutlineMenu size={24} />
        </button>

        {/* Page Title */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-[#2C5282] dark:text-white">
            {title}
          </h1>
        </div>
      </div>

      <button
        onClick={toggleDarkMode}
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-yellow-300"
      >
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>
    </header>
  )
}