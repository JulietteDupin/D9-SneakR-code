import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const admin = localStorage.getItem('admin');

  if (!admin || admin == false) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AdminRoute;
