import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [singleCollege, setSingleCollege] = useState(null);
  const [collegeFacultyData, setCollegeFacultyData] = useState(null);
  const [userType, setUserType] = useState("anonymous");
  const [token, setToken] = useState(null);
  const [loggedInCollegeData, setloggedInCollegeData] = useState();
  const [loading, setLoading] = useState(null);
  const [editNoticeData, setEditNoticeData] = useState(null);
  const url = "http://localhost:4000/api";
  const contextValue = {
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
    editNoticeData,
    setEditNoticeData
  };

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if(localStorage.getItem("loggedInCollegeData")) {
      setloggedInCollegeData(JSON.parse(localStorage.getItem("loggedInCollegeData")));
    }
  }, [token]);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
