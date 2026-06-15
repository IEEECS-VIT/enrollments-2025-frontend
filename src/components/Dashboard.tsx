import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Treecloud from "./Treecloud";
import { LoadDashboard, LoadProfile } from "../api/user";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { showToastWarning } from "../Toast";

interface Quiz {
  domain: string;
  subDomain?: string;
}

interface QuizData {
  pending: Quiz[];
  completed: Quiz[];
}

interface ProfileData {
  domain: { [key: string]: string[] };
}

const SUBDOMAIN_DURATIONS: Record<string, number> = {
  CC: 15,
  WEB: 20,
  APP: 20,
  "AI/ML": 15,
  EVENTS: 10,
  PNM: 25,
  "UI/UX": 10,
  "VIDEO EDITING": 10,
};

const DEFAULT_DURATION = 20;
const SECRET_KEY = "your-secret-key";

export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isRound1Open = true;
  const [showModal, setShowModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [deviceWarningModal, setDeviceWarningModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizData, setQuizData] = useState<QuizData>({
    pending: [],
    completed: [],
  });
  const [hasAppDomainSelected, setHasAppDomainSelected] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await LoadDashboard(1);
        setQuizData(response);
      } catch {
        showToastWarning("Unable to load quiz dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profile = (await LoadProfile()) as ProfileData;
        const technicalDomains = Object.entries(profile.domain || {})
          .filter(([key]) => key.toLowerCase() === "technical")
          .flatMap(([, domains]) =>
            domains.map((domain) => domain.trim().toUpperCase())
          );

        setHasAppDomainSelected(technicalDomains.includes("APP"));
      } catch {
        try {
          const storedValue = localStorage.getItem("technical");
          const technicalDomains = storedValue
            ? (JSON.parse(storedValue) as string[]).map((domain) =>
                domain.trim().toUpperCase()
              )
            : [];
          setHasAppDomainSelected(technicalDomains.includes("APP"));
        } catch {
          setHasAppDomainSelected(false);
        }
      }
    };

    fetchProfileData();
  }, []);

  const getQuizTarget = (quiz: Quiz) => (quiz.subDomain?.trim() || quiz.domain.trim());

  const handleStartQuiz = (quiz: Quiz) => {
    const target = getQuizTarget(quiz);

    if (target === "APP") {
      if (!hasAppDomainSelected) {
        showToastWarning("APP task is only available after selecting APP in Technical.");
        return;
      }
      navigate("/task", { state: { subDomain: "APP" } });
      return;
    }

    const isMobileDevice =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.innerWidth < 1024;

    if (isMobileDevice) {
      setDeviceWarningModal(true);
      return;
    }

    setSelectedQuiz(quiz);
    setPermissionModal(true);
  };

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (stream) {
        setPermissionModal(false);
        setShowModal(true);
      }
    } catch {
      showToastWarning("Camera and microphone access is required.");
    }
  };

  const confirmStartQuiz = () => {
    if (!selectedQuiz) {
      setShowModal(false);
      return;
    }

    const subdomain = getQuizTarget(selectedQuiz);

    if (subdomain === "APP") {
      setPermissionModal(false);
      setShowModal(false);
      navigate("/task", { state: { subDomain: "APP" } });
      return;
    }

    Cookies.set("subdomain", subdomain, {
      secure: true,
      sameSite: "Strict",
    });
    localStorage.setItem("active_quiz_subdomain", subdomain);

    const dbRequest = indexedDB.open("secureDB", 1);

    dbRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("cookies")) {
        db.createObjectStore("cookies", { keyPath: "key" });
      }
    };

    dbRequest.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("cookies", "readwrite");
      const store = transaction.objectStore("cookies");

      const duration = SUBDOMAIN_DURATIONS[subdomain] || DEFAULT_DURATION;
      const getRequest = store.get(`${subdomain}Expiry`);

      getRequest.onsuccess = () => {
        let expiryTime = getRequest.result?.value;
        if (!expiryTime) {
          const rawExpiry = String(new Date().getTime() + duration * 60 * 1000);
          const signature = CryptoJS.HmacSHA256(
            rawExpiry,
            SECRET_KEY
          ).toString(CryptoJS.enc.Hex);
          expiryTime = `${rawExpiry}.${signature}`;
          store.put({
            key: `${subdomain}Expiry`,
            value: expiryTime,
          });
        }

        const quizState = {
          quiz: {
            ...selectedQuiz,
            subDomain: subdomain,
          },
        };

        const goToQuiz = () => navigate("/quiz", { state: quizState });

        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().then(goToQuiz).catch(goToQuiz);
        } else {
          goToQuiz();
        }
      };
    };

    setShowModal(false);
  };

  const appTaskCard: Quiz = { domain: "APP", subDomain: "APP" };
  const appPendingItems = quizData.pending.filter(
    (quiz) => getQuizTarget(quiz) === "APP"
  );
  const pendingTaskItems = hasAppDomainSelected
    ? appPendingItems.length > 0
      ? appPendingItems
      : [appTaskCard]
    : [];
  const pendingQuizItems = quizData.pending.filter(
    (quiz) => getQuizTarget(quiz) !== "APP"
  );

  return (
    <>
      <ToastContainer />
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="absolute w-full pointer-events-none">
          <Treecloud />
        </div>

        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <Loader />
          </div>
        )}

        <div className="border-2 mt-[4vh] rounded-3xl w-[88%] sm:w-[82%] md:w-[76%] lg:w-[64%] h-[74vh] backdrop-blur-[4.5px] text-white flex flex-col items-center p-3 sm:p-4 overflow-hidden">
          <div className="flex flex-col items-center w-full h-full gap-6 sm:gap-8 py-2 sm:py-3 overflow-y-auto pr-1 sm:pr-2">
            <div className="text-center">
              <p className="mt-4 text-sm tracking-wide text-yellow-400 sm:text-xl">
                Attempt your pending tasks and quizzes below.
              </p>
            </div>

            <div className="flex flex-col items-center w-full">
              <h3 className="mb-3 text-base text-center sm:text-2xl">LIVE TASK</h3>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {pendingTaskItems.length > 0 ? (
                  pendingTaskItems.map((quiz, index) => (
                    <button
                      key={`${quiz.domain}-${quiz.subDomain || index}`}
                      className="flex flex-col items-center justify-center min-w-[150px] px-4 py-3 text-white transition duration-300 border-2 rounded-3xl border-white hover:border-orange-500"
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      <h4 className="text-base sm:text-lg">{quiz.domain}</h4>
                      {quiz.subDomain && (
                        <p className="text-xs text-gray-400 sm:text-base">
                          {quiz.subDomain}
                        </p>
                      )}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 sm:text-2xl">No pending tasks</p>
                )}
              </div>
            </div>

            {/*
            <div className="flex flex-col items-center w-full">
              <h3 className="mb-3 text-base text-center sm:text-2xl">PENDING QUIZZES</h3>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {pendingQuizItems.length > 0 ? (
                  pendingQuizItems.map((quiz, index) => (
                    <button
                      key={`${quiz.domain}-${quiz.subDomain || index}`}
                      disabled={!isRound1Open}
                      className={`flex flex-col items-center justify-center min-w-[150px] px-4 py-3 text-white transition duration-300 border-2 rounded-3xl ${
                        isRound1Open
                          ? "border-white hover:border-orange-500"
                          : "border-white/30 opacity-60 cursor-not-allowed"
                      }`}
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      <h4 className="text-base sm:text-lg">{quiz.domain}</h4>
                      {quiz.subDomain && (
                        <p className="text-xs text-gray-400 sm:text-base">
                          {quiz.subDomain}
                        </p>
                      )}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 sm:text-2xl">No pending quizzes</p>
                )}
              </div>
            </div>
            */}

            <div className="flex flex-col items-center w-full">
              <h3 className="mb-3 text-base text-center sm:text-2xl">ATTEMPTED QUIZZES</h3>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {quizData.completed.length > 0 ? (
                  quizData.completed.map((quiz, index) => (
                    <div
                      key={`${quiz.domain}-${quiz.subDomain || index}`}
                      className="flex flex-col items-center justify-center min-w-[150px] px-4 py-3 text-white border-2 rounded-3xl"
                    >
                      <h4 className="text-base sm:text-lg">{quiz.domain}</h4>
                      {quiz.subDomain && (
                        <p className="text-xs text-gray-400 sm:text-base">
                          {quiz.subDomain}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm sm:text-lg">No completed quizzes</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {deviceWarningModal && (
          <div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 backdrop-blur-sm font-retro-gaming">
            <div className="p-6 text-center bg-black border-2 border-red-500 shadow-lg rounded-xl w-80">
              <p className="text-lg font-semibold tracking-wider text-red-500">
                Quiz can only be taken on a laptop or desktop.
              </p>
              <p className="mt-2">Please switch to a laptop to continue.</p>
              <button
                className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg"
                onClick={() => setDeviceWarningModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {permissionModal && (
          <div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 backdrop-blur-sm font-retro-gaming">
            <div className="p-6 text-center bg-black border-2 border-white shadow-lg rounded-xl">
              <p className="text-lg font-semibold tracking-wider">
                This quiz requires camera and microphone access.
              </p>
              <p className="mt-2">Please grant permissions to continue.</p>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 mx-2 text-white bg-green-500 rounded-lg"
                  onClick={requestPermissions}
                >
                  OK
                </button>
                <button
                  className="px-4 py-2 mx-2 text-white bg-red-500 rounded-lg"
                  onClick={() => setPermissionModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 backdrop-blur-sm font-retro-gaming">
            <div className="p-6 text-center bg-black border-2 border-white shadow-lg rounded-xl">
              <p className="text-lg font-semibold">
                Are you sure you want to start the quiz?
              </p>
              <p className="mt-2">
                You will have{" "}
                <span className="font-bold text-[#F8B95A]">
                  {selectedQuiz
                    ? SUBDOMAIN_DURATIONS[getQuizTarget(selectedQuiz)] || DEFAULT_DURATION
                    : DEFAULT_DURATION}{" "}
                  minutes
                </span>{" "}
                to finish it.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 mx-2 text-white bg-green-500 rounded-lg"
                  onClick={confirmStartQuiz}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-2 mx-2 text-white bg-red-500 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
