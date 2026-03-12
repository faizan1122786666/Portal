import React from 'react';

/**
 * Component: Loader
 * Description: A reusable loading spinner component with customizable size and extra classes.
 * Why: To provide a consistent visual indication of background processes or data fetching across the application.
 */
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
