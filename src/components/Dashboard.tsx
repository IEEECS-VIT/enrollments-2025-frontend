import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Treecloud from "./Treecloud";
import { LoadDashboard } from "../api/user";
import Loader from "./Loader";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { ToastContainer } from "react-toastify";

interface Quiz {
  domain: string;
  subDomain?: string;
}

interface QuizData {
  pending: Quiz[];
  completed: Quiz[];
}

// Map of subdomains to their durations in minutes
const SUBDOMAIN_DURATIONS: Record<string, number> = {
  CC: 15,
  WEB: 20,
  EVENTS: 10,
  "UI/UX": 10,
  "GRAPHIC DESIGN": 10,
  "VIDEO EDITING": 10,
  "AI/ML": 15,
  APP: 20,
  IOT: 10,
  PNM: 25,
  RND: 15,
};

// Default duration if subdomain isn't found in the map
const DEFAULT_DURATION = 20;

export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [deviceWarningModal, setDeviceWarningModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizData, setQuizData] = useState<QuizData>({
    pending: [],
    completed: [],
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await LoadDashboard(1);
        setQuizData(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleStartQuiz = (quiz: Quiz) => {
    const isMobileDevice =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.innerWidth < 1024;

    if (isMobileDevice) {
      setDeviceWarningModal(true);
      return; // Prevent quiz start on mobile
    } else {
      setSelectedQuiz(quiz);
      setPermissionModal(true);
    } // Show permission request modal first
  };

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (stream) {
        setPermissionModal(false); // Hide modal if permissions are granted
        setShowModal(true);
      }
    } catch (error) {
      alert("Camera and microphone access is required to continue.");
    }
  };

  const secretKey = "your-secret-key";

  const confirmStartQuiz = () => {
    if (selectedQuiz) {
      const subdomain = selectedQuiz.subDomain?.trim();
      if (subdomain) {
        Cookies.set("subdomain", subdomain, {
          secure: true,
          sameSite: "Strict",
        });
      }

      const dbRequest = indexedDB.open("secureDB", 1);

      dbRequest.onupgradeneeded = function (event) {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("cookies")) {
          db.createObjectStore("cookies", { keyPath: "key" });
        }
      };

      dbRequest.onsuccess = function (event) {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("cookies", "readwrite");
        const store = transaction.objectStore("cookies");

        // Get duration based on subdomain
        let duration = DEFAULT_DURATION; // Default 30 minutes
        if (subdomain && SUBDOMAIN_DURATIONS[subdomain]) {
          duration = SUBDOMAIN_DURATIONS[subdomain];
        }

        // Check if expiry time already exists for the quiz domain
        const getRequest = store.get(`${selectedQuiz.subDomain}Expiry`);

        getRequest.onsuccess = function () {
          let expiryTime = getRequest.result?.value;
          if (!expiryTime) {
            // Set expiry time based on the subdomain-specific duration
            expiryTime = String(new Date().getTime() + duration * 60 * 1000);
            const signature = CryptoJS.HmacSHA256(
              expiryTime,
              secretKey
            ).toString(CryptoJS.enc.Hex);
            const cookieValue = `${expiryTime}.${signature}`;
            store.put({
              key: `${selectedQuiz.subDomain}Expiry`,
              value: cookieValue,
            });
          }

          if (document.documentElement.requestFullscreen) {
            document.documentElement
              .requestFullscreen()
              .then(() => {
                navigate("/quiz", { state: { quiz: selectedQuiz } });
              })
              .catch(() => {
                navigate("/quiz", { state: { quiz: selectedQuiz } }); // Navigate even if fullscreen fails
              });
          } else {
            navigate("/quiz", { state: { quiz: selectedQuiz } }); // Fallback if fullscreen isn't supported
          }
        };
      };
    }
    setShowModal(false);
  };

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

        <div className="border-2 mt-[5vh] rounded-3xl w-[80%] backdrop-blur-[4.5px] text-white sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[62vh] h-[80vh] flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <div className="mb:4 sm:mb-8">
              <h2 className="text-xl text-center sm:text-4xl">
                PENDING QUIZZES
              </h2>
              <span className="font-sans text-lg text-yellow-400">
                *Round-1 is live. Join{" "}
                <a
                  href="https://discord.gg/j2Pt6A4YNK"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline"
                >
                  Discord
                </a>{" "}
                for updates.
              </span>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              {quizData.pending.length > 0 ? (
                quizData.pending.map((quiz, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center h-16 px-8 py-4 text-white transition duration-300 border-2 cursor-pointer rounded-3xl md:h-24 hover:border-orange-500"
                    onClick={() => !deviceWarningModal && handleStartQuiz(quiz)}
                  >
                    <h3 className="text-lg sm:text-xl">{quiz.domain}</h3>
                    {quiz.subDomain && (
                      <p className="text-gray-400 text-md sm:text-xl">
                        {quiz.subDomain}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 sm:text-2xl">No pending tasks</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="mt-8 mb-4 text-xl sm:text-4xl md:mt-12">
              COMPLETED QUIZZES
            </h2>
            <div className="flex flex-col gap-4 md:flex-row">
              {quizData.completed.length > 0 ? (
                quizData.completed.map((quiz, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center px-8 py-4 text-white transition duration-300 border-2 rounded-3xl hover:border-white"
                  >
                    <h3 className="text-lg sm:text-xl">{quiz.domain}</h3>
                    {quiz.subDomain && (
                      <p className="text-gray-400 text-md sm:text-xl">
                        {quiz.subDomain}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 sm:text-2xl">No completed tasks</p>
              )}
            </div>
          </div>
        </div>

        {deviceWarningModal && (
          <div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 backdrop-blur-sm font-retro-gaming">
            <div className="p-6 text-center bg-black border-2 border-red-500 shadow-lg rounded-xl w-80">
              <p className="text-lg font-semibold tracking-wider text-red-500">
                ⚠️ Quiz can only be taken on a laptop or desktop.
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

        {/* Camera & Microphone Permission Modal */}
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

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 backdrop-blur-sm font-retro-gaming">
            <div className="p-6 text-center bg-black border-2 border-white shadow-lg rounded-xl">
              <p className="text-lg font-semibold">
                Are you sure you want to start the quiz?
              </p>
              <p className="mt-2">
                {selectedQuiz?.subDomain &&
                SUBDOMAIN_DURATIONS[selectedQuiz.subDomain.trim()]
                  ? `You will have ${
                      SUBDOMAIN_DURATIONS[selectedQuiz.subDomain.trim()]
                    } minutes to finish it.`
                  : "You will have 30 minutes to finish it."}
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
