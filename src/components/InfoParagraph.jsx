import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export default function InfoParagraph(props) {
  return (
    <div className={'flex items-center ' + props.className}>
      <FontAwesomeIcon icon={faCircleInfo} className="text-blue-400 text-2xl ml-2 mr-4" />
      <p className="font-medium">{props.text}</p>
    </div>
  );
}
