import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type UseFetchResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE"; // Add more methods as needed
  body?: any; // Request body for POST, PUT, DELETE
  headers?: Record<string, string>; // Additional custom headers
};

function useFetch<T = any>(
  url: string,
  options: FetchOptions = { method: "GET" }
): UseFetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  Cookies.set("token", "");
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");

      if (!token) {
        alert("Token not found");
        navigate("/landing");
        return;
      }

      setLoading(true);
      setData(null);
      setError(null);

      const config: AxiosRequestConfig = {
        url,
        method: options.method || "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...options.headers, // Add any custom headers
        },
        data: options.body || null, // Include body if provided
      };

      try {
        const res: AxiosResponse<T> = await axios(config);
        setData(res.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          navigate("/landing");
        } else {
          setError("An error occurred. Awkward..");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, navigate]);

  return { data, loading, error };
}

export default useFetch;
