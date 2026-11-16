
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Lazy loaded pages
const LandingPage = lazy(() =>
  import("../ui/landing/pages/LandingPage")
);

const AccountSelection = lazy(() =>
  import("../features/account-selection/pages/AccountSelection")
);

// Loading component
const LazyPage = ({ children }) => (
  <Suspense fallback={<div className="flex min-h-screen items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
  </div>}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Landing Page
      {
        index: true,
        element: (
          <LazyPage>
            <LandingPage />
          </LazyPage>
        ),
      },

      // Account Selection
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

  // Future Routes
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  //
  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  // },

  // 404 Page
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
