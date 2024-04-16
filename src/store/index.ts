import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import { indexTableName, dayTableName, summaryTableName } from '@/config';
import { getData, getKeyByIndex } from '@/service/idb';

interface State {
  dateIndexMonth: number[] | null;
  dateIndexDays: DayIndexModel[] | null;
  selectInfo: Partial<SelectInfo | null>;
}

interface Actions {
  setDateIndexDays: (monthId: number) => void;
  setMonthInfo: (monthId: number, dayId?: string, changeDay?: boolean) => void;
  setDayInfo: (dayId: string) => void;
  quickToggle: (dayId: string) => void;
  setSelectInfoItem<K extends keyof SelectInfo>(key: K, value: SelectInfo[K]): void;
}

export const store = create(
  devtools<State & Actions>(set => {
    return {
      dateIndexMonth: null,
      dateIndexDays: null,
      selectInfo: null,
      setDateIndexDays: async monthId => {
        const currentIndex = await getData(indexTableName, monthId);
        set({ dateIndexDays: currentIndex.days });
      },
      setMonthInfo: async (monthId, dayId, changeDay = true) => {
        await store.getState().setDateIndexDays(monthId);
        set(
          produce((state: State) => {
            if (!state.selectInfo) return;
            if (changeDay) state.selectInfo.dayId = dayId || state.dateIndexDays?.[0].id;
            state.selectInfo.monthId = monthId;
          })
        );
        changeDay &&
          (await store.getState().setDayInfo(store.getState().selectInfo?.dayId as string));

        const month = store.getState().selectInfo?.info?.dateMonth;
        const summaryInfo = await getData(summaryTableName, month || 4);
        set(
          produce((state: State) => {
            if (!state.selectInfo) return;
            state.selectInfo.summary = summaryInfo;
          })
        );
      },
      setDayInfo: async dayId => {
        const dayInfo = await getData(dayTableName, dayId);
        set(
          produce((state: State) => {
            if (!state.selectInfo) return;
            state.selectInfo.info = dayInfo;
            state.selectInfo.dayId = dayId;
          })
        );
      },
      quickToggle: async (dayId: string) => {
        await store.getState().setDayInfo(dayId);
        const selectInfo = store.getState().selectInfo;
        if (selectInfo?.info?.dateMonth || selectInfo?.info?.dateMonth === 0) {
          const monthInfo = await getKeyByIndex(
            indexTableName,
            'month',
            selectInfo?.info?.dateMonth
          );
          await store.getState().setMonthInfo(monthInfo.id, '', false);
        }
      },
      setSelectInfoItem: async (key, value) => {
        if (key === 'monthId') {
          await store.getState().setMonthInfo(+value);
        }
        if (key === 'dayId') {
          await store.getState().setDayInfo('' + value);
        }
      },
    };
  })
);
export const useDateEventStore = store;
