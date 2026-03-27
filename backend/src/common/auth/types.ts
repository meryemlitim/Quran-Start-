import { Request } from 'express';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
}

export type AuthRequest = Request & { user: AuthenticatedUser };
