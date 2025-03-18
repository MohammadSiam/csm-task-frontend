import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/not-found';
import AuthRoutes from './routes/AuthRoutes';
import HomeRoutes from './routes/HomeRoutes';

const routes = createBrowserRouter([
  AuthRoutes,
  HomeRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
]);
function App() {
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={routes} />
      </Suspense>
    </>
  );
}

export default App;
