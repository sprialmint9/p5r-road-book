import { fetcher } from '@/service/fetcher';
import { ApiUrl } from '@/config';
enum Api {
  DB = 'json/db.json',
  DATE_INDEX = 'json/search.json',
  DATE_EVENTS = 'json/day.json',
  SUMMARY = 'json/summary.json',
}

export const fetchDbInfo = () => fetcher<DbInfoModel>(ApiUrl + Api.DB, { method: 'GET' });
export const fetchDateIndex = () =>
  fetcher<DateIndexModel[]>(ApiUrl + Api.DATE_INDEX, { method: 'GET' });
export const fetchDateEvents = () => fetcher<DayModel>(ApiUrl + Api.DATE_EVENTS, { method: 'GET' });
export const fetchSummary = () => fetcher<SummaryModel>(ApiUrl + Api.SUMMARY, { method: 'GET' });
