/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    updateExtensionWidth: (width: number) => void;
    getExtensionWidth: () => number;
    getExtensionConstraints: () => { MIN_WIDTH: number; MAX_WIDTH: number; DEFAULT_WIDTH: number };
  }

  // Chrome Extension API types
  interface Chrome {
    runtime: {
      id?: string;
      lastError?: { message: string };
      sendMessage: (message: any, responseCallback?: (response: any) => void) => void;
      onMessage: {
        addListener: (callback: (request: any, sender: any, sendResponse: (response: any) => void) => void) => void;
      };
      onInstalled: {
        addListener: (callback: () => void) => void;
      };
    };
    storage: {
      local: {
        get: (keys?: string | string[] | { [key: string]: any }) => Promise<{ [key: string]: any }>;
        set: (items: { [key: string]: any }) => Promise<void>;
      };
    };
  }

  const chrome: Chrome;
}

export {};