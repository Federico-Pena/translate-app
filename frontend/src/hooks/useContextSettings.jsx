import { useContext } from "react";
import { ContextSettings } from "../context/SettingsContext";

export const useContextSettings = () => {
  const context = useContext(ContextSettings);
  return context;
};
