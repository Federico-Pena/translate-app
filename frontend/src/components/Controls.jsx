import { useState } from "react";
import { IconStartRecording, IconStopCircle } from "./icons/Icons";
import { useContextSettings } from "../hooks/useContextSettings";
import { useContextVoice } from "../hooks/useContextVoice";

const Controls = () => {
  const [isListening, setIsListening] = useState(false);
  const { voiceGender, dispatch } = useContextSettings();
  const { startListening, stopListening } = useContextVoice();

  const handleListening = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      startListening();
      setIsListening(true);
    }
  };
  return (
    <section className="controls">
      <button
        type="button"
        className={`round-button ${isListening ? "" : "anim-pLay"}`}
        onClick={handleListening}
      >
        <span role="img" aria-label={isListening ? "Stop" : "Start"}>
          {isListening ? <IconStopCircle /> : <IconStartRecording />}
        </span>
      </button>
      <label htmlFor="voice-select">
        Voz de lectura:
        <select
          id="voice-select"
          title="Selecione la voz de reproducción"
          value={voiceGender}
          onChange={(e) =>
            dispatch({ type: "SET_VOICE_GENDER", payload: e.target.value })
          }
        >
          {window.speechSynthesis.getVoices().map(
            (voice) =>
              voice.name.includes("Multilingual") && (
                <option key={voice.name} value={voice.name}>
                  {voice.name
                    .split("-")[0]
                    .replace("Microsoft", "")
                    .replace("Multilingual Online (Natural)", "")}
                </option>
              )
          )}
        </select>
      </label>
    </section>
  );
};

export default Controls;
