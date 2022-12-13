export default function ScheduleSubject({ time, subject, color }) {
  return (
    <li className="relative border-l-4 p-5 mx-5">
      <div className={'absolute w-4 h-4 rounded-full ' + color + ' left-0 top-1/2 -translate-x-2 -translate-y-2'}></div>
      <div className="flex items-stretch rounded-xl shadow-xl bg-gray-200">
        <div className={'w-4 ' + color + ' rounded-l-xl'}></div>
        <div className="px-3 py-5">
          <p className="font-bold mb-1">{time}</p>
          <p>{subject}</p>
        </div>
      </div>
    </li>
  );
}
