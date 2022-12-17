export default function Button(props) {
  return (
    <button type={props.type || 'button'} onClick={props.onClick} disabled={props.disabled} className={'py-2 px-4 rounded bg-primary-dark text-white focus:ring focus:ring-blue-200 hover:bg-blue-600 ' + props.className}>{props.text}</button>
  );
}
