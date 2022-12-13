import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CardButton({ text, icon, className, ...rest }) {
  return (
    <button className={'flex items-center h-14 rounded-xl shadow-md hover:bg-gray-100 focus:bg-gray-200 ' + className } {...rest}>
      <div className="w-2 h-full bg-gradient-to-t rounded-l-xl from-blue-400 to-violet-400">
      </div>
      <FontAwesomeIcon icon={icon} className="mx-4 text-blue-400" />
      <p className="text-gray-400 font-medium mr-5">{text}</p>
    </button>
  );
}
