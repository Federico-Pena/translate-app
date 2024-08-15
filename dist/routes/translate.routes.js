"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiConfig_1 = require("../config/apiConfig");
const translateController_1 = __importDefault(require("../controllers/translateController"));
const translate = (0, express_1.Router)();
const { translate: translateRoute } = apiConfig_1.apiConfig.API_ROUTES.translate;
translate.post(translateRoute, translateController_1.default);
exports.default = translate;
