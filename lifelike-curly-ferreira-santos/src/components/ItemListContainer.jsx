// src/components/ItemListContainer.js
import React from 'react';
import './ItemListContainer.css'; // Para estilização

const ItemListContainer = ({ greeting }) => {
    return (
        <div className="item-list-container text-center p-4">
            <h2>{greeting}</h2>
        </div>
    );
};

export default ItemListContainer;
