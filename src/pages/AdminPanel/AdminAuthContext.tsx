import React, { createContext, useContext, useState } from 'react';
import { api } from '../../services/api';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const TOKEN_KEY = 'cbs_inbuilt_admin_jwt';
const USER_KEY = 'cbs_inbuilt_admin_user';

const AdminAuthContext = createContext<AdminAuthContextType>({
  token: null,
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AdminUser | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Direct Environment Variable Authentication (Zero Database needed on Vercel!)
    const configuredEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@cakesbyshiddat.com').trim().toLowerCase();
    const configuredPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@123456').trim();

    if (cleanEmail === configuredEmail && cleanPassword === configuredPassword) {
      const sessionToken = 'cbs-env-token-' + Date.now();
      const adminUser: AdminUser = {
        id: 'env-admin',
        name: 'Administrator',
        email: cleanEmail,
        role: 'SUPER_ADMIN',
      };
      localStorage.setItem(TOKEN_KEY, sessionToken);
      localStorage.setItem(USER_KEY, JSON.stringify(adminUser));
      setToken(sessionToken);
      setUser(adminUser);
      return true;
    }

    // 2. Also check if a hosted backend API is configured and responds
    try {
      const res = await api.post('/auth/login', { email: cleanEmail, password: cleanPassword });
      if (res.data?.accessToken) {
        const receivedToken = res.data.accessToken;
        const receivedUser = res.data.user || { id: 'admin', name: 'Administrator', email: cleanEmail, role: 'ADMIN' };
        localStorage.setItem(TOKEN_KEY, receivedToken);
        localStorage.setItem(USER_KEY, JSON.stringify(receivedUser));
        setToken(receivedToken);
        setUser(receivedUser);
        return true;
      }
    } catch {
      // 3. Built-in developer/storeowner fallback credentials if Vercel env not yet configured
      if (
        (cleanEmail === 'admin@cakesbyshiddat.com' && (cleanPassword === 'Admin@123456' || cleanPassword === 'admin123')) ||
        (cleanEmail === 'pranav@cakesbyshiddat.com' && cleanPassword === 'Admin@123456')
      ) {
        const fallbackToken = 'cbs-local-token-' + Date.now();
        const fallbackUser: AdminUser = { id: 'admin-1', name: 'Administrator', email: cleanEmail, role: 'ADMIN' };
        localStorage.setItem(TOKEN_KEY, fallbackToken);
        localStorage.setItem(USER_KEY, JSON.stringify(fallbackUser));
        setToken(fallbackToken);
        setUser(fallbackUser);
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
