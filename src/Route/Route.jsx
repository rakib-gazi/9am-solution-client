import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Shops from "../pages/Shops";
import RedirectAuth from "../components/RedirectAuth";
  const routes = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "*",
          element: (
            <PrivateRoute>
              <Shops />
            </PrivateRoute>
          ),
        },
        {
          path: "/",
          element: <RedirectAuth><SignUp /></RedirectAuth>,
        },
        {
          path: "/signup",
          element: <RedirectAuth><SignUp /></RedirectAuth>,
        },
        {
          path: "/signin",
          element: <RedirectAuth><SignIn /></RedirectAuth>,
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
  ];


const router = createBrowserRouter(routes);
export default router;
