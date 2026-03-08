import React from 'react';

const Loader = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
    large: 'w-14 h-14',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizeClasses[size] || sizeClasses.medium} loader-arc ${className}`}></div>
    </div>
  );
};

export default Loader;
