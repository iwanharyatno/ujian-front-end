import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faFilter,
  faPlusCircle,
  faEdit,
  faTrash,
  faClose,
  faFileExcel,
} from '@fortawesome/free-solid-svg-icons';

//import Student from '../../api/student.js';
import { default as KelasAPI } from '../../api/kelas.js';

import { filterDistinct, searchData, findData, updateData, deleteData } from '../../utils/common.js';

import SearchInput from '../../components/SearchInput.jsx';
import ActionButton from '../../components/ActionButton.jsx';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';

import {
  PaginatedTable,
  TableHeading,
  TableData
} from '../../components/PaginatedTable.jsx';

import { ModalDialog, ModalSegment } from '../../components/ModalDialog.jsx';

const STATUS_PENDING = 'status-pending';
const STATUS_SUCCESS = 'status-success';
const STATUS_FAILED = 'status-failed';

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [classes, setClasses] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [formStatus, setFormStatus] = useState({});

  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);

  const [mapelHolder, setMapelHolder] = useState([]);

  const displayedData = searchData(query, schedules);

  const filterJurusan = (tingkat) => filterDistinct(classes.filter((kelas) => kelas.tingkat === Number(tingkat))
                  .map((filteredKelas) => filteredKelas.jurusan));

  const submitData = async (event) => {
    event.preventDefault();

    setFormStatus({
      type: STATUS_PENDING
    });
    try {
      let updatedSchedules = [...schedules];
      const adjustedData = {
        tingkat: formData.tingkat,
        jurusan: formData.jurusan,
        tanggal: formData.tanggal,
        mapel: mapelHolder
      };
      console.log(adjustedData);
  
      setStudents(updatedSchedules);
      setShowModal(false);
      setFormStatus({
        type: STATUS_SUCCESS
      });
      setFormData({});
  
      event.target.reset();
    } catch (error) {
//      console.error(error.response);
//      const messages = Object.values(error.response.data.data.message)
//        .map(message => message[0])
//        .join('\n').trim();
//
      setFormStatus({
        type: STATUS_FAILED,
        message: 'not implemented yet'
      });
    }
  };

  useEffect(() => {
    document.title = 'Admin | Daftar Nominasi Peserta';
    let retryTimeout = null;
    const fetchData = async () => {
      try {
//        const students = await Student.getAll();
        const classes = await KelasAPI.getAll();

        if (retryTimeout) clearTimeout(retryTimeout);

//        setStudents(students);
        setClasses(classes);
      } catch (err) {
        console.error(err);
        retryTimeout = setTimeout(fetchData, 3000);
      }
    };

    fetchData();
  }, []);

  const setupMapelInput = (event) => {
    if (event.keyCode === 8) return;

    const mapelCount = event.target.value;
    const diff = mapelCount - mapelHolder.length;

    let updatedMapel = [...mapelHolder];
    if (diff < 0) {
      updatedMapel = updatedMapel.slice(0, mapelCount);
      setMapelHolder(updatedMapel);
      return;
    }

    const placeholders = new Array(diff).fill({});
    updatedMapel.push(...placeholders);

    setMapelHolder(updatedMapel);
  };

  const updateMapel = (index, mapelData) => {
    const updatedMapel = [...mapelHolder];
    updatedMapel[index] = mapelData;

    setMapelHolder(updatedMapel);
  }

  const onAdd = () => {
    setEdit(false);
    setFormData({});
    setShowModal(true);
  };

  const onEdit = (id) => {
    const studentForEdit = findData(['id', id], students);

    studentForEdit.kelas = studentForEdit.kelas_id;
    studentForEdit.id = studentForEdit.user_id;

    setEdit(true);
    setFormData(studentForEdit);
    setShowModal(true);
  };

  const onDelete = async (id) => {
    const confirmed = confirm('Yakin hapus data siswa ini?');

    if (!confirmed) return;
    await Student.delete(id);

    setStudents(
      deleteData(['user_id', id], students)
    );
  };


  return (
    <div className="px-5 py-12">
      <ModalDialog show={showModal} onClose={() => setShowModal(false)} header={(
          <h2 className="text-2xl">
            <FontAwesomeIcon icon={faPlusCircle} className="text-primary-admin mr-4" />
            <span className="font-semibold text-gray-500">Atur jadwal ujian</span>
          </h2>
      )}>
        <form onSubmit={submitData}>
          <ModalSegment className="grid grid-cols-2 gap-4">
            <div className="mb-4 col-span-2">
              {formStatus.type === STATUS_FAILED ? (<p className="text-center text-danger italic">{formStatus.message || 'Gagal mengirimkan data. Silahkan coba lagi'}</p>) : ''}
            </div>
            <div>
              <label htmlFor="tingkat" className="block font-bold mb-2">Tingkat</label>
              <select className="px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 w-full" name="tingkat" id="tingkat" value={formData.tingkat || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  tingkat: event.target.value,
                  jurusan: filterJurusan(event.target.value)[0],
                  tanggal: formData.tanggal,
                  mapel: formData.mapel
                })} >
                <option value="1">X</option>
                <option value="2">XI</option>
                <option value="3">XII</option>
              </select>
            </div>
            <div>
              <label htmlFor="jurusan" className="block font-bold mb-2">Jurusan</label>
              <select className="px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 w-full" name="jurusan" id="jurusan" value={formData.jurusan || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  tingkat: formData.tingkat || 1,
                  jurusan: event.target.value,
                  tanggal: formData.tanggal,
                  mapel: formData.mapel
                })} >
                {filterJurusan(formData.tingkat || 1).map((jurusan) => <option value={jurusan}>{jurusan}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="tanggal" className="block font-bold mb-2">Tanggal</label>
              <Input type="date" name="tanggal" id="tanggal" value={formData.tanggal || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  tingkat: formData.tingkat || 1,
                  jurusan: formData.jurusan || filterJurusan(formData.tingkat || 1)[0],
                  tanggal: event.target.value,
                  mapel: formData.mapel
                })}
                fullwidth />
            </div>
            <div>
              <label htmlFor="jumlah_pelajaran" className="block font-bold mb-2">Jumlah Mapel</label>
              <Input type="number" name="jumlah_pelajaran" id="jumlah_pelajaran"
                onKeyUp={setupMapelInput}
                fullwidth />
            </div>
            <div className="col-span-2 mt-4">
              <h3 className="font-medium text-center text-gray-500">Mata Pelajaran</h3>
            </div>
            {mapelHolder.map((m, index) => <InputMapel className="col-span-2" mapelData={m} onChange={(mapelData) => updateMapel(index, mapelData)} />)}
          </ModalSegment>
          <ModalSegment>
            <Button type="submit" className={'bg-primary-admin hover:bg-primary-admin-dark w-full'} text={formStatus.type === STATUS_PENDING ? 'Mengirim...' : edit ? 'Simpan' : 'Tambah'} disabled={formStatus.type === STATUS_PENDING} />
          </ModalSegment>
        </form>
      </ModalDialog>
      <div className="flex gap-4 items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary-admin text-2xl"/>
        <h1 className="text-2xl font-semibold">Jadwal Ujian SMK N 1 Purwokerto</h1>
      </div>
      <div className="flex gap-4 items-center mb-4">
        <SearchInput onSearch={setQuery}/>
        <div className="relative">
          <ActionButton text="Filter" icon={faFilter} color="bg-warning text-white hover:bg-warning-dark focus:ring focus:ring-warning-fade" onClick={() => setShowFilter(true)} />
          <FilterMenu show={showFilter} onClose={() => setShowFilter(false)} />
        </div>
        <ActionButton text="Tambah" icon={faPlusCircle} color="bg-primary-admin text-white hover:bg-primary-admin-dark focus:ring focus:ring-primary-fade" onClick={onAdd} />
      </div>
      <PaginatedTable
        data={displayedData}
        headings={['Tingkat', 'Jurusan']}
        visibleKeys={['tingkat', 'jurusan']}
        onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function InputMapel({ onChange, className, mapelData }) {
  const [mapel, setMapel] = useState(mapelData);

  const sendChange = (attr, value) => {
    const updatedMapel = {...mapel};
    updatedMapel[attr] = value;

    setMapel(updatedMapel);
    if (onChange) onChange(updatedMapel);
  }

  return (
    <div className={'grid grid-cols-2 gap-x-4 ' + className}>
      <Input type="text" onChange={() => sendChange('nama', event.target.value)} value={mapel.nama || ''} />
      <div className="flex gap-x-2 items-center">
        <Input type="time" onChange={() => sendChange('mulai', event.target.value)} value={mapel.mulai || ''} />
        <span className="text-2xl">-</span>
        <Input type="time" onChange={() => sendChange('akhir', event.target.value)} value={mapel.akhir || ''} />
      </div>
    </div>
  );
}

function FilterMenu({ onClose, show }) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const result = await KelasAPI.getAll();
        setClasses(result);
      } catch(err) {
        console.error('Error!', err);
      }
    };

    fetchKelas();
  }, []);

  return (
    <div className={'absolute top-100 translate-y-1 w-64 bg-white border-2 border-gray-300 p-4 ' + (show ? 'block' : 'hidden')}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">Filter</p>
        <button onClick={onClose} className="text-lg">
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div>
        <select className="block w-full bg-transparent border border-gray-400 p-2 rounded mb-2">
          <option>Kelas</option>
          {classes.map((kelas) => <option value={kelas.id}>{kelas.namakelas}</option>)}
        </select>
        <select className="block w-full bg-transparent border border-gray-400 p-2 rounded mb-4">
          <option>Jurusan</option>
          {filterDistinct(classes.map((kelas) => kelas.jurusan)).map((jurusan) => <option value={jurusan}>{jurusan}</option>)}
        </select>
      </div>
    </div>
  );
}
