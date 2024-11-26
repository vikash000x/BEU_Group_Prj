import React from "react";
import { Link } from "react-router-dom";

const CollegeAdmin = () => {
  const collegeShortName = "bce-bhagalpur"
  return (
    <div className="w-[1200px] flex flex-col items-center gap-12 mx-auto pt-10 min-h-auto bg-slate-600 py-4">
      <div className="w-1/2 rounded-md bg-gray-700 p-12 hover:scale-105 transition-all duration-200 cursor-pointer">
        <p className="text-3xl mx-auto text-center text-white font-semibold">
          BEU Recent Instructions
        </p>
      </div>
      <div className="w-1/2 rounded-md bg-gray-700 p-12 hover:scale-105 transition-all duration-200 cursor-pointer">
        <p className="text-3xl mx-auto text-center font-semibold text-white">
          Faculty List
        </p>
      </div>
      <div className="w-1/2 rounded-md bg-gray-700 p-12 hover:scale-105 transition-all duration-200 cursor-pointer">
        <p className="text-3xl mx-auto text-center font-semibold text-white">
          Students List
        </p>
      </div>
      <Link to={`/${collegeShortName}/addFaculty`}>
        <p className="bg-gray-800 p-2 cursor-pointer text-white rounded-lg px-3">Add Faculty</p>
      </Link>
      <Link to={`/${collegeShortName}/addStudent`}>
        <p className="bg-gray-800 p-2 cursor-pointer text-white rounded-lg px-3">Add Student</p>
      </Link>
      <Link to={`/${collegeShortName}/post-update`}>
        <p className="bg-gray-800 p-2 cursor-pointer text-white rounded-lg px-3">Post an Update</p>
      </Link>        
    </div>
  );
};

export default CollegeAdmin;
