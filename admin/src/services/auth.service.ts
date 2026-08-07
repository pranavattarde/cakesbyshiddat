import type { AuthResponse, LoginCredentials } from '../types';
import { api } from './api';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> =>
    (await api.post<AuthResponse>('/auth/login', credentials)).data,
};
