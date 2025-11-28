import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div 
        className={`loading-spinner ${sizeClasses[size]} border-2 border-gray-200 border-t-primary-600`}
      ></div>
      {text && (
        <p className="mt-3 text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;