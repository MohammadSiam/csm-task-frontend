import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import LoginPage from '@/pages/authentication/login/page';
import RegisterPage from '@/pages/authentication/register/page';
import { RouteObject } from 'react-router-dom';

const AuthRoutes: RouteObject = {
  path: '/auth',
  element: <AuthenticationLayout />,
  children: [
    {
      index: true,
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
  ],
};

export default AuthRoutes;
