import React from "react";

interface QuestionNumberProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  onQuestionChange?: (index: number) => void; // Made optional since we removed the clicks
}

const QuestionNumber: React.FC<QuestionNumberProps> = ({
  totalQuestions,
  currentQuestionIndex,
}) => {
  return (
    <div className="flex w-full justify-center mt-8 px-4">
      <div className="flex items-center justify-center bg-black px-6 py-3 border border-white rounded-lg text-white text-lg font-semibold">
        Question {currentQuestionIndex + 1} / {totalQuestions}
      </div>
    </div>
  );
};

export default QuestionNumber;