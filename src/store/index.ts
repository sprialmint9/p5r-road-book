import { create } from 'zustand';
import { getData } from '@/service/idb';
// import { userTableName, dayTableName, summaryTableName, indexTableName } from '@/config';

// interface IdbInfo {
//   indexInfo: DateIndexModel[];
//   dayData: DayItem[];
//   summaryData: SummaryItem[];
//   selectInfo?: SelectInfo;
// }

interface DateEventState {
  dateIndexMonth: number[] | null;
  dateIndexDays: DayIndexModel[] | null;
  dateEvent: DayItem | null;
  summary: SummaryItem | null;
  selectInfo: SelectInfo;
  setDateEvent: (val: DayItem) => void;
  setSummary: (val: SummaryItem) => void;
  initData: () => void;
}

export const store = create<DateEventState>(set => ({
  dateIndexMonth: null,
  dateIndexDays: null,
  dateEvent: null,
  summary: null,
  selectInfo: null,
  setDateEvent: val => set({ dateEvent: val }),
  setSummary: val => set({ summary: val }),
  initData: async () => {
    const selectInfo = await getData('userTableName', 'selectInfo');
    // if (!selectInfo) {
    //   const indexInfo = await getData(indexTableName, 'indexInfo');
    //   selectInfo = {
    //     month: val.indexInfo[0].month,
    //     day: val.indexInfo[0].days[0].day,
    //     dayId: val.indexInfo[0].days[0].id,
    //     info: val.dayData[0],
    //     summary: val.summaryData[0],
    //   };
    // }
    // set({ dateIndexMonth: val.indexInfo.map(v => v.month) });
    set({ selectInfo: selectInfo || {} });
    // set({ dateIndexMonth: val.month });
    // set({ dateIndexDays: val.days });
    // set({ dateIndexDays: val.days });
    // set({ dateIndexDays: val.days });
  },
}));
export const useDateEventStore = store;
