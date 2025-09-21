import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthNotRequiredRouteProps {
  children: ReactNode;
}

const AuthNotRequiredRoute: React.FC<AuthNotRequiredRouteProps> = ({ children }) => {
  const location = useLocation();

  if (localStorage.getItem("token")) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthNotRequiredRoute;
