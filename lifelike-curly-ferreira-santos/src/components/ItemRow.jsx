// ItemRow.js
import React from "react";

const ItemRow = ({ id, quantity, title, total, categoryId, description, onClick, onChange }) => {
  return (
    <tr>
      <td>
        <div>
          <button
            type="button"
            onClick={() => {
              if (quantity > 1) {
                onChange(quantity - 1); // Decrementar a quantidade
              }
            }}
          >
            Decrementar
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value, 10);
              if (!isNaN(newQuantity) && newQuantity >= 0) {
                onChange(newQuantity); // Atualiza a quantidade
              }
            }}
            required
          />
          <button
            type="button"
            onClick={() => onChange(quantity + 1)} // Incrementar a quantidade
          >
            Incrementar
          </button>
        </div>
      </td>
      <td>{title}</td>
      <td>{categoryId}</td>
      <td>{description}</td>
      <td>${total}</td>
      <td>
        <button onClick={onClick}>Remover</button>
      </td>
    </tr>
  );
};


export default ItemRow;
