import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Cookies from "js-cookie";
import { Login } from "../api/user";
import { showToastSuccess, showToastWarning } from "../Toast";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const token = Cookies.get("authToken");

      if (user && token) {
        const fullName = user.displayName
          ? user.displayName.split(" ").slice(0, -1).join(" ")
          : "User";
        setUser({ name: fullName });
      } else {
        setUser(null);
        Cookies.remove("authToken");
      }
      setCheckingAuth(false);
    });

    const checkToken = () => {
      const token = Cookies.get("authToken");
      if (!token) {
        setUser(null);
      }
    };

    const interval = setInterval(checkToken, 5000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const response = await Login();
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/domain");
        }, 1500);
        showToastSuccess("Successfully signed In");
      } else if (response.status === 201) {
        navigate("/username");
      } else if (response.status === 204) {
        setError("User not registered on VTOP");
        showToastWarning("User not registered in VTOP");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden font-press-start flex items-center justify-center flex-col gap-y-6 relative z-10">
      <motion.h1
        className="text-[#e8b974] mt-4 md:mt-16 xl:text-8xl lg:text-6xl text-shadow-glow hidden lg:block"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        IEEE-CS
      </motion.h1>
      <ToastContainer className="custom-toast-container" />

      <motion.img
        className="absolute xl:left-[15vw] lg:left-[10vw] top-[25vh] hidden lg:block"
        src="Coin1.svg"
        alt="img"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.img
        className="absolute left-[90vw] top-[55vh] hidden lg:block"
        src="Coin 2.svg"
        alt="img"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.img
        className="absolute left-[5vw] top-[50vh] hidden lg:block"
        src="magnet1.svg"
        alt="img"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.img
        className="absolute left-[75vw] top-[70vh] hidden lg:block"
        src="magnet2.svg"
        alt="img"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.img
        className="absolute left-[17vw] top-[70vh] hidden lg:block"
        src="lightning1.svg"
        alt="img"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.img
        className="absolute xl:left-[78vw] lg:left-[83vw] top-[22vh] hidden lg:block"
        src="lightning2.svg"
        alt="img"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-[#e8b974] text-5xl text-shadow-glow lg:hidden">
          IEEE-CS
        </h1>
      </motion.div>

      <motion.div
        className="text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-center text-sm md:text-md mt-[2vh] lg:text-lg font-custom">
          Where innovation meets technology <br />
          We forge tech <br />
          that transcends from ordinary <br />
          into realms of the unknown.
        </h2>
        {error && (
          <p className="mt-4 text-sm font-semibold text-center text-red-500 md:text-md lg:text-lg">
            {error}
          </p>
        )}
      </motion.div>

      {user ? (
        <>
          <h2 className="text-white text-sm sm:text-xl mt-[7.5vh] lg:text-2xl relative z-20 text-center leading-7">
            Welcome, {user.name}
          </h2>
        </>
      ) : (
        <>
          <motion.button
  onClick={handleLogin}
  disabled={loading}
  className={`text-white text-sm sm:text-xl mt-[5vh] lg:hidden tracking-tighter ${
    loading ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  <motion.span
    className="inline-block mr-2" // Fix for scaling text
    animate={{ scale: [1, 1.5, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  >
    {"<"}
  </motion.span>
  Sign In with Google
  <motion.span
    className="inline-block ml-2" // Fix for scaling text
    animate={{ scale: [1, 1.5, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  >
    {" > "}
  </motion.span>
</motion.button>

<motion.button
  onClick={handleLogin}
  disabled={loading}
  className={`text-white text-2xl mt-[5vh] hidden lg:block ${
    loading ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  <motion.span
    className="inline-block mr-2" // Fix for scaling text
    animate={{ scale: [1, 1.5, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  >
    {"<"}
  </motion.span>
  Sign In with Google
  <motion.span
    className="inline-block ml-2" // Fix for scaling text
    animate={{ scale: [1, 1.5, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  >
    {" >"}
  </motion.span>
</motion.button>



        </>
      )}

      {checkingAuth && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Landing;
