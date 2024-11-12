// src/components/Checkout.js
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService'; // Importando a função do Firestore

function Checkout() {
  const { cart, clear } = useCart();
  const [buyerData, setBuyerData] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const orderData = {
      buyer: buyerData,
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      date: new Date(),
    };

    try {
      const orderId = await createOrder(orderData);
      setOrderId(orderId);
      clear(); // Limpar o carrinho após a compra
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Finalizar Compra</h1>
      {orderId ? (
        <div>
          <h2>Pedido finalizado com sucesso!</h2>
          <p>ID do Pedido: {orderId}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={buyerData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={buyerData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={buyerData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success mt-3" disabled={loading}>
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
