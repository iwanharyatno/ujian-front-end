import { useEffect } from 'react';

export default function Schedule() {
  useEffect(() => {
    document.title = 'Admin | Atur Jadwal';
  }, []);

  return (
    <div className="px-5 py-12">
      <h1 className="text-2xl font-bold">Schedule CRUD</h1>
    </div>
  );
}
