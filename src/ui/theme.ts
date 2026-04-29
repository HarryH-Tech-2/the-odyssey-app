import { Platform } from "react-native";

export const colors = {
  bg: "#0b1220", // deep night sea
  bgElevated: "#121a2b",
  border: "#1f2b44",
  text: "#e8e2cf", // parchment
  textDim: "#9aa3b8",
  accent: "#d9a441", // bronze / oil-lamp gold
  accentDim: "#8a6a29",
  danger: "#c2524a",
  good: "#7fb27a",
  choiceBg: "#17223a",
  choicePressed: "#223056",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
};

// React Native font family that reads a little old/serif on both platforms.
export const fonts = {
  body: Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "serif",
  }) as string,
  title: Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "serif",
  }) as string,
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  }) as string,
};
