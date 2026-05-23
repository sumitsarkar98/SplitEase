// components/layouts/ProtectedRoutes.tsx

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Replace with your real auth logic
  //   const isAuthenticated = localStorage.getItem("token");
  const isAuthenticated = true; // For testing, set to true. Replace with real auth check.

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
