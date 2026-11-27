import { lazy, Suspense, type ReactNode } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

import MainLayout from "../../../layouts/MainLayout";
import CustomerDashboardLayout from "../../../layouts/CustomerDashboardLayout";
import CustomerRouteGuard from "./CustomerRouteGuard";

const ShopScanLandingPage = lazy(
  () => import("../pages/ShopScanLandingPage")
);
const CustomerDashboardPage = lazy(
  () => import("../pages/CustomerDashboardPage")
);
const CustomerScanPage = lazy(() => import("../pages/CustomerScanPage"));

const CustomerLazyPage = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex min-h-[65vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    }
  >
    {children}
  </Suspense>
);

export const customerRoutes: RouteObject[] = [
  {
    element: <CustomerRouteGuard />,
    children: [
      {
        path: "/scan/:shopCode",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <CustomerLazyPage>
                <ShopScanLandingPage />
              </CustomerLazyPage>
            ),
          },
        ],
      },
      {
        path: "/customer",
        element: <CustomerDashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/customer/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: (
              <CustomerLazyPage>
                <CustomerDashboardPage />
              </CustomerLazyPage>
            ),
          },
          {
            path: "scan",
            element: (
              <CustomerLazyPage>
                <CustomerScanPage />
              </CustomerLazyPage>
            ),
          },
        ],
      },
    ],
  },
];