export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  access_token: string;
  refresh_token: string;
  user: User | null;
}
