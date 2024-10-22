import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminLayout from "./components/AdminLayout";
import BusinessUnit from "./pages/BusinessUnit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/bu",
        element: <BusinessUnit />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
