import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import { lazy, Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { LoadingProvider } from "./providers/LoadingProvider";
import LoadingSuspense from "./loader/Loading";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./error/ErrorFallback";
import AdminLayout from "./components/AdminLayout";
import ShortBrief from "./pages/ShortBrief";
import BusinessUnit from "./pages/BusinessUnit";
import TermsPP from "./pages/TermsPP";
import Landing from "./pages/Landing";
import Series from "./pages/Series";
import Criteria from "./pages/Criteria";

const WelcomeClient = lazy(() => import("@/pages/WelcomeClient"));
const RouteProtector = lazy(() => import("@/protector/RouteProtector"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/client",
    element: <RouteProtector />,
    children: [{ path: "", element: <WelcomeClient /> }],
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
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
      {
        path: "terms-pp",
        element: <TermsPP />,
      },
      {
        path: "short-brief",
        element: <ShortBrief />,
      },
      {
        path: "series",
        element: <Series />,
      },
      {
        path: "criteria",
        element: <Criteria />,
      },
    ],
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
