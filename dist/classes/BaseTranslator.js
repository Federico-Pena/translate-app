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
exports.BaseTranslator = void 0;
const TranslationError_1 = __importDefault(require("../errors/TranslationError"));
class BaseTranslator {
    constructor(to, from = 'auto') {
        this.to = to;
        this.from = from;
        this.configs = {
            google: {
                url: 'https://translate.google.com/m?',
                pattern: 'class="result-container">',
                key: 'q'
            },
            mymemory: {
                url: 'http://api.mymemory.translated.net/get',
                key: 'q'
            }
        };
    }
    request(url, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = new URLSearchParams(params).toString();
                const response = yield fetch(`${url}?${query}`);
                if (!response.ok) {
                    throw new TranslationError_1.default('HTTP Error occurred while requesting the translation.', response.status);
                }
                const data = yield response.text();
                return data;
            }
            catch (error) {
                if (error instanceof TranslationError_1.default) {
                    throw error;
                }
                else {
                    console.error(error);
                    throw new TranslationError_1.default('Error occurred while requesting the translation.', 500);
                }
            }
        });
    }
}
exports.BaseTranslator = BaseTranslator;
