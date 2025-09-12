import React, { useState } from "react";
import Card from "./components/Card";
import Button from "./components/Button";
import Modal from "./components/Modal";

export default function App() {
  const products = [
    { id: 1, name: "iPhone 16 128GB", price: 18790000, description: "Mô tả sản phẩm A", image: "https://minhtuanmobile.com/uploads/products/250806025844-iphone-16-plus-teal-pdp-image-position-1a-teal-color-vn-vi.jpg" },
    { id: 2, name: "iPhone 14 Pro 128GB Cũ", price: 16590000, description: "Mô tả sản phẩm B", image: "https://24hstore.vn/images/products/2023/06/14/large/iphone-14-pro-128gb-cu-tim.jpg" },
    { id: 3, name: "iPhone 15 128GB", price: 23590000, description: "Mô tả sản phẩm C", image: "https://24hstore.vn/images/products/2024/08/22/large/iphone-15-hinh-1.jpg" },
    ];

  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, Number(qty)) } : item
      )
    );
  };

  const clearCart = () => setCart([]);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "28px" }}>
        🛒 Shopping Cart
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        {/* Product List */}
        <div>
          <h2 style={{ marginBottom: "20px" }}>Sản phẩm</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((p) => (
              <Card key={p.id} title={p.name}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "auto",            // tự điều chỉnh chiều cao theo tỉ lệ ảnh
                    maxHeight: "220px",        // giới hạn chiều cao
                    objectFit: "contain",      // giữ nguyên tỉ lệ ảnh, không bị crop
                    borderRadius: "10px",
                    background: "#f9f9f9",
                    padding: "8px",
                    marginBottom: "10px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  }}
                />
                <p style={{ marginBottom: "12px" }}>
                  Giá:{" "}
                  <span style={{ fontWeight: "bold", color: "#E63946" }}>
                    {p.price.toLocaleString()} đ
                  </span>
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button 
                    onClick={() => addToCart(p)} 
                    style={{ backgroundColor: "#E63946", color: "#fff" }}
                  >
                    Thêm vào giỏ
                  </Button>
                  <Button 
                    onClick={() => setSelectedProduct(p)} 
                    style={{ backgroundColor: "#1D3557", color: "#fff" }}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div>
          <h2 style={{ marginBottom: "20px" }}>Giỏ hàng</h2>
          <Card>
            {cart.length === 0 ? (
              <p>Chưa có sản phẩm nào trong giỏ.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "10px",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: "0 0 5px" }}>{item.name}</h4>
                      <span style={{ color: "#555" }}>
                        {item.price.toLocaleString()} đ
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateQty(item.id, e.target.value)}
                        style={{
                          width: "50px",
                          padding: "6px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      />
                      <Button onClick={() => removeFromCart(item.id)}>
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}
                <h3 style={{ textAlign: "right", margin: "20px 0" }}>
                  Tổng:{" "}
                  <span style={{ color: "#1D3557" }}>
                    {total.toLocaleString()} đ
                  </span>
                </h3>
                <Button onClick={clearCart} type="button">
                  Xóa hết
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Modal Chi tiết sản phẩm */}
      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <div>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "12px",
                background: "#f9f9f9",
                padding: "10px",
                marginBottom: "15px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
              }}
            />
            <h2>{selectedProduct.name}</h2>
            <p>
              <b>Giá:</b> {selectedProduct.price.toLocaleString()} đ
            </p>
            <p>{selectedProduct.description}</p>
            <Button onClick={() => addToCart(selectedProduct)}>
              Thêm vào giỏ
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
