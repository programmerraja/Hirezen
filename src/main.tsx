import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";

const rootElement = document.createElement("div");

rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");

globalStyles.innerHTML = `
  #react-chrome-app {
    position: fixed;
    right: 0;
    top: 0;
    width: 490px;
    height: 100vh;
    overflow: hidden;
    color: white;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.76);
    border-right: 1px solid #c2c2c2;
    z-index: 9999;
    overflow-y: auto;
    user-select: text;
    transition: width 0.3s, height 0.3s;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  }

 
`;

if (
  window.location.href.includes("meet.google.com") ||
  window.location.href.includes("localhost")
) {
  document.body.appendChild(rootElement);
  document.body.appendChild(globalStyles);
}

createRoot(rootElement!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
