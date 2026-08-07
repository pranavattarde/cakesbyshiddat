import axios from 'axios';
import { authStorage } from '../utils/storage';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api' });

api.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((response) => response, (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    authStorage.clear();
    if (window.location.pathname !== '/login') window.location.assign('/login');
  }
  return Promise.reject(error instanceof Error ? error : new Error('API request failed'));
});
