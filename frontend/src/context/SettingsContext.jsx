import { createContext, useReducer } from "react";

const initialState = {
  dispatch: () => {},
  outputLang: "en",
  inputLang: "es",
  voiceGender:
    "Microsoft EmmaMultilingual Online (Natural) - English (United States)",
};

function settingsReducer(state, action) {
  switch (action.type) {
    case "SET_INPUT_LANG":
      return { ...state, inputLang: action.payload };
    case "SET_OUTPUT_LANG":
      return { ...state, outputLang: action.payload };
    case "SET_VOICE_GENDER":
      return { ...state, voiceGender: action.payload };
    default:
      return state;
  }
}

export const ContextSettings = createContext(initialState);

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  return (
    <ContextSettings.Provider value={{ ...state, dispatch }}>
      {children}
    </ContextSettings.Provider>
  );
};
