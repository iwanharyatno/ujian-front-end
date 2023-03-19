import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button.jsx';

const PAPER = {
  width: 297,
  height: 210
};

const HMARGIN_PAPERWIDTH_RATIO = 0.08;
const VTAB_PAPERWIDTH_RATIO = 0.02;
const VMARGIN_PAPERHEIGHT_RATIO = 0.08;

const TITLE_FONTSIZE_PAPERWIDTH_RATIO = 0.01;
const CONTENT_FONTSIZE_PAPERWIDTH_RATIO = 0.01;
const CONTENT_VMARGIN_PAPERWIDTH_RATIO = 0.01;
const TABLE_ROWHEIGHT_PAPERWIDTH_RATIO = 0.022;
const SIGNAREA_HEIGHT_PAPERWIDTH_RATIO = 0.13;

const DEFAULT_PRINT_STYLE = `
  .printPaper {
    font-family: sans-serif;
  }
`;

export default function Agenda() {
  useEffect(() => {
    document.title = 'Admin | Berita Acara';

    const printStyle = document.createElement('style');
    printStyle.innerText = DEFAULT_PRINT_STYLE;
    document.head.appendChild(printStyle);

    resizePaper();
    resizeFonts(printStyle);

    const paperDesk = document.querySelector('#paperDesk');
    const printPreview = document.querySelector('#printPreview');
    const printPortal = document.querySelector('#printPortal');

    window.addEventListener('beforeprint', () => {
      printPortal.appendChild(paperDesk);
      printPortal.removeAttribute('hidden');

      resizePaper();
      resizePrintFonts(printStyle);

      printStyle.innerText += `
      @page {
        margin: 0;
        size: landscape;
      }

      body #root {
        display: none;
      }

      #printPortal, #printPortal > * {
        width: 100%;
      }

      #printPortal .printPaper {
        break-after: page;
        height: auto !important;
        margin: 0 !important;
        font-family: sans-serif;
        box-shadow: none !important;
      }
      `;
    });
    window.addEventListener('afterprint', () => {
      printPreview.innerHTML = '';
      printStyle.innerText = DEFAULT_PRINT_STYLE;
      printPortal.setAttribute('hidden', true);
      printPreview.appendChild(paperDesk);

      resizePaper();
      resizeFonts(printStyle);
    });
  }, []);

  const resizeFonts = (printStyle) => {
    let style = printStyle;

    if (!style) {
      style = document.createElement('style');
      document.head.appendChild(style);
    }

    const printPaper = document.querySelector('.printPaper');

    const contentVerticalMargin = printPaper.clientWidth * CONTENT_VMARGIN_PAPERWIDTH_RATIO;
    const tabSpace = printPaper.clientWidth * VTAB_PAPERWIDTH_RATIO;
    const titleFontsize = printPaper.clientWidth * TITLE_FONTSIZE_PAPERWIDTH_RATIO;
    const contentFontsize = printPaper.clientWidth * CONTENT_FONTSIZE_PAPERWIDTH_RATIO;
    const tableRowHeight = printPaper.clientWidth * TABLE_ROWHEIGHT_PAPERWIDTH_RATIO;
    const signAreaHeight = printPaper.clientWidth * SIGNAREA_HEIGHT_PAPERWIDTH_RATIO;

    const horizontalPadding = printPaper.clientWidth * HMARGIN_PAPERWIDTH_RATIO;
    const verticalPadding = printPaper.clientHeight * VMARGIN_PAPERHEIGHT_RATIO;

    style.innerText = `
    ${DEFAULT_PRINT_STYLE}
    .printPaper {
      padding: ${verticalPadding}px ${horizontalPadding}px;
    }

    .printPaper .title {
      font-size: ${titleFontsize}px;
    }

    .printPaper .content {
      font-size: ${contentFontsize}px;
      margin: ${contentVerticalMargin}px;
    }

    .printPaper .tab {
      padding-left: ${tabSpace}px;
    }

    .printPaper td {
      line-height: ${tableRowHeight}px;
      vertical-align: middle;
    }

    .printPaper .sign-area {
      height: ${signAreaHeight}px;
    }
    `;
  };

  const resizePrintFonts = (printStyle) => {
    let style = printStyle;

    if (!style) {
      style = document.createElement('style');
      document.head.appendChild(style);
    }

    const printPaper = document.querySelector('.printPaper');

    const contentVerticalMargin = PAPER.width * CONTENT_VMARGIN_PAPERWIDTH_RATIO;
    const tabSpace = PAPER.width * VTAB_PAPERWIDTH_RATIO;
    const titleFontsize = PAPER.width * TITLE_FONTSIZE_PAPERWIDTH_RATIO;
    const contentFontsize = PAPER.width * CONTENT_FONTSIZE_PAPERWIDTH_RATIO;
    const tableRowHeight = PAPER.width * TABLE_ROWHEIGHT_PAPERWIDTH_RATIO;
    const signAreaHeight = PAPER.width * SIGNAREA_HEIGHT_PAPERWIDTH_RATIO;

    const horizontalPadding = PAPER.width * HMARGIN_PAPERWIDTH_RATIO;
    const verticalPadding = PAPER.height * VMARGIN_PAPERHEIGHT_RATIO;

    style.innerText = `
    ${DEFAULT_PRINT_STYLE}
    .printPaper {
      padding: ${verticalPadding}mm ${horizontalPadding}mm;
    }

    .printPaper .title {
      font-size: ${titleFontsize}mm;
    }

    .printPaper .content {
      font-size: ${contentFontsize}mm;
      margin: ${contentVerticalMargin}mm;
    }

    .printPaper .tab {
      padding-left: ${tabSpace}mm;
    }

    .printPaper td {
      line-height: ${tableRowHeight}mm;
      vertical-align: middle;
    }

    .printPaper .sign-area {
      height: ${signAreaHeight}mm;
    }
    `;
  };

  const resizePaper = () => {
    const aspect = PAPER.height / PAPER.width;

    const printPapers = document.querySelectorAll('.printPaper');
    const width = printPapers[0] ? printPapers[0].clientWidth : 0;
    const height = aspect * width;

    for (let i = 0; i < printPapers.length; i++) {
      const printPaper = printPapers[i];
      printPaper.style.height = height + 'px';
    }

    return { width, height }
  };

  return (
    <div className="px-5 py-12">
      <div className="flex gap-4 items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary-admin text-2xl"/>
        <h1 className="text-2xl font-semibold">Berita Acara</h1>
      </div>
      <div className="mt-12 rounded-xl p-4 bg-white">
        <div className="bg-gray-200 p-3" id="printPreview">
          <div id="paperDesk">
            <div className="bg-white mx-auto my-2 overflow-hidden shadow printPaper grid grid-cols-2">
              <div className="font-serif">
                <h1 className="font-bold text-center uppercase title">
                  Berita Acara<br/>
                  Penyelenggaraan Penilaian Akhir Semester Gasal<br/>
                  Tahun Pelajaran 2023/2024
                </h1>
                <p className="content">
                  Pada hari ini .......................,, tanggal ........................ bulan ............ tahun dua ribu
                  dua puluh dua telah diselenggarakan Penilaian Akhir Semester Gasal Tahun Pelajaran
                  2022/2023 SMK Negeri 1 Purwokerto, sebagai berikut:
                </p>
                <p className="content grid grid-cols-12">
                  <div className="col-span-4">Mata Uji</div>
                  <div className="col-span-8">
                    :&nbsp;....................................................................................................
                  </div>
                  <div className="col-span-4">Ruang</div>
                  <div className="col-span-8">
                    :&nbsp;....................................................................................................
                  </div>
                  <div className="col-span-12">Jumlah Peserta</div>
                  <div className="col-span-4 tab">Seharusnya</div>
                  <div className="col-span-8">
                    :&nbsp;................................peserta
                  </div>
                  <div className="col-span-4 tab">Hadir</div>
                  <div className="col-span-8">
                    :&nbsp;................................peserta
                  </div>
                  <div className="col-span-4 tab">Tidak Hadir</div>
                  <div className="col-span-8">
                    :&nbsp;................................peserta
                  </div>
                  <div className="col-span-4 tab">Nomor pes. tidak Hadir</div>
                  <div className="col-span-8">
                    :&nbsp;....................................................................................................
                    &nbsp;.....................................................................................................
                    &nbsp;.....................................................................................................
                  </div>
                </p>
                <p className="content grid grid-cols-12">
                  <div className="col-span-12">Sampul naskah telah dibuka dalam keadaan baik berisi :</div>
                  <div className="col-span-4">Naskah Soal</div>
                  <div className="col-span-8">: ...................</div>
                  <div className="col-span-4">Lembar Jawab</div>
                  <div className="col-span-8">: ...................</div>
                  <div className="col-span-4">Berita Acara</div>
                  <div className="col-span-8">: 2 set</div>
                  <div className="col-span-4">Daftar Hadir</div>
                  <div className="col-span-8">: 2 set</div>
                </p>
                <p className="content">Catatan Penting penyelenggaraan :</p>
                <p className="content">.............................................................................................................................................................</p>
                <p className="content">Demikian berita acara ini dibuat dengan sebenar-benarnya.</p>
                <p className="content grid grid-cols-2 sign-area">
                  <div className="flex flex-col justify-between">
                    <p>Pengawas 1,</p>
                    <div>
                      <p>.................................................................</p>
                      <p>NIP :</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p>Purwokerto, .....................................................</p>
                      <p>Yang membuat berita acara,</p>
                      <p>Pengawas 1,</p>
                    </div>
                    <div>
                      <p>..............................................................................</p>
                      <p>NIP :</p>
                    </div>
                  </div>
                </p>
              </div>
              <div>
                <h1 className="font-bold text-center uppercase title">Daftar Hadir</h1>
                <div className="content grid grid-cols-12">
                  <div className="col-span-3">Mata Pelajaran</div>
                  <div className="col-span-5">:&nbsp;....................................................</div>
                  <div className="col-span-2">Ruang</div>
                  <div className="col-span-2">:&nbsp;.............</div>

                  <div className="col-span-3">Kelas</div>
                  <div className="col-span-5">:&nbsp;....................................................</div>
                  <div className="col-span-2">Waktu</div>
                  <div className="col-span-2">:&nbsp;90 Menit</div>
                </div>
                <div className="content">
                  <table className="w-full border border-black divide-y divide-black">
                    <thead className="bg-gray-400">
                      <tr className="divide-x divide-black">
                        <th>No.</th>
                        <th>Nomor pes.</th>
                        <th>Nama</th>
                        <th>Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                      <tr className="divide-x divide-black">
                        <td className="text-center">1</td>
                        <td></td>
                        <td>IWAN HARYATNO</td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">2</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">3</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">4</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">5</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">6</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">7</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">8</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">9</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">10</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">11</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">12</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">13</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">14</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">15</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">16</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">17</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">18</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="bg-white mx-auto my-2 overflow-hidden shadow printPaper grid grid-cols-2">
              <div className="font-serif">
                <h1 className="font-bold text-center uppercase title">
                  Berita Acara<br/>
                  Penyelenggaraan Penilaian Akhir Semester Gasal<br/>
                  Tahun Pelajaran 2023/2024
                </h1>
                <p className="content">
                  Pada hari ini .......................,, tanggal ........................ bulan ............ tahun dua ribu
                  dua puluh dua telah diselenggarakan Penilaian Akhir Semester Gasal Tahun Pelajaran
                  2022/2023 SMK Negeri 1 Purwokerto, sebagai berikut:
                </p>
                <p className="content grid grid-cols-12">
                  <div className="col-span-4">Mata Uji</div>
                  <div className="col-span-8">
                    :&nbsp;....................................................................................................
                  </div>
                  <div className="col-span-4">Ruang</div>
                  <div className="col-span-8">
                    :&nbsp;....................................................................................................
                  </div>
                  <div className="col-span-12">Jumlah Peserta</div>
                  <div className="col-span-4 tab">Seharusnya</div>
                  <div className="col-span-8">
                    :&nbsp;................................peserta
                  </div>
                  <div className="col-span-4 tab">Hadir</div>
                  <div className="col-span-8">
                    :&nbsp;................................peserta
                  </div>
                  <div className="col-span-4 tab">Tidak Hadir</div>
                  <div className="col-span-8">
                    :&nbsp;................................peserta
                  </div>
                  <div className="col-span-4 tab">Nomor pes. tidak Hadir</div>
                  <div className="col-span-8">
                    :&nbsp;....................................................................................................
                    &nbsp;.....................................................................................................
                    &nbsp;.....................................................................................................
                  </div>
                </p>
                <p className="content grid grid-cols-12">
                  <div className="col-span-12">Sampul naskah telah dibuka dalam keadaan baik berisi :</div>
                  <div className="col-span-4">Naskah Soal</div>
                  <div className="col-span-8">: ...................</div>
                  <div className="col-span-4">Lembar Jawab</div>
                  <div className="col-span-8">: ...................</div>
                  <div className="col-span-4">Berita Acara</div>
                  <div className="col-span-8">: 2 set</div>
                  <div className="col-span-4">Daftar Hadir</div>
                  <div className="col-span-8">: 2 set</div>
                </p>
                <p className="content">Catatan Penting penyelenggaraan :</p>
                <p className="content">.............................................................................................................................................................</p>
                <p className="content">Demikian berita acara ini dibuat dengan sebenar-benarnya.</p>
                <p className="content grid grid-cols-2 sign-area">
                  <div className="flex flex-col justify-between">
                    <p>Pengawas 1,</p>
                    <div>
                      <p>.................................................................</p>
                      <p>NIP :</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p>Purwokerto, .....................................................</p>
                      <p>Yang membuat berita acara,</p>
                      <p>Pengawas 1,</p>
                    </div>
                    <div>
                      <p>..............................................................................</p>
                      <p>NIP :</p>
                    </div>
                  </div>
                </p>
              </div>
              <div>
                <h1 className="font-bold text-center uppercase title">Daftar Hadir</h1>
                <div className="content grid grid-cols-12">
                  <div className="col-span-3">Mata Pelajaran</div>
                  <div className="col-span-5">:&nbsp;....................................................</div>
                  <div className="col-span-2">Ruang</div>
                  <div className="col-span-2">:&nbsp;.............</div>

                  <div className="col-span-3">Kelas</div>
                  <div className="col-span-5">:&nbsp;....................................................</div>
                  <div className="col-span-2">Waktu</div>
                  <div className="col-span-2">:&nbsp;90 Menit</div>
                </div>
                <div className="content">
                  <table className="w-full border border-black divide-y divide-black">
                    <thead className="bg-gray-400">
                      <tr className="divide-x divide-black">
                        <th>No.</th>
                        <th>Nomor pes.</th>
                        <th>Nama</th>
                        <th>Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                      <tr className="divide-x divide-black">
                        <td className="text-center">1</td>
                        <td></td>
                        <td>IWAN HARYATNO</td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">2</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">3</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">4</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">5</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">6</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">7</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">8</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">9</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">10</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">11</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">12</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">13</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">14</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">15</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">16</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">17</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr className="divide-x divide-black">
                        <td className="text-center">18</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button className="mt-3" text="Cetak Semua" onClick={window.print} />
      </div>
    </div>
  );
}
