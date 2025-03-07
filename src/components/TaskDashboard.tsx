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
  slots: Record<string, any>[]; // Use a more specific type if possible
}

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

  const getSlotInfo = (subDomain: string) => {
    if (
      !quizData ||
      !Array.isArray(quizData.slots) ||
      quizData.slots.length === 0 ||
      !subDomain
    ) {
      return null;
    }

    const slotObj = quizData.slots.find((slot) => {
      if (typeof slot === "object" && slot !== null) {
        return subDomain in slot && slot.Panel;
      }
      return false;
    });

    if (!slotObj) return null;

    return {
      panel: slotObj.Panel,
      timing: slotObj[subDomain],
    };
  };

  const interviews = quizData?.completed.filter(
    (quiz) =>
      (quiz.subDomain && getSlotInfo(quiz.subDomain) !== null) ||
      quiz.subDomain === "IOT"
  );

  const tasks = quizData?.completed.filter(
    (quiz) =>
      !quiz.subDomain ||
      (getSlotInfo(quiz.subDomain) === null && quiz.subDomain !== "IOT")
  );

  const handleTaskClick = (subDomain: string | undefined) => {
    const blockedTasks = [
      "GRAPHIC DESIGN",
      "UI/UX",
      "VIDEO EDITING",
      "CC",
      "AI/ML",
    ];
    if (subDomain && blockedTasks.includes(subDomain)) {
      setBlockedTaskName(subDomain);
      setBlockedTaskModal(true);
    } else {
      navigate("/task", { state: { subDomain } });
    }
  };

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
              <strong>learning and effort</strong>, not just completion. Even
              finishing <strong>Level 1</strong> of any track is impressive and
              shows curiosity and dedication. Take your time, ask questions, and
              most importantly, enjoy the process. Let's grow and learn
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
            <p>The deadline for task submission for Graphic Design is over.</p>
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
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="absolute w-full pointer-events-none">
          <Treecloud />
        </div>

        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <Loader />
          </div>
        )}

        <div className="border-2 mt-[5vh] rounded-3xl w-[80%] justify-center backdrop-blur-[4.5px] text-white sm:w-[80%] md:w-[80%] lg:w-[75%] sm:h-[75vh] h-[75vh] flex flex-col items-center p-4">
          <div className="flex flex-col items-center">
            {!loading && quizData?.completed.length === 0 ? (
              <div className="mb-4 text-center px-14">
                <span className="w-full font-sans text-lg tracking-wide text-yellow-400 md:text-xl text-center">
                  Tasks are only visible for people who made it to the next
                  round! <br /> Better luck next time.{" "}
                </span>
              </div>
            ) : (
              <>
                {quizData && quizData.completed.length > 0 && (
                  <div className="mb-4 text-center px-14">
                    <span className="w-full font-sans text-lg tracking-wide text-yellow-400 md:text-xl">
                      <p>
                        Round-2 is live. Interactions will be scheduled soon.
                        Join{" "}
                        <a
                          href="https://discord.gg/j2Pt6A4YNK"
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
                {quizData && quizData.completed.length > 0 && (
                  <>
                    {tasks && tasks.length > 0 && (
                      <h2 className="mb-2 text-xl md:mb-4 sm:text-4xl ">
                        TASKS
                      </h2>
                    )}
                    <div className="flex flex-col gap-4 md:flex-row">
                      {tasks &&
                        tasks.map((quiz, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center justify-center px-4 py-2 text-white transition duration-200 border-2 cursor-pointer md:px-8 md:py-4 rounded-3xl hover:border-orange-500"
                            onClick={() => handleTaskClick(quiz.subDomain)}
                          >
                            <h3 className="text-lg sm:text-xl">
                              {quiz.domain}
                            </h3>
                            {quiz.subDomain && (
                              <p className="text-gray-400 text-md sm:text-xl text-center">
                                {quiz.subDomain}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>

                    {interviews && interviews.length > 0 && (
                      <h2 className="mt-4 mb-2 text-xl md:mb-4 sm:text-4xl md:mt-8">
                        INTERACTIONS
                      </h2>
                    )}

                    <div className="flex flex-col gap-4 md:flex-row">
                      {interviews &&
                        interviews.map((quiz, index) => {
                          const slotInfo = quiz.subDomain
                            ? getSlotInfo(quiz.subDomain)
                            : null;

                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center justify-center px-4 py-2 text-white border-2 md:px-8 md:py-4 rounded-3xl"
                            >
                              <h3 className="text-lg sm:text-xl">
                                {quiz.domain}
                              </h3>
                              {quiz.subDomain && (
                                <p className="text-gray-400 text-md sm:text-xl text-center">
                                  {quiz.subDomain}
                                </p>
                              )}
                              {slotInfo ? (
                                <>
                                  <p className="text-[#F8B95A] text-md sm:text-lg font-sans font-bold text-center">
                                    {slotInfo.timing}
                                  </p>
                                  <p className="text-[#F8B95A] text-md sm:text-lg font-sans font-bold text-center">
                                    Panel-{slotInfo.panel}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="text-[#F8B95A] text-md sm:text-lg font-sans font-bold">
                                    Scheduling soon
                                  </p>
                                  <p className="text-[#F8B95A] text-md sm:text-lg font-sans font-bold">
                                    Check Discord
                                  </p>
                                </>
                              )}
                            </div>
                          );
                        })}
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
