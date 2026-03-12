import React from 'react';

/**
 * Component: Skeleton
 * Description: A placeholder component that mimics the shape of content while it's loading.
 * Why: To improve perceived performance by showing a shimmering layout before the actual data is rendered.
 */
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
