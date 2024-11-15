import { useContext, useState } from "react";
import CartContext from "../context/CartContext";

function CartWidget({ id, title, quantity }) {  // Renomeado de CartItem para CartWidget
  const [isEditing, setEditing] = useState(false);
  const { cart, dispatch } = useContext(CartContext);

  const handleRemoveItem = (itemId) => {  // Renomeado de productId para itemId
    dispatch({
      type: "removeItem",
      itemId,  // Renomeado para itemId
    });
  };

  const handleChangeQuantity = (e) => {
    const newQuantity = Number(e.target.value);

    dispatch({
      type: "changeItemQuantity",
      item: {  // Renomeado para item
        id,
        newQuantity,
      },
    });
  };

  return (
    <li>
      {`${title}`}
      {!isEditing && ` X ${quantity}`}
      {isEditing && (
        <input onChange={handleChangeQuantity} value={quantity} type="number" />
      )}
      <button
        onClick={() => {
          handleRemoveItem(id);
        }}
      >
        Remover
      </button>
      <button
        onClick={() => {
          setEditing(!isEditing);
        }}
      >
        {!isEditing ? "Editar" : "Confirmar"}
      </button>
    </li>
  );
}

export { CartWidget };  // Renomeado para CartWidget
