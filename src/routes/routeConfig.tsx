import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../ui/home/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import PublicAuthRoute from "./PublicAuthRoute";
import PageLoader from "../shared/loaders/PageLoader";

export const preloadAccountSelection = () =>
  import("../features/account-selection/pages/AccountSelection");

export const preloadRegister = () =>
  import("../features/auth/pages/RegisterPage");

export const preloadLogin = () =>
  import("../features/auth/pages/LoginPage");

export const preloadForgotPassword = () =>
  import("../features/auth/pages/ForgotPasswordPage");

export const preloadShopDashboardLayout = () =>
  import("../layouts/ShopDashboardLayout");

export const preloadShopDashboard = () =>
  import("../features/shop/dashbaord/pages/ShopDashboardPage");

export const preloadActivationPlan = () =>
  import("../features/shop/activation-plan/pages/ActivationPlanPage");

const AccountSelection = lazy(preloadAccountSelection);
const RegisterPage = lazy(preloadRegister);
const LoginPage = lazy(preloadLogin);
const ForgotPasswordPage = lazy(preloadForgotPassword);
const ShopDashboardLayout = lazy(preloadShopDashboardLayout);
const ShopDashboardPage = lazy(preloadShopDashboard);
const ActivationPlanPage = lazy(preloadActivationPlan);

interface LazyPageProps {
  children: ReactNode;
}

const DelayedSpinner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return <div className="min-h-[60dvh]" />;
  return <PageLoader fullScreen title="Loading page..." subtitle="Just a moment" />;
};

const LazyPage = ({ children }: LazyPageProps) => (
  <Suspense fallback={<DelayedSpinner />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <PublicAuthRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "account/selection",
            element: (
              <LazyPage>
                <AccountSelection />
              </LazyPage>
            ),
          },
          {
            path: "auth/login",
            element: (
              <LazyPage>
                <LoginPage />
              </LazyPage>
            ),
          },
          {
            path: "auth/forgot-password",
            element: (
              <LazyPage>
                <ForgotPasswordPage />
              </LazyPage>
            ),
          },
          {
            path: ":role/register",
            element: (
              <LazyPage>
                <RegisterPage />
              </LazyPage>
            ),
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["OPERATOR"]} />,
    children: [
      {
        path: "/shop",
        element: (
          <LazyPage>
            <ShopDashboardLayout />
          </LazyPage>
        ),
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
          {
            path: "locked-dashboard",
            element: (
              <LazyPage>
                <ShopDashboardPage />
              </LazyPage>
            ),
          },
          {
            path: "activation",
            element: (
              <LazyPage>
                <ActivationPlanPage />
              </LazyPage>
            ),
          },
          {
            path: "activation/plan",
            element: (
              <LazyPage>
                <ActivationPlanPage />
              </LazyPage>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
