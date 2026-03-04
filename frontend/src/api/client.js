import axios from "axios";

const DEFAULT_LOCAL_API_BASE_URL = "http://localhost:8000/api";
const DEFAULT_RENDER_API_BASE_URL = "https://loan-backend.onrender.com/api";

const normalizeBaseUrl = (url) => url.replace(/\/+$/, "");

const resolveApiBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configuredBaseUrl) {
    return normalizeBaseUrl(configuredBaseUrl);
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname.toLowerCase();

    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "[::1]") {
      return DEFAULT_LOCAL_API_BASE_URL;
    }

    if (hostname.endsWith(".onrender.com")) {
      return DEFAULT_RENDER_API_BASE_URL;
    }

    return `${window.location.origin}/api`;
  }

  if (import.meta.env.DEV) {
    return DEFAULT_LOCAL_API_BASE_URL;
  }

  return DEFAULT_LOCAL_API_BASE_URL;
};

const client = axios.create({
  baseURL: resolveApiBaseUrl(),
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      success: false,
      errors: {
        detail: [`Network error. Unable to reach API at ${client.defaults.baseURL}.`],
      },
    });
  }
);

export default client;
