import React from "react";
import logo from "../images/Screenshot 2024-11-23 023731.png";
import { useNavigate } from "react-router-dom";
import { colleges } from "../lib/utils";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
const LandingNav = () => {
  const { singleCollege } = useContext(StoreContext);
  console.log("singlecollege", singleCollege);
  const navigate = useNavigate();
  return (
    <div className="bg-[#173B45] text-blue-600 w-full h-[65px] flex items-center justify-center">
      <nav className="flex items-center justify-between w-[1200px]   px-2 text-white font-semibold">
        <img
          onClick={() => navigate("/")}
          className="w-14 h-14 rounded-full mr-8"
          src={logo}
          alt=""
        />
        <ul className="flex items-center justify-between flex-1 text-2xl">
          {singleCollege ? (
            <li className="cursor-pointer relative group py-2 ">
              <span>Gallery</span>
            </li>
          ) : (
            <li className="cursor-pointer relative group py-2 ">
              <span>Colleges</span>
              <ul
                style={{ scrollbarWidth: "none" }}
                className="absolute left-0 mt-2 w-60 h-[600px] overflow-y-scroll  bg-white text-black rounded shadow-lg hidden group-hover:flex flex-col z-10"
              >
                {colleges.map((college, index) => (
                  <Link to={`beu/colleges/${college.shortName}`}>
                    <li
                      // onClick={() => navigate(`beu/colleges/${college.shortName}`)}
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b"
                    >
                      {college.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </li>
          )}

          {singleCollege ? (
            <li className="cursor-pointer relative group py-2">
              <span>Faculties</span>
              <ul className="absolute right-0 mt-2 w-60 bg-white text-black rounded shadow-lg hidden group-hover:flex flex-col z-10">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b">
                  Computer Science and Engineering
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b">
                  Electrical Engineering
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b">
                  Mechanical Engineering
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b">
                  Civil Engineering
                </li>
              </ul>
            </li>
          ) : (
            <li className="cursor-pointer">Recent Updates</li>
          )}
          {singleCollege ? (
            <li className="cursor-pointer">Updates</li>
          ) : (
            <li className="cursor-pointer">Jobs</li>
          )}
          {singleCollege ? (
            <li className="cursor-pointer">Students</li>
          ) : (
            <li className="cursor-pointer relative group py-2">
              <span>Login</span>
              <ul className="absolute right-0 mt-2 w-60 bg-white text-black rounded shadow-lg hidden group-hover:flex flex-col z-10">
                <li
                  onClick={() => navigate("/login/college")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b"
                >
                  Lognin as Colleg
                </li>
                <li
                  onClick={() => navigate("/login/startup")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b"
                >
                  Login as Stratup
                </li>
                <li
                  onClick={() => navigate("/login/student")}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm border-b"
                >
                  Login as Student
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default LandingNav;
