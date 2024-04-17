import { useEffect, useState } from 'react';
import { useDateEventStore } from '@/store';
import DaySelect from './DaySelect';
import MonthSelect from './MonthSelect';

const DateSwipe = () => {
  const dayInfo = useDateEventStore(state => state.selectInfo?.info || ({} as DayItem));
  const quickToggle = useDateEventStore(state => state.quickToggle);
  const [stepState, setStepState] = useState([false, false]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft': // 向左事件 - 位置减减
          quickToggle(dayInfo.prev);
          setStepState([true, false]);
          break;
        case 'ArrowRight': // 向右事件 - 位置加加
          quickToggle(dayInfo.next);
          setStepState([false, true]);
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown); // 添加全局事件
    return () => {
      window.removeEventListener('keydown', onKeyDown); // 销毁
    };
  }, [dayInfo, quickToggle]);

  useEffect(() => {
    const onKeyUp = () => setStepState([false, false]);
    window.addEventListener('keyup', onKeyUp); // 添加全局事件
    return () => {
      window.removeEventListener('keyup', onKeyUp); // 销毁
    };
  }, [setStepState]);

  return (
    <div className="bg-base-100 mb-4 b-rounded-2 shadow-md flex items-center overflow-hidden md:sticky md:top-18">
      <div
        className={`flex items-center justify-center mr-a w-12 self-stretch cursor-pointer select-none font-size-5 active:bg-base-200 ${
          stepState[0] ? 'bg-base-200' : ''
        }`}
        onClick={() => quickToggle(dayInfo.prev)}
      >
        <i className="i-material-symbols-arrow-back-ios c-black"></i>
      </div>
      <div className="flex-auto flex flex-col items-center">
        <div className="flex">
          <MonthSelect />
          <DaySelect />
        </div>
        <label
          className="text-center p-3 pb-0 pt-1 mb-3 w-24 cursor-pointer select-none active:bg-base-200 active:b-rounded-2"
          htmlFor="summaryModal"
        >
          <div className="block text-8">{dayInfo.dateMonth || '-'}</div>
          <div className="divider mt-1 mb-1"></div>
          <div className="block text-14">{dayInfo.dateDay || '-'}</div>
        </label>
      </div>
      <div
        className={`flex items-center justify-center ml-a w-12 cursor-pointer select-none self-stretch font-size-5 active:bg-base-200 ${
          stepState[1] ? 'bg-base-200' : ''
        }`}
        onClick={() => quickToggle(dayInfo.next)}
      >
        <i className="i-material-symbols-arrow-forward-ios c-black"></i>
      </div>
    </div>
  );
};

export default DateSwipe;
