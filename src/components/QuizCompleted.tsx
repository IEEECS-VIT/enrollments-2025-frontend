import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Treecloud from "./Treecloud";

export default function QuizComplete() {
  const navigate = useNavigate();

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
          className="mt-10 px-6 py-3 bg-[#f8770f] text-white text-lg rounded-lg shadow-lg hover:bg-orange-600 transition-all"
          onClick={() => navigate("/dashboard")}
        >
          &lt; GO TO DASHBOARD &gt;
        </button>
      </div>
    </div>
  );
}
