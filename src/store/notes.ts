import { SliceCreator } from './slice';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { noteTableName } from '@/config';
import { getAllData, addDbData, setKeyVal } from '@/service/idb';

interface NotesState {
  notesList: NoteInfo[] | null;
  noteForm: NoteInfo;
}

interface NotesActions {
  getNotesList: () => void;
  setFormTitle: (title: string) => void;
  setSelectText: (text: string) => void;
  setCurrentDayId: (id: string) => void;
  addNote: () => void;
  resetForm: () => void;
  removeNote: (id: string) => void;
}
export type NotesSlice = NotesState & NotesActions;

export const noteStore: SliceCreator<keyof NotesSlice> = (set, get) => ({
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
      produce((state: NotesState) => {
        state.noteForm.title = title;
      })
    );
  },
  setSelectText: text => {
    set(
      produce((state: NotesState) => {
        state.noteForm.content = text;
      })
    );
  },
  setCurrentDayId: id => {
    set(
      produce((state: NotesState) => {
        state.noteForm.dayId = id;
      })
    );
  },
  resetForm: () => {
    set(
      produce((state: NotesState) => {
        state.noteForm = {} as NoteInfo;
      })
    );
  },
  addNote: async () => {
    const noteForm = JSON.parse(JSON.stringify(get().noteForm));
    noteForm.id = uuidv4();
    try {
      await addDbData(noteTableName, noteForm);
      get().resetForm();
      get().getNotesList();
    } catch (e) {
      console.error(e);
      //TODO handle the exception
    }
  },
  removeNote: async id => {
    const list = get().notesList || [];
    const index = list.findIndex(item => item.id === id);
    list.splice(index, 1);
    set({ notesList: list });
  },
});
