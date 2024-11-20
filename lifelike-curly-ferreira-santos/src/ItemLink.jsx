import React from "react";
import { Link } from "react-router-dom";

export default function ItemLink({ id, title, image, price, quantity, categoryId, description }) {
  return (
    <Link to={`/item/${id}`}>
      <div>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "auto" }}  // Garantindo que a imagem seja dimensionada corretamente
        />
      </div>
      <h3>{title}</h3>
      <p>${Number(price)?.toFixed(2)}</p>
      
      {/* Exibindo quantidade (Quantity) */}
      {quantity && <p>Quantidade disponível: {quantity}</p>}

      {/* Exibindo a categoria (categoryId) */}
      {categoryId && <p><strong>Categoria:</strong> {categoryId}</p>}
      
      {/* Exibindo descrição (description), caso exista */}
      {description && <p>{description}</p>}
    </Link>
  );
}
