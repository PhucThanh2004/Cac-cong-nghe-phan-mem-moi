import React from "react";
import "./css/Button.css";

export default function Button({ children, onClick, type = "button" }) {
  return (
    <button type={type} onClick={onClick}>
      {/* Stars SVG */}
      <svg className="star-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53">
        <path className="fil0" d="M392.05 0l87.27 265.88h278.79L481.45 430.88l87.27 265.88L392.05 531.76 215.39 696.76l87.27-265.88L25.99 265.88h278.79z" />
      </svg>
      <svg className="star-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53">
        <path className="fil0" d="M392.05 0l87.27 265.88h278.79L481.45 430.88l87.27 265.88L392.05 531.76 215.39 696.76l87.27-265.88L25.99 265.88h278.79z" />
      </svg>
      <svg className="star-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53">
        <path className="fil0" d="M392.05 0l87.27 265.88h278.79L481.45 430.88l87.27 265.88L392.05 531.76 215.39 696.76l87.27-265.88L25.99 265.88h278.79z" />
      </svg>
      <svg className="star-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53">
        <path className="fil0" d="M392.05 0l87.27 265.88h278.79L481.45 430.88l87.27 265.88L392.05 531.76 215.39 696.76l87.27-265.88L25.99 265.88h278.79z" />
      </svg>
      <svg className="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53">
        <path className="fil0" d="M392.05 0l87.27 265.88h278.79L481.45 430.88l87.27 265.88L392.05 531.76 215.39 696.76l87.27-265.88L25.99 265.88h278.79z" />
      </svg>
      <svg className="star-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53">
        <path className="fil0" d="M392.05 0l87.27 265.88h278.79L481.45 430.88l87.27 265.88L392.05 531.76 215.39 696.76l87.27-265.88L25.99 265.88h278.79z" />
      </svg>

      {children}
    </button>
  );
}
