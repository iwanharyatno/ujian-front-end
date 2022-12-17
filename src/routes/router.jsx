import { createBrowserRouter } from 'react-router-dom';

import Root from '../pages/Root.jsx';
import Dashboard from '../pages/Dashboard.jsx';

import AdminRoot from '../pages/admin/Root.jsx';

import ErrorPage from '../pages/ErrorPage.jsx';
import Login from '../pages/Login.jsx';
import Logout from '../pages/Logout.jsx';

import AuthProtected from './components/AuthProtected.jsx';

export default createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <AuthProtected>
            <Dashboard />
          </AuthProtected>
        )
      },
      {
        path: '/dashboard',
        element: (
          <AuthProtected>
            <Dashboard />
          </AuthProtected>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/logout',
    element: (
      <AuthProtected>
        <Logout />
      </AuthProtected>
    )
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);
