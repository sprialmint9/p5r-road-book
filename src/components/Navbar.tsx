import { memo } from 'react';
import logo from '@/assets/icon.svg';
import { Link } from 'react-router-dom';

const Navbar = memo(() => {
  return (
    <>
      <div className="navbar bg-base-100 p-2 min-h-14 fixed z-1 lg:w-1000px ml-a mr-a left-0 right-0 shadow-sm">
        <img src={logo} alt="react" className="flex-none mr-3 w-8 h-8" />
        <div className="flex-auto flex-shrink-0 text-center">P5R RoadBook</div>
        <div className="flex-none">
          <label htmlFor="descModal" className="btn btn-ghost btn-sm font-size-5">
            <i className="i-material-symbols-info-outline-rounded"></i>
          </label>
          <Link to="bookmarks" className="btn btn-ghost btn-sm font-size-5">
            <i className="i-material-symbols-collections-bookmark-outline-sharp"></i>
          </Link>
        </div>
      </div>
    </>
  );
});

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
