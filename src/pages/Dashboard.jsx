import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDoorClosed,
  faCalendar,
  faBarcode,
  faCheckCircle,
  faTimesCircle,
  faRotateRight
} from '@fortawesome/free-solid-svg-icons';

import CardButton from '../components/CardButton.jsx';
import ScheduleSection from '../components/ScheduleSection.jsx';
import ScheduleOneDay from '../components/ScheduleOneDay.jsx';
import ScheduleSubject from '../components/ScheduleSubject.jsx';

import FloatingButton from '../components/FloatingButton.jsx';
import OffCanvas from '../components/OffCanvas.jsx';
import QRCodeScanner from '../components/QRCodeScanner.jsx';

import RoomLayouts from '../utils/room-layouts.js';
import Student from '../api/student.js';
import Auth from '../api/auth.js';

const STATUS_SUCCESS = 'success';
const STATUS_PENDING = 'pending';
const STATUS_FAILED = 'failed';

export default function Dashboard() {
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openRoomLayout, setOpenRoomLayout] = useState(false);
  const [student, setStudent] = useState(false);

  const [offCanvasOpen, setOffCanvasOpen] = useState(false);
  const [scanStatus, setScanStatus] = useState(null);
  
  const scanSuccess = (scanner, decodedText, decodedResult) => {
    const expectedResult = student.nominasis.no_ujian;
    if (decodedText === expectedResult) {
      scanner.stop();
      setScanStatus(STATUS_PENDING);
      Auth.present().then((result) => result.json()).then((data) => alert(JSON.stringify(data))).catch(alert);
    } else {
      setScanStatus(STATUS_FAILED);
    }
  }

  const scanClosing = () => {
    setOffCanvasOpen(false);
    setScanStatus(null);
  };

  const renderFragmentFromStatus = status => {
    switch(status) {
      case STATUS_SUCCESS:
        return (
          <>
            <FontAwesomeIcon icon={faCheckCircle} className="block mx-auto my-12 text-8xl text-green-400"/>
            <p className="text-center mt-3 mx-4 mb-12 text-gray-400">Verifikasi kehadiran berhasil!</p>
          </>
        );
      case STATUS_PENDING:
        return <div className="text-center">Mohon Tunggu</div>;
      case STATUS_FAILED:
        return (
          <>
            <FontAwesomeIcon icon={faTimesCircle} className="block mx-auto my-12 text-8xl text-red-400"/>
            <p className="text-center mt-3 mx-4 mb-12 text-gray-400">Verifikasi kehadiran gagal.</p>
            <button type="button" className="p-5 bg-white w-full" onClick={() => setScanStatus(null)}>
              <FontAwesomeIcon icon={faRotateRight} className="block mx-auto my-2 text-primary"/>
              <span className="mb-2">Scan ulang</span>
            </button>
          </>
        );
      default:
        return (
          <>
            <QRCodeScanner onScanSuccess={scanSuccess} start={offCanvasOpen} />
            <p className="text-center mt-3 mx-4 mb-5 text-gray-400">Silahkan scan QR yang ada di meja anda untuk memverifikasi kehadiran.</p>
          </>
        );
    }
  };


  useEffect(() => {
    document.title = 'UJIANN | Dashboard';
    let retryTimeout = null;
    const fetchData = async() => {
      try {
        const result = await Student.getCurrent();
        setStudent(result);
        if (retryTimeout) clearTimeout(retryTimeout);
      } catch(err) {
        retryTimeout = setTimeout(fetchData, 500);
      }
    };
    fetchData();
  }, []);

  const tables = [[]];
  RoomLayouts.init({
    cols: 4,
    tables,
    padFill: [],
  });

  return (
    <div className="md:mx-8 lg:mx-auto max-w-4xl flex flex-col md:flex-row justify-between">
      <section tabIndex={openSchedule ? '-1' : '1'} aria-hidden={openSchedule} className="md:w-7/12">
        <h2 className="my-4 font-bold md:hidden">Informasi data anda</h2>
        <div className="p-8 rounded-lg bg-green-400 text-white mb-8">
          <div className="mb-8">
            <p className="text-sm">Selamat datang</p>
            <h3 className="text-2xl font-bold capitalize">{student.namalengkap && student.namalengkap.toLowerCase() || '-'}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-4 justify-between col-span-2 bg-white/20 rounded">
              <div className="text-center p-3">
                <h3 className="text-sm">Kelas</h3>
                <p className="text-xl font-semibold">{student.kelases && student.kelases.namakelas || '-'}</p>
              </div>
              <div className="text-center p-3">
                <h3 className="text-sm">No Absen</h3>
                <p className="text-xl font-semibold">{student.noabsen || '-'}</p>
              </div>
              <div className="text-center p-3">
                <h3 className="text-sm">NIS</h3>
                <p className="text-xl font-semibold">{student.nis || '-'}</p>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded">
              <FontAwesomeIcon icon={faDoorClosed} className="text-2xl"/>
              <h3>Ruangan</h3>
              <p className="text-2xl font-bold">{student.ruangans && student.ruangans.no_ruangan || '-'}</p>
            </div>
            <div className="bg-white/20 p-3 rounded">
              <FontAwesomeIcon icon={faDoorClosed} className="text-2xl"/>
              <h3>No Ujian</h3>
              <p className="text-2xl font-bold">{student.nominasis && student.nominasis.no_ujian || '-'}</p>
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

      <RoomLayout tables={RoomLayouts.snakeX()} open={openRoomLayout} onClose={() => setOpenRoomLayout(false)} forClass={student.kelases && student.kelases.namakelas} />

      <ScheduleSection forClass={student.kelases && student.kelases.namakelas} className={'fixed md:static top-0 left-0 w-full md:w-auto h-full md:h-[32rem] bg-white md:bg-gray-100/50 md:ml-8 md:rounded-2xl md:border-4 overflow-scroll pb-5 transition-transform ' + (openSchedule ? 'scale-100' : 'scale-0 md:scale-100')} onClose={() => setOpenSchedule(false)}>
      </ScheduleSection>
      <OffCanvas onOverlayClick={scanClosing} open={offCanvasOpen} colors="bg-gray-100">
        <h2 className="text-2xl my-6 text-center font-bold text-blue-500">Verifikasi Kehadiran</h2>
        { renderFragmentFromStatus(scanStatus) }
      </OffCanvas>
      <FloatingButton icon={faBarcode} position="bottom-9 right-3" className="lg:hidden" onClick={() => setOffCanvasOpen(true)}/>
    </div>
  );
}

function RoomLayout({ open, onClose, tables, forClass }) {
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
    <div className={'z-10 fixed w-full bg-black/50 top-0 left-0 overflow-hidden ' + (open ? 'h-full' : 'h-0')} onClick={backdropClose}>
      <div id="roomsOffcanvas" className={'flex flex-col py-4 rounded-t-3xl left-0 max-w-lg h-full md:h-auto md:rounded-3xl mx-auto bg-white transition-transform ' + (open ? 'translate-y-32' : 'translate-y-full')} onClick={handleClick} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="p-3 mb-4 md:hidden" onTouchMove={handleTouchMove}>
          <div className="bg-gray-400 h-2 w-1/4 rounded mx-auto"></div>
        </div>
        <div className="overflow-scroll pb-4" onScroll={handleScroll}>
          <h2 className="text-center text-2xl font-bold">Ruangan -</h2>
          <div className="flex gap-4 mx-12 mt-8 bg-primary text-white p-4 rounded-xl shadow-md">
            <div>
              <p className="font-light">Kelas</p>
              <p className="font-bold">{forClass}</p>
            </div>
            <div className="grow">
              <p className="font-light">Kode Ruangan</p>
              <p className="font-bold">-</p>
            </div>
            <div>
              <p className="font-light">Absen</p>
              <p className="font-bold">-</p>
            </div>
          </div>
          <div className="grid grid-cols-4 mt-8 mx-4 gap-5 justify-center">
            <div></div>
            <RoomTable labels={['Pengawas']} className="font-bold col-start-2 col-span-2" />
            <div></div>
            {tables.map((table) => <RoomTable labels={table} /> )}
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
