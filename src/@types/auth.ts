export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  content: any[];
}

export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

export interface IAuthContext {
  authState: IAuthState;
  login: (user: IUser) => void;
  logout: () => void;
}
