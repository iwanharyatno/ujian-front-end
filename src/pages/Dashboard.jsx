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
  const [openRoomLayout, setOpenRoomLayout] = useState(false);

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
          <CardButton icon={faDoorClosed} onClick={() => setOpenRoomLayout(true)} text="Denah Ruangan" className="w-full" />
          <CardButton icon={faBarcode} text="Absensi Kehadiran" className="w-full invisible lg:visible" />
        </div>
      </section>

      <RoomLayout open={openRoomLayout} onClose={() => setOpenRoomLayout(false)} />

      <ScheduleSection forClass="XII RPL 1" className={'fixed md:static top-0 left-0 w-full md:w-auto h-full md:h-[32rem] bg-white md:bg-gray-100/50 md:ml-8 md:rounded-2xl md:border-4 overflow-scroll pb-5 transition-transform ' + (openSchedule ? 'scale-100' : 'scale-0 md:scale-100')} onClose={() => setOpenSchedule(false)}>
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

function RoomLayout({ open, onClose, tables }) {
  let scroll = 0;
  let touchPos = null;
  let latestTransform = 0;
  let roomsOffcanvas = document.body;

  useEffect(() => {
    roomsOffcanvas = document.getElementById('roomsOffcanvas');
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  const handleClick = (event) => event.stopPropagation();
  const handleScroll = (event) => {
    scroll = event.target.scrollTop;
  };
  const handleTouchStart = (event) => {
    touchPos = event.touches[0];
    latestTransform = roomsOffcanvas.style.transform
      .replace(/[\(\)(px)]/g, ' ').trim()
      .split(' ')[1] || 0;
  };
  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const deltaY = touch.clientY - touchPos.clientY;

    if (deltaY > 200) {
      roomsOffcanvas.style.transform = null;
      return;
    }

    let totalTransform = Number(latestTransform) + deltaY;
    if (totalTransform < 0) totalTransform = 0;

    roomsOffcanvas.style.transform = `translateY(${totalTransform}px)`;
  };
  const handleTouchEnd = (event) => {
    const endTouchPos = event.changedTouches[0];
    const distanceY = endTouchPos.clientY - touchPos.clientY;

    if (distanceY > 200 && scroll === 0) {
      roomsOffcanvas.style.transform = null;
      onClose();
    }
  };
  const backdropClose = (event) => {
    roomsOffcanvas.style.transform = null;
    onClose();
  };

  return (
    <div className={'z-10 fixed w-full bg-black/50 top-0 left-0 overflow-scroll ' + (open ? 'h-full' : 'h-0')} onClick={backdropClose}>
      <div id="roomsOffcanvas" className={'flex flex-col py-4 rounded-t-3xl left-0 max-w-lg h-full md:h-auto md:rounded-3xl mx-auto bg-white transition-transform ' + (open ? 'translate-y-32' : 'translate-y-full')} onClick={handleClick} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="p-3 mb-4 md:hidden" onTouchMove={handleTouchMove}>
          <div className="bg-gray-400 h-2 w-1/4 rounded mx-auto"></div>
        </div>
        <div className="overflow-scroll pb-4" onScroll={handleScroll}>
          <h2 className="text-center text-2xl font-bold">Ruangan 01</h2>
          <div className="flex gap-4 mx-12 mt-8 bg-primary text-white p-4 rounded-xl shadow-md">
            <div>
              <p className="font-light">Kelas</p>
              <p className="font-bold">XII RPL 1</p>
            </div>
            <div className="grow">
              <p className="font-light">Code Ruangan</p>
              <p className="font-bold">C1 01</p>
            </div>
            <div>
              <p className="font-light">Absen</p>
              <p className="font-bold">1-18</p>
            </div>
          </div>
          <div className="grid grid-cols-4 mt-8 mx-4 gap-5 justify-center">
            <div></div>
            <RoomTable labels={['Pengawas']} className="font-bold col-start-2 col-span-2" />
            <div></div>
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
            <RoomTable labels={['1001', '2001', '3001']} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomTable({ labels, className }) {
  return (
    <div className={'rounded-lg border shadow-md divide-y text-center ' + className}>
      {labels.map((label) => <p className="py-2">{label}</p>)}
    </div>
  );
}
