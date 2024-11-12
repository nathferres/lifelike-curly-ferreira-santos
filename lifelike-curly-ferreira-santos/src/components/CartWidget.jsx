import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartWidget() {
  const { cart } = useContext(CartContext);  // Acesso ao contexto

  return (
    <div>
      {/* Exemplo de renderização */}
      <span>{cart.length > 0 ? cart.length : ''}</span>
    </div>
  );
}

export default CartWidget;
