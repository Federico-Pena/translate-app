import TranslationError from "../errors/TranslationError";

const performFetch = async (url, options) => {
  try {
    const response = await fetch(url, { ...options });

    if (!response.ok) {
      throw new TranslationError(
        `HTTP error! Status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TranslationError) {
      throw error;
    } else {
      throw new TranslationError("Ocurrió un error.", 500);
    }
  }
};
export default performFetch;
