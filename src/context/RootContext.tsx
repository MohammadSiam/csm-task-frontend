import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

const RootProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default RootProvider;
