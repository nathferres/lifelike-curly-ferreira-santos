import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import ItemTable from "./ItemTable";

const OrderRow = ({ quantity, title, total, onClick, onChange }) => {
  return (
    <tr>
      <td>
        <div>
          <button
            type="button"
            id="decrement-button"
            data-input-counter-decrement="quantity-input"
            onClick={() => {
              onChange(quantity - 1);
            }}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            data-input-counter
            aria-describedby="helper-text-explanation"
            value={quantity}
            onChange={(e) => {
              onChange(Number(e.target.value));
            }}
            required
          />
          <button
            type="button"
            id="increment-button"
            data-input-counter-increment="quantity-input"
            onClick={() => {
              onChange(quantity + 1);
            }}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </td>
      <td>{title}</td>
      <td>${total}</td>
      <td>
        <span onClick={onClick}>Remove</span>
      </td>
    </tr>
  );
};

export default function Order() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(false);

  const total = order?.items
    ?.reduce((prevItem, currItem) => {
      return prevItem + currItem.quantity * currItem.price;
    }, 0)
    .toFixed(2);

  useEffect(() => {
    (async function () {
      const docRef = doc(db, "orders", orderId);

      const orderSnapshot = await getDoc(docRef);

      const orderData = orderSnapshot.data();

      setOrder(orderData);
    })();
  }, [orderId]);

  const handleUpdate = () => {
    const orderRef = doc(db, "orders", orderId);

    updateDoc(orderRef, {
      ...order,
    });
  };

  const removeItem = (id) => {
    const newOrder = {
      ...order,
      items: order?.items?.filter((item) => {
        return item.id !== id;
      }),
    };
    setOrder(newOrder);
  };

  const updateQuantity = (id, newQuantity) => {
    const newOrder = {
      ...order,
      items: order?.items?.map((item) => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          quantity: newQuantity,
        };
      }),
    };
    setOrder(newOrder);
  };

  return (
    <div>
      <ItemTable>
        {order?.items?.map(({ id, quantity, title, price }) => (
          <OrderRow
            key={id}
            quantity={quantity}
            name={title}
            total={(quantity * price).toFixed(2)}
            onChange={(newQuantity) => {
              updateQuantity(id, newQuantity);
            }}
            onClick={() => {
              removeItem(id);
            }}
          />
        ))}
      </ItemTable>
      <div>
        <span>Total: ${total}</span>
        <button onClick={handleUpdate}>Atualizar</button>
      </div>
    </div>
  );
}
