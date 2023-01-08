import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faCalendar, faBarcode } from '@fortawesome/free-solid-svg-icons';

import CardButton from '../components/CardButton.jsx';
import ScheduleSection from '../components/ScheduleSection.jsx';
import ScheduleOneDay from '../components/ScheduleOneDay.jsx';
import ScheduleSubject from '../components/ScheduleSubject.jsx';

import AppConfig from '../config/app.js';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Dashboard() {
  const [openSchedule, setOpenSchedule] = useState(false);

  useEffect(() => {
    document.title = 'UJIANN | Dashboard';
  });

  const studentData = cookies.get(AppConfig.USER_LOGIN);

  return (
    <div className="md:mx-8 lg:mx-auto max-w-4xl flex flex-col md:flex-row justify-between">
      <section tabIndex={openSchedule ? '-1' : '1'} aria-hidden={openSchedule} className="md:w-7/12">
        <h2 className="my-4 font-bold md:hidden">Informasi data anda</h2>
        <div className="p-8 rounded-lg bg-green-400 text-white mb-8">
          <div className="mb-8">
            <p className="text-sm">Selamat datang</p>
            <h3 className="text-2xl font-bold capitalize">{studentData.namalengkap.toLowerCase()}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-4 justify-between col-span-2 bg-white/20 rounded">
              <div className="text-center p-3">
                <h3 className="text-sm">Kelas</h3>
                <p className="text-xl font-semibold">{studentData.kelas}</p>
              </div>
              <div className="text-center p-3">
                <h3 className="text-sm">No Absen</h3>
                <p className="text-xl font-semibold">{studentData.noabsen}</p>
              </div>
              <div className="text-center p-3">
                <h3 className="text-sm">NIS</h3>
                <p className="text-xl font-semibold">{studentData.nis}</p>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded">
              <FontAwesomeIcon icon={faDoorClosed} className="text-2xl"/>
              <h3>Ruangan</h3>
              <p className="text-2xl font-bold">01</p>
            </div>
            <div className="bg-white/20 p-3 rounded">
              <FontAwesomeIcon icon={faDoorClosed} className="text-2xl"/>
              <h3>No Ujian</h3>
              <p className="text-2xl font-bold">3001</p>
            </div>
          </div>
        </div>
        <h2 className="my-4 font-bold md:hidden">Cek Jadwal dan Denah Ruangan Ujian</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <CardButton icon={faCalendar} onClick={() => setOpenSchedule(true)} text="Jadwal Ujian" className="w-full md:hidden" />
          <CardButton icon={faDoorClosed} text="Denah Ruangan" className="w-full" />
          <CardButton icon={faBarcode} text="Absensi Kehadiran" className="w-full invisible lg:visible" />
        </div>
      </section>

      <ScheduleSection forClass="XII RPL 1" className={'fixed md:static top-0 left-0 w-full md:w-auto h-full md:h-[32rem] bg-white md:bg-gray-100/50 md:ml-8 md:rounded-2xl md:border-4 overflow-scroll pb-5 ' + (openSchedule ? '' : 'hidden md:block')} onClose={() => setOpenSchedule(false)}>
        <ScheduleOneDay date="2022-11-14">
          <ScheduleSubject time="07.30 - 09.00" subject="Pendidikan Agama Islam" color="bg-yellow-400" state="attended" />
          <ScheduleSubject time="09.30 - 11.00" subject="Bahasa Jawa" color="bg-primary" state="attended" />
          <ScheduleSubject time="12.30 - 14.00" subject="Basis Data" color="bg-green-400" state="attended" />
        </ScheduleOneDay>
        <ScheduleOneDay date="2022-11-15">
          <ScheduleSubject time="07.30 - 09.00" subject="Pendidikan Pancasila dan Kewarganegaraan" color="bg-yellow-400" state="skipped" />
          <ScheduleSubject time="09.30 - 11.00" subject="Bahasa Indonesia" color="bg-primary" state="attended" />
          <ScheduleSubject time="12.30 - 14.00" subject="Produk Kreatif dan Kewirausahaan" color="bg-green-400" state="attended" />
        </ScheduleOneDay>
        <ScheduleOneDay date="2022-11-16">
          <ScheduleSubject time="07.30 - 09.00" subject="Matematika" color="bg-yellow-400" state="attended" />
          <ScheduleSubject time="09.30 - 11.00" subject="Pemrograman Berorientasi Objek" color="bg-primary" state="attended" />
        </ScheduleOneDay>
        <ScheduleOneDay date="2022-11-17">
          <ScheduleSubject time="07.30 - 09.00" subject="Bahasa Inggris" color="bg-yellow-400" />
          <ScheduleSubject time="09.30 - 11.00" subject="Pemrograman Web dan Perangkat Bergerak" color="bg-primary"  />
        </ScheduleOneDay>
        <ScheduleOneDay date="2022-11-18">
          <ScheduleSubject time="07.30 - 09.00" subject="Bahasa Jepang" color="bg-yellow-400" />
        </ScheduleOneDay>
      </ScheduleSection>
    </div>
  );
}
