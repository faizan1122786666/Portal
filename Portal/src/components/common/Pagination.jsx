import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-10 mb-6">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2C5284]/10 text-[#2C5284] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-[#2C5284]/20 active:scale-95 shadow-sm cursor-pointer"
      >
        <FaChevronLeft size={16} />
      </button>
      <div className="text-sm font-black text-[#2C5284] dark:text-blue-300 mx-2 bg-white dark:bg-white/5 px-6 py-2.5 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2C5284]/10 text-[#2C5284] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-[#2C5284]/20 active:scale-95 shadow-sm cursor-pointer"
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;