import { Navigate } from 'react-router-dom';

import Auth from '../../api/auth.js';

export default function AuthProtected({ children, admin, redirect }) {
  const user = Auth.getUser();
  let isAllowed = !!user;

  if (user && admin) {
    isAllowed = user.is_admin;
  }

  return ( isAllowed
    ? children
    : (
      <Navigate to={(redirect || '/login') + `?redirect=${location.pathname}`} />
    )
  );
}
