
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ShopDashboardLayout from "../layouts/ShopDashboardLayout";

// Lazy loaded pages
const LandingPage = lazy(
  () => import("../ui/landing/pages/LandingPage")
);

const AccountSelection = lazy(
  () => import("../features/account-selection/pages/AccountSelection")
);

const RegisterPage = lazy(
  () => import("../features/auth/pages/RegisterPage")
);

const LoginPage = lazy(
  () => import("../features/auth/pages/LoginPage")
);

// Shop Dashboard
const ShopDashboardPage = lazy(
  () => import("../features/shop-dashboard/pages/ShopDashboardPage")
);

// Loading component
const LazyPage = ({ children }) => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    }
  >
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  // Main Layout
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <LazyPage>
            <LandingPage />
          </LazyPage>
        ),
      },
      {
        path: "account-selection",
        element: (
          <LazyPage>
            <AccountSelection />
          </LazyPage>
        ),
      },
    ],
  },

  // Auth Layout
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/shop/login",
        element: (
          <LazyPage>
            <LoginPage />
          </LazyPage>
        ),
      },
      {
        path: "/:role/register",
        element: (
          <LazyPage>
            <RegisterPage />
          </LazyPage>
        ),
      },
    ],
  },

  // Shopkeeper Dashboard Layout
 
{
  path: "/shop",
  element: <ShopDashboardLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/shop/dashboard" replace />,
    },
    {
      path: "dashboard",
      element: (
        <LazyPage>
          <ShopDashboardPage />
        </LazyPage>
      ),
    },
  ],
},


  // 404 Page
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
