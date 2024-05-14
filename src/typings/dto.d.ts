interface DbIndexConfig {
  name: string;
  indexName: string;
}

interface DbConfig {
  name: string;
  version: number;
  table: {
    name: string;
    option?: {
      keyPath: string;
      autoIncrement?: boolean;
    };
    index?: DbIndexConfig[];
  }[];
}

interface DayItem {
  date: string;
  dateMonth: number;
  dateDay: number;
  day: string[];
  night: string[];
  id: string;
  next: string;
  prev: string;
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

interface MarkInfo {
  dayId?: string;
  title?: string;
  content: string;
  id: string;
}
