import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Empty, Button, Space } from 'antd';
import { getProductsApi, getCategoriesApi } from '../util/api'; // bạn tạo api lấy categories nhé

const { Meta } = Card;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Lấy danh sách danh mục động từ backend
  const fetchCategories = async () => {
  try {
    const res = await getCategoriesApi();
    console.log("Categories API response:", res);  // Log toàn bộ res
    console.log("Categories API response data:", res.data);  // Log phần data nếu có
    const categoriesData = res.data || res;  // thử lấy res.data nếu có, nếu không lấy res luôn
    setCategories(["All", ...categoriesData]);
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
  }
};



  // Lấy sản phẩm theo category
  const fetchProducts = async (category = null) => {
    setLoading(true);
    try {
      const catParam = category === "All" ? null : category;
      const res = await getProductsApi(catParam, 1, 10);
      setProducts(res.data || []);
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
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div style={{ padding: 20 }}>
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