import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const HomeRecentUpdate = () => {
  const [showNew, setShowNew] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNew(!showNew);
    }, 500);
    return () => clearInterval(interval);
  });
  return (
    <div className="w-full my-4">
      <Link
        href=""
        className="relative block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        {showNew && (
          <p className=" font-bold text-red-500 absolute -top-3 right-0">
            New!
          </p>
        )}

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </Link>
    </div>
  );
};

export default HomeRecentUpdate;
