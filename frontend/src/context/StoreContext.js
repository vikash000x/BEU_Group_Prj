import { createContext, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [singleCollege, setSingleCollege] = useState(null);
  const [collegeFacultyData, setCollegeFacultyData] = useState(null);
  const [userType, setUserType] = useState("anonymous");
  const [token, setToken] = useState(null);
  const [loggedInCollegeData, setloggedInCollegeData] = useState(null);
  const [loading, setLoading] = useState(null);
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
    setloggedInCollegeData
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
