import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { adminLogin, adminLogout, getDashboard } from "../api/adminApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await getDashboard();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (username, password) => {
    const payload = await adminLogin({ username, password });
    setIsAuthenticated(true);
    setUser(payload?.data?.user ?? null);
    return payload;
  };

  const logout = async () => {
    try {
      await adminLogout();
    } catch {
      // ignore logout API errors and clear local auth state anyway
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      loading,
      login,
      logout,
    }),
    [isAuthenticated, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
