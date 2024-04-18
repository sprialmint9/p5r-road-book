import { dbConfig, dayTableName, summaryTableName, indexTableName, userTableName } from '@/config';
import { dbInit, insertData, getAllData, getData, isEmptyTable, setKeyVal } from '@/service/idb';
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
    const indexInfo = await fetchDateIndex();
    const dayData = await fetchDateEvents();
    const summaryData = await fetchSummary();
    await insertData(indexTableName, indexInfo);
    await insertData(dayTableName, dayData);
    await insertData(summaryTableName, summaryData);
  }
  const indexInfo = await getAllData<DateIndexModel[]>(indexTableName);
  let selectInfo = await getAllData<SelectInfo>(userTableName, true);
  if (!selectInfo || (await isEmptyTable(userTableName))) {
    const defaultIndex = indexInfo[0];
    const dayIndex = defaultIndex.days[0];
    const dayInfo = await getData(dayTableName, dayIndex.id);
    const summaryInfo = await getData(summaryTableName, defaultIndex.month);
    selectInfo = {
      monthId: 0,
      dayId: defaultIndex.days[0].id,
      info: dayInfo,
      summary: summaryInfo,
    };
    await Promise.all(
      Object.entries(selectInfo).map(([key, value]) => setKeyVal(userTableName, key, value))
    );
  }
  const { setState, getState } = store;
  setState({ selectInfo });
  setState({ dateIndexMonth: indexInfo.map((v: DateIndexModel) => v.month) });
  getState().setDateIndexDays(selectInfo.monthId);
};
