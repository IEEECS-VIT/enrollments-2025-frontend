import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { signInWithPopup, onAuthStateChanged, User } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ProfileData {
  username: string;
  mobile: string;
  email: string;
  domain: { [key: string]: string[] };
}

interface ResponseData {
  status: number;
}

interface UsernameResponse {
  status: number;
}

interface DomainResponse {
  status: number;
}

interface Quiz {
  domain: string;
  subDomain?: string;
}

interface DashboardData {
  pending: Quiz[];
  completed: Quiz[];
}

export async function getAuthToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const freshToken = await user.getIdToken(true);
          Cookies.set("authToken", freshToken, {
            secure: true,
            sameSite: "Strict",
          });
          resolve(freshToken);
        } catch (error) {
          console.error("Error refreshing token:", error);
          reject("Failed to refresh token");
        }
      } else {
        console.warn("User not authenticated, signing in...");
        try {
          const result = await signInWithPopup(auth, provider);
          const idToken = await result.user.getIdToken();
          Cookies.set("authToken", idToken, {
            secure: true,
            sameSite: "Strict",
          });
          resolve(idToken);
        } catch (error) {
          console.error("Sign-in error:", error);
          reject("Sign-in failed");
        }
      }
    });
  });
}

const ProtectedRequest = async <T = unknown>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  data: Record<string, unknown> | null = null,
  params: Record<string, unknown> | null = null
): Promise<AxiosResponse<T>> => {
  try {
    const token = await getAuthToken();

    const config = {
      method,
      url: `${BACKEND_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
      params,
    };

    const response = await axios<T>(config);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error with protected request to ${endpoint}:`,
        error.message
      );
    }
    throw error;
  }
};

export async function Login(): Promise<ResponseData> {
  const response = await ProtectedRequest<{ detail: string }>(
    "POST",
    "/user/login"
  );
  return {
    status: response.status,
  };
}

export async function LoadProfile(): Promise<ProfileData> {
  console.log("in api");
  const response = await ProtectedRequest<ProfileData>("GET", "/user/profile");
  const data = response.data;
  console.log(data, "in api");
  return {
    username: data.username,
    mobile: data.mobile,
    email: data.email,
    domain: data.domain,
    //username:data.username
  };
}

export async function SubmitUsername(
  username: string
): Promise<UsernameResponse> {
  if (!username.trim()) {
    throw new Error("Username cannot be empty");
  }

  const response = await ProtectedRequest<UsernameResponse>(
    "POST",
    "/user/username",
    { username: username }
  );
  return {
    status: response.status,
  };
}

type Domain = { [key: string]: string[] };

export async function SubmitDomains(domain: Domain): Promise<DomainResponse> {
  const response = await ProtectedRequest<DomainResponse>(
    "POST",
    "/domain/submit",
    domain
  );

  return {
    status: response.status,
  };
}

export async function SubmitAnswers(
  round: number,
  domain: string,
  questions: string[],
  answers: (string | number)[]
) {
  if (questions.length !== answers.length) {
    throw new Error("question and answer count not same");
  }

  const payload = {
    round,
    domain,
    questions,
    answers,
  };

  const response = await ProtectedRequest<DomainResponse>(
    "POST",
    "/answer/submit",
    payload
  );

  return {
    status: response.status,
  };
}

export async function LoadDashboard(round: number): Promise<DashboardData> {
  const response = await ProtectedRequest<{
    pending: string[];
    completed: string[];
  }>("GET", "/user/dashboard", null, { round: round });

  const transformQuizzes = (quizzes: string[]): Quiz[] =>
    quizzes.map((quiz) => {
      const [domain, subDomain] = quiz.split(":");
      return { domain, subDomain: subDomain || undefined };
    });

  return {
    pending: transformQuizzes(response.data.pending),
    completed: transformQuizzes(response.data.completed),
  };
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  image_url: string;
}

export interface QuestionData {
  questions: Question[];
}

export async function LoadQuestions({
  subdomain,
}: {
  subdomain: string;
}): Promise<QuestionData> {
  const response = await ProtectedRequest<QuestionData>(
    "GET",
    `/domain/questions?domain=${subdomain}&round=1`
  );
  return response.data;
}
