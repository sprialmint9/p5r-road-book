import { useNavigate } from 'react-router-dom';
import { useAllStore } from '@/store';

const useNavToDate = (dayId?: string) => {
  const { quickToggle } = useAllStore.getState();
  const navigate = useNavigate();
  if (dayId) {
    quickToggle(dayId);
    navigate(-1); // 返回上一页
  }
};

const DropMenu = props => {
  return (
    <div className="absolute top-0 right-0 dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2 b-rounded-2">
        <i className="i-material-symbols-more-horiz"></i>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu menu-sm p-2 m-0 shadow bg-base-300 b-1 b-coolGray b-solid rounded-box b-rounded-2 w-20"
      >
        <li>
          <a>跳转</a>
        </li>
        <li>
          <a>编辑</a>
        </li>
        <li>
          <a>删除</a>
        </li>
      </ul>
    </div>
  );
};

const MarkItem = (props: NoteInfo) => {
  return (
    <div className="b-rounded-2 shadow-md bg-base-100 mb-4 p-4 relative">
      {props.title ? <h2 className="mt-0 pr-8">{props.title}</h2> : null}
      <p style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: props.content }}></p>
      <DropMenu />
    </div>
  );
};

const MarkList = () => {
  const notesList = useAllStore(state => state.notesList);
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
