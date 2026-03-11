import React from 'react';

const Skeleton = ({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height 
}) => {
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-white/10';
  const variantClass = variant === 'circular' ? 'rounded-full' : 'rounded-lg';
  
  return (
    <div 
      className={`${baseClass} ${variantClass} ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '1rem' 
      }}
    />
  );
};

export default Skeleton;
