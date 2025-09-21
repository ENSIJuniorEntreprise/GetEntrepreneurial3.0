import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ ...rest }) => {
  const location = useLocation(); // Corrected typo
  const { isAuthenticated } = useAuth();
  console.log(location.pathname);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <Outlet {...rest} />;
};

export default PrivateRoute;