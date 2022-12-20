import { useEffect } from 'react';

export default function Print() {
  useEffect(() => {
    document.title = 'Admin | Cetak Kartu';
  }, []);

  return (
    <div className="px-5 py-12">
      <h1 className="text-2xl font-bold">Print CRUD</h1>
    </div>
  );
}
