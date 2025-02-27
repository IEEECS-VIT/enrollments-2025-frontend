import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Treecloud from "./Treecloud";

export default function QuizComplete() {
  const navigate = useNavigate();

  useEffect(() => {
    // Replace current history entry with the same page to prevent going back
    window.history.replaceState(null, "", "/quiz-complete");

    // Handle back button press
    const handleBackButton = () => {
      navigate("/dashboard", { replace: true });
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Element */}
      <div className="absolute w-full pointer-events-none">
        <Treecloud />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center text-center p-6 z-10">
        <p className="text-lg sm:text-2xl text-gray-300">
          Your answers have been submitted successfully.
        </p>
        <ToastContainer />
        <button
          className="mt-10 px-6 py-3 bg-[#F8B95A] bg-opacity-50 border-2 border-[#F8B95A] text-white text-lg rounded-lg shadow-lg transition-all"
          onClick={() => navigate("/dashboard")}
        >
          &lt; GO TO DASHBOARD &gt;
        </button>
      </div>
    </div>
  );
}
