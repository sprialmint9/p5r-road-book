import { createContext, useState, ReactNode, FC } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-black bg-opacity-80 c-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <span className="loading loading-spinner loading-md mb-3"></span>
            <span>请稍候...</span>
          </div>
        </div>
      ) : null}
    </LoadingContext.Provider>
  );
};
