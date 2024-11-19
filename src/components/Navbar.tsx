import logo from '@/assets/icon.svg';
import { Link } from 'react-router-dom';
import { rebuildDb } from '@/service/init';
import { useToast, useLoading } from '@/hooks';
import { useAllStore } from '@/store';

const Navbar = () => {
  const dayPosition = useAllStore(state => state.dayPosition);
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();
  const confirmRebuildDb = async () => {
    const result = window.confirm(
      '重建数据库会清空所有数据，但能解决一些数据上的问题，确定要继续吗？'
    );
    if (result) {
      showLoading();
      await rebuildDb();
      hideLoading();
      showToast('数据库重建成功', 'success');
    } else {
      // 用户点击了取消按钮
    }
  };
  return (
    <>
      <div className="navbar bg-base-100 p-2 min-h-14 fixed z-3 lg:w-1000px lg:b-rounded-2 lg:mt-1 ml-a mr-a left-0 right-0 shadow-sm">
        <img src={logo} alt="react" className="flex-none mr-3 w-8 h-8" />
        <div className="flex-auto flex-shrink-0 text-center text-lg">P5R RoadBook</div>
        <div className="flex-none">
          <div
            className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2"
            title="重建数据库"
            onClick={() => confirmRebuildDb()}
          >
            <i className="i-material-symbols-reset-wrench-rounded"></i>
          </div>
          <label
            htmlFor="descModal"
            title="说明"
            className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2 ml-1"
          >
            <i className="i-material-symbols-info-outline-rounded"></i>
          </label>
          <Link to="notes" title="笔记" className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2 ml-1">
            <i className="i-material-symbols-collections-bookmark-outline-sharp"></i>
          </Link>
        </div>
      </div>
      <progress
        className="progress progress-error fixed z-3 w-full ml-a mr-a left-0 right-0 lg:w-1000px top-14 h-1"
        value={dayPosition[0]}
        max={dayPosition[1]}
      ></progress>
    </>
  );
};

export default Navbar;

// position: absolute;
//     width: 39px;
//     height: 39px;
//     background: #fff;
//     box-shadow: 0 2px 5px 0 rgba(75,87,103,.2);
//     border-radius: 5px;
//     z-index: 0;

// width: 100%;
//     position: fixed;
//     z-index: 1001;
//     box-shadow: 0 -2px 4px 0 rgba(0,0,0,.05), 0 1px 4px 0 rgba(0,0,0,.05);
