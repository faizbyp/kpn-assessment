import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import { lazy, Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminLayout from "./components/AdminLayout";
import BusinessUnit from "./pages/BusinessUnit";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { LoadingProvider } from "./providers/LoadingProvider";
import LoadingSuspense from "./loader/Loading";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./error/ErrorFallback";
const WelcomeClient = lazy(() => import("@/pages/WelcomeClient"));
const RouteProtector = lazy(() => import("@/protector/RouteProtector"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteProtector />,
    children: [
      { path: "", element: <WelcomeClient /> },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <Admin />,
          },
          {
            path: "bu",
            element: <BusinessUnit />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
]);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <LoadingProvider>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Suspense fallback={<LoadingSuspense />}>
                <CssBaseline />
                <RouterProvider router={router} />
              </Suspense>
            </ErrorBoundary>
          </LoadingProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
