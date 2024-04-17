import { FC } from 'react';
const DescModal: FC = () => {
  return (
    <>
      <input type="checkbox" id="descModal" className="modal-toggle" />
      <div className="modal sm:modal-middle modal-bottom">
        <div className="modal-box">
          <h3 className="font-bold text-lg mt-0 mb-1 select-none">说明</h3>
          <div className="h-90 -mr-6 -ml-6 pl-6 pr-6 overflow-x-hidden overflow-y-scroll prose sm:lh-loose lh-normal">
            <h4>信息来源</h4>
            <p>
              网站信息在通过阅读
              <a href="https://b23.tv/d7YFQwi">
                P5R一周目COOP MAX全AWARD白金攻略日程安排《女神异闻录5皇家版》
              </a>
              后，总结而来，部分信息取自该文章，不会商用，仅供学习和技术经验交流使用，如有侵权请联系我删除。
            </p>
            <p>
              本站使用了PWA技术，可以发送到桌面作为APP使用，数据存储在IndexedDB中，首次访问后，后续可以离线访问。网站在联网状态会自动升级。
            </p>
            <h4>使用指南</h4>
            <ul>
              <li>
                点击时间两端的左右箭头可以切换上一天和下一天的数据，同时，点击键盘
                <kbd className="kbd kbd-sm">◀︎</kbd>或者<kbd className="kbd kbd-sm">▶︎</kbd>
                也可以快速切换。
              </li>
              <li>点击时间可以查看当月的Coop达成等相关信息。</li>
              <li>点击时间上面的选择框可以跳转到具体的时间。</li>
              <li>白天和夜晚可以展开/收起。</li>
            </ul>
          </div>
          <div className="modal-action mt-2 block">
            <label htmlFor="descModal" className="btn btn-block btn-md">
              关闭
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="descModal">
          Close
        </label>
      </div>
    </>
  );
};

export default DescModal;
