import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateFacultyForm from "../components/UpdateFacultyForm";
const FacultiesList = () => {
  const { collegeCode } = useParams();
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);
  const [collegeFacultyData, setCollegeFacultyData] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredFaculties, setFilteredFaculties] = useState(null);
  const [actionModal, setActionModal] = useState(null);
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

  const fetchFacultyData = async () => {
    try {
      const res = await axios.get(
        `${url}/faculty/get-faculty-data/${collegeCode}`
      );
      if (res.data.success) {
        setCollegeFacultyData(res?.data?.facultyData);
        setFilteredFaculties(res?.data?.facultyData);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchFacultyData();
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleEditFaculty = async (faculty) => {
    setActionModal(faculty);
    toast.success("edited");
  };
  const handleDeleteFaculty = async (faculty) => {
    //setActionModal(faculty);
    toast.success("Deleted");
  };

  return (
    <div className="w-[1200px] mx-auto m-12">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        FACULTIES LIST OF
      </h1>
      <div className="flex flex-row rounded-md justify-between items-center my-2 bg-slate-700 gap-2 p-3">
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
            className="ml-3 bg-[#0B192C] rounded-md px-8 cursor-pointer h-10 text-white"
          >
            Search
          </button>
        </div>
      </div>
      <table className="table-auto border-collapse border border-gray-300 bg-slate-800 text-white w-full text-left">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2">Profile Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Designation</th>
            {localStorage.getItem("userType") === "collegeAdmin" &&
            localStorage.getItem("token") ? (
              <></>
            ) : (
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredFaculties ? (
            filteredFaculties.map((faculty) => (
              <tr
                key={faculty._id}
                //onClick={() => navigate(`/college/faculty/${faculty?._id}`)}
                className="hover:bg-[#0B192C] cursor-pointer"
                data-aos="fade-up"
              >
                <td
                  className="border border-gray-300 px-4 py-2"
                  onClick={() => navigate(`/college/faculty/${faculty._id}`)}
                >
                  <img
                    src={faculty?.profileImage}
                    alt={faculty?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2"
                onClick={() => navigate(`/college/faculty/${faculty._id}`)}>
                  {faculty.name}
                </td>
                <td className="border border-gray-300 px-4 py-2"
                onClick={() => navigate(`/college/faculty/${faculty._id}`)}>
                  {faculty.department}
                </td>
                <td className="border border-gray-300 px-4 py-2"
                onClick={() => navigate(`/college/faculty/${faculty._id}`)}>
                  {faculty.designation}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-3">
                    <button onClick={() => handleEditFaculty(faculty)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteFaculty(faculty)}>
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <h1>faculty not found</h1>
          )}
        </tbody>
      </table>

      {actionModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative max-h-[80vh] w-full max-w-3xl mx-auto overflow-auto bg-slate-800rounded-lg shadow-lg">
            <UpdateFacultyForm
              facultyDataToUpdate={actionModal}
              setActionModal={setActionModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultiesList;
