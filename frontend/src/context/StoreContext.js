import { createContext, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [singleCollege, setSingleCollege] = useState(null);
  const [collegeFacultyData, setCollegeFacultyData] = useState(null);
  const [userType, setUserType] = useState("anonymous");

  const contextValue = {
    singleCollege,
    setSingleCollege,
    collegeFacultyData,
    setCollegeFacultyData,
    userType,
    setUserType
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
