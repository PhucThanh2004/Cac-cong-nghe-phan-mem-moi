"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/index.ts
const sequelize_1 = require("sequelize");
const user_1 = require("./user"); // import model User
// Khởi tạo Sequelize
const sequelize = new sequelize_1.Sequelize("baitap02", "root", "@Thanh05052004", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});
// Khởi tạo models
user_1.User.initModel(sequelize);
// Gom tất cả models vào object db
const db = {
    sequelize,
    User: user_1.User,
};
exports.default = db;
