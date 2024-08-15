"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TranslationError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = 'TranslationError';
        this.statusCode = statusCode;
    }
}
exports.default = TranslationError;
