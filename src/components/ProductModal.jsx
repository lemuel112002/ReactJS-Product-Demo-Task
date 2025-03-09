import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductModal({ product, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
