import React, { createContext, useContext, useMemo, useState } from "react";
import { api } from "../../services/api.js";

const AuthContext = createContext(null);
const KEY = "easyprint.session.v2";
function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}
export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);
  const establish = (next) => {
    sessionStorage.setItem(KEY, JSON.stringify(next));
    setSession(next);
    return next;
  };
  const login = async ({ email, password }) => {
    const result = await api.login({ email, password });
    return establish({
      type: "user",
      name: result.name || email.split("@")[0],
      email: result.email || email,
      userId: result.userId,
      token: result.token || null,
    });
  };
  const signup = async ({ email, password, name }) => {
    const result = await api.signup({ email, password, name });
    return establish({
      type: "user",
      name: result.name || name,
      email: result.email || email,
      userId: result.userId,
      token: result.token || null,
    });
  };
  const guest = async () => {
    // Ask the backend for a guest identifier first. If the endpoint is unavailable
    // (for example, an older backend build is running), still let the user open the
    // guest workspace; job APIs can then be tested independently.
    try {
      const result = await api.createGuest();
      const guestId = result?.guestId || result?.userId;
      if (!guestId) throw new Error("Guest endpoint did not return a guestId.");
      return establish({
        type: "guest",
        name: "Guest",
        email: null,
        userId: guestId,
        token: result.token || null,
        backendGuest: true,
      });
    } catch (error) {
      const guestId = `guest_${globalThis.crypto?.randomUUID?.() || Date.now().toString(36)}`;
      return establish({
        type: "guest",
        name: "Guest",
        email: null,
        userId: guestId,
        token: null,
        backendGuest: false,
        guestSetupWarning: error?.message || "Guest endpoint unavailable",
      });
    }
  };
  const logout = () => {
    sessionStorage.removeItem(KEY);
    setSession(null);
  };
  const value = useMemo(
    () => ({
      session,
      isAuthenticated: !!session,
      isGuest: session?.type === "guest",
      login,
      signup,
      guest,
      logout,
    }),
    [session],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
