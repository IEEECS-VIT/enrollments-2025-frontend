import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionNumber from "./QuestionNumber.tsx";
import { SubmitAnswers, LoadQuestions } from "../api/user.ts";
import Loader from "./Loader";
import { showToastSuccess, showToastWarning } from "../Toast.ts";
import ConfirmationModal from "./Modal.tsx";
import Cookies from "js-cookie";
import {
  fetchExpiryTime,
  getQuizData,
  storeQuizData,
} from "../utils/indexedDb.ts";
import {
  saveAnswersToLocalStorage,
  loadAnswersFromLocalStorage,
  clearAnswersFromLocalStorage,
} from "../utils/localStorage.ts";
import ImageModal from "./ImageModal.tsx";

interface QuizData {
  questions: {
    image_url: any;
    question: string;
    options?: string[];
    correctAnswer: number | string;
  }[];
}

export default function Questions() {
  const location = useLocation();
  const navigate = useNavigate();
  const subdomain = location.state?.quiz?.subDomain || Cookies.get("subdomain");
  const domain = subdomain?.toUpperCase();
  const [quizData, setQuizData] = useState<QuizData>({ questions: [] });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | number;
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date | null>(null);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const round = 1;

  // Load questions and initialize answers
  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);

      // Try to fetch from IndexedDB first
      const cachedQuizData = await getQuizData(subdomain);
      if (cachedQuizData) {
        setQuizData(cachedQuizData);

        // Load answers from localStorage
        const savedAnswers = loadAnswersFromLocalStorage(subdomain);
        if (savedAnswers) {
          setSelectedAnswers(savedAnswers);
        }

        setLoading(false);
        return;
      }

      try {
        // Fetch from backend if not found in IndexedDB
        const data = await LoadQuestions({ subdomain });
        setQuizData(data);

        // Store fetched questions securely
        await storeQuizData(subdomain, data);

        // Load answers from localStorage
        const savedAnswers = loadAnswersFromLocalStorage(subdomain);
        if (savedAnswers) {
          setSelectedAnswers(savedAnswers);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [subdomain]);

  useEffect(() => {
    fetchExpiryTime().then(setExpiryTimestamp);
  }, []);

  // Unified submit function for both manual and automatic submission
  const handleSubmit = async (isAutoSubmit = false) => {
    setLoading(true);
    try {
      const currentQuizData = await LoadQuestions({ subdomain });
      const savedAnswers = loadAnswersFromLocalStorage(subdomain);

      if (!currentQuizData || !currentQuizData.questions) {
        throw new Error("Quiz data not loaded properly.");
      }

      if (Object.keys(savedAnswers).length === 0) {
        throw new Error("No answers to submit.");
      }

      const answers = currentQuizData.questions.map(
        (_, index) => savedAnswers[index]?.toString().trim() || ""
      );

      const result = await SubmitAnswers(
        round,
        domain,
        currentQuizData.questions.map((q) => q.question),
        answers
      );

      if (result.status === 200) {
        clearAnswersFromLocalStorage(subdomain);
        showToastSuccess(
          isAutoSubmit
            ? "Time's up! Quiz submitted automatically"
            : "Quiz submitted successfully"
        );

        setTimeout(() => {
          navigate("/quiz-complete");
        }, 100);
      }
    } catch (error) {
      console.error("Submission error:", error);
      showToastWarning(
        isAutoSubmit
          ? "Automatic submission failed. Please try manual submission."
          : "Submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Timer display and auto-submit
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
  useEffect(() => {
    if (!expiryTimestamp || isTimerExpired) return;

    const timerInterval = setInterval(() => {
      const now = new Date();
      const timeDiff = Math.max(
        0,
        Math.floor((expiryTimestamp.getTime() - now.getTime()) / 1000)
      );

      if (timeDiff <= 0) {
        setIsTimerExpired(true);
        clearInterval(timerInterval);
        handleSubmit(true); // Auto-submit with flag
      } else {
        setTimeLeft({
          minutes: Math.floor(timeDiff / 60),
          seconds: timeDiff % 60,
        });
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [expiryTimestamp, isTimerExpired]);

  // Answer handling
  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const updatedAnswers = { ...selectedAnswers, [questionIndex]: answer };
    setSelectedAnswers(updatedAnswers);
    saveAnswersToLocalStorage(subdomain, updatedAnswers);
  };

  // Timer display formatting
  const formattedTime = `${String(timeLeft.minutes).padStart(2, "0")}:${String(
    timeLeft.seconds
  ).padStart(2, "0")}`;

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <Loader />
      </div>
    );
  }

  if (!quizData) {
    return <div className="text-center text-lg">Loading quiz...</div>;
  }

  return (
    <>
      <div className="border-2 border-white mt-[10vh] rounded-3xl w-[80%] backdrop-blur-[4.5px] lg:w-[70%] sm:h-[65vh] h-[75vh] flex flex-col items-center p-4 md:p-8 z-50">
        <div className="flex w-full justify-center items-center">
          <h2 className="text-5xl flex-col my-4 mt-20 md:m-1 font-playmegames absolute">
            {subdomain.toUpperCase()}
          </h2>
          <div className="border hidden sm:block border-white rounded-xl p-4 ml-auto">
            {formattedTime}
          </div>
        </div>
        <div className="border block sm:hidden mt-16 border-white rounded-xl p-4 ml-0">
          {formattedTime}
        </div>
        <div className="relative flex flex-col justify-start sm:mt-4 items-center p-2 h-full w-[80vw] max-w-full font-retro-gaming">
          <div id="questionBox" className="p-4 w-100 sm:w-full rounded-xl">
            <div
              id="question"
              className="p-4 text-xs md:text-lg leading-6 border border-white rounded-xl flex justify-between"
            >
              {quizData.questions[currentQuestionIndex].question}

              {quizData.questions[currentQuestionIndex].image_url && (
                <button
                  className=" bg-blue-500 text-white px-2 py-2 rounded "
                  onClick={() => setShowImageModal(true)}
                >
                  View Image
                </button>
              )}
            </div>

            {showImageModal && (
              <ImageModal
                imageUrl={quizData.questions[currentQuestionIndex].image_url}
                onClose={() => setShowImageModal(false)}
              />
            )}

            {/* If options exist, show multiple-choice buttons */}
            {quizData.questions[currentQuestionIndex].options ? (
              <div className="text-xs md:text-lg grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-8 sm:mt-4 max-h-80 overflow-y-auto">
                {quizData.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div
                      key={index}
                      className={`p-2 mt-4 sm:mt-0 border rounded-xl cursor-pointer ${
                        selectedAnswers[currentQuestionIndex] === option
                          ? "bg-[#f8770f] text-white"
                          : "hover:bg-gray-900"
                      }`}
                      onClick={() =>
                        handleAnswerChange(currentQuestionIndex, option)
                      }
                    >
                      {option}
                    </div>
                  )
                )}
              </div>
            ) : (
              // If no options, show a text input field
              <div className="mt-4">
                <textarea
                  className="w-full h-60 mt-8 sm:mt-1 sm:h-32 p-2 border bg-transparent rounded-lg text-white font-mono resize-none overflow-auto"
                  placeholder="Type your answer here"
                  value={selectedAnswers[currentQuestionIndex] || ""}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestionIndex, e.target.value)
                  }
                />
              </div>
            )}
          </div>

          <div className="absolute bottom-0 mb-2">
            <QuestionNumber
              totalQuestions={quizData.questions.length}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionChange={setCurrentQuestionIndex}
            />
          </div>
        </div>

        {showModal && (
          <ConfirmationModal
            message={`Are you sure you want to submit?${"  "}
        You have attempted ${
          Object.values(selectedAnswers).filter((v) => v !== "").length
        }/${quizData.questions.length} questions.`}
            onConfirm={() => {
              setShowModal(false);
              handleSubmit();
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
      {currentQuestionIndex === quizData.questions.length - 1 && (
        <button
          className="absolute md:bottom-8 bottom-4 text-white font-retro-gaming text-lg md:text-xl"
          onClick={() => setShowModal(true)}
        >
          &lt; Submit &gt;
        </button>
      )}
    </>
  );
}
