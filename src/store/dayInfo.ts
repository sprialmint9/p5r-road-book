import { SliceCreator } from './slice';
import { produce } from 'immer';
import { indexTableName, dayTableName, summaryTableName, userTableName } from '@/config';
import { getData, getKeyByIndex, setKeyVal } from '@/service/idb';

interface DayInfoState {
  dateIndexMonth: number[] | null;
  dateIndexDays: DayIndexModel[] | null;
  selectInfo: Partial<SelectInfo | null>;
}

interface DayInfoActions {
  setDateIndexDays: (monthId: number) => void;
  setMonthInfo: (monthId: number, dayId?: string, changeDay?: boolean) => void;
  setDayInfo: (dayId: string) => void;
  quickToggle: (dayId: string) => void;
  setSelectInfoItem<K extends keyof SelectInfo>(key: K, value: SelectInfo[K]): void;
  updateDbInfo: () => void;
}

export type DayInfoSlice = DayInfoState & DayInfoActions;

export const dayInfoStore: SliceCreator<keyof DayInfoSlice> = (set, get) => ({
  dateIndexMonth: null,
  dateIndexDays: null,
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
    get().updateDbInfo();
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
