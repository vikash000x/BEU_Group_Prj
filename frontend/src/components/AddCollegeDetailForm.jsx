import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import Loader from "./loader/Loader";
import { toast } from "react-toastify";

const AddCollegeDetailForm = ({ onSubmit }) => {
  const { url, loggedInCollegeData, loading, setLoading } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: loggedInCollegeData?.name || "",
    shortName: loggedInCollegeData?.shortName || "",
    description: loggedInCollegeData?.description || "",
    extraInfo: loggedInCollegeData?.extraInfo || "",
    departments: loggedInCollegeData?.departments || [""], // Default to empty array
    logo: loggedInCollegeData?.logo || "",
    city: loggedInCollegeData?.city || "",
    phone: loggedInCollegeData?.phone || "",
    email: loggedInCollegeData?.email || "",
    address: loggedInCollegeData?.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (index, value) => {
    const updatedDepartments = [...formData.departments];
    updatedDepartments[index] = value;
    setFormData((prev) => ({ ...prev, departments: updatedDepartments }));
  };

  const addDepartment = () => {
    setFormData((prev) => ({
      ...prev,
      departments: [...prev.departments, ""], // Add a new empty department field
    }));
  };

  const removeDepartment = (index) => {
    const updatedDepartments = formData.departments.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, departments: updatedDepartments }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${url}/college/add-details/${loggedInCollegeData.collegeCode}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.message);
      toast.success("Info Updated Successfully!");
    } catch (error) {
      toast.error("Error while updating info!");
      console.error(
        "Error updating college details:",
        error.response.data.error
      );
    } finally {
      navigate(`/${loggedInCollegeData.collegeCode}/admin`);
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="max-w-2xl bg-slate-800 mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl text-center font-bold text-blue-700 mb-4">
        Update College Details
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-2">Name</label>
          <input
            type="text"
            name="name"
            disabled
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-2">
            Short Name
          </label>
          <input
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-2">
            Extra Info
          </label>
          <textarea
            name="extraInfo"
            value={formData.extraInfo}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-white mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-white mb-2">
            Departments
          </label>
          {formData.departments.map((department, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={department}
                onChange={(e) => handleDepartmentChange(index, e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
              />
              <button
                type="button"
                onClick={() => removeDepartment(index)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDepartment}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
          >
            Add Department
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500  text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCollegeDetailForm;
