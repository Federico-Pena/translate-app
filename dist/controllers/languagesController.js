"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languagesController = void 0;
const languages_1 = require("../data/languages");
const TranslationError_1 = __importDefault(require("../errors/TranslationError"));
const languagesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supportedLanguages = (0, languages_1.languages)();
        if (supportedLanguages === undefined || supportedLanguages === null) {
            throw new TranslationError_1.default('Lenguajes no disponibles.', 500);
        }
        res.status(200).json({ data: supportedLanguages });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los idiomas.' });
    }
});
exports.languagesController = languagesController;
