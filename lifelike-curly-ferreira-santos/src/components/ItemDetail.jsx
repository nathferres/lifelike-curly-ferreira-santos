import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../Firebase";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { cart, dispatch } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    (async function () {
      const docRef = doc(db, "items", id);

      const itemSnapshot = await getDoc(docRef);

      const item = itemSnapshot.data();

      setItem({ id: itemSnapshot.id, ...item });
      setLoading(false);
    })();
  }, [id]);

  const handleChangeQuantity = (e) => {
    const newQuantity = Number(e.target.value);

    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddItem = () => {
    dispatch({
      type: "addItem",
      item: { ...item, quantity },
    });
  };

  return (
    <>
      {loading && <div>Carregando...</div>}
      {!loading && (
        <div>
          <h1>{item.title}</h1>
          <h2>${item.price?.toFixed(2)}</h2>
          <img src={item.image} />
          <input
            value={quantity}
            type="number"
            onChange={handleChangeQuantity}
          />
          <button onClick={handleAddItem}>Adicionar ao carrinho</button>
        </div>
      )}
    </>
  );
}

export { ItemDetail };
