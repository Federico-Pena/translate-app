import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { VoiceProvider } from "./context/VoiceContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <VoiceProvider>
        <App />
      </VoiceProvider>
    </SettingsProvider>
  </StrictMode>
);
