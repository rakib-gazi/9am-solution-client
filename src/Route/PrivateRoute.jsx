
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate state={location.pathname} to={"/signin"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
