import { useEffect } from 'react';

export default function Rooms() {
  useEffect(() => {
    document.title = 'Admin | Daftar Ruangan';
  }, []);

  return (
    <div className="px-5 py-12">
      <h1 className="text-2xl font-bold">Rooms CRUD</h1>
    </div>
  );
}
