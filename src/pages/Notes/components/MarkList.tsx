import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '@/store/notes';
import { useDateEventStore } from '@/store';

const useNavToDate = (dayId?: string) => {
  const { quickToggle } = useDateEventStore.getState();
  const navigate = useNavigate();
  if (dayId) {
    quickToggle(dayId);
    navigate(-1); // 返回上一页
  }
};
const MarkItem = (props: NoteInfo) => {
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
  const { notesList } = useNoteStore.getState();
  return (
    <>
      {notesList && notesList.map(item => <MarkItem key={item.id} {...item} />)}
      {(!notesList || !notesList?.length) && (
        <p className="text-center text-md c-gray p-12">暂无数据</p>
      )}
    </>
  );
};

export default MarkList;
