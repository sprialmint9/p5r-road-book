import { FC, FormEvent } from 'react';
import { useNoteStore } from '@/store/notes';
import { useToast } from '@/hooks';
const AddModal: FC = () => {
  const { addNote, noteForm } = useNoteStore.getState();
  const { showToast } = useToast();
  const handleFromSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get('content')) {
      showToast('内容不能为空', 'warning');
      return;
    }
    addNote(noteForm);
    return false;
  };
  return (
    <>
      <input type="checkbox" id="addMarkModal" className="modal-toggle" />
      <div className="modal sm:modal-middle modal-bottom">
        <form className="modal-box" onSubmit={handleFromSubmit}>
          <h3 className="font-bold text-lg mt-0 mb-4 select-none">添加记录</h3>
          <div className="h-70 prose sm:lh-loose lh-normal">
            <div className="form-control mb-4">
              <input
                name="title"
                type="text"
                placeholder="标题"
                value={noteForm.title}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-4">
              <textarea
                name="content"
                value={noteForm.content}
                className="textarea textarea-bordered h-40 w-full"
                placeholder="内容"
              ></textarea>
            </div>
            {noteForm.dayId && <div className="text-md c-gray">DayId: {noteForm.dayId}</div>}
          </div>
          <div className="modal-action mt-2 block">
            <button type="submit" className="btn btn-block btn-md btn-neutral">
              提交
            </button>
          </div>
        </form>
        <label className="modal-backdrop" htmlFor="addMarkModal">
          Close
        </label>
      </div>
    </>
  );
};

export default AddModal;
