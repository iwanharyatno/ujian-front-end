import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ActionButton({ icon, text, color, onClick }) {
  return (
    <button className={'rounded-md p-3 ' + color} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      <span>{text}</span>
    </button>
  );
}
