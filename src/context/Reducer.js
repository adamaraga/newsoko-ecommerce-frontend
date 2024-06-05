const Reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };

    case "CART_FETCH_SUCCESS":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
        cartTotalItem: state.cartTotalItem + 1,
      };
    case "UPDATE_CART":
      return {
        ...state,
        cart: action.payload,
        cartTotalItem: state.cartTotalItem + 1,
      };
    case "ORDER_ID_SUCCESS":
      return {
        ...state,
        orderId: action.payload,
      };
    case "UPDATE_SHIPPING_DETAILS":
      return {
        ...state,
        shippingDetails: action.payload,
      };
    case "PRODUCTS_FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload,
      };
    case "PRODUCT_FETCH_SUCCESS":
      return {
        ...state,
        product: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Reducer;
