export default function HeroCard(props) {
  return (
    <div className={'rounded-lg ' + props.background + ' ' + props.className}>
      <div className="px-5">
        {props.label}
        {props.content}
      </div>
      <div className="bg-white p-4 opacity-20"></div>
    </div>
  );
}
