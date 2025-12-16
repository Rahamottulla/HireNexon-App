//frontend/src/components/ProtectedRoute/ProtectedRoute.js
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const auth = useAuth();

  if (!auth) return null;

  const { currentUser, loading } = auth;

  if (loading) {
    return <div style={{ padding: 20 }}>Checking authentication...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;



