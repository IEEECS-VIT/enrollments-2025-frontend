import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { showToastWarning } from "../Toast";
import { LoadProfile } from "../api/user";
import Loader from "./Loader";

const ProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [redirecting, setRedirecting] = useState(false);
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

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let isMounted = true;

    const checkUsername = async () => {
      try {
        const profile = await LoadProfile();

        if (!isMounted) {
          return;
        }

        if (!profile.username?.trim() && location.pathname !== "/username") {
          setRedirecting(true);
          setTimeout(() => navigate("/username", { replace: true }), 150);
          return;
        }

        if (profile.username?.trim() && location.pathname === "/username") {
          setRedirecting(true);
          setTimeout(() => navigate("/domain", { replace: true }), 150);
          return;
        }
      } catch {
        if (isMounted && location.pathname !== "/username") {
          setRedirecting(true);
          setTimeout(() => navigate("/username", { replace: true }), 150);
          return;
        }
      }
    };

    checkUsername();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, location.pathname, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (redirecting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
