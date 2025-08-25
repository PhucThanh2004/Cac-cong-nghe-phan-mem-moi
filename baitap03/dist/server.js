"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // import Express với type
const body_parser_1 = __importDefault(require("body-parser")); // nạp body-parser
const viewEngine_1 = __importDefault(require("./config/viewEngine")); // config view EJS
const web_1 = __importDefault(require("./route/web")); // file route
const configdb_1 = __importDefault(require("./config/configdb")); // kết nối DB
const dotenv_1 = __importDefault(require("dotenv")); // đọc file .env
dotenv_1.default.config();
const app = (0, express_1.default)(); // định nghĩa kiểu cho app
// Config app
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Cấu hình view + route
(0, viewEngine_1.default)(app);
(0, web_1.default)(app);
// Kết nối DB
(0, configdb_1.default)();
// Set port từ .env hoặc mặc định 6969
const port = Number(process.env.PORT) || 6969;
// Chạy server
app.listen(port, () => {
    console.log(`Backend Nodejs is running on the port: ${port}`);
});
