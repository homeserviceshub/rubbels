import React, { useState } from "react";
import "./QuantitySelector.css";

const QuantitySelector = ({ quantity, onQuantityChange }) => {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="quantity-selector">
      <button className="quality-button" onClick={handleDecrement}>
        -
      </button>
      <span className="quality-span">{quantity}</span>
      <button className="quality-button" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
