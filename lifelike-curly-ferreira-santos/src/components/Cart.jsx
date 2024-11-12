// src/components/Cart.js
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeItem, clear } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1>Seu Carrinho</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <span>{item.title}</span>
                  <span>R${item.price} x {item.quantity}</span>
                  <button onClick={() => removeItem(item.id)} className="btn btn-danger btn-sm">Remover</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="mt-3">Total: R${total}</h3>
          <button onClick={clear} className="btn btn-secondary">Limpar Carrinho</button>
          <Link to="/checkout" className="btn btn-success ml-2">Finalizar Compra</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
