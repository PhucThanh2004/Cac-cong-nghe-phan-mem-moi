"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
/** Lớp User kế thừa Sequelize Model */
class User extends sequelize_1.Model {
    /** Nơi định nghĩa quan hệ giữa các model */
    static associate(models) {
        // ví dụ: this.hasMany(models.Post, { foreignKey: "userId" });
    }
    /** Hàm khởi tạo model */
    static initModel(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: sequelize_1.DataTypes.STRING,
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            gender: {
                type: sequelize_1.DataTypes.BOOLEAN,
            },
            image: {
                type: sequelize_1.DataTypes.STRING,
            },
            roleId: {
                type: sequelize_1.DataTypes.STRING,
            },
            positionId: {
                type: sequelize_1.DataTypes.STRING,
            },
        }, {
            sequelize,
            modelName: "User",
            tableName: "Users", // map với bảng trong migration
            timestamps: true, // tự động tạo createdAt, updatedAt
        });
        return User;
    }
}
exports.User = User;
