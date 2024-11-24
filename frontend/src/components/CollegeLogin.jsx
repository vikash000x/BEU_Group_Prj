import React, { useState } from "react";
import { Link } from "react-router-dom";

const CollegeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email, "Password:", password);
  };
  return (
    <div className="bg-gray-100 h-[100vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          College Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              College Name
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
              placeholder="Enter your startup name"
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
