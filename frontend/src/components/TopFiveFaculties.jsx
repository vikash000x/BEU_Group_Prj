import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
const TopFiveFaculties = ({ faculties }) => {
  const topFive = faculties?.sort((a, b) => b.rating - a.rating).slice(0, 5);
  // console.log(faculties);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div div className=" my-3" data-aos="fade-left">
      <h1 className="text-3xl font-bold my-3 text-white">
        {" "}
        Top Faculties Rated By College Students
      </h1>

      <div className="flex flex-row justify-between items-center gap-[20px]  flex-wrap ">
        {topFive?.map((faculty) => (
          <Link key={faculty?.id}>
            <div className="max-w-[15rem] rounded-lg border-[0.01rem]  border-r-white border-opacity-50 overflow-hidden">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.hAaNvre1Tukr7fGuT_7_YgHaHa&pid=Api&P=0&h=180"
                alt=""
                className="w-full h-48 object-cover"
              />

              <div className="p-4 text-center bg-slate-800 text-white">
                <h1 className="text-2xl font-semibold">{faculty?.name}</h1>
                <h3 className="text-xl font-[400]">
                  <span className="font-semibold">Rating:</span>{" "}
                  {faculty?.rating}
                </h3>
                <p className="text-sm  mt-2">
                  <span className="font-semibold">Designation: </span>
                  {faculty?.designation}
                </p>
                <p className="text-sm mt-2">
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
