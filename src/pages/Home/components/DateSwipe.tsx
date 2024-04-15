import { useDateEventStore } from '@/store';

const MonthSelect = () => {
  // hook 内使用了useRef和 useEffect，所以不需要再次定义
  const selectedMonth = useDateEventStore(state => state.selectInfo?.monthId || 0);
  const monthList = useDateEventStore(state => state.dateIndexMonth || []);
  const setSelectInfoItem = useDateEventStore(state => state.setSelectInfoItem);
  const handleSelectMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = +e.target.value;
    setSelectInfoItem('monthId', month);
  };

  return (
    <label className="label">
      <select
        className="select select-bordered select-xs w-15 text-sm"
        value={selectedMonth}
        onChange={e => handleSelectMonth(e)}
      >
        <option value={''}>D</option>
        {monthList.map((item, key) => (
          <option value={key} key={key}>
            {item}
          </option>
        ))}
      </select>
      <span className="label-text-alt ml-1 text-sm">月</span>
    </label>
  );
};

const DaySelect = () => {
  // hook 内使用了useRef和 useEffect，所以不需要再次定义
  const selectedDay = useDateEventStore(state => state.selectInfo?.dayId || '');
  const days = useDateEventStore(state => state.dateIndexDays || []);
  const setSelectInfoItem = useDateEventStore(state => state.setSelectInfoItem);
  const handleSelectDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dayId = e.target.value;
    setSelectInfoItem('dayId', dayId);
  };

  return (
    <label className="label">
      <select
        className="select select-bordered select-xs w-15 text-sm"
        value={selectedDay}
        onChange={e => handleSelectDay(e)}
      >
        <option value={''}>M</option>
        {days.map(item => (
          <option value={item.id} key={item.id}>
            {item.day}
          </option>
        ))}
      </select>
      <span className="label-text-alt ml-1 text-sm">日</span>
    </label>
  );
};

const DateSwipe = () => {
  const dayInfo = useDateEventStore(state => state.selectInfo?.info || ({} as DayItem));
  return (
    <div className="bg-base-100 ml-a mr-a mb-4 b-rounded-2 shadow-md flex items-center overflow-hidden">
      <div className="flex items-center justify-center mr-a w-8 self-stretch font-size-5 active:bg-base-200">
        <i className="i-material-symbols-arrow-back-ios c-black"></i>
      </div>
      <div className="flex-auto flex flex-col items-center">
        <div className="flex">
          <MonthSelect />
          <DaySelect />
        </div>
        <div className="text-center pt-3 pb-4 w-24">
          <div className="block text-8">{dayInfo.dateMonth || '-'}</div>
          <div className="divider mt-1 mb-1"></div>
          <div className="block text-14">{dayInfo.dateDay || '-'}</div>
        </div>
      </div>
      <div className="flex items-center justify-center ml-a w-8 self-stretch font-size-5 active:bg-base-200">
        <i className="i-material-symbols-arrow-forward-ios c-black"></i>
      </div>
    </div>
  );
};

export default DateSwipe;
