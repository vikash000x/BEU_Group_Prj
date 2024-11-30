import React from "react";
import logo from "../images/Screenshot 2024-11-23 023731.png";
import { useNavigate } from "react-router-dom";
import { colleges } from "../lib/utils";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
const LandingNav = () => {
  const { singleCollege, setSingleCollege } = useContext(StoreContext);
  console.log("singlecollege", singleCollege);
  const navigate = useNavigate();

  // bg-[#173B45]
  return (
    <div className="bg-slate-800  w-full h-[65px] flex items-center justify-center">
      <nav className="flex items-center justify-between w-[1200px]   px-2 text-white font-semibold">
        <img
          onClick={() => {
            navigate("/");
            setSingleCollege(null);
          }}
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
            <Link to="/college/faculties">
              <li className="cursor-pointer relative group py-2">
                <span>Faculties</span>
              </li>
            </Link>
          ) : (
            <Link to="recent-update">
              <li className="cursor-pointer">Recent Updates</li>
            </Link>
          )}
          {singleCollege ? (
            <li className="cursor-pointer">Updates</li>
          ) : (
            <li onClick={() => navigate("/alljob")} className="cursor-pointer">
              Jobs
            </li>
          )}
          {singleCollege ? (
            <Link to="/college/students">
              <li className="cursor-pointer">Students</li>
            </Link>
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
