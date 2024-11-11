// src/components/CartWidget.js
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Importando ícone de carrinho

const CartWidget = () => {
    return (
        <div className="cart-widget d-flex align-items-center">
            <FaShoppingCart size={24} />
            <span className="cart-count ms-2">0</span> {/* Contador de itens */}
        </div>
    );
};

export default CartWidget;
