import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth-context";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authState } = useAuth();
  const location = useLocation();

  if (authState === "authenticated" && location.pathname === "/") {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (authState)
    if (
      authState === "unauthenticated" &&
      location.pathname.startsWith("/user")
    ) {
      return <Navigate to="/login" replace />;
    }

  return children;
};

export default ProtectedRoute;
