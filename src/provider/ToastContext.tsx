import React, { createContext, ReactNode } from 'react';
import Toast from '../components/Toast';
import { v4 as uuidv4 } from 'uuid';

interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const newToast = { id: uuidv4(), message, type };
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
      }, 1500);

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
