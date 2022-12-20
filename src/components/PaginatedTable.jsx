import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export function PaginatedTable({ children}) {
  return (
    <>
      <table className="p-2 bg-white border-x-2 border-t-2 border-gray-300 w-full">
      {children}
      </table>
      <PaginationFooter activePage={1} pagesCount={5} />
    </>
  );
}

export function TableHeading({ children }) {
  return <th className="p-4 text-left border-b-4 border-gray-300 font-bold text-lg">{children}</th>;
}

export function TableData({ children }) {
  return <td className="px-4 py-2 border-b-4 border-gray-300">{children}</td>;
}

function PaginationFooter({ activePage, pagesCount }) {
  const pageList = [];
  for (let page = 1; page <= pagesCount; page++) {
    pageList.push(page);
  }

  return (
    <div className="bg-white border-x-2 border-b-2 border-gray-300 flex p-4 items-center px-16">
      <button className="w-8 h-8 text-white rounded bg-primary-admin hover:bg-primary-admin-dark">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="grow text-center">
        {pageList.map((page) => (
          <button className={'w-8 h-8 mx-1 rounded ' + ((page === activePage) ? 'text-white bg-primary-admin hover:bg-primary-admin-dark' : 'text-primary-admin hover:bg-primary-admin hover:text-white')}>
            {page}
          </button>
        ))}
      </div>
      <button className="w-8 h-8 text-white rounded bg-primary-admin hover:bg-primary-admin-dark">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
