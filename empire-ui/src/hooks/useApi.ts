import { useState } from "react";

interface ApiError {
  message: string;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const callApi = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An error occurred");
      setError({ message: error.message });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
}
