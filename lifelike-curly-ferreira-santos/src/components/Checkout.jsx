import React, { useContext } from "react";
import { addDoc, collection } from "firebase/firestore/lite";
import { CartContext } from "../context/CartContext";
import ItemTable from "./ItemTable";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";

const ItemRow = ({ quantity, title, total, categoryId, description, onClick }) => {
  return (
    <tr>
      <td>{quantity} X</td>
      <td>{title}</td>
      <td>${total}</td>
      <td>{categoryId}</td> {/* Exibindo categoryId */}
      <td>{description || "Sem descrição"}</td> {/* Exibindo description */}
      <td>
        <span onClick={onClick}>Remove</span>
      </td>
    </tr>
  );
};

export default function Checkout() {
  const { cart, dispatch } = useContext(CartContext);
  const { currentUser } = useAuth();

  console.log("Carrinho no Checkout:", cart); // Verificando o conteúdo do carrinho

  const total = cart
    ?.reduce((prevItem, nextItem) => prevItem + nextItem.quantity * nextItem.price, 0)
    .toFixed(2); // Calculando o total do carrinho

  const handleOrder = async () => {
    const newOrder = {
      buyer: {
        name: "Thales",
        email: "dev.thales.avila@gmail.com",
        id: currentUser?.uid, // Garantindo que currentUser está presente
      },
      items: cart,
      total,
    };

    try {
      const ordersCollection = collection(db, "orders");
      const createdOrder = await addDoc(ordersCollection, newOrder);

      // Resetando o carrinho após o pedido ser feito
      dispatch({
        type: "resetCart",
      });
      
      console.log("Pedido criado com sucesso:", createdOrder);
    } catch (error) {
      console.error("Erro ao criar o pedido:", error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ItemTable>
        {cart?.map((item, index) => (
          <ItemRow
            key={item.id || index} // Usando o id ou o índice como fallback
            quantity={item.quantity}
            title={item.title}
            total={(item.price * item.quantity).toFixed(2)}
            categoryId={item.categoryId} // Passando categoryId
            description={item.description} // Passando description
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