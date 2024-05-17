import { useAllStore } from '@/store';

const Summary = () => {
  const summaryInfo = useAllStore(state => state.selectInfo?.summary || ({} as SummaryItem));
  return (
    <>
      <input type="checkbox" id="summaryModal" className="modal-toggle" />
      <div className="modal sm:modal-middle modal-bottom">
        <div className="modal-box">
          <h3 className="font-bold text-lg mt-0 mb-1 select-none">
            {summaryInfo.month || '-'}月Coop等级达成
          </h3>
          <div className="h-80 -mr-6 -ml-6 pl-6 pr-6 overflow-x-hidden overflow-y-scroll">
            {summaryInfo.summary?.map((item, key) => (
              <p className="py-1" key={key}>
                {item}
              </p>
            ))}
          </div>
          <div className="modal-action mt-2 block">
            <label htmlFor="summaryModal" className="btn btn-block btn-md">
              关闭
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="summaryModal">
          Close
        </label>
      </div>
    </>
  );
};

export default Summary;
