const API_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT ?? 1234}`
    : '/'

const CORS_SETTINGS = {
  origin: [API_URL, 'http://localhost:5173'], // Allow specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
  // credentials: true,
  // optionsSuccessStatus: 200,
  // maxAge: 3600
  // preflightContinue: true,
}
const API_ROUTES = {
  translate: {
    translate: '/api/v1/translate',
    languages: '/api/v1/languages'
  }
}
export const apiConfig = {
  API_URL,
  PORT: process.env.PORT ?? 1234,
  API_ROUTES,
  CORS_SETTINGS
}
