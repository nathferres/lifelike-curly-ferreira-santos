import { createContext, useState, useReducer } from "react";

const CartContext = createContext([]);

import React from "react";

const cartReducer = (cart, action) => {
  switch (action.type) {
    case "addItem": {
      let newCart;

      // Checar se o item já existe no carrinho
      const existsInCart = cart?.some(
        (cartItem) => cartItem.id === action.item.id
      );

      newCart = [...cart, action.item];

      console.log({ existsInCart });

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    }

    case "removeItem": {
      const filteredCart = cart.filter(
        (item) => item.id !== action.itemId
      );
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return filteredCart;
    }

    case "changeItemQuantity": {
      const updatedCart = cart.map((item) => {
        if (item.id !== action.item.id) {
          return item;
        }
        if (item.id === action.item.id) {
          return {
            ...item,
            quantity: action.item.newQuantity,
          };
        }
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    }

    case "resetCart": {
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    }

    default:
      break;
  }
};

const initializeState = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initializeState() || []);

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
