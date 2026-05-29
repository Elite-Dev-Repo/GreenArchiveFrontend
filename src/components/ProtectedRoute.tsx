import { useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const [redirect] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return "/auth";
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        return "/auth";
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      return "/auth";
    }
    return null;
  });

  if (redirect) return <Navigate to={redirect} replace />;
  return <>{children}</>;
}
