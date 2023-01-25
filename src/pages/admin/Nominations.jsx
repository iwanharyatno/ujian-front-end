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

import Nomination from '../../api/nomination.js';
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

export default function Nominations() {
  const [nominations, setNominations] = useState([]);
  const [classes, setClasses] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [formStatus, setFormStatus] = useState({});

  const [filters, setFilters] = useState([]);

  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);

  const filterNominations = (source) => {
    let filtered = [...source];
    filters.forEach((matcher) => {
      if (!matcher) return;
      const [key, value] = matcher;
      filtered = filtered.filter((datum) => datum[key] == value);
    });

    return filtered;
  };


  const displayedData = searchData(query, filterNominations(nominations));

  const submitData = async (event) => {
    event.preventDefault();

    setFormStatus({
      type: STATUS_PENDING
    });
    try {
      let updatedNomination = [...nominations];
      
      if (edit) {
        const adjustedData = {
          nis: formData.nis,
          id: formData.id,
          namalengkap: formData.namalengkap,
          kelas: formData.kelas,
          noabsen: formData.noabsen
        };
        const result = await Nomination.update(adjustedData);
        adjustedData.kelas_id = adjustedData.kelas;
        adjustedData.user_id = adjustedData.id;
        updatedNomination = updateData(['user_id', formData.id], updatedNomination, adjustedData);
      } else {
        const res = await Nomination.insert(formData);
        updatedNomination.push(formData);
      }
  
      setNominations(updatedNomination);
      setShowModal(false);
      setFormStatus({
        type: STATUS_SUCCESS
      });
      setFormData({});
  
      event.target.reset();
    } catch (error) {
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
    document.title = 'Admin | Daftar Nominasi Peserta';
    let retryTimeout = null;
    const fetchData = async () => {
      try {
        const nominations = await Nomination.getAll();
        const classes = await KelasAPI.getAll();

        if (retryTimeout) clearTimeout(retryTimeout);

        setNominations(nominations);
        setClasses(classes);
      } catch (err) {
        console.error(err);
        retryTimeout = setTimeout(fetchData, 3000);
      }
    };

    fetchData();
  }, []);

  const onAdd = () => {
    setShowHint(!showHint);
  };

  const onEdit = (id) => {
    const nominationForEdit = findData(['id', id], nominations);

    nominationForEdit.kelas = nominationForEdit.kelas_id;
    nominationForEdit.id = nominationForEdit.user_id;

    setEdit(true);
    setFormData(nominationForEdit);
    setShowModal(true);
  };

  const onDelete = async (id) => {
    const confirmed = confirm('Yakin hapus data siswa ini?');

    if (!confirmed) return;
    await Nomination.delete(id);

    setNominations(
      deleteData(['user_id', id], nominations)
    );
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
              {formStatus.type === STATUS_FAILED ? (<p className="text-center text-danger italic">{formStatus.message || 'Gagal mengirimkan data. Silahkan coba lagi'}</p>) : ''}
            </div>
            <div className="mb-4 grid grid-cols-2 gap-x-4">
              <div>
                <label htmlFor="nis" className="block font-bold mb-2">NIS</label>
                <Input type="number" name="nis" id="nis" value={formData.nis || ''}
                  onChange={(event) => setFormData({
                    id: formData.id,
                    nis: event.target.value,
                    noabsen: formData.noabsen,
                    namalengkap: formData.namalengkap,
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
                    namalengkap: formData.namalengkap,
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
              <select className="px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 w-full" name="kelas" id="kelas" value={formData.kelas || ''}
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
            <Button type="submit" className={'bg-primary-admin hover:bg-primary-admin-dark w-full'} text={formStatus.type === STATUS_PENDING ? 'Mengirim...' : edit ? 'Simpan' : 'Tambah'} disabled={formStatus.type === STATUS_PENDING} />
          </ModalSegment>
        </form>
      </ModalDialog>
      <div className="flex gap-4 items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary-admin text-2xl"/>
        <h1 className="text-2xl font-semibold">Daftar Nominasi Peserta SMK N 1 Purwokerto</h1>
      </div>
      <div className="flex gap-4 items-center mb-4">
        <SearchInput onSearch={setQuery}/>
        <div className="relative">
          <ActionButton text="Filter" icon={faFilter} color="bg-warning text-white hover:bg-warning-dark focus:ring focus:ring-warning-fade" onClick={() => setShowFilter(true)} />
          <FilterMenu show={showFilter} onClose={() => setShowFilter(false)} onChange={(matchers) => setFilters(matchers)} />
    
        </div>
        <div className="relative">
          <ActionButton text="Tambah" icon={faPlusCircle} color="bg-primary-admin text-white hover:bg-primary-admin-dark focus:ring focus:ring-primary-fade" onClick={onAdd} />
          <Hint visible={showHint} text={<p>Untuk menambah nominasi baru, anda bisa memilih siswa di halaman Daftar Siswa kemudian memilih opsi <strong>Yang Dipilih > Tambah ke nominasi</strong>.</p>} cta={<Link to="/admin/nominations" className="block p-3">Buka Daftar Siswa</Link>} />
        </div>
      </div>
      <PaginatedTable
        data={displayedData}
        headings={['No Ujian', 'Nama', 'Kelas']}
        visibleKeys={['no_ujian', 'siswa.namalengkap', 'kelas.namakelas']}
        deleteKey="user_id"
        onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function Hint({ text, cta, visible }) {
  return (
    <div className={'absolute text-sm top-100 w-64 translate-y-1 bg-black text-white ' + (visible ? 'block' : 'hidden')}>
      <div className="p-3">
        {text}
      </div>
      {cta &&
      <div className="text-center border-t">
        {cta}
      </div>
      }
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
        <select className="block w-full bg-transparent border border-gray-400 p-2 rounded mb-4" onChange={() => updateMatchers(1, ['jurusan', event.target.value])}>
          <option value="">Jurusan</option>
          {filterDistinct(classes.map((kelas) => kelas.jurusan)).map((jurusan) => <option value={jurusan}>{jurusan}</option>)}
        </select>
      </div>
    </div>
  );
}
