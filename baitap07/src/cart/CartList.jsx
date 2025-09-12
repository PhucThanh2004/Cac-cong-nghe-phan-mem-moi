// src/components/CartList.jsx
import React from "react";
import CartItem from "./CartItem";
import Button from "../components/Button";

export default function CartList({ cart, onUpdate, onRemove, onClear }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "16px", border: "1px solid #ddd" }}>
      <h2>🛒 Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
          <h3>Tổng: {total} đ</h3>
          <Button onClick={onClear}>Xóa hết</Button>
        </>
      )}
    </div>
  );
}
