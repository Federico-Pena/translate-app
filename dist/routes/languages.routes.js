"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiConfig_1 = require("../config/apiConfig");
const languagesController_1 = require("../controllers/languagesController");
const languages = (0, express_1.Router)();
const { languages: lang } = apiConfig_1.apiConfig.API_ROUTES.translate;
languages.get(lang, languagesController_1.languagesController);
exports.default = languages;
