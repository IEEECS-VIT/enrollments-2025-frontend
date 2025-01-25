import React, { useEffect, useState } from "react";
import axios from "axios";
import Treecloud from "./Treecloud";

type Quiz = {
  id: number;
  title: string;
  subDomain?: string;
};

type QuizData = {
  pending: Quiz[];
  completed: Quiz[];
};

export default function Dashboard(): JSX.Element {
  const [quizData, setQuizData] = useState<QuizData>({
    pending: [
      { id: 1, title: "Technical", subDomain: "Web" },
      { id: 2, title: "Technical", subDomain: "IOT" },
    ],
    completed: [
      { id: 3, title: "Design", subDomain: "UI/UX" },
      { id: 4, title: "Management", subDomain: "Events" },
    ],
  });

  //   useEffect(() => {
  //     // Example API call to fetch quiz data
  //     const fetchQuizData = async () => {
  //       try {
  //         const response = await axios.get<QuizData>("/api/quizzes");
  //         setQuizData(response.data);
  //       } catch (error) {
  //         console.error("Error fetching quiz data:", error);
  //       }
  //     };

  //     fetchQuizData();
  //   }, [quizData]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute w-full pointer-events-none">
        <Treecloud />
      </div>
      <div className="border-2 mt-[10vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center  text-white px-10 py-5">
        <div className="flex flex-col items-center mb-8 gap-2">
          <h2 className="text-4xl  mb-4">PENDING TASKS</h2>
          <div className="flex gap-8 ">
            {quizData.pending?.length > 0 ? (
              quizData.pending.map((quiz) => (
                <div
                  key={quiz.id}
                  className="border-2 rounded-3xl px-8 py-4 flex flex-col items-center justify-center text-white hover:border-orange-500 transition duration-300"
                >
                  <h3 className="text-xl">{quiz.title}</h3>
                  {quiz.subDomain && (
                    <p className="text-xl text-gray-400">{quiz.subDomain}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No pending tasks</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl mb-4">COMPLETED TASKS</h2>
          <div className="flex gap-4">
            {quizData.completed?.length > 0 ? (
              quizData.completed.map((quiz) => (
                <div
                  key={quiz.id}
                  className="border-2 rounded-3xl px-8 py-4 flex flex-col items-center justify-center text-white  hover:border-white transition duration-300"
                >
                  <h3 className="text-xl">{quiz.title}</h3>
                  {quiz.subDomain && (
                    <p className="text-xl text-gray-400">{quiz.subDomain}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No completed tasks</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
