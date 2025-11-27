import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <Navigate to="/login" replace />;

  if (role && currentUser.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};


export default ProtectedRoute;



