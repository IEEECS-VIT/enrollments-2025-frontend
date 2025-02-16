import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import QuestionNumber from "./QuestionNumber.tsx";
import { SubmitAnswers, LoadQuestions } from "../api/user.ts";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";
import { showToastSuccess, showToastWarning } from "../Toast.ts";
import { useTimer } from "react-timer-hook";

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
  var domain = location.state?.quiz?.domain;

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | number;
  }>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const round = 1;

  const expiryTimeFromCookie = Cookies.get(`${subdomain}ExpiryTime`);

  const expiryTimestamp = expiryTimeFromCookie
    ? new Date(Number(expiryTimeFromCookie))
    : new Date(new Date().getTime() + 30 * 60 * 1000);

  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      alert("Time's up! The quiz will be submitted automatically.");
      handleSubmit();
    },
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        console.log({ subdomain });
        const data = await LoadQuestions({ subdomain });
        Cookies.remove("quizAnswers");
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        console.log(quizData);
        setTimeout(() => setLoading(false), 2000);
      }
    };

    fetchQuizData();

    const savedAnswers = Cookies.get(subdomain);
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
  }, [subdomain]);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const updatedAnswers = { ...selectedAnswers, [questionIndex]: answer };
    setSelectedAnswers(updatedAnswers);
    Cookies.set("quizAnswers", JSON.stringify(updatedAnswers), { expires: 7 });
  };

  const handleSubmit = async () => {
    if (!quizData) return;

    let score = 0;
    quizData.questions.forEach((question, index) => {
      if (!question.correctAnswer) {
        return;
      }

      if (
        (question.options &&
          selectedAnswers[index] + 1 === question.correctAnswer) ||
        (!question.options &&
          selectedAnswers[index]?.toString().trim().toLowerCase() ===
            question.correctAnswer.toString().trim().toLowerCase())
      ) {
        score++;
      }
    });

    setScore(score);

    setShowScore(true);

    const questions = quizData.questions.map((q) => q.question);
    const answers = quizData.questions.map((q, index) =>
      selectedAnswers[index] !== undefined ? selectedAnswers[index] : ""
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
      showToastSuccess("Quiz submitted successfully");

      if (result.status !== 200) {
        alert("Error submitting answers. Please try again.");
        showToastWarning("Please try again");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Error submitting answers. Please try again.");
    }
  };

  const handlePreventCopyPaste = (
    e: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
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
      <div className="flex flex-col items-center justify-center text-xs sm:text-lg h-full p-4">
        <p className="w-full text-center tracking-tight whitespace-wrap">
          Quiz answers submitted successfully.
        </p>
        <ToastContainer />
        <button className="mt-16" onClick={() => navigate("/dashboard")}>
          &lt; GO TO DASHBOARD &gt;
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="border-2 border-white mt-[10vh] rounded-3xl w-[80%] backdrop-blur-[4.5px] lg:w-[70%] sm:h-[65vh] h-[75vh] flex flex-col items-center p-4 md:p-8 z-50">
        <div className="flex w-full justify-center items-center">
          <h2 className="text-5xl flex-col my-4 mt-20 md:m-1 font-playmegames absolute">
            {subdomain.toUpperCase()}
          </h2>
          <div className="border hidden sm:block border-white rounded-xl p-4 ml-auto">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
        <div className="border block sm:hidden mt-16 border-white rounded-xl p-4 ml-0">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
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
                  className=" bg-blue-500 text-white px-2 py-2 rounded"
                  onClick={() => setShowImageModal(true)}
                >
                  View Image
                </button>
              )}
            </div>

            {showImageModal && (
              <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
                <div className="bg-black p-4 rounded shadow-lg relative ">
                  <button
                    className="absolute top-2 right-2 text-lg"
                    onClick={() => setShowImageModal(false)}
                  >
                    &times;
                  </button>
                  <img
                    src={quizData.questions[currentQuestionIndex].image_url}
                    alt="Question Image"
                    className="max-w-full max-h-[50vh] rounded-3xl"
                  />
                </div>
              </div>
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
