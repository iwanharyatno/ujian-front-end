import { Navigate } from 'react-router-dom';

import Auth from '../../api/auth.js';

export default function AuthProtected({ children }) {
  const isAuthenticated = !!Auth.getUser();

  return ( isAuthenticated 
    ? children
    : (
      <Navigate to="/login" />
    )
  );
}
