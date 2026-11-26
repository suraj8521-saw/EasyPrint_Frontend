import type { AuthUser } from "../types/auth.types";

export const getDashboardRoute = (
  user?: Pick<AuthUser, "role" | "verificationStatus"> | null
): string => {
  if (!user) return "/auth/login";

  switch (user.role) {
    case "ADMIN":
      return "/admin/dashboard";

    case "OPERATOR":
      return user.verificationStatus === "VERIFIED"
        ? "/shop/dashboard"
        : "/shop/locked-dashboard";

    case "CUSTOMER":
    default:
      return "/customer/dashboard";
  }
};
