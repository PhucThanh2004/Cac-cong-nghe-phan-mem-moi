const Product = require('../models/productModel');
const elasticClient = require('../config/elastic');

// GET /api/products
const getProductsByCategory = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = category ? { category } : {};

    const products = await Product.find(filter).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(filter);

    res.json({
      data: products,
      currentPage: Number(page),
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
const searchProducts = async (req, res) => {
  try {
    let { q, category, page = 1, limit = 10 } = req.query;

    // Ép kiểu số
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const from = (page - 1) * limit;

    let mustQueries = [];
    let filterQueries = [];

    if (q) {
      mustQueries.push({
        bool: {
          should: [
            {
              multi_match: {
                query: q,
                fields: ["name^3", "category"], // name ưu tiên gấp 3 lần
                fuzziness: "AUTO"
              }
            },
            {
              match_phrase_prefix: {
                name: {
                  query: q,
                  max_expansions: 20
                }
              }
            }
          ]
        }
      });
    }

    if (category && category !== "All") {
      filterQueries.push({
        term: { category: category }
      });
    }

    const searchResult = await elasticClient.search({
      index: "products",
      body: {
        query: {
          bool: {
            must: mustQueries.length ? mustQueries : [{ match_all: {} }],
            filter: filterQueries
          }
        },
        from,
        size: limit
      }
    });

    const products = searchResult.hits.hits.map(hit => ({
      _id: hit._id,
      ...hit._source
    }));

    const total = searchResult.hits.total.value;

    res.json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    console.error("Elasticsearch search error:", error.meta?.body || error);
    res.status(500).json({ message: "Lỗi server khi tìm kiếm sản phẩm" });
  }
};




module.exports = {
  getProductsByCategory,
  getCategories,   // xuất thêm hàm này
  searchProducts,
};