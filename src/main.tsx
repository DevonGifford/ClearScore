import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";

import "./globals.css";

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
          zIndex: 999,
        },
      }}
    />
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToasterProvider />
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
