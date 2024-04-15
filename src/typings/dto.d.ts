interface DbConfig {
  name: string;
  version: number;
  table: {
    name: string;
    option?: {
      keyPath: string;
      autoIncrement?: boolean;
    };
  }[];
}

interface DayItem {
  date: string;
  dateMonth: number;
  dateDay: number;
  day: string[];
  night: string[];
  id: string;
}

interface SummaryItem {
  month: number;
  summary: string[];
}

interface SelectInfo {
  monthId: number;
  dayId: string;
  info: DayItem;
  summary: SummaryItem;
}
