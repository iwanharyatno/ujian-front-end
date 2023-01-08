import { useState, useEffect } from 'react';

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

import Student from '../../api/student.js';
import { default as KelasAPI } from '../../api/kelas.js';

import { filterDistinct, searchData, findData } from '../../utils/common.js';

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

export default function Students() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);

  const displayedData = searchData(query, students);

  const submitData = async (event) => {
    event.preventDefault();

    setFormStatus(STATUS_PENDING);
    try {
      let updatedStudent = [...students];
      console.log(formData);
      
      if (edit) {
        const res = await Student.update(formData);
        updatedStudent = updateData(['id', formData.id], classes, formData);
      } else {
        const res = await Student.insert(formData);
        updatedStudent.push(formData);
      }
  
      setStudents(updatedStudent);
      setShowModal(false);
      setFormStatus(STATUS_SUCCESS);
      setFormData({});
  
      event.target.reset();
    } catch (error) {
      console.error(error);
      setFormStatus(STATUS_FAILED);
    }
  };

  useEffect(() => {
    document.title = 'Admin | Daftar Siswa';
    let retryTimeout = null;
    const fetchData = async () => {
      try {
        const students = await Student.getAll();
        const classes = await KelasAPI.getAll();

        if (retryTimeout) clearTimeout(retryTimeout);

        setStudents(students);
        setClasses(classes);
      } catch (err) {
        console.error(err);
        retryTimeout = setTimeout(fetchData, 3000);
      }
    };

    fetchData();
  }, []);

  const onAdd = () => {
    setEdit(false);
    setFormData({});
    setShowModal(true);
  };

  const onEdit = (id) => {
    const studentForEdit = findData(['id', id], students);

    setEdit(true);
    setFormData(studentForEdit);
    setShowModal(true);
  };

  return (
    <div className="px-5 py-12">
      <ModalDialog show={showModal} onClose={() => setShowModal(false)} header={(
          <h2 className="text-2xl">
            <FontAwesomeIcon icon={faPlusCircle} className="text-primary-admin mr-4" />
            <span className="font-medium text-gray-500">Tambah Siswa</span>
          </h2>
      )}>
        <form onSubmit={submitData}>
          <ModalSegment>
            <label htmlFor="siswa-xls" className="cursor-pointer mr-2 p-2 rounded-lg bg-warning text-white hover:bg-warning-dark focus:ring focus:ring-warning-fade">
              <FontAwesomeIcon icon={faFileExcel} className="mr-4" />
              Import
            </label>
            <input type="file" name="siswa-xls" id="siswa-xls" />
            <div className="mb-4 mt-8">
              {formStatus === STATUS_FAILED ? (<p className="text-center text-danger italic">Gagal mengirimkan data. Silahkan coba lagi</p>) : ''}
            </div>
            <div className="mb-4 grid grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="nis" className="block font-bold mb-2">NIS</label>
                <Input type="number" name="nis" id="nis" value={formData.nis || ''}
                  onChange={(event) => setFormData({
                    id: formData.id,
                    nis: event.target.value,
                    noabsen: formData.noabsen,
                    namalengkap: formData.nama,
                    kelas: formData.kelas
                  })}
                  fullwidth />
              </div>
              <div>
                <label htmlFor="noabsen" className="block font-bold mb-2">No Absen</label>
                <Input type="number" name="noabsen" id="noabsen" value={formData.noabsen || ''}
                  onChange={(event) => setFormData({
                    id: formData.id,
                    nis: formData.nis,
                    noabsen: event.target.value,
                    namalengkap: formData.nama,
                    kelas: formData.kelas
                  })}
                  fullwidth />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="nama" className="block font-bold mb-2">Nama</label>
              <Input type="text" name="nama" id="nama" value={formData.namalengkap || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  nis: formData.nis,
                  noabsen: formData.noabsen,
                  namalengkap: event.target.value,
                  kelas: formData.kelas
                })}
                fullwidth />
            </div>
            <div className="mb-4">
              <label htmlFor="kelas" className="block font-bold mb-2">Kelas</label>
              <select className="px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 w-full" name="kelas" id="kelas" value={formData.kelas || formData.kelas_id || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  nis: formData.nis,
                  noabsen: formData.noabsen,
                  namalengkap: formData.namalengkap,
                  kelas: event.target.value
                })}>
                {classes.map((kelas) => <option value={kelas.id}>{kelas.namakelas}</option>)}
              </select>
            </div>
          </ModalSegment>
          <ModalSegment>
            <Button type="submit" className={'bg-primary-admin hover:bg-primary-admin-dark w-full'} text={formStatus === STATUS_PENDING ? 'Mengirim...' : edit ? 'Simpan' : 'Tambah'} disabled={formStatus === STATUS_PENDING} />
          </ModalSegment>
        </form>
      </ModalDialog>
      <div className="flex gap-4 items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary-admin text-2xl"/>
        <h1 className="text-2xl font-semibold">Daftar Siswa SMK N 1 Purwokerto</h1>
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
        headings={['NIS', 'Nama', 'Kelas ID']}
        visibleKeys={['nis', 'namalengkap', 'kelas_id']}
        onEdit={onEdit} onDelete={console.log} />
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