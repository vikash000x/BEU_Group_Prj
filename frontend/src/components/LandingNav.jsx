import React from "react";
import logo from "../images/Screenshot 2024-11-23 023731.png";

const LandingNav = () => {
  return (
    <div className="bg-[#173B45] text-blue-600 w-full h-[65px] flex items-center justify-center">
      <nav className="flex items-center justify-between w-[1200px]   px-2 text-white font-semibold">
        <img className="w-14 h-14 rounded-full mr-8" src={logo} alt="" />
        <ul className="flex items-center justify-between flex-1 text-2xl">
          <li className="cursor-pointer">Colleges</li>
          <li className="cursor-pointer">Recent Updates</li>
          <li className="cursor-pointer">Jobs</li>
          <li className="cursor-pointer">Login</li>
        </ul>
      </nav>
    </div>
  );
};

export default LandingNav;
