import { useEffect, useState } from 'react';

import QRCode from 'qrcode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

import { default as KelasAPI } from '../../api/kelas.js';

import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';

import { findData, group } from '../../utils/common.js';

export default function Print() {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(1);
  const [indexRange, setIndexRange] = useState([1, 12]);
  const [format, setFormat] = useState('A4');
  const [visibleSize, setVisibleSize] = useState({
    width: 0,
    height: 0
  });

  const nums = indexRange[1] - indexRange[0];
  const nominations = group(
    12,
    new Array(nums + 1).fill(0).map((_, i) => 3001 + i),
  );

  const paperSizes = [
    {
      name: 'A4',
      width: 210,
      height: 297
    },
    {
      name: 'F4',
      width: 210,
      height: 330
    }
  ];

  const reset = () => {
    setClassId(1);
    setIndexRange([1, 12]);
    setFormat('A4');
  };

  const resizeFonts = () => {
    const mejaLabels = document.querySelectorAll('.label-meja');
    
    for (let i = 0; i < mejaLabels.length; i++) {
      const nomorMeja = mejaLabels[i];
      const noUjianBox = nomorMeja.querySelector('.no-ujian');
      const noRuangBox = nomorMeja.querySelector('.no-ruang');
      const kelasBox = nomorMeja.querySelector('.kelas');
      const namaBox = nomorMeja.querySelector('.nama');
      const qrBox = nomorMeja.querySelector('.qr');
    
      noUjianBox.style.fontSize = noUjianBox.clientWidth * 0.1 + 'px';
      noRuangBox.style.fontSize = noRuangBox.clientWidth * 0.15 + 'px';
      kelasBox.style.fontSize = kelasBox.clientWidth * 0.15 + 'px';
      namaBox.style.fontSize = namaBox.clientWidth * 0.06 + 'px';
      qrBox.style.padding = qrBox.clientWidth * 0.08 + 'px';
    }
  };

  const resizePaper = () => {
    const size = findData(['name', format], paperSizes);
    const aspect = size.height / size.width;

    const printPapers = document.querySelectorAll('.printPaper');
    const width = printPapers[0] ? printPapers[0].clientWidth : 0;
    const height = aspect * width;

    for (let i = 0; i < printPapers.length; i++) {
      const printPaper = printPapers[i];
      printPaper.style.height = height + 'px';
    }

    if (visibleSize.width !== width && visibleSize.height !== height) setVisibleSize({ width, height });

    return { width, height }
  };

  useEffect(() => {
    document.title = 'Admin | Cetak Nomor Meja';

    const printStyle = document.createElement('style');
    document.head.appendChild(printStyle);

    let retryTimeout = null;
    const fetchData = async () => {
      try {
        const classes = await KelasAPI.getAll();

        if (retryTimeout) clearTimeout(retryTimeout);

        setClasses(classes);
      } catch (err) {
        console.error(err);
        retryTimeout = setTimeout(fetchData, 3000);
      }
    };

    fetchData();

    const paperDesk = document.querySelector('#paperDesk');
    const printPreview = document.querySelector('#printPreview');
    const printPortal = document.querySelector('#printPortal');

    window.addEventListener('beforeprint', () => {
      printPortal.innerHTML = '';
      printStyle.innerText = `
      @page {
        margin: 0;
      }

      body #root {
        display: none;
      }

      #printPortal, #printPortal * {
        width: 100%;
      }

      #printPortal .printPaper {
        break-inside: avoid;
      }
      `;
      printPortal.appendChild(paperDesk);
      printPortal.removeAttribute('hidden');

      resizePaper();
      resizeFonts();
    });
    window.addEventListener('afterprint', () => {
      printPreview.innerHTML = '';
      printStyle.innerText = '';
      printPortal.setAttribute('hidden', true);
      printPreview.appendChild(paperDesk);

      resizePaper();
      resizeFonts();
    });
  }, []);

  useEffect(() => {
    resizePaper();
    resizeFonts();
  });

  return (
    <div className="px-5 py-12">
      <div className="flex gap-4 items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary-admin text-2xl"/>
        <h1 className="text-2xl font-semibold">Cetak Nomor Meja</h1>
      </div>
      <div className="mt-12 rounded-xl p-4 bg-white grid grid-cols-3 gap-4">
        <div>
          <div className="flex items-center mb-6">
            <FontAwesomeIcon className="text-primary-admin text-xl mr-5" icon={faPlusCircle} />
            <h2 className="text-xl font-semibold text-gray-500">Print</h2>
          </div>
          <div className="mb-2">
            <label htmlFor="kelas" className="block font-bold mb-2">Kelas</label>
            <select className="px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 w-full" name="kelas" id="kelas" value={classId || ''}
              onChange={(event) => setClassId(event.target.value)}>
              {classes.map((kelas) => <option value={kelas.id}>{kelas.namakelas}</option>)}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="no_absen" className="block font-bold mb-2">Nomor Absen</label>
            <Input type="text" name="no_absen" id="no_absen" value={indexRange.join('-')}
              onChange={(event) => event.target.value.includes('-') ? setIndexRange(event.target.value.split('-')) : setIndexRange([0, 0])} fullwidth />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1/2">
              <label htmlFor="salinan" className="block font-bold mb-2">Salinan</label>
              <Input type="text" name="salinan" id="salinan" value={1}
                onChange={(event) => console.log('TODO: salinan change')} fullwidth />
            </div>
            <div className="w-1/2">
              <label htmlFor="format" className="block font-bold mb-2">Format</label>
              <select className="px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 w-full" name="kelas" id="kelas" value={format || ''}
                onChange={(event) => setFormat(event.target.value)}>
                {paperSizes.map((size) => <option value={size.name}>{size.name}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="tujuan" className="block font-bold mb-2">Tujuan</label>
            <select className="px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 w-full" name="tujuan" id="tujuan">
              <option value="epson-l3301">EPSON L3301</option>
            </select>
          </div>

          <Button className="bg-danger text-white hover:bg-danger-dark focus:ring focus:ring-danger mt-5" text="Reset" onClick={reset} />

          <Button className="bg-warning text-white hover:bg-warning-dark focus:ring focus:ring-warning mt-12 w-full" text="Unduh PDF" onClick={() => downloadPDF()} />
          <Button className="bg-primary-admin text-white hover:bg-primary-admin-dark focus:ring focus:ring-primary-admin mt-4 w-full" text="Cetak" onClick={window.print} />
        </div>
        <div className="bg-gray-200 rounded-xl col-span-2 py-2" id="printPreview">
          <div id="paperDesk">
            {nominations.map((page) => (
            <div className="bg-white w-3/4 mx-auto overflow-hidden printPaper" style={{ padding: visibleSize.width * 0.02 }}>
              <div className="grid grid-cols-2" style={{ gap: visibleSize.width * 0.02 }}>
                {page.map((noUjian, index) => 
                <NomorMeja noUjian={noUjian} qr="loading..." noRuang="R.01" kelas="XII RPL 1" nama="Iwan Haryatno" />
                )}
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NomorMeja({ noUjian, qr, noRuang, kelas, nama }) {
  useEffect(() => {
    const image = document.querySelector('#qr-' + noUjian);
    QRCode.toDataURL(kelas.concat(noUjian), { margin: 0 }).then((url) => {
      image.src = url;
    });
  }, []);

  return (
    <div className="border border-gray-900 grid grid-rows-2 divide-y divide-gray-900 font-semibold label-meja" id={'meja-' + noUjian}>
      <div className="grid grid-cols-9 divide-x divide-gray-900">
        <div className="flex items-center justify-center col-span-2"></div>
        <div className="flex items-center justify-center col-span-5 no-ujian font-bold">{noUjian}</div>
        <div className="flex items-center justify-center col-span-2 qr">
          <img src="" id={'qr-' + noUjian} alt={'QR ' + noUjian} className="w-full" />
        </div>
      </div>
      <div className="grid grid-cols-9 divide-x divide-gray-900">
        <div className="flex items-center justify-center col-span-2 no-ruang">{noRuang}</div>
        <div className="flex items-center justify-center col-span-2 kelas">{kelas}</div>
        <div className="flex items-center justify-center col-span-5 nama">{nama}</div>
      </div>
    </div>
  );
}
