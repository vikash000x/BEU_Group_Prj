import React, { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const FacultiesList = () => {
  const navigate = useNavigate();
  const { collegeFacultyData, singleCollege } = useContext(StoreContext);
  // const [department, setDepartment] = useState("");
  // const [filterDepartment, setFilterDepartment] = useState(collegeFacultyData);
  const [search, setSearch] = useState("");
  const [filteredFaculties, setFilteredFaculties] =
    useState(collegeFacultyData);
  // const handleCollegeChange = (e) => {
  //   const inputVal = e.target.value.toLowerCase();

  //   const filter = collegeFacultyData.filter((faculty) =>
  //     faculty.department.toLowerCase().includes(inputVal)
  //   );
  //   setFilterDepartment(filter);
  // };
  console.log(filteredFaculties);
  const handleSearch = () => {
    const searchData = collegeFacultyData.filter((faculty) =>
      faculty.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFaculties(searchData);
    setSearch("");
  };
  const departments = [
    "Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Electronics and Communication",
    "Information Technology",
    "Biotechnology",
    "Aerospace Engineering",
    "Chemical Engineering",
    "Data Science",
  ];

  return (
    <div className="w-[1200px] mx-auto m-12">
      <h1 className="text-2xl font-bold text-center mb-6">
        FACULTIES LIST OF {singleCollege.name}
      </h1>
      <div className="flex flex-row rounded-md justify-between items-center my-2 bg-slate-400 gap-2 p-3">
        <div className="flex-1 ">
          <label
            className="text-white font-semibold px-2 text-xl"
            for="department"
          >
            Choose Department :
          </label>
          <select
            className="w-[60%] h-10 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="collegeDropdown"
            name="department"
            // value={department}
            // onChange={handleCollegeChange}
          >
            <option value="" disabled selected>
              Select Department
            </option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 float-right">
          <input
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            value={search}
            type="text"
            placeholder="search..."
            className="border px-2 h-10 rounded-md w-[70%]"
          />
          <button
            onClick={handleSearch}
            className="ml-3 bg-[#173B45] rounded-md px-8 cursor-pointer h-10 text-white"
          >
            Search
          </button>
        </div>
      </div>
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Profile Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Designation</th>
          </tr>
        </thead>
        <tbody>
          {filteredFaculties ? (
            filteredFaculties.map((faculty) => (
              <tr
                key={faculty.id}
                onClick={() => navigate(`/college/faculty/${faculty.id}`)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.hAaNvre1Tukr7fGuT_7_YgHaHa&pid=Api&P=0&h=180"
                    alt={faculty.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {faculty.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {faculty.department}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {faculty.designation}
                </td>
              </tr>
            ))
          ) : (
            <h1>faculty not found</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacultiesList;
