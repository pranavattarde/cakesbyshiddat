import { UserRole } from '@prisma/client';

export interface AuthResponse {
  accessToken: string;
  user: AuthenticatedUser;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
