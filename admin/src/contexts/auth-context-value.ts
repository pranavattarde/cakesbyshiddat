import { createContext } from 'react';
import type { AdminUser, AuthResponse } from '../types';

export interface AuthContextValue { user: AdminUser | null; isAuthenticated: boolean; signIn: (response: AuthResponse) => void; signOut: () => void; }
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
