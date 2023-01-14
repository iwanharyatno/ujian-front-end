export default function OffCanvas(props) {
  const handleClick = event => event.stopPropagation();

  return (
    <div className={'z-40 fixed top-0 left-0 w-full h-full bg-black/60 ' + (props.open ? 'h-full' : 'h-0' )} onClick={props.onOverlayClick}>
      <div className={'fixed w-full bottom-0 rounded-t-3xl transition-transform ' + (props.open ? 'translate-y-0' : 'translate-y-full' ) + ' ' + props.colors} onClick={handleClick}>
        {props.children}
      </div>
    </div>
  );
}
