import { createContext } from 'react';
import type { LoginResponse } from '../types/auth';
export interface AuthContextData {
  accessToken: string | null;
  authenticated: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

