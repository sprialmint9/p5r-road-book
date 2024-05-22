import { useAllStore } from '@/store';
import { useToast } from '@/hooks';

const NoteItem = (props: NoteInfo) => {
  const content = props.content.replace(/\n/g, '<br>');
  const { showToast } = useToast();
  const { recoverNote } = useAllStore.getState();
  const handleRecoverNote = (props: NoteInfo) => {
    recoverNote(props);
    showToast('操作成功', 'success');
  };
  return (
    <div className="b-rounded-2 shadow-md bg-base-100 mb-4 p-4 relative">
      {props.title ? <h2 className="mt-0 pr-8">{props.title}</h2> : null}
      <p
        className="lh-normal"
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: content }}
      ></p>
      <button
        className="absolute top-2 right-2 btn btn-ghost btn-sm font-size-5 pl-2 pr-2 b-rounded-2"
        title="恢复"
        onClick={() => handleRecoverNote(props)}
      >
        <i className="i-material-symbols-turn-left-sharp"></i>
      </button>
    </div>
  );
};

const NoteList = () => {
  const trashList = useAllStore(state => state.trashList);
  return (
    <>
      {trashList && trashList.map(item => <NoteItem key={item.id} {...item} />)}
      {(!trashList || !trashList?.length) && (
        <p className="text-center text-md c-gray p-12">暂无数据</p>
      )}
    </>
  );
};

export default NoteList;
