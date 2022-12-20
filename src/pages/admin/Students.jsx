import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faFilter,
  faPlusCircle,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import SearchInput from '../../components/SearchInput.jsx';
import ActionButton from '../../components/ActionButton.jsx';

import {
  PaginatedTable,
  TableHeading,
  TableData
} from '../../components/PaginatedTable.jsx';

export default function Students() {
  useEffect(() => {
    document.title = 'Admin | Daftar Siswa';
  }, []);

  return (
    <div className="px-5 py-12">
      <div className="flex gap-4 items-center mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="text-primary-admin text-2xl"/>
        <h1 className="text-2xl font-semibold">Daftar Siswa SMK N 1 Purwokerto</h1>
      </div>
      <div className="flex gap-4 items-center mb-4">
        <SearchInput />
        <ActionButton text="Filter" icon={faFilter} color="bg-warning text-white hover:bg-warning-dark focus:ring focus:ring-warning-fade" />
        <ActionButton text="Tambah" icon={faPlusCircle} color="bg-primary-admin text-white hover:bg-primary-admin-dark focus:ring focus:ring-primary-fade" />
      </div>
      <PaginatedTable>
        <thead>
          <tr>
            <TableHeading>NIS</TableHeading>
            <TableHeading>Nama</TableHeading>
            <TableHeading>Kelas</TableHeading>
            <TableHeading>Aksi</TableHeading>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableData>18762</TableData>
            <TableData>FIRMAN ZAMZAMI AZIZ</TableData>
            <TableData>XII RPL 1</TableData>
            <TableData>
              <button className="mr-5 text-primary-admin hover:text-primary-dark">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="text-danger hover:text-danger-dark">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </TableData>
          </tr>
          <tr>
            <TableData>18764</TableData>
            <TableData>IWAN HARYATNO</TableData>
            <TableData>XII RPL 1</TableData>
            <TableData>
              <button className="mr-5 text-primary-admin hover:text-primary-dark">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="text-danger hover:text-danger-dark">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </TableData>
          </tr>
          <tr>
            <TableData>18769</TableData>
            <TableData>MUHAMMAD RAIHAN KHALID</TableData>
            <TableData>XII RPL 1</TableData>
            <TableData>
              <button className="mr-5 text-primary-admin hover:text-primary-dark">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="text-danger hover:text-danger-dark">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </TableData>
          </tr>
        </tbody>
      </PaginatedTable>
    </div>
  );
}
