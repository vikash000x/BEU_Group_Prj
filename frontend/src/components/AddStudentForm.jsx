import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddStudentForm = ({ collegeShortName }) => {
  const { loggedInCollegeData, url } = useContext(StoreContext);
  const [studentData, setStudentData] = useState({
    name: "",
    regNo: "",
    rollNo: "",
    gender: "",
    dob: "",
    year: "",
    semester: "",
    branch: "",
    cgpa: "",
    password: "",
    collegeId: loggedInCollegeData._id,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage (or another source)
    
      const res = await axios.post(
        `${url}/student/add-student`, 
        studentData, 
        {
          headers: {
            token: token, // Pass the token in the headers
          },
        }
      );

      toast.success("Student added successfully!");
      console.log("Response after adding student:", res.data);
    } catch (error) {
      console.log("Error while adding student:", error);
    }
    navigate(`/${loggedInCollegeData.collegeId}/admin`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Student Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Registration No:
          </label>
          <input
            type="text"
            name="regNo"
            value={studentData.regNo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={studentData.rollNo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Gender:</label>
          <select
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Date of Birth:
          </label>
          <input
            type="date"
            name="dob"
            value={studentData.dob}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Year:</label>
          <input
            type="number"
            name="year"
            min="1"
            max="4"
            value={studentData.year}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Semester:</label>
          <input
            type="number"
            name="semester"
            min="1"
            max="8"
            value={studentData.semester}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Branch:</label>
          <select
            name="branch"
            value={studentData.branch}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a branch
            </option>
            {loggedInCollegeData.departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">CGPA:</label>
          <input
            type="text"
            name="cgpa"
            value={studentData.cgpa}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-white font-medium mb-2">Password:</label>
          <input
            type="text"
            name="password"
            value={studentData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        

        <button
          type="submit"
          className="w-full bg-[#0B192C] text-white py-2 rounded-md hover:bg-slate-700 transition duration-200"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
