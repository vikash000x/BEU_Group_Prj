import React from "react";
import HomeRecentUpdate from "./HomeRecentUpdate";

const HomeRecentUpdates = () => {
  return (
    <div className=" flex flex-col justify-center items-center mt-[25px]">
      <h3 className=" bg-slate-800 text-3xl font-bold bg w-full py-3 text-center text-white rounded-md">
        Recent Updates
      </h3>
      <HomeRecentUpdate />
      <HomeRecentUpdate />
      <HomeRecentUpdate />
      <HomeRecentUpdate />
    </div>
  );
};

export default HomeRecentUpdates;
