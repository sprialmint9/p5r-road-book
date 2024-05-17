import { useContext } from 'react';
import { ToastContext } from '@/components/ToastContext';

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const useAddModalControl = () => {
  const addMarkModal = document.getElementById('addMarkModal') as HTMLInputElement | null;
  return {
    addMarkModal,
    setAddModalControl: (flag: boolean) => {
      if (addMarkModal) {
        addMarkModal.checked = flag;
      }
    },
  };
};
