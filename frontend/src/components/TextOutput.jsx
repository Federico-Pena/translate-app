import { useState } from "react";
import { IconAudioWave, IconPlayCircle } from "./icons/Icons";
import { useContextVoice } from "../hooks/useContextVoice";
import { useContextSettings } from "../hooks/useContextSettings";

const TextOutput = () => {
  const [listen, setListen] = useState("");
  const { languages, translatedText, speakText, isPlaying, transcript } =
    useContextVoice();
  const { inputLang, outputLang, dispatch } = useContextSettings();

  const handleListening = (name, text) => {
    if (isPlaying) return;
    speakText(text);
    setListen(name);
  };
  const decodeHTMLEntities = (text) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text || "";
    return textArea.value;
  };

  return (
    <section className="text-output">
      <div className="column">
        <label htmlFor="inputLang">
          Original
          <select
            id="inputLang"
            title="Seleccione el idioma original"
            value={inputLang}
            onChange={(e) =>
              dispatch({ type: "SET_INPUT_LANG", payload: e.target.value })
            }
          >
            {languages !== null &&
              Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
          </select>
        </label>
        {transcript && (
          <ButtonPlay
            name={"original"}
            handleListening={(name) => handleListening(name, transcript)}
            isPlaying={isPlaying}
            listen={listen}
          />
        )}
        <p translate="no">{transcript}</p>
      </div>
      <div className="column">
        <label htmlFor="outputLang">
          Traducción
          <select
            id="outputLang"
            title="Seleccione el idioma de traducción"
            value={outputLang}
            onChange={(e) =>
              dispatch({ type: "SET_OUTPUT_LANG", payload: e.target.value })
            }
          >
            {languages !== null &&
              Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
          </select>
        </label>
        {translatedText && (
          <ButtonPlay
            name={"translated"}
            handleListening={(name) => handleListening(name, translatedText)}
            isPlaying={isPlaying}
            listen={listen}
          />
        )}
        <p translate="no">{decodeHTMLEntities(translatedText)}</p>
      </div>
    </section>
  );
};

const ButtonPlay = ({ name, handleListening, isPlaying, listen }) => {
  return (
    <button
      disabled={isPlaying}
      className={`round-button`}
      onClick={() => {
        handleListening(name);
      }}
    >
      <span role="img" aria-label="Start listening">
        {isPlaying && listen === name ? <IconAudioWave /> : <IconPlayCircle />}
      </span>
    </button>
  );
};

export default TextOutput;
