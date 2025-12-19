import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import QuestionNumber from "./QuestionNumber.tsx";
import { LoadQuestions } from "../api/user.ts";
import Loader from "./Loader";
import ConfirmationModal from "./Modal.tsx";
import {
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
import { ToastContainer } from "react-toastify";
import { disableDevTools, disableRightClick } from "../utils/SecurityUtils";

interface QuizData {
  questions: {
    id: string;
    image_url: any;
    question: string;
    options?: string[];
    correctIndex: number | string;
  }[];
}

export default function Questions() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    disableDevTools();
    disableRightClick();
  }, []);
  
  // Get Subdomain & Define Storage Key
  const subdomainRaw = location.state?.quiz?.subDomain || Cookies.get("subdomain");
  var domainName = subdomainRaw?.toUpperCase() || "";
  
  const STORAGE_KEY = subdomainRaw ? `currentIndex_${subdomainRaw.toLowerCase()}` : null;

  const [showLeaveModal] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [hasUnsavedChanges] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [quizData, setQuizData] = useState<QuizData>({ questions: [] });

  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    if (!STORAGE_KEY) return 0;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Return the saved number, or 0 if nothing is saved
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

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
  const [showTabSwitchModal, setShowTabSwitchModal] = useState(false);
  const [questionTimeLeft, setQuestionTimeLeft] = useState<number | null>(null);
  const [confirmed] = useState(false);

  const round = 1;

  useEffect(() => {
    if (STORAGE_KEY) {
      localStorage.setItem(STORAGE_KEY, currentQuestionIndex.toString());
    }
  }, [currentQuestionIndex, STORAGE_KEY]);

  useEffect(() => {
    const fetchQuizData = async () => {
  setLoading(true);

  const cachedQuizData = await getQuizData(subdomainRaw, navigate);

  if (cachedQuizData) {
    setQuizData(cachedQuizData);
    const savedAnswers = loadAnswersFromLocalStorage(subdomainRaw);
    if (savedAnswers) {
      setSelectedAnswers(savedAnswers);
    }

    setLoading(false);
    return;
  }

  try {
    const apiSubdomain = subdomainRaw?.toUpperCase().includes("VIDEO")
      ? "VIDEO"
      : subdomainRaw;

    const data = await LoadQuestions({ subdomain: apiSubdomain });

    if (data.error) {
      setLoading(false);
      showToastWarning(data.error || "Unable to fetch data");
      await deleteExpiryFromSecureDB(subdomainRaw);
      Cookies.remove("subdomain");
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      navigate("/dashboard");
    } else {
      setQuizData(data);
      await storeQuizData(subdomainRaw, data);
      const savedAnswers = loadAnswersFromLocalStorage(subdomainRaw);
      if (savedAnswers) {
        setSelectedAnswers(savedAnswers);
      }
      setLoading(false);
    }
  } catch (error: string | any) {
    setLoading(false);
    showToastWarning(error);
    await deleteExpiryFromSecureDB(subdomainRaw);
    Cookies.remove("subdomain");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate("/dashboard");
  }
};

    fetchQuizData();

    const savedAnswers = Cookies.get(subdomainRaw);
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }

    const cleanupBackButtonWarning = handleBackButtonWarning(
      setShowBackWarning,
      setShowFullScreenModal
    );
    return cleanupBackButtonWarning;
  }, [subdomainRaw]);

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
      } catch (error) {}
    };

    handlePermissionChange();
  }, []);

  const getQuestionDuration = (currentQ: any) => {
    if (!currentQ) return 0;

    const isMCQ = currentQ.options && currentQ.options.length > 0;

    const techKeywords = ["WEB", "APP", "CC", "AIML", "TECH"];
    if (techKeywords.some((keyword) => domainName.includes(keyword))) {
      return 60;
    }

    const designKeywords = ["VIDEO", "EDITING", "UI/UX", "DESIGN"];
    if (designKeywords.some((keyword) => domainName.includes(keyword))) {
      return isMCQ ? 60 : 150;
    }

    const mgmtKeywords = ["MANAGEMENT", "PNM"];
    if (mgmtKeywords.some((keyword) => domainName.includes(keyword))) {
      return isMCQ ? 60 : 240;
    }

    if (domainName.includes("EVENTS")) {
      return isMCQ ? 60 : 120;
    }

    return 60;
  };

  // Timer Logic
  useEffect(() => {
    if (quizData.questions.length > 0) {
        
      // Safety Check: If stored index is out of bounds 
      if (currentQuestionIndex >= quizData.questions.length) {
         setCurrentQuestionIndex(Math.max(0, quizData.questions.length - 1));
         return;
      }

      const duration = getQuestionDuration(
        quizData.questions[currentQuestionIndex]
      );
      setQuestionTimeLeft(duration);
    }
  }, [currentQuestionIndex, quizData, domainName]);

  useEffect(() => {
    if (questionTimeLeft === null) return;

    if (questionTimeLeft <= 0) {
      if (quizData.questions.length > 0) {
        handleTimeUp();
      }
      return;
    }

    const timer = setInterval(() => {
      setQuestionTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [questionTimeLeft, quizData]);

  const handleTimeUp = () => {
    if (currentQuestionIndex === quizData.questions.length - 1) {
      // Clear storage on submit
      if(STORAGE_KEY) localStorage.removeItem(STORAGE_KEY);
      handleSubmit(
        subdomainRaw,
        domainName,
        round,
        navigate,
        true,
        setLoadingSubmit
      );
    } else {
      moveToNextQuestion();
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const formattedTime =
    questionTimeLeft !== null
      ? `${String(Math.floor(questionTimeLeft / 60)).padStart(2, "0")}:${String(
          questionTimeLeft % 60
        ).padStart(2, "0")}`
      : "00:00";

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

    let hasSwitched = false;

    const incrementTabSwitchCount = () => {
      setTabSwitchCount((prevCount) => {
        const newCount = prevCount + 1;
        localStorage.setItem("tabSwitchCount", newCount.toString());

        if (newCount >= 4) {
          // Clear storage on auto-submit
          if(STORAGE_KEY) localStorage.removeItem(STORAGE_KEY);
          handleSubmit(
            subdomainRaw,
            domainName,
            round,
            navigate,
            true,
            setLoadingSubmit
          );
        }
        return newCount;
      });

      setShowTabSwitchModal(true);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!hasSwitched) {
          hasSwitched = true;
          incrementTabSwitchCount();
        }
      }
    };

    const handleFocus = () => {
      hasSwitched = false;
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

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

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const updatedAnswers = { ...selectedAnswers, [questionIndex]: answer };
    setSelectedAnswers(updatedAnswers);
    saveAnswersToLocalStorage(subdomainRaw, updatedAnswers);
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
      <ToastContainer />
      <div className="border-2 border-white mt-[10vh] rounded-3xl w-[80%] backdrop-blur-[4.5px] lg:w-[70%] sm:h-[65vh] h-[75vh] flex flex-col items-center p-4 md:p-8 z-50">
        <div className="flex items-center justify-center w-full">
          <h2 className="absolute flex-col my-4 mt-20 text-5xl md:m-1 font-playmegames">
            {subdomainRaw?.toUpperCase()}
          </h2>
          <div className="hidden p-4 ml-auto border border-white sm:block rounded-xl">
            {formattedTime}
          </div>
          <div className="absolute mt-4 group sm:mt-0 left-4">
            <span className="pb-2 text-2xl cursor-pointer ml-4 border-[0.15rem]  bg-[#FFFFFF] text-black rounded-full w-8 h-8 flex items-center justify-center">
              ℹ
            </span>
            <div className="absolute left-12 tracking-wider bg-opacity-50 transform -translate-x-80 -translate-y-32 lg:-translate-x-1/2 border-[0.15rem] border-[#F8B95A] mt-2 w-max bg-[#F8B95A] text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-retro-gaming">
              Strict forward navigation. You cannot go back to previous
              questions.
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
              {/* Added checks to prevent crash if data loads slowly while index is set */}
              {quizData.questions.length > 0 &&
                quizData.questions[currentQuestionIndex] &&
                quizData.questions[currentQuestionIndex].question}

              {quizData.questions.length &&
                quizData.questions[currentQuestionIndex] &&
                quizData.questions[currentQuestionIndex].image_url && (
                  <button
                    className=" bg-[#F8770f] bg-opacity-500 border-[#f8b95a] border-2 text-white px-2 py-2 rounded max-h-14 max-w-14"
                    onClick={() => setShowImageModal(true)}
                  >
                    <img src="imgIcon.png" alt="img" className="" />
                  </button>
                )}
              {showImageModal && quizData.questions[currentQuestionIndex] && (
                <ImageModal
                  imageUrl={quizData.questions[currentQuestionIndex].image_url}
                  onClose={() => setShowImageModal(false)}
                />
              )}
            </div>

            {quizData.questions.length > 0 &&
            quizData.questions[currentQuestionIndex] && 
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
                  onClick={() => window.location.reload()}
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
              if (
                Object.values(selectedAnswers).filter((v) => v !== "").length ===
                0
              ) {
                showToastWarning(
                  "Please select at least one answer before submitting"
                );
                setShowModal(false);
                return;
              }
              setShowModal(false);
              // Clear storage on manual submit
              if(STORAGE_KEY) localStorage.removeItem(STORAGE_KEY);
              handleSubmit(
                subdomainRaw,
                domainName,
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
        {/* Pass the correct props to the cleaned up QuestionNumber component */}
        <QuestionNumber
          totalQuestions={quizData.questions.length}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>

      <div className="absolute w-full bottom-4 flex justify-between px-8 md:px-16 pointer-events-auto z-50 font-retro-gaming text-white text-lg md:text-xl">
        <div></div>
        {currentQuestionIndex === quizData.questions.length - 1 ? (
          <button onClick={() => setShowModal(true)}>SUBMIT &gt;</button>
        ) : (
          <button onClick={() => moveToNextQuestion()}>NEXT &gt;</button>
        )}
      </div>
    </>
  );
}