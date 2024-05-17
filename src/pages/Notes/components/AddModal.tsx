import { ChangeEvent, FC, FormEvent } from 'react';
import { useAllStore } from '@/store';
import { useToast, useAddModalControl } from '@/hooks';
const AddModal: FC = () => {
  const { addNote, setFormTitle, setSelectText, resetForm } = useAllStore.getState();
  const noteForm = useAllStore(state => state.noteForm);
  const { showToast } = useToast();
  const { setAddModalControl } = useAddModalControl();
  const handleFromSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get('content')) {
      showToast('内容不能为空', 'warning');
      return;
    }
    await addNote();
    setAddModalControl(false);
    showToast('添加成功', 'success');
    return false;
  };
  const handleModalToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked) {
      resetForm();
    }
  };
  return (
    <>
      <input
        type="checkbox"
        id="addMarkModal"
        className="modal-toggle"
        onChange={e => handleModalToggle(e)}
      />
      <div className="modal sm:modal-middle modal-bottom">
        <form className="modal-box" onSubmit={handleFromSubmit}>
          <h3 className="font-bold text-lg mt-0 mb-4 select-none">添加记录</h3>
          <div className="prose sm:lh-loose lh-normal">
            <div className="form-control mb-4">
              <input
                name="title"
                type="text"
                placeholder="标题"
                autoComplete="off"
                value={noteForm.title}
                onInput={e => {
                  const target = e.target as HTMLInputElement;
                  setFormTitle(target.value);
                }}
                className="input input-bordered input-md w-full font-family-uni"
              />
            </div>
            <div className="form-control mb-4">
              <textarea
                name="content"
                value={noteForm.content}
                className="textarea textarea-bordered textarea-md h-40 w-full font-family-uni"
                onInput={e => {
                  const target = e.target as HTMLTextAreaElement;
                  setSelectText(target.value);
                }}
                placeholder="内容"
              ></textarea>
            </div>
            {noteForm.dayId && <div className="text-xs c-gray mb-4">DayId: {noteForm.dayId}</div>}
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
