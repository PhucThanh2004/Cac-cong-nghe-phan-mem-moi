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
// gọi Express
const express_1 = __importDefault(require("express"));
const homeController = __importStar(require("../controller/homeController"));
const router = express_1.default.Router();
const initWebRoutes = (app) => {
    // cách 1: code trực tiếp trong route
    router.get("/", (req, res) => {
        return res.send("Nguyễn Hữu Trung");
    });
    // cách 2: gọi hàm trong controller
    router.get("/home", homeController.getHomePage); // url cho trang chủ
    router.get("/about", homeController.getAboutPage); // url cho trang about
    router.get("/crud", homeController.getCRUD); // url get crud
    router.post("/post-crud", homeController.postCRUD); // url post crud
    router.get("/get-crud", homeController.getFindAllCRUD); // url lấy findAll
    router.get("/edit-crud", homeController.getEditCRUD); // url get edit crud
    router.post("/put-crud", homeController.putCRUD); // url put crud
    router.get("/delete-crud", homeController.deleteCRUD); // url get delete crud
    return app.use("/", router);
};
exports.default = initWebRoutes;
