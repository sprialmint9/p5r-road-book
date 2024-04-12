import { fetcher } from '@/service/fetcher';
import { ApiUrl } from '@/config';
enum Api {
  DB = 'json/db.json',
  DATE_INDEX = 'json/search.json',
  DATE_EVENTS = 'json/day.json',
  SUMMARY = 'json/summary.json',
}

export const fetchDbInfo = () => fetcher<DbInfoModel>(ApiUrl + Api.DB);
export const fetchDateIndex = () => fetcher<DateIndexModel[]>(ApiUrl + Api.DATE_INDEX);
export const fetchDateEvents = () => fetcher<DayModel>(ApiUrl + Api.DATE_EVENTS);
export const fetchSummary = () => fetcher<SummaryModel>(ApiUrl + Api.SUMMARY);
