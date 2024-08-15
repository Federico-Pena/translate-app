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
const TranslationError_1 = __importDefault(require("../errors/TranslationError"));
const GoogleTranslator_1 = require("../classes/GoogleTranslator");
const MymemoryTranslator_1 = require("../classes/MymemoryTranslator");
const languages_1 = require("../data/languages");
const translateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, fromLang, toLang } = req.body;
        isValidText(text);
        isLangSupported(fromLang);
        isLangSupported(toLang);
        const googleTranslator = new GoogleTranslator_1.GoogleTranslator(toLang, fromLang);
        const textGoogle = yield googleTranslator.translateText(text);
        if (textGoogle !== undefined && textGoogle !== text) {
            return res.status(200).json({ data: textGoogle });
        }
        const mymemoryTranslator = new MymemoryTranslator_1.MymemoryTranslator(toLang, fromLang);
        const textMymemory = yield mymemoryTranslator.translateText(text);
        if (textMymemory !== undefined && textMymemory !== text) {
            return res.status(200).json({ data: textMymemory });
        }
        throw new TranslationError_1.default('Error traduciendo el texto.');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error traduciendo el texto.' });
    }
});
const isValidText = (text) => {
    const min = 1;
    const max = 5000;
    const length = text.trim().length;
    if (length >= min && length <= max) {
        return true;
    }
    else {
        throw new TranslationError_1.default(`The input text length must be between ${min} and ${max} characters.`);
    }
};
const isLangSupported = (lang) => {
    const langExists = Object.keys((0, languages_1.languages)()).includes(lang) || lang === 'auto';
    if (langExists) {
        return true;
    }
    else {
        throw new TranslationError_1.default(`${lang} is not a supported language.`);
    }
};
exports.default = translateController;
