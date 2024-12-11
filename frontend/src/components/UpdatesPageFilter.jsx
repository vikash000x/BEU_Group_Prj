import React, { useState } from "react";
import { colleges } from "../lib/utils";

const UpdatesPageFilter = ({ TypeSetter, OptionSetter }) => {
  const FilterOptions = [
    "Event",
    "Announcement",
    "Sports",
    "Hackathons",
    "Exam",
  ];

  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleCollegeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCollege(selectedValue);
    TypeSetter("postedBy");
    setSelectedType(""); //To make other filter value empty
    OptionSetter(selectedValue);
  };

  const handleLabelChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    TypeSetter("category");
    setSelectedCollege(""); //To make other filter value empty
    OptionSetter(selectedValue);
  };

  return (
    <div className="ml-2 flex items-center gap-4">
      <p className="ml-1 text-lg font-medium">Filter Options : </p>
      <div className="flex gap-8">
        {/* College Dropdown */}
        <div>
          <select
            className="max-w-40 border border-gray-300 text-black rounded-md h-8 bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="collegeDropdown"
            value={selectedCollege}
            onChange={handleCollegeChange}
          >
            <option value="" disabled>
              Filter by College
            </option>{" "}
            {colleges.map((college, index) => (
              <option key={index} value={college.name}>
                {college.name}
              </option>
            ))}
          </select>
        </div>

        {/* category Dropdown */}
        <div>
          <select
            className="max-w-40 border border-gray-300 rounded-md h-8 text-black bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="typeDropdown"
            value={selectedType}
            onChange={handleLabelChange}
          >
            <option value="" disabled>
              Filter by Label
            </option>{" "}
            {FilterOptions.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UpdatesPageFilter;
