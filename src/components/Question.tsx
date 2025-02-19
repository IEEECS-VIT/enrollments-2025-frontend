import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import QuestionNumber from "./QuestionNumber.tsx";
import { SubmitAnswers, LoadQuestions } from "../api/user.ts";
import Loader from "./Loader";
import ConfirmationModal from "./Modal.tsx";
import { showToastSuccess, showToastWarning } from "../Toast.ts";
import { disableDevTools, disableRightClick } from "../utils/SecurityUtils.tsx";
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
import {
  handleBackButtonWarning,
  addBeforeUnloadListener,
} from "../utils/navigation.ts";
import {
  addFullscreenListener,
  handleReEnterFullscreen,
} from "../utils/fullscreen.ts";

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
  var domain = subdomain?.toUpperCase();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const [quizData, setQuizData] = useState<QuizData>({ questions: [] });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | number;
  }>({});
  const [showScore, setShowScore] = useState(false);
  const [notSubmitted, setNotSubmitted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showFullScreenModal, setShowFullScreenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date | null>(null);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const round = 1;

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

    const savedAnswers = Cookies.get(subdomain);
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }

    const cleanupBackButtonWarning =
      handleBackButtonWarning(setShowBackWarning);
    return cleanupBackButtonWarning;
  }, [subdomain]);

  useEffect(() => {
    fetchExpiryTime(subdomain).then(setExpiryTimestamp);
    disableDevTools();
    disableRightClick();
  }, []);

  useEffect(() => {
    const cleanupBeforeUnload = addBeforeUnloadListener(
      confirmed,
      hasUnsavedChanges,
      notSubmitted
    );

    return cleanupBeforeUnload;
  }, [confirmed, hasUnsavedChanges, notSubmitted]);

  const handleSubmit = async (isAutoSubmit = false) => {
    setLoadingSubmit(true);

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
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }

      if (result.status === 200) {
        setLoadingSubmit(false);
        clearAnswersFromLocalStorage(subdomain);
        setTimeout(() => {
          navigate("/quiz-complete"); // Redirect after success
        }, 100);
        setTimeout(() => {
          showToastSuccess(
            isAutoSubmit
              ? "Time's up! Quiz submitted automatically"
              : "Quiz submitted successfully"
          );
        }, 500);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setLoadingSubmit(false);
      showToastWarning(
        isAutoSubmit
          ? "Automatic submission failed. Please try manual submission."
          : "Submission failed. Please try again."
      );
    }
  };

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

  const formattedTime = `${String(timeLeft.minutes).padStart(2, "0")}:${String(
    timeLeft.seconds
  ).padStart(2, "0")}`;

  useEffect(() => {
    const cleanupFullscreenListener = addFullscreenListener(
      notSubmitted,
      showBackWarning,
      showLeaveModal,
      setShowFullScreenModal
    );

    return cleanupFullscreenListener;
  }, [notSubmitted, showBackWarning, showLeaveModal]);

  const reEnterFullscreen = () =>
    handleReEnterFullscreen(setShowFullScreenModal);

  if (showFullScreenModal && notSubmitted && !isLeaving) {
    return (
      <div className="fixed inset-0 flex flex-col relative z-80  items-center justify-center bg-black bg-opacity-40 text-white text-center p-8">
        <h2 className="text-3xl font-bold mb-4">
          Enter Fullscreen to Continue
        </h2>
        <button
          className="bg-[#F8B95A] bg-opacity-50 border-4 border-[#F8B95A]  text-white px-6 py-3 rounded-md text-lg"
          onClick={reEnterFullscreen}
        >
          Enter Fullscreen
        </button>
      </div>
    );
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const updatedAnswers = { ...selectedAnswers, [questionIndex]: answer };
    setSelectedAnswers(updatedAnswers);
    saveAnswersToLocalStorage(subdomain, updatedAnswers);
  };

  const handlePreventCopyPaste = (
    e: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
  };

  if (loading || loadingSubmit) {
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
          <div className="absolute group mt-4 sm:mt-0 left-4">
            <span className="text-white text-lg cursor-pointer bg-opacity-50 border-[#F8B95A] border-[0.15rem] shadow-[2px_2px_0px_#FF0000] bg-[#F8B95A] rounded-full w-8 h-8 flex items-center justify-center">
              ℹ
            </span>
            <div className="absolute left-12 tracking-wider bg-opacity-50 transform -translate-x-80 -translate-y-32 lg:-translate-x-1/2 border-[0.15rem] border-[#F8B95A] mt-2 w-max bg-[#F8B95A] text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Leaving this site will Submit the Quiz
            </div>
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

            {/* If options exist, show multiple-choice buttons */}
            {quizData.questions[currentQuestionIndex].options ? (
              <div className="text-xs md:text-lg grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-8 sm:mt-4 max-h-80 overflow-y-auto">
                {quizData.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div
                      key={index}
                      className={`p-2 mt-4 sm:mt-8 h-16 border rounded-xl cursor-pointer ${
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
              <div className="mt-4">
                <textarea
                  className="w-full h-60 mt-8 sm:mt-1 sm:h-56 p-2 border bg-transparent rounded-lg text-white font-mono resize-none overflow-auto"
                  placeholder="Type your answer here"
                  onCopy={handlePreventCopyPaste}
                  onCut={handlePreventCopyPaste}
                  onPaste={handlePreventCopyPaste}
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

        {showBackWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming">
            <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white">
              <p className="text-lg font-semibold font-retro-gaming">
                Are you sure you want to leave? <br /> Your progress will be
                lost, and the timer will keep running!
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBackWarning(false);
                    window.location.reload();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
                  onClick={() => {
                    window.removeEventListener("beforeunload", () => {});
                    navigate("/dashboard");
                    if (document.fullscreenElement) {
                      document.exitFullscreen();
                    }
                  }}
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
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
