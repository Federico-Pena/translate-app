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
exports.MymemoryTranslator = void 0;
const fs_1 = __importDefault(require("fs"));
const BaseTranslator_1 = require("./BaseTranslator");
class MymemoryTranslator extends BaseTranslator_1.BaseTranslator {
    constructor(to, from = 'auto') {
        super(to, from);
        this.url = this.configs.mymemory.url;
        this.params = {
            langpair: `${this.from}|${this.to}`,
            q: ''
        };
    }
    translateText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            this.params.q = text.trim();
            const response = yield this.request(this.url, this.params);
            const data = JSON.parse(response);
            const translatedText = data.responseData.translatedText;
            if (translatedText !== '' || translatedText !== undefined) {
                return translatedText;
            }
            throw new Error(`No translation found for text: ${text}`);
        });
    }
    translateFile(filePath_1) {
        return __awaiter(this, arguments, void 0, function* (filePath, readAsync = false) {
            const text = readAsync
                ? yield fs_1.default.promises.readFile(filePath, 'utf8')
                : fs_1.default.readFileSync(filePath, 'utf8');
            const data = yield this.translateText(text);
            return data;
        });
    }
}
exports.MymemoryTranslator = MymemoryTranslator;
