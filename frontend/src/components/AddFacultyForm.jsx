import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colleges } from "../lib/utils";

const AddFacultyForm = () => {
  const collegeShortName = "bce-bhagalpur";
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState({
    name: "",
    gender: "",
    department: "",
    position: "",
    imageURL: "",
    college: "",
    subject: [],
    email: "",
    phone: "",
    experience: "",
    qualification: "",
    researchInterests: [],
    publications: 0,
    officeHours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyData({
      ...facultyData,
      [name]: value,
    });
  };

  const handleSubjectChange = (e) => {
    const { value } = e.target;
    setFacultyData({
      ...facultyData,
      subject: value.split(","),
    });
  };

  const handleResearchInterestsChange = (e) => {
    const { value } = e.target;
    setFacultyData({
      ...facultyData,
      researchInterests: value.split(","),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(facultyData);
    navigate(`/${collegeShortName}/admin`);
  };

  return (
    <div className="bg-gray-100 h-auto flex items-center justify-center pt-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Faculty Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
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
                className="block text-sm font-medium text-gray-600"
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
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Department */}
            <div className="mb-4">
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-600"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={facultyData.department}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter department"
              />
            </div>

            {/* Position */}
            <div className="mb-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-600"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={facultyData.position}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter position"
              />
            </div>

            {/* Image URL */}
            <div className="mb-4">
              <label
                htmlFor="imageURL"
                className="block text-sm font-medium text-gray-600"
              >
                Image URL
              </label>
              <input
                type="url"
                id="imageURL"
                name="imageURL"
                value={facultyData.imageURL}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter image URL"
              />
            </div>

            {/* College */}
            <div className="mb-4">
              <label
                htmlFor="college"
                className="block text-sm font-medium text-gray-600"
              >
                College
              </label>
              <select
                type="text"
                id="college"
                name="college"
                value={facultyData.college}
                onChange={handleChange}
                required
                className="mt-1 block w-full text-gray-400 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter college name"
              >
                <option selected>Choose a college</option>
                {colleges.map((college, index) => {
                  return (
                    <option key={college.college_id} value={college.name}>
                      {college.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Subject(s) */}
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-600"
              >
                Subject(s)
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={facultyData.subject.join(",")}
                onChange={handleSubjectChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter subjects, separated by commas"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
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
                className="block text-sm font-medium text-gray-600"
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
                className="block text-sm font-medium text-gray-600"
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
                className="block text-sm font-medium text-gray-600"
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

            {/* Research Interests */}
            <div className="mb-4">
              <label
                htmlFor="researchInterests"
                className="block text-sm font-medium text-gray-600"
              >
                Research Interests
              </label>
              <input
                type="text"
                id="researchInterests"
                name="researchInterests"
                value={facultyData.researchInterests.join(",")}
                onChange={handleResearchInterestsChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter research interests, separated by commas"
              />
            </div>

            {/* Publications */}
            <div className="mb-4">
              <label
                htmlFor="publications"
                className="block text-sm font-medium text-gray-600"
              >
                Publications
              </label>
              <input
                type="number"
                id="publications"
                name="publications"
                value={facultyData.publications}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter number of publications"
              />
            </div>

            {/* Office Hours */}
            <div className="mb-4">
              <label
                htmlFor="officeHours"
                className="block text-sm font-medium text-gray-600"
              >
                Office Hours
              </label>
              <input
                type="text"
                id="officeHours"
                name="officeHours"
                value={facultyData.officeHours}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
                placeholder="Enter office hours"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#173B45] text-white py-2 px-4 rounded-lg hover:bg-[#156d7b] transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFacultyForm;
