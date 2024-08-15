class TranslationError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "TranslationError";
    this.statusCode = statusCode;
  }
}

export default TranslationError;
