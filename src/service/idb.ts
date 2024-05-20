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
  | NoteInfo[]
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
          const currentStore = db.createObjectStore(
            dbCfg.table[i].name,
            dbCfg.table[i]?.option || {}
          );
          const index = dbCfg.table[i].index || [];
          if (index) {
            for (let j = 0; j < index.length; j++) {
              const item = index[j];
              currentStore.createIndex(item.name, item.indexName);
            }
          }
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

export const setKeyVal = async (tableName: string, key: string, val: unknown) => {
  if (!db) {
    throw new Error('need init idb before');
  }
  db.put(tableName, val, key);
};

export const getData = async (tableName: string, key: string | number) => {
  if (!db) {
    throw new Error('need init idb before');
  }
  return db.get(tableName, key);
};

export function getAllData(
  tableName: string,
  keyVal?: boolean
): Promise<Record<string | number, unknown>>;
export function getAllData<T>(tableName: string, keyVal?: boolean): Promise<T>;
export async function getAllData<T>(
  tableName: string,
  keyVal: boolean = false
): Promise<Record<string | number, unknown> | T> {
  if (!db) {
    throw new Error('need init idb before');
  }

  if (keyVal) {
    const data: { [key: string]: T } = {};
    let cursor = await db.transaction(tableName).store.openCursor();

    while (cursor) {
      data[String(cursor.key)] = cursor.value; // 将 cursor.key 转换为字符串类型
      cursor = await cursor.continue();
    }

    return data;
  }
  return db.getAll(tableName) as T;
}

export const isEmptyTable = async (tableName: string) => {
  if (!db) {
    throw new Error('need init idb before');
  }
  const len = await db.count(tableName);
  return len === 0;
};

export const getKeyByIndex = async (tableName: string, index: string, key: IDBValidKey) => {
  if (!db) {
    throw new Error('need init idb before');
  }
  return await db.getFromIndex(tableName, index, key);
};

export async function addDbData<T>(tableName: string, data: T) {
  if (!db) {
    throw new Error('need init idb before');
  }
  const tx = db.transaction(tableName, 'readwrite');
  await tx.store.add(data);
  await tx.done;
}
export async function putDbData<T>(tableName: string, data: T) {
  if (!db) {
    throw new Error('need init idb before');
  }
  const tx = db.transaction(tableName, 'readwrite');
  await tx.store.put(data);
  await tx.done;
}
export async function deleteDbData(tableName: string, key: IDBKeyRange | IDBValidKey) {
  if (!db) {
    throw new Error('need init idb before');
  }
  const tx = db.transaction(tableName, 'readwrite');
  await tx.store.delete(key);
  await tx.done;
}
