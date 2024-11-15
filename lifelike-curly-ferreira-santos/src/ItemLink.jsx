import React from "react";
import { Link } from "react-router-dom";

export default function ItemLink({ id, title, image, price }) {
  return (
    <Link to={`/item/${id}`}>
      <div>
        <img
          src={image}
          alt={title}
        />
      </div>
      <h3>{title}</h3>
      <p>
        ${Number(price)?.toFixed(2)}
      </p>
    </Link>
  );
}
