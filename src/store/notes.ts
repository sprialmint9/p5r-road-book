import { SliceCreator } from './slice';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { noteTableName } from '@/config';
import { getAllData, addDbData, putDbData, deleteDbData } from '@/service/idb';

interface NotesState {
  notesList: NoteInfo[] | null;
  noteForm: NoteInfo;
  keyword: string;
  isShowAddModal: boolean;
}

interface NotesActions {
  getNotesList: () => void;
  setFormTitle: (title: string) => void;
  setSelectText: (text: string) => void;
  setCurrentDayId: (id: string) => void;
  addNote: () => void;
  resetForm: () => void;
  setKeyword: (keyword: string) => void;
  editNote: (info: NoteInfo) => void;
  removeNote: (id: string) => void;
  logicRemoveNote: (info: NoteInfo) => void;
  AddModalControl: (isShow: boolean) => void;
}
export type NotesSlice = NotesState & NotesActions;

export const noteStore: SliceCreator<keyof NotesSlice> = (set, get) => ({
  notesList: null,
  keyword: '',
  noteForm: {} as NoteInfo,
  isShowAddModal: false,
  AddModalControl: isShow => {
    set(
      produce((state: NotesState) => {
        state.isShowAddModal = isShow;
      })
    );
  },
  getNotesList: async () => {
    try {
      const list = await getAllData<NoteInfo[]>(noteTableName);
      list.sort((a, b) => (b.updateTime || 0) - (a.updateTime || 0));
      const result = list.filter(item => {
        if (item.isDelete) {
          return false;
        }
        if (
          item.title?.includes(get().keyword) ||
          item.content?.includes(get().keyword) ||
          get().keyword === ''
        ) {
          return true;
        }
        return false;
      });
      set({ notesList: result });
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
        state.noteForm.content = text.replace(/\n\n/g, '\n');
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
  setKeyword: keyword => {
    set(
      produce((state: NotesState) => {
        state.keyword = keyword;
      })
    );
    get().getNotesList();
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
    if (!noteForm.id) {
      noteForm.id = uuidv4();
    }
    if (!noteForm.updateTime) {
      noteForm.updateTime = new Date().getTime();
    }
    try {
      if (noteForm.id) {
        await putDbData(noteTableName, noteForm);
      } else {
        await addDbData(noteTableName, noteForm);
      }
      get().resetForm();
      get().getNotesList();
    } catch (e) {
      console.error(e);
      //TODO handle the exception
    }
  },
  editNote: (info: NoteInfo) => {
    set(
      produce((state: NotesState) => {
        state.noteForm = info;
      })
    );
  },
  removeNote: async id => {
    deleteDbData(noteTableName, id);
    get().resetForm();
    get().getNotesList();
  },
  logicRemoveNote: info => {
    get().editNote({ ...info, isDelete: true });
    get().addNote();
  },
});
