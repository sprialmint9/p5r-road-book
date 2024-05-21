import { useNavigate } from 'react-router-dom';
import { useAllStore } from '@/store';
import { useToast } from '@/hooks';

const Navbar = () => {
  const { clearTrash } = useAllStore();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const trashList = useAllStore(state => state.trashList);
  const confirmClear = async () => {
    const result = window.confirm('确定要删除？');
    if (result) {
      await clearTrash();
      showToast('已删除', 'success');
    } else {
      // 用户点击了取消按钮
    }
  };
  const navBack = () => {
    navigate(-1); // 返回上一页
  };
  return (
    <>
      <div className="navbar justify-between bg-base-100 min-h-14 fixed z-1 lg:w-1000px ml-a mr-a left-0 right-0 shadow-sm">
        <div className="btn btn-sm btn-ghost font-size-5 pl-2 pr-2" onClick={() => navBack()}>
          <i className="i-material-symbols-arrow-back-ios-new"></i>
        </div>
        <div className="text-lg">回收站</div>
        <button
          className={
            'btn btn-ghost btn-sm font-size-5 pl-2 pr-2' +
            (trashList?.length ? '' : ' btn-disabled')
          }
          onClick={() => confirmClear()}
          title="全部清除"
        >
          <i className="i-material-symbols-delete-forever-outline-sharp"></i>
        </button>
      </div>
    </>
  );
};

export default Navbar;
