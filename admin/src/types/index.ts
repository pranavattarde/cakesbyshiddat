export type UserRole = 'ADMIN';

export interface AdminUser { id: string; name: string; email: string; role: UserRole; }
export interface AuthResponse { accessToken: string; user: AdminUser; }
export interface LoginCredentials { email: string; password: string; }

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page?: number;
  limit?: number;
}

export type ResourceItem = Record<string, any>;
