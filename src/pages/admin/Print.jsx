import { useEffect, useState } from 'react';

import QRCode from 'qrcode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

import { default as KelasAPI } from '../../api/kelas.js';
import Nomination from '../../api/nomination.js';

import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';

import { findData, group } from '../../utils/common.js';

const NOUJIANBOX_FONTSIZE_PAPER_WIDTH_RATIO = 0.032;
const NORUANGBOX_FONTSIZE_PAPER_WIDTH_RATIO = 0.020;
const KELASBOX_FONTSIZE_PAPER_WIDTH_RATIO = 0.018;
const NAMABOX_FONTSIZE_PAPER_WIDTH_RATIO = 0.02;
const NAMAUJIANBOX_FONTSIZE_PAPER_WIDTH_RATIO = 0.0082;
const QRBOX_PADDING_PAPER_WIDTH_RATIO = 0.007;

export default function Print() {
  const [classes, setClasses] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [classId, setClassId] = useState(1);
  const [labelPerPage, setLabelPerPage] = useState(12);
  const [indexRange, setIndexRange] = useState([1, 12]);
  const [format, setFormat] = useState('A4');
  const [visibleSize, setVisibleSize] = useState({
    width: 0,
    height: 0
  });

  const displayedNominations = nominations
    .filter((nomination) => Number(nomination.kelas_id) === Number(classId))
    .slice(indexRange[0] - 1, indexRange[1]);

  const paperSizes = [
    {
      name: 'A4',
      width: 210,
      height: 297
    },
    {
      name: 'A5',
      width: 148,
      height: 210
    },
    {
      name: 'F4',
      width: 210,
      height: 330
    },
    {
      name: 'Q4',
      width: 216,
      height: 279
    },
    {
      name: 'A3',
      width: 297,
      height: 242
    },
    {
      name: 'A3+',
      width: 330,
      height: 480
    },
  ];

  const reset = () => {
    setClassId(1);
    setIndexRange([1, 12]);
    setFormat('A4');
  };

  const resizeFonts = () => {
    const mejaLabels = document.querySelectorAll('.label-meja');
    const printPaper = document.querySelector('.printPaper');

    for (let i = 0; i < mejaLabels.length; i++) {
      const nomorMeja = mejaLabels[i];
      const noUjianBox = nomorMeja.querySelector('.no-ujian');
      const noRuangBox = nomorMeja.querySelector('.no-ruang');
      const kelasBox = nomorMeja.querySelector('.kelas');
      const namaBox = nomorMeja.querySelector('.nama');
      const qrBox = nomorMeja.querySelector('.qr');
      const namaUjianBox = nomorMeja.querySelector('.nama-ujian');
    
      noUjianBox.style.fontSize = printPaper.clientWidth * NOUJIANBOX_FONTSIZE_PAPER_WIDTH_RATIO + 'px';
      noRuangBox.style.fontSize = printPaper.clientWidth * NORUANGBOX_FONTSIZE_PAPER_WIDTH_RATIO + 'px';
      kelasBox.style.fontSize = printPaper.clientWidth * KELASBOX_FONTSIZE_PAPER_WIDTH_RATIO + 'px';
      namaBox.style.fontSize = printPaper.clientWidth * NAMABOX_FONTSIZE_PAPER_WIDTH_RATIO + 'px';
      namaUjianBox.style.fontSize = printPaper.clientWidth * NAMAUJIANBOX_FONTSIZE_PAPER_WIDTH_RATIO + 'px';

      qrBox.style.padding = printPaper.clientWidth * QRBOX_PADDING_PAPER_WIDTH_RATIO + 'px';
    }
  };

  const resizePrintFonts = () => {
    const mejaLabels = document.querySelectorAll('.label-meja');
    const preferredPaperWidth = findData(['name', format], paperSizes).width;
    
    for (let i = 0; i < mejaLabels.length; i++) {
      const nomorMeja = mejaLabels[i];
      const noUjianBox = nomorMeja.querySelector('.no-ujian');
      const noRuangBox = nomorMeja.querySelector('.no-ruang');
      const kelasBox = nomorMeja.querySelector('.kelas');
      const namaBox = nomorMeja.querySelector('.nama');
      const qrBox = nomorMeja.querySelector('.qr');
      const namaUjianBox = nomorMeja.querySelector('.nama-ujian');
    
      noUjianBox.style.fontSize = preferredPaperWidth * NOUJIANBOX_FONTSIZE_PAPER_WIDTH_RATIO + 'mm';
      noRuangBox.style.fontSize = preferredPaperWidth * NORUANGBOX_FONTSIZE_PAPER_WIDTH_RATIO + 'mm';
      kelasBox.style.fontSize = preferredPaperWidth * KELASBOX_FONTSIZE_PAPER_WIDTH_RATIO + 'mm';
      namaBox.style.fontSize = preferredPaperWidth * NAMABOX_FONTSIZE_PAPER_WIDTH_RATIO + 'mm';
      namaUjianBox.style.fontSize = preferredPaperWidth * NAMAUJIANBOX_FONTSIZE_PAPER_WIDTH_RATIO + 'mm';

      qrBox.style.padding = preferredPaperWidth * QRBOX_PADDING_PAPER_WIDTH_RATIO + 'mm';
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
    printStyle.innerText = `
    .printPaper {
      font-family: 'Roboto Regular';
    }
    `;
    document.head.appendChild(printStyle);

    let retryTimeout = null;
    const fetchData = async () => {
      try {
        const apiNominations = await Nomination.getAll();
        const classes = await KelasAPI.getAll();

        if (retryTimeout) clearTimeout(retryTimeout);

        setClasses(classes);
        setNominations(apiNominations);
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
      const preferredPaperSize = findData(['name', format], paperSizes);

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
        break-after: page;
        height: auto !important;
        margin: 0 !important;
        font-family: 'Roboto Regular';
        box-shadow: none !important;
      }
      `;
      printPortal.appendChild(paperDesk);
      printPortal.removeAttribute('hidden');

      resizePrintFonts();
      resizePaper();
    });
    window.addEventListener('afterprint', () => {
      printPreview.innerHTML = '';
      printStyle.innerText = `
      .printPaper {
        font-family: 'Roboto Regular';
      }
      `;
      printPortal.setAttribute('hidden', true);
      printPreview.appendChild(paperDesk);

      resizeFonts();
      resizePaper();
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
              <label htmlFor="label-per-page" className="block font-bold mb-2">Per-halaman</label>
              <Input type="number" name="label-per-page" id="label-per-page" value={labelPerPage} placeholder="Default: 12"
                onChange={(event) => setLabelPerPage(event.target.value)} fullwidth />
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
            {group(Number(labelPerPage) || 12, displayedNominations).map((page) => (
            <div className="bg-white w-3/4 mx-auto my-2 overflow-hidden shadow printPaper" style={{ padding: visibleSize.width * 0.02 }}>
              <div className="grid grid-cols-2" style={{ gap: visibleSize.width * 0.02 }}>
                {page.map((nomination) => 
                <NomorMeja noUjian={nomination.no_ujian} qr="loading..." noRuang="R.01" kelas={nomination.kelas?.namakelas || 'XII RPL 1'} nama={nomination.siswa?.namalengkap} />
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
    QRCode.toDataURL(kelas + noUjian, { margin: 0 }).then((url) => {
      image.src = url;
    });
  }, []);

  return (
    <div className="border border-gray-900 grid grid-rows-2 divide-y divide-gray-900 font-semibold label-meja" id={'meja-' + noUjian}>
      <div className="grid grid-cols-9 divide-x divide-gray-900">
        <div className="flex flex-col items-center justify-center col-span-2 nama-ujian">
          <img src="/smk-icon.png" alt="SMK" className="w-full" />
          <div className="text-center">PAS GASAL 2022/2023</div>
        </div>
        <div className="flex items-center justify-center col-span-5 no-ujian font-bold">{noUjian}</div>
        <div className="flex items-center justify-center col-span-2 qr">
          <img src="" id={'qr-' + noUjian} alt={'QR ' + noUjian} className="w-full" />
        </div>
      </div>
      <div className="grid grid-cols-9 divide-x divide-gray-900">
        <div className="flex items-center justify-center col-span-2 no-ruang">{noRuang}</div>
        <div className="flex items-center justify-center col-span-2 kelas">{kelas}</div>
        <div className="flex items-center justify-center col-span-5 nama text-center">{nama}</div>
      </div>
    </div>
  );
}
