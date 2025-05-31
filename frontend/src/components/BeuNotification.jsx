import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { VscTriangleRight } from "react-icons/vsc";
const BeuNotification = ({ setCollegeId }) => {
  const { registeredCollege } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  console.log("hello from beunotification", registeredCollege);
  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="py-6 px-3 grid grid-cols-1 gap-4 w-1/2 h-[83vh] overflow-y-auto"
    >
      {loading
        ? Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-20 bg-gray-200 animate-pulse rounded-xl shadow-sm"
              ></div>
            ))
        : registeredCollege?.map((college, index) => (
            <div
              key={index}
              className={`p-5 bg-white border rounded-xl transition-transform duration-200 shadow-sm relative hover:translate-x-1 ${
                selectedIndex === index
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200"
              }`}
              onClick={() =>
                setSelectedIndex(index === selectedIndex ? null : index)
              }
            >
              {selectedIndex === index && (
                <VscTriangleRight className="size-10 text-blue-500 absolute -right-6 top-1/2 -translate-y-1/2" />
              )}

              <h2
                onClick={() => setCollegeId(college.collegecode)}
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
              >
                {college.collegename}
              </h2>
            </div>
          ))}
    </div>
  );
};

export default BeuNotification;
