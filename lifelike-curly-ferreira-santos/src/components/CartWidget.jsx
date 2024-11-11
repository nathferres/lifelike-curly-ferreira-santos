// src/components/CartWidget.js
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartWidget() {
  const { cart } = useContext(CartContext);

  return (
    <Link to="/cart" className="d-flex align-items-center">
      <FaShoppingCart size={24} />
      {cart.length > 0 && (
        <span className="badge bg-danger ms-2">{cart.length}</span>
      )}
    </Link>
  );
}

export default CartWidget;

