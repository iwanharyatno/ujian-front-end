# Apa ini?
Sebuah Antarmuka Web yang dapat digunakan untuk mengelola data ujian suatu sekolah.

Tampilan website dibuat berdasarkan [desain UI ini](https://www.figma.com/file/0eLrtmBW8doRa5nzDzS44B/project01?node-id=0:1&t=yn4a58rdn3b9HJYD-1) yang dibuat oleh [@GwFirman](https://github.com/GwFirman). Sementara untuk Back end nya diakses menggunakan [API ini](https://docs.rkhalid.xyz/docs-api/) yang dibuat oleh [@raihnkhalid](https://github.com/raihnkhalid).

## Menjalankan secara lokal
1. Pertama silahkan fork repositori ini dan clone ke mesin lokal anda menggunakan git.
2. Pastikan anda telah memasang NodeJS versi 16 keatas di mesin anda.
3. Setelah itu jalankan perintah `npm install` di folder root project ini untuk mendownload semua dependensi yang dibutuhkan project ini
4. Setelah selesai mendownload, jalankan `npm run dev` untuk menjalakan server lokal vite yang kemudian dapat dibuka di http://localhost:5173.

## Penjelasan Folder dalam src
1. Folder `api`, digunakan untuk menyimpan konfigurasi serta program sebagai abstraksi pemanggilan API.
2. Folder `assets`, untuk menyimpan file-file statis seperti gambar atau logo.
3. Folder `components`, untuk menyimpan file-file component (bagian-bagian) kecil yang dapat digunakan kembali.
4. Folder `config`, untuk menyimpan variabel global yang digunakan aplikasi.
5. Folder `pages`, untuk menyimpan satu halaman web dalam bentuk component. (Sama seperti `components` hanya saja lebih kompleks dan mewakili satu halaman sekaligus).
6. Folder `routes`, untuk menyimpan route aplikasi. Dan folder `components` di dalamnya digunakan untuk mendefinisikan komponen pelindung sebuah route.
7. Folder `styles`, untuk menyimpan style css custom untuk aplikasi.

> **Catatan**
> Semua file yang mengandung sintaks HTML dalam bentuk bukan string (jsx, contoh kode di bawah) sebaiknya diberi akhiran nama `.jsx`. Ini diperlukan agar sintaks HTML tersebut diproses sebagaimana mestinya.
```jsx
// File: components/CardButton.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CardButton({ text, icon, className, ...rest }) {
  return (
    <button className={'flex items-center h-14 rounded-xl shadow-md hover:bg-gray-100 focus:bg-gray-200 ' + className } {...rest}>
      <div className="w-2 h-full bg-gradient-to-t rounded-l-xl from-primary to-violet-400">
      </div>
      <FontAwesomeIcon icon={icon} className="mx-4 text-primary" />
      <p className="text-gray-400 font-medium mr-5">{text}</p>
    </button>
  );
}
```
