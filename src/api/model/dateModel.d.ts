interface DbInfoModel {
  version: number;
}

type DayModel = DayItem[];

type SummaryModel = SummaryItem[];

interface DayIndexModel {
  id: string;
  day: number;
}
type DateIndexModel = {
  month: number;
  days: DayIndexModel[];
};
