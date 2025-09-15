import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Empty, Button, Space, Pagination } from 'antd';
import { getProductsApi, getCategoriesApi } from '../util/api';

const { Meta } = Card;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

  const fetchCategories = async () => {
    try {
      const res = await getCategoriesApi();
      const categoriesData = res.data || res;
      setCategories(["All", ...categoriesData]);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const fetchProducts = async (category = null, page = 1) => {
    setLoading(true);
    try {
      const catParam = category === "All" ? null : category;
      const res = await getProductsApi(catParam, page, pageSize);

      // DÒNG CODE CẦN SỬA: BỎ ".data" THỨ HAI ĐI
      if (res && Array.isArray(res.data)) {
        setProducts(res.data);
        setTotalItems(res.totalItems);
        setCurrentPage(res.currentPage);
      } else {
        console.error("Cấu trúc dữ liệu sản phẩm không hợp lệ:", res);
        setProducts([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(selectedCategory, 1);
  }, [selectedCategory]);

  const handlePageChange = (page) => {
    fetchProducts(selectedCategory, page);
  };

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
        <>
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
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            {totalItems > 0 && (
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;