import { createContext, useState, useCallback, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackMethod {
  success: (msg: string) => void | null;
  error: (msg: string) => void | null;
  info: (msg: string) => void | null;
  warning: (msg: string) => void | null;
}

interface SnackbarState {
  isOpen: boolean;
  message: string;
  severity: "info" | "success" | "warning" | "error";
}

// Singleton snack object
const snack: SnackMethod = {
  success: () => null,
  error: () => null,
  warning: () => null,
  info: () => null,
};

// Create the context (optional if you want to still use useSnackbar in some places)
const SnackbarContext = createContext<SnackMethod | null>(null);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isOpen: false,
    message: "",
    severity: "info", // can be 'success', 'error', 'warning', or 'info'
  });

  // Show a snackbar with a specific message and severity
  const showSnackbar = useCallback(
    (message: string, severity: SnackbarState["severity"] = "info") => {
      setSnackbar({
        isOpen: true,
        message,
        severity,
      });
    },
    []
  );

  // Close the snackbar
  const closeSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  // Assign the snack methods to the singleton
  snack.success = (msg) => showSnackbar(msg, "success");
  snack.error = (msg) => showSnackbar(msg, "error");
  snack.info = (msg) => showSnackbar(msg, "info");
  snack.warning = (msg) => showSnackbar(msg, "warning");

  return (
    <SnackbarContext.Provider value={snack}>
      {children}
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={2000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          variant="filled"
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Export the singleton snack
export { snack };
