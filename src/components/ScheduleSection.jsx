import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ScheduleSection({ forClass, children, onClose, ...rest }) {
  return (
    <section {...rest}>
      <div className="flex items-center p-5 mb-5">
        <FontAwesomeIcon className="text-primary mr-5" icon={faCalendarPlus} />
        <h2 className="font-bold flex-grow">Jadwal Ujian</h2>
        <button className="text-primary px-3 py-2 md:hidden focus:ring focus:ring-blue-200" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="mx-5 mb-8">
        <p className="text-gray-500 mb-2">Kelas</p>
        <p className="text-3xl font-bold">{forClass}</p>
      </div>
      <div>
        {children}
      </div>
    </section>
  );
}
