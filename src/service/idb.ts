import { openDB } from 'idb';
import type { IDBPDatabase } from 'idb';
import { isArray, isObject } from '@/utils/index';

type InsertData =
  | string
  | number
  | DayItem
  | SummaryItem
  | DateIndexModel
  | InsertData[]
  | Record<string | number, InsertData[]>;
type DBInstance = IDBPDatabase<unknown> | null | undefined;

let db: DBInstance = null;

export const dbInit = async (dbCfg: DbConfig): Promise<DBInstance> => {
  let oldVer = 0;
  let newVer: number | null = 0;
  db = await openDB(dbCfg.name, dbCfg.version, {
    upgrade(db, oldVersion, newVersion) {
      oldVer = oldVersion;
      newVer = newVersion;
      if (oldVersion) return null;
      if (!dbCfg.table) return null;
      if (!oldVersion) {
        for (let i = 0; i < dbCfg.table.length; i++) {
          db.createObjectStore(dbCfg.table[i].name, dbCfg.table[i]?.option || {});
        }
      }
    },
  });
  if (newVer && oldVer < newVer) {
    return db;
  }
};

export const insertData = async (tableName: string, data: InsertData) => {
  if (!(isArray(data) || isObject(data))) {
    throw new Error('in insert，data type is Object or Array');
  }
  if (!db) {
    throw new Error('need init idb before');
  }
  const tx = db.transaction(tableName, 'readwrite');
  const store = tx.store;
  if (isArray(data)) {
    await Promise.all((data as InsertData[]).map(v => store.put(v)));
  } else {
    store.put(data);
  }
  await tx.done;
};

export const getData = async (tableName: string, key: string) => {
  if (!db) {
    throw new Error('need init idb before');
  }
  return db.get(tableName, key);
};
