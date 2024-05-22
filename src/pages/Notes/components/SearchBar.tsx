import { useNavigate, Link } from 'react-router-dom';
import { useAllStore } from '@/store';
import { useState } from 'react';
import Backup from './Backup';
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { setKeyword } = useAllStore.getState();
  const { AddModalControl } = useAllStore();
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setKeyword((formData.get('keyword') as string) || '');
  };
  const navBack = () => {
    navigate(-1); // 返回上一页
  };
  return (
    <>
      <div className="navbar bg-base-100 min-h-14 fixed z-1 lg:w-1000px lg:b-rounded-2 lg:mt-1 ml-a mr-a left-0 right-0 shadow-sm">
        <div className="btn btn-sm btn-ghost font-size-5 pl-2 pr-2 mr-1" onClick={() => navBack()}>
          <i className="i-material-symbols-arrow-back-ios-new"></i>
        </div>
        <form className="flex-1" onSubmit={handleSearch}>
          <div className="form-control w-full mr-1 ml-1">
            <input
              type="text"
              name="keyword"
              placeholder="搜索..."
              enterKeyHint="search"
              autoComplete="off"
              className="input input-sm input-ghost w-full pl-2 pr-2"
            />
          </div>
        </form>
        <div
          className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2 ml-1"
          onClick={() => setShowModal(true)}
          title="备份"
        >
          <i className="i-material-symbols-inbox-customize-outline-sharp mt-1"></i>
        </div>
        <Link
          className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2 ml-1"
          to="/trash"
          title="回收站"
        >
          <i className="i-material-symbols-delete-outline-sharp"></i>
        </Link>
        <div
          className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2 ml-1"
          onClick={() => AddModalControl(true)}
          title="添加"
        >
          <i className="i-material-symbols-bookmark-add-outline-sharp"></i>
        </div>
      </div>
      <Backup showModal={showModal} onClose={() => setShowModal(false)}></Backup>
    </>
  );
};

export default Navbar;
