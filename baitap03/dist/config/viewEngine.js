"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const configViewEngine = (app) => {
    app.use(express_1.default.static("./src/public")); // chứa css, js, images
    app.set("view engine", "ejs"); // cài EJS
    app.set("views", "./src/views"); // thư mục chứa views
};
exports.default = configViewEngine;
