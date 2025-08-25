"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Khởi tạo Sequelize instance
const sequelize = new sequelize_1.Sequelize("baitap02", "root", "@Thanh05052004", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});
// Hàm kết nối database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(" Kết nối database thành công!");
    }
    catch (error) {
        console.error(" Không thể kết nối database:", error);
    }
};
exports.default = connectDB;
