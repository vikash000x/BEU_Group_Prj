import React from "react";
import { Link } from "react-router-dom";
const TopFiveFaculties = ({ faculties }) => {
  const topFive = faculties?.sort((a, b) => b.rating - a.rating).slice(0, 5);
  // console.log(faculties);
  return (
    <div div className=" my-3">
      <h1 className="text-3xl font-bold my-3">
        {" "}
        Top Faculties Rated By College Students
      </h1>

      <div className="flex flex-row justify-between items-center gap-[20px]  flex-wrap ">
        {topFive?.map((faculty) => (
          <Link key={faculty?.id}>
            <div className="max-w-[15rem] rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.hAaNvre1Tukr7fGuT_7_YgHaHa&pid=Api&P=0&h=180"
                alt=""
                className="w-full h-48 object-cover"
              />

              <div className="p-4 text-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {faculty?.name}
                </h1>
                <h3 className="text-xl font-[400] text-gray-800">
                  <span className="font-semibold">Rating:</span>{" "}
                  {faculty?.rating}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Designation: </span>
                  {faculty?.designation}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Department:</span>{" "}
                  {faculty?.department}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopFiveFaculties;
