import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const HomeRecentUpdate = () => {
  const [showNew, setShowNew] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNew(!showNew);
    }, 800);
    return () => clearInterval(interval);
  });
  return (
    <div className="w-full my-4 bg-slate-800 border-[0.01rem] rounded-md text-white hover:bg-[#0B192C]">
      <Link
        href=""
        className="relative block w-full p-6    rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        {showNew && (
          <p className=" font-thin text-sm bg-red-500 py-1 px-1 text-white rounded-[50%]  absolute -top-3 -right-2">
            New!
          </p>
        )}

        <h5 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal ">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </Link>
    </div>
  );
};

export default HomeRecentUpdate;
