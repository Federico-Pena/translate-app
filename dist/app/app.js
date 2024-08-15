"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apiConfig_1 = require("../config/apiConfig");
const logger_1 = require("../middlewares/logger");
const translate_routes_1 = __importDefault(require("../routes/translate.routes"));
const languages_routes_1 = __importDefault(require("../routes/languages.routes"));
const app = (0, express_1.default)();
// Disable the header 'X-Powered-By'
app.disable('x-powered-by');
// Parse incoming JSON data.
app.use(express_1.default.json());
// Enable CORS
app.use((0, cors_1.default)(apiConfig_1.apiConfig.CORS_SETTINGS));
// Log HTTP requests format.
app.use(logger_1.logger);
// Serve static files.
app.use(express_1.default.static(node_path_1.default.resolve('./public')));
// Use one router
app.use(translate_routes_1.default);
app.use(languages_routes_1.default);
app.use('*', express_1.default.static(node_path_1.default.resolve('./public')));
exports.default = app;
