import { useNavigate } from 'react-router-dom';
import { useAllStore } from '@/store';
import { useToast } from '@/hooks';

const DropMenu = (props: NoteInfo) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { quickToggle, editNote, removeNote, AddModalControl } = useAllStore.getState();
  const navToDate = (dayId?: string) => {
    if (dayId) {
      quickToggle(dayId);
      navigate(-1); // 返回上一页
    }
  };
  const handleEditNote = (props: NoteInfo) => {
    editNote(props);
    AddModalControl(true);
  };
  const handleRemoveNote = (props: NoteInfo) => {
    removeNote(props.id);
    showToast('操作成功', 'success');
  };
  return (
    <div className="absolute top-0 right-0 dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2 b-rounded-2">
        <i className="i-material-symbols-more-horiz"></i>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu menu-sm p-2 m-0 shadow bg-base-200 b-1 b-coolGray b-solid rounded-box b-rounded-2 w-20"
      >
        <li className={props.dayId ? '' : 'disabled'}>
          <a onClick={() => navToDate(props.dayId)}>跳转</a>
        </li>
        <li>
          <a onClick={() => handleEditNote(props)}>编辑</a>
        </li>
        <li>
          <a onClick={() => handleRemoveNote(props)}>删除</a>
        </li>
      </ul>
    </div>
  );
};

const NoteItem = (props: NoteInfo) => {
  const content = props.content.replace(/\n/g, '<br>');
  return (
    <div className="b-rounded-2 shadow-md bg-base-100 mb-4 p-4 relative">
      {props.title ? <h2 className="mt-0 pr-8">{props.title}</h2> : null}
      <p
        className="lh-normal"
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: content }}
      ></p>
      <DropMenu {...props} />
    </div>
  );
};

const NoteList = () => {
  const notesList = useAllStore(state => state.notesList);
  return (
    <>
      {notesList && notesList.map(item => <NoteItem key={item.id} {...item} />)}
      {(!notesList || !notesList?.length) && (
        <p className="text-center text-md c-gray p-12">暂无数据</p>
      )}
    </>
  );
};

export default NoteList;
