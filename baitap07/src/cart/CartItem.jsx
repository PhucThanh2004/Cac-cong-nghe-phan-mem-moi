// src/components/CartItem.jsx
import React from "react";
import Button from "../components/Button";

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div>
        <strong>{item.name}</strong> - {item.price}đ
      </div>
      <div>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, Number(e.target.value))}
          style={{ width: "60px", marginRight: "8px" }}
        />
        <Button onClick={() => onRemove(item.id)}>Xóa</Button>
      </div>
    </div>
  );
}
