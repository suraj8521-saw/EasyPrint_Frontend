import { Navigate, Outlet } from "react-router-dom";
import { useAuthSession } from "../../auth/api/authQueries";
import { getDashboardRoute } from "../../auth/utils/getDashboardRoute";

const CustomerRouteGuard = () => {
  const { user, isAuthenticated } = useAuthSession();

  if (isAuthenticated && user && user.role !== "CUSTOMER") {
    return <Navigate to={getDashboardRoute(user)} replace />;
  }

  return <Outlet />;
};

export default CustomerRouteGuard;