import { NavLink, Outlet } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserCircle,
  faPeopleGroup,
  faPeopleRoof,
  faDoorClosed,
  faPrint,
  faCalendarPlus,
  faSchool,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';

import AppConfig from '../../config/app.js';

export default function AdminRoot() {
  const navLinks = [
    {
      path: '/admin/classes',
      text: 'Daftar Kelas',
      icon: faSchool,
    },
    {
      path: '/admin/students',
      text: 'Daftar Siswa',
      icon: faPeopleGroup,
    },
    {
      path: '/admin/nominations',
      text: 'Nominasi Peserta',
      icon: faPeopleRoof,
    },
    {
      path: '/admin/rooms',
      text: 'Daftar Ruangan',
      icon: faDoorClosed,
    },
    {
      path: '/admin/print',
      text: 'Cetak Nomor Meja',
      icon: faPrint,
    },
    {
      path: '/admin/schedule',
      text: 'Atur Jadwal',
      icon: faCalendarPlus,
    },
    {
      path: '/admin/agenda',
      text: 'Berita Acara',
      icon: faBookOpen,
    },
  ];

  const generateNavLinkClasses = ({ isActive, isPending }) => {
    const baseClasses = 'flex items-center p-4 transition-transform hover:translate-x-3';
    if (isActive) {
      return `${baseClasses} bg-primary-fade`;
    }
    if (isPending) {
      return `${baseClasses} italic`;
    }
    return baseClasses;
  };

  return (
    <div className="fixed w-full h-full grid grid-cols-12 grid-rows-admin">
      <header className="col-span-12 flex justify-between items-center p-5 bg-primary-admin text-white">
        <h1 className="text-2xl font-bold grow">Dashboard Admin</h1>
        <NavLink aria-label="Logout" to="/logout" className="flex items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="bg-blue-400 text-white p-3 mx-4 flex justify-center items-center rounded-full shadow-xl focus:bg-blue-500 hover:shadow-md"/>
          <span>Logout</span>
        </NavLink>
      </header>
      <aside className="col-span-12 md:col-span-3 hidden md:block">
        <div className="flex justify-center h-48 px-5 items-center border-b-4">
          <FontAwesomeIcon className="text-primary-admin mr-4 text-4xl" icon={faUserCircle} />
          <span className="text-3xl font-medium">Admin</span>
        </div>
        <nav>
          <ul>
            {navLinks.map((navLink) => (
              <li>
                <NavLink className={generateNavLinkClasses} to={navLink.path}>
                  <FontAwesomeIcon className="text-primary-admin mx-4" icon={navLink.icon} />
                  <span className="font-bold">{navLink.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-9 bg-gray-200 overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}
