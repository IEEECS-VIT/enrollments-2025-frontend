import React from "react";

interface QuestionNumberProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  onQuestionChange: (index: number) => void;
}

const QuestionNumber: React.FC<QuestionNumberProps> = ({ totalQuestions, currentQuestionIndex, onQuestionChange }) => {
  const numbers = Array.from({ length: totalQuestions }, (_, i) => i); // Generate numbers 0 to totalQuestions-1
  
  return (
    <div className="flex w-full justify-center mt-8 ">
      {/* Left arrow */}
      <div 
        className="flex items-center justify-center w-10 h-10 border border-white rounded-lg mx-4 text-white cursor-pointer hover:bg-[#f8770f]"
        onClick={() => onQuestionChange(currentQuestionIndex > 0 ? currentQuestionIndex - 1 : 0)}
      >
        &lt; {/* Left Arrow */}
      </div>

      {/* Question Numbers */}
      {numbers.map((number) => (
        <div
        key={number}
        onClick={() => onQuestionChange(number)} // Change question when clicked
        className={`flex items-center justify-center w-10 h-10 rounded-lg mx-4 text-white cursor-pointer hover:bg-[#f8770f] 
          ${currentQuestionIndex === number ? 'border-2 border-[#f8770f]' : 'border border-white'}`}
      >
        {number + 1} {/* Display 1-indexed question number */}


        </div>
      ))}

      {/* Right arrow */}
      <div 
        className="flex items-center justify-center w-10 h-10 border border-white rounded-lg mx-4 text-white cursor-pointer hover:bg-[#f8770f]"
        onClick={() => onQuestionChange(currentQuestionIndex < totalQuestions - 1 ? currentQuestionIndex + 1 : totalQuestions - 1)}
      >
        &gt; {/* Right Arrow */}
      </div>
    </div>
  );
};

export default QuestionNumber;
