import React from 'react';

interface ToastProps {
  message: string;
  type: ToastType;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const iconMap = {
    success: 'i-material-symbols-check-circle-outline-sharp',
    error: 'i-material-symbols-cancel-outline',
    warning: 'i-material-symbols-warning-outline',
    info: 'i-material-symbols-info-outline',
  };
  return (
    <div className={`text-center shadow-2xl alert alert-${type} b-rounded-2`}>
      <i className={iconMap[type] + ' sm:text-6 text-7'}></i>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
