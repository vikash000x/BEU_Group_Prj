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
      className="py-6 px-3 grid grid-cols-1 gap-4 w-1/2 h-[83vh] overflow-y-auto "
    >
      {loading
        ? Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-20 bg-gray-300 animate-pulse rounded-lg"
              ></div>
            ))
        : registeredCollege?.map((college, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:translate-x-1 relative"
              onClick={() =>
                setSelectedIndex(index === selectedIndex ? null : index)
              }
            >
              {selectedIndex === index && (
                <VscTriangleRight className="size-12 absolute -right-7 top-1/2 -translate-y-1/2" />
              )}

              <h2
                onClick={() => setCollegeId(college.collegecode)}
                className="text-xl font-semibold text-blue-500"
              >
                {college.collegename}
              </h2>
            </div>
          ))}
    </div>
  );
};

export default BeuNotification;
