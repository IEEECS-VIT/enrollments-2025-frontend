import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionNumber from "./QuestionNumber.tsx";
import { SubmitAnswers, LoadQuestions } from "../api/user.ts";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";
import { showToastSuccess, showToastWarning } from "../Toast.ts";
import CryptoJS from "crypto-js";
import { useTimer } from "react-timer-hook";
import { disableDevTools, disableRightClick } from "../utils/securityUtils.tsx";

import ConfirmationModal from "./Modal.tsx";
import { fetchExpiryTime } from "../utils/indexedDb.ts";
import {
  saveAnswersToLocalStorage,
  loadAnswersFromLocalStorage,
  clearAnswersFromLocalStorage,
} from "../utils/localStorage.ts";

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
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | number;
  }>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [notSubmitted, setNotSubmitted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [showFullScreenModal, setShowFullScreenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date | null>(null);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const round = 1;

  // Load questions and initialize answers
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await LoadQuestions({ subdomain });
        setQuizData(data);

        // Load saved answers from localStorage
        const savedAnswers = loadAnswersFromLocalStorage(subdomain);
        setSelectedAnswers(savedAnswers);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    fetchQuizData();

    const savedAnswers = Cookies.get(subdomain);
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }

    const handleBackButton = (e: PopStateEvent) => {
      
      e.preventDefault();
      
      
      setShowBackWarning(true);
      
      
      window.history.pushState(null, '', window.location.pathname);
    };

    
    window.history.pushState(null, '', window.location.pathname);
    
    
    window.addEventListener('popstate', handleBackButton);
    
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [subdomain]);

  useEffect(() => {
    fetchExpiryTime().then(setExpiryTimestamp);
  }, []);

  // Unified submit function for both manual and automatic submission
  const handleSubmit = async (isAutoSubmit = false) => {
    try {
      // Fetch fresh quiz data and latest answers
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
        setShowScore(true);
        showToastSuccess(
          isAutoSubmit
            ? "Time's up! Quiz submitted automatically"
            : "Quiz submitted successfully"
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      showToastWarning(
        isAutoSubmit
          ? "Automatic submission failed. Please try manual submission."
          : "Submission failed. Please try again."
      );
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
  }, [expiryTimestamp]);
  

  useEffect(() => {
    const checkFullscreen = () => {
      if (!document.fullscreenElement && notSubmitted && !showBackWarning) {
        if (!showLeaveModal) {
          setShowFullScreenModal(true);
        }
      }
    };

    checkFullscreen();

    if (notSubmitted) {
      checkFullscreen();
      document.addEventListener("fullscreenchange", checkFullscreen);
    }

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
    };
  }, [notSubmitted, showBackWarning, showLeaveModal]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!confirmed) {
        event.preventDefault();
        event.returnValue = '';
        setShowLeaveModal(true);
      }
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [confirmed]);
  
  


  useEffect(() => {
    
    setHasUnsavedChanges(Object.keys(selectedAnswers).length > 0);
  }, [selectedAnswers]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && notSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (hasUnsavedChanges && notSubmitted) {
        e.preventDefault();
        window.history.pushState(null, '', window.location.pathname);
        setShowLeaveModal(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    
    window.history.pushState(null, '', window.location.pathname);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasUnsavedChanges, notSubmitted]);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      
      event.preventDefault(); 
      alert("Are you sure you want to leave the quiz?");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
  
    disableDevTools();
    disableRightClick();
}, []);



  const handleReEnterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => setShowFullScreenModal(false));
    }
  };

  if (showFullScreenModal && notSubmitted && !isLeaving) {
    return (
      <div className="fixed inset-0 flex flex-col relative z-80  items-center justify-center bg-black bg-opacity-40 text-white text-center p-8">
        <h2 className="text-3xl font-bold mb-4">Enter Fullscreen to Continue</h2>
        <button
          className="bg-[#F8B95A] bg-opacity-50 border-4 border-[#F8B95A]  text-white px-6 py-3 rounded-md text-lg"
          onClick={handleReEnterFullscreen}
        >
          Enter Fullscreen
        </button>
      </div>
    );

  }

  // Answer handling
  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const updatedAnswers = { ...selectedAnswers, [questionIndex]: answer };
    setSelectedAnswers(updatedAnswers);
    saveAnswersToLocalStorage(subdomain, updatedAnswers);
  };

  const handleSubmit = async () => {
    if (!quizData) return;
    setLoadingSubmit(true);
    let score = 0;
    quizData.questions.forEach((question, index) => {
      if (!question.correctAnswer) {
        return;
      }

      if (
        (question.options &&
          Number(selectedAnswers[index]) + 1 === question.correctAnswer) ||
        (!question.options &&
          selectedAnswers[index]?.toString().trim().toLowerCase() ===
            question.correctAnswer.toString().trim().toLowerCase())
      ) {
        score++;
      }
    });

    setScore(score);
    setShowScore(true);
    setNotSubmitted(false);

  if (document.fullscreenElement) {
    await document.exitFullscreen();
  }

    const questions = quizData.questions.map((q) => q.question);
    const answers = quizData.questions.map((q, i) => {
      console.log(q);
      selectedAnswers[i] !== undefined ? selectedAnswers[i] : [];
    });

    try {
      console.log({
        round,
        domain: subdomain.toUpperCase(),
        questions,
        answers,
      });

      domain = subdomain.toUpperCase();

      const result = await SubmitAnswers(round, domain, questions, answers);
      setLoadingSubmit(false);
      setTimeout(() => {
        showToastSuccess("Quiz submitted successfully");
      }, 500);
      

      if (result.status !== 200) {
        setLoadingSubmit(false);
        setTimeout(() => {
          showToastWarning("Please try again");
        }, 500);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      setLoadingSubmit(false);
        setTimeout(() => {
          showToastWarning("Please try again");
        }, 500);
    }
  };

  const handlePreventCopyPaste = (
    e: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
  };

  const attemptedQuestions = Object.keys(selectedAnswers).length;
  const totalQuestions = quizData?.questions.length || 0;
  // Timer display formatting
  const formattedTime = `${String(timeLeft.minutes).padStart(2, "0")}:${String(
    timeLeft.seconds
  ).padStart(2, "0")}`;

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
           

            {showImageModal && (
              <>
                <div className="fixed inset-0 bg-black opacity-90 z-40 rounded-3xl"></div>

                <div className="fixed inset-0 flex justify-center items-center z-50">
                  <div className="bg-black p-6 rounded-3xl shadow-lg relative border-4 border-yellow-400">
                    <button
                      className="absolute top-2 right-1 text-3xl text-yellow-400 hover:text-white transition"
                      onClick={() => setShowImageModal(false)}
                    >
                      &times;
                    </button>
                    <img
                      src={quizData.questions[currentQuestionIndex].image_url}
                      alt="Question Image"
                      className="max-w-full max-h-[50vh] rounded-2xl"
                    />
                  </div>
                </div>
              </>
            )}

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
                  className="w-full h-60 mt-8 sm:mt-1 sm:h-72 p-2 border bg-transparent rounded-lg text-white font-mono resize-none overflow-auto"
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
        {showBackWarning && (
          <ConfirmationModal
            message="Are you sure you want to leave? Your progress will be lost, and the timer will keep running!"
            onConfirm={() => {
              window.removeEventListener("beforeunload", () => {});
              navigate("/dashboard");
            }}
            onCancel={() => setShowBackWarning(false)}
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
