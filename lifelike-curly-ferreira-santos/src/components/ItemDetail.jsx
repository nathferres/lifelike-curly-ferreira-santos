import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../Firebase";

// Função para formatar o preço como moeda
const formatPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

function ItemDetail() {
  const { id } = useParams();  // Obtendo o ID do produto via URL
  const [item, setItem] = useState({});  // Armazenando as informações do produto
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);  // Quantidade do produto que o usuário deseja adicionar ao carrinho
  const { cart, dispatch } = useContext(CartContext);  // Contexto do carrinho

  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const docRef = doc(db, "items", id);  // Referência ao produto no Firestore
        const itemSnapshot = await getDoc(docRef);  // Obtendo os dados do produto

        if (itemSnapshot.exists()) {
          const itemData = itemSnapshot.data();
          setItem({ id: itemSnapshot.id, ...itemData });
        } else {
          console.error("Produto não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChangeQuantity = (e) => {
    const newQuantity = Number(e.target.value);

    // Evitar que a quantidade seja maior que a quantidade disponível
    if (newQuantity >= 1 && newQuantity <= item.Quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddItem = () => {
    // Verificar se a quantidade solicitada é menor ou igual à quantidade disponível
    if (quantity <= item.Quantity) {
      dispatch({
        type: "addItem",
        item: { ...item, quantity },
      });
    } else {
      alert("Quantidade excede o estoque disponível!");
    }
  };

  return (
    <>
      {loading && <div>Carregando...</div>}
      {!loading && item && (
        <div>
          <h1>{item.title}</h1>
          <h2>{formatPrice(item.price)}</h2>  {/* Exibindo o preço formatado */}
          <img src={item.image} alt={item.title} />  {/* Exibindo a imagem do item */}
          <p>{item.description || "Descrição não disponível."}</p>  {/* Exibindo a descrição */}
          <p><strong>Categoria:</strong> {item.categoryId}</p>  {/* Exibindo a categoria do produto */}
          <p><strong>Quantidade disponível:</strong> {item.Quantity}</p>  {/* Quantidade disponível no estoque */}
          
          <div>
            <input
              value={quantity}
              type="number"
              min="1"
              max={item.Quantity}  /* Não deixar o usuário escolher uma quantidade maior do que a disponível */
              onChange={handleChangeQuantity}
            />
          </div>
          <button onClick={handleAddItem}>Adicionar ao carrinho</button>
        </div>
      )}
    </>
  );
}

export { ItemDetail };
