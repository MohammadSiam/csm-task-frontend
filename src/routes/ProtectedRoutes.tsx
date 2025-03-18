import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const storedAuthData = localStorage.getItem("authData");

  const authData = storedAuthData ? JSON.parse(storedAuthData) : null;

  if (!authData || !authData.email) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
