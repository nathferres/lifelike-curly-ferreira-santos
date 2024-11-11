// src/components/ItemDetailContainer.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from '../services/itemService'; // Função para buscar item do Firebase ou mock

function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getItemById(id).then((data) => {
      setItem(data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="container">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img src={item.pictureUrl} alt={item.title} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p><strong>Preço: </strong>R${item.price}</p>
            <ItemCount item={item} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetailContainer;
