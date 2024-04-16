import { useDateEventStore } from '@/store';

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

export default DaySelect;
