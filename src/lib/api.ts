import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing: Promise<AxiosResponse> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status !== 401 || !localStorage.getItem("token")) {
      return Promise.reject(err);
    }
    try {
      if (!refreshing) {
        const refreshToken = localStorage.getItem("refresh_token");
        refreshing = api.post("/token/refresh/", { refresh: refreshToken });
      }
      const { data } = await refreshing;
      localStorage.setItem("token", data.access);
      if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
      err.config.headers.Authorization = `Bearer ${data.access}`;
      return api(err.config);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/auth";
      return Promise.reject(err);
    } finally {
      refreshing = null;
    }
  }
);

export default api;
