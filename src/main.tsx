import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            borderRadius: "12px",
            padding: "12px 16px",
            border: "2px solid rgba(17, 26, 14, 0.1)",
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
