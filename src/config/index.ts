export const dbName = 'p5r_road_book';
export const dbVersion = 1;

export const dayTableName = 'p5r_day';

export const summaryTableName = 'p5r_summary';

export const indexTableName = 'p5r_index';

export const userTableName = 'p5r_user';

export const noteTableName = 'p5r_note';

export const dbConfig = {
  name: 'p5r_road_book',
  version: 1,
  table: [
    {
      name: indexTableName,
      option: {
        keyPath: 'id',
        autoIncrement: false,
      },
      index: [
        {
          name: 'month',
          indexName: 'month',
        },
      ],
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
    {
      name: noteTableName,
      option: {
        keyPath: 'id',
        autoIncrement: false,
      },
      index: [
        {
          name: 'updateTime',
          indexName: 'updateTime',
        },
      ],
    },
  ],
};

export const ApiUrl = '/';
