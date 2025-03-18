import HomeLayout from '@/layouts/HomeLayout';
import Home from '@/pages/home';
import Profile from '@/pages/profile';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';

const HomeRoutes: RouteObject = {
  path: '/',
  element: <HomeLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: 'profile',
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          element: <Profile />,
        },
      ],
    },
  ],
};

export default HomeRoutes;
