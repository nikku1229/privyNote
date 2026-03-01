import axios from "axios";

const baseURL =
  import.meta.env.VITE_BACKEND_PRODUCTION_URL ||
  import.meta.env.VITE_BACKEND_LOCAL_URL;

if (!baseURL) console.log("Backend Url not config");

const API = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
