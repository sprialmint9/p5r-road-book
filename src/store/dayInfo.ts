import { SliceCreator } from './slice';
import { produce } from 'immer';
import { indexTableName, dayTableName, summaryTableName, userTableName } from '@/config';
import { getAllData, getData, getKeyByIndex, setKeyVal } from '@/service/idb';

interface DayInfoState {
  dateIndexMonth: number[] | null;
  dateIndexDays: DayIndexModel[] | null;
  allDateIndex: string[] | null;
  dayPosition: [number, number];
  selectInfo: Partial<SelectInfo | null>;
}

interface DayInfoActions {
  setDateIndexDays: (monthId: number) => void;
  setMonthInfo: (monthId: number, dayId?: string, changeDay?: boolean) => void;
  setDayInfo: (dayId: string) => void;
  quickToggle: (dayId: string) => void;
  setSelectInfoItem<K extends keyof SelectInfo>(key: K, value: SelectInfo[K]): void;
  updateDbInfo: () => void;
  setAllDateIndex: () => void;
  setDayPosition: (dayId: string) => void;
}

export type DayInfoSlice = DayInfoState & DayInfoActions;

export const dayInfoStore: SliceCreator<keyof DayInfoSlice> = (set, get) => ({
  dateIndexMonth: null,
  dateIndexDays: null,
  allDateIndex: null,
  dayPosition: [0, 1],
  selectInfo: null,
  setDateIndexDays: async monthId => {
    const currentIndex = await getData(indexTableName, monthId);
    set({ dateIndexDays: currentIndex.days });
  },
  setMonthInfo: async (monthId, dayId, changeDay = true) => {
    await get().setDateIndexDays(monthId);
    set(
      produce((state: DayInfoState) => {
        if (!state.selectInfo) return;
        if (changeDay) state.selectInfo.dayId = dayId || state.dateIndexDays?.[0].id;
        state.selectInfo.monthId = monthId;
      })
    );
    changeDay && (await get().setDayInfo(get().selectInfo?.dayId as string));

    const month = get().selectInfo?.info?.dateMonth;
    const summaryInfo = await getData(summaryTableName, month || 4);
    set(
      produce((state: DayInfoState) => {
        if (!state.selectInfo) return;
        state.selectInfo.summary = summaryInfo;
      })
    );
    get().updateDbInfo();
  },
  setDayInfo: async dayId => {
    const dayInfo = await getData(dayTableName, dayId);
    set(
      produce((state: DayInfoState) => {
        if (!state.selectInfo) return;
        state.selectInfo.info = dayInfo;
        state.selectInfo.dayId = dayId;
      })
    );
    get().setDayPosition(dayId);
    get().updateDbInfo();
  },
  setDayPosition(dayId) {
    set(
      produce((state: DayInfoState) => {
        if (!dayId) return;
        let dayPosition = state.allDateIndex?.findIndex(v => v === dayId) || 0;
        if (dayPosition === -1) {
          dayPosition = 0;
        }
        state.dayPosition = [dayPosition, state.allDateIndex?.length || 1];
      })
    );
  },
  async setAllDateIndex() {
    const info = await getAllData<DateIndexModel[]>(indexTableName);
    const dayToPosition: string[] = [];
    info.forEach(month => {
      month.days.forEach(dayEntry => {
        dayToPosition.push(dayEntry.id);
      });
    });
    set(
      produce((state: DayInfoState) => {
        state.allDateIndex = dayToPosition;
      })
    );
  },
  quickToggle: async (dayId: string) => {
    await get().setDayInfo(dayId);
    const selectInfo = get().selectInfo;
    if (selectInfo?.info?.dateMonth || selectInfo?.info?.dateMonth === 0) {
      const monthInfo = await getKeyByIndex(indexTableName, 'month', selectInfo?.info?.dateMonth);
      await get().setMonthInfo(monthInfo.id, '', false);
    }
  },
  setSelectInfoItem: async (key, value) => {
    if (key === 'monthId') {
      await get().setMonthInfo(+value);
    }
    if (key === 'dayId') {
      await get().setDayInfo('' + value);
    }
  },
  updateDbInfo: async () => {
    const selectInfo = get().selectInfo;
    if (selectInfo) {
      await Promise.all(
        Object.entries(selectInfo).map(([key, value]) => setKeyVal(userTableName, key, value))
      );
    }
  },
});
