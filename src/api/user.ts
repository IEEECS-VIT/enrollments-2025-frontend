import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ProfileData {
  name: string;
  mobile: string;
  email: string;
  domain: string[];
}

interface ResponseData {
  status: number;
  data: string; 
}

interface UsernameResponse {
  status: number
}

export function getAuthToken(): string {
  const token = Cookies.get("authToken");
  if (!token) {
    throw new Error("No auth token found");
  }
  return token;
}

const ProtectedRequest = async <T = unknown>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  data: Record<string, unknown> | null = null,
  params: Record<string, unknown> | null = null
): Promise<AxiosResponse<T>> => {
  try {
    const token = getAuthToken();

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
      console.error(`Error with protected request to ${endpoint}:`, error.message);
    }
    throw error;
  }
};

export async function Login(): Promise<ResponseData> {
  const response = await ProtectedRequest<{ detail: string }>("POST", "/user/login");
  return {
    status: response.status,
    data: response.data.detail,
  };
}

export async function LoadProfile(): Promise<ProfileData> {
  const response = await ProtectedRequest<ProfileData>("GET", "/user/profile");
  const data = response.data;
  return {
    name: data.name,
    mobile: data.mobile,
    email: data.email,
    domain: data.domain,
  };
}

export async function SubmitUsername(username: string): Promise<UsernameResponse> {
  if (!username.trim()) {
    throw new Error("Username cannot be empty");
  }

    const response = await ProtectedRequest<UsernameResponse>(
      "POST",
      "/user/username",
      { username: username }
    );
    console.log("Username submission response:", response.data);
    return {
      status: response.status,
    };
}

type Dict = { [key: string]: string };
export async function SubmitDomains(domain: Dict): Promise<UsernameResponse> {
  console.log('doms ', domain);
    const response = await ProtectedRequest<UsernameResponse>(
      "POST",
      "/user/username",
      { domain:domain }
    );
    console.log("Domain submission response:", response.data);
    return {
      status: response.status,
    };
}

