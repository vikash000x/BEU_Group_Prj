import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBolt } from "react-icons/fa";

const HomeRecentUpdate = () => {
  const [showNew, setShowNew] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNew((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full my-4 group">
      <Link
        to="/recent-updates"
        className="relative block w-full p-6 bg-white text-black
        border border-slate-700/50 rounded-xl shadow-lg 
        transition-all duration-300 ease-in-out 
        transform hover:-translate-y-1 hover:shadow-xl
        overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Gradient Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-500 ease-in-out`}
        />

        {/* New Badge */}
        {showNew && (
          <div className="absolute -top-2 -right-2">
            <span className="inline-flex items-center justify-center 
            px-3 py-1 text-xs font-bold text-black 
            bg-gradient-to-r from-red-500 to-orange-500 
            rounded-full shadow-lg animate-pulse">
              <FaBolt className="mr-1 text-yellow-200" />
              New
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-black
          group-hover:text-black-300 transition-colors duration-300">
            Recent University Updates
          </h5>
          <p className="font-normal group-hover:text-black-400 
          line-clamp-2 mb-4 transition-colors duration-300">
            Stay informed about the latest developments, announcements, 
            and important news from Bihar Engineering University.
          </p>

          {/* Read More */}
          <div className="flex items-center text-sm text-blue-300 
          group-hover:text-white group-hover:translate-x-1 
          transition-all duration-300">
            <span>Read More</span>
            <FaArrowRight className="ml-2 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeRecentUpdate;
