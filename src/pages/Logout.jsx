import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import Auth from '../api/auth.js';
import SpinnerLabel from '../components/SpinnerLabel.jsx';

export default function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    let retryTimeout = null;
    const doLogout = async () => {
      try {
        const response = await Auth.logout();

        if (response.data.status_code === 200) setLoggedOut(true);
        if (retryTimeout) clearTimeout(retryTimeout);
      } catch(err) {
        retryTimeout = setTimeout(doLogout, 3000);
      }
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
