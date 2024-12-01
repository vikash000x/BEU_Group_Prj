import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const SingleStudent = () => {
  const { singleCollege } = useContext(StoreContext);
  const students = singleCollege?.students;
  const { student_id } = useParams();
  const [singleStudent, setSingleStudent] = useState(null);
  const fetchSingleStudent = () => {
    const filteredStudent = students?.find(
      (student) => student.id === Number(student_id)
    );
    setSingleStudent(filteredStudent);
  };

  useEffect(() => {
    fetchSingleStudent();
  }, [student_id]);
  return (
    <div className="w-[1200px] mx-auto mt-10 p-4 text-white">
      <div className="flex bg-slate-800 shadow-lg rounded-lg overflow-hidden mt-16">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.5r2gNBXIlFTH4Azt4AdnLgHaLA&pid=Api&P=0&h=180"
          alt="name"
          className="w-48 h-full object-cover"
        />
        <div className="p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-bold">{singleStudent?.name}</h2>

          <p className="">
            <span className="font-semibold">Branch:</span>{" "}
            {singleStudent?.branch} years
          </p>
          <p className="">
            <span className="font-semibold">Year:</span> {singleStudent?.year}
            /10
          </p>
          <p className="">
            <span className="font-semibold">Grade:</span> {singleStudent?.grade}
          </p>
          <p className="">
            <span className="font-semibold">CGPA:</span> {singleStudent?.cgpa}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
