import { useState } from 'react';

import { faInfoCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ScheduleSubject({ time, subject, color, state }) {
  let colorClass = '';
  let stateDecor = 'line-through';

  switch(state) {
    case 'attended':
      colorClass = 'bg-green-700 text-green-700';
      stateDecor += ' text-green-700';
      break;
    case 'skipped':
      colorClass = 'bg-red-700 text-red-700';
      stateDecor += ' text-red-700';
      break;
    default:
      colorClass = color;
      stateDecor = '';
  }

  return (
    <li className="relative border-l-4 p-5 mx-5">
      <div className={'absolute w-4 h-4 rounded-full ' + colorClass + ' left-0 top-1/2 -translate-x-2 -translate-y-2'}></div>
      <div className="relative flex items-stretch rounded-xl shadow-xl bg-gray-200">
        <div className={'w-4 ' + colorClass + ' rounded-l-xl'}></div>
        <div className={'px-3 py-5 ' + stateDecor}>
          <p className="font-bold mb-1">{time}</p>
          <p>{subject}</p>
        </div>
        {state === 'skipped' && <InfoTooltip text="Anda tidak mengisi daftar hadir." color={colorClass} />}
        {state === 'attended' && <FontAwesomeIcon className={'absolute -top-2 -right-2 text-2xl ' + colorClass + ' bg-transparent'} icon={faCheckCircle} />}
      </div>
    </li>
  );
}

function InfoTooltip({ text, className, color }) {
  const [shown, setShown] = useState(false);

  return (
    <div 
      className="absolute -top-2 -right-2"
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)} >
      <FontAwesomeIcon
        className={'ml-auto block mb-1 text-2xl hover:scale-125 cursor-pointer transition-all ' + color + ' bg-transparent'}
        icon={faInfoCircle} />
      <div className={'p-4 rounded-lg shadow bg-black text-white transition-all origin-top-right mr-4 ' + (shown ? 'scale-100' : 'scale-0')}>
        {text}
      </div>
    </div>
  );
}
