"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCRUD = exports.putCRUD = exports.getEditCRUD = exports.postCRUD = exports.getFindAllCRUD = exports.getCRUD = exports.getAboutPage = exports.getHomePage = void 0;
const models_1 = __importDefault(require("../models")); // models/index.ts (đã export sequelize + User)
const CRUDService = __importStar(require("../services/CRUDServices")); // CRUD service
// ========== GET HOME PAGE ==========
const getHomePage = async (req, res) => {
    try {
        const data = await models_1.default.User.findAll();
        console.log("-----------------");
        console.log(data);
        console.log("-----------------");
        res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send("Lỗi server");
    }
};
exports.getHomePage = getHomePage;
// ========== GET ABOUT ==========
const getAboutPage = (req, res) => {
    res.render("test/about.ejs");
};
exports.getAboutPage = getAboutPage;
// ========== GET CRUD ==========
const getCRUD = (req, res) => {
    res.render("crud.ejs");
};
exports.getCRUD = getCRUD;
// ========== GET ALL USERS (CRUD) ==========
const getFindAllCRUD = async (req, res) => {
    try {
        const data = await CRUDService.getAllUser();
        res.render("users/findallUser.ejs", {
            datalist: data,
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send("Không lấy được dữ liệu");
    }
};
exports.getFindAllCRUD = getFindAllCRUD;
// ========== CREATE USER ==========
const postCRUD = async (req, res) => {
    try {
        const message = await CRUDService.createNewUser(req.body);
        console.log(message);
        res.send("post crud to server");
    }
    catch (e) {
        console.error(e);
        res.status(500).send("Lỗi khi tạo user");
    }
};
exports.postCRUD = postCRUD;
// ========== EDIT USER ==========
const getEditCRUD = async (req, res) => {
    // Ép kiểu sang number
    const userId = Number(req.query.id);
    if (!isNaN(userId) && userId > 0) {
        try {
            const userData = await CRUDService.getUserInfoById(userId);
            if (userData) {
                res.render("users/editUser.ejs", {
                    data: userData,
                });
            }
            else {
                res.status(404).send("Không tìm thấy user");
            }
        }
        catch (e) {
            console.error(e);
            res.status(500).send("Lỗi lấy dữ liệu user");
        }
    }
    else {
        res.status(400).send("Id không hợp lệ");
    }
};
exports.getEditCRUD = getEditCRUD;
// ========== UPDATE USER ==========
const putCRUD = async (req, res) => {
    try {
        const data = req.body;
        const allUsers = await CRUDService.updateUser(data);
        res.render("users/findallUser.ejs", {
            datalist: allUsers,
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send("Cập nhật thất bại");
    }
};
exports.putCRUD = putCRUD;
// ========== DELETE USER ==========
const deleteCRUD = async (req, res) => {
    const userId = Number(req.query.id);
    if (!isNaN(userId) && userId > 0) {
        try {
            await CRUDService.deleteUser(userId);
            res.send("Deleted!!!");
        }
        catch (e) {
            console.error(e);
            res.status(500).send(" Lỗi xóa user");
        }
    }
    else {
        res.status(400).send(" Id không hợp lệ hoặc không tìm thấy user");
    }
};
exports.deleteCRUD = deleteCRUD;
