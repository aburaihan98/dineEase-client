import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import router from "./router/Routes";

// Create a QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
