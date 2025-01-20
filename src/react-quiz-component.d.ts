declare module "react-quiz-component" {
    import { FC } from "react";
  
    interface Question {
      question: string;
      questionType: string;
      answerSelectionType: string;
      answers: string[];
      correctAnswer: number; // 1-indexed correct answer
    }
  
    interface QuizData {
      quizTitle: string;
      quizSynopsis: string;
      questions: Question[];
    }
  
    interface QuizProps {
      quiz: QuizData;
      shuffle?: boolean;
      showInstantFeedback?: boolean;
      continueTillCorrect?: boolean;
    }
  
    const Quiz: FC<QuizProps>;
    export default Quiz;
  }
  