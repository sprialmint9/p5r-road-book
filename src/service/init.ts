import { dbConfig, dayTableName, summaryTableName, indexTableName } from '@/config';
import { dbInit, insertData } from '@/service/idb';
import { fetchDateEvents, fetchSummary, fetchDbInfo, fetchDateIndex } from '@/api';
import { store } from '@/store';

export const initDb = async () => {
  const dbInfo = await fetchDbInfo();
  const currentCfg = {
    ...dbConfig,
    version: dbInfo.version,
  };
  const dbInstance = await dbInit(currentCfg);
  if (dbInstance) {
    const initData = store(state => state.initData);
    const indexInfo = await fetchDateIndex();
    const dayData = await fetchDateEvents();
    const summaryData = await fetchSummary();
    await insertData(indexTableName, indexInfo);
    await insertData(dayTableName, dayData);
    await insertData(summaryTableName, summaryData);
    initData();
  }
};
