// Home.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ItemLink from "../ItemLink";  // Certifique-se de que o caminho está correto
import { db } from "../Firebase";

// Componente para exibir botões de categorias
const CategoryButton = ({ categoryName }) => (
  <Link to={`category/${categoryName}`}>
    <button>{categoryName}</button>
  </Link>
);

export function Home() {  // Exportação nomeada
  const [items, setItems] = useState([]);  // Substituímos 'products' por 'items'
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Hook para buscar os dados dos itens do Firebase
  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const itemsCol = collection(db, "items"); // Coleção no Firestore
        const itemsSnapshot = await getDocs(itemsCol);

        // Mapear os itens para adicionar o ID e os dados
        const items = itemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(items);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Função para formatar o preço em formato monetário
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div>
      {loading && <h1>Carregando...</h1>}
      <div>
        <h2>Itens Disponíveis</h2>
        {/* Exibindo lista de produtos com base nos dados do Firebase */}
        <div>
          {!loading &&
            items.map((item) => (
              <div key={item?.id}>
                <h3>{item.title}</h3>
                <p>{item.description || "Descrição não disponível"}</p>
                <p><strong>Categoria:</strong> {item.categoryId}</p>
                <p><strong>Preço:</strong> {formatPrice(item.price)}</p>
                <p><strong>Quantidade:</strong> {item.quantity} disponível(s)</p>

                {/* Link para detalhes do item */}
                <ItemLink id={item.id} title={item.title} price={item.price} quantity={item.quantity} categoryId={item.categoryId} description={item.description} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
