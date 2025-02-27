import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import QuestionNumber from "./QuestionNumber.tsx";
import { LoadQuestions } from "../api/user.ts";
import Loader from "./Loader";
import ConfirmationModal from "./Modal.tsx";
import { disableDevTools, disableRightClick } from "../utils/SecurityUtils.tsx";
import {
  fetchExpiryTime,
  getQuizData,
  storeQuizData,
  deleteExpiryFromSecureDB,
} from "../utils/indexedDb.ts";
import {
  saveAnswersToLocalStorage,
  loadAnswersFromLocalStorage,
} from "../utils/localStorage.ts";
import {
  handleBackButtonWarning,
  addBeforeUnloadListener,
} from "../utils/navigation.ts";
import {
  addFullscreenListener,
  handleReEnterFullscreen,
} from "../utils/fullscreen.ts";
import handleSubmit from "../utils/quizUtils.ts";
import ImageModal from "./ImageModal.tsx";
import { showToastWarning } from "../Toast.ts";
// import findCorrectAnswerIndex from "../utils/calculateScore.ts";

interface QuizData {
  questions: {
    image_url: any;
    question: string;
    options?: string[];
    correctIndex: number | string;
  }[];
}

export default function Questions() {
  const location = useLocation();
  const navigate = useNavigate();
  const subdomain = location.state?.quiz?.subDomain || Cookies.get("subdomain");
  var domain = subdomain?.toUpperCase();
  const [showLeaveModal] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [hasUnsavedChanges] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [quizData, setQuizData] = useState<QuizData>({ questions: [] });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | number;
  }>({});
  const [notSubmitted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showFullScreenModal, setShowFullScreenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [isLeaving] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date | null>(null);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [showTabSwitchModal, setShowTabSwitchModal] = useState(false);

  // const [count, setCount] = useState(0);

  const [confirmed] = useState(false);

  const round = 1;

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);

      // Try to fetch from IndexedDB first
      const cachedQuizData = await getQuizData(subdomain, navigate);
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
        const data = await LoadQuestions({ subdomain });
        if (data.error) {
          setLoading(false);
          // setTimeout(
          //   () => showToastWarning(data.error || "Unable to fetch data"),
          //   2000
          // );
          showToastWarning(data.error || "Unable to fetch data");
          await deleteExpiryFromSecureDB(subdomain);
          Cookies.remove("subdomain");
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          navigate("/dashboard");
        } else {
          setQuizData(data);
          await storeQuizData(subdomain, data);
          const savedAnswers = loadAnswersFromLocalStorage(subdomain);
          if (savedAnswers) {
            setSelectedAnswers(savedAnswers);
          }
          setLoading(false);
        }
      } catch (error: string | any) {
        console.error(error);
        setLoading(false);
        showToastWarning(error);
        await deleteExpiryFromSecureDB(subdomain);
        Cookies.remove("subdomain");
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        navigate("/dashboard");
      }
    };

    fetchQuizData();

    const savedAnswers = Cookies.get(subdomain);
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }

    const cleanupBackButtonWarning = handleBackButtonWarning(
      setShowBackWarning,
      setShowFullScreenModal
    );
    return cleanupBackButtonWarning;
  }, [subdomain]);

  useEffect(() => {
    const handlePermissionChange = async () => {
      try {
        const cameraPermission = await navigator.permissions.query({
          name: "camera" as PermissionName,
        });
        const microphonePermission = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });

        const reloadOnChange = () => window.location.reload();

        cameraPermission.onchange = reloadOnChange;
        microphonePermission.onchange = reloadOnChange;
        if (
          cameraPermission.state === "denied" ||
          microphonePermission.state === "denied"
        ) {
          setShowPermissionModal(true);
        }
      } catch (error) {
        console.error("Permission API not supported or error occurred:", error);
      }
    };

    handlePermissionChange();
  }, []);

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

  useEffect(() => {
    const savedTabSwitchCount = localStorage.getItem("tabSwitchCount");
    if (savedTabSwitchCount) {
      setTabSwitchCount(parseInt(savedTabSwitchCount, 10));
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prevCount) => {
          const newCount = prevCount + 1;
          localStorage.setItem("tabSwitchCount", newCount.toString());
          if (newCount >= 4) {
            handleSubmit(
              subdomain,
              domain,
              round,
              navigate,
              true,
              setLoadingSubmit
            );
          }
          return newCount;
        });
        setShowTabSwitchModal(true);
      }
    };

    const handleBlur = () => {
      setTabSwitchCount((prevCount) => {
        const newCount = prevCount + 1;
        localStorage.setItem("tabSwitchCount", newCount.toString());
        return newCount;
      });
      setShowTabSwitchModal(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

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
        // Call the imported handleSubmit function
        handleSubmit(
          subdomain,
          domain,
          round,
          navigate,
          true,
          setLoadingSubmit
        );
      } else {
        setTimeLeft({
          minutes: Math.floor(timeDiff / 60),
          seconds: timeDiff % 60,
        });
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [expiryTimestamp, isTimerExpired]);

  useEffect(() => {
    if (isTimerExpired) {
      console.log("Timer expired, force-submitting quiz.");
      handleSubmit(subdomain, domain, round, navigate, true, setLoadingSubmit);
    }
  }, [isTimerExpired]);

  const formattedTime = `${String(timeLeft.minutes).padStart(2, "0")}:${String(
    timeLeft.seconds
  ).padStart(2, "0")}`;
  if (!quizData) {
    navigate("/dashboard");
  }
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
      <div className="fixed inset-0 flex flex-col items-center justify-center p-8 text-center text-white bg-black z-80 bg-opacity-40">
        <h2 className="mb-4 text-3xl font-bold">
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

  // const calculateScore = (
  //   quizData: QuizData,
  //   selectedAnswers: { [key: number]: string | number }
  // ) => {
  //   let totalScore = 0;

  //   quizData.questions.forEach((question, index) => {
  //     if (selectedAnswers[index] === undefined) return;

  //     if (question.options) {
  //       // If options exist, compare selected answer with correct index
  //       const ans = question.options[findCorrectAnswerIndex(question)];
  //       console.log("Correct Ans: " + ans);
  //       const selectedAnswer = selectedAnswers[index];
  //       console.log("Your Ans: " + selectedAnswer);

  //       if (selectedAnswer == ans) {
  //         totalScore++;
  //       }
  //     }
  //   });

  //   return totalScore;
  // };

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
    return <div className="text-lg text-center">Loading quiz...</div>;
  }

  return (
    <>
      <div className="border-2 border-white mt-[10vh] rounded-3xl w-[80%] backdrop-blur-[4.5px] lg:w-[70%] sm:h-[65vh] h-[75vh] flex flex-col items-center p-4 md:p-8 z-50">
        <div className="flex items-center justify-center w-full">
          <h2 className="absolute flex-col my-4 mt-20 text-5xl md:m-1 font-playmegames">
            {subdomain?.toUpperCase()}
          </h2>
          <div className="hidden p-4 ml-auto border border-white sm:block rounded-xl">
            {formattedTime}
          </div>
          <div className="absolute mt-4 group sm:mt-0 left-4">
            <span className="pb-2 text-2xl cursor-pointer ml-4 border-[0.15rem]  bg-[#FFFFFF] text-black rounded-full w-8 h-8 flex items-center justify-center">
              ℹ
            </span>
            <div className="absolute left-12 tracking-wider bg-opacity-50 transform -translate-x-80 -translate-y-32 lg:-translate-x-1/2 border-[0.15rem] border-[#F8B95A] mt-2 w-max bg-[#F8B95A] text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-retro-gaming">
              Timer will continue if you leave the site .
            </div>
          </div>
        </div>
        <div className="block p-4 mt-16 ml-0 border border-white sm:hidden rounded-xl">
          {formattedTime}
        </div>
        <div className="relative flex flex-col justify-start sm:mt-4 items-center h-full w-[80vw] max-w-full font-retro-gaming">
          <div
            id="questionBox"
            className="flex flex-col justify-center h-full w-100 sm:w-full rounded-xl"
          >
            <div
              id="question"
              className="flex justify-between p-4 overflow-auto text-xs leading-6 border border-white md:text-lg rounded-xl max-h-40 min-h-32 "
            >
              {quizData.questions.length > 0 &&
                quizData.questions[currentQuestionIndex].question}

              {quizData.questions.length &&
                quizData.questions[currentQuestionIndex].image_url && (
                  <button
                    className=" bg-[#F8770f] bg-opacity-500 border-[#f8b95a] border-2 text-white px-2 py-2 rounded max-h-14 max-w-14"
                    onClick={() => setShowImageModal(true)}
                  >
                    <img src="imgIcon.png" alt="img" className="" />
                  </button>
                )}
              {showImageModal && (
                <ImageModal
                  imageUrl={quizData.questions[currentQuestionIndex].image_url}
                  onClose={() => setShowImageModal(false)}
                />
              )}
            </div>

            {/* If options exist, show multiple-choice buttons */}
            {quizData.questions.length > 0 &&
            quizData.questions[currentQuestionIndex].options ? (
              <div className="grid items-center justify-center gap-4 mt-8 overflow-y-auto text-xs text-center md:text-lg sm:grid-cols-1 md:grid-cols-2 sm:mt-4 max-h-80">
                {quizData.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div
                      key={index}
                      className={`p-2 overflow-auto min-h-24 max-h-24 text-center border text-lg rounded-xl flex-1 relative cursor-pointer flex justify-center  
                        ${
                          selectedAnswers[currentQuestionIndex] === option
                            ? "bg-[#f8770f] text-white"
                            : "hover:bg-gray-900"
                        }
                        items-start ${
                          option.length < 80 ? "items-center" : "pt-2"
                        } 
                      `}
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
                  className="w-full p-2 mt-8 overflow-auto font-mono text-white bg-transparent border rounded-lg resize-none h-60 sm:mt-1 sm:h-56"
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
        </div>

        {showPermissionModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm font-retro-gaming">
            <div className="p-6 text-center bg-black border-2 border-white shadow-lg rounded-xl">
              <p className="text-lg font-semibold font-retro-gaming">
                Access to your microphone and camera is required to continue.
                <br />
                Please enable permissions in settings.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 mx-2 text-white bg-green-500 rounded-lg"
                  onClick={async () => {
                    try {
                      await navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: true,
                      });
                      alert("Permissions granted!");
                    } catch (error) {
                      alert(
                        "Permission denied! Please allow access in settings."
                      );
                    }
                  }}
                >
                  Grant Permissions
                </button>
              </div>
            </div>
          </div>
        )}

        {showTabSwitchModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm font-retro-gaming">
            <div className="p-6 text-center bg-black border-2 border-white shadow-lg rounded-xl">
              <p className="font-normal tracking-widest text-md font-retro-gaming">
                You have switched tabs {tabSwitchCount}{" "}
                {tabSwitchCount === 1 ? "time" : "times"}!
                <br />
                Quiz will AutoSubmit after 3 tab switches .
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 mx-2 text-white bg-green-500 rounded-lg"
                  onClick={() => setShowTabSwitchModal(false)}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        )}

        {showFullScreenModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm font-retro-gaming">
            <div className="p-6 text-center bg-black border-2 border-white shadow-lg rounded-xl">
              <p className="font-semibold tracking-wide text-md font-retro-gaming">
                Screen Sharing is Mandatory
                <br />
                Please allow screen sharing to continue the quiz.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 mx-2 text-white bg-green-500 rounded-lg"
                  // onClick={() => window.location.reload()}
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <ConfirmationModal
            message={`Are you sure you want to submit?${"  "}
        You have attempted ${
          Object.values(selectedAnswers).filter((v) => v !== "").length
        }/${quizData.questions.length} questions.`}
            onConfirm={() => {
              setShowModal(false);
              // Call the imported handleSubmit function
              handleSubmit(
                subdomain,
                domain,
                round,
                navigate,
                false,
                setLoadingSubmit
              );
            }}
            onCancel={() => setShowModal(false)}
          />
        )}

        {showBackWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-100 border-4 rounded-2xl  backdrop-blur-[25px] flex items-center justify-center font-retro-gaming">
            <div className="p-6 text-center bg-black border-2 border-white shadow-lg rounded-xl">
              <p className="text-lg font-semibold font-retro-gaming">
                Are you sure you want to leave? <br /> Your progress will be
                restored, and the timer will keep running!
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 mx-2 text-white bg-red-500 rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();

                    setShowBackWarning(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 mx-2 text-white bg-green-500 rounded-lg"
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
      <div className="font-retro-gaming">
        <QuestionNumber
          totalQuestions={quizData.questions.length}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionChange={setCurrentQuestionIndex}
        />
      </div>
      {currentQuestionIndex === quizData.questions.length - 1 && (
        <button
          className="absolute text-lg text-white md:bottom-4 bottom-4 font-retro-gaming md:text-xl"
          onClick={() => setShowModal(true)}
        >
          &lt; SUBMIT &gt;
        </button>
      )}
    </>
  );
}
