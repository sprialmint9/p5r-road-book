import { FC } from 'react';
const AddModal: FC = () => {
  return (
    <>
      <input type="checkbox" id="addMarkModal" className="modal-toggle" />
      <div className="modal sm:modal-middle modal-bottom">
        <div className="modal-box">
          <h3 className="font-bold text-lg mt-0 mb-4 select-none">添加记录</h3>
          <form className="h-70 prose sm:lh-loose lh-normal">
            <div className="form-control mb-4">
              <input type="text" placeholder="标题" className="input input-bordered w-full" />
            </div>
            <div className="form-control mb-4">
              <textarea
                className="textarea textarea-bordered h-40 w-full"
                placeholder="内容"
              ></textarea>
            </div>
            <div className="text-md c-gray">DayId: 12334123131231312312</div>
          </form>
          <div className="modal-action mt-2 block">
            <button className="btn btn-block btn-md btn-neutral">提交</button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="addMarkModal">
          Close
        </label>
      </div>
    </>
  );
};

export default AddModal;
