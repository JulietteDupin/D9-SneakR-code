import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const initialState = {
  cartItems: [],
  totalAmount: 0,
};


async function updateCart(cartItems) {
  if (localStorage.getItem("token")) {
    const user_datas = jwtDecode(localStorage.getItem("token"));
    try {
      let response = await fetch(import.meta.env.VITE_APP_USERS_ROUTE + "/cart/" + user_datas.id , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
        },
        body: JSON.stringify({ "cart": cartItems })
      })
      if (response.ok) {
        console.log('Cart updated')
      } else {
        console.error(response)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

function cartReducer(state, action) {

  switch (action.type) {
    case 'ADD_TO_CART': {
      const itemToAdd = action.payload;

      const existingItem = state.cartItems.find((item) => item.id === itemToAdd.id && item.size === itemToAdd.size);

      if (existingItem) {
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === itemToAdd.id && item.size === itemToAdd.size ? { ...item, quantity: item.quantity + 1 } : item
        );

        return {
          ...state,
          cartItems: updatedCartItems,
          totalAmount: state.totalAmount + parseInt(itemToAdd.price),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...itemToAdd, quantity: 1 }],
          totalAmount: state.totalAmount + parseInt(itemToAdd.price),
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
        totalAmount: state.totalAmount - parseInt(action.payload.price),
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

  useEffect(() => {
    console.log("cart items", state.cartItems);
    updateCart(state.cartItems);
  }, [state])

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
