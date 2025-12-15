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

//Earlier Refresh token logic 
// export async function getAuthToken(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     onAuthStateChanged(auth, async (user: User | null) => {
//       if (user) {
//         try {
//           const freshToken = await user.getIdToken(true);
//           Cookies.set("authToken", freshToken, {
//             secure: true,
//             sameSite: "Strict",
//           });
//           resolve(freshToken);
//         } catch (error) {
//           reject("Failed to refresh token");
//         }
//       } else {
//         try {
//           const result = await signInWithPopup(auth, provider);
//           const idToken = await result.user.getIdToken();
//           Cookies.set("authToken", idToken, {
//             secure: true,
//             sameSite: "Strict",
//           });
//           resolve(idToken);
//         } catch (error) {
//           reject("Sign-in failed");
//         }
//       }
//     });
//   });
// }


//NEW Logic for the refresh token 
export async function getAuthToken(): Promise<string> {
  //Check if user is already loaded in memory
  const currentUser = auth.currentUser;
  
  if (currentUser) {
    return await currentUser.getIdToken(false); 
  }

  //If not in local then using firebase to initialise 
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: User | null) => {
        unsubscribe(); // STOP LISTENING immediately

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
  const response = await ProtectedRequest<{ detail: string }>(
    "POST",
    "/user/login"
  );
  return {
    status: response.status,
  };
}

export async function LoadProfile(): Promise<ProfileData> {
  const response = await ProtectedRequest<ProfileData>("GET", "/user/profile");
  const data = response.data;
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

export async function SubmitAnswers(
  round: number,
  domain: string,
  questions: string[],
  answers: (string | number)[] | void[],
  score: number
) {
  if (questions.length !== answers?.length) {
    throw new Error("question and answer count not same");
  }

  const payload = {
    round,
    domain,
    questions,
    answers,
    score,
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
  answers: string[] | void[]
) {
  if (!answers || answers.length === 0) {
    throw new Error("Answers cannot be empty");
  }

  const payload = {
    round,
    domain,
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
