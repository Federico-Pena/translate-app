import { useEffect, useState } from "react";
import performFetch from "../services/performFetch";

const useTranslationService = () => {
  const [error, setError] = useState(null);
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    const getSuportedLanguages = async () => {
      try {
        const response = await performFetch(
          "https://translate-voice-app.vercel.app/api/v1/languages"
        );

        setLanguages(response.data);
      } catch (err) {
        const message = "Error obteniendo los idiomas.";
        if (err) {
          setError(message);
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
      }
    };
    getSuportedLanguages();
  }, []);

  const translateText = async (text, fromLang, toLang) => {
    try {
      setError(null);
      const response = await performFetch(
        "https://translate-voice-app.vercel.app/api/v1/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, fromLang, toLang }),
        }
      );

      return response.data;
    } catch (err) {
      const message = "Error traduciendo el texto.";
      if (err) {
        setError(message);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  return { translateText, error, languages };
};

export default useTranslationService;
