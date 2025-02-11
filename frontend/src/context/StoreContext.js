import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [singleCollege, setSingleCollege] = useState(null);
  const [collegeFacultyData, setCollegeFacultyData] = useState(null);
  const [userType, setUserType] = useState("anonymous");
  const [token, setToken] = useState(null);
  const [loggedInCollegeData, setloggedInCollegeData] = useState(null);
  const [loggedInStudentData, setloggedInStudentData] = useState(null);
  const [loggedInBEUAdminData, setloggedInBEUAdminData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [editNoticeData, setEditNoticeData] = useState(null);
  const [registeredCollege, setRegisteredCollege] = useState(null);
  const [loggedInStartUpData, setLoggedInStartUpData] = useState(null);

  const url = "http://localhost:4000/api"

  const fetchRegisteredColleges = async () => {
    const res = await axios.get(`${url}/collegeadmin/all-registered-college`);
    if (res.data.success) {
      setRegisteredCollege(res.data.registeredColleges);
    }
  };

  const contextValue = {
    registeredCollege,
    loading,
    setLoading,
    singleCollege,
    setSingleCollege,
    collegeFacultyData,
    setCollegeFacultyData,
    userType,
    setUserType,
    setToken,
    token,
    url,
    loggedInCollegeData,
    setloggedInCollegeData,
    loggedInStudentData,
    setloggedInStudentData,
    loggedInStartUpData,
    setLoggedInStartUpData,
    editNoticeData,
    setEditNoticeData,
    loggedInBEUAdminData,
    setloggedInBEUAdminData
  };
  useEffect(() => {
    fetchRegisteredColleges();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("loggedInCollegeData")) {
      setloggedInCollegeData(
        JSON.parse(localStorage.getItem("loggedInCollegeData"))
      );
    }
    if (localStorage.getItem("token")) {
      setToken(
        localStorage.getItem("token")
      );
    }
    if (localStorage.getItem("userType")) {
      setUserType(
        localStorage.getItem("userType")
      );
    }
    if (localStorage.getItem("loggedInStartUpData")) {
      setLoggedInStartUpData(
        JSON.parse(localStorage.getItem("loggedInStartUpData"))
      );
    }
    if (localStorage.getItem("loggedInStudentData")) {
      setloggedInStudentData(
        JSON.parse(localStorage.getItem("loggedInStudentData"))
      );
    }
    if (localStorage.getItem("loggedInBEUAdminData")) {
      setloggedInBEUAdminData(
        JSON.parse(localStorage.getItem("loggedInBEUAdminData"))
      );
    }
  }, [token]);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
