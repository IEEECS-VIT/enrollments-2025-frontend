import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Treecloud from "./Treecloud";
import { LoadDashboard } from "../api/user";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";
import { showToastWarning } from "../Toast";

interface Quiz {
  domain: string;
  subDomain?: string;
}

interface DashboardData {
  pending: Quiz[];
  completed: Quiz[];
  slots: Record<string, any>[];
}

// Hardcoded Calendly Links for PnM and Events removed as they are unused
export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<DashboardData>({
    pending: [],
    completed: [],
    slots: [],
  });
  const [showPopup, setShowPopup] = useState(false);

  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [blockedTaskModal, setBlockedTaskModal] = useState(false);
  const [blockedTaskName, setBlockedTaskName] = useState("");

  // New state for CC selection modal
  // const [showCCModal, setShowCCModal] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await LoadDashboard(2);
        setQuizData(response);
      } catch {
        showToastWarning("error occurred try again");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
    if (quizData && quizData?.completed.length > 0) {
      setShowPopup(true);
    }
  }, [quizData]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const isInterviewDomain = (domain: string, subDomain?: string) => {
    const target = subDomain || domain;
    return ["PNM", "EVENTS", "CC"].includes(target);
  };

  const interviews = quizData?.completed.filter((quiz) =>
    isInterviewDomain(quiz.domain, quiz.subDomain)
  );

  const tasks = quizData?.completed.filter(
    (quiz) => !isInterviewDomain(quiz.domain, quiz.subDomain)
  );

  const handleTaskClick = (subDomain: string | undefined) => {
  
    const blockedTasks: string[] = [
      // "GRAPHIC DESIGN",
      // "UI/UX",
      // "VIDEO EDITING",
      // "CC",
      // "AI/ML",
      // "WEB",
      // "APP",
      // "EVENTS",
      // "PNM"
    ];

    // Special handling for CC domain
    // if (subDomain === "CC") {
    //   setShowCCModal(true);
    //   return;
    // }

    if (subDomain && blockedTasks.includes(subDomain)) {
      setBlockedTaskName(subDomain);
      setBlockedTaskModal(true);
    } else {
      console.log("Navigating to task:", subDomain);
      navigate("/task", { state: { subDomain } });
    }
  };

  // handleInterviewClick removed as it is unused

  return (
    <>
      <ToastContainer />
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-black text-white p-6 text-xl md:text-3xl border-white border-2 rounded-3xl w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] text-center">
            <h2 className="font-bold mb-4">Hey everyone! 👋</h2>
            <p>
              We're thrilled to see your interest in joining IEEE-CS! The tasks
              might look a bit intense, but don't worry — it's all about{" "}
              <strong>learning and effort</strong>. Let's grow and learn
              together!
            </p>
            <button
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-2xl hover:bg-orange-600"
              onClick={closePopup}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {showDeadlineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-black text-white p-6 text-xl md:text-3xl border-white border-2 rounded-3xl w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] text-center">
            <h2 className="font-bold mb-4">Deadline Over</h2>
            <p>The deadline for this task submission is over.</p>
            <button
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-2xl hover:bg-orange-600"
              onClick={() => setShowDeadlineModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {blockedTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-black text-white p-6 text-xl md:text-3xl border-white border-2 rounded-3xl w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] text-center">
            <h2 className="font-bold mb-4">Submission Closed</h2>
            <p>
              The deadline for submitting the task of {blockedTaskName} is over.
            </p>
            <button
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-2xl hover:bg-orange-600"
              onClick={() => setBlockedTaskModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CC Selection Modal */}
      {/* showCCModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-black text-white p-6 text-xl md:text-2xl border-white border-2 rounded-3xl w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] text-center flex flex-col gap-6">
            <h2 className="font-bold text-[#F8B95A] text-2xl md:text-4xl font-playmegames tracking-widest">
              COMPETITIVE CODING
            </h2>
            <p className="text-gray-300 text-sm md:text-lg">
              Round 2 will be conducted in batches. <br />
              Please <strong>book a slot</strong> before logging in.
            </p>

            <div className="flex flex-col gap-4 w-full px-4 md:px-12">
              <button
                className="w-full px-6 py-3 border-2 border-[#F8B95A] text-[#F8B95A] rounded-xl hover:bg-[#F8B95A] hover:text-black transition-all font-bold tracking-wide"
                onClick={() =>
                  window.open("https://calendly.com/cc-ieeecsvit", "_blank")
                }
              >
                📅 Book Slot (Calendly)
              </button>

              <button
                className="w-full px-6 py-3 bg-[#F8B95A] text-black border-2 border-[#F8B95A] rounded-xl hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all font-bold tracking-wide"
                onClick={() =>
                  window.open("https://battlecode.ieeecsvit.com", "_blank")
                }
              >
                ⚔️ Login to BattleCode
              </button>
            </div>

            <button
              className="mt-2 text-gray-400 underline text-sm hover:text-white"
              onClick={() => setShowCCModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) */}

      <div className="relative flex items-center justify-center min-h-screen">
        <div className="absolute w-full pointer-events-none">
          <Treecloud />
        </div>

        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <Loader />
          </div>
        )}

        <div className="border-2 mt-[5vh] mb-[5vh] rounded-3xl w-[80%] justify-center backdrop-blur-[4.5px] text-white sm:w-[80%] md:w-[80%] lg:w-[75%] h-auto min-h-[60vh] max-h-[85vh] flex flex-col items-center p-4">
          <div className="flex flex-col items-center w-full h-full overflow-y-auto pb-6">
            {!loading && quizData?.completed.length === 0 ? (
              <div className="mb-4 text-center px-14 mt-10">
                <span className="w-full text-lg tracking-wide text-yellow-400 md:text-xl text-center">
  We appreciate your participation! <br />
  Although you didn't make it to the next round this time, And stay connected with us to attend our future events. 
</span>
              </div>
            ) : (
              <>
                {quizData && quizData.completed.length > 0 && (
                  <div className="mb-4 text-center px-14">
                    <span className="w-full text-lg tracking-wide text-yellow-400 md:text-xl">
                      <p>
                        Round-2 is live. Join{" "}
                        <a
                          href="https://discord.gg/brq4bFGdVE"
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold underline"
                        >
                          Discord
                        </a>{" "}
                        for updates.
                      </p>
                    </span>
                  </div>
                )}

                {tasks && tasks.length > 0 && (
                  <>
                    <h2 className="mb-2 text-xl md:mb-4 sm:text-4xl text-center">
                      TASKS
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:flex-row">
                      {tasks.map((quiz, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center px-4 py-2 text-white transition duration-200 border-2 cursor-pointer md:px-8 md:py-4 rounded-3xl hover:border-orange-500 min-w-[150px]"
                          onClick={() =>
                            handleTaskClick(quiz.subDomain || quiz.domain)
                          }
                        >
                          <h3 className="text-lg sm:text-xl">
                            {/* FIX: Replaced 'Other' with 'DESIGN' dynamically */}
                            {quiz.domain === "Other" ? "DESIGN" : quiz.domain}
                          </h3>
                          {quiz.subDomain && (
                            <p className="text-gray-400 text-md sm:text-xl text-center">
                              {quiz.subDomain}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {interviews && interviews.length > 0 && (
                  <>
                    <h2 className="mt-8 mb-2 text-xl md:mb-4 sm:text-4xl md:mt-12 text-center">
                      INTERACTIONS
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:flex-row">
                      {interviews.map((quiz, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center px-4 py-3 text-white transition duration-200 border-2 border-white/50 md:px-8 md:py-4 rounded-3xl min-w-[200px] max-w-[250px]"
                        >
                          <h3 className="text-lg sm:text-xl">{quiz.domain}</h3>
                          {quiz.subDomain && (
                            <p className="text-gray-400 text-md sm:text-xl text-center">
                              {quiz.subDomain}
                            </p>
                          )}
                          <p className="text-[#F8B95A] text-xs sm:text-sm font-sans font-bold mt-3 text-center leading-relaxed">
                            Shortlisted candidates will be contacted directly.
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
