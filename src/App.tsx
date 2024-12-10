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
import ShortBrief from "./pages/master-data/ShortBrief";
import BusinessUnit from "./pages/master-data/BusinessUnit";
import TermsPP from "./pages/master-data/TermsPP";
import Landing from "./pages/Landing";
import Series from "./pages/master-data/Series";
import Criteria from "./pages/master-data/Criteria";
import FunctionMenu from "./pages/master-data/FunctionMenu";
import Question from "./pages/master-data/question/Question";
import QuestionDetails from "./pages/master-data/question/QuestionDetails";
import CreateEditQuestion from "./pages/master-data/question/CreateEditQuestion";
import AdminAccounts from "./pages/AdminAccounts";
import CreateAdmin from "./pages/CreateAdmin";
import ReqResetPass from "./pages/ReqResetPass";
import ResetPass from "./pages/ResetPass";

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
    path: "/reset-pass",
    element: <ReqResetPass />,
  },
  {
    path: "/reset-pass/:email",
    element: <ResetPass />,
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
      {
        path: "function-menu",
        element: <FunctionMenu />,
      },
      {
        path: "question",
        element: <Question />,
      },
      {
        path: "question/:id",
        element: <QuestionDetails />,
      },
      {
        path: "question/create",
        element: <CreateEditQuestion />,
      },
      {
        path: "question/edit/:id",
        element: <CreateEditQuestion />,
      },
      {
        path: "accounts",
        element: <AdminAccounts />,
      },
      {
        path: "accounts/create",
        element: <CreateAdmin />,
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
