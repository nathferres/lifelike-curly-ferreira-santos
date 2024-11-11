// src/components/ItemCount.js
import React, { useState } from 'react';

const ItemCount = ({ stock, onAdd }) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    if (stock > 0) {
      onAdd(count);
    }
  };

  return (
    <div className="item-count">
      <div className="quantity-controls">
        <button onClick={decrement} disabled={count <= 1}>-</button>
        <span>{count}</span>
        <button onClick={increment} disabled={count >= stock}>+</button>
      </div>
      <button 
        onClick={handleAdd} 
        disabled={count > stock || stock === 0}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ItemCount;
