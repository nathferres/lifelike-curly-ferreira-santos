// CartContext.js
import { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "addItem":
      const existingItemIndex = state.findIndex(item => item.id === action.item.id);
      if (existingItemIndex !== -1) {
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.item.quantity }
            : item
        );
      }
      return [...state, action.item];

    case "removeItem":
      return state.filter(item => item.id !== action.itemId);

    case "changeItemQuantity":
      return state.map(item =>
        item.id === action.item.id
          ? { ...item, quantity: action.item.newQuantity }
          : item
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export { CartContext };
