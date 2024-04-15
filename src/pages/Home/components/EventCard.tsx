import { memo } from 'react';
import { useDateEventStore } from '@/store';

const EventDetail = memo((props: { list?: string[] }) => {
  if (props.list && props.list.length > 0) {
    return (
      <>
        {props.list.map((item, key) => (
          <p key={key}>{item}</p>
        ))}
      </>
    );
  } else {
    return <p> - </p>;
  }
});

const EventCard = memo(() => {
  const dayInfo = useDateEventStore(state => state.selectInfo?.info || ({} as DayItem));
  return (
    <>
      <div className="collapse bg-base-100 mb-4 b-rounded-2 shadow-md collapse-plus">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">白天</div>
        <div className="collapse-content">
          <EventDetail list={dayInfo.day} />
        </div>
      </div>
      <div className="collapse bg-base-100 mb-4 b-rounded-2 shadow-md collapse-plus">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">夜晚</div>
        <div className="collapse-content">
          <EventDetail list={dayInfo.night} />
        </div>
      </div>
    </>
  );
});

export default EventCard;

// position: absolute;
//     width: 39px;
//     height: 39px;
//     background: #fff;
//     box-shadow: 0 2px 5px 0 rgba(75,87,103,.2);
//     border-radius: 5px;
//     z-index: 0;

// width: 100%;
//     position: fixed;
//     z-index: 1001;
//     box-shadow: 0 -2px 4px 0 rgba(0,0,0,.05), 0 1px 4px 0 rgba(0,0,0,.05);
