import React from "react";

const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 h-10 text-white bg-[#0B192C] border-[0.01rem] rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out 
     sm:px-8px  lg:h-11 lg:rounded-md lg:px-8 sm:h-9 sm:rounded-md sm:px-3   md:px-8 md:py-[-10px] text-sm  ${className}`}
    >
      {text}
    </button>
  );
};
export default Button;
