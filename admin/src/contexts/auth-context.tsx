import { useCallback, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { AdminUser, AuthResponse } from '../types';
import { authStorage } from '../utils/storage';
import { AuthContext } from './auth-context-value';

export function AuthProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [user, setUser] = useState<AdminUser | null>(() => authStorage.getUser());
  const signIn = useCallback((response: AuthResponse) => { authStorage.setToken(response.accessToken); authStorage.setUser(response.user); setUser(response.user); }, []);
  const signOut = useCallback(() => { authStorage.clear(); setUser(null); }, []);
  const value = useMemo(() => ({ user, isAuthenticated: user !== null, signIn, signOut }), [user, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
