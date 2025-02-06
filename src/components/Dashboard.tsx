import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Treecloud from "./Treecloud";

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizData, setQuizData] = useState<QuizData>({
    pending: [
      { domain: "Technical", subDomain: "Web" },
      { domain: "Technical", subDomain: "IOT" },
    ],
    completed: [
      { domain: "Design", subDomain: "UI/UX" },
      { domain: "Management", subDomain: "Events" },
    ],
  });

  useEffect(() => {
    // Example API call to fetch quiz data
    const fetchQuizData = async () => {
      try {
        // const response = await axios.get<QuizData>("/api/quizzes");
        // setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
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
      <div className="border-2 mt-[10vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center justify-center text-white px-10 py-5">
        <h2 className="text-2xl font-press-start mb-4 self-start">ROUND-1</h2>
        <div className="flex flex-col items-center mb-8 gap-2">
          <h2 className="text-4xl mb-4">PENDING QUIZZES</h2>
          <div className="flex gap-8">
            {quizData.pending.length > 0 ? (
              quizData.pending.map((quiz, index) => (
                <div
                  key={index}
                  className="border-2 rounded-3xl px-8 py-4 flex flex-col items-center justify-center text-white hover:border-orange-500 transition duration-300 cursor-pointer"
                  onClick={() => handleStartQuiz(quiz)}
                >
                  <h3 className="text-xl">{quiz.domain}</h3>
                  {quiz.subDomain && (
                    <p className="text-xl text-gray-400">{quiz.subDomain}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No pending tasks</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl mb-4">COMPLETED QUIZZES</h2>
          <div className="flex gap-4">
            {quizData.completed.length > 0 ? (
              quizData.completed.map((quiz, index) => (
                <div
                  key={index}
                  className="border-2 rounded-3xl px-8 py-4 flex flex-col items-center justify-center text-white hover:border-white transition duration-300"
                >
                  <h3 className="text-xl">{quiz.domain}</h3>
                  {quiz.subDomain && (
                    <p className="text-xl text-gray-400">{quiz.subDomain}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No completed tasks</p>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming text-white">
          <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white">
            <p className="text-lg font-semibold">
              Are you sure you want to start the quiz?
            </p>
            <p className="mt-2">You will have 30 minutes to finish it.</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
                onClick={confirmStartQuiz}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// useEffect(() => {
//   // Example API call to fetch quiz data
//   const fetchQuizData = async () => {
//     try {
//       // const response = await axios.get<QuizData>("/api/quizzes");
//       // setQuizData(response.data);
//     } catch (error) {
//       console.error("Error fetching quiz data:", error);
//     }
//   };

//   fetchQuizData();
// }, [quizData]);
