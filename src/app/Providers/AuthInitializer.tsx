import type { ReactNode } from "react";
import { useCurrentUserQuery } from "../../features/auth/api/authQueries";

interface AuthInitializerProps {
  children: ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  useCurrentUserQuery();
  return <>{children}</>;
};

export default AuthInitializer;
