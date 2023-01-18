import { useEffect } from 'react';

export default function Agenda() {
  useEffect(() => {
    document.title = 'Admin | Berita Acara';
  }, []);

  return (
    <div className="px-5 py-12">
      <h1 className="text-2xl font-bold">Berita Acara</h1>
    </div>
  );
}
