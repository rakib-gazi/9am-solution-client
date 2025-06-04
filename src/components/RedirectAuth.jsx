
import { Navigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
const RedirectAuth = ({ children }) => {
  const { user, loading } =useAuth();

  if (loading) {
    return <div className="flex justify-center items-center py-12"><RiseLoader color="#0debd7"  className="py-12"/></div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RedirectAuth;