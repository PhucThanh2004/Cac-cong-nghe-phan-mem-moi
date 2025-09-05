const Product = require('../models/productModel');

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;  // Lấy category từ query param
    const page = parseInt(req.query.page) || 1;  // Trang hiện tại (mặc định 1)
    const limit = parseInt(req.query.limit) || 10; // Số sản phẩm trên trang (mặc định 10)

    const skip = (page - 1) * limit;

    // Tạo filter: nếu có category thì filter theo category, không thì lấy tất cả
    let filter = {};
    if (category) {
      filter.category = category;
    }

    // Lấy danh sách sản phẩm theo filter, phân trang
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    // Lấy tổng số sản phẩm theo filter
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy sản phẩm" });
  }
};
// Hàm lấy danh sách các danh mục duy nhất từ Product collection
const getCategories = async (req, res) => {
  try {
    // distinct lấy ra các giá trị category không trùng
    const categories = await Product.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy danh mục" });
  }
};

module.exports = {
  getProductsByCategory,
  getCategories,   // xuất thêm hàm này
};