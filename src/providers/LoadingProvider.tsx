import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingContextType {
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <Backdrop open={loading} style={{ color: "#fff", zIndex: 10000 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};
