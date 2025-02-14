import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Treecloud from "./Treecloud";
import { LoadDashboard } from "../api/user";
import Loader from "./Loader";

interface Quiz {
  domain: string;
  subDomain?: string;
}

interface QuizData {
  pending: Quiz[];
  completed: Quiz[];
}

export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizData, setQuizData] = useState<QuizData>({ pending: [], completed: [] });

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await LoadDashboard(1);
        setQuizData(response);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setPermissionModal(true); // Show permission request modal first
  };

  const requestPermissions = async () => {
    setPermissionModal(false); // Close modal

    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("Camera and microphone permissions granted.");
    } catch (error) {
      console.warn("Camera and microphone permissions denied:", error);
    }

    setShowModal(true); // Open confirmation modal
  };

  const confirmStartQuiz = () => {
    if (selectedQuiz) {
      navigate("/quiz", { state: { quiz: selectedQuiz } });
    }
    setShowModal(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute w-full pointer-events-none">
        <Treecloud />
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <div className="border-2 mt-[5vh] rounded-3xl w-[80%] text-white sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[62vh] h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl mb-4">PENDING QUIZZES</h2>
          <div className="flex gap-4 md:flex-row flex-col">
            {quizData.pending.length > 0 ? (
              quizData.pending.map((quiz, index) => (
                <div
                  key={index}
                  className="border-2 rounded-3xl px-8 py-4 flex flex-col items-center justify-center text-white hover:border-orange-500 transition duration-300 cursor-pointer"
                  onClick={() => handleStartQuiz(quiz)}
                >
                  <h3 className="text-xl">{quiz.domain}</h3>
                  {quiz.subDomain && <p className="text-xl text-gray-400">{quiz.subDomain}</p>}
                </div>
              ))
            ) : (
              <p className="text-gray-400 sm:text-2xl">No pending tasks</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl mt-8 md:mt-12 mb-4">COMPLETED QUIZZES</h2>
          <div className="flex gap-4 md:flex-row flex-col">
            {quizData.completed.length > 0 ? (
              quizData.completed.map((quiz, index) => (
                <div
                  key={index}
                  className="border-2 rounded-3xl px-8 py-4 flex flex-col items-center justify-center text-white hover:border-white transition duration-300"
                >
                  <h3 className="text-xl">{quiz.domain}</h3>
                  {quiz.subDomain && <p className="text-xl text-gray-400">{quiz.subDomain}</p>}
                </div>
              ))
            ) : (
              <p className="text-gray-400 sm:text-2xl">No completed tasks</p>
            )}
          </div>
        </div>
      </div>

      {/* Camera & Microphone Permission Modal */}
      {permissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming text-white">
          <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white">
            <p className="text-lg tracking-wider font-semibold">This quiz requires camera and microphone access.</p>
            <p className="mt-2">Please grant permissions to continue.</p>
            <div className="flex justify-center mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2" onClick={requestPermissions}>
                OK
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2" onClick={() => setPermissionModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming text-white">
          <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white">
            <p className="text-lg font-semibold">Are you sure you want to start the quiz?</p>
            <p className="mt-2">You will have 30 minutes to finish it.</p>
            <div className="flex justify-center mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2" onClick={confirmStartQuiz}>
                Yes
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
