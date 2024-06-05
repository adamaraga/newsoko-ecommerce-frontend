import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("sokoUser")) || null,
  cart: JSON.parse(localStorage.getItem("cart")) || null,
  products: null,
  product: null,
  cartTotalItem: 0,
  shippingDetails: null,
  orderId: null,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("sokoUser", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart, state.cartTotalItem]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        cart: state.cart,
        products: state.products,
        product: state.product,
        cartTotalItem: state.cartTotalItem,
        shippingDetails: state.shippingDetails,
        orderId: state.orderId,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
