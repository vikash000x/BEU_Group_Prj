import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // const { token } = useContext(StoreContext);
  const startUpLogedInData = localStorage.getItem("startUpLogedInData");
  const token = JSON.parse(startUpLogedInData)?.token;
  console.log("from Private route", token);
  if (token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;
