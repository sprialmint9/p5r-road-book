export const dbName = 'p5r_road_book';
export const dbVersion = 1;

export const dayTableName = 'p5r_day';

export const summaryTableName = 'p5r_summary';

export const indexTableName = 'p5r_index';

export const userTableName = 'p5r_user';

export const dbConfig = {
  name: 'p5r_road_book',
  version: 1,
  table: [
    {
      name: indexTableName,
      option: {
        keyPath: 'month',
        autoIncrement: false,
      },
    },
    {
      name: dayTableName,
      option: {
        keyPath: 'id',
        autoIncrement: false,
      },
    },
    {
      name: summaryTableName,
      option: {
        keyPath: 'month',
        autoIncrement: false,
      },
    },
    {
      name: userTableName,
    },
  ],
};

export const ApiUrl = '/';
