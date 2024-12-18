import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

const UpdateFacultyForm = ({ facultyDataToUpdate, setActionModal }) => {
  const [facultyData, setFacultyData] = useState(facultyDataToUpdate);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { url } = useContext(StoreContext);

  useEffect(() => {
    //console.log("yuion",facultyDataToUpdate)
    setFacultyData(facultyDataToUpdate);
  }, [facultyDataToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${url}/faculty/update-faculty/${facultyDataToUpdate._id}`,
        facultyData,
        {
          headers: {
            token: token,
          },
        }
      );

      toast.success("Faculty updated successfully!");
      console.log("Response after updating faculty:", res.data);
      setActionModal(null);
    } catch (error) {
      console.log("Error while updating faculty:", error);
      toast.error("Failed to update faculty. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800 shadow-md rounded-lg mt-10">
    {/* Close Button */}
    <button
        onClick={() => setActionModal(null)}
        className="absolute right-20 text-white text-2xl font-bold hover:text-gray-400 focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Update Faculty Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={facultyData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Department:</label>
          <input
            type="text"
            name="department"
            value={facultyData.department}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Gender:</label>
          <select
            name="gender"
            value={facultyData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Designation:</label>
          <input
            type="text"
            name="designation"
            value={facultyData.designation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Experience (in years):</label>
          <input
            type="number"
            name="experience"
            value={facultyData.experience}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={facultyData.qualification}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Rating:</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={facultyData.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={facultyData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={facultyData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Courses:</label>
          <textarea
            name="courses"
            value={facultyData.courses.join(", ")}
            onChange={(e) =>
              setFacultyData({
                ...facultyData,
                courses: e.target.value.split(",").map((course) => course.trim()),
              })
            }
            placeholder="Enter courses separated by commas"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0B192C] text-white py-2 rounded-md hover:bg-slate-700 transition duration-200"
        >
          Update Faculty
        </button>
      </form>
    </div>
  );
};

export default UpdateFacultyForm;
