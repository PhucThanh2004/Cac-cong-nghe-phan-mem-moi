const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
} = require("../controllers/userController");
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const delay = require("../middleware/delay");

const routerAPI = express.Router();

//routerAPI.all("*", auth);
routerAPI.use(auth);

routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

// Thêm route mới cho sản phẩm, lấy danh sách theo category và phân trang
routerAPI.get("/products", productController.getProductsByCategory);
routerAPI.get("/categories", productController.getCategories);

module.exports = routerAPI; // export default