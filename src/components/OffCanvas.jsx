export default function OffCanvas(props) {
  const displayClass = props.open ? 'block' : 'hidden';

  const handleClick = event => event.stopPropagation();

  return (
    <div className={'z-40 fixed top-0 left-0 w-full h-full bg-black/60 ' + displayClass} onClick={props.onOverlayClick}>
      <div className={'fixed w-full bottom-0 rounded-t-3xl ' + displayClass + ' ' + props.colors} onClick={handleClick}>
        {props.children}
      </div>
    </div>
  );
}
