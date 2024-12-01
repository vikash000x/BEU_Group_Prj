import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
// import { Card } from "flowbite-react";
const TopFiveStudent = ({ students }) => {
  const topFive = students?.sort((a, b) => b.cgpa - a.cgpa).slice(0, 5);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div div className=" my-3 " data-aos="fade-right">
      <h1 className="text-3xl font-bold my-3 text-white">
        {" "}
        Top performers of College
      </h1>

      <div className="flex flex-row justify-between items-center gap-[40px]  flex-wrap text-white ">
        {topFive?.map((student) => (
          <Link to={`/college/student/${student.id}`}>
            <div className="max-w-[15rem] rounded-lg shadow-lg border-[0.01rem]  border-r-white border-opacity-50 overflow-hidden">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.hAaNvre1Tukr7fGuT_7_YgHaHa&pid=Api&P=0&h=180"
                alt=""
                className="w-full h-48 object-cover"
              />

              <div className="p-4 text-center bg-slate-800">
                <h1 className="text-2xl font-semibold ">{student?.name}</h1>
                <h3 className="text-xl font-[400] ">CGPA:{student?.cgpa}</h3>
                <p className="text-sm  mt-2">student of {student?.branch}</p>
                <p className="text-sm text-gray-100 mt-2">{student?.year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopFiveStudent;
