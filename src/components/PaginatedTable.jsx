import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

export function PaginatedTable({ data, headings, visibleKeys, onEdit, onDelete }) {
  const [currentPage, setCurrent] = useState(0);
  const pageIntervals = generateIntervals(data.length, 25);

  const currentInterval = pageIntervals[currentPage];

  return (
    <>
      <table className="p-2 bg-white border-x-2 border-t-2 border-gray-300 w-full">
        <thead>
          {headings.map((heading) => <TableHeading>{heading}</TableHeading>)}
          <TableHeading>Aksi</TableHeading>
        </thead>
        <tbody>
          {data.length ? data.slice(...currentInterval).map((datum) => (
            <tr>
              {visibleKeys.map((visibleKey) => <TableData>{datum[visibleKey]}</TableData>)}
              <TableData>
                <button className="mr-5 text-primary-admin hover:text-primary-dark" onClick={() => onEdit(datum.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="text-danger hover:text-danger-dark" onClick={() => onDelete(datum.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </TableData>
            </tr>
          )) : ''}
        </tbody>
      </table>
      <PaginationFooter activePageIndex={currentPage} pagesCount={pageIntervals.length} pageChange={setCurrent} />
    </>
  );
}

export function TableHeading({ children }) {
  return <th className="p-4 text-left border-b-4 border-gray-300 font-bold text-lg">{children}</th>;
}

export function TableData({ children }) {
  return <td className="px-4 py-2 border-b-4 border-gray-300">{children}</td>;
}

function PaginationFooter({ activePageIndex, pagesCount, pageChange }) {
  const pageList = [];
  for (let page = 1; page <= pagesCount; page++) {
    pageList.push(page);
  }

  const loadNext = () => {
    const nextIndex = activePageIndex + 1;

    if (nextIndex >= pagesCount) {
      pageChange(pagesCount - 1);
      return;
    }

    pageChange(nextIndex);
  }

  const loadPrev = () => {
    const prevIndex = activePageIndex - 1;

    if (prevIndex < 0) {
      pageChange(0);
      return;
    }

    pageChange(prevIndex);
  }

  return (
    <div className="bg-white border-x-2 border-b-2 border-gray-300 flex p-4 items-center px-16">
      <button className="w-8 h-8 text-white rounded bg-primary-admin hover:bg-primary-admin-dark" onClick={loadPrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="grow text-center">
        {pageList.map((page) => (
          <button className={'w-8 h-8 mx-1 rounded ' + ((page === activePageIndex + 1) ? 'text-white bg-primary-admin hover:bg-primary-admin-dark' : 'text-primary-admin hover:bg-primary-admin hover:text-white')} onClick={() => pageChange(page - 1)}>
            {page}
          </button>
        ))}
      </div>
      <button className="w-8 h-8 text-white rounded bg-primary-admin hover:bg-primary-admin-dark" onClick={loadNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

function generateIntervals(total, count=10) {
  const pageIndexes = [];
  const pageCount = Math.floor(total / count);

  for (let i = 0; i < pageCount; i++) {
    pageIndexes.push([i*count, (i*count)+count]);
  }

  if (total % count !== 0) pageIndexes.push([pageCount*count, total]);

  return pageIndexes;
}
