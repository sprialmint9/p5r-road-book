import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { dayInfoStore, DayInfoSlice } from './dayInfo';
import { noteStore, NotesSlice } from './notes';

export interface Store extends NotesSlice, DayInfoSlice {}

export const store = create<Store>()(
  devtools((...a) => {
    return {
      ...noteStore(...a),
      ...dayInfoStore(...a),
    };
  })
);
export const useAllStore = store;
