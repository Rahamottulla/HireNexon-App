import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { currentUser, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Checking authentication...
      </div>
    );
  }

  // Not logged in
  if (!currentUser) {
    const redirectPath = window.location.pathname;
    if (redirectPath !== "/login" && redirectPath !== "/signup") {
      localStorage.setItem("postLoginRedirect", redirectPath);
    }
    return <Navigate to="/login" replace />;
  }

  // Role-based protection
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];

    // Normalize roles to lowercase
    const userRole = currentUser?.role?.toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());

    if (!normalizedAllowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
