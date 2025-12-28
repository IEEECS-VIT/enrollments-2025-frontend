import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { signInWithPopup, onAuthStateChanged, User } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { showToastWarning } from "../Toast";
import { hasQuizDBKeys } from "../utils/indexedDb";

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
  slots: Object[];
}

export async function getAuthToken(): Promise<string> {
  const currentUser = auth.currentUser;
  
  if (currentUser) {
    return await currentUser.getIdToken(false); 
  }

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: User | null) => {
        unsubscribe(); 

        if (user) {
          try {
            const token = await user.getIdToken(false);
            Cookies.set("authToken", token, {
              secure: true,
              sameSite: "Strict",
            });
            resolve(token);
          } catch (error) {
            reject(error);
          }
        } else {
          reject("User is not signed in");
        }
      },
      (error) => {
        unsubscribe(); 
        reject(error);
      }
    );
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
    }
    throw error;
  }
};

export async function Login(): Promise<ResponseData> {
  let token: string;

  if (auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken(true);
    } catch (error) {
      await auth.signOut(); 
      try {
        const result = await signInWithPopup(auth, provider);
        token = await result.user.getIdToken();
      } catch (popupError) {
        throw new Error("Login cancelled");
      }
    }
  } else {
    try {
      const result = await signInWithPopup(auth, provider);
      token = await result.user.getIdToken();
    } catch (error) {
      throw new Error("Login cancelled");
    }
  }
  Cookies.set("authToken", token, { secure: true, sameSite: "Strict" });

  try {
    const response = await axios.post(
      `${BACKEND_URL}/user/login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
}

export async function LoadProfile(): Promise<ProfileData> {
  const response = await ProtectedRequest<ProfileData>("GET", "/user/profile");
  const data = response.data;
  return {
    username: data.username,
    mobile: data.mobile,
    email: data.email,
    domain: data.domain,
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
  if (await hasQuizDBKeys()) {
    showToastWarning("Quiz already started, cannot change domains");
    return { status: 400 };
  }

  const response = await ProtectedRequest<DomainResponse>(
    "POST",
    "/domain/submit",
    domain
  );

  if (response.status == 204) {
    showToastWarning("Quiz already started, cannot change domains");
  }

  return {
    status: response.status,
  };
}

// --- Interface for the backend payload ---
interface SubmitAnswersPayload {
  domain: string;
  round: number;
  answers: {
    questionId: string;
    answer: string;
  }[];
  score: number;
}

export async function SubmitAnswers(payload: SubmitAnswersPayload) {
  const response = await ProtectedRequest<DomainResponse>(
    "POST",
    "/answer/submit",
    payload as unknown as Record<string, unknown>
  );

  return {
    status: response.status,
  };
}

export async function LoadDashboard(round: number): Promise<DashboardData> {
  const response = await ProtectedRequest<{
    pending: string[];
    completed: string[];
    slots: Object[];
  }>("GET", "/user/dashboard", null, { round: round });

  const transformQuizzes = (quizzes: string[]): Quiz[] =>
    quizzes.map((quiz) => {
      const [domain, subDomain] = quiz.split(":");
      return { domain, subDomain: subDomain || undefined };
    });

  return {
    pending: transformQuizzes(response.data.pending),
    completed: transformQuizzes(response.data.completed),
    slots: response.data.slots,
  };
}

export interface Question {
  id: string; 
  question: string;
  options: string[];
  correctIndex: number;
  image_url: string;
}

export interface QuestionData {
  questions: Question[];
  error?: string;
}

export async function LoadQuestions({
  subdomain,
}: {
  subdomain: string;
}): Promise<QuestionData> {
  try {
    const response = await ProtectedRequest<QuestionData>(
      "GET",
      `/domain/questions?domain=${subdomain}&round=1`
    );

    if (response.status == 204) {
      return {
        questions: [],
        error: "Failed to fetch quiz data, Try again later",
      };
    }
    return response.data;
  } catch (err: any) {
    return {
      questions: [],
      error: "Failed to fetch quiz data, Try again later",
    };
  }
}

export async function SubmitTask(
  round: number,
  domain: string,
  subcategory: string | null | undefined, // Added parameter
  answers: string[] | void[]
) {
  if (!answers || answers.length === 0) {
    throw new Error("Answers cannot be empty");
  }

  // Construct payload. Use explicit type to allow optional property assignment
  const payload: Record<string, any> = {
    round,
    domain,
    answers,
  };

  // Only add subcategory if it is present (e.g. for WEB)
  if (subcategory) {
    payload.subcategory = subcategory;
  }

  const response = await ProtectedRequest<DomainResponse>(
    "POST",
    "/answer/submit",
    payload
  );

  return {
    status: response.status,
  };
}