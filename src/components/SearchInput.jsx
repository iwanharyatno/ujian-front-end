import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchInput({ onSearch }) {
  return (
    <div className="flex items-center rounded bg-primary-fade">
      <button className="p-3 hover:bg-primary-admin hover:text-white">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input type="search" className="p-2 bg-primary-fade outline-none focus:ring focus:ring-primary" placeholder="Search" onChange={(event) => onSearch(event.target.value)} />
    </div>
  );
}
