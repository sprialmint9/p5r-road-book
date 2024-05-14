import { useDateEventStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const data = [
  {
    id: '1233-123-13213',
    title: 'First Mark',
    dayId: '213123-2133113',
    content:
      'This is the first mark\nThis is the first markThis\n is the first markThis is the first mark',
  },
  {
    id: '123dsds-esf-3244',
    title: 'Second Mark',
    dayId: '213123-2133113',
    content: 'This is the second mark',
  },
  {
    id: '1233-123-13215',
    title: 'Third Mark',
    dayId: '213123-2133113',
    content: 'This is the third mark',
  },
];

const useNavToDate = (dayId?: string) => {
  const { quickToggle } = useDateEventStore.getState();
  const navigate = useNavigate();
  if (dayId) {
    quickToggle(dayId);
    navigate(-1); // 返回上一页
  }
};
const MarkItem = (props: MarkInfo) => {
  return (
    <div className="b-rounded-2 shadow-md bg-base-100 mb-4 p-4">
      {props.title ? <h2 className="mt-0">{props.title}</h2> : null}
      <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: props.content }}></p>
      {props.dayId ? (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <p className="link text-right mb-0" onClick={() => useNavToDate(props.dayId)}>
          {props.dayId}
        </p>
      ) : null}
    </div>
  );
};

const MarkList = () => {
  return (
    <>
      <div>
        {data.map(item => (
          <MarkItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default MarkList;
