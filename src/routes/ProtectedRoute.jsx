import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";

export default function ProtectedRoute({ children, allowGuest = true }) {
  const { session } = useAuth();
  const location = useLocation();
  if (!session || (!allowGuest && session.type === "guest")) {
    return (
      <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
    );
  }
  return children;
}
