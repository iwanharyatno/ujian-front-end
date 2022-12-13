import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FloatingButton(props) {
  return (
    <button className={'fixed w-14 h-14 rounded-full text-xl shadow-md bg-blue-400 transition-colors hover:bg-blue-500 focus:bg-blue-700 text-white ' + props.position + ' ' + props.className } type="button" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
}
