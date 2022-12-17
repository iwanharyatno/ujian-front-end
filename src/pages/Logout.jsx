import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import Auth from '../api/auth.js';
import SpinnerLabel from '../components/SpinnerLabel.jsx';

export default function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const doLogout = async () => {
      const response = await Auth.logout();
      if (response.data.status_code === 200) setLoggedOut(true);
      console.log(response);
    }

    if (!loggedOut) {
      doLogout();
    }
  }, []);

  return (
    <div>
      {loggedOut 
        ? <Navigate to='/login' />
        : <SpinnerLabel text="Logging out..." fullscreen/>
      }
    </div>
  );
}
