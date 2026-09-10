import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "./Loader";

// Wrap any route that requires login: <ProtectedRoute><DashboardPage /></ProtectedRoute>
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader text="Checking session..." />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
