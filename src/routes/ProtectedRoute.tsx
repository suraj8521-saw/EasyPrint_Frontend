import { Navigate, Outlet, useLocation } from "react-router-dom";

import type { UserRole } from "../features/auth/types/auth.types";
import { useAuthSession } from "../features/auth/api/authQueries";
import { getDashboardRoute } from "../features/auth/utils/getDashboardRoute";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthenticated, isCheckingAuth } = useAuthSession();

  if (isCheckingAuth && !user) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-slate-50 dark:bg-[#090714]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardRoute(user)} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
