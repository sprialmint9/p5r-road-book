import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { dayInfoStore, DayInfoSlice } from './dayInfo';
import { noteStore, NotesSlice } from './notes';
import { trashStore, TrashSlice } from './trash';

export interface Store extends NotesSlice, DayInfoSlice, TrashSlice {}

export const store = create<Store>()(
  devtools((...a) => {
    return {
      ...noteStore(...a),
      ...dayInfoStore(...a),
      ...trashStore(...a),
    };
  })
);
export const useAllStore = store;
