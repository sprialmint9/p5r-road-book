import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const iconMap = {
    success: 'i-material-symbols-check-circle-outline-sharp',
    error: 'i-material-symbols-cancel-outline',
    warning: 'i-material-symbols-warning-outline',
    info: 'i-material-symbols-info-outline',
  };
  return (
    <div className={`text-center max-w-60 alert alert-${type}`}>
      <i className={iconMap[type] + ' lg:text-xl text-10'}></i>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
