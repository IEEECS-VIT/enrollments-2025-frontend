import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import Cookies from "js-cookie";
import { Login } from "../api/user";
import Loader from "./Loader";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fullName = user.displayName
          ? user.displayName.split(" ").slice(0, 2).join(" ")
          : "User";
        setUser({ name: fullName });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      Cookies.set("authToken", idToken, { expires: 1, path: "" });

      const response = await Login();
      if (response.status === 200) {
        navigate("/domain");
      } else if (response.status === 201) {
        navigate("/username");
      } else if (response.status === 204) {
        setError("User not registered on VTOP");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden font-press-start flex items-center justify-center flex-col gap-y-10 relative z-2">
      {loading && <Loader />}

      {!loading && (
        <>
          <h1 className="text-[#e8b974] xl:text-7xl lg:text-6xl text-shadow-glow hidden lg:block">
            IEEE-CS
          </h1>
          <img
            className="absolute xl:left-[15vw] lg:left-[10vw] top-[25vh] hidden lg:block"
            src="Coin1.svg"
            alt="img"
          />
          <img
            className="absolute left-[90vw] top-[55vh] hidden lg:block"
            src="Coin 2.svg"
            alt="img"
          />
          <img
            className="absolute left-[5vw] top-[50vh] hidden lg:block"
            src="magnet1.svg"
            alt="img"
          />
          <img
            className="absolute left-[75vw] top-[70vh] hidden lg:block"
            src="magnet2.svg"
            alt="img"
          />
          <img
            className="absolute left-[17vw] top-[70vh] hidden lg:block"
            src="lightning1.svg"
            alt="img"
          />
          <img
            className="absolute xl:left-[78vw] lg:left-[83vw] top-[22vh] hidden lg:block"
            src="lightning2.svg"
            alt="img"
          />

          <div>
            <h1 className="text-[#e8b974] text-5xl text-shadow-glow lg:hidden">
              IEEE-CS
            </h1>
          </div>

          <div className="text-white">
            <h2 className="text-center font-custom">
              Where innovation meets technology <br />
              We forge tech
              <br /> that transcends from ordinary <br />
              into realms of the unknown.
              {error && <p style={{ color: "red" }}>{error}</p>}
            </h2>
          </div>

          {user ? (
            <h2 className="text-white text-xl mt-[13vh] lg:text-2xl">
              Welcome, {user.name}
            </h2>
          ) : (
            <>
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`text-white text-xl mt-[13vh] lg:hidden tracking-tighter ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing In..." : "<Sign In with Google>"}
              </button>
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`text-white text-2xl mt-[10vh] hidden lg:block ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing In..." : "<Sign In with Google>"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Landing;
