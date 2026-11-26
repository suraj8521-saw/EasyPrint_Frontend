import { Navigate, Outlet } from "react-router-dom";

import { useAuthSession } from "../features/auth/api/authQueries";
import { getDashboardRoute } from "../features/auth/utils/getDashboardRoute";

const PublicAuthRoute = () => {
  const { user, isAuthenticated } = useAuthSession();

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardRoute(user)} replace />;
  }

  return <Outlet />;
};

export default PublicAuthRoute;
