import type { AdminUser } from '../types';

const TOKEN_KEY = 'cakes-admin-access-token';
const USER_KEY = 'cakes-admin-user';

export const authStorage = {
  getToken: (): string | null => sessionStorage.getItem(TOKEN_KEY),
  setToken: (token: string): void => sessionStorage.setItem(TOKEN_KEY, token),
  getUser: (): AdminUser | null => {
    const value = sessionStorage.getItem(USER_KEY);
    if (!value) return null;
    try { return JSON.parse(value) as AdminUser; } catch { authStorage.clear(); return null; }
  },
  setUser: (user: AdminUser): void => sessionStorage.setItem(USER_KEY, JSON.stringify(user)),
  clear: (): void => { sessionStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(USER_KEY); },
};
