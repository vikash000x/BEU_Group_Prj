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
    <div className="w-full my-4 transform transition-all duration-300 hover:scale-[1.02]">
      <Link
        href=""
        className="relative block w-full p-8 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {showNew && (
          <div className="absolute -top-3 -right-2">
            <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-lg animate-pulse">
              New
            </span>
          </div>
        )}

        <h5 className="mb-3 text-2xl font-bold tracking-tight text-white/90 hover:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-slate-300/80 hover:text-slate-300 line-height-relaxed">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </Link>
    </div>
  );
};

export default HomeRecentUpdate;
