import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import { indexTableName, dayTableName, summaryTableName } from '@/config';
import { getData } from '@/service/idb';

interface State {
  dateIndexMonth: number[] | null;
  dateIndexDays: DayIndexModel[] | null;
  selectInfo: Partial<SelectInfo | null>;
}

interface Actions {
  setDateIndexDays: (monthId: number) => void;
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
      setSelectInfoItem: async (key, value) => {
        if (key === 'monthId') {
          const summaryInfo = await getData(summaryTableName, value as number);
          set(
            produce((state: State) => {
              if (state.selectInfo) {
                state.selectInfo.summary = summaryInfo;
              }
            })
          );
        }
        if (key === 'dayId') {
          const dayInfo = await getData(dayTableName, value as number);
          set(
            produce((state: State) => {
              if (state.selectInfo) {
                state.selectInfo.info = dayInfo;
              }
            })
          );
        }
        set(
          produce(async (state: State) => {
            if (!state.selectInfo) return;
            if (key === 'monthId') {
              const summaryInfo = await getData(summaryTableName, value as number);
              state.selectInfo.summary = summaryInfo;
            }
            // TODO
            if (key === 'dayId') {
              const dayInfo = await getData(dayTableName, value as number);
              state.selectInfo.info = dayInfo;
            }
            state.selectInfo[key] = value;
          })
        );
      },
    };
  })
);
export const useDateEventStore = store;
