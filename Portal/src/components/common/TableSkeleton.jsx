import React from 'react';
import Skeleton from './Skeleton';

const TableSkeleton = ({ rows = 5, cols = 6 }) => {
  return (
    <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden animate-pulse">
      <div className="bg-[#2C5294] dark:bg-white/10 h-14 w-full flex items-center px-6">
        {[...Array(cols)].map((_, i) => (
          <div key={i} className="flex-1 pr-4">
            <div className="h-4 bg-white/20 rounded w-2/3" />
          </div>
        ))}
      </div>
      <div className="divide-y divide-gray-100 dark:divide-white/5">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center px-6 py-5">
            {[...Array(cols)].map((_, colIndex) => (
              <div key={colIndex} className="flex-1 pr-4">
                {colIndex === 0 ? (
                  <div className="space-y-2">
                    <Skeleton height="0.9rem" width="70%" />
                    <Skeleton height="0.7rem" width="40%" />
                  </div>
                ) : colIndex === 4 ? (
                  <div className="flex items-center gap-2">
                    <Skeleton height="0.5rem" width="5rem" />
                    <Skeleton height="0.7rem" width="1.5rem" />
                  </div>
                ) : (
                  <Skeleton height="0.8rem" width="60%" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
