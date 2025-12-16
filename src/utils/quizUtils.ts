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
    id?: string;
    questionId?: string;
    _id?: string;
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

  // --- 1. CRITICAL CHECK: Ensure Domain is valid ---
  if (!domain || domain.trim() === "") {
    console.error("SUBMISSION ABORTED: Domain is missing.");
    if (setLoadingSubmit) setLoadingSubmit(false);
    showToastWarning("Error: Domain information is missing. Please re-login.");
    return;
  }

  try {
    const currentQuizData = await getQuizData(subdomain, navigate);
    const savedAnswers = loadAnswersFromLocalStorage(subdomain);
    
    // Safety check for data
    if (!currentQuizData || !currentQuizData.questions) {
      throw new Error("Quiz data not loaded properly.");
    }

    if (Object.keys(savedAnswers).length === 0 && !isAutoSubmit) {
      throw new Error("No answers to submit.");
    }

    // --- 2. ROBUST MAPPING: Handles id, questionId, OR _id ---
    const formattedAnswers = currentQuizData.questions.map(
      (question: any, index: number) => {
        // Try to find the ID in any of the common fields, prioritizing 'id'
        const finalId = question.id || question.questionId || question._id;

        if (!finalId) {
            console.error(` CRITICAL: Question at index ${index} has NO ID!`, question);
        }

        return {
            // Backend likely expects 'questionId' key in payload, but value comes from question.id
            questionId: finalId, 
            answer: savedAnswers[index]?.toString().trim() || "" 
        };
      }
    );

    const payload = {
        domain: domain,
        round: round,
        answers: formattedAnswers
    };

    // --- 3. DEBUG LOG: Look at this in your browser console! ---
    console.log("SENDING PAYLOAD TO BACKEND:", JSON.stringify(payload, null, 2));

    const result = await SubmitAnswers(payload);

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    if (result.status === 200) {
      if (setLoadingSubmit) setLoadingSubmit(false);
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
          isAutoSubmit ? "Quiz submitted automatically" : "Quiz submitted successfully"
        );
      }, 500);
    }
  } catch (error: any) {
    if (setLoadingSubmit) setLoadingSubmit(false);
    
    // Log the actual error response from the server
    if (error.response) {
        console.error("SERVER ERROR RESPONSE:", error.response.data);
    }

    showToastWarning(
      isAutoSubmit
        ? "Automatic submission failed. Please try manual submission."
        : "Submission failed. Please try again."
    );
  }
};

export default handleSubmit;