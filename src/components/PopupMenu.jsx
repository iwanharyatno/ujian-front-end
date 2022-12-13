import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

export default function PopupMenu(props) {
  const [open, setOpen] = useState(false);

  const getStateClass = ({ isActive, isPending, title }) => {
    const baseClasses = 'flex items-center py-2 hover:bg-blue-300 focus:ring focus:ring-blue-200';

    if (isActive) {
      return baseClasses + 'font-bold';
    }
    
    if (isPending) {
      return baseClasses + 'italic';
    }

    return baseClasses;
  };

  return (
    <div className="block relative">
      <button className={'z-20 relative pt-1 px-3 w-10 h-10 shadow-md hover:shadow-lg focus:bg-blue-500 rounded-full text-white ' + (open ? ' bg-white rounded-0 text-blue-400 shadow-none focus:bg-gray-200 hover:shadow-none rounded-none' : props.colors)} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={open ? faClose : faBars} />
      </button>
      <div className={'z-10 absolute bg-blue-400 text-white shadow-md w-60 top-0 right-0 transition-transform origin-top-right ' + (open ? 'scale-100' : 'scale-0')}>
        <ul>
          {props.menus.map(menu => (
            <li>
              <NavLink to={menu.href} className={({ isActive, isPending }) => getStateClass({ isActive, isPending, title: menu.name})} onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={menu.icon} className="w-12"/>
                <span>{menu.name}</span>
              </NavLink>
            </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
