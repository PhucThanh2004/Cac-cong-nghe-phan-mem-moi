// src/pages/home.jsx

import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Empty, Button, Space, Input } from 'antd';
import { getProductsApi, getCategoriesApi, searchProductsApi } from '../util/api'; 

const { Meta } = Card;
const { Search } = Input;

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchCategories = async () => {
        try {
            const res = await getCategoriesApi();
            const categoriesData = res.data || res;
            setCategories(["All", ...categoriesData]);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
        }
    };

// Thay đổi hàm fetchData
const fetchData = async () => {
  setLoading(true);
  try {
    let res;
    if (searchQuery) {
      const params = {
        q: searchQuery,
        page: 1,
        limit: 10,
      };
      if (selectedCategory !== "All") {
        params.category = selectedCategory;
      }
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
    }  } catch (error) {
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

    return (
        <div style={{ padding: 20 }}>
            {/* ... (phần render không thay đổi) */}
            <Search
                placeholder="Tìm kiếm sản phẩm..."
                onSearch={setSearchQuery}
                enterButton
                style={{ width: 400, marginBottom: 20 }}
            />
            
            <Space style={{ marginBottom: 20 }}>
                {categories.map(cat => (
                    <Button
                        key={cat}
                        type={selectedCategory === cat ? "primary" : "default"}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </Button>
                ))}
            </Space>

            {loading ? (
                <div style={{ textAlign: 'center', padding: 50 }}>
                    <Spin size="large" />
                </div>
            ) : products.length === 0 ? (
                <Empty description="Không có sản phẩm nào" />
            ) : (
                <Row gutter={[16, 16]}>
                    {products.map(item => (
                        <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={item.name}
                                        src={item.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                                    />
                                }
                            >
                                <Meta title={item.name} description={`Giá: $${item.price}`} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default HomePage;