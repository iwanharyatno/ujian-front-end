import { useEffect, useState } from 'react';

import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

export default function QRCodeScanner(props) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) return;

    const scannerApi = new Html5Qrcode('qr-scanner');
    const scannerConfig = {
      fps: 5,
      qrbox: { width: 200, height: 200 },
      aspectRatio: 1
    };

    const cancelScan = () => {
      if (!props.start) {
        scannerApi.stop().then(data => {}).catch(e => {});
      }
    };

    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length !== 0) {
        const cameraId = devices[1].id;
        scannerApi.start(cameraId, scannerConfig, props.onScanSuccess, props.onScanFailed).then(() => cancelScan()).catch(() => cancelScan());
      }
    }).catch((e) => setError(e));

    return () => {
      if (scannerApi.getState() === Html5QrcodeScannerState.SCANNING) scannerApi.stop().then(data => {}).catch(e => {});
    };
  });

  return (
    <div>
      <p className="text-center mt-3 mx-4 mb-5 text-gray-400">{error ? 'Gagal memuat kamera, klik kotak untuk mencoba ulang. Atau coba refresh halaman ini' : ''}</p>
      <div id="qr-scanner" className="w-60 h-60 border mx-auto my-6" onClick={() => setError(null)}></div>
    </div>
  );
}
