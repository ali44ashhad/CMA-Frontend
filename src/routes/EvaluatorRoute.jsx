import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EvaluatorRoute = ({ children }) => {
  const { user, accessToken, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-gray-600 text-sm">Loading...</div>
      </div>
    );
  }

  const isEvaluator = user && user.role === "evaluator" && !!accessToken;

  if (!isEvaluator) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default EvaluatorRoute;

