import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Typography, Button, Row, Col, message, Empty } from "antd";
import {
  toggleFavoriteApi,
  getSimilarProductsApi,
  addRecentlyViewedApi,
  getProductStatsApi,
  getProductByIdApi,
  getRecentlyViewedApi,
} from "../util/api";

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]); // luôn là mảng
  const [stats, setStats] = useState({ buyersCount: 0, commentsCount: 0 });
  const [isFavorite, setIsFavorite] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]); // luôn là mảng

  const fetchProductDetail = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (token) {
        await addRecentlyViewedApi(id);
      }

      const resProduct = await getProductByIdApi(id);
      setProduct(resProduct);

      const resStats = await getProductStatsApi(id);
      setStats(resStats);

      const resSimilar = await getSimilarProductsApi(id);
      setSimilar(resSimilar || []); // fallback mảng rỗng

      if (resProduct?.isFavorite) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết:", error);
      if (error.response?.status === 401) {
        message.error("Vui lòng đăng nhập lại");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    try {
      await toggleFavoriteApi(id);
      setIsFavorite(!isFavorite);
      message.success(isFavorite ? "Đã bỏ yêu thích" : "Đã thêm vào yêu thích");
    } catch (err) {
      if (err.response?.status === 401) {
        message.error("Bạn cần đăng nhập để sử dụng chức năng này");
        navigate("/login");
      } else {
        message.error("Không thể cập nhật yêu thích");
      }
    }
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem("access_token")) {
      message.warning("Bạn cần đăng nhập để mua hàng");
      navigate("/login");
      return;
    }
    message.success("Đã thêm sản phẩm vào giỏ hàng 🛒");
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const res = await getRecentlyViewedApi();
          setRecentlyViewed(res || []); // fallback mảng rỗng
        } catch (err) {
          console.error("Lỗi khi lấy sản phẩm đã xem:", err);
          setRecentlyViewed([]);
        }
      }
    };
    fetchRecentlyViewed();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) return <Paragraph>Không tìm thấy sản phẩm</Paragraph>;

  return (
    <div style={{ padding: 30 }}>
      <Row gutter={20}>
        <Col xs={24} md={12}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: "100%", borderRadius: 12 }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Title level={2}>{product.name}</Title>
          <Paragraph>
            <b>Giá:</b> {product.price?.toLocaleString()} $
          </Paragraph>
          <Paragraph>{product.description}</Paragraph>

          <Paragraph>
            <b>👥 Khách mua:</b> {stats.buyersCount} <br />
            <b>💬 Bình luận:</b> {stats.commentsCount}
          </Paragraph>

          <Button
            type="primary"
            onClick={handleFavorite}
            style={{ marginRight: 10 }}
          >
            {isFavorite ? "💔 Bỏ yêu thích" : "❤️ Yêu thích"}
          </Button>

          <Button type="default" onClick={handleAddToCart}>
            🛒 Thêm vào giỏ
          </Button>
        </Col>
      </Row>

      {/* Sản phẩm tương tự */}
      <Title level={3} style={{ marginTop: 40 }}>
        🔎 Sản phẩm tương tự
      </Title>
      <Row gutter={[20, 20]}>
        {similar.length > 0 ? (
          similar.map((item) => (
            <Col key={item._id} xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.name}
                    src={item.imageUrl || "https://via.placeholder.com/300x200"}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <Card.Meta
                  title={item.name}
                  description={`${item.price?.toLocaleString()} $`}
                />
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty description="Không có sản phẩm tương tự" />
          </Col>
        )}
      </Row>

      {/* Sản phẩm đã xem */}
      <Title level={3} style={{ marginTop: 40 }}>
        👀 Sản phẩm bạn đã xem
      </Title>
      <Row gutter={[20, 20]}>
        {recentlyViewed.length > 0 ? (
          recentlyViewed.map((item) => (
            <Col key={item._id} xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.name}
                    src={item.imageUrl || "https://via.placeholder.com/300x200"}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <Card.Meta
                  title={item.name}
                  description={`${item.price?.toLocaleString()} $`}
                />
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty description="Chưa có sản phẩm nào được xem" />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ProductDetail;
