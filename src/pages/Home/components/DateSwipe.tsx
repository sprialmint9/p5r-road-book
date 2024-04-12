// import { useState, memo } from 'react';

const DateSwipe = () => {
  return (
    <div className="bg-base-100 ml-a mr-a mb-4 b-rounded-2 shadow-md flex items-center overflow-hidden">
      <div className="flex items-center justify-center mr-a w-8 self-stretch font-size-5 active:bg-base-200">
        <i className="i-material-symbols-arrow-back-ios c-black"></i>
      </div>
      <div className="flex-auto flex flex-col items-center">
        <div className="flex">
          <label className="label">
            <select className="select select-bordered select-xs w-15 text-sm">
              <option disabled selected>
                Pick one
              </option>
              <option>12</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
            <span className="label-text-alt ml-1 text-sm">月</span>
          </label>
          <label className="label">
            <select className="select select-bordered select-xs w-15 text-sm">
              <option disabled selected>
                Pick one
              </option>
              <option>31</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
            <span className="label-text-alt ml-1 text-sm">日</span>
          </label>
        </div>
        <div className="text-center pt-3 pb-4 w-24">
          <div className="block text-8">12</div>
          <div className="divider mt-1 mb-1"></div>
          <div className="block text-14">31</div>
        </div>
      </div>
      <div className="flex items-center justify-center ml-a w-8 self-stretch font-size-5 active:bg-base-200">
        <i className="i-material-symbols-arrow-forward-ios c-black"></i>
      </div>
    </div>
  );
};

export default DateSwipe;
