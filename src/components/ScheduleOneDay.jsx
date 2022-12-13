export default function ScheduleOneDay({ date, children }) {
  const { dayName, dayNumber, month } = formatAndSplitDate(new Date(date));

  return (
    <div>
      <div className="m-5">
        <p className="text-gray-500">{dayName}</p>
        <span className="text-3xl">{dayNumber} </span>
        <span className="text-gray-500">{month}</span>
      </div>
      <ul className="mx-0">
        {children}
      </ul>
    </div>
  );
}

function formatAndSplitDate(date) {
  const splittedDate = 
    date.toLocaleString('id-ID', { dateStyle: 'full' })
      .replace(/,/, '')
      .split(' ');

  return {
    dayName: splittedDate[0],
    dayNumber: splittedDate[1],
    month: splittedDate[2],
    year: splittedDate[3]
  };
}
