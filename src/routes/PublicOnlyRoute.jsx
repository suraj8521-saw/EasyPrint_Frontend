import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext.jsx";
export default function PublicOnlyRoute({ children }) {
  const { session } = useAuth();
  return session ? (
    <Navigate to={session.type === "guest" ? "/upload" : "/home"} replace />
  ) : (
    children
  );
}
