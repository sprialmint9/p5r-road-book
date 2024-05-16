import React, { createContext, ReactNode } from 'react';
import Toast from './Toast';

interface ToastData {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface ToastContextValue {
  showToast: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const newToast = { id: toasts.length, message, type };
    const toastArr = [...toasts, newToast];
    if (toastArr.length > 3) {
      toastArr.shift();
    }
    setToasts(toastArr);
  };

  React.useEffect(() => {
    if (toasts.length > 0) {
      const timeout = setTimeout(() => {
        setToasts(prevToasts => prevToasts.slice(1));
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [toasts]);

  const contextValue: ToastContextValue = {
    showToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toast toast-center toast-top z-999">
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
