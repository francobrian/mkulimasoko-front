import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ fullPage = false, size = 'medium', text = 'Loading...' }) => {
  const spinnerClass = `spinner spinner-${size}`;
  const containerClass = `loading-container ${fullPage ? 'full-page' : ''}`;

  return (
    <div className={containerClass}>
      <div className="spinner-wrapper">
        <div className={spinnerClass}></div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;