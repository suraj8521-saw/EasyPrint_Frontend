export type UserRole = "OPERATOR" | "CUSTOMER" | "ADMIN";
export type RegisterRole = "shop" | "customer";
export type VerificationStatus = "VERIFIED" | "PENDING" | "REJECTED";

export interface AuthUser {
  name: string;
  email: string;
  referenceId: string;
  role: UserRole;
  verificationStatus?: VerificationStatus;
}
