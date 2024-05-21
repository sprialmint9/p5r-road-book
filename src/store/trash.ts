import { SliceCreator } from './slice';
import { noteTableName } from '@/config';
import { getAllData, currentDb, putDbData } from '@/service/idb';

interface TrashState {
  trashList: NoteInfo[] | null;
}

interface TrashActions {
  getTrashList: () => void;
  recoverNote: (info: NoteInfo) => void;
  clearTrash: () => void;
}
export type TrashSlice = TrashState & TrashActions;

export const trashStore: SliceCreator<keyof TrashSlice> = (set, get) => ({
  trashList: null,
  getTrashList: async () => {
    try {
      const list = await getAllData<NoteInfo[]>(noteTableName);
      list.sort((a, b) => (b.updateTime || 0) - (a.updateTime || 0));
      const result = list.filter(item => {
        if (item.isDelete) {
          return true;
        }
        return false;
      });
      set({ trashList: result });
    } catch (e) {
      console.error(e);
    }
  },
  recoverNote: async (info: NoteInfo) => {
    try {
      await putDbData(noteTableName, { ...info, isDelete: false });
      get().getTrashList();
    } catch (e) {
      console.error(e);
      //TODO handle the exception
    }
  },
  clearTrash: async () => {
    const db = currentDb();
    if (!db) return;
    const tx = db.transaction(noteTableName, 'readwrite');
    const store = tx.objectStore(noteTableName);
    const data = await store.getAll();
    await Promise.all(
      data.map(async item => {
        if (item.isDelete) {
          await store.delete(item.id);
        }
      })
    );
    await tx.done;
    get().getTrashList();
  },
});
