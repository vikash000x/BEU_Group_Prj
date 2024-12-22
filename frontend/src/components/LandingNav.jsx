import React, { useEffect, useState } from "react";
import logo from "../images/Screenshot 2024-11-23 023731.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
const LandingNav = () => {
  const { userType, loggedInCollegeData, registeredCollege } =
    useContext(StoreContext);
  const [active, setActive] = useState("");

  const [flag1, setFlag1] = useState(false); //Single College Page
  const [flag2, setFlag2] = useState(false); //College Admin Dashboard
  const [flag3, setFlag3] = useState(false); //Rest all
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      setFlag1(false);
      setFlag2(false);
      setFlag3(true);
    } else if (
      location.pathname.includes("college") &&
      location.pathname.includes("beu")
    ) {
      setFlag1(true);
      setFlag2(false);
      setFlag3(false);
    } else if (
      userType === "college" &&
      (location.pathname.includes("admin") ||
        location.pathname.includes("addFaculty") ||
        location.pathname.includes("addStudent") ||
        location.pathname.includes("post-update"))
    ) {
      setFlag1(false);
      setFlag2(true);
      setFlag3(false);
    }
  }, [location.pathname, userType]);

  const handleClick = (collegeCode) => {
    localStorage.setItem("collegeCode", collegeCode);
    navigate(`beu/college/${collegeCode}`);
  };

  return (
    <div className="bg-[#0B192C] shadow-lg border-b-[0.01rem] font-popins [&>*]:font-light border-b-white border-opacity-50  w-full h-[65px] flex items-center justify-center">
      <nav className="flex items-center justify-between w-[1200px]   px-2 text-white font-semibold">
        <img
          onClick={() => navigate("/")}
          className="w-14 h-14 rounded-full mr-8"
          src={logo}
          alt=""
        />
        <ul className="flex items-center justify-between flex-1 text-2xl">
          {flag1 && (
            <Link to="/college/gallery">
              <li className="cursor-pointer relative group py-2 ">
                <span>Gallery</span>
              </li>
            </Link>
          )}
          {flag3 && (
            <li className="cursor-pointer relative group py-2">
              <div className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <span className="text-lg font-medium group-hover:text-blue-400">
                  Colleges
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 group-hover:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="absolute left-0 mt-2 w-80 hidden group-hover:block transform transition-all duration-300 origin-top z-50">
                <div className="bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden">
                  <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <h3 className="text-sm font-semibold text-white">
                      Select College
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Choose from our registered colleges
                    </p>
                  </div>
                  <ul
                    style={{ scrollbarWidth: "none" }}
                    className="max-h-[400px] overflow-y-auto py-1"
                  >
                    {registeredCollege?.map((college, index) => (
                      <li
                        key={index}
                        onClick={() => handleClick(college.collegecode)}
                        className="relative group/item px-2"
                      >
                        <div className="flex items-center gap-3 p-3 rounded-lg mx-1 my-1 hover:bg-slate-800/50 cursor-pointer transition-all duration-300 hover:scale-[0.98]">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center font-semibold shadow-lg transform transition-transform group-hover/item:scale-110 group-hover/item:rotate-3">
                            {college.collegename.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-200 group-hover/item:text-white truncate">
                              {college.collegename}
                            </p>
                            <p className="text-xs text-slate-400 group-hover/item:text-slate-300 mt-0.5">
                              View college details
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 text-[10px] font-medium bg-blue-500/10 text-blue-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                              View
                            </span>
                            <svg
                              className="w-4 h-4 text-slate-400 transform transition-all duration-300 group-hover/item:text-blue-400 group-hover/item:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          )}

          {flag2 && (
            <Link to={`/${loggedInCollegeData?.collegeCode}/addFaculty`}>
              <li className="bg-red-500 px-3 py-2">Add Faculty</li>
            </Link>
          )}

          {flag1 && (
            <Link
              to={`/college/faculties/${localStorage.getItem("collegeCode")}`}
            >
              Faculties
            </Link>
          )}
          {flag3 && (
            <Link to="recent-update">
              <li
                className={`cursor-pointer px-3 py-2 hover:bg-white hover:text-slate-800 ${
                  active === "rupdates" ? "bg-white text-slate-800" : ""
                }`}
                onClick={() => setActive("rupdates")}
              >
                Recent Updates
              </li>
            </Link>
          )}

          {flag2 && (
            <Link to={`/${"collegeShortName"}/addStudent`}>
              <li>Add Student</li>
            </Link>
          )}

          {flag1 && <li className="cursor-pointer">Updates</li>}
          {flag3 && (
            <li
              onClick={() => {
                navigate("/alljob");
                setActive("jobs");
              }}
              className={`cursor-pointer px-3 py-2 hover:bg-white hover:text-slate-800 ${
                active === "jobs" ? "bg-white text-slate-800" : ""
              }`}
            >
              Jobs
            </li>
          )}

          {flag1 && <Link to="/college/students">Students</Link>}
          {flag3 && userType === "anonymous" && (
            <li
              className={`cursor-pointer px-3 py-2 group relative hover:bg-white hover:text-slate-800 ${
                active === "login" ? "bg-white text-slate-800" : ""
              }`}
              onClick={() => setActive("login")}
            >
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

          {flag2 && (
            <Link to={`/${"collegeShortName"}/post-update`}>
              <li>Post an Update</li>
            </Link>
          )}

          {userType === "college" && (
            <Link to={`collegename/admin`}>
              <p>View Dashboard</p>
            </Link>
          )}
          {userType === "startup" && (
            <Link to={`job-section`}>
              <p>View Dashboard</p>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default LandingNav;
