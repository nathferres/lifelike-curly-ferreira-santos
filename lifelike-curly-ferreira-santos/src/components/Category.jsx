import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { useParams } from "react-router-dom";

import { db } from "../Firebase";  // Certifique-se de que db está corretamente configurado
import ItemLink from "../ItemLink";  // Usando ItemLink ao invés de ProductLink

export default function Category() {
  const { categoryId } = useParams();
  const [itemsCategory, setItemsCategory] = useState([]);  // Renomeado para itemsCategory
  const [loading, setLoading] = useState(false);  // Inicializado como 'false'

  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const itemsCol = collection(db, "products");  // Renomeado para itemsCol

        const q = query(itemsCol, where("category", "==", categoryId));

        const itemsSnapshot = await getDocs(q);  // Renomeado para itemsSnapshot

        const items = itemsSnapshot.docs.map((doc) => {  // Renomeado para items
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setItemsCategory(items);  // Renomeado para setItemsCategory
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
          {!loading &&
            itemsCategory.map((item) => (  // Renomeado para item
              <ItemLink key={item.id} {...item} />  // Usando ItemLink ao invés de ProductLink
            ))}
        </div>
      </div>
    </div>
  );
}
