import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, accessToken, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-gray-600 text-sm">Loading...</div>
      </div>
    );
  }

  const isAdmin = user && user.role === "admin" && !!accessToken;

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;

