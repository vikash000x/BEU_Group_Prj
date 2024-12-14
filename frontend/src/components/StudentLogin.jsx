import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const StudentLogin = () => {

  const navigate = useNavigate();

  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");

  const { setUserType, url } = useContext(StoreContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/student/login-student`, {
        "regNo": regNo,
        "password": password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loggedInStudentData", JSON.stringify(res.data.student));
      localStorage.setItem("userType", "student");
      navigate(`/student/${res.data.student._id}`);
      setUserType("student");
      toast.success("Login success!");
    } catch (error) {
      toast.error( error.response.data.message);
      console.error("Login failed:", error.response.data.message);
    }
    
  };

  return (
    <div className="bg-gray-100 h-[100vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Student Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="regNo"
              className="block text-sm font-medium text-gray-600"
            >
             Registration Number
            </label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-[#173B45] "
              placeholder="Enter the password provided by your college"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#173B45] text-white font-semibold rounded-lg hover:bg-[#20505e] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            {/* <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="#" className="text-[#173B45 ] hover:text-[#20505e]">
                Sign up
              </Link>
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
