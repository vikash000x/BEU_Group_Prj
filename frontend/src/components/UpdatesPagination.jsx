import React, { useState } from "react";

const UpdatesPagination = ({totalItems, itemsPerPage, setterFunction, currentItem}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  //input value of search field
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setterFunction(inputValue);
    }
  };

  const handleChange = (event) => {
    if(event.target.value<=pages.length)
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center w-full">
        {pages.map((page, index) => {
          return (
            <button
              className={`w-10 h-10 font-semibold text-lg mx-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out bg-transparent text-gray-400 border border-gray-400 ${
                currentItem === page
                  ? "font-bold border-1 border-slate-200 outline outline-1 outline-gray-100"
                  : ""
              } `}
              key={index}
              onClick={() => setterFunction(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2">
        <p className="font-semibold">Jump to</p>
        <input
          className="border text-black border-gray-900 rounded-md"
          type="number"
          min="1"
          max={pages.length}
          step="1"
          placeholder=" page no."
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default UpdatesPagination;
