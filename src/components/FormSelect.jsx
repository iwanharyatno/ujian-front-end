import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FormSelect({ iconStart, iconEnd, iconEndClick, fullwidth, className, children, ...rest }) {
  return (
    <div className={'flex items-center border rounded ' + className} >
      {iconStart ? <FontAwesomeIcon icon={iconStart} className="p-4 text-primary" /> : '' }
      <select className={'ml-2 bg-white py-3 focus:ring focus:ring-blue-200 focus:outline-none ' + (fullwidth ? 'w-full' : '')} {...rest} >
        {children}
      </select>
      {iconEnd ? 
        <button type="button" onClick={iconEndClick} className="p-3 text-primary">
          <FontAwesomeIcon icon={iconEnd} />
        </button>
      : ''}
    </div>
  );
}
