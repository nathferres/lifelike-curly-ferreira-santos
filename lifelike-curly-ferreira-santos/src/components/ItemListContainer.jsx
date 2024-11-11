// src/components/ItemListContainer.js
import { useEffect, useState } from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';
import { getItems } from '../services/itemService'; // Mock async service

function ItemListContainer() {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getItems(categoryId).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <div className="container">
      <h1>{categoryId ? `Categoria: ${categoryId}` : 'Todos os Produtos'}</h1>
      {loading ? <p>Carregando...</p> : <ItemList items={items} />}
    </div>
  );
}

export default ItemListContainer;
