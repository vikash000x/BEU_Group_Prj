import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
const SingleFaculty = () => {
  const { url } = useContext(StoreContext);
  const [singleFacultyData, setSingleFacultyData] = useState(null);
  const { faculty_id } = useParams();
  const fetchSingleFaculty = async () => {
    try {
      const res = await axios.get(
        `${url}/faculty/get-single-faculty/${faculty_id}`
      );
      if (res?.data?.success) {
        setSingleFacultyData(res?.data?.faculty);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleFaculty();
  }, [faculty_id]);
  return (
    <div className="w-[1200px] mx-auto mt-10 p-4">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.5r2gNBXIlFTH4Azt4AdnLgHaLA&pid=Api&P=0&h=180"
          alt="name"
          className="w-48 h-full object-cover"
        />
        <div className="p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {singleFacultyData?.name}
          </h2>
          <p className="text-gray-600 text-sm">
            {singleFacultyData?.designation}
          </p>
          <p className="text-gray-600 text-sm">
            {singleFacultyData?.department}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Experience:</span>{" "}
            {singleFacultyData?.experience} years
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Rating:</span>{" "}
            {singleFacultyData?.rating}/10
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Courses:</span>{" "}
            {singleFacultyData?.courses.join(", ")}c
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span>{" "}
            {singleFacultyData?.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone:</span>{" "}
            {singleFacultyData?.phone}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Office:</span>{" "}
            {singleFacultyData?.office}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleFaculty;
