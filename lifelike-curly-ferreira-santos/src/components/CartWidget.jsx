// CartWidget.js
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

function CartWidget({ id, title, quantity }) {
  const [isEditing, setEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity); // Armazenar a nova quantidade
  const { dispatch } = useCart();

  const handleRemoveItem = (itemId) => {
    dispatch({
      type: "removeItem",
      itemId,
    });
  };

  const handleChangeQuantity = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value && value > 0) {
      setNewQuantity(value); // Atualizar a nova quantidade
    }
  };

  const handleConfirmChange = () => {
    if (newQuantity !== quantity) {
      dispatch({
        type: "changeItemQuantity",
        item: { id, newQuantity },
      });
    }
    setEditing(false); // Volta para o modo de exibição após a confirmação
  };

  return (
    <li>
      <span>{title}</span>
      {!isEditing && ` X ${quantity}`}
      {isEditing && (
        <input
          type="number"
          min="1"
          value={newQuantity}
          onChange={handleChangeQuantity}
          aria-label={`Alterar a quantidade de ${title}`}
        />
      )}
      <button onClick={() => handleRemoveItem(id)}>
        Remover
      </button>
      <button
        onClick={() => {
          if (isEditing) {
            handleConfirmChange();
          } else {
            setEditing(true);
          }
        }}
      >
        {isEditing ? "Confirmar" : "Editar"}
      </button>
    </li>
  );
}

export { CartWidget };
