"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiConfig = void 0;
const API_URL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1234}`
    : 'https://translate-voice-app.vercel.app/';
const CORS_SETTINGS = {
    origin: [API_URL, 'http://localhost:5173'], // Allow specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
    // credentials: true,
    // optionsSuccessStatus: 200,
    // maxAge: 3600
    // preflightContinue: true,
};
const API_ROUTES = {
    translate: {
        translate: '/api/v1/translate',
        languages: '/api/v1/languages'
    }
};
exports.apiConfig = {
    API_URL,
    PORT: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 1234,
    API_ROUTES,
    CORS_SETTINGS
};
