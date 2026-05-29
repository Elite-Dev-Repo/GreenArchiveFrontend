import api from "./api";
import { jwtDecode } from "jwt-decode";

function getUserId(): number {
  const token = localStorage.getItem("token");
  if (!token) return 0;
  return jwtDecode<{ user_id: number }>(token).user_id;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface ApiKey {
  id: number;
  name: string;
  user: number;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function login(payload: LoginPayload) {
  const { data } = await api.post<AuthResponse>("/token/", payload);
  localStorage.setItem("token", data.access);
  if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
  return data;
}

export async function signup(payload: SignupPayload) {
  const { data } = await api.post<AuthResponse>("/register/", payload);
  localStorage.setItem("token", data.access);
  if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
  return data;
}

export async function fetchApiKeys() {
  const { data } = await api.get<PaginatedResponse<ApiKey>>("/apikeys/create-api-key/", {
    params: { user_id: getUserId() },
  });
  return data.results ?? data;
}

export async function createApiKey(name: string) {
  const { data } = await api.post<ApiKey & { key?: string }>("/apikeys/create-api-key/", {
    name,
    user_id: getUserId(),
  });
  return data;
}

export async function deleteApiKey(pk: number) {
  await api.delete(`/apikeys/delete-api-key/${pk}/`);
}


