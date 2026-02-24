import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

export default function Header({ title, handleSlidebar }) {
  return (
    <header
      className="
        fixed top-0 right-0 h-16 bg-white z-40 flex items-center gap-4 px-6 border-b border-gray-200 left-0 lg:left-64">
            
       {/* Icon */}
      <button onClick={handleSlidebar} className="lg:hidden">
        <AiOutlineMenu size={24} />
      </button>
       
       {/* Title */}
      <h1 className="text-xl font-semibold text-[#2C5282]">
        {title}
      </h1>
    </header>
  )
}