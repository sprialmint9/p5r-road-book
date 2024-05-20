import { Link } from 'react-router-dom';
import { useAllStore } from '@/store';

const Navbar = () => {
  const { setKeyword } = useAllStore.getState();
  const { AddModalControl } = useAllStore();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setKeyword((formData.get('keyword') as string) || '');
  };
  return (
    <div className="navbar bg-base-100 min-h-14 fixed z-1 lg:w-1000px ml-a mr-a left-0 right-0 shadow-sm">
      <Link to="/" className="btn btn-sm btn-ghost font-size-5 pl-2 pr-2">
        <i className="i-material-symbols-arrow-back-ios-new"></i>
      </Link>
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
      {/* <div
        className="btn btn-ghost btn-sm btn-disabled font-size-5 pl-2 pr-2"
        onClick={() => AddModalControl(true)}
      >
        i-material-symbols-fitbit-arrow-downward-sharp i-material-symbols-fitbit-arrow-upward-sharp
        <i className="i-material-symbols-inbox-customize-outline-sharp"></i>
      </div>
      <div
        className="btn btn-ghost btn-sm btn-disabled font-size-5 pl-2 pr-2"
        onClick={() => AddModalControl(true)}
      >
        <i className="i-material-symbols-delete-outline-sharp"></i>
      </div> */}
      <div
        className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2"
        onClick={() => AddModalControl(true)}
      >
        <i className="i-material-symbols-bookmark-add-outline-sharp"></i>
      </div>
    </div>
  );
};

export default Navbar;
