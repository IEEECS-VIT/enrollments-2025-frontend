import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import QuestionNumber from "./QuestionNumber.tsx";
import { SubmitAnswers } from "../api/user.ts";

interface QuizData {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: number;
  }[];
}

export default function Questions() {
  const quizData: QuizData = {
    questions: [
      {
        question:
          "What is the correct syntax for including an external JavaScript file in an HTML document?",

        answers: [
          "<script href='file.js'></script>",
          "<script src='file.js'></script>",
          "<link rel='script' href='file.js'>",
          "<script file='file.js'></script>",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which HTML tag is used to define an internal style sheet?",

        answers: ["<css>", "<style>", "<script>", "<link>"],
        correctAnswer: 2,
      },
      {
        question: "What does CSS stand for?",

        answers: [
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which is not a valid JavaScript data type?",

        answers: ["Boolean", "Undefined", "Float", "Number"],
        correctAnswer: 3,
      },
      {
        question:
          "Which HTML element is used to display scalar measurements within a range?",

        answers: ["<gauge>", "<measure>", "<progress>", "<meter>"],
        correctAnswer: 4,
      },
      {
        question: "What does SQL stand for?",

        answers: [
          "Structured Query Language",
          "Structured Question Language",
          "Simplified Query Language",
          "Sequential Query Language",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which is the correct way to write a comment in CSS?",

        answers: [
          "// this is a comment",
          "/* this is a comment */",
          "# this is a comment",
          "<!-- this is a comment -->",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which company developed JavaScript?",

        answers: ["Netscape", "Microsoft", "Sun Microsystems", "IBM"],
        correctAnswer: 1,
      },
      {
        question: "What is the default display value for a <div> element?",

        answers: ["inline", "inline-block", "block", "none"],
        correctAnswer: 3,
      },
      {
        question: "Which property is used to change the text color in CSS?",

        answers: ["font-color", "text-color", "color", "foreground-color"],
        correctAnswer: 3,
      },
    ],
  };

  // const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { data, loading, error } = { data: "", loading: "", error: "" };
  console.log(data, loading, error);

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // const fetchQuizData = async () => {
    //   setQuizData(null);
    //   await axios
    //     .get<QuizData>("/api/quiz")
    //     .then((response) => {
    //       setQuizData(response.data);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching quiz data:", error);
    //     })
    //     .finally(() => {
    //       console.log("Fetch attempt completed.");
    //     });
    // };

    const savedAnswers = Cookies.get("quizAnswers");
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = { ...selectedAnswers, [questionIndex]: optionIndex };
    setSelectedAnswers(updatedAnswers);
    Cookies.set("quizAnswers", JSON.stringify(updatedAnswers), { expires: 7 });
  };

  const handleQuestionChange = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = async () => {
    // Calculate the score
    let calculatedScore = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] + 1 === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowScore(true);

    const questions = quizData.questions.map((q) => q.question);
    const answers = quizData.questions.map(
      (q, index) => q.answers[selectedAnswers[index]]
    );
    const domain = "sample";
    try {
      const result = await SubmitAnswers(domain, questions, answers);
      if (result.status !== 200) {
        alert("Error submitting answers. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Error submitting answers. Please try again.");
    }
  };

  if (showScore) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-lg">Quiz answers submitted successfully.</p>
        {showScore && <p>{score}</p>}
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col justify-start items-center p-2 h-full max-w-[100%] font-retro-gaming">
        <div id="questionBox" className="m-4 p-4 w-full rounded-xl">
          {/* Display question */}
          <div
            id="question"
            className="p-4 text-xs md:text-lg leading-6 border border-white rounded-xl flex justify-center"
          >
            {quizData.questions[currentQuestionIndex].question}
          </div>

          {/* Display answer options */}
          <div className="text-xs md:text-lg grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {quizData.questions[currentQuestionIndex].answers.map(
              (option, index) => (
                <div
                  key={index}
                  className={`p-2 border rounded-xl cursor-pointer ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? "bg-[#f8770f] text-white"
                      : "hover:bg-gray-900"
                  }`}
                  onClick={() =>
                    handleOptionSelect(currentQuestionIndex, index)
                  }
                >
                  {option}
                </div>
              )
            )}
          </div>
        </div>
        {/* Question Number Navigation */}
        <div className="absolute bottom-0 mb-2">
          <QuestionNumber
            totalQuestions={quizData.questions.length}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionChange={handleQuestionChange}
          />
        </div>
      </div>
      {currentQuestionIndex === quizData.questions.length - 1 && (
        <button className="absolute bottom-8 text-white" onClick={handleSubmit}>
          &lt; Submit &gt;
        </button>
      )}
    </>
  );
}

// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import QuestionNumber from "./QuestionNumber.tsx";
// import axios from "axios";

// interface QuizData {
//   questions: {
//     question: string;
//     answers: string[];
//     correctAnswer: number;
//   }[];
// }

// export default function Questions() {
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//   const [quizData, setQuizData] = useState<QuizData | null>(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const { data, loading, error } = { data: "", loading: "", error: "" };
//   console.log(data, loading, error);

//   const [selectedAnswers, setSelectedAnswers] = useState<{
//     [key: number]: number;
//   }>({});
//   const [showScore, setShowScore] = useState(false);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       setQuizData(null);
//       await axios
//         .get<QuizData>(`${BACKEND_URL}/quiz`)
//         .then((response) => {
//           setQuizData(response.data); // Set the quiz data from the backend
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching quiz data:", error);
//         })
//         .finally(() => {
//           console.log("Fetch attempt completed.");
//         });
//     };

//     const savedAnswers = Cookies.get("quizAnswers");
//     if (savedAnswers) {
//       setSelectedAnswers(JSON.parse(savedAnswers));
//     }

//     fetchQuizData();
//   }, [BACKEND_URL]);

//   const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
//     const updatedAnswers = { ...selectedAnswers, [questionIndex]: optionIndex };
//     setSelectedAnswers(updatedAnswers);
//     Cookies.set("quizAnswers", JSON.stringify(updatedAnswers), { expires: 7 });
//   };

//   const handleQuestionChange = (index: number) => {
//     setCurrentQuestionIndex(index);
//   };

//   const handleSubmit = () => {
//     // Calculate the score
//     let calculatedScore = 0;
//     quizData?.questions.forEach((question, index) => {
//       if (selectedAnswers[index] + 1 === question.correctAnswer) {
//         calculatedScore++;
//       }
//     });
//     setScore(calculatedScore);
//     setShowScore(true);
//   };

//   if (showScore) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full p-4">
//         <p className="text-lg">Quiz answers submitted successfully.</p>
//         {showScore && <p>{score}</p>}
//       </div>
//     );
//   }

//   if (!quizData) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <p>Loading quiz data...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="relative flex flex-col justify-start items-center p-2 h-full max-w-[100%] font-retro-gaming">
//         <div id="questionBox" className="m-4 p-4 w-full rounded-xl">
//           {/* Display question */}
//           <div
//             id="question"
//             className="p-4 text-xs md:text-lg leading-6 border border-white rounded-xl flex justify-center"
//           >
//             {quizData.questions[currentQuestionIndex].question}
//           </div>

//           {/* Display answer options */}
//           <div className="text-xs md:text-lg grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//             {quizData.questions[currentQuestionIndex].answers.map(
//               (option, index) => (
//                 <div
//                   key={index}
//                   className={`p-2 border rounded-xl cursor-pointer ${
//                     selectedAnswers[currentQuestionIndex] === index
//                       ? "bg-[#f8770f] text-white"
//                       : "hover:bg-gray-900"
//                   }`}
//                   onClick={() =>
//                     handleOptionSelect(currentQuestionIndex, index)
//                   }
//                 >
//                   {option}
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//         {/* Question Number Navigation */}
//         <div className="absolute bottom-0">
//           <QuestionNumber
//             totalQuestions={quizData.questions.length}
//             currentQuestionIndex={currentQuestionIndex}
//             onQuestionChange={handleQuestionChange}
//           />
//         </div>
//       </div>
//       {currentQuestionIndex === quizData.questions.length - 1 && (
//         <button className="absolute bottom-8 text-white" onClick={handleSubmit}>
//           &lt; Submit &gt;
//         </button>
//       )}
//     </>
//   );
// }
