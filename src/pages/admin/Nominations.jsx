import { useEffect } from 'react';

export default function Nominations() {
  useEffect(() => {
    document.title = 'Admin | Nominasi Peserta';
  }, []);

  return (
    <div className="px-5 py-12">
      <h1 className="text-2xl font-bold">Nominations CRUD</h1>
    </div>
  );
}
