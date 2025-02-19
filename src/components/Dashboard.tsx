import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Treecloud from "./Treecloud";
import { LoadDashboard } from "../api/user";
import Loader from "./Loader";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

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
        console.error("Error fetching quiz data:", error);
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
        console.log("Permissions granted");
        setPermissionModal(false); // Hide modal if permissions are granted
        setShowModal(true);
      }
    } catch (error) {
      console.error("Permission denied:", error);
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

      dbRequest.onerror = function () {
        console.error("❌ Failed to open IndexedDB.");
      };

      dbRequest.onsuccess = function (event) {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("cookies", "readwrite");
        const store = transaction.objectStore("cookies");

        // Check if expiry time already exists for the quiz domain
        const getRequest = store.get(`${selectedQuiz.subDomain}Expiry`);

        getRequest.onsuccess = function () {
          let expiryTime = getRequest.result?.value;
          if (!expiryTime) {
            expiryTime = String(new Date().getTime() + 30 * 60 * 1000);
            const signature = CryptoJS.HmacSHA256(
              expiryTime,
              secretKey
            ).toString(CryptoJS.enc.Hex);
            const cookieValue = `${expiryTime}.${signature}`;
            store.put({
              key: `${selectedQuiz.subDomain}Expiry`,
              value: cookieValue,
            });
            console.log("✅ New expiry time saved in IndexedDB.");
          } else {
            console.log("⏳ Using existing expiry time from IndexedDB.");
          }

          navigate("/quiz", { state: { quiz: selectedQuiz } });
        };
      };
    }
    setShowModal(false);
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute w-full pointer-events-none">
        <Treecloud />
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <div className="border-2 mt-[5vh] rounded-3xl w-[80%] backdrop-blur-[4.5px] text-white sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[62vh] h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="absolute group mt-4 sm:mt-0 mb-96 left-[65vw]">
          <span className="text-white text-lg cursor-pointer bg-opacity-50 border-[#F8B95A] border-[0.15rem] shadow-[2px_2px_0px_#FF0000] bg-[#F8B95A] rounded-full w-8 h-8 flex items-center justify-center">
            ℹ
          </span>
          <div className="absolute left-12 tracking-widest bg-opacity-50 transform -translate-x-80 -translate-y-32 lg:-translate-x-1/2 border-[0.15rem] border-[#F8B95A] mt-2 w-max bg-[#F8B95A] text-white text-md px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            You can attempt Quiz in Laptop Only .
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl mb-8  ">PENDING QUIZZES</h2>
          <div className="flex gap-4 md:flex-row flex-col">
            {quizData.pending.length > 0 ? (
              quizData.pending.map((quiz, index) => (
                <div
                  key={index}
                  className="border-2 rounded-3xl px-8 py-4 flex flex-col items-center justify-center text-white hover:border-orange-500 transition duration-300 cursor-pointer"
                  onClick={() => !deviceWarningModal && handleStartQuiz(quiz)}
                >
                  <h3 className="text-xl">{quiz.domain}</h3>
                  {quiz.subDomain && (
                    <p className="text-xl text-gray-400">{quiz.subDomain}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400 sm:text-2xl">No pending tasks</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl mt-8 md:mt-12 mb-4">
            COMPLETED QUIZZES
          </h2>
          <div className="flex gap-4 md:flex-row flex-col">
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
              <p className="text-gray-400 sm:text-2xl">No completed tasks</p>
            )}
          </div>
        </div>
      </div>

      {deviceWarningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming text-white">
          <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-red-500 w-80">
            <p className="text-lg tracking-wider font-semibold text-red-500">
              ⚠️ Quiz can only be taken on a laptop or desktop.
            </p>
            <p className="mt-2">Please switch to a laptop to continue.</p>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setDeviceWarningModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Camera & Microphone Permission Modal */}
      {permissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming text-white">
          <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white">
            <p className="text-lg tracking-wider font-semibold">
              This quiz requires camera and microphone access.
            </p>
            <p className="mt-2">Please grant permissions to continue.</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
                onClick={requestPermissions}
              >
                OK
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2"
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
