export const THEME = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const API_ENDPOINTS = {
  AI: {
    SUMMARIZE: "/api/ai/summarize",
    GENERATE_IMAGE: "/api/ai/generate-image",
    CHAT: "/api/ai/chat",
  },
} as const;

export const ANIMATION = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    LINEAR: "linear",
    IN: "cubic-bezier(0.4, 0, 1, 1)",
    OUT: "cubic-bezier(0, 0, 0.2, 1)",
    IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;
