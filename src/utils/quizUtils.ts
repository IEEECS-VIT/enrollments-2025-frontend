import { showToastSuccess, showToastWarning } from "../Toast.ts";
import { SubmitAnswers } from "../api/user.ts";
import {
  getQuizData,
  deleteExpiryFromSecureDB,
  deleteQuizDataFromIndexedDB,
} from "./indexedDb.ts";
import {
  loadAnswersFromLocalStorage,
  clearAnswersFromLocalStorage,
} from "./localStorage.ts";
import findCorrectAnswerIndex from "./calculateScore.ts";
import Cookies from "js-cookie";

interface QuizData {
  questions: {
    image_url: any;
    question: string;
    options?: string[];
    correctIndex: number | string;
  }[];
}

const calculateScore = (
  quizData: QuizData,
  selectedAnswers: { [key: number]: string | number }
) => {
  let totalScore = 0;

  quizData.questions.forEach((question, index) => {
    if (selectedAnswers[index] === undefined) return;

    if (question.options) {
      // If options exist, compare selected answer with correct index
      const ans = question.options[findCorrectAnswerIndex(question)];
      
      const selectedAnswer = selectedAnswers[index];
      

      if (selectedAnswer == ans) {
        totalScore++;
      }
    }
  });

  return totalScore;
};

export const handleSubmit = async (
  subdomain: string,
  domain: string,
  round: number,
  navigate: any,
  isAutoSubmit = false,
  setLoadingSubmit?: (loading: boolean) => void
) => {
  if (setLoadingSubmit) {
    setLoadingSubmit(true);
  }

  try {
    const currentQuizData = await getQuizData(subdomain, navigate);
    const savedAnswers = loadAnswersFromLocalStorage(subdomain);
    const score = calculateScore(currentQuizData, savedAnswers);

    if (!currentQuizData || !currentQuizData.questions) {
      throw new Error("Quiz data not loaded properly.");
    }

    if (Object.keys(savedAnswers).length === 0 && !isAutoSubmit) {
      throw new Error("No answers to submit.");
    }

    const answers = currentQuizData.questions.map(
      (_: any, index: number) => savedAnswers[index]?.toString().trim() || ""
    );

    const result = await SubmitAnswers(
      round,
      domain,
      currentQuizData.questions.map((q: { question: string }) => q.question),
      answers,
      score
    );

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    if (result.status === 200) {
      if (setLoadingSubmit) {
        setLoadingSubmit(false);
      }
      clearAnswersFromLocalStorage(subdomain);
      localStorage.setItem("tabSwitchCount", "0");

      await deleteQuizDataFromIndexedDB(subdomain);
      await deleteExpiryFromSecureDB(subdomain);

      Cookies.remove("subdomain");

      setTimeout(() => {
        navigate("/quiz-complete");
      }, 100);
      setTimeout(() => {
        showToastSuccess(
          isAutoSubmit
            ? "Quiz submitted automatically"
            : "Quiz submitted successfully"
        );
      }, 500);
    }
  } catch (error) {
    
    if (setLoadingSubmit) {
      setLoadingSubmit(false);
    }
    showToastWarning(
      isAutoSubmit
        ? "Automatic submission failed. Please try manual submission."
        : "Submission failed. Please try again."
    );
  }
};

export default handleSubmit;
