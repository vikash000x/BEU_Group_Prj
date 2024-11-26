import React from "react";
import { Link } from "react-router-dom";

const CollegeAdmin = () => {
  const collegeShortName = "bce-bhagalpur"
  return (
    <div className="w-[1200px] flex flex-col items-center gap-12 mx-auto pt-10 min-h-screen bg-slate-600">
      <div className="w-1/2 rounded-md bg-gray-500 p-12 hover:scale-105 transition-all duration-300 cursor-pointer">
        <p className="text-3xl mx-auto text-center font-semibold">
          BEU Recent Instructions
        </p>
      </div>
      <div className="w-1/2 rounded-md bg-gray-500 p-12 hover:scale-105 transition-all duration-300 cursor-pointer">
        <p className="text-3xl mx-auto text-center font-semibold">
          Faculty List
        </p>
      </div>
      <div className="w-1/2 rounded-md bg-gray-500 p-12 hover:scale-105 transition-all duration-300 cursor-pointer">
        <p className="text-3xl mx-auto text-center font-semibold">
          Students List
        </p>
      </div>
      <Link to={`/${collegeShortName}/addFaculty`}>
        <p className="bg-gray-800 p-2 cursor-pointer">Add Faculty</p>
      </Link>
      <Link to={`/${collegeShortName}/addStudent`}>
        <p className="bg-gray-800 p-2 cursor-pointer">Add Student</p>
      </Link>      
    </div>
  );
};

export default CollegeAdmin;
