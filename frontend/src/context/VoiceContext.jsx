import { createContext } from "react";
import useVoice from "../hooks/useVoice";
import useTranslationService from "../hooks/useTranslationService";
const initialState = {
  startListening: () => {},
  stopListening: () => {},
  translatedText: "",
  transcript: "",
  error: null,
  translateError: null,
  languages: null,
  speakText: () => {},
  isPlaying: false,
};
export const VoiceContext = createContext(initialState);

export const VoiceProvider = ({ children }) => {
  const { translateText, languages, error } = useTranslationService();
  const voiceData = useVoice({ translateText });

  return (
    <VoiceContext.Provider
      value={{ ...voiceData, languages, translateText, translateError: error }}
    >
      {children}
    </VoiceContext.Provider>
  );
};
