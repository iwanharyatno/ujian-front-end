import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';

import Root from '../pages/Root.jsx';
import Dashboard from '../pages/Dashboard.jsx';

import AdminRoot from '../pages/admin/Root.jsx';
import AdminLogin from '../pages/admin/Login.jsx';
import Students from '../pages/admin/Students.jsx';
import Kelas from '../pages/admin/Kelas.jsx';
import Nominations from '../pages/admin/Nominations.jsx';
import Rooms from '../pages/admin/Rooms.jsx';
import Print from '../pages/admin/Print.jsx';
import Schedule from '../pages/admin/Schedule.jsx';
import Agenda from '../pages/admin/Agenda.jsx';

import ErrorPage from '../pages/ErrorPage.jsx';
import Login from '../pages/Login.jsx';
import Logout from '../pages/Logout.jsx';

import AuthProtected from './components/AuthProtected.jsx';

export default createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProtected>
        <Root />
      </AuthProtected>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/logout',
        element: (
          <AuthProtected>
            <Logout />
          </AuthProtected>
        )
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: (
    <AuthProtected admin redirect="/admin/login">
      <AdminRoot />
    </AuthProtected>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin',
        element: <Navigate to="/admin/classes" />,
      },
      {
        path: '/admin/students',
        element: <Students />
      },
      {
        path: '/admin/classes',
        element: <Kelas />
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
      {
        path: '/admin/agenda',
        element: <Agenda />
      },
    ],
  },
]);
