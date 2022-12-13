import { createBrowserRouter } from 'react-router-dom';

import Root from '../pages/Root.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Rooms from '../pages/Rooms.jsx';

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
      },
      {
        path: '/rooms/:id',
        element: <Rooms />
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
  }
]);
