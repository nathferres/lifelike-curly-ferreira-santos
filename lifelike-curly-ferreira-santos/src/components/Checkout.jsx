import React, { useContext } from "react";
import { addDoc, collection } from "firebase/firestore/lite";
import CartContext from "../context/CartContext";
/*import ItemTable from "./ItemTable"; */ 
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";

const ItemRow = ({ quantity, title, total, onClick }) => {
  return (
    <tr>
      <td>{quantity} X</td>
      <td>{title}</td>
      <td>${total}</td>
      <td>
        <span onClick={onClick}>Remove</span>
      </td>
    </tr>
  );
};

export default function Checkout() {
  const { cart, dispatch } = useContext(CartContext);
  const { currentUser } = useAuth();

  const total = cart
    ?.reduce((prevItem, nextItem) => prevItem + nextItem.quantity * nextItem.price, 0)
    .toFixed(2);

  const handleOrder = () => {
    (async function () {
      const newOrder = {
        buyer: {
          name: "Thales",
          email: "dev.thales.avila@gmail.com",
          id: currentUser.uid,
        },
        items: cart,
        total,
      };

      const ordersCollection = collection(db, "orders");

      const createdOrder = await addDoc(ordersCollection, newOrder);

      dispatch({
        type: "resetCart",
      });
    })();
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ItemTable>
      {cart?.map((item, index) => (
  <ItemRow
    key={item.id || index}  /* Usando o id, ou fallback para o índice */
    quantity={item.quantity}
    title={item.title}
    total={(item.price * item.quantity).toFixed(2)}
    onClick={() => {
      dispatch({
        type: "removeItem",
        itemId: item.id, 
      });
    }}
  />
))}
      </ItemTable>
      <div>
        <span>Total: ${total}</span>
        <button onClick={handleOrder}>Comprar</button>
      </div>
    </div>
  );
}

export { Checkout };
