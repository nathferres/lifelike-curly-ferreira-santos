import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import ItemLink from "../ItemLink";  // Certifique-se de que o caminho e o nome estão corretos
import { db } from "../Firebase";

const CategoryButton = ({ categoryName }) => (
  <Link to={`category/${categoryName}`}>
    <button>
      {categoryName}
    </button>
  </Link>
);

function Home() {
  const [items, setItems] = useState([]);  // Substituímos 'products' por 'items'
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const itemsCol = collection(db, "products"); // Coleção continua sendo 'products' no Firestore
        const itemsSnapshot = await getDocs(itemsCol);

        const items = itemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(items);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {loading && <h1>Carregando...</h1>}
      <div>
        <div>
          {!loading &&
            items.map((item) => (
              <ItemLink key={item?.id} {...item} />
            ))}
        </div>
      </div>
    </div>
  );
}

export { Home };
