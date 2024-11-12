import { createContext, useState, useContext } from 'react';

// Cria o contexto
const CartContext = createContext();

// Provider do contexto
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    setCart(prev => {
      const existingItem = prev.find(p => p.id === item.id);
      if (existingItem) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
  };

  const removeItem = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const clear = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook
const useCart = () => useContext(CartContext);

export { CartContext, CartProvider, useCart };
