// src/components/Item.js
import { Link } from 'react-router-dom';

function Item({ item }) {
  return (
    <div className="card">
      <img src={item.pictureUrl} alt={item.title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.description}</p>
        <Link to={`/item/${item.id}`} className="btn btn-primary">Ver Detalhes</Link>
      </div>
    </div>
  );
}

export default Item;
