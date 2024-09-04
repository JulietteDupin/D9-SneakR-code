import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  cartItems: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const itemToAdd = action.payload;

      const existingItem = state.cartItems.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );

        return {
          ...state,
          cartItems: updatedCartItems,
          totalAmount: state.totalAmount + itemToAdd.price,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...itemToAdd, quantity: 1 }],
          totalAmount: state.totalAmount + itemToAdd.price,
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const updatedCart = state.cartItems
        .map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity 0

      return {
        ...state,
        cartItems: updatedCart,
        totalAmount: state.totalAmount - action.payload.price,
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  console.log("cart items", state.cartItems);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        totalAmount: state.totalAmount,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the Cart Context in components
export const useCart = () => useContext(CartContext);
