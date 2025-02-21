import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { showToastWarning } from "../Toast";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setTimeout(() => {
        showToastWarning("You are not logged in.");
      }, 100);

      navigate("/");
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
