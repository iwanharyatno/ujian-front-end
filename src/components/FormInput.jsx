import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FormInput({ iconStart, iconEnd, iconEndClick, fullwidth, className, ...rest }) {
  return (
    <div className={'flex items-center border rounded ' + className} >
      {iconStart ? <FontAwesomeIcon icon={iconStart} className="p-4 text-blue-400" /> : '' }
      <input className={'py-3 focus:ring focus:ring-blue-200 focus:outline-none ' + (fullwidth ? 'w-full' : '')} {...rest} />
      {iconEnd ? 
        <button type="button" onClick={iconEndClick} className="p-3 text-blue-400">
          <FontAwesomeIcon icon={iconEnd} />
        </button>
      : ''}
    </div>
  );
}
