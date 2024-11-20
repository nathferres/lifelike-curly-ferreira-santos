// Cart.jsx
import React, { useContext } from "react";
import { useCart } from "../context/CartContext";  // Usando o hook do CartContext
import ItemRow from "./ItemRow";  // Componente para exibir a linha do item no carrinho

export function Cart() {  // Usando exportação nomeada
  const { cart, dispatch } = useCart();

  // Calculando o total
  const total = cart
    .reduce((prevItem, currItem) => prevItem + currItem.quantity * currItem.price, 0)
    .toFixed(2);

  return (
    <div>
      <h2>Carrinho</h2>
      <table>
        <thead>
          <tr>
            <th>Quantidade</th>
            <th>Título</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Total</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(({ id, quantity, title, price, categoryId, description }) => (
            <ItemRow
              key={id}
              id={id}
              quantity={quantity}
              title={title}
              total={(price * quantity).toFixed(2)}
              categoryId={categoryId}
              description={description}
              onClick={() => {
                dispatch({
                  type: "removeItem",
                  itemId: id,
                });
              }}
              onChange={(newQuantity) => {
                dispatch({
                  type: "changeItemQuantity",
                  item: { id, newQuantity, title, price, categoryId, description },
                });
              }}
            />
          ))}
        </tbody>
      </table>
      <div>
        <span>Total: ${total}</span>
      </div>
    </div>
  );
}
