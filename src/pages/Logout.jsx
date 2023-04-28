import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import Auth from '../api/auth.js';
import SpinnerLabel from '../components/SpinnerLabel.jsx';

export default function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);

  const getRedirectUrl = () => {
    const current = location.href;

    const params = current.substring(current.indexOf('?') + 1, current.length)
      .split('&')
      .map(p => {
        const param = p.split('=');
        const result = {};

        result[param[0]] = param[1];

        return result;
      });

    return params[0]['redirect'];
  };

  useEffect(() => {
    let retryTimeout = null;
    const doLogout = async () => {
      try {
        const response = await Auth.logout();

        if (response.data.status_code === 200) {
          setLoggedOut(true);
          if (retryTimeout) clearTimeout(retryTimeout);
        }
      } catch(err) {
        retryTimeout = setTimeout(doLogout, 3000);
        console.log(err);
      }
    }

    if (!loggedOut) {
      doLogout();
    }
  }, []);

  return (
    <div>
      {loggedOut 
        ? <Navigate to={getRedirectUrl() ?? '/login'} />
        : <SpinnerLabel text="Logging out..." fullscreen/>
      }
    </div>
  );
}
