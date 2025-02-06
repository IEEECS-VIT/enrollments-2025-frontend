import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import QuestionNumber from "./QuestionNumber.tsx";
import { SubmitAnswers } from "../api/user.ts";
import axios from "axios";
import Loader from "./Loader";
import { useTimer } from "react-timer-hook"; // Import the useTimer hook

interface QuizData {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export default function Questions() {
  const location = useLocation();
  const navigate = useNavigate();
  const subdomain = location.state?.quiz?.subDomain;
  var domain = location.state?.quiz?.domain;

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const round = 1;

  // Timer logic
  const { seconds, minutes, start, pause, resume, restart } = useTimer({
    expiryTimestamp: new Date(new Date().getTime() + 30 * 60 * 1000),
    onExpire: () => {
      // Handle timer expiry (e.g., auto-submit quiz)
      alert("Time's up! The quiz will be submitted automatically.");
      handleSubmit();
    },
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get<QuizData>(
          `http://localhost:8000/domain/questions?domain=${subdomain}&round=1`
        );
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    fetchQuizData();

    const savedAnswers = Cookies.get("quizAnswers");
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
  }, [subdomain]);

  // Handle back button press
  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      setShowBackWarning(true);
      window.history.pushState(null, "", location.pathname);
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome
      setShowBackWarning(true);
      return ""; // Required for legacy browsers
    };

    window.history.pushState(null, "", location.pathname);
    window.addEventListener("popstate", handleBackButton);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.pathname]);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = { ...selectedAnswers, [questionIndex]: optionIndex };
    setSelectedAnswers(updatedAnswers);
    Cookies.set("quizAnswers", JSON.stringify(updatedAnswers), { expires: 7 });
  };

  const handleQuestionChange = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = async () => {
    if (!quizData) return;

    let calculatedScore = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] + 1 === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowScore(true);

    const questions = quizData.questions.map((q) => q.question);
    const answers = quizData.questions.map(
      (q, index) => q.options[selectedAnswers[index]]
    );

    try {
      console.log({
        round,
        domain: subdomain.toUpperCase(),
        questions,
        answers,
      });

      domain = subdomain.toUpperCase();
      const result = await SubmitAnswers(round, domain, questions, answers);
      if (result.status !== 200) {
        alert("Error submitting answers. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Error submitting answers. Please try again.");
    }
  };

  const attemptedQuestions = Object.keys(selectedAnswers).length;
  const totalQuestions = quizData?.questions.length || 0;

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

  if (showScore) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-lg">Quiz answers submitted successfully.</p>
        <p>Score: {score}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <h2 className="text-5xl my-4 md:m-1 font-playmegames absolute">
          {subdomain.toUpperCase()}
        </h2>
        <div className="border border-white rounded-xl p-4 ml-auto">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>

      <div className="relative flex flex-col justify-start items-center p-2 h-full max-w-[100%] font-retro-gaming">
        <div id="questionBox" className="m-4 p-4 w-full rounded-xl">
          <div
            id="question"
            className="p-4 text-xs md:text-lg leading-6 border border-white rounded-xl flex justify-center"
          >
            {quizData.questions[currentQuestionIndex].question}
          </div>
          <div className="text-xs md:text-lg grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {quizData.questions[currentQuestionIndex].options.map(
              (option, index) => (
                <div
                  key={index}
                  className={`p-2 border rounded-xl cursor-pointer ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? "bg-[#f8770f] text-white"
                      : "hover:bg-gray-900"
                  }`}
                  onClick={() =>
                    handleOptionSelect(currentQuestionIndex, index)
                  }
                >
                  {option}
                </div>
              )
            )}
          </div>
        </div>
        <div className="absolute bottom-0 mb-2">
          <QuestionNumber
            totalQuestions={quizData.questions.length}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionChange={handleQuestionChange}
          />
        </div>
      </div>

      {currentQuestionIndex === quizData.questions.length - 1 && (
        <button
          className="absolute md:bottom-8 bottom-4 text-white font-retro-gaming text-lg md:text-xl"
          onClick={() => setShowModal(true)}
        >
          &lt; Submit &gt;
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming">
          <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white">
            <p className="text-lg font-semibold">
              Are you sure you want to submit?
            </p>
            <p className="mt-2">
              You have attempted {attemptedQuestions}/{totalQuestions}{" "}
              questions.
            </p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
                onClick={() => {
                  setShowModal(false);
                  handleSubmit();
                }}
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

      {/* Back button warning modal */}
      {showBackWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming">
          <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white">
            <p className="text-lg font-semibold font-retro-gaming">
              Are you sure you want to leave? <br /> Your progress will be lost,
              and the timer will keep running!
            </p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2"
                onClick={() => setShowBackWarning(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
                onClick={() => {
                  window.removeEventListener("beforeunload", () => {});
                  navigate("/dashboard");
                }}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
