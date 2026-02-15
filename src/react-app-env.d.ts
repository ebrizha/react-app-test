/// <reference types="react-scripts" />

declare global {
  interface Window {
    __ENV__?: {
      REACT_APP_API_URL?: string;
    };
  }
}

export {};
