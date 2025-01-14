import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
}

export function token() {
  const navigate = useNavigate();

  const getTokenFromCookies = (): string | null => {
    const idToken = Cookies.get("authToken");
    if (!idToken) {
      navigate("/landing");
      throw new Error("No auth token found. Redirecting to login.");
    }
    return idToken;
  };

  return { getTokenFromCookies };
}

const ProtectedRequest = async (
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  data: Record<string, unknown> | null = null,
  params: Record<string, unknown> | null = null
): Promise<AxiosResponse> => {
  try {
    const token = Cookies.get("authToken");  
    if (!token) throw new Error("Token is required for protected requests.");

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
  const token = Cookies.get("authToken");  
  if (!token) throw new Error("No token available for login.");
  
  const response = await ProtectedRequest("POST", "/user/login");
  return {
    status: response.status,
    data: response.data,
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
