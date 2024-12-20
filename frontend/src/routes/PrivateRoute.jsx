import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // const { token } = useContext(StoreContext);
  const token = localStorage.getItem("token");
  console.log("from Private route", token);
  if (token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;
