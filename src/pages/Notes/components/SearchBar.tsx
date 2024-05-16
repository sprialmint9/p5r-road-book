import { memo } from 'react';
import { Link } from 'react-router-dom';

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const Navbar = memo(() => {
  return (
    <div className="navbar bg-base-100 min-h-14 fixed z-1 lg:w-1000px ml-a mr-a left-0 right-0 shadow-sm">
      <Link to="/" className="btn btn-sm btn-ghost font-size-5 pl-2 pr-2">
        <i className="i-material-symbols-arrow-back-ios-new"></i>
      </Link>
      <form className="flex-1" onSubmit={handleSearch}>
        <div className="form-control w-full mr-1 ml-1">
          <input
            type="text"
            placeholder="搜索..."
            enterKeyHint="search"
            className="input input-sm input-ghost w-full pl-2 pr-2"
          />
        </div>
      </form>
      <label htmlFor="addMarkModal" className="btn btn-ghost btn-sm font-size-5 pl-2 pr-2">
        <i className="i-material-symbols-bookmark-add-outline-sharp"></i>
      </label>
    </div>
  );
});

export default Navbar;
