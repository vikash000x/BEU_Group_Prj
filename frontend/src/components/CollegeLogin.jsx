import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./loader/Loader";
const CollegeLogin = () => {
  const [collegecode, setCollegeCode] = useState("");
  const [password, setPassword] = useState("");
  const { userType, setUserType, setToken, url, loading, setLoading, setloggedInCollegeData } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(`${url}/collegeadmin/login-college`, {
      collegecode,
      password,
    });
    if (response.data.success) {
      setloggedInCollegeData(response.data.collegeData);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success("LogedIn as college");
      setUserType("college");
      setLoading(false);
      navigate("/collegename/admin");
    } else {
      toast.error(response.data.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-100 h-[100vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          College Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="collegecode"
              className="block text-sm font-medium text-gray-600"
            >
              College Code
            </label>
            <input
              type=""
              id=""
              name="collegecode"
              value={collegecode}
              onChange={(e) => setCollegeCode(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
              placeholder="Enter your College code"
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
              placeholder="Enter the password provided by BEU"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#173B45] text-white font-semibold rounded-lg hover:bg-[#20505e] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="#" className="text-[#173B45 ] hover:text-[#20505e]">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeLogin;
