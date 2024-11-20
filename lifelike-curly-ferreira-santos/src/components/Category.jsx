import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { useParams } from "react-router-dom";

import { db } from "../Firebase";  // Certifique-se de que db está corretamente configurado
import ItemLink from "../ItemLink";  // Usando ItemLink ao invés de ProductLink

export default function Category() {
  const { categoryId } = useParams();  // Obtendo o ID da categoria via URL
  const [itemsCategory, setItemsCategory] = useState([]);  // Lista de itens da categoria
  const [loading, setLoading] = useState(false);  // Estado de carregamento

  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        // Alterado para "items" e o filtro foi ajustado para "categoryId"
        const itemsCol = collection(db, "items");

        const q = query(itemsCol, where("categoryId", "==", categoryId));

        const itemsSnapshot = await getDocs(q);  // Obtendo os documentos da categoria

        // Mapeando os dados dos itens para incluir o ID e os dados do Firestore
        const items = itemsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setItemsCategory(items);  // Atualizando o estado com os itens da categoria
      } catch (error) {
        console.error("Erro ao carregar os produtos da categoria:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId]);

  return (
    <div>
      {loading && <h1>Carregando...</h1>}
      <div>
        <div>
          {!loading && itemsCategory.length > 0 ? (
            itemsCategory.map((item) => (
              <div key={item.id}>
                {/* Exibindo os detalhes dos itens */}
                <h3>{item.title}</h3>
                <p><strong>Categoria:</strong> {item.categoryId}</p>
                <p><strong>Preço:</strong> R$ {item.price?.toFixed(2)}</p>
                <p><strong>Quantidade disponível:</strong> {item.Quantity}</p>
                <p>{item.description || "Descrição não disponível"}</p> {/* Exibindo a descrição, se houver */}
                <ItemLink key={item.id} {...item} /> {/* Usando ItemLink para cada item */}
              </div>
            ))
          ) : (
            <p>Não há produtos nesta categoria.</p>
          )}
        </div>
      </div>
    </div>
  );
}
