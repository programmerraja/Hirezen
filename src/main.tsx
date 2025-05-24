/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";



const rootElement = document.createElement("div");

rootElement.id = "react-chrome-app";


const DEFAULT_WIDTH = 490;
const MIN_WIDTH = 300;
const MAX_WIDTH = 1200;

let currentWidth = DEFAULT_WIDTH;

const getSavedWidth = async (): Promise<number> => {
  try {
    if (typeof (globalThis as any).chrome !== 'undefined' && (globalThis as any).chrome.storage) {
      const result = await (globalThis as any).chrome.storage.local.get(['extensionWidth']);
      return result.extensionWidth || DEFAULT_WIDTH;
    }
    return DEFAULT_WIDTH;
  } catch {
    console.log('Could not load saved width, using default');
    return DEFAULT_WIDTH;
  }
};

// Function to save width to chrome storage
const saveWidth = async (width: number): Promise<void> => {
  try {
    if (typeof (globalThis as any).chrome !== 'undefined' && (globalThis as any).chrome.storage) {
      await (globalThis as any).chrome.storage.local.set({ extensionWidth: width });
    }
  } catch {
    console.log('Could not save width');
  }
};

// Function to update extension width
const updateExtensionWidth = (width: number) => {
  const constrainedWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, width));
  currentWidth = constrainedWidth;
  rootElement.style.width = `${constrainedWidth}px`;
  saveWidth(constrainedWidth);

  // Dispatch custom event for components to listen to width changes
  window.dispatchEvent(new CustomEvent('extensionWidthChanged', {
    detail: { width: constrainedWidth }
  }));
};

// Initialize width
getSavedWidth().then(savedWidth => {
  updateExtensionWidth(savedWidth);
});

const globalStyles = document.createElement("style");

globalStyles.innerHTML = `
  #react-chrome-app {
    position: fixed;
    right: 0;
    top: 0;
    width: ${currentWidth}px;
    height: 100vh;
    overflow: hidden;
    color: white;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.76);
    border-left: 1px solid #c2c2c2;
    z-index: 9999;
    overflow-y: auto;
    user-select: text;
    transition: width 0.3s ease, height 0.3s ease;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
    resize: horizontal;
    min-width: ${MIN_WIDTH}px;
    max-width: ${MAX_WIDTH}px;
  }

  #react-chrome-app .resize-handle {
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: transparent;
    cursor: ew-resize;
    z-index: 10000;
    transition: background-color 0.2s ease;
  }

  #react-chrome-app .resize-handle:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  #react-chrome-app .resize-handle:active {
    background: rgba(255, 255, 255, 0.5);
  }


`;

// Make resize functions globally available
window.updateExtensionWidth = updateExtensionWidth;
window.getExtensionWidth = () => currentWidth;
window.getExtensionConstraints = () => ({ MIN_WIDTH, MAX_WIDTH, DEFAULT_WIDTH });

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
      <TooltipProvider>
        <App />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);
