import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faFilter,
  faPlusCircle,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
 
import { default as KelasAPI } from '../../api/kelas.js';
import { searchData, findData, updateData } from '../../utils/common.js';

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

export default function Kelas() {
  const [classes, setClasses] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    document.title = 'Admin | Daftar Kelas';

    const fetchData = async () => {
      try {
        const result = await KelasAPI.getAll();
        setClasses(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const displayedData = searchData(query, classes);
  
  const submitData = async (event) => {
    event.preventDefault();

    setFormStatus(STATUS_PENDING);
    try {
      let updatedKelas = [...classes];
      
      if (edit) {
        const res = await KelasAPI.update(formData);
        updatedKelas = updateData(['id', formData.id], classes, formData);
      } else {
        const res = await KelasAPI.insert(formData);
        updatedKelas.push(formData);
      }
  
      setClasses(updatedKelas);
      setShowModal(false);
      setFormStatus(STATUS_SUCCESS);
      setFormData({});
  
      event.target.reset();
    } catch (error) {
      console.error(error);
      setFormStatus(STATUS_FAILED);
    }
  };

  const onAdd = () => {
    setEdit(false);
    setFormData({});
    setShowModal(true);
  };

  const onEdit = (id) => {
    const kelasForEdit = findData(['id', id], classes);

    setEdit(true);
    setFormData(kelasForEdit);
    setShowModal(true);
  };

  return (
    <div className="px-5 py-12">
      <ModalDialog show={showModal} onClose={() => setShowModal(false)} header={(
          <h2 className="text-2xl">
            <FontAwesomeIcon icon={faPlusCircle} className="text-primary-admin mr-4" />
            <span className="font-medium text-gray-500">Tambah Kelas</span>
          </h2>
      )}>
        <form onSubmit={submitData}>
          <ModalSegment>
            <div className="mb-4">
              {formStatus === STATUS_FAILED ? (<p className="text-center text-danger italic">Gagal mengirimkan data. Silahkan coba lagi</p>) : ''}
            </div>
            <div className="mb-4">
              <label htmlFor="nama" className="block font-bold mb-2">Nama Kelas</label>
              <Input type="text" name="nama" id="nama" value={formData.namakelas || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  namakelas: event.target.value,
                  jurusan: formData.jurusan,
                  tingkat: formData.tingkat
                })}
                placeholder="Cth. XII RPL 1" fullwidth />
            </div>
            <div className="mb-4">
              <label htmlFor="jurusan" className="block font-bold mb-2">Jurusan</label>
              <Input type="text" name="jurusan" id="jurusan" value={formData.jurusan || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  namakelas: formData.namakelas,
                  jurusan: event.target.value,
                  tingkat: formData.tingkat
                })}
                fullwidth />
            </div>
            <div className="mb-4">
              <label htmlFor="tingkat" className="block font-bold mb-2">Tingkat</label>
              <Input type="number" name="tingkat" id="tingkat" value={formData.tingkat || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  namakelas: formData.namakelas,
                  jurusan: formData.jurusan,
                  tingkat: event.target.value
                })}
                fullwidth />
            </div>
          </ModalSegment>
          <ModalSegment>
            <Button type="submit" className={'bg-primary-admin hover:bg-primary-admin-dark w-full'} text={formStatus === STATUS_PENDING ? 'Mengirim...' : edit ? 'Simpan' : 'Tambah'} disabled={formStatus === STATUS_PENDING} />
          </ModalSegment>
        </form>
      </ModalDialog>
      <div className="flex gap-4 items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary-admin text-2xl"/>
        <h1 className="text-2xl font-semibold">Daftar Kelas SMK N 1 Purwokerto</h1>
      </div>
      <div className="flex gap-4 items-center mb-4">
        <SearchInput onSearch={setQuery} />
        <ActionButton text="Tambah" icon={faPlusCircle} color="bg-primary-admin text-white hover:bg-primary-admin-dark focus:ring focus:ring-primary-fade" onClick={onAdd} />
      </div>
      <PaginatedTable
        data={displayedData}
        headings={['Nama', 'Jurusan', 'Tingkat']}
        visibleKeys={['namakelas', 'jurusan', 'tingkat']}
        onEdit={onEdit} onDelete={console.log} />
    </div>
  );
}
