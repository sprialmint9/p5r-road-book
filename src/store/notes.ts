import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import { noteTableName } from '@/config';
import { getAllData, getKeyByIndex, setKeyVal } from '@/service/idb';

interface State {
  notesList: NoteInfo[] | null;
  noteForm: NoteInfo;
}

interface Actions {
  getNotesList: () => void;
  setFormTitle: (title: string) => void;
  setSelectText: (text: string) => void;
  setCurrentDayId: (id: string) => void;
  addNote: (note: NoteInfo) => void;
  removeNote: (id: string) => void;
}
export const store = create(
  devtools<State & Actions>(set => {
    return {
      notesList: null,
      noteForm: {} as NoteInfo,
      getNotesList: async () => {
        try {
          const list = await getAllData<NoteInfo[]>(noteTableName);
          set({ notesList: list });
        } catch (e) {
          console.error(e);
        }
      },
      setFormTitle: title => {
        set(
          produce((state: State) => {
            state.noteForm.title = title;
          })
        );
      },
      setSelectText: text => {
        set(
          produce((state: State) => {
            state.noteForm.content = text;
          })
        );
      },
      setCurrentDayId: id => {
        set(
          produce((state: State) => {
            state.noteForm.dayId = id;
          })
        );
      },
      addNote: async note => {
        const list = store.getState().notesList || [];
        list.push(note);
        set({ notesList: list });
        setKeyVal(noteTableName, 'Note', list);
      },
      removeNote: async id => {
        const list = store.getState().notesList || [];
        const index = list.findIndex(item => item.id === id);
        list.splice(index, 1);
        set({ notesList: list });
      },
    };
  })
);
export const useNoteStore = store;
