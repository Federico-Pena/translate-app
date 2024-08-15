import { useContext } from "react";
import { VoiceContext } from "../context/VoiceContext";

export const useContextVoice = () => {
  const context = useContext(VoiceContext);
  return context;
};
