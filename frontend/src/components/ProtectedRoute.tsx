import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = () => {
  const { isAdmin } = useUser();

  if (!isAdmin) return <Navigate to={"/"} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
