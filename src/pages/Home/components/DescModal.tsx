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
              该网站信息总结自
              <a href="https://b23.tv/d7YFQwi" target="_blank">
                P5R一周目COOP MAX全AWARD白金攻略日程安排《女神异闻录5皇家版》
              </a>
              的内容，部分信息参考该文章，仅供学习和技术经验交流使用，不涉及商业用途。如有侵权，请联系我删除。
            </p>
            <h4>技术概要</h4>
            <ul>
              <li>
                该网站采用了PWA技术，缓存策略为所有静态资源为CacheFirst，支持离线使用（iOS可能存在延迟）。
              </li>
              <li>更新策略为autoUpdate，在联网状态下会自动升级。</li>
              <li>
                数据缓存使用的是IndexedDB，在首次请求后，接口请求的数据和操作信息都会存储在IndexedDB中。
              </li>
            </ul>
            <h4>源码</h4>
            <p>
              <a href="https://github.com/sprialmint9/p5r-road-book" target="_blank">
                p5r-road-book
              </a>
            </p>
            <h4>使用说明</h4>
            <ul>
              <li>
                点击时间两端的左右箭头可切换至上一天或下一天的数据，同时，您也可以使用键盘上的
                <kbd className="kbd kbd-sm">◀︎</kbd>或者
                <kbd className="kbd kbd-sm">▶︎</kbd>进行快速切换。
              </li>
              <li>点击时间可查看当月的Coop达成等相关信息。</li>
              <li>点击时间上方的选择框可直接跳转至具体的时间。</li>
              <li>可展开或收起白天和夜晚数据。</li>
              <li>每次操作会保存当前选择的时间，在下次访问时，会自动回显上一次选择的时间信息。</li>
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
