import { createContext, useReducer } from 'react';

export const CartCtx = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const ex = state.find(i => i.id === action.product.id);
      if (ex) return state.map(i => i.id === action.product.id ? { ...i, qty: i.qty + action.qty } : i);
      return [...state, { ...action.product, qty: action.qty }];
    }
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    case 'UPDATE_QTY': return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i);
    case 'CLEAR': return [];
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartCtx.Provider value={{ cart, dispatch }}>
      {children}
    </CartCtx.Provider>
  );
}