import { createContext, ReactNode, useContext, useState } from 'react';
import { IAuthContext, IAuthState, IUser } from '../@types/auth';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<IAuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = (user: IUser) => {
    setAuthState({ user, isAuthenticated: true });
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export { AuthProvider, useAuth };
