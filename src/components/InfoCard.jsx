export default function InfoCard(props) {
  return (
    <div className={'rounded-lg p-2 ' + props.background + ' ' + props.className}>
      {props.label}
      <div className="bg-white/20 mt-1 text-2xl text-center px-4 py-7 rounded">
        {props.content}
      </div>
    </div>
  );
}
