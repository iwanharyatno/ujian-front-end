import { createBrowserRouter, Navigate } from 'react-router-dom';

import Root from '../pages/Root.jsx';
import Dashboard from '../pages/Dashboard.jsx';

import AdminRoot from '../pages/admin/Root.jsx';
import Students from '../pages/admin/Students.jsx';
import Nominations from '../pages/admin/Nominations.jsx';
import Rooms from '../pages/admin/Rooms.jsx';
import Print from '../pages/admin/Print.jsx';
import Schedule from '../pages/admin/Schedule.jsx';

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
    children: [
      {
        path: '/admin',
        element: <Navigate to="/admin/students" />,
      },
      {
        path: '/admin/students',
        element: <Students />
      },
      {
        path: '/admin/nominations',
        element: <Nominations />
      },
      {
        path: '/admin/rooms',
        element: <Rooms />
      },
      {
        path: '/admin/print',
        element: <Print />
      },
      {
        path: '/admin/schedule',
        element: <Schedule />
      },
    ],
  },
]);
