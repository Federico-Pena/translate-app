import "regenerator-runtime/runtime";
import "./App.css";
import SpeechRecognition from "react-speech-recognition";
import Controls from "./components/Controls";
import TextOutput from "./components/TextOutput";
import Error from "./components/Error";

const App = () => {
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <p className="error">El navegador no soporta el reconocimiento de voz.</p>
    );
  }

  return (
    <main>
      <h1>Traducción de voz</h1>
      <Controls />
      <TextOutput />
      <Error />
    </main>
  );
};

export default App;
