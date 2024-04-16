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

export default MonthSelect;
