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
  data: object;
  domain: {
    detail: string;
  };
}

export function getAuthToken(): string {
  const token = Cookies.get("authToken");
  if (!token) {
    throw new Error("No auth token found");
  }
  return token;
}

const ProtectedRequest = async (
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  data: Record<string, unknown> | null = null,
  params: Record<string, unknown> | null = null
): Promise<AxiosResponse> => {
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

    const response = await axios(config);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error with protected request to ${endpoint}:`, error.message);
    }
    throw error;
  }
};

export async function Login(): Promise<ResponseData> {
  const response = await ProtectedRequest("POST", "/user/login");
  return {
    status: response.status,
    data: response.data.detail,
  };
}

export async function LoadProfile(): Promise<ProfileData> {
  const response = await ProtectedRequest("GET", "/user/profile");
  const data = response.data;
  return {
    name: data.name,
    mobile: data.mobile,
    email: data.email,
    domain: data.domain,
  };
}