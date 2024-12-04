import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
const BeuAdmin = () => {
  const [collegename, setCollegename] = useState("");
  const [collegecode, setCollegecode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { url } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${url}/collegeadmin/register-college`, {
      collegename,
      collegecode,
      email,
      password,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      setCollegename("");
      setCollegecode("");
      setEmail("");
      setPassword("");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="bg-gray-100 h-[100vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Add College
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="collegename"
              className="block text-sm font-medium text-gray-600"
            >
              College Name
            </label>
            <input
              type="text"
              id=""
              name="collegename"
              value={collegename}
              onChange={(e) => setCollegename(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
              placeholder="Enter  College Name"
            />
          </div>
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
              onChange={(e) => setCollegecode(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
              placeholder="Enter  College Code"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id=""
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
              placeholder="Enter  College Email"
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
              placeholder="Enter Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#173B45] text-white font-semibold rounded-lg hover:bg-[#20505e] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
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

export default BeuAdmin;
