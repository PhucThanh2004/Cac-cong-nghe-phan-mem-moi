import React from "react";

export default function Card({ children, title }) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      {title && <h3 style={{ marginBottom: "10px" }}>{title}</h3>}
      {children}
    </div>
  );
}
