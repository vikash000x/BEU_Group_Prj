import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddFacultyForm = () => {
  const { loggedInCollegeData, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState({
    name: "",
    gender: "",
    department: "",
    designation: "",
    courses: [],
    email: "",
    phone: "",
    experience: "",
    qualification: "",
  });

  const [image, setImage] = useState();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyData({
      ...facultyData,
      [name]: value,
    });
  };

  const handleCoursesChange = (e) => {
    const { value } = e.target;
    setFacultyData({
      ...facultyData,
      courses: value.split(","),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(facultyData);
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("image", image);
      facultyData.collegeId = loggedInCollegeData._id;
      formData.append("facultyData", JSON.stringify(facultyData)); 
      console.log("f", formData)
      const res = await axios.post(
        `${url}/faculty/add-faculty`,
        formData,
        {
          headers: {
            token: token,
          },
        }
      );
      toast.success("Faculty added successfully!")
      navigate(`/${loggedInCollegeData.collegeCode}/admin`);
    } catch (error) {
      toast.error("Failed to add faculty!");
      console.log(error);
    }
  };

  return (
    <div className=" h-auto flex items-center justify-center pt-8">
      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl text-center font-bold text-white mb-6">
          Faculty Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={facultyData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter faculty name"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-white"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={facultyData.gender}
                onChange={handleChange}
                required
                className="text-sm text-gray-400 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
              >
                <option selected>Choose a gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            {/* Department Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="department"
                className="block text-sm font-medium text-white"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                value={facultyData.department}
                onChange={handleChange}
                required
                className="mt-1 block w-full text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
              >
                <option value="" disabled>
                  Select a department
                </option>
                {loggedInCollegeData.departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* designation */}
            <div className="mb-4">
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-white"
              >
                designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={facultyData.designation}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter designation"
              />
            </div>

            {/* courses(s) */}
            <div className="mb-4">
              <label
                htmlFor="courses"
                className="block text-sm font-medium text-white"
              >
                courses(s)
              </label>
              <input
                type="text"
                id="courses"
                name="courses"
                value={facultyData.courses.join(",")}
                onChange={handleCoursesChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter coursess, separated by commas"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={facultyData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter email"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={facultyData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter phone number"
              />
            </div>

            {/* Experience */}
            <div className="mb-4">
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-white"
              >
                Experience
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={facultyData.experience}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter experience"
              />
            </div>

            {/* Qualification */}
            <div className="mb-4">
              <label
                htmlFor="qualification"
                className="block text-sm font-medium text-white"
              >
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={facultyData.qualification}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter qualification"
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-white"
            >
              Upload Profile Picture
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#173B45] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-[#173B45] file:text-white hover:file:bg-[#0F2A32]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0B192C] text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFacultyForm;
