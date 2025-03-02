import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Treecloud from "./Treecloud";
import { LoadDashboard } from "../api/user";
import Loader from "./Loader";
import { ToastContainer } from "react-toastify";

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
  const [quizData, setQuizData] = useState<QuizData>({
    pending: [],
    completed: [],
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await LoadDashboard(2);
        setQuizData(response);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  // Filter quizzes into tasks and interviews based on subDomain
  const tasks = quizData.completed.filter(
    (quiz) =>
      !quiz.subDomain ||
      !["EVENTS", "PNM", "IOT", "RND"].includes(quiz.subDomain.toUpperCase())
  );

  const interviews = quizData.completed.filter(
    (quiz) =>
      quiz.subDomain &&
      ["EVENTS", "PNM", "IOT", "RND"].includes(quiz.subDomain.toUpperCase())
  );

  const handleTaskClick = (subDomain: string | undefined) => {
    navigate("/task", { state: { subDomain } });
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

        <div className="border-2 mt-[5vh] rounded-3xl w-[80%] justify-center backdrop-blur-[4.5px] text-white sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[62vh] h-[80vh] flex flex-col items-center p-4">
          <div className="flex flex-col items-center">
            {!loading && quizData.completed.length === 0 ? (
              <div className="text-center mb-4 px-14">
                <span className="font-sans tracking-wide text-lg md:text-xl w-full text-yellow-400">
                  Thank you for participating in IEEE CS Enrollment 2025.
                  Although you didn't qualify, we invite you to stay engaged
                  with our chapter through upcoming events and initiatives. Your
                  interest in IEEE CS is valued.
                </span>
              </div>
            ) : (
              <>
                {quizData.completed.length > 0 && (
                  <div className="text-center mb-4 px-14">
                    <span className="font-sans tracking-wide text-lg md:text-xl w-full text-yellow-400">
                      Congratulations on qualifying Round-1. 🎉
                      <p>
                        Round-2 is live. Interviews (if applicable) will be
                        scheduled soon. Join{" "}
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

                {/* Conditionally render TASKS and INTERVIEWS sections only if quizData.completed is not empty */}
                {quizData.completed.length > 0 && (
                  <>
                    {/* TASKS Section */}
                    <h2 className="mb-2 md:mb-4 text-xl sm:text-4xl ">TASKS</h2>
                    <div className="flex flex-col gap-4 md:flex-row">
                      {tasks.map((quiz, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center px-4 md:px-8 py-2 md:py-4 text-white transition duration-200 cursor-pointer border-2 rounded-3xl hover:border-orange-500"
                          onClick={() => handleTaskClick(quiz.subDomain)}
                        >
                          <h3 className="text-lg sm:text-xl">{quiz.domain}</h3>
                          {quiz.subDomain && (
                            <p className="text-gray-400 text-md sm:text-xl">
                              {quiz.subDomain}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* INTERVIEWS Section */}
                    <h2 className="mb-2 md:mb-4 text-xl sm:text-4xl md:mt-8 mt-4">
                      INTERVIEWS
                    </h2>
                    <div className="flex flex-col gap-4 md:flex-row">
                      {interviews.map((quiz, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center px-4 md:px-8 py-2 md:py-4 text-white border-2 rounded-3xl"
                        >
                          <h3 className="text-lg sm:text-xl">{quiz.domain}</h3>
                          {quiz.subDomain && (
                            <p className="text-gray-400 text-md sm:text-xl">
                              {quiz.subDomain}
                            </p>
                          )}
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
