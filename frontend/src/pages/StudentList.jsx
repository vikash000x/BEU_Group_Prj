import React, { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
const StudentList = () => {
  const navigate = useNavigate();
  const { singleCollege } = useContext(StoreContext);
  const students = singleCollege.students;
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  console.log(students);
  const branches = [
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

  const handleSearch = () => {
    const searchData = students?.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(searchData);
    setSearch("");
  };
  return (
    <div className="w-[1200px] mx-auto m-12">
      <h1 className="text-2xl font-bold text-center mb-6">Students List</h1>
      <div className="flex flex-row rounded-md justify-between items-center my-2 bg-slate-400 gap-2 p-3">
        <div className="flex-1 ">
          <label
            className="text-white font-semibold px-2 text-xl"
            for="department"
          >
            Select Branch :
          </label>
          <select
            className="w-[60%] h-10 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="collegeDropdown"
            name="department"
            // value={department}
            // onChange={handleCollegeChange}
          >
            <option value="" disabled selected>
              Select Branch
            </option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
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
            <th className="border border-gray-300 px-4 py-2">Branch</th>
            <th className="border border-gray-300 px-4 py-2">Year</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents ? (
            filteredStudents.map((student) => (
              <tr
                key={student.id}
                onClick={() => navigate(`/college/student/${student.id}`)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.hAaNvre1Tukr7fGuT_7_YgHaHa&pid=Api&P=0&h=180"
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.branch}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.year}
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

export default StudentList;
