import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          maxWidth: "90%",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }}
      >
        <button
          onClick={onClose}
          style={{
            float: "right",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          ✖
        </button>
        <div style={{ marginTop: "20px" }}>{children}</div>
      </div>
    </div>
  );
}
