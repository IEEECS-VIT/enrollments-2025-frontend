import React from "react";

interface QuestionNumberProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  onQuestionChange: (index: number) => void;
}

const QuestionNumber: React.FC<QuestionNumberProps> = ({
  totalQuestions,
  currentQuestionIndex,
  onQuestionChange,
}) => {
  return (
    <div className="flex w-full justify-center mt-8 px-4">
      {/* Left arrow */}
      <button
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border border-white rounded-lg mx-2 sm:mx-4 text-white cursor-pointer hover:bg-[#f8770f] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() =>
          onQuestionChange(
            currentQuestionIndex > 0 ? currentQuestionIndex - 1 : 0
          )
        }
        disabled={currentQuestionIndex === 0}
      >
        &lt; {/* Left Arrow */}
      </button>

      {/* Question Numbers - Visible on screens below md */}
      <div className=" overflow-x-auto scrollbar-hide md:flex hidden">
        {Array.from({ length: totalQuestions }, (_, i) => i).map((number) => (
          <div
            key={number}
            onClick={() => onQuestionChange(number)} // Change question when clicked
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg mx-1 sm:mx-2 text-white cursor-pointer hover:bg-[#f8770f] transition-all 
              ${
                currentQuestionIndex === number
                  ? "border-2 border-[#f8770f]"
                  : "border border-white"
              }`}
          >
            {number + 1} {/* Display 1-indexed question number */}
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border border-white rounded-lg mx-2 sm:mx-4 text-white cursor-pointer hover:bg-[#f8770f] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() =>
          onQuestionChange(
            currentQuestionIndex < totalQuestions - 1
              ? currentQuestionIndex + 1
              : totalQuestions - 1
          )
        }
        disabled={currentQuestionIndex === totalQuestions - 1}
      >
        &gt; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default QuestionNumber;
