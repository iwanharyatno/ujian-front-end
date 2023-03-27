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

import Room from '../../api/room.js';
import { default as KelasAPI } from '../../api/kelas.js';

import {
  filterDistinct,
  searchData,
  findData,
  deleteData,
  updateData,
  filterData
} from '../../utils/common.js';

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

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [classes, setClasses] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [formStatus, setFormStatus] = useState({});

  const [filters, setFilters] = useState([]);

  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);

  const displayedData = searchData(query, filterData(rooms, filters));

  const submitData = async (event) => {
    event.preventDefault();

    setFormStatus({
      type: STATUS_PENDING
    });
    try {
      let updatedRoom = [...rooms];
      
      if (edit) {
        console.log(formData);
        const adjustedData = {
          id: formData.id,
          no_ruangan: formData.no_ruangan,
          kode_ruangan: formData.gedung.concat(` ${formData.no_ruang_teori}`),
          kelas: formData.kelas,
          kapasitas: ((formData.absen_end - formData.absen_start) + 1)
        };
        const res = await Room.update(adjustedData);
        updatedRoom = updateData(['id', formData.id], rooms, adjustedData);
      } else {
        const adjustedData = {
          no_ruangan: formData.no_ruangan,
          kode_ruangan: formData.gedung.concat(` ${formData.no_ruang_teori}`),
          kelas: formData.kelas,
          kapasitas: ((formData.absen_end - formData.absen_start) + 1)
        };
        const res = await Room.insert(adjustedData);
        updatedRoom.push(adjustedData);
      }
  
      setRooms(updatedRoom);
      setShowModal(false);
      setFormStatus({
        type: STATUS_SUCCESS
      });
      setFormData({});
  
      event.target.reset();
    } catch (error) {
      console.error(error);
      console.error(error.response);

      const messages = Object.values(error.response.data.data.message)
        .map(message => message[0])
        .join('\n').trim();

      setFormStatus({
        type: STATUS_FAILED,
        message: messages
      });
    }
  };

  useEffect(() => {
    document.title = 'Admin | Daftar Ruangan';
    let retryTimeout = null;
    const fetchData = async () => {
      try {
        const rooms = await Room.getAll();
        const classes = await KelasAPI.getAll();

        if (retryTimeout) clearTimeout(retryTimeout);

        setRooms(rooms);
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
    const roomForEdit = findData(['id', id], rooms);

    roomForEdit.gedung = roomForEdit.kode_ruangan.split(' ')[0];
    roomForEdit.no_ruang_teori = roomForEdit.kode_ruangan.split(' ')[1];
    roomForEdit.absen_start = 1;
    roomForEdit.absen_end = roomForEdit.kapasitas;
    roomForEdit.kelas = roomForEdit.kelas_id;

    setEdit(true);
    setFormData(roomForEdit);
    setShowModal(true);
  };

  const onDelete = async (id) => {
    const confirmed = confirm('Tindakan ini akan menghapus data kelas ini. Konfirmasi?');

    if (!confirmed) return;
    const result = await Room.delete(id);
    const updatedRooms = [...rooms];
    setRooms(
      deleteData(['id', id], rooms)
    );
  };

  return (
    <div className="px-5 py-12">
      <ModalDialog show={showModal} onClose={() => setShowModal(false)} header={(
          <h2 className="text-2xl">
            <FontAwesomeIcon icon={faPlusCircle} className="text-primary-admin mr-4" />
            <span className="font-medium text-gray-500">Tambah Ruangan</span>
          </h2>
      )}>
        <form onSubmit={submitData}>
          <ModalSegment className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              {formStatus.type === STATUS_FAILED ? (<p className="text-center text-danger italic">{formStatus.message || 'Gagal mengirimkan data. Silahkan coba lagi'}</p>) : ''}
            </div>
            <div className="col-span-2">
              <label htmlFor="no_ruangan" className="block font-bold mb-2">No Ruangan Ujian</label>
              <Input type="number" name="no_ruangan" id="no_ruangan" value={formData.no_ruangan || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  no_ruangan: event.target.value,
                  gedung: formData.gedung,
                  no_ruang_teori: formData.no_ruang_teori,
                  kelas: formData.kelas,
                  absen_start: formData.absen_start,
                  absen_end: formData.absen_end,
                })}
                fullwidth />
            </div>
            <div>
              <label htmlFor="gedung" className="block font-bold mb-2">Gedung</label>
              <select className="px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 w-full" name="gedung" id="gedung" value={formData.gedung || 'AI'}
                onChange={(event) => setFormData({
                  id: formData.id,
                  no_ruangan: formData.no_ruangan,
                  gedung: event.target.value,
                  no_ruang_teori: formData.no_ruang_teori,
                  kelas: formData.kelas,
                  absen_start: formData.absen_start,
                  absen_end: formData.absen_end,
                })}>
                <option value="AI">AI</option>
                <option value="AII">AII</option>
                <option value="BI">BI</option>
                <option value="BII">BII</option>
                <option value="CI">CI</option>
                <option value="CII">CII</option>
                <option value="DI">DI</option>
                <option value="DII">DII</option>
                <option value="EI">EI</option>
                <option value="EII">EII</option>
              </select>
            </div>
            <div className="col-start-2">
              <label htmlFor="no_ruang_teori" className="block font-bold mb-2">No Ruang</label>
              <Input type="number" name="no_ruang_teori" id="no_ruang_teori" value={formData.no_ruang_teori || ''}
                onChange={(event) => setFormData({
                  id: formData.id,
                  no_ruangan: formData.no_ruangan,
                  gedung: formData.gedung,
                  no_ruang_teori: event.target.value,
                  kelas: formData.kelas,
                  absen_start: formData.absen_start,
                  absen_end: formData.absen_end,
                })}
                fullwidth />
            </div>
            <div>
              <label htmlFor="kelas" className="block font-bold mb-2">Kelas</label>
              <select className="px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 w-full" name="kelas" id="kelas" value={formData.kelas || formData.kelas_id || '1'}
                onChange={(event) => setFormData({
                  id: formData.id,
                  no_ruangan: formData.no_ruangan,
                  gedung: formData.gedung,
                  no_ruang_teori: formData.no_ruang_teori,
                  kelas: event.target.value,
                  absen_start: formData.absen_start,
                  absen_end: formData.absen_end,
                })}>
                {classes.map((kelas) => <option value={kelas.id}>{kelas.namakelas}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="absen_start" className="block font-bold mb-2">No Absen</label>
              <div className="flex items-center gap-1">
                <Input type="number" name="absen_start" id="absen_start" value={formData.absen_start || ''}
                  onChange={(event) => setFormData({
                    id: formData.id,
                    no_ruangan: formData.no_ruangan,
                    gedung: formData.gedung,
                    no_ruang_teori: formData.no_ruang_teori,
                    kelas: formData.kelas,
                    absen_start: event.target.value,
                    absen_end: formData.absen_end,
                  })}
                  fullwidth />
                <span>-</span>
                <Input type="number" name="absen_end" id="absen_end" value={formData.absen_end || ''}
                  onChange={(event) => setFormData({
                    id: formData.id,
                    no_ruangan: formData.no_ruangan,
                    gedung: formData.gedung,
                    no_ruang_teori: formData.no_ruang_teori,
                    kelas: formData.kelas,
                    absen_start: formData.absen_start,
                    absen_end: event.target.value,
                  })}
                  fullwidth />
              </div>
            </div>
          </ModalSegment>
          <ModalSegment>
            <Button type="submit" className={'bg-primary-admin hover:bg-primary-admin-dark w-full'} text={formStatus.type === STATUS_PENDING ? 'Mengirim...' : edit ? 'Simpan' : 'Tambah'} disabled={formStatus.type === STATUS_PENDING} />
          </ModalSegment>
        </form>
      </ModalDialog>
      <div className="flex gap-4 items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary-admin text-2xl"/>
        <h1 className="text-2xl font-semibold">Daftar Ruangan SMK N 1 Purwokerto</h1>
      </div>
      <div className="flex gap-4 items-center mb-4">
        <SearchInput onSearch={setQuery}/>
        <div className="relative">
          <ActionButton text="Filter" icon={faFilter} color="bg-warning text-white hover:bg-warning-dark focus:ring focus:ring-warning-fade" onClick={() => setShowFilter(true)} />
          <FilterMenu show={showFilter} onClose={() => setShowFilter(false)} onChange={(matchers) => setFilters(matchers)} />
        </div>
        <ActionButton text="Tambah" icon={faPlusCircle} color="bg-primary-admin text-white hover:bg-primary-admin-dark focus:ring focus:ring-primary-fade" onClick={onAdd} />
      </div>
      <PaginatedTable
        data={displayedData}
        headings={['No Ruangan', 'Code', 'Kelas', 'Kapasitas']}
        visibleKeys={['no_ruangan', 'kode_ruangan', 'kelas.namakelas', 'kapasitas']}
        onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function FilterMenu({ onClose, show, onChange }) {
  const [classes, setClasses] = useState([]);
  const [macthers, setMatchers] = useState(new Array(2));

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

  const updateMatchers = (index, matcher) => {
    const updatedMatchers = [...macthers];
    updatedMatchers[index] = matcher[1] ? matcher : null;

    setMatchers(updatedMatchers);

    if (onChange) onChange(updatedMatchers);
  };

  return (
    <div className={'absolute top-100 translate-y-1 w-64 bg-white border-2 border-gray-300 p-4 ' + (show ? 'block' : 'hidden')}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">Filter</p>
        <button onClick={onClose} className="text-lg">
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div>
        <select className="block w-full bg-transparent border border-gray-400 p-2 rounded mb-2" onChange={() => updateMatchers(0, ['kelas_id', event.target.value])}>
          <option value="">Kelas</option>
          {classes.map((kelas) => <option value={kelas.id}>{kelas.namakelas}</option>)}
        </select>
        <select className="block w-full bg-transparent border border-gray-400 p-2 rounded mb-4" onChange={() => updateMatchers(1, ['kelas.jurusan', event.target.value])}>
          <option value="">Jurusan</option>
          {filterDistinct(classes.map((kelas) => kelas.jurusan)).map((jurusan) => <option value={jurusan}>{jurusan}</option>)}
        </select>
      </div>
    </div>
  );
}
