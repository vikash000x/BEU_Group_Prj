import React from "react";
import { Link } from "react-router-dom";
// import { Card } from "flowbite-react";
const TopFiveStudent = ({ students }) => {
  const topFive = students?.sort((a, b) => b.cgpa - a.cgpa).slice(0, 5);
  console.log(topFive);
  return (
    <div div className=" my-3">
      <h1 className="text-3xl font-bold my-3"> Top performers of College</h1>

      <div className="flex flex-row justify-between items-center gap-[20px]  flex-wrap ">
        {topFive?.map((student) => (
          <Link>
            <div className="max-w-[15rem] rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.hAaNvre1Tukr7fGuT_7_YgHaHa&pid=Api&P=0&h=180"
                alt=""
                className="w-full h-48 object-cover"
              />

              <div className="p-4 text-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {student?.name}
                </h1>
                <h3 className="text-xl font-[400] text-gray-800">
                  CGPA:{student?.cgpa}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  student of {student?.branch}
                </p>
                <p className="text-sm text-gray-600 mt-2">{student?.year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopFiveStudent;
