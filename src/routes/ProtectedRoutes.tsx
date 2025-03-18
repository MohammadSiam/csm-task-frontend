import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { authState } = useAuth();

  if (!authState?.user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render the child routes if authenticated
}
