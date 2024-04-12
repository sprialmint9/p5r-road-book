import { memo } from 'react';

const EventCard = memo(() => {
  return (
    <>
      <div className="collapse bg-base-100 mb-4 b-rounded-2 shadow-md collapse-plus">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">白天</div>
        <div className="collapse-content">
          <p>
            hello Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum necessitatibus
            consequatur quis, sint a velit, dicta molestias, magni delectus animi eligendi veniam
            quo corporis neque repellendus aspernatur mollitia. Distinctio, tempora!{' '}
          </p>
        </div>
      </div>
      <div className="collapse bg-base-100 mb-4 b-rounded-2 shadow-md collapse-plus">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">夜晚</div>
        <div className="collapse-content">
          <p>
            hello Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum necessitatibus
            consequatur quis, sint a velit, dicta molestias, magni delectus animi eligendi veniam
            quo corporis neque repellendus aspernatur mollitia. Distinctio, tempora!{' '}
          </p>
          <p>
            hello Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum necessitatibus
            consequatur quis, sint a velit, dicta molestias, magni delectus animi eligendi veniam
            quo corporis neque repellendus aspernatur mollitia. Distinctio, tempora!{' '}
          </p>
          <p>
            hello Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum necessitatibus
            consequatur quis, sint a velit, dicta molestias, magni delectus animi eligendi veniam
            quo corporis neque repellendus aspernatur mollitia. Distinctio, tempora!{' '}
          </p>
          <p>hello</p>
        </div>
      </div>
    </>
  );
});

export default EventCard;

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
