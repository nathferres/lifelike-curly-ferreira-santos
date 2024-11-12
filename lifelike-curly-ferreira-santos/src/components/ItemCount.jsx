// src/components/ItemCount.js
import { useState } from 'react';
import { useCart } from '../context/CartContext'; // Importando o contexto do carrinho

function ItemCount({ item }) {
  const [count, setCount] = useState(1);
  const { addItem } = useCart();

  const increment = () => {
    if (count < item.stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAddToCart = () => {
    addItem(item, count);
  };

  return (
    <div>
      <button onClick={decrement} className="btn btn-secondary">-</button>
      <span className="mx-2">{count}</span>
      <button onClick={increment} className="btn btn-secondary">+</button>
      <br />
      <button onClick={handleAddToCart} className="btn btn-primary mt-3">
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ItemCount;

