import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

import {
  Card,
  Row,
  Col,
  Spin,
  Empty,
  Button,
  Space,
  Input,
  InputNumber,
  Select,
  Typography,
} from 'antd';
import { getProductsApi, getCategoriesApi, searchProductsApi } from '../util/api';

const { Meta } = Card;
const { Search } = Input;
const { Title } = Typography;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // filter mới
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [onSale, setOnSale] = useState(null);

  // lấy categories từ backend
  const fetchCategories = async () => {
    try {
      const res = await getCategoriesApi();
      const categoriesData = res.data || res;
      setCategories(["All", ...categoriesData]);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  // lấy products từ backend
  const fetchData = async () => {
    setLoading(true);
    try {
      let res;
      if (searchQuery || selectedCategory !== "All" || priceMin || priceMax || onSale !== null) {
        const params = { page: 1, limit: 10 };
        if (searchQuery) params.q = searchQuery;
        if (selectedCategory !== "All") params.category = selectedCategory;
        if (priceMin) params.priceMin = priceMin;
        if (priceMax) params.priceMax = priceMax;
        if (onSale !== null) params.onSale = onSale;

        res = await searchProductsApi(params);
      } else {
        const catParam = selectedCategory === "All" ? undefined : selectedCategory;
        res = await getProductsApi(catParam, 1, 10);
      }

      if (res.data?.data) {
        setProducts(res.data.data);
      } else if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchQuery]);
  const navigate = useNavigate();

  return (
    <div style={{ padding: 30, background: "#f5f6fa", minHeight: "100vh" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        🛍️ Danh sách sản phẩm
      </Title>

      {/* Card bộ lọc */}
      <Card style={{ marginBottom: 25, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {/* 🔎 Tìm kiếm */}
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            onSearch={setSearchQuery}
            enterButton="Tìm"
            style={{ width: "100%" }}
            size="large"
          />

          {/* 📂 Danh mục */}
          <Space wrap>
            {categories.map(cat => (
              <Button
                key={cat}
                type={selectedCategory === cat ? "primary" : "default"}
                onClick={() => setSelectedCategory(cat)}
                shape="round"
              >
                {cat}
              </Button>
            ))}
          </Space>

          {/* 💰 Giá & 🎯 Khuyến mãi */}
          <Space wrap>
            <InputNumber
              placeholder="Giá từ"
              value={priceMin}
              onChange={setPriceMin}
              min={0}
              style={{ width: 120 }}
            />
            <InputNumber
              placeholder="Giá đến"
              value={priceMax}
              onChange={setPriceMax}
              min={0}
              style={{ width: 120 }}
            />
            <Select
              placeholder="Khuyến mãi"
              value={onSale}
              onChange={setOnSale}
              style={{ width: 180 }}
              allowClear
            >
              <Select.Option value={null}>Tất cả</Select.Option>
              <Select.Option value="true">Có khuyến mãi</Select.Option>
              <Select.Option value="false">Không khuyến mãi</Select.Option>
            </Select>
            <Button type="primary" onClick={fetchData} shape="round">
              Lọc
            </Button>
          </Space>
        </Space>
      </Card>

      {/* Hiển thị sản phẩm */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 50 }}>
          <Spin size="large" />
        </div>
      ) : products.length === 0 ? (
        <Empty description="Không có sản phẩm nào" />
      ) : (
        <Row gutter={[20, 20]}>
          {products.map(item => (
            <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => navigate(`/product/${item._id}`)} // chuyển sang trang chi tiết
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                cover={
                  <img
                    alt={item.name}
                    src={item.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
              >
                <Meta
                  title={item.name}
                  description={
                    <span>
                      <b style={{ color: item.onSale ? "red" : "#333" }}>
                        {item.price?.toLocaleString()} $
                      </b>{" "}
                      {item.onSale && (
                        <span style={{ color: "green", marginLeft: 8 }}>
                          (Khuyến mãi)
                        </span>
                      )}
                    </span>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;
