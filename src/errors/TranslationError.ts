class TranslationError extends Error {
  statusCode: number
  constructor(message: string, statusCode = 500) {
    super(message)
    this.name = 'TranslationError'
    this.statusCode = statusCode
  }
}

export default TranslationError
