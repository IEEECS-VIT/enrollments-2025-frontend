import React, { useLayoutEffect, useState, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { showToastWarning } from "../Toast";

const ProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const hasCheckedAuth = useRef(false); // Prevents double execution

  useLayoutEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

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

  return <Outlet />;
};

export default ProtectedRoute;
