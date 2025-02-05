import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import QuestionNumber from "./QuestionNumber.tsx";
import { SubmitAnswers } from "../api/user.ts";
import axios from "axios";

interface QuizData {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export default function Questions() {
  const location = useLocation();
  const domain = location.state?.quiz?.subDomain;

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get<QuizData>(
          `http://localhost:8000/domain/questions?domain=${domain}&round=1`
        );
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();

    const savedAnswers = Cookies.get("quizAnswers");
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
  }, [domain]);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = { ...selectedAnswers, [questionIndex]: optionIndex };
    setSelectedAnswers(updatedAnswers);
    Cookies.set("quizAnswers", JSON.stringify(updatedAnswers), { expires: 7 });
  };

  const handleQuestionChange = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = async () => {
    if (!quizData) return;

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
      (q, index) => q.options[selectedAnswers[index]]
    );

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

  const attemptedQuestions = Object.keys(selectedAnswers).length;
  const totalQuestions = quizData?.questions.length || 0;

  if (!quizData) {
    return <div className="text-center text-lg">Loading quiz...</div>;
  }

  if (showScore) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-lg">Quiz answers submitted successfully.</p>
        <p>Score: {score}</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col justify-start items-center p-2 h-full max-w-[100%] font-retro-gaming">
        <div id="questionBox" className="m-4 p-4 w-full rounded-xl">
          <div
            id="question"
            className="p-4 text-xs md:text-lg leading-6 border border-white rounded-xl flex justify-center"
          >
            {quizData.questions[currentQuestionIndex].question}
          </div>
          <div className="text-xs md:text-lg grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {quizData.questions[currentQuestionIndex].options.map(
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
        <div className="absolute bottom-0 mb-2">
          <QuestionNumber
            totalQuestions={quizData.questions.length}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionChange={handleQuestionChange}
          />
        </div>
      </div>

      {currentQuestionIndex === quizData.questions.length - 1 && (
        <button
          className="absolute md:bottom-8 bottom-4 text-white font-retro-gaming text-lg md:text-xl"
          onClick={() => setShowModal(true)}
        >
          &lt; Submit &gt;
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-retro-gaming ">
          <div className="bg-black p-6 rounded-xl shadow-lg text-center border-2 border-white">
            <p className="text-lg font-semibold">
              Are you sure you want to submit?
            </p>
            <p className="mt-2">
              You have attempted {attemptedQuestions}/{totalQuestions}{" "}
              questions.
            </p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2"
                onClick={() => {
                  setShowModal(false);
                  handleSubmit();
                }}
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
    </>
  );
}
