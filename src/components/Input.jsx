export default function Input({ fullwidth, className, ...rest}) {
  return (
    <input className={'px-4 py-3 bg-gray-300 rounded-md outline-none darker-placeholder focus:ring focus:ring-gray-100 ' + (fullwidth ? 'w-full' : '') + ' ' + className} {...rest} />
  );
}
