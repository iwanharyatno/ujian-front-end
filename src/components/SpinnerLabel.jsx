export default function SpinnerLabel({ text, className, fullscreen }) {
  return (
    <div className={'flex flex-col justify-center items-center gap-3 ' + (fullscreen ? 'fixed w-full h-full' : '')}>
      <div className="animate-spin w-12 h-12 rounded-full border-4 border-primary border-t-primary/20"></div>
      <p className="text-gray-400">{text}</p>
    </div>
  );
}
