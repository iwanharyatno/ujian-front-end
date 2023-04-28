import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faUserCircle,
  faPeopleGroup,
  faPeopleRoof,
  faDoorClosed,
  faPrint,
  faCalendarPlus,
  faSchool,
  faBookOpen,
  faInfoCircle,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

import AppConfig from '../../config/app.js';
import { ModalDialog, ModalSegment } from '../../components/ModalDialog.jsx';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';
import FormSelect from '../../components/FormSelect.jsx';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function AdminRoot() {
  const [showDetail, setShowDetail] = useState(false);
  const [showUjianForm, setShowUjianForm] = useState(false);
  const [edit, setEdit] = useState(false);

  const navLinks = [
    {
      path: '/admin/classes',
      text: 'Daftar Kelas',
      icon: faSchool,
    },
    {
      path: '/admin/students',
      text: 'Daftar Siswa',
      icon: faPeopleGroup,
    },
    {
      path: '/admin/nominations',
      text: 'Nominasi Peserta',
      icon: faPeopleRoof,
    },
    {
      path: '/admin/rooms',
      text: 'Daftar Ruangan',
      icon: faDoorClosed,
    },
    {
      path: '/admin/print',
      text: 'Cetak Nomor Meja',
      icon: faPrint,
    },
    {
      path: '/admin/schedule',
      text: 'Atur Jadwal',
      icon: faCalendarPlus,
    },
    {
      path: '/admin/agenda',
      text: 'Berita Acara',
      icon: faBookOpen,
    },
  ];

  const generateNavLinkClasses = ({ isActive, isPending }) => {
    const baseClasses = 'flex items-center p-4 transition-transform hover:translate-x-3';
    if (isActive) {
      return `${baseClasses} bg-primary-fade`;
    }
    if (isPending) {
      return `${baseClasses} italic`;
    }
    return baseClasses;
  };

  const detailClosed = (newUjian, ujianId) => {
    if (newUjian) {
      setEdit(!!ujianId);
      setShowUjianForm(true);
    }

    setShowDetail(false);
  }

  return (
    <div className="fixed w-full h-full grid grid-cols-12 grid-rows-admin">
      <header className="col-span-12 flex justify-between items-center p-5 bg-primary-admin text-white">
        <h1 className="text-2xl font-bold grow">Dashboard Admin</h1>
        <Button text="Detail Ujian" className="mr-4" onClick={() => setShowDetail(true)} />
        <NavLink aria-label="Logout" to="/logout?redirect=/admin/login" className="flex items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="bg-blue-400 text-white p-3 mx-4 flex justify-center items-center rounded-full shadow-xl focus:bg-blue-500 hover:shadow-md"/>
          <span>Logout</span>
        </NavLink>
      </header>
      <UjianDetail show={showDetail} onClose={detailClosed} />
      <UjianForm show={showUjianForm} onClose={() => setShowUjianForm(false)} edit={edit} />
      <aside className="col-span-12 md:col-span-2 hidden md:block overflow-scroll">
        <div className="flex justify-center h-48 px-5 items-center border-b-4">
          <FontAwesomeIcon className="text-primary-admin mr-4 text-4xl" icon={faUserCircle} />
          <span className="text-3xl font-medium">Admin</span>
        </div>
        <nav>
          <ul>
            {navLinks.map((navLink, index) => (
              <li>
                <NavLink className={generateNavLinkClasses} key={index} to={navLink.path}>
                  <FontAwesomeIcon className="text-primary-admin mx-4" icon={navLink.icon} />
                  <span className="font-bold">{navLink.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-10 bg-gray-200 overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}

function UjianDetail({ show, onClose }) {
  const [ujianId, expires] = cookies.get(AppConfig.UJIAN_ID) ? cookies.get(AppConfig.UJIAN_ID).toString().split('|') : [];
  const navigate = useNavigate();

  const onChange = (e) => {
    const lastExpires = new Date(Number(expires));

    cookies.set(AppConfig.UJIAN_ID, e.target.value, {
      path: '/',
      expires: lastExpires
    });

    navigate('/admin');

    if (onClose) onClose();
  }

  const newUjian = () => {
    if (onClose) onClose(true);
  };
  const editUjian = () => {
    if (onClose) onClose(true, ujianId);
  };

  return (
      <ModalDialog show={show} onClose={() => onClose()} header={(
          <h2 className="text-2xl">
            <FontAwesomeIcon icon={faInfoCircle} className="text-primary-admin mr-4" />
            <span className="font-medium text-gray-500">Detail Ujian</span>
          </h2>
      )}>
        <ModalSegment>
          <FormSelect value={ujianId} onChange={onChange} fullwidth>
            <option value="1">PAS GASAL 2022/2023</option>
            <option value="2">PSAJ 2022/2023</option>
          </FormSelect>
        </ModalSegment>
        <ModalSegment className="flex gap-3">
          <Button onClick={editUjian} className={'bg-primary-admin hover:bg-primary-admin-dark w-full'} text="Edit" />
          <Button onClick={newUjian} className={'bg-primary-admin hover:bg-primary-admin-dark w-full'} text="Tambah Ujian Baru" />
        </ModalSegment>
      </ModalDialog>
  );
}

const STATUS_PENDING = 'status-pending';
const STATUS_SUCCESS = 'status-success';
const STATUS_FAILED = 'status-failed';

function UjianForm({ show, onClose, edit }) {
  const [formStatus, setFormStatus] = useState({});
  const [formData, setFormData] = useState({});

  const updateFormData = (obj) => {
    const updated = {...formData, ...obj}

    setFormData(updated);
  };

  const submitData = async (event) => {
    event.preventDefault();

    setFormStatus({
      type: STATUS_PENDING,
    });

    try {
      throw new Error('not yet implemented');
    } catch(error) {
      const messages = error.response && (Object.values(error.response.data.data.message)
        .map(message => message[0])
        .join('\n').trim());
  
      setFormStatus({
        type: STATUS_FAILED,
        message: messages
      });
    }
  }

  return (
    <ModalDialog show={show} onClose={onClose} header={(
        <h2 className="text-2xl">
          <FontAwesomeIcon icon={faPlusCircle} className="text-primary-admin mr-4" />
          <span className="font-medium text-gray-500">{ edit ? 'Edit' : 'Tambah'} Ujian</span>
        </h2>
    )}>
      <form onSubmit={submitData}>
        <ModalSegment>
            {formStatus.type === STATUS_FAILED ? (
              <div className="mb-3 mt-5">
                <p className="text-center text-danger italic">{formStatus.message || 'Gagal mengirimkan data. Silahkan coba lagi'}</p>
              </div>
            ) : ''}
          <div className="mb-3">
            <label htmlFor="nama" className="block font-bold mb-2">Nama</label>
            <Input type="text" name="nama" id="nama" value={formData.nama || ''}
              onChange={(event) => updateFormData({
                nama: event.target.value,
              })}
              fullwidth />
          </div>
        </ModalSegment>
        <ModalSegment>
          <Button type="submit" className={'bg-primary-admin hover:bg-primary-admin-dark w-full'} text={formStatus.type === STATUS_PENDING ? 'Mengirim...' : edit ? 'Simpan' : 'Tambah'} disabled={formStatus.type === STATUS_PENDING} />
        </ModalSegment>
      </form>
    </ModalDialog>
  );
}
