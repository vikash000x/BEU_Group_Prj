import React, { useEffect, useState } from "react";
import logo from "../images/Screenshot 2024-11-23 023731.png";
import { useLocation, useNavigate } from "react-router-dom";
import { colleges } from "../lib/utils";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
const LandingNav = () => {
  const { userType } = useContext(StoreContext);

  const [flag1, setFlag1] = useState(false); //Single College Page
  const [flag2, setFlag2] = useState(false); //College Admin Dashboard
  const [flag3, setFlag3] = useState(false); //Rest all

  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    if(location.pathname.includes("colleges")) {
      setFlag1(true);
      setFlag2(false);
      setFlag3(false);
    }
    if(location.pathname.includes("admin")) {
      setFlag1(false);
      setFlag2(true);
      setFlag3(false);
    }
    if(!(location.pathname.includes("colleges")) && !(location.pathname.includes("admin"))) {
      setFlag1(false);
      setFlag2(false);
      setFlag3(true);
    }
  }, [location.pathname])

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
          { flag1 && 
            <li className="cursor-pointer relative group py-2 ">
              <span>Gallery</span>
            </li>
          }
          { flag3 &&
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
          }

          {flag2 && 
            <Link  to={`/${"collegeShortName"}/addStudent`}>
              <p>Add Faculty</p>
            </Link>
            
          }
            
          

          {flag1 && 
            <Link to="/colleges/faculties">
              Faculties
            </Link>
           
           }
          { flag3 &&
            <Link to='recent-update'>
              <li className="cursor-pointer">Recent Updates</li>
            </Link>
          }

          {flag2 && 
            <Link to={`/${"collegeShortName"}/addStudent`}>
              <li >Add Student</li>
            </Link>
          }
            
          
          {flag1 &&
            <li className="cursor-pointer">Updates</li>
          }
          {
            flag3 &&
            <li onClick={()=>navigate("/alljob")} className="cursor-pointer">Jobs</li>
          }
            
          
          {flag1 &&
            <Link to="/college/students">
              Students
            </Link>
          }
          {
            flag3 && userType==="anonymous" &&
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
          }

          {flag3 && userType!=="anonymous" && 
            <li>View Dashboard</li>
          }

          {flag2 && 
            <Link to={`/${"collegeShortName"}/post-update`}>
              <li>Post an Update</li>
          </Link>  
          }
            
          
        </ul>
      </nav>
    </div>
  );
};

export default LandingNav;