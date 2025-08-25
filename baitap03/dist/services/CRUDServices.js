"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserInfoById = exports.getAllUser = exports.createNewUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = __importDefault(require("../models")); // models/index.ts
const saltRounds = 10;
const hashUserPassword = async (password) => {
    return bcryptjs_1.default.hash(password, saltRounds);
};
// ========== Hàm tạo user mới ==========
const createNewUser = async (data) => {
    try {
        const hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await models_1.default.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === "1" ? true : false,
            roleId: data.roleId,
        });
        return "OK create a new user successful!";
    }
    catch (error) {
        throw error;
    }
};
exports.createNewUser = createNewUser;
// ========== Hàm lấy tất cả user ==========
const getAllUser = async () => {
    try {
        const users = await models_1.default.User.findAll({ raw: true });
        return users;
    }
    catch (error) {
        throw error;
    }
};
exports.getAllUser = getAllUser;
// ========== Hàm lấy user theo Id ==========
const getUserInfoById = async (userId) => {
    try {
        const user = await models_1.default.User.findOne({
            where: { id: userId },
            raw: true,
        });
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.getUserInfoById = getUserInfoById;
// ========== Hàm update user ==========
const updateUser = async (data) => {
    try {
        const user = await models_1.default.User.findOne({ where: { id: data.id } });
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
        }
        const allUsers = await models_1.default.User.findAll({ raw: true });
        return allUsers;
    }
    catch (error) {
        throw error;
    }
};
exports.updateUser = updateUser;
// ========== Hàm delete user ==========
const deleteUser = async (userId) => {
    try {
        const user = await models_1.default.User.findOne({ where: { id: userId } });
        if (user) {
            await user.destroy();
        }
    }
    catch (error) {
        throw error;
    }
};
exports.deleteUser = deleteUser;
