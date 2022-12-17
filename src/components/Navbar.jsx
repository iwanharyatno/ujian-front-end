import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function Navbar(props) {
  return (
    <nav className="flex justify-between p-3 items-center text-lg">
      <NavLink aria-label="Logout" to="/logout" className="bg-primary text-white w-8 h-8 flex justify-center items-center rounded-full shadow-xl focus:bg-primary-dark hover:shadow-md">
        <FontAwesomeIcon icon={faSignOutAlt} />
      </NavLink>
      <h2 className="font-bold mx-4">{ props.title }</h2>
    </nav>
  );
}
