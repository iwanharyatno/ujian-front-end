import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faCheckCircle, faTimesCircle, faRotateRight } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar.jsx';
import FloatingButton from '../components/FloatingButton.jsx';
import OffCanvas from '../components/OffCanvas.jsx';
import QRCodeScanner from '../components/QRCodeScanner.jsx';

const STATUS_SUCCESS = 'success';
const STATUS_PENDING = 'pending';
const STATUS_FAILED = 'failed';

export default function Root() {
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);
  const [scanStatus, setScanStatus] = useState(null);

  const scanSuccess = (decodedText, decodedResult) => {
    if (decodedText === 'Woohooo suksess!!!') {
      setScanStatus(STATUS_SUCCESS);
    } else {
      setScanStatus(STATUS_FAILED);
    }
  }

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
        return <div className="text-center">Please Wait</div>;
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
            <p className="text-center mt-3 mx-4 mb-5 text-gray-400">Silahkan scan barcode yang ada di meja anda untuk memverifikasi kehadiran.</p>
          </>
        );
    }
  };

  return (
    <>
      <header>
        <Navbar title="UJIANN" />
      </header>
      <main className="p-4">
        <Outlet />
        <OffCanvas onOverlayClick={() => setOffCanvasOpen(false)} open={offCanvasOpen} colors="bg-gray-100">
          <h2 className="text-2xl my-6 text-center font-bold text-blue-500">Verifikasi Kehadiran</h2>
          { renderFragmentFromStatus(scanStatus) }
        </OffCanvas>
        <FloatingButton icon={faBarcode} position="bottom-9 right-3" className="lg:hidden" onClick={() => setOffCanvasOpen(true)}/>
      </main>
    </>
  );
}
