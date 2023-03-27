import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';

export default function Root() {
  return (
    <>
      <header>
        <Navbar title="UJIANN" />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
