import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

export default function AdminRoot() {
  return (
    <div className="grid grid-cols-12">
      <header className="col-span-12 flex justify-between items-center p-5 bg-sky-500 text-white">
        <h1 className="text-2xl font-bold grow">Dashboard Admin</h1>
        <NavLink aria-label="Logout" to="/admin/logout" className="flex items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="bg-blue-400 text-white p-3 mx-4 flex justify-center items-center rounded-full shadow-xl focus:bg-blue-500 hover:shadow-md"/>
          <span>Logout</span>
        </NavLink>
      </header>
      <aside className="col-span-3">
        <div className="flex justify-center h-48 px-5 items-center border-b-4">
          <FontAwesomeIcon className="mr-4 text-4xl" icon={faUserCircle} />
          <span className="text-3xl font-medium">Admin</span>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink className="flex items-center p-4" to="/admin/siswa">
                <FontAwesomeIcon className="mx-4" icon={faPeopleGroup} />
                <span className="font-bold">Daftar Siswa</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="col-span-9 bg-gray-200">
      </main>
    </div>
  );
}
